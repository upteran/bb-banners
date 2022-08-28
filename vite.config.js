import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'app/bannerCreator.js'),
      name: 'banner',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'bannerCreator'
    }
  }
})