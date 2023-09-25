/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#2A2A2A',
          secondary: '#2E2E2E',
          tertiary: '#323232',
          primaryText: '#FFFFFF',
          secondaryText: '#FFFFFFB2',
          tertiaryText: '#FFFFFF80'
        },

        light: {
          primary: '#FFFFFF',
          secondary: '#F9F9F9',
          tertiary: '#F3F3F3',
          primaryText: '#212121',
          secondaryText: '#666666',
          tertiaryText: '#909090'
        },

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
  darkMode: 'class'
}