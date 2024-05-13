import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#f9f8ff',
          100: '#f3f0ff',
          200: '#e6dbff',
          300: '#d9c6ff',
          400: '#bf99ff',
          500: '#a56bff',
          600: '#954ff5',
          700: '#7d3fe0',
          800: '#632fc6',
          900: '#5125a7',
        },
      },
    },
  },
  plugins: [],
};
export default config;
