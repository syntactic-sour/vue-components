# Vue Components

Draft component library, a11y-first. Written with Vue 3

## Local development with Docker

Create local environment variables (`.env.local`) based on `.env.local.sample`.

```
docker compose build
docker compose up
```

## Supported platforms

<!-- TODO: browserlist, node version -->

## Tech stack

<!-- TODO: list all dependencies with links -->

## TypeScript and Vue

<!-- TODO: write someth :D -->

### Eslint

<!-- TODO: list all packages with links, rules etc -->

## Styles

### Global css

Imported to Storybook and App.vue
Stored in `src/css/global`. Note that only `index.css` file gets imported.
It should only contain imports.

#### Storybook global styles overwrites

If some styles from `src/css/global/index.css` are not applied correctly in Storybook due to css specificity, they can be overwritten in `src/css/storybook-reset.css`. It is also imported in Storybook, but **does not affect App.vue**.

Example: `paddings` on `body`.

### Prepended css

Logic that is transpiled to css, but needed for postcss plugins.
Injected via `postcss-prepend-imports` and `postcss-import` plugins.

- Simple variables
- Mixins

Stored in `src/css/logic`. To add new file, update `postcss.config.js`.

Note, this logic is automatically included both in App.vue and in Storybook.

### Postcss plugins

<!-- TODO: list all plugins -->

### Stylelint

<!-- TODO: list all plugins and rules, motivation for rules -->

### Reporters

<!-- TODO: list all reporters for postcss -->

## Build process

<!-- TODO: how to build storybook locally (dev) and for other envs, Vite configuration, how to build App and why it may be needed, precommit hooks, prepush hooks -->

## Testing

<!-- TODO: list all testing methods and autotools -->

## Conventional commits

<!-- TODO: document convention, commitlint, changelog -->
