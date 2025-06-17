## 多项目引用与 `references`

TypeScript 的 `tsconfig.json` 中的 `references` 选项主要用于**管理多项目依赖关系和优化构建性能**，尤其适用于大型项目或模块化代码库。其核心作用和工作原理如下：

---

### 一、`references` 的核心作用

1. **项目依赖声明**

   - 通过 `references`，一个 TypeScript 项目（称为“主项目”）可以声明它依赖的其他子项目（例如共享库、前后端独立模块）。
   - 每个子项目需有独立的 `tsconfig.json`，主项目通过 `path` 指向子项目的配置文件路径。

   ```json
   {
     "references": [
       { "path": "./shared" }, // 指向子项目的目录（自动查找 tsconfig.json）
       { "path": "./client/tsconfig.app.json" } // 或指定具体配置文件
     ]
   }
   ```

2. **增量构建优化**

   - 使用 `tsc --build`（或 `tsc -b`）命令时，TypeScript 会基于 `references` 自动分析依赖关系：
     - 仅重新编译发生变更的子项目及其依赖项，跳过未修改的部分。
     - 避免全量编译，显著减少大型项目的构建时间。

3. **类型隔离与加载**
   - 主项目导入子项目的代码时，**仅加载子项目生成的类型声明文件（`.d.ts`）**，而非源码。✨
   - 减少 IDE 内存占用，提升类型检查速度。

---

### 二、`references` 的工作原理

#### 必要条件：

1. **子项目需启用 `composite: true`**

   - 子项目的 `tsconfig.json` 必须设置 `composite: true`，这会强制：
     - 生成 `.d.ts` 声明文件（需同时启用 `declaration: true`）。
     - 明确指定输入文件（通过 `include` 或 `files`），避免隐式包含。

   ```json
   // 子项目的 tsconfig.json
   {
     "compilerOptions": {
       "composite": true,
       "declaration": true,
       "rootDir": "./src"
     },
     "include": ["src/**/*.ts"]
   }
   ```

2. **必须使用 `tsc --build` 命令**
   - 仅当运行 `tsc -b` 时，`references` 才会生效。直接运行 `tsc` 会忽略引用，导致全量编译。

#### 构建流程示例：

假设项目结构如下：

```
project/
├── tsconfig.json        // 主配置（含 references）
├── shared/              // 子项目1
│   ├── tsconfig.json
│   └── src/...
└── client/              // 子项目2
    ├── tsconfig.json
    └── src/...
```

执行命令：

```bash
tsc -b --verbose        # 从主配置启动构建
```

构建过程：

1. 检查 `shared` 和 `client` 是否已构建且为最新版本。
2. 若 `shared` 有更新，则优先构建 `shared` 并生成 `.d.ts`。
3. 再构建依赖 `shared` 的 `client` 项目。
4. 最后构建主项目，直接复用子项目的类型声明。

---

### 三、典型应用场景

| 场景                | 说明                                                             |
| ------------------- | ---------------------------------------------------------------- |
| **前后端分离项目**  | 前后端共享通用类型库（如 `shared/`），分别构建且互不干扰。       |
| **微服务/多包管理** | 将大型代码库拆分为独立子模块（如 `core/`、`utils/`），按需构建。 |
| **减少构建时间**    | 仅编译改动模块，适合 CI/CD 流水线优化。                          |

---

### 四、注意事项

1. **避免循环依赖**  
   子项目之间不可相互引用，否则 `tsc -b` 会报错。

2. **输出目录隔离**  
   每个子项目应配置独立的 `outDir`（如 `dist/shared`），避免文件冲突。

3. **与 `extends` 的区别**
   - `extends`：继承配置（如共享编译规则），不涉及构建依赖管理。
   - `references`：声明项目间依赖，需配合 `tsc -b` 实现增量构建。

---

### 总结

`references` 是 TypeScript 解决**复杂项目结构**和**构建性能瓶颈**的核心方案：  
✅ **声明项目依赖** → 明确模块间关系  
✅ **启用增量构建** → 仅编译变更模块（`tsc -b`）  
✅ **隔离类型加载** → 提升 IDE 性能

正确使用时，能显著优化大型项目的开发体验。**小型项目若无需拆分子模块**，通常无需此功能。

TypeScript 的 `references` 配置主要服务于以下两个核心场景：

1. **构建优化**：通过 `tsc -b` 实现增量编译，仅构建被引用的项目及其依赖
2. **类型解析**：
   - 为语言服务器（tsserver）建立项目依赖关系图
   - 自动加载被引用项目的类型声明（`.d.ts`文件）
   - 限制类型检查范围到当前项目及其显式依赖

在您的 monorepo 项目中，`tsconfig.json` 通过 `references` 字段声明子包依赖关系后，VSCode 等编辑器将：

```json
{
  "references": [{ "path": "./packages/utils" }, { "path": "./packages/react-hooks" }]
}
```

1. 只索引被引用子包的编译输出（dist/types 目录）
2. 跳过测试文件和非直接依赖的类型检查
3. 实现跨子包的类型跳转（需保持 composite 模式）
