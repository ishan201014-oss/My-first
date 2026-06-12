import type { Metadata } from 'next';
import { ExploreClient } from '@/components/explore-client';
import { samplePrompts } from '@/lib/sample-prompts';
export const metadata: Metadata = { title: 'Explore AI Image Prompts', description: 'Search, filter, sort, and infinitely browse premium AI image prompts.' };
export default function ExplorePage() { return <main><section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-neon-blue">Explore</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">Search the prompt library</h1><p className="mt-4 max-w-2xl text-slate-400">Filter by category, sort by momentum, and load hundreds of production-ready prompts without leaving the page.</p></section><ExploreClient prompts={samplePrompts} /></main>; }
