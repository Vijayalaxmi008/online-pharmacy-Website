/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9f2', 100: '#d6f0e0', 200: '#aee0c1', 300: '#82cd9f',
          400: '#5cbe85', 500: '#4caf7d', 600: '#3c9268', 700: '#2f7453',
          800: '#245943', 900: '#1a4433',
        },
        navy: {
          500: '#0b1f66', 600: '#081748', 700: '#061238',
        },
        gold: {
          400: '#ffcb2b', 500: '#ffc107', 600: '#f0a800',
        },
        ink: {
          900: '#2e2e2e', 700: '#58595b', 500: '#929497', 100: '#f1f1f1',
        },
      },
    },
  },
  plugins: [],
}
