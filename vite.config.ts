import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: './src/test/setup.ts',
  // },
});
