/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oil: {
          navy: {
            950: '#060D17',
            900: '#0B192C',
            850: '#0F223D',
            800: '#152C4E',
            700: '#1E3E62',
            600: '#2A5384',
          },
          cyan: {
            400: '#22D3EE',
            500: '#06B6D4',
            accent: '#00E5FF',
          },
          gold: {
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          },
          alert: {
            critical: '#EF4444',
            warning: '#F59E0B',
            safe: '#10B981',
            info: '#3B82F6',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
