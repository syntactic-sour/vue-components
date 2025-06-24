/// <reference types="./eslint-plugin-escompat" />
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import storybook from 'eslint-plugin-storybook'

import globals from 'globals'
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginSecurity from 'eslint-plugin-security'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import escompat from 'eslint-plugin-escompat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  ...escompat.configs['flat/typescript-2016'],

  {
    files: ['src/**/*.{ts,js,vue}'],
    extends: [pluginSecurity.configs.recommended],
  },

  {
    files: ['src/**/*.vue'],
    extends: [pluginVueA11y.configs['flat/recommended']],
    // Example of rules https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html
    rules: {
      'vuejs-accessibility/alt-text': [
        'error',
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: ['Image'],
          object: ['Object'],
          area: ['Area'],
          'input[type="image"]': ['ImageInput'],
        },
      ],
    },
  },

  skipFormatting,
)
