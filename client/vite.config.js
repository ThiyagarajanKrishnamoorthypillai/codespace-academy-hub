import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // your local backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // important for Vercel
  },
});
