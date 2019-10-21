# Rerem Client

The [Svelte](https://svelte.dev) frontend for [Rerem](https://rerem.surge.sh), a totally anonymous, totally encrypted notes service.

## Links

- The backlog is in a [Rerem note](https://rerem.surge.sh/notes/89332d0a-b737-4789-a9af-c1cf6441ef56#?access=eyJrIjoiRnAwejBXcml3K1huMCtaYXFqKzNFUT09IiwicyI6Imh0dHBzOi8vcmVyZW0uZ2lnYWxpeGlyYXBwLmNvbS9hcGkifQ%3D%3D)

- [Elixir Backend](https://github.com/will-wow/rerem-elixir)

## Development

Install the dependencies...

```bash
cd svelte-app
yarn install
```

...then start the Webpack Dev Server

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

**Note on caching:**

[jest-transform-svelte](https://github.com/rspieker/jest-transform-svelte) seems to have an issue with caching. If you find
that a test is using an old version of an imported file, try `yarn jest --clearCache`, and then re-run `yarn test`.

## Deploying to the web

```bash
yarn deploy
```
