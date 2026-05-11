import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#07152f',
        skyblue: '#37a7ff',
        amberline: '#ff9f1c'
      }
    }
  },
  plugins: []
}
export default config
