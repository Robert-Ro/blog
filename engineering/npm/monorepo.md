# Monorepo

## Goals

- just one `node_modules` folder (int the root of monorepo).
- Each piece have its own folder with its own `package.json`, `tsconfig.json` but use the monorepo's `node_modules`.
- Running `tsc` in the monorepo root transpiles all packages in folder.
- Using `import .. from` can reference local packages withour errors.



## Resources
- https://javascript.plainenglish.io/monorepo-setup-with-npm-and-typescript-90b329ba7275
- https://github.com/tomnil/monorepoplate