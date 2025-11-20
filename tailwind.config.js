/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#0f0',
        'dark-green': '#003300',
        'term-black': '#0a0a0a',
        'term-gray': '#1a1a1a',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        retro: ['"VT323"', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}