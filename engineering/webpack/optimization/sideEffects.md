# SideEffects in Webpack

## Rule.sideEffects

```ts
type boolean
```

Indicate what parts of the module contain side effects(表明模块的哪一部分包括副作用). See [Tree Shaking](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) for details.

## optimization.sideEffects

```log
boolean = true string: 'flag'
```

Tells webpack to recognise the `sideEffects` flag in `package.json` or rules to skip over modules which are flagged to contain no side effects when exports are not used.

## Resources

- [rule sideeffects](https://webpack.js.org/configuration/module/#rulesideeffects)
- [optimization sideeffects](https://webpack.js.org/configuration/optimization/#optimizationsideeffects)
