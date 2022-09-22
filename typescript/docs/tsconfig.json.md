# What is a tsconfig.json

## Overview

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

JavaScript projects can use a `jsconfig.json` file instead, which acts almost the same but has some JavaScript-related compiler flags enabled by default.

A project is compiled in one of the following ways:

## Using `tsconfig.json` or `jsconfig.json`

- **By invoking tsc with no input files**, in which case the compiler searches for the `tsconfig.json` file _starting in the current directory_ and _continuing up the parent directory chain_.
- **By invoking tsc with no input files and a `--project` (or just `-p`) command line option** that specifies the path of a directory containing a `tsconfig.json` file, or a path to a valid `.json` file containing the configurations.

## TSConfig Bases

> 基础预设
> Depending on the JavaScript runtime environment which you intend to run your code in, there may be a base configuration which you can use at [github.com/tsconfig/bases](https://github.com/tsconfig/bases/). These are `tsconfig.json` files which your project extends from which simplifies your `tsconfig.json` by handling the runtime support.

This lets your `tsconfig.json` focus on the unique choices for your project, and not all of the runtime mechanics. There are **a few tsconfig bases already**, and we’re hoping the community can add more for different environments.

- [Recommended](https://www.npmjs.com/package/@tsconfig/recommended)
- [Node 10](https://www.npmjs.com/package/@tsconfig/node10)
- [Node 12](https://www.npmjs.com/package/@tsconfig/node12)
- [Node 14](https://www.npmjs.com/package/@tsconfig/node14)
- [Node 16](https://www.npmjs.com/package/@tsconfig/node16)
- [Deno](https://www.npmjs.com/package/@tsconfig/deno)
- [React Native](https://www.npmjs.com/package/@tsconfig/react-native)
- [Svelte](https://www.npmjs.com/package/@tsconfig/svelte)

## misc

- `tsconfig.build.json` prefer then `tsconfig.json` in build mode
- `tsconfig.test.json` prefer then `tsconfig.json` in `ts-jest` mode
