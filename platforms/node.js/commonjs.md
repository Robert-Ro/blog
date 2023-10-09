# Commonjs 规范

Commonjs 模块特点

1. 所有代码都运行在**模块作用域**，不会污染**全局作用域**。
2. 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被**缓存**了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
3. 模块加载的顺序，按照其在代码中出现的顺序。
4. 在 `Node.js` 模块系统中，每个文件都视为独立的模块。

Commonjs 模块定义

- 模块引用(`require`)
- 模块定义(`exports`, `module.exports`)
- 模块标识(`require`参数)

Nodejs 中的模块类型

1. 核心模块
   - built-in 模块： src 目录下的 C/CPP 模块
   - native 模块：lib 目录下的模块，部分 native 模块底层调用了 built-in 模块，比如 `buffer` 模块，其内存分配是在 `C/CPP` 模块中实现的
2. 第三方模块：保存在 `node_modules` 目录下的非 Node 自带模块
3. 文件模块：比如 `require('./utils')`，特点就是有绝对或者相对路径的文件路径
