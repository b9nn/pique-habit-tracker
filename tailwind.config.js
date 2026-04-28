/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pique brand palette pulled from Figma PNGs
        brand: {
          // Bright primary green (buttons, accents, bottom nav)
          500: '#5EB788',
          600: '#4FAF7F',
          700: '#3F9F6F',
          // Dark forest green (headers, tab bar label)
          ink: '#1F4130',
          inkDeep: '#173226',
        },
        // Tinted card backgrounds — soft mint, blue, gray, dark
        tile: {
          mint: '#BCE3C8',     // light mint green
          mintSoft: '#D6EEDE',
          blue: '#C5E5EC',     // light sky blue
          blueSoft: '#E0F0F4',
          gray: '#A9A9A9',     // medium gray
          graySoft: '#D4D4D4',
          dark: '#3D5C4E',     // dark green/gray card
          muted: '#E8EAE8',    // neutral off-white
        },
        paper: '#F7F8F6',       // app bg
        ink: {
          900: '#0E1E16',
          700: '#1A2E22',
          500: '#4A5B52',
          300: '#8A9992',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'script-lg': ['4rem', '1'],
        'script-md': ['3rem', '1'],
        'script-sm': ['2rem', '1'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 30, 22, 0.06), 0 1px 2px rgba(15, 30, 22, 0.04)',
        soft: '0 8px 32px rgba(15, 30, 22, 0.08)',
        nav: '0 -2px 12px rgba(15, 30, 22, 0.08)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
    },
  },
  plugins: [],
}
