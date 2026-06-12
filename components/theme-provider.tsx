'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'dark', toggleTheme: () => {} });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => { const stored = (localStorage.getItem('theme') as Theme) || 'dark'; setTheme(stored); document.documentElement.classList.toggle('light', stored === 'light'); document.documentElement.classList.toggle('dark', stored === 'dark'); }, []);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((next) => { const updated = next === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', updated); document.documentElement.classList.toggle('light', updated === 'light'); document.documentElement.classList.toggle('dark', updated === 'dark'); return updated; }) }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
