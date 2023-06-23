const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: 'var(--font-vazirmatn)',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '.scrollbar-minimal::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },

        '.scrollbar-minimal::-webkit-scrollbar-track': {
          borderRadius: '8%',
          backgroundColor: 'rgba(245, 245, 245, 255)',
        },

        '.scrollbar-minimal::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: '100vh',
        },

        '.scrollbar-minimal::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },

        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none',
        },
      });
    }),
  ],
}
