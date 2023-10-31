# Content Security Policies

Webpack is capable of adding a `nonce` to all scripts that it loads. To activate this feature, set a `__webpack_nonce__` variable and include it in your entry script. A unique hash-based nonce will then be generated and provided for each unique page view (this is why `__webpack_nonce__` is specified in the entry file and not in the configuration). Please note that the `__webpack_nonce__` should always be a base64-encoded string.
Webpack 能够为其加载的所有脚本添加 nonce。要启用此功能，需要在引入的入口脚本中设置一个 **webpack_nonce** 变量。应该为每个唯一的页面视图生成和提供一个唯一的基于 hash 的 nonce，这就是为什么 **webpack_nonce** 要在入口文件中指定，而不是在配置中指定的原因。注意，**webpack_nonce** 应该是一个 base64 编码的字符串。

## Examples

```sh
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
```

## Enabling CSP

Please note that CSPs are _not enabled by default_. A corresponding header `Content-Security-Policy` or meta tag `<meta http-equiv="Content-Security-Policy" ...>` needs to be sent with the document to instruct the browser to enable the CSP. Here's an example of what a CSP header including a CDN white-listed URL might look like:

```shell
Content-Security-Policy: default-src 'self'; script-src 'self'
https://trusted.cdn.com;
```

For more information on `CSP` and `nonce` attribute, please refer to Further Reading section at the bottom of this page.

## Trusted Types

Webpack is also capable of using Trusted Types to load dynamically constructed scripts, to adhere to CSP [`require-trusted-types-for`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for) directive restrictions. See [`output.trustedTypes`](https://webpack.js.org/configuration/output/#outputtrustedtypes) configuration option.

## Further Reading

- [Nonce purpose explained](https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements)
- [On the Insecurity of Whitelists and the Future of Content Security Policy](https://ai.google/research/pubs/pub45542)
- [Locking Down Your Website Scripts with CSP, Hashes, Nonces and Report URI](https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/)
- [CSP on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Trusted Types](https://web.dev/trusted-types)
