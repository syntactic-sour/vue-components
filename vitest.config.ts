import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import { config } from './vite.config'

export default mergeConfig(
  config,
  defineConfig({
    test: {
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      browser: {
        provider: 'playwright', // or 'webdriverio'
        enabled: true,
        // at least one instance is required
        instances: [{ browser: 'chromium' }],
      },
    },
  }),
)
