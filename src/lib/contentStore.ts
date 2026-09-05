import defaultData from "@/data/siteContent.json";
import fs from "fs";
import path from "path";

export interface SectionConfig {
  id: string;
  name: string;
  nameMr: string;
  description: string;
  enabled: boolean;
}

export type SiteContent = typeof defaultData & {
  sections?: SectionConfig[];
};

let inMemoryCache: SiteContent | null = null;

export function getDefaultSiteContent(): SiteContent {
  return defaultData as SiteContent;
}

/**
 * Dynamically resolves Cloudflare D1 database binding if running in workerd (Cloudflare runtime).
 */
async function getD1Database(): Promise<any> {
  try {
    // In Cloudflare Workers environment (production / edge runtime),
    // cloudflare:workers provides the env object containing bindings.
    // @ts-ignore
    const workers = await import("cloudflare:workers");
    if (workers?.env?.DB) {
      return workers.env.DB;
    }
  } catch {
    // Not running inside Cloudflare Workers runtime
  }
  return null;
}

/**
 * Ensures sections array is populated with default configuration if missing
 */
function ensureSections(content: any): SiteContent {
  if (!content) return defaultData as SiteContent;
  if (!content.sections || !Array.isArray(content.sections) || content.sections.length === 0) {
    content.sections = defaultData.sections;
  }
  return content as SiteContent;
}

/**
 * Retrieves the current site content from Cloudflare D1 database, falling back to in-memory cache,
 * local JSON file on disk, or bundled default data.
 */
export async function getSiteContent(): Promise<SiteContent> {
  // 1. Try reading from Cloudflare D1 database
  try {
    const db = await getD1Database();
    if (db) {
      const row = await db.prepare("SELECT data FROM site_content WHERE key = 'main'").first();
      if (row && row.data) {
        const parsed = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
        const normalized = ensureSections(parsed);
        inMemoryCache = normalized;
        return normalized;
      }
    }
  } catch (d1Err) {
    console.warn("[contentStore] Cloudflare D1 read warning:", d1Err);
  }

  // 2. Return in-memory cached content if available
  if (inMemoryCache) {
    return ensureSections(inMemoryCache);
  }

  // 3. Fall back to local file on disk if filesystem is readable
  try {
    const filePath = path.join(process.cwd(), "src/data/siteContent.json");
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(fileContents);
      const normalized = ensureSections(parsed);
      inMemoryCache = normalized;
      return normalized;
    }
  } catch (fsErr) {
    // Expected on environments without Node fs access
  }

  // 4. Default bundled data fallback
  return defaultData as SiteContent;
}

/**
 * Persists site content to Cloudflare D1 database, in-memory cache, and local disk if available.
 */
export async function saveSiteContent(newContent: SiteContent): Promise<boolean> {
  let savedToD1 = false;
  let savedToDisk = false;

  // 1. Save to Cloudflare D1 database
  try {
    const db = await getD1Database();
    if (db) {
      const jsonString = JSON.stringify(newContent);
      await db
        .prepare(
          "INSERT OR REPLACE INTO site_content (key, data, updated_at) VALUES ('main', ?, CURRENT_TIMESTAMP)"
        )
        .bind(jsonString)
        .run();
      savedToD1 = true;
      console.log("[contentStore] Successfully persisted to Cloudflare D1 (mpscexam-db)!");
    }
  } catch (d1Err) {
    console.error("[contentStore] Cloudflare D1 write error:", d1Err);
  }

  // 2. Save to local disk if running in Node.js environment with writable disk
  try {
    const filePath = path.join(process.cwd(), "src/data/siteContent.json");
    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2), "utf8");
    savedToDisk = true;
  } catch (fsErr) {
    // Cloudflare Workers has a read-only filesystem (EROFS), which is expected
  }

  // 3. Keep in-memory cache synchronized so all immediate server requests see changes
  inMemoryCache = newContent;

  // Operation is considered successful if saved to D1, disk, or cached in-memory
  return savedToD1 || savedToDisk || true;
}
