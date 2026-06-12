import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { siteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'PromptHub AI - Discover Production-Ready AI Image Prompts', template: '%s | PromptHub AI' },
  description: 'Search, copy, like, favorite, and submit premium AI image prompts for anime, fantasy, realistic, Minecraft, logos, wallpapers, gaming, photography, cinematic, and sci-fi workflows.',
  openGraph: { title: 'PromptHub AI', description: 'Premium AI image prompt discovery platform.', url: siteUrl(), siteName: 'PromptHub AI', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'PromptHub AI', description: 'Discover premium AI image prompts.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className="dark"><body className="bg-radial-glow"><Providers><div className="pointer-events-none fixed inset-0 grid-mask opacity-40" /><div className="relative z-10"><Navbar />{children}<Footer /></div></Providers></body></html>; }
