'use client';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'sonner';
import { ThemeProvider } from './theme-provider';
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><AuthProvider>{children}<Toaster richColors theme="dark" position="top-right" /></AuthProvider></ThemeProvider>;
}
