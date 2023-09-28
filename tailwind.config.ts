import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        my_black: { DEFAULT: '#15191a', 100: '#040505', 200: '#080a0a', 300: '#0c0f0f', 400: '#101414', 500: '#15191a', 600: '#3e4a4d', 700: '#677b81', 800: '#98a8ac', 900: '#cbd4d6' },
        my_green: { DEFAULT: '#4e6e58', 100: '#101612', 200: '#1f2c23', 300: '#2f4235', 400: '#3f5847', 500: '#4e6e58', 600: '#699477', 700: '#8eaf99', 800: '#b4cabb', 900: '#d9e4dd' },
        my_white: { DEFAULT: '#edeae2', 100: '#393324', 200: '#726747', 300: '#a69871', 400: '#cac1aa', 500: '#edeae2', 600: '#f1efe8', 700: '#f4f3ee', 800: '#f8f7f4', 900: '#fbfbf9' },
        my_red: { DEFAULT: '#a04732', 100: '#200e0a', 200: '#401c14', 300: '#5f2a1e', 400: '#7f3828', 500: '#a04732', 600: '#c55f48', 700: '#d48776', 800: '#e2afa4', 900: '#f1d7d1' },
        my_blue: { DEFAULT: '#50808e', 100: '#101a1d', 200: '#203439', 300: '#304d56', 400: '#416773', 500: '#50808e', 600: '#6d9ead', 700: '#91b6c1', 800: '#b6ced6', 900: '#dae7ea' },
        my_yellow: { DEFAULT: '#ffc857', 100: '#442e00', 200: '#895b00', 300: '#cd8900', 400: '#ffb012', 500: '#ffc857', 600: '#ffd278', 700: '#ffdd9a', 800: '#ffe9bc', 900: '#fff4dd' }
      }
    },
  },
  plugins: [],
}
export default config
