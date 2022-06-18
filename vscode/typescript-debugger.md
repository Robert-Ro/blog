# Debugging TypeScript

有两种方式：built-in Node.js debuger 和基于 built-in Edge and Chrome debugger.

## 原理

- built-in Node.js debuger

  - use preLaunchTask: tsc build ts to js(commonjs)
  - enable sourcemap to map source code

## nodejs debugging

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${file}", // 当前active文件
  "preLaunchTask": "tsc: build - tsconfig.json",
  "outFiles": ["${workspaceFolder}/dist/**/*.js"]
  // more configuration
}
```

## client-side debugging

- init a ts project
- setup tsconfig.json
- link out/\*.js to html template
- run `tsc` to build `ts` file
- setup `.vscode/launch.json` file
- Press `F5` to start the debug session, which **launches the browser** and **hits your breakpoint** in <*.ts>

```json
{
  "type": "pwa-msedge", // "pwa-chrome" | "pwa-msedge" ⭐
  "request": "launch",
  "name": "Launch Edge against localhost",
  "url": "file:///C:/Users/username/deleteMe/HelloWeb/helloweb.html", // ⭐
  "webRoot": "${workspaceFolder}" // ⭐
}
```

## Resources

- [nodejs-debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [browser-debugging](https://code.visualstudio.com/docs/nodejs/browser-debugging)
