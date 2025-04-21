import { defineConfig } from '@tailwindcss/postcss';

     export default defineConfig({
       content: ['./src/**/*.{ts,tsx}'],
       theme: {
         extend: {
           fontFamily: {
             montserrat: ['Montserrat', 'sans-serif'],
           },
           colors: {
            teal: {
              600: '#0D9488',
              700: '#0F766E',
            },
          },
         },
       },
       plugins: [],
     });