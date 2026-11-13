/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#F25A2B',
          orangeHover: '#D94618',
          green: '#339D4A',
          indigo: '#38287B',
          grey: '#5D6363',
        },
        dark: {
          bg: '#0B0F17',
          card: '#131924',
          elevated: '#1A2230',
          border: '#1F2937',
        },
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
      spacing: {
        '4.5': '1.125rem',
        '9.5': '2.375rem',
      },
    },
  },
  plugins: [],
};
