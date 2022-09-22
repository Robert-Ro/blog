# Assets Modules

Asset Modules type replaces all of these loaders by adding 4 new module types:

- `asset/resource` emits a separate file and exports the URL. Previously achievable by using file-loader.
- `asset/inline` exports a data URI of the asset. Previously achievable by using url-loader.
- `asset/source` exports the source code of the asset. Previously achievable by using raw-loader.
- `asset` automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using url-loader with asset size limit.

## Reference

- [asset-modules](https://webpack.docschina.org/guides/asset-modules/)中文
- [asset-modules](https://webpack.js.org/guides/asset-modules/)
