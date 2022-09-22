# 额外零散的 Tips

## 类型增强

在 `TypeScript` 中，如果文件包含顶层的 `export` 或者 `import`，则会被当作 `module`，**在 `module` 中定义的、没有显式 `export` 的变量、函数、类对外都不可见**；相反，如果文件不包含顶层的 `export` 或者 `import`，则会被当作 `script`，**`script` 里的内容（类型声明、变量声明）都是全局可见的（对 `module` 也是可见的）**。

```ts
// 使用namespace控制可见性
// myAugmention.ts
namespace MyNameSpaceExample {
  export type id = number // 此处非顶层 export
  export type name = string
}
type TSCourseUserInfoName = string
//在`module`使用`declare global`声明全局类型
declare global {
  type GlobalUserId = number
}
```
