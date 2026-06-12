'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Plus, Search, Sparkles, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

const nav = [{ href: '/', label: 'Home' }, { href: '/explore', label: 'Explore' }, { href: '/leaderboard', label: 'Leaderboard' }, { href: '/dashboard', label: 'Dashboard' }];
export function Navbar() {
  const pathname = usePathname(); const { user, logout } = useAuth(); const { theme, toggleTheme } = useTheme(); const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-2xl">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3 font-bold"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple shadow-glow"><Sparkles className="h-5 w-5" /></span><span className="text-xl">PromptHub <span className="neon-text">AI</span></span></Link>
      <div className="hidden items-center gap-1 md:flex">{nav.map((item) => <Link key={item.href} href={item.href} className={cn('rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white', pathname === item.href && 'bg-white/10 text-white')}>{item.label}</Link>)}</div>
      <div className="hidden items-center gap-3 md:flex">
        <Link href="/explore" className="rounded-full border border-white/10 p-2 text-slate-300 hover:text-white"><Search className="h-5 w-5" /></Link>
        <button onClick={toggleTheme} className="rounded-full border border-white/10 p-2 text-slate-300 hover:text-white" aria-label="Toggle theme">{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
        {user ? <><Link href="/submit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"><Plus className="mr-1 inline h-4 w-4" />Submit</Link><button onClick={logout} className="text-sm text-slate-300">Logout</button></> : <Link href="/login" className="rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-2 text-sm font-semibold text-white shadow-glow">Sign in</Link>}
      </div>
      <button onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div className="border-t border-white/10 px-4 pb-4 md:hidden">{nav.map((item) => <Link onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-slate-200" href={item.href} key={item.href}>{item.label}</Link>)}<Link href={user ? '/submit' : '/login'} className="mt-2 block rounded-xl bg-white px-4 py-3 text-center font-semibold text-ink">{user ? 'Submit Prompt' : 'Sign in'}</Link></div>}
  </header>;
}
