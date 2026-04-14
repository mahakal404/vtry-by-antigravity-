/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vtry-bg': 'var(--color-bg, #1b0f2e)',
        'vtry-card': 'var(--color-card, #291943)',
        'vtry-primary': 'var(--color-primary, #8852e0)',
        'vtry-border': 'var(--color-border, #3b2d53)',
        'vtry-text': 'var(--color-text, #fafafa)',
        'vtry-muted': 'var(--color-muted, #a294b8)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
