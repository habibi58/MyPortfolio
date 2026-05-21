/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d5ff',
          300: '#a3b9ff',
          400: '#6b89e0',
          500: '#0d47a1',
          600: '#0a3585',
          700: '#082469',
          800: '#051854',
          900: '#030d33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(13, 71, 161, 0.35)',
        'glow-lg': '0 0 40px rgba(13, 71, 161, 0.25)',
      },
      animation: {
        blob: 'blob 7s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
