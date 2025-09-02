import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    minify: 'terser', // use terser for advanced compression
    terserOptions: {
      compress: {
        drop_console: true,   // removes all console.* calls
        drop_debugger: true,  // removes debugger statements
      },
    },
  },
});
