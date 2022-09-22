# Vscode Plugin Development

## api

```js
vscode.window.visibleTextEditors // editor实例
editor.setDecorations(decoration, range) // 在 editor 的某个位置到某个位置，也就是某段范围添加一些 CSS，这些 CSS 叫做装饰
window.createTextEditorDecorationType // 创建 decorator 的 api
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
- [vscode tasks](https://code.visualstudio.com/docs/editor/tasks)，理解概念，学习如何配置，在 extension 开发中如何应用(以及 typescipt、gulp 中的使用)
- [vscode-extension-vscode](https://github.com/Microsoft/vscode-extension-vscode), vscode 库(已废弃)

## ideas

- tree
  - [project-tree](https://github.com/Maple-Team/project-tree.git),在此项目基础上升级
- resolve package.json and get nodejs depend latest version, 提供升级命令 升级老项目的依赖(这个有 npm 脚本命令)
