## tsconfig - `moduleResolution`配置
          
TypeScript 的 `moduleResolution` 选项决定了**编译器如何解析模块导入路径，不同的值适用于不同的环境和场景s**。以下是各值的具体区别：

### 1. `node16` / `nodenext`
- **适用场景**：现代 Node.js 环境（Node.js 16+）
- **关键特性**：
  - 完全支持 Node.js 的 ES 模块系统（ESM）和 CommonJS（CJS）混合模式
  - 会根据 `package.json` 中的 `type` 字段（"module" 或 "commonjs"）来决定模块解析策略
  - 严格要求 ESM 中导入文件时包含文件扩展名（如 `.js`、`.mjs`）
  - 支持新的 Node.js 特性，如子路径导入（subpath imports）和包导出（package exports）
- **行为示例**：当 `package.json` 中 `type: "module"` 时，会按照 ESM 规则解析；当 `type: "commonjs"` 或未设置时，会按照 CJS 规则解析

### 2. `node10`（原名 `node`）
- **适用场景**：旧版 Node.js 环境（Node.js < 10）或仅使用 CommonJS 的项目
- **关键特性**：
  - 基于传统的 Node.js CommonJS 模块解析算法
  - 不支持 ES 模块的严格路径解析要求
  - 允许导入时省略文件扩展名和索引文件（如 `index.js`）
  - 不支持 Node.js 的最新模块特性
- **行为示例**：`import './foo'` 会尝试查找 `./foo.js`、`./foo.json`、`./foo.node` 或 `./foo/index.js` 等

### 3. `bundler`
- **适用场景**：使用现代打包工具（如 Webpack、Rollup、Vite）的前端项目
- **关键特性**：
  - 模拟现代打包工具的模块解析行为
  - 支持路径映射（path mapping）和裸模块导入
  - 允许省略文件扩展名和索引文件
  - 支持 TypeScript 的 `paths` 配置
  - 对 Node.js 特定的解析行为做了一些优化和简化
- **行为示例**：可以使用 TypeScript 的路径别名，如 `@/components/Button` 而不需要相对路径

### 4. `classic`
- **适用场景**：TypeScript 1.6 之前的遗留项目（很少使用）
- **关键特性**：
  - TypeScript 早期的模块解析算法
  - 不支持 Node.js 的模块解析逻辑
  - 主要基于文件相对路径进行简单的查找
  - 现代项目中几乎不会使用

### 对比表
| 选项 | 适用环境 | 支持的模块系统 | 导入文件扩展名要求 | 特殊功能支持 |
|------|----------|----------------|--------------------|--------------|
| `node16`/`nodenext` | 现代 Node.js (16+) | ESM 和 CJS | ESM 中必须包含 | 包导出、子路径导入 |
| `node10` | 旧版 Node.js (< 10) | 主要是 CJS | 可选 | 基本的 Node.js 解析 |
| `bundler` | 前端打包工具环境 | 混合（ESM 优先） | 可选 | 路径映射、TypeScript `paths` |
| `classic` | 遗留 TypeScript 项目 | 简单模块系统 | 可选 | 基本路径查找 |

在当前项目中使用的 `nodenext` 是一个很好的选择，因为它支持现代 Node.js 的 ESM 特性，同时保持了对 CommonJS 的兼容性，适合构建现代化的 JavaScript/TypeScript 应用程序。
        