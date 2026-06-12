import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Prompt, PromptFilters } from './types';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatNumber(value: number) { return Intl.NumberFormat('en', { notation: value > 9999 ? 'compact' : 'standard' }).format(value); }
export function siteUrl() { return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; }
export function trendingScore(prompt: Prompt) {
  const ageHours = Math.max(1, (Date.now() - new Date(prompt.createdAt).getTime()) / 36e5);
  return (prompt.likes * 4 + prompt.favorites * 6 + prompt.views) / Math.pow(ageHours + 2, 0.55);
}
export function filterPrompts(prompts: Prompt[], filters: PromptFilters) {
  let filtered = [...prompts];
  if (filters.category && filters.category !== 'All') filtered = filtered.filter((p) => p.category === filters.category);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((p) => [p.title, p.content, p.category, p.authorName, ...p.tags].join(' ').toLowerCase().includes(q));
  }
  const sort = filters.sort || 'trending';
  filtered.sort((a, b) => {
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === 'popular') return b.likes + b.favorites - (a.likes + a.favorites);
    if (sort === 'views') return b.views - a.views;
    return trendingScore(b) - trendingScore(a);
  });
  return filtered;
}
export async function copyText(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) return navigator.clipboard.writeText(text);
}
