import { MetadataRoute } from "next";
import { getAllPseoSlugs } from "@/lib/pseo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mpscexam.in";
  const slugs = await getAllPseoSlugs();

  const dynamicRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: slug.includes("199") || slug.includes("master25") || slug.includes("january-2027") ? 0.9 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1.0,
    },
    ...dynamicRoutes,
  ];
}
