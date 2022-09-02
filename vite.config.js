import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import replace from '@rollup/plugin-replace';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      manifest: true,
      minify: false,
      sourcemap: true,
      rollupOptions: {
        input: 'app/bannerCreator.js',
        output: {
          dir: 'dist',
          format: 'esm',
          // file: 'index.js'
        },
        treeshake: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        plugins: [
          replace({
            delimiters: ['/', ''],
            public: [`${env.SERVICE_HOST}`] // replace static public paths with remote prod host
          })
        ],
        // external: ['pixi.js']
      },
      plugins: [
        legacy({
          targets: ['defaults', 'not IE 11']
        })
      ]
    }
  };
});
