import { defineConfig } from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
	base: '/wpe/2023-10-06/',
  build: {
		lib: {
			entry: 'index.html',
      formats: ['es'],
    }
	},
	plugins: [
		topLevelAwait({
			promiseExportName: "__tla",
			promiseImportName: i => `__tla_${i}`
		})
	]
})
