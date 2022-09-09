import legacy from '@vitejs/plugin-legacy';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig, loadEnv } from 'vite';

const plugins = {
  development: () => [],
  production: env => [
    replace({
      delimiters: ['/', ''],
      public: [`${env.SERVICE_HOST}`] // replace static public paths with remote prod host
    })
  ]
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      manifest: false,
      minify: false,
      sourcemap: true,
      rollupOptions: {
        preserveEntrySignatures: true,
        input: 'app/bannerCreator.js',
        output: {
          dir: 'dist',
          format: 'es',
          exports: 'named',
          entryFileNames: `assets/[name].js`
        },
        treeshake: true,
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor';
        //   }
        // },
        // external: ['/pixiLoader/', 'pixi.js', 'pixi-spine'],
        // globals: {
        //   'PIXI': 'pixiLoader',
        //   'pxSpine': 'pixiLoader'
        // },
        plugins: [...plugins[mode](env)]
      },
      plugins: [
        legacy({
          targets: ['defaults', 'not IE 11']
        })
      ]
    }
  };
});
