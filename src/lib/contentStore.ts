import defaultData from "@/data/siteContent.json";
import fs from "fs";
import path from "path";

export type SiteContent = typeof defaultData;

export function getDefaultSiteContent(): SiteContent {
  return defaultData as SiteContent;
}

export function getSiteContent(): SiteContent {
  try {
    const filePath = path.join(process.cwd(), "src/data/siteContent.json");
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents);
    }
  } catch (err) {
    console.error("Error reading site content, falling back to default:", err);
  }
  return defaultData as SiteContent;
}

export function saveSiteContent(newContent: SiteContent): boolean {
  try {
    const filePath = path.join(process.cwd(), "src/data/siteContent.json");
    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error saving site content:", err);
    return false;
  }
}
