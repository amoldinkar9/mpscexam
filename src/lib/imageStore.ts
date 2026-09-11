import { getDb } from "@/lib/db";
import path from "path";
import fs from "fs";

export interface StoredImageMetadata {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string;
  verifiedInDatabase: boolean;
  engine: string;
}

/**
 * Saves an uploaded image to Cloudflare D1 database (table: uploaded_images)
 * and writes to local public/uploads directory as static fallback in Node.js.
 */
export async function saveUploadedImage({
  filename,
  mimeType,
  buffer,
}: {
  filename: string;
  mimeType: string;
  buffer: Buffer | Uint8Array;
}): Promise<StoredImageMetadata> {
  // Generate safe unique ID
  const cleanExt = (filename.split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "");
  const baseName = filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9-_]/g, "_").slice(0, 30);
  const id = `${baseName}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${cleanExt}`;

  // Convert buffer to Base64 string for portable D1 storage
  const base64Data = Buffer.from(buffer).toString("base64");
  const size = buffer.byteLength;

  let verifiedInDatabase = false;
  let engine = "None";

  // 1. Save to Database (Cloudflare D1 or Local SQLite)
  try {
    const dbInfo = await getDb();
    engine = dbInfo.engine;
    if (dbInfo.db) {
      await dbInfo.db
        .prepare(
          "INSERT OR REPLACE INTO uploaded_images (id, filename, mime_type, data, size, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)"
        )
        .bind(id, filename, mimeType, base64Data, size)
        .run();

      // Read back to verify
      const verifyRow = await dbInfo.db
        .prepare("SELECT id, size, created_at FROM uploaded_images WHERE id = ?")
        .bind(id)
        .first<{ id: string; size: number; created_at: string }>();

      if (verifyRow && verifyRow.id === id) {
        verifiedInDatabase = true;
      }
    }
  } catch (dbErr) {
    console.error("[imageStore] Error saving image to database:", dbErr);
  }

  // 2. Save to local disk (public/uploads/) if running in environment with filesystem
  try {
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, id);
    fs.writeFileSync(filePath, Buffer.from(buffer));
  } catch (fsErr) {
    // Expected on read-only edge environments (e.g. Cloudflare Workers EROFS)
  }

  const url = `/api/images/${id}`;

  return {
    id,
    url,
    filename,
    mimeType,
    size,
    createdAt: new Date().toISOString(),
    verifiedInDatabase,
    engine,
  };
}

/**
 * Retrieves an image by its ID, checking Cloudflare D1 first, then local disk fallback.
 */
export async function getImageById(
  id: string
): Promise<{ mimeType: string; buffer: Buffer; filename: string; size: number } | null> {
  // 1. Check Database (D1 / SQLite)
  try {
    const { db } = await getDb();
    if (db) {
      const row = await db
        .prepare("SELECT filename, mime_type, data, size FROM uploaded_images WHERE id = ?")
        .bind(id)
        .first<{ filename: string; mime_type: string; data: string; size: number }>();

      if (row && row.data) {
        const buffer = Buffer.from(row.data, "base64");
        return {
          filename: row.filename,
          mimeType: row.mime_type,
          buffer,
          size: row.size || buffer.byteLength,
        };
      }
    }
  } catch (dbErr) {
    console.warn("[imageStore] Error fetching image from database:", dbErr);
  }

  // 2. Check local disk fallback
  try {
    const filePath = path.join(process.cwd(), "public/uploads", id);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const ext = id.split(".").pop()?.toLowerCase();
      let mimeType = "image/jpeg";
      if (ext === "png") mimeType = "image/png";
      else if (ext === "webp") mimeType = "image/webp";
      else if (ext === "gif") mimeType = "image/gif";
      else if (ext === "svg") mimeType = "image/svg+xml";

      return {
        filename: id,
        mimeType,
        buffer,
        size: buffer.byteLength,
      };
    }
  } catch (fsErr) {
    // Disk read error or not found
  }

  return null;
}

/**
 * Lists uploaded images stored in the database.
 */
export async function listUploadedImages(
  limit: number = 30
): Promise<Array<{ id: string; url: string; filename: string; mimeType: string; size: number; createdAt: string }>> {
  try {
    const { db } = await getDb();
    if (db) {
      const { results } = await db
        .prepare("SELECT id, filename, mime_type, size, created_at FROM uploaded_images ORDER BY created_at DESC LIMIT ?")
        .bind(limit)
        .all<{ id: string; filename: string; mime_type: string; size: number; created_at: string }>();

      if (results && Array.isArray(results)) {
        return results.map((r) => ({
          id: r.id,
          url: `/api/images/${r.id}`,
          filename: r.filename,
          mimeType: r.mime_type,
          size: r.size,
          createdAt: r.created_at,
        }));
      }
    }
  } catch (err) {
    console.error("[imageStore] Error listing uploaded images:", err);
  }

  // Fallback to local disk listing if database query returned empty
  try {
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir).slice(0, limit);
      return files.map((f) => {
        const stats = fs.statSync(path.join(uploadsDir, f));
        return {
          id: f,
          url: `/api/images/${f}`,
          filename: f,
          mimeType: "image/jpeg",
          size: stats.size,
          createdAt: stats.mtime.toISOString(),
        };
      });
    }
  } catch {
    // Ignore fallback errors
  }

  return [];
}

/**
 * Deletes an uploaded image from database and disk.
 */
export async function deleteUploadedImage(id: string): Promise<boolean> {
  let deletedFromDb = false;

  try {
    const { db } = await getDb();
    if (db) {
      await db.prepare("DELETE FROM uploaded_images WHERE id = ?").bind(id).run();
      deletedFromDb = true;
    }
  } catch (err) {
    console.error("[imageStore] Error deleting image from database:", err);
  }

  try {
    const filePath = path.join(process.cwd(), "public/uploads", id);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // Ignore disk deletion error
  }

  return deletedFromDb;
}
