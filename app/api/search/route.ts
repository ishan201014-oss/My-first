import { NextResponse } from 'next/server';
import { samplePrompts } from '@/lib/sample-prompts';
export async function GET(request: Request) { const q = new URL(request.url).searchParams.get('q')?.toLowerCase() || ''; const suggestions = samplePrompts.filter((p) => [p.title, ...p.tags].join(' ').toLowerCase().includes(q)).slice(0, 8).map((p) => ({ id: p.id, title: p.title, category: p.category })); return NextResponse.json({ suggestions }); }
