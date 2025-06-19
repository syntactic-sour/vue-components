/** @type {import('postcss-load-config').Config} */

import postcssPresetEnv from 'postcss-preset-env'
/** https://github.com/postcss/autoprefixer */
import autoprefixer from 'autoprefixer'
/** https://github.com/postcss/postcss-browser-reporter */
import postcssBrowserReporter from 'postcss-browser-reporter'

export default () => {
  return {
    plugins: [postcssBrowserReporter(), autoprefixer(), postcssPresetEnv()],
  }
}
