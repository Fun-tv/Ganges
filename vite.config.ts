import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Asset aliases for Figma assets
      'figma:asset': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    host: true, // Listen on all addresses, including LAN and public IPs
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});