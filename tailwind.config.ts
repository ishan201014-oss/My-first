import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070816',
        midnight: '#0B1024',
        neon: { purple: '#A855F7', blue: '#38BDF8', pink: '#F472B6' },
      },
      boxShadow: {
        glow: '0 0 35px rgba(168, 85, 247, 0.35)',
        blueglow: '0 0 35px rgba(56, 189, 248, 0.25)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top left, rgba(168,85,247,.30), transparent 32%), radial-gradient(circle at 80% 10%, rgba(56,189,248,.22), transparent 30%), linear-gradient(180deg, #070816 0%, #0B1024 58%, #070816 100%)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
      },
      animation: { float: 'float 7s ease-in-out infinite' },
    },
  },
  plugins: [],
};
export default config;
