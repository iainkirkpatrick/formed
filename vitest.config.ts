import { defineConfig } from 'vitest/config'
import { resolve } from "path";

export default defineConfig({
  test: {
		include: ['./__tests__/**/*.test.ts'],
  },
	resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
})