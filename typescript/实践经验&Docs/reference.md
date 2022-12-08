# `tsconfig` 中的 `reference`

> Project references are a new feature in TypeScript 3.0 that allow you to structure your TypeScript programs into smaller pieces 工程引用是 TypeScript 3.0 的新特性，它支持将 TypeScript 程序的结构分割成更小的组成部分。

## 出现原因

项目中有 src、tests 两大块，通常需要都是用 ts 来支持类型定义，使用单一 tsconfig 会略显笨拙：

> 之前会使用指定`--project` `tsconfig.test.json` `tsconfig.build.json`等方式来处理

- 实现文件也可以导入测试文件
- 无法同时构建 `test` 和 `src`，除非把 `src` 也放在输出文件夹中，但通常并不想这样做
- 仅对实现文件的内部细节进行改动，必需再次对测试进行类型检查，尽管这是根本不必要的
- 仅对测试文件进行改动，必需再次对实现文件进行类型检查，尽管其实什么都没有变

你可以使用多个`tsconfig`文件来解决部分问题，但是又会出现新问题：

- 缺少内置的实时检查，因此你得多次运行`tsc`
- 多次调用`tsc`会增加我们等待的时间
- `tsc -w`不能一次在多个配置文件上运行

工程引用可以解决全部这些问题，而且还不止。

## 解决方式

### 何为工程引用？

tsconfig.json 增加了一个新的顶层属性 references。它是一个对象的数组，指明要引用的工程：

```json
{
  "compilerOptions": {
    // The usual
  },
  "references": [{ "path": "../src" }]
}
```

每个引用的`path`属性都可以指向到包含`tsconfig.json`文件的目录，或者直接指向到**配置文件本身**（名字是任意的）。

当你引用一个工程时，会发生下面的事：

- 导入引用工程中的模块实际加载的是它输出的声明文件（`.d.ts`）。
- 如果引用的工程生成一个`outFile`，那么这个输出文件的`.d.ts`文件里的声明对于当前工程是可见的。
- 构建模式（后文）会根据需要自动地构建引用的工程。

当你拆分成多个工程后，会显著地加速类型检查和编译，减少编辑器的内存占用，还会改善程序在逻辑上进行分组。

### composite

引用的工程必须启用新的 `composite` 设置。 这个选项用于帮助 `TypeScript` 快速确定引用工程的输出文件位置。 若启用 `composite` 标记则会发生如下变动：

对于 `rootDir` 设置，如果没有被显式指定，默认为包含 `tsconfig` 文件的目录
所有的实现文件必须匹配到某个 `include` 模式或在 `files` 数组里列出。如果违反了这个限制，`tsc` 会提示你哪些文件未指定。
必须开启 `declaration` 选项。

### declarationMaps

我们增加了对 `declaration` source maps 的支持。 如果启用`--declarationMap`，在某些编辑器上，你可以使用诸如“Go to Definition”，重命名以及跨工程编辑文件等编辑器特性。

### 带 prepend 的 outFile

你可以在引用中使用 `prepend` 选项来启用前置某个依赖的输出：

```json
 "references": [
        { "path": "../utils", "prepend": true }
    ]
```

前置工程会将工程的输出添加到当前工程的输出之前。 它对`.js` 文件和`.d.ts` 文件都有效，source map 文件也同样会正确地生成。

## Questions

- 应用场景
- 与`extend`的应用区别

## Resouces

- https://www.typescriptlang.org/docs/handbook/project-references.html
- https://www.tslang.cn/docs/handbook/project-references.html
