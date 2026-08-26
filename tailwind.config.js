/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',
          primary: '#1E3A8A',
          secondary: '#2563EB',
          accent: '#D97706',
          surface: '#F8FAFC',
          border: '#E2E8F0',
        }
      }
    },
  },
  plugins: [],
}
