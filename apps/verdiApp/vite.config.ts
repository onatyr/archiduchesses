import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
      '@shared': fileURLToPath(new URL('../shared/', import.meta.url)),
    },
    extensions: ['.ts', '.tsx', '.json'],
  },
  build: {
    emptyOutDir: true, // Clear the output directory before building (default is true)
    outDir: '../../dist/verdiApp', // Output directory (default is 'dist')
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
