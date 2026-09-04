import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const jsonPath = path.join(process.cwd(), "src/data/siteContent.json");
const content = fs.readFileSync(jsonPath, "utf8");

// Escape single quotes for SQL
const escaped = content.replace(/'/g, "''");

const sql = `INSERT OR REPLACE INTO site_content (key, data, updated_at) VALUES ('main', '${escaped}', CURRENT_TIMESTAMP);`;

const sqlFile = path.join(process.cwd(), "seed.sql");
fs.writeFileSync(sqlFile, sql, "utf8");

console.log("Seeding remote D1 database...");
execSync("npx wrangler d1 execute mpscexam-db --remote --file=seed.sql", { stdio: "inherit" });

console.log("Seeding local D1 database...");
execSync("npx wrangler d1 execute mpscexam-db --local --file=seed.sql", { stdio: "inherit" });

fs.unlinkSync(sqlFile);
console.log("Seeding completed successfully!");
