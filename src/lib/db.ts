/**
 * Unified database interface supporting Cloudflare D1 in edge runtime
 * and local SQLite in Node.js development runtime.
 */

export interface D1DatabaseLike {
  prepare(sql: string): {
    bind(...args: any[]): {
      first<T = any>(): Promise<T | null>;
      all<T = any>(): Promise<{ results: T[] }>;
      run(): Promise<{ success: boolean; meta?: any }>;
    };
    first<T = any>(): Promise<T | null>;
    all<T = any>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean; meta?: any }>;
  };
}

let localSqliteInstance: any = null;

export async function getDb(): Promise<{ db: D1DatabaseLike | null; engine: string }> {
  // 1. Cloudflare Workers / Pages runtime (production edge or vinext-cloudflare)
  try {
    // @ts-ignore
    const workers = await import("cloudflare:workers");
    if (workers?.env?.DB) {
      return { db: workers.env.DB, engine: "Cloudflare D1 (Edge Runtime)" };
    }
  } catch {
    // Not running in Cloudflare Workers
  }

  // 2. Node.js runtime (e.g. Next.js dev server, Next.js build)
  try {
    if (typeof process !== "undefined" && process.versions?.node) {
      if (localSqliteInstance) {
        return { db: localSqliteInstance, engine: "Local D1 SQLite (Node.js)" };
      }

      // Dynamic import to avoid bundling issues in edge
      const fs = await import("fs");
      const path = await import("path");
      // @ts-ignore
      const sqlite = await import("node:sqlite");

      if (sqlite?.DatabaseSync) {
        const d1Dir = path.join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
        let dbPath = "";
        if (fs.existsSync(d1Dir)) {
          const files = fs.readdirSync(d1Dir);
          const found = files.find((f: string) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
          if (found) {
            dbPath = path.join(d1Dir, found);
          }
        }

        if (!dbPath) {
          const fallbackDir = path.join(process.cwd(), ".wrangler/state/v3/d1");
          if (!fs.existsSync(fallbackDir)) {
            fs.mkdirSync(fallbackDir, { recursive: true });
          }
          dbPath = path.join(fallbackDir, "local-dev.sqlite");
        }

        const nativeDb = new sqlite.DatabaseSync(dbPath);

        // Ensure tables exist in local SQLite
        nativeDb.exec(`
          CREATE TABLE IF NOT EXISTS site_content (
            key TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS uploaded_images (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            data TEXT NOT NULL,
            size INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Adapter providing Cloudflare D1 prepare().bind().first() / .all() / .run() API
        const adapter: D1DatabaseLike = {
          prepare(sql: string) {
            return {
              bind(...args: any[]) {
                return {
                  async first<T = any>(): Promise<T | null> {
                    const stmt = nativeDb.prepare(sql);
                    const row = stmt.get(...args);
                    return (row as T) || null;
                  },
                  async all<T = any>(): Promise<{ results: T[] }> {
                    const stmt = nativeDb.prepare(sql);
                    const rows = stmt.all(...args);
                    return { results: rows as T[] };
                  },
                  async run(): Promise<{ success: boolean; meta?: any }> {
                    const stmt = nativeDb.prepare(sql);
                    const res = stmt.run(...args);
                    return { success: true, meta: res };
                  },
                };
              },
              async first<T = any>(): Promise<T | null> {
                const stmt = nativeDb.prepare(sql);
                const row = stmt.get();
                return (row as T) || null;
              },
              async all<T = any>(): Promise<{ results: T[] }> {
                const stmt = nativeDb.prepare(sql);
                const rows = stmt.all();
                return { results: rows as T[] };
              },
              async run(): Promise<{ success: boolean; meta?: any }> {
                const stmt = nativeDb.prepare(sql);
                const res = stmt.run();
                return { success: true, meta: res };
              },
            };
          },
        };

        localSqliteInstance = adapter;
        return { db: adapter, engine: "Local D1 SQLite (Node.js)" };
      }
    }
  } catch (err) {
    console.warn("[getDb] Could not initialize local SQLite adapter:", err);
  }

  return { db: null, engine: "None (Fallback Storage)" };
}

export async function checkDbHealth(): Promise<{
  ok: boolean;
  engine: string;
  tables: { site_content: boolean; uploaded_images: boolean };
  imageCount: number;
  contentExists: boolean;
  error?: string;
}> {
  try {
    const { db, engine } = await getDb();
    if (!db) {
      return {
        ok: false,
        engine: "Unavailable",
        tables: { site_content: false, uploaded_images: false },
        imageCount: 0,
        contentExists: false,
        error: "Database binding / connection not found",
      };
    }

    let siteContentOk = false;
    let uploadedImagesOk = false;
    let imageCount = 0;
    let contentExists = false;

    try {
      const contentRow = await db.prepare("SELECT key FROM site_content WHERE key = 'main'").first();
      siteContentOk = true;
      contentExists = !!contentRow;
    } catch {
      siteContentOk = false;
    }

    try {
      const imgRes = await db.prepare("SELECT COUNT(*) as count FROM uploaded_images").first<{ count: number }>();
      uploadedImagesOk = true;
      imageCount = Number(imgRes?.count || 0);
    } catch {
      uploadedImagesOk = false;
    }

    return {
      ok: siteContentOk && uploadedImagesOk,
      engine,
      tables: {
        site_content: siteContentOk,
        uploaded_images: uploadedImagesOk,
      },
      imageCount,
      contentExists,
    };
  } catch (err: any) {
    return {
      ok: false,
      engine: "Error",
      tables: { site_content: false, uploaded_images: false },
      imageCount: 0,
      contentExists: false,
      error: err.message || "Unknown health check error",
    };
  }
}
