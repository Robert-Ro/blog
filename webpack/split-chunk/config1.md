# config1下的产物输出分析
已知输出产物:
```js
commons~pageA~pageB~pageC.js  536 bytes  commons~pageA~pageB~pageC  [emitted]  commons~pageA~pageB~pageC
                    pageA.js    7.6 KiB                      pageA  [emitted]  pageA
                    pageB.js   7.47 KiB                      pageB  [emitted]  pageB
                    pageC.js   7.33 KiB                      pageC  [emitted]  pageC
                   vendor.js   1.04 KiB                     vendor  [emitted]  vendor
```
## 分析
- with 3 entry, so we have `pageA.js`, `pageB.js`, `pageC.js`
- with splitChunks config's two cacheGroups:
  - conmons~xxx.js
  - vendor.js
 - `utility2` imported in `pageA`, `pageB`, `pageC`, match `commons`'s `minChunk` config, output to `commons~pageA~pageB~pageC`
 - `utility3` imported in `pageB`, `pageC`, match `commons`'s `minChunk` config, but maxInitialRequests is 3, so not output to `commons*`, if we increase maxInitialRequests to 5, we will get utility3 output to `commons~pageB~pageC`
 - `maxInitialRequests: 3`:
    ```
    Entrypoint pageA = commons~pageA~pageB~pageC.js vendor.js pageA.js
    Entrypoint pageB = commons~pageA~pageB~pageC.js vendor.js pageB.js
    Entrypoint pageC = commons~pageA~pageB~pageC.js pageC.js
[./node_modules/vendor1.js] 51 bytes {vendor} [built]
[./node_modules/vendor2.js] 51 bytes {vendor} [built]
[./pageA.js] 152 bytes {pageA} [built]
[./pageB.js] 152 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {pageA} [built]
[./utility2.js] 53 bytes {commons~pageA~pageB~pageC} [built]
[./utility3.js] 53 bytes {pageB} {pageC} [built] *被打包到两个output里面*
    ```
 - `maxInitialRequests: 5`:
    ```
    Entrypoint pageA = commons~pageA~pageB~pageC.js vendor.js pageA.js
    Entrypoint pageB = commons~pageA~pageB~pageC.js vendor.js commons~pageB~pageC.js pageB.js
    Entrypoint pageC = commons~pageA~pageB~pageC.js commons~pageB~pageC.js pageC.js
[./node_modules/vendor1.js] 51 bytes {vendor} [built]
[./node_modules/vendor2.js] 51 bytes {vendor} [built]
[./pageA.js] 152 bytes {pageA} [built]
[./pageB.js] 152 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {pageA} [built]
[./utility2.js] 53 bytes {commons~pageA~pageB~pageC} [built]
[./utility3.js] 53 bytes {commons~pageB~pageC} [built]
    ```
- remove vendor name: 没有制定 `name` 的具体内容，默认为 `true`，所以 `webpack` 会基于代码块和缓存组的 `key` 自动选择一个名称，这样一个缓存组会打包出多个 `chunk`
```
Entrypoint pageA = commons-pageA-pageB-pageC.js vendor-pageA.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js commons-pageB-pageC.js vendor-pageB.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[./node_modules/vendor1.js] 51 bytes {vendor-pageA} [built]
[./node_modules/vendor2.js] 51 bytes {vendor-pageB} [built]
[./pageA.js] 152 bytes {pageA} [built]
[./pageB.js] 152 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {pageA} [built]
[./utility2.js] 53 bytes {commons-pageA-pageB-pageC} [built]
[./utility3.js] 53 bytes {commons-pageB-pageC} [built]
```
- name: false, development
```
Entrypoint pageA = commons-pageA-pageB-pageC.js vendor-pageA.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js commons-pageB-pageC.js vendor-pageB.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[./node_modules/vendor1.js] 51 bytes {vendor-pageA} [built]
[./node_modules/vendor2.js] 51 bytes {vendor-pageB} [built]
[./pageA.js] 152 bytes {pageA} [built]
[./pageB.js] 152 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {pageA} [built]
[./utility2.js] 53 bytes {commons-pageA-pageB-pageC} [built]
[./utility3.js] 53 bytes {commons-pageB-pageC} [built]
```
- name: false, production
```
Entrypoint pageA = commons-pageA-pageB-pageC.js vendor-pageA.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[0] ./utility2.js 53 bytes {commons-pageA-pageB-pageC} [built]
[1] ./utility3.js 53 bytes {commons-pageB-pageC} [built]
[2] ./node_modules/vendor1.js 51 bytes {vendor-pageA} [built]
[3] ./pageC.js 121 bytes {pageC} [built]
[4] ./pageA.js + 1 modules 251 bytes {pageA} [built]
    | ./pageA.js 152 bytes [built]
    | ./utility1.js 89 bytes [built]
[5] ./pageB.js + 1 modules 213 bytes {pageB} [built]
    | ./pageB.js 152 bytes [built]
    | ./node_modules/vendor2.js 51 bytes [built]
```
- name: true, production
```
Entrypoint pageA = 0.js vendor.js pageA.js
Entrypoint pageB = 0.js vendor.js 1.js pageB.js
Entrypoint pageC = 0.js 1.js pageC.js
[0] ./utility2.js 53 bytes {0} [built]
[1] ./utility3.js 53 bytes {1} [built]
[2] ./node_modules/vendor1.js 51 bytes {vendor} [built]
[3] ./pageB.js 152 bytes {pageB} [built]
[4] ./node_modules/vendor2.js 51 bytes {vendor} [built]
[5] ./pageC.js 121 bytes {pageC} [built]
[6] ./pageA.js + 1 modules 251 bytes {pageA} [built]
    | ./pageA.js 152 bytes [built]
    | ./utility1.js 89 bytes [built]
```
- webpack5