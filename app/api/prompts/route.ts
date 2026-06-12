import { NextResponse } from 'next/server';
import { samplePrompts } from '@/lib/sample-prompts';
import { filterPrompts } from '@/lib/utils';
import type { Category } from '@/lib/types';
export async function GET(request: Request) { const { searchParams } = new URL(request.url); const category = (searchParams.get('category') || 'All') as Category | 'All'; const sort = (searchParams.get('sort') || 'trending') as 'trending' | 'newest' | 'popular' | 'views'; const prompts = filterPrompts(samplePrompts, { search: searchParams.get('q') || undefined, category, sort }); return NextResponse.json({ prompts: prompts.slice(0, Number(searchParams.get('limit') || 50)), total: prompts.length }); }
