# Package exports

> TODO

The `exports` field in the `package.json` of a package allows to declare which module should be used when using module requests like `import "package"` or `import "package/sub/path"`. It replaces the default implementation that returns `main` field resp. `index.js` files for `"package"` and the file system lookup for `"package/sub/path"`.

When the `exports` field is specified, only these module requests are available. Any other requests will lead to a **ModuleNotFound** Error.

## General syntax 通用语法

In general the `exports` field should contain an object where each properties specifies a sub path of the module request. For the examples above the following properties could be used: `"."` for `import "package"` and `"./sub/path"` for `import "package/sub/path"`. Properties ending with a `/` will forward a request with this prefix to the old file system lookup algorithm. For properties ending with `*`, `*` may take any value and any `*` in the property value is replaced with the taken value.

An example:

```json
{
  "exports": {
    ".": "./main.js",
    "./sub/path": "./secondary.js",
    "./prefix/": "./directory/",
    "./prefix/deep/": "./other-directory/",
    "./other-prefix/_": "./yet-another/_/*.js"
  }
}
```

| Module                              | request Result                                   |
| ----------------------------------- | ------------------------------------------------ |
| `package`                           | `.../package/main.js`                            |
| `package/sub/path`                  | `.../package/secondary.js`                       |
| `package/prefix/some/file.js`       | `.../package/directory/some/file.js`             |
| `package/prefix/deep/file.js`       | `.../package/other-directory/file.js`            |
| `package/other-prefix/deep/file.js` | `.../package/yet-another/deep/file/deep/file.js` |
| `package/main.js`                   | `Error`                                          |

## Alternatives

## Conditional syntax

## Abbreviation

## Notes about ordering

## Support

## Conditions

### Reference syntax

### Optimizations

### Target environment

### Conditions: Preprocessor and runtimes

### Conditions: Custom

## Common patterns

### Target environment independent packages

### Providing devtools or production optimizations

- Without Node.js runtime detection
- With Node.js runtime detection

### Providing different versions depending on target environment

### Combining patterns

## Guidelines

- Avoid the default export. It's handled differently between tooling. Only use named exports.
- Never provide different APIs or semantics for different conditions.
- Write your source code as ESM and transpile to CJS via babel, typescript or similar tools.
- Either use .cjs or type: "commonjs" in package.json to clearly mark source code as CommonJs. This makes it statically detectable for tools if CommonJs or ESM is used. This is important for tools that only support ESM and no CommonJs.
- ESM used in packages support the following types of requests:
  - module requests are supported, pointing to other packages with a package.json.
  - relative requests are supported, pointing to other files within the package.
    - They must not point to files outside of the package.
  - data: url requests are supported.
  - other absolute or server-relative requests are not supported by default, but they might be supported by some tools or environments.

## Further Reading

- [Package entry points in Node.js](https://nodejs.org/api/packages.html#packages_package_entry_points)
