/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#2D4F1E',
        sand: '#D4A373'
      }
    }
  },
  plugins: []
};
