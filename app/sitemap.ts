import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://work-ai-hub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/report", priority: 0.9, changeFrequency: "monthly" },
    { path: "/summarize", priority: 0.8, changeFrequency: "monthly" },
    { path: "/translate", priority: 0.8, changeFrequency: "monthly" },
    { path: "/chat", priority: 0.8, changeFrequency: "monthly" },
    { path: "/idea", priority: 0.8, changeFrequency: "monthly" },
    { path: "/writing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/email", priority: 0.8, changeFrequency: "monthly" },
    { path: "/seo", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllArticles().map(a => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
