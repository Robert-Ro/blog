# import

> 模块，内部变量，闭包

静态的 `import` 语句用于导入由另一个模块导出的绑定。无论是否声明了 `strict mode` ，**导入的模块都运行在严格模式下**。在浏览器中，`import` 语句只能在声明了 `type="module"` 的 `script` 的标签中使用。

此外，还有一个类似函数的动态 `import()`，它不需要依赖 `type="module"` 的 `script` 标签。

在 `script` 标签中使用 `nomodule` 属性，可以确保向后兼容。

在您希望按照一定的条件或者按需加载模块的时候，动态 `import()` 是非常有用的。而静态型的 `import` 是初始化加载依赖项的最优选择，使用静态 `import` 更容易从代码静态分析工具和 `tree shaking` 中受益。

## 静态：import 引入了啥

### 导入方式

- 导入整个模块的内容
- 导入单个接口
- 导入多个接口
- 导入带有别名的接口
- 导入时重命名多个接口
- 仅为副作用而导入一个模块

  整个模块仅为**副作用**（中性词，无贬义含义）而导入，而不导入模块中的任何内容（接口）。**这将运行模块中的全局代码, 但实际上不导入任何值**。

```JS
import '/modules/my-module.js';
```

- 导入默认值

## 动态：import()函数

## Reference

- [mdn import statement](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

## Other

- 调试在浏览器中进行
