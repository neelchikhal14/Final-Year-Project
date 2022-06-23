/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-black': '#000000',
        'base-white': '#FFFFFF',
        'base-green': '#00817D',
        'base-backgound-1': '#DFEFEF',
        'base-backgound-2': '#F3F3F3',
      },
    },
  },
  plugins: [],
};
