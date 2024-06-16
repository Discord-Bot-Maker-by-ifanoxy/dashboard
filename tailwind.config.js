/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)\n',
        'light-grey': 'var(--light-grey)\n',
        grey: 'var(--grey)\n',
        'dark-grey': 'var(--dark-grey)\n',
        dark: 'var(--dark)\n'
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ]
}
