/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#F8F7FF',
        'surface': '#FFFFFF',
        'surface-soft': '#FCFBFF',
        'preview-bg': '#FAF8FF',
        'brand-purple': '#7C3AED',
        'brand-dark': '#6D28D9',
        'brand-pink': '#EC4899',
        'brand-indigo': '#6366F1',
        'text-main': '#111827',
        'text-muted': '#667085',
        'border-soft': '#E7E3F4',
        'border-active': '#B9A7E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
