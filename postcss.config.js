/** @type {import('postcss-load-config').Config} */

import postcssPresetEnv from 'postcss-preset-env'
/** https://github.com/postcss/autoprefixer */
import autoprefixer from 'autoprefixer'
/** https://github.com/postcss/postcss-browser-reporter */
import postcssBrowserReporter from 'postcss-browser-reporter'
/** https://github.com/sandrina-p/postcss-start-to-end */
import startToEnd from 'postcss-start-to-end'
import cliReporter from 'postcss-reporter'
import calcReduce from 'postcss-calc'
/** https://github.com/postcss/postcss-nested */
import nested from 'postcss-nested'
/** https://github.com/Scrum/postcss-at-rules-variables */
import atVars from 'postcss-at-rules-variables'
/** https://github.com/postcss/postcss-simple-vars */
import simpleVars from 'postcss-simple-vars'
/** https://github.com/postcss/postcss-mixins */
import mixins from 'postcss-mixins'
/**  */
import forCycle from 'postcss-for'
import customPropsFallback from 'postcss-css-variables'
/** https://github.com/okikio/postcss-spring-easing */
import springEasings from 'postcss-spring-easing'
/** */
import transparentSafariCustomProps from 'postcss-redundant-color-vars'
import transparentGradientSafari from 'postcss-gradient-transparency-fix'
import rtl from 'postcss-rtl'
import logicalPropsFallback from 'postcss-logical-properties'

export default () => {
  return {
    plugins: [
      // TODO: turn off in prod
      postcssBrowserReporter(),
      /** Logic */
      atVars(),
      simpleVars(),
      nested(),
      mixins(),
      forCycle(),
      /** Optimisation */
      calcReduce(),
      /** Animations */
      springEasings(),
      /** RTL */
      rtl({
        /**
         * See all affected props:
         * https://github.com/vkalinichev/postcss-rtl/blob/master/src/affected-props.js
         */
        blacklist: [
          'margin',
          'margin-top',
          'margin-bottom',
          'padding',
          'padding-top',
          'padding-bottom',
        ],
      }),
      logicalPropsFallback(),
      /** Fixing Safari bugs */
      /** Graceful degradation */
      transparentSafariCustomProps(),
      transparentGradientSafari(),
      customPropsFallback(),
      autoprefixer(),
      postcssPresetEnv(),
      /** Code quality */
      // TODO: turn off warnings in prod
      // TODO: fork maybe, it doesn't warn on shorthand properties like padding: 1rem 2rem 3rem 4rem
      startToEnd({
        direction: 'RTL',
        warnings: true,
      }),
      cliReporter(),
    ],
  }
}
