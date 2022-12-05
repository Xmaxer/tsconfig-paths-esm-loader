Code primarily taken from https://github.com/TypeStrong/ts-node/discussions/1450#discussioncomment-1806115

## What is this?

A custom Typescript ESM loader that allows you to run projects locally while using [Typescript paths](https://www.typescriptlang.org/tsconfig#paths)

Use with ESM modules only.

## Installation & Usage

#### Installation

```shell
npm install -d tsconfig-paths-esm-loader
```

```shell
yarn add --dev tsconfig-paths-esm-loader
```

#### Usage

When running an ESM project in development, you can do it like this:

```shell
node --loader tsconfig-paths-esm-loader/loader.mjs path/to/entryFile{.ts,.mts}
```

Where `path/to/entryFile{.ts,.mts}` is simply your entry file like `main.ts` or `main.mts`
