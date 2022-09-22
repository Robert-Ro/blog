vue-cli 接收自定义传入的环境变量

```js
config.plugin('define').tap((args) => {
  args[0]['process.env']['WS_GATEWAY'] = JSON.stringify(process.env.WS_GATEWAY)
  return args
})
```
