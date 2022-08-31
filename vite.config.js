import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    manifest: true,
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'app/bannerCreator.js'),
      name: 'banner',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'bannerCreator'
    },
    experimental: {
      renderBuiltUrl: (filename, { type, hostType }) => {
        console.log('filename', filename);
        if (type === 'public') {
          return import.meta.env.SERVICE_HOST + filename;
        }
        if (hostType === '.png') {
          return import.meta.env.SERVICE_HOST + filename;
        }
      }
    }
  }
});
