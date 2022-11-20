## @nextvalid example app

### Install

```bash
yarn install
cd ./examples/next-classic
yarn dev
```

### Highlights

### Notes

#### Development

> Will use tsconfig path aliases by default, changes in packages
> are immediately reflected

```bash
yarn dev
```

#### Build

> Won't use tsconfig path aliases and thus requires a build of packages.

```bash
yarn g:build-packages
yarn build
yarn start
```
