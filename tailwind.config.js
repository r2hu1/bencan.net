/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryBackgroundColor: '#2A2A2A',
        secondaryBackgroundColor: '#2E2E2E',
        tertiaryBackgroundColor: '#323232',
        primaryTextColor: '#FFFFFF',
        secondaryTextColor: '#FFFFFFB2',
        tertiaryTextColor: '#FFFFFF80',
        discordStatus: {
          offline: '#FFFFFF30',
          online: '#43B581',
          idle: '#FAA61A',
          dnd: '#F04747'
        }
      }
    },
    screens: {
      'xs': '320px',
      'mobile': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl': '1440px',
      '3xl': '1920px'
    }
  },
  plugins: [],
}