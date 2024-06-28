# Layout

> 对照着 web 上的组件、css 常见属性来学习
> 如文本，图片，块，输入框、checkbox、按钮等
> 单子布局组件，多子布局组件
> 剩余区域铺满，铺满
> 水平/垂直对齐

## 文本 widget

## 按钮 widget

按钮列举，使用场景

### ElevatedButton

### FloatingActionButton

### OutlinedButton

### CloseButton

## 图片 widget

### network

### assets

### CircleAvatar 圆角头像

### ClipOval

## 表单 widget

### TextField

## 容器

单子布局：`Align`、`Center`、`Padding`、`Container`
多子布局：`Flex`、`Row`、`Column`、`Stack`

### Contaienr

#### BoxConstraints

#### BoxDecoration

### Row

```dart
Row({
  Key key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start, // 主轴对齐方式
  MainAxisSize mainAxisSize = MainAxisSize.max, // 水平方向尽可能大
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center, // 交叉处对齐方式
  TextDirection textDirection, // 水平方向子widget的布局顺序（默认为系统当前Locale环境的文本方向(如中文、英语都是从左往右，而阿拉伯语是从右往左））
  VerticalDirection verticalDirection = VerticalDirection.down, // 表示Row纵轴（垂直）的对齐方向
  TextBaseline textBaseline, // 如果上面是baseline对齐方式，那么选择什么模式（有两种可选）
  List<Widget> children = const <Widget>[],
})

```

#### Expanded

不设置固定值，占据剩余部分

### Stack

> 解决组件重叠展示需求

```dart
Stack({
  Key key,
  this.alignment = AlignmentDirectional.topStart,
  this.textDirection,
  this.fit = StackFit.loose,
  this.overflow = Overflow.clip,
  List<Widget> children = const <Widget>[],
})

```

- `alignment`：此参数决定如何去对齐没有定位（没有使用 Positioned）或部分定位的子 widget。所谓部分定位，在这里**特指没有在某一个轴上定位：**left、right 为横轴，top、bottom 为纵轴，只要包含某个轴上的一个定位属性就算在该轴上有定位。
- textDirection：和 Row、Wrap 的 textDirection 功能一样，都用于决定 `alignment` 对齐的参考系即：textDirection 的值为 `TextDirection.ltr`，则 `alignment` 的 `start` 代表左，`end` 代表右；textDirection 的值为 `TextDirection.rtl`，则 `alignment` 的 `start` 代表右，`end` 代表左。
- fit：此参数用于决定**没有定位**的子 widget 如何去适应 Stack 的大小。`StackFit.loose` 表示使用子 widget 的大小，`StackFit.expand` 表示扩伸到 Stack 的大小。
- overflow：此属性决定如何显示超出 Stack 显示空间的子 widget，值为 `Overflow.clip` 时，超出部分会被剪裁（隐藏），值为 `Overflow.visible` 时则不会。

### 容器组件

Flutter 提供了一系列的容器组件，用于构建布局和 UI。以下是一些常用的容器组件：

1. **Container** - 用于绘制一个矩形容器，可以设置背景色、边框、边距、填充等。
2. **Scaffold** - 为 Material Design 应用提供了基础的布局结构，包含 app bar、body、bottom sheet、drawer 等。
3. **Column** - 垂直方向的线性布局容器，可以包含多个子组件。
4. **Row** - 水平方向的线性布局容器，可以包含多个子组件。
5. **Stack** - 用于堆叠多个子组件，可以控制子组件的对齐方式和位置。
6. **Flex** - 灵活的线性布局容器，提供比 Column 和 Row 更多的控制选项。
7. **Expanded** - 用于在 Flex 或 Row 中占据额外的空间。
8. **Flexible** - 与 Expanded 类似，但提供了更多的配置选项。
9. **ListView** - 一个可滚动的列表视图，可以水平或垂直滚动。
10. **GridView** - 一个可滚动的网格视图，以网格形式展示子组件。
11. **SingleChildScrollView** - 一个可以滚动单个子组件的滚动视图。
12. **NestedScrollView** - 用于嵌套滚动的场景，允许多个滚动组件协同工作。
13. **CustomPaint** - 用于自定义绘制的容器，可以绘制形状、路径、图片等。
14. **IntrinsicWidth** - 用于根据子组件的内在宽度来调整容器的宽度。
15. **IntrinsicHeight** - 用于根据子组件的内在高度来调整容器的高度。
16. **Transform** - 用于对子组件应用变换，如旋转、缩放、平移等。
17. **Padding** - 用于在容器内部添加填充。
18. **Center** - 用于将子组件居中显示。
19. **AspectRatio** - 用于维持子组件的宽高比。
20. **ConstrainedBox** - 用于对子组件的尺寸添加额外的约束。
21. **UnconstrainedBox** - 用于移除对子组件的尺寸约束。
22. **DecoratedBox** - 用于对子组件应用装饰，如背景、边框等。
23. **Opacity** - 用于设置子组件的透明度。
24. **PhysicalShape** - 用于为子组件添加物理形状的边框和阴影。
25. **ClipRect** 和 **ClipOval** - 用于裁剪子组件的矩形或椭圆形区域。

这些容器组件可以组合使用，以创建复杂的布局和 UI 效果。Flutter 的布局系统非常灵活，允许开发者根据需求构建各种自定义布局。

## FAQs

- 宽度/高度：内容自适应
- 最佳实践
- 组件复用
