/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adminBg: "#F5F8F6",
        darkForest: {
          DEFAULT: "#063B2A",
          hover: "#084a35",
          dark: "#04281c",
          darker: "#071A14",
        },
        primaryGreen: {
          DEFAULT: "#10B981",
          hover: "#059669",
          dark: "#047857",
          light: "#34D399",
        },
        lightEmerald: "#34D399",
        darkText: "#071A14",
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(6, 59, 42, 0.07), 0 4px 6px -2px rgba(6, 59, 42, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(6, 59, 42, 0.1), 0 4px 6px -2px rgba(6, 59, 42, 0.05)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
