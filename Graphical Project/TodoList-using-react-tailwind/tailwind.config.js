/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm:'350px',
      },
      
        'custom-teal': '60px -16px 0 teal', // Custom box shadow
    },
  },
  plugins: [],
}