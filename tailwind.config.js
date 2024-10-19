// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/landing/components/landing-button.tsx', 
  ],
  theme: {
    extend: {
      fontFamily: {
        italiana: ['Italiana', 'serif'],
      },
      colors: {
        'deep-blue': '#222B3D',
        'light-blue' : '#D9E5F1'
      }, 
    },
  },
  plugins: [],
};
