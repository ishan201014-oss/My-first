'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const suggestions = ['anime cyberpunk ronin', 'fantasy dragon citadel', 'realistic product photo', 'minecraft survival base', 'minimal AI logo'];
export function SearchBar({ large = false }: { large?: boolean }) { const [q, setQ] = useState(''); const router = useRouter(); return <form onSubmit={(e) => { e.preventDefault(); router.push(`/explore?q=${encodeURIComponent(q)}`); }} className="relative mx-auto max-w-3xl"><div className="glass flex items-center gap-3 rounded-2xl p-2"><Search className="ml-3 h-5 w-5 text-neon-blue" /><input value={q} onChange={(e) => setQ(e.target.value)} list="prompt-suggestions" placeholder="Search 720+ image prompts..." className={`${large ? 'py-4 text-lg' : 'py-3'} w-full border-0 bg-transparent text-white placeholder:text-slate-500 focus:ring-0`} /><button className="rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-semibold text-white">Search</button></div><datalist id="prompt-suggestions">{suggestions.map((s) => <option key={s} value={s} />)}</datalist></form>; }
