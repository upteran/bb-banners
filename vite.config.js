import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import replace from '@rollup/plugin-replace';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.SERVICE_HOST)
  return {
    build: {
      manifest: true,
      minify: false,
      // sourcemap: true,
      rollupOptions: {
        input: 'app/bannerCreator.js',
        output: {
          dir: 'dist',
          format: 'es'
        },
        treeshake: false,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        plugins: [
          replace({
            public: [`${env.SERVICE_HOST}`] // replace static public paths with remote prod host
          })
        ]
      },
      plugins: [
        legacy({
          targets: ['defaults', 'not IE 11']
        })
      ]
    }
  };
});
