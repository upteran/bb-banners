import legacy from '@vitejs/plugin-legacy';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import topLevelAwait from "vite-plugin-top-level-await";
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
      minify: true,
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
        globals: {
          'PIXI': 'PIXI',
        },
        plugins: [...plugins[mode](env), topLevelAwait({})]
      },
      plugins: [
        legacy({
          targets: ['defaults', 'not IE 11']
        })
      ]
    }
  };
});
