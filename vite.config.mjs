import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {},

  plugins: [
    react(),
    tsconfigPaths(),
    svgr({}),
    // tailwindcss(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: {},
    }),
    // sentryVitePlugin({
    //   org: 'medexer',
    //   project: 'javascript-react',
    // }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },

  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },

  build: {
    sourcemap: true,
  },
});
