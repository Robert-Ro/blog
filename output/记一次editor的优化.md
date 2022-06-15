## 场景

表单，两个字段：标题(`input`输入框)和内容详情输入组件(`dom`渲染完成后，挂载当前组件上，`markdown`编辑器, `monaco-editor`)，分别需要配置对应的 21 种语言

- 值变化时或黏贴事件时，触发变化更新表单对应语种的内容，同时调用渲染 markdown 内容

## 存在问题

每次切换语言，对应的表单字段都需要重新加载，编辑器也需要重新初始化

## 优化

### 方案 1：keep-alive

其实并不需要缓存每种语言对应的表单组件，只需要更换表单对应的字段即可

### 方案 2：表单组件复用

#### input 输入框：

- 借助索引标记当前是哪种语言，动态修改`v-model`

#### markdown 编辑器组件复用

- 表单值 `<====>` `editor`中显示的值**双向绑定**
- 光标位置问题

解决方案：

- watch
  - `prop value`值：更新光标位置值
  - 语种：`prop value`赋值给`editor`，更新当前光标位置
- hooks
  - `mounted`: 挂载初始化组件，并保存到`data`属性中, 并在`editor`值变化的事件和黏贴事件中将光标位置和保存到`data`属性中
  - `updated`: 设置标记仅第一次将`prop value`赋值给`editor`(不然的话会造成编辑区闪动)，更新当前光标位置
- 编辑器组件更新 hook：设置标记仅第一次对`editor`赋值，更新当前光标位置
- 性能优化：使用`this.$nextTick`更新光标位置

### Markdown图片预览区域页面闪动解决办法
关闭`chrome devtool`的`disable cache`即可

### 优化工具栏
 [参考](https://github.com/code-farmer-i/vue-markdown-editor)