/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#bf00ff',
          gold: '#ffd700',
          green: '#00ff88',
          red: '#ff3366',
        },
        dark: {
          900: '#030712',
          800: '#0a0f1e',
          700: '#0f1729',
          600: '#162038',
          500: '#1e2d4a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'card-glow': 'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'number-up': 'number-up 0.4s ease-out',
        'number-down': 'number-down 0.4s ease-out',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.7), 0 0 80px rgba(0, 245, 255, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'number-up': {
          '0%': { color: '#00ff88', transform: 'translateY(-8px)', opacity: '0' },
          '100%': { color: '#00ff88', transform: 'translateY(0)', opacity: '1' },
        },
        'number-down': {
          '0%': { color: '#ff3366', transform: 'translateY(8px)', opacity: '0' },
          '100%': { color: '#ff3366', transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
