## 高性能 List 列表

> 官方提供了`FlatList`组件，但是社区的`RecyclerListView`性能更好

> 应用场景：信息流

`ListView` 组件性能很差，**没有内存回收机制(or 内存复用?)**，翻一页内存就涨一点，再翻一页内存又再涨一点

通常评判列表卡顿的指标是 `UI` 线程的帧率和 `JavaScript` 线程的帧率。

但业内有人实验过，在已经渲染完成的页面中，通过死循环把 `JavaScript` 线程卡死，页面依旧能够滚动。这是因为滚动本身是在 `UI` 线程进行的，和 `JavaScript` 线程无关。但当用户下滑，需要渲染新的列表项时，就需要 `JavaScript` 线程参与进来了。如果这时候 `JavaScript` 掉帧了，新的列表项就渲染不出来，即便能滚动，用户看到也是空白项，一样影响用户体验。

![OPPO R9两种list实际效果](https://static001.geekbang.org/resource/image/5e/bd/5ed5ba1e8a756d1065f1c70e14083abd.png?wh=1001x386)

### ScrollView：渲染所有内容的滚动组件

`ScrollView` 是一个支持横向或竖向的滚动组件，几乎所有页面都会用到。`ScrollView` 组件类似于`Web`中的`html`或`body`标签。

`React Native` 的 `ScrollView` 组件在 `Android` 的底层实现用的是 `ScrollView` 和 `HorizontalScrollView`，在 `iOS` 的底层实现用的是 `UIScrollView`。

一般而言，我们会使用安全区域组件 `SafeAreaView` 组件作为 `ScrollView` 的父组件，并给 `SafeAreaView` 组件设置布局属性 `flex:1`，让内容自动撑高 `SafeAreaView`。使用 `SafeAreaView` 作为最外层组件的好处是，它可以帮我们适配 `iPhone` 的刘海屏(FIXME Android 的美人尖呢?)，节约我们的适配成本。

滚动的优化方案:

- 按需渲染
  > 我参加过一个使用 `React Native` 开发的、类似抖音的视频流页面，用的就是按需渲染。用户始终只会看到**当前屏幕显示的视频**、**下一个视频**和**上一个视频**，我们只需要用 ScrollView 渲染 3 个视频就能满足用户的所有操作。这样做，**无论用户怎么翻页，内存中就只有 3 个视频，当然也不会卡了**。

但复杂的页面如微信朋友圈、京东首页这种一屏有多条信息内容的复杂列表页时，**手动按需加载**就比较麻烦。那有没有自动按需加载的方案呢？(Android 原生中的列表加载就是用的按需加载，内存复用)

### `FlatList`：按需渲染的列表组件

> `FlatList` 列表组件就是 “自动”按需渲染的。`FlatList` 组件底层使用的是虚拟列表 `VirtualizedList`，`VirtualizedList` 底层组件使用的是 `ScrollView` 组件

我们要知道，*列表组件*和*滚动组件*的关键区别是，列表组件把**其内部子组件看做由一个个列表项组成的集合，每一个列表项都可以单独渲染或者卸载**。而滚动组件是把**其内部子组件看做一个整体，只能整体渲染**。而自动按需渲染的前提就是每个列表项可以独立渲染或卸载。

实现 FlatList 自动按需渲染的思路具体可以分为三步：

- 通过滚动事件的回调参数，计算需要按需渲染的区域；
- 通过需要按需渲染的区域，计算需要按需渲染的列表项索引；
- 只渲染需要按需渲染列表项，不需要渲染的列表项用空视图代替。

第一步，计算按需渲染区域。

具体地说，每次你滚动页面，都会触发滚动组件 `ScrollView` 组件的一个“异步”回调 `onScroll` 事件。

在 `onScroll` 事件中，我们可以获取到当前滚动的偏移量 `offset` 等信息。以当前滚动的偏移量为基础，默认向上数 10 个屏幕的高度，向下数 10 个屏幕的高度，这一共 **21 个屏幕**的内容就是需要按需渲染的区域，其他区域都是无需渲染的区域。这样，即便是异步渲染，我们也不能保证所有 `JavaScript` 执行的渲染任务都实时地交由 UI 线程处理，立刻展示出来。**但因为有这 10 个屏幕的内容作为缓冲，用户无论是向上滚动还是向下滚动，都不至于一滚动就看到白屏**。

现在我们知道了按需渲染的区域，接着要计算的就是按需渲染列表项的索引。`FlatList` 内部实现就是通过 `setState` 改变**按需渲染区域第一个索引和最后一个索引的值，来实现按需渲染的**。

**怎么计算按需渲染列表项的索引呢**？

接着我们继续看第二步。这里我们分两种情况：

- 第一种是**列表项的高度是确定**的情况
  > 在写代码的时候，就可以通过获取列表项布局属性 `getItemLayout` 告诉 `FlastList`。在列表项高度确定，且知道按需渲染区域的情况下，“求按需渲染列表项的索引”就是一个简单的四则运算的问题，程序能够准确地计算出来。
- 另外一种是**列表项的高度是不确定**的情况, 高度是由渲染内容决定的

  > 对于高度未知的情况，`FlastList` 会启用列表项的布局回调函数 `onLayout`，在 `onLayout` 中会有大量的动态测量高度的计算，包括**每个列表项的准确高度**和**整体的平均高度**。

  > 但是，实际生产中，如果你不填 `getItemLayout` 属性，不把列表项的高度提前告诉 `FlastList`，让 `FlastList` 通过 `onLayout` 的布局回调动态计算，用户是可以感觉到滑动变卡的。因此，如果你使用 `FlastList`，又提前知道列表项的高度，我建议你把 `getItemLayout` 属性填上。

  第三步，渲染需要按需渲染列表项。有了索引后，渲染列表项就变得很简单，用 `setState` 即可。

### RecyclerListView：可复用的列表组件

`RecyclerListView` 是开源社区提供的列表组件，它的底层实现和 `FlatList` 一样也是 `ScrollView`，它也要求开发者必须将内容整体分割成一个个列表项。

在首次渲染时，`RecyclerListView`**只会渲染首屏内容**和**用户即将看到的内容**，所以它的**首次渲染速度很快**。**在滚动渲染时，只会渲染屏幕内的和屏幕附近 250 像素的内容，距离屏幕太远的内容是空的**。

`React Native `的 `RecyclerListView` 复用灵感来源于 `Native` 的**可复用列表组件**。

在 `iOS` 中，表单视图 `UITableView`，实际就是可以上下滚动、左右滚动的可复用列表组件。它可以通过复用唯一标识符 `reuseIdentifier`，标记表单中的复用单元 `cell`，实现单元 `cell` 的复用。

在 `Android` 上，动态列表 `RecyclerView` 在**列表项视图滚出屏幕时，不会将其销毁，相反会把滚动到屏幕外的元素，复用到滚动到屏幕内的新的列表项上**。这种**复用方法可以显著提高性能，改善应用响应能力，并降低功耗**。

如果你只开发过 `Web`，你可以这样理解复用：原来你要销毁一个浏览器中 `DOM`，再重新创建一个新的 `DOM`，现在你只改变了原有 `DOM` 的属性，并把原有的 `DOM` 挪到新的位置上。

`RecyclerListView` 的**复用机制**是这样的，你可以把列表比作数组 list，把列表项类比成数组的元素。用户移动 ScrollView 时，相当于往数组 list 后面 push 新的元素对象，而 RecyclerListView 相当于把 list 的第一项挪到了最后一项中。挪动对象位置用到的计算资源少，**也不用在内存中开辟一个新的空间**。而创建新的对象，占用计算资源多，同时占用新的内存空间。

### 从使用方式看底层原理

接下来，我们从 `RecyclerListView` 使用方式的角度，进一步地剖析其底层原理。
`RecyclerListView` 有三个必填参数：

- 列表数据：`dataProvider(dp)`；
- 列表项的布局方法：`layoutProvider`；
- 列表项的渲染函数：`rowRenderer`。

### PK：ScrollView、FlatList、RecyclerListView

从底层原理看：

- `ScrollView` 内容的布局方式是从上到下依次排列的，你给多少内容，`ScrollView` 就会渲染多少内容；
- `FlatList` 内容的布局方式还是从上到下依次排列的，它通过更新第一个和最后一个列表项的索引控制渲染区域，默认渲染当前屏幕和上下 10 屏幕高度的内容，其他地方用空白视图进行占位；
- `RecyclerListView` 性能最好，你应该优先使用它，但使用它的前提是列表项类型**可枚举**且**高度确定或大致确定**。

内存上，`FlatList` 要管理 21 个屏幕高度的内容，而 `RecyclerListView` 只要管理大概 1 个多点屏幕高度的内容，`RecyclerListView` 使用的内存肯定少。
计算量上，`FlatList` 要实时地销毁新建 `Native` 的 `UI` 视图，`RecyclerListView` 只是改变 `UI` 视图的内容和位置，`RecyclerListView` 在 `UI` 主线程计算量肯定少。

![](https://static001.geekbang.org/resource/image/e9/71/e9572yy831332ba1fb8baf0a48bc7e71.png?wh=1920x1050)

![](https://static001.geekbang.org/resource/image/e6/a0/e6cb77f6425810e752abbeb643dbb9a0.png?wh=1870x964)

### 总结

- 滚动组件 `ScrollView` 是列表组件 `FlastList` 和 `RecyclerListView` `的底层实现，ScrollView` 的绝大部分属性在 `FlastList` 和 `RecyclerListView` 上都有；
- 从按需渲染的可视区域的大小和对底层 `UI` 视图的操作方式上分析，`RecyclerListView` 比 `FlastList` 的内存更少，在 `UI` 线程的计算量也更少；
- 为了让你的无限列表性能更好，我推荐你优先使用 `RecyclerListView`，然后才是 `FlastList`。

列表是一个很大的话题，牵涉到的性能优化细节和实践内容很多，这一讲可以算作列表的一个入门。

受限于手机性能，无限列表是经常出现性能问题的重灾区。

### 补充材料使用文档：

- [ScrollView](https://reactnative.dev/docs/scrollview) 和 [FlatList](https://reactnative.dev/docs/flatlist) 你可以参考官方文档，进一步学习它们的具体使用。
- RecyclerListView 你可以在 Github 上找到它的[文档](https://github.com/Flipkart/recyclerlistview)，在作者的博客[《RecyclerListView: High performance ListView for React Native and Web》](https://medium.com/@naqvitalha/recyclerlistview-high-performance-listview-for-react-native-and-web-e368d6f0d7ef)了解它的诞生背景。

### 实战指南：

- `RecyclerListView` 的内部状态是 `renderStack` 用于确定哪些视图应该渲染，[它的复用机制是通过列表项的类型 type 找到要被回收列表项 renderStack[key]，然后用新列表项索引 index 替换被回收的列表项索引 oldIndex](https://github.com/Flipkart/recyclerlistview/blob/c80825fabe510a48ced722e2e6e9dc1b50e8e273/src/core/VirtualRenderer.ts#L213-L222)。
- `RecyclerListView` 是可以实现高度不确定的无限列表的。图片的高度可以通过服务端事先传过来，文字的高度可以按照我在[《React Native 无限列表的优化与实践》](https://mp.weixin.qq.com/s/kN4MxfEkvICq3JneUvM56w)一文中提供的算法提前算出来，再开启高度动态修正。
- `RecyclerListView` 也是可以实现瀑布流布局的。`RecyclerListView` 其实就是绝对定位 (x,y,width,height)，但不支持双列，你可以用 `patch-package`，把底层计算 `layout` 用的 [“relayoutFromIndex” 和 “this.\_layouts”](https://github.com/Flipkart/recyclerlistview/blob/782e6ebb0ed944a653e8c83eac9329cfa243410c/src/core/layoutmanager/LayoutManager.ts#L99-L105) 改了。
- [Demo](https://github.com/jiangleo/react-native-classroom/tree/main/src/08_List)

### 作业

- 请你使用 `React Hook` 的语法实现一个 `RecyclerListView` 无限列表
