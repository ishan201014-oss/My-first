import type { MetadataRoute } from 'next';
import { samplePrompts } from '@/lib/sample-prompts';
import { categories } from '@/lib/categories';
import { siteUrl } from '@/lib/utils';
export default function sitemap(): MetadataRoute.Sitemap { const base = siteUrl(); return [{ url: base, lastModified: new Date() }, { url: `${base}/explore`, lastModified: new Date() }, { url: `${base}/leaderboard`, lastModified: new Date() }, ...categories.map((c) => ({ url: `${base}/explore?category=${encodeURIComponent(c.name)}`, lastModified: new Date() })), ...samplePrompts.slice(0, 600).map((p) => ({ url: `${base}/prompts/${p.id}`, lastModified: new Date(p.createdAt) }))]; }
