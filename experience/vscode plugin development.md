# Vscode Plugin Development

## api

```js
vscode.window.visibleTextEditors; // editor实例
editor.setDecorations(decoration, range); // 在 editor 的某个位置到某个位置，也就是某段范围添加一些 CSS，这些 CSS 叫做装饰
window.createTextEditorDecorationType; // 创建 decorator 的 api
```

- CSS 颜色预览
- gitlens 的行内 commit 信息
- 编辑特效

## Reference

- [your-first-extension](https://code.visualstudio.com/api/get-started/your-first-extension)
- [vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)
- [vscode-api](https://code.visualstudio.com/api/references/vscode-api)
- [extension-anatomy])(https://code.visualstudio.com/api/get-started/extension-anatomy)
- [wrapping-up])(https://code.visualstudio.com/api/get-started/wrapping-up)
- [vscode tasks](https://code.visualstudio.com/docs/editor/tasks)，理解概念，学习如何配置，在extension开发中如何应用(以及typescipt、gulp中的使用)

## TODOs

- [ ] resolve package.json and get nodejs depend latest version, 提供升级按钮等
