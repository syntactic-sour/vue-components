/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  customSyntax: 'postcss-html',
  plugins: [
    'stylelint-rem-over-px',
    'stylelint-plugin-defensive-css',
    'stylelint-no-browser-hacks',
    'stylelint-no-unsupported-browser-features',
    'stylelint-plugin-use-baseline',
    'stylelint-plugin-logical-css',
    'stylelint-high-performance-animation',
    '@double-great/stylelint-a11y',
  ],
  rules: {
    'declaration-no-important': true,
    'block-no-empty': null,
    'selector-class-pattern': null,
    'rem-over-px/rem-over-px': [true, { ignore: ['1px'] }],
    'declaration-property-unit-allowed-list': {
      '/^border/': ['px'],
      '/^padding|^gap|^margin/': ['rem'],
    },
    'plugin/use-defensive-css': [true, { severity: 'warning' }],
    'plugin/no-browser-hacks': [true, { severity: 'warning' }],
    /**
     * Visual Studio Code users leveraging stylelint-no-unsupported-browser-features
     * through the official stylelint extension will need to restart VSCode after
     * making changes to their browserslist configuration file. It seems that
     * either VSCode or the extension are causing browserlist config files to be cached
     * and are not watching for changes in the file.
     */
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css-logical-props', 'css-variables'],
      },
    ],
    /**
     * The data is sourced from web-features (https://github.com/web-platform-dx/web-features#readme)
     */
    'plugin/use-baseline': [
      true,
      {
        // "widely" (default), "newly", or YYYY (e.g. 2023)
        available: 2023,
      },
    ],
    'plugin/use-logical-properties-and-values': [
      true,
      { severity: 'warning', ignore: ['overflow-y', 'overflow-x'] },
    ],
    'plugin/use-logical-units': [true, { severity: 'warning' }],
    'plugin/no-low-performance-animation-properties': true,
    'a11y/content-property-no-static-value': true,
    'a11y/font-size-is-readable': true,
    'a11y/line-height-is-vertical-rhythmed': true,
    'a11y/media-prefers-reduced-motion': true,
    'a11y/media-prefers-color-scheme': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
    'a11y/no-spread-text': true,
    'a11y/no-outline-none': true,
    'a11y/no-text-align-justify': true,
    'a11y/selector-pseudo-class-focus': true,
  },
  ignoreFiles: ['./node_modules/**/*'],
}
