/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#063B2A",
          hover: "#084833",
          light: "#0d5940",
          dark: "#04271c",
        },
        secondary: {
          DEFAULT: "#10B981",
          hover: "#059669",
          dark: "#047857",
          light: "#34D399",
        },
        accent: {
          DEFAULT: "#34D399",
          hover: "#10B981",
          light: "#6EE7B7",
        },
        forest: {
          950: "#071A14",
          900: "#063B2A",
          850: "#084733",
          800: "#0B5A41",
          700: "#107C5B",
          600: "#139D73",
        },
        agriBg: "#F5F8F6",
        dark: "#071A14",
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
        'soft': '0 4px 20px -2px rgba(6, 59, 42, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(6, 59, 42, 0.12)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
