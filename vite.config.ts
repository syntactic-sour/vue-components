import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, Plugin, UserConfig } from 'vite'
import { UserConfig as UserTestConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import stylelint from 'vite-plugin-stylelint'
import browserslistToEsbuild from 'browserslist-to-esbuild'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export const config: UserConfig = {
  build: {
    target: browserslistToEsbuild(),
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd())

  if (env.VITE_APP_DEVTOOLS === 'true') {
    config.plugins?.push(vueDevTools() as Plugin, stylelint() as Plugin)
  }

  if (env.VITE_APP_STRYBOOK_TESTS === 'true') {
    ;(config as UserTestConfig).test?.projects?.push({
      extends: true as const,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook'),
        }),
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [
            {
              browser: 'chromium',
            },
          ],
        },
        setupFiles: ['.storybook/vitest.setup.ts'],
      },
    })
  }

  return config
})
