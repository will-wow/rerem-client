# Svelte TypeScript Template

This is a project template for [Svelte 3](https://svelte.dev) apps. It lives at [github.com/will-wow/svelte-typescript-template](https://github.com/will-wow/svelte-typescript-template).

**This template includes:**

- Transpiling ES6 and TypeScript with Babel
- Testing with Jest and [Svelte-Testing-Library](https://github.com/testing-library/svelte-testing-library)
- Linting/Formatting with Eslint and Prettier

**Things that aren't TypeScript:**

- Svelte doesn't work with TypeScript in `.svelte` files yet. This setup just lets you use typescript for all of your stores and other non-component files.
- Svelte-Testing-Library doesn't have typescript definitions yet, so the component test is also still in javascript.

**If you don't want to use TypeScript**

This uses Babel to compile the ts files, so if you just want babel for ES6,
you can remove references to TypeScript in
`package.json`, `.babelrc`, and `.eslintrc`.

## Create a new project

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit will-wow/svelte-typescript-template
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
yarn install
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src` and save it. The page will automatically update with your changes.

## Testing

To run the test suite

```bash
yarn test
```

To run the tests with watchers

```bash
yarn test --watch
```

To generate a coverage report

```bash
yarn test --coverage
open coverage/lcov-report/index.html
```

**Importing TS files**

In your `.svelte` files, you should include the `.ts` extension when importing TypeScript files.
For some reason Jest won't follow the import otherwise.

**Note on caching:**

[jest-transform-svelte](https://github.com/rspieker/jest-transform-svelte) seems to have an issue with caching. If you find
that a test is using an old version of an imported file, try `yarn jest --clearCache`, and then re-run `yarn test`.

## Deploying to the web

### With [surge](https://surge.sh/)

Update the `deploy-surge` script in `package.json` with your surge domain.

```bash
yarn deploy
```
