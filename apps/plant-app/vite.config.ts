import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "path";
import { config as dotenvConfig } from 'dotenv';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': dotenvConfig({path: path.resolve(__dirname, '../../.env')})
  },

  build: {
    emptyOutDir: true,
    outDir: '../../dist/plant-app/',
  },
  resolve: {
    alias: {
      '@plantApp': path.resolve(__dirname, './'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  }
});