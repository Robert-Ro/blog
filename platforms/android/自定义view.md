## 自定义 VIEW

### 子类化视图

自定义视图也可以直接扩展 `View`，还可通过扩展某个现有视图子类（如 `Button`）节省时间

构造函数：至少提供一个以 `Context` 和 `AttributeSet` 对象为参数的构造函数。此构造函数允许布局编辑器创建和编辑视图的实例。

### 定义自定义属性

- 如需向界面添加内置 [View](https://developer.android.com/reference/android/view/View)，请在 XML 元素中指定，并使用元素属性控制其外观和行为。- 也可以通过 XML 添加精心编写的自定义视图并设置样式。如需在自定义视图中启用此行为，您必须：
  - 在 `<declare-styleable>` 资源元素中定义视图的自定义属性
  - 在 `XML` 布局中指定属性值
  - 在运行时检索属性值
  - 将检索到的属性值应用到视图

#### 定义自定义属性并指定其值

如需定义自定义属性，请向项目添加 `<declare-styleable>` 资源。这些资源通常放在 `res/values/attrs.xml` 文件中。以下是 `attrs.xml` 文件的示例:

```xml
    <resources>
       <declare-styleable name="PieChart">
           <attr name="showText" format="boolean" />
           <attr name="labelPosition" format="enum">
               <enum name="left" value="0"/>
               <enum name="right" value="1"/>
           </attr>
       </declare-styleable>
    </resources>
```

定义了自定义属性后，便可像内置属性一样在布局 XML 文件中使用它们。唯一的区别是自定义属性属于另一个命名空间。它们不属于 `http://schemas.android.com/apk/res/android` 命名空间，而是属于 `http://schemas.android.com/apk/res/[your package name]`。例如，下面展示了如何使用为 `PieChart` 定义的属性：

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
       xmlns:custom="http://schemas.android.com/apk/res/com.example.customviews">
     <com.example.customviews.charting.PieChart
         custom:showText="true"
         custom:labelPosition="left" />
    </LinearLayout>
```

内部类使用`com.example.customviews.charting.PieChart$PieView`标记

### 应用自定义属性

通过 `XML` 布局创建视图时，`XML` 标记中的所有属性都会从资源包读取，并作为 `AttributeSet` 传递到视图的构造函数中。虽然可以直接从 `AttributeSet` 读取值，但这样做有一些弊端：

- 不解析属性值中的资源引用
- 不应用样式

请改为将 `AttributeSet` 传递给 `obtainStyledAttributes()`。此方法会传回一个 `TypedArray` 数组，其中包含已解除引用并设置了样式的值。

```java
    public PieChart(Context context, AttributeSet attrs) {
       super(context, attrs);
       TypedArray a = context.getTheme().obtainStyledAttributes(
            attrs,
            R.styleable.PieChart,
            0, 0);

       try {
           mShowText = a.getBoolean(R.styleable.PieChart_showText, false);
           textPos = a.getInteger(R.styleable.PieChart_labelPosition, 0);
       } finally {
           a.recycle();
       }
    }
```

> 请注意，`TypedArray`对象是共享资源，必须在使用后回收

### 添加属性和事件

属性是控制视图行为和外观的强大方式，但只能在视图初始化时读取。如需提供动态行为，请为每个自定义属性公开一个 `getter` 与 `setter` 属性对。以下代码段展示了 `PieChart` 如何公开名为 `showText` 的属性：

```java
    public boolean isShowText() {
       return mShowText;
    }

    public void setShowText(boolean showText) {
       mShowText = showText;
       invalidate();
       requestLayout();
    }
```

请注意，`setShowText` 会调用 `invalidate()` 和 `requestLayout()`。这些调用对于确保视图可靠运行至关重要。

```java
invalidate()
// Invalidate the whole view. If the view is visible, `onDraw(android.graphics.Canvas)` will be called at some point in the future.

// This must be called from a UI thread. To call from a non-UI thread, call `postInvalidate()`.
requestLayout()
// Call this when something has changed which has **invalidated the layout of this view**. This will schedule a layout pass of the view tree. This should not be called while the view hierarchy is currently in a layout pass (isInLayout()
```

## 自定义绘制

自定义视图最重要的部分是外观。绘制自定义视图可能很简单，也可能很复杂，具体取决于应用的需求。

### 替换 `onDraw()`

绘制自定义视图最重要的一步是替换 `onDraw()` 方法。`onDraw()` 的参数是一个 `Canvas` 对象，视图可以使用该对象绘制其自身。`Canvas` 类定义了绘制文本、线条、位图和许多其他图形基元的方法。

### 创建绘制对象

`android.graphics` 框架将绘制分为两个方面：

- 需要绘制什么，由 `Canvas` 处理
- 如何绘制，由 `Paint` 处理。

`Canvas` 定义您可以在屏幕上绘制的形状，`Paint` 则定义您绘制的每个形状的颜色、样式和字体等。

提前创建对象是一项重要的优化措施。视图会非常频繁地重新绘制，并且许多绘制对象的初始化都需要占用很多资源。在 `onDraw()` 方法内创建绘制对象会显著降低性能并使界面显得卡顿。

### 处理布局事件

为了正确绘制自定义视图，您需要知道它的大小。复杂的自定义视图通常需要根据其在屏幕上所占区域的大小和形状执行多次布局计算。不要妄自假设视图在屏幕上的大小。即使只有一个应用使用您的视图，该应用也需要处理纵向和横向模式下的不同屏幕尺寸、多种屏幕密度和各种宽高比。

尽管 `View` 提供多种测量处理方法，大部分方法都不需要被替换。如果您的视图不需要对其大小进行特殊控制，您只需替换一个方法，即 `onSizeChanged()`。

如果您需要更**精细地控制视图的布局参数**，请实现 `onMeasure()`。此方法的参数是 `View.MeasureSpec` 值，用于告诉您视图的父视图希望您的视图有多大，以及该大小是硬性最大值还是只是建议值。作为优化措施，这些值以打包整数形式存储，您可以使用 `View.MeasureSpec` 的静态方法解压缩每个整数中存储的信息。

- 计算时会考虑视图的内边距。如前文所述，这由视图负责计算。
- 辅助方法 `resolveSizeAndState()` 用于创建最终的宽度和高度值。该辅助程序通过将视图所需大小与传递到 `onMeasure()` 的规格进行比较，返回合适的 `View.MeasureSpec` 值。
- `onMeasure()` 没有返回值。而是由方法通过调用 `setMeasuredDimension()` 传达其结果。必须调用此方法。如果省略此调用，`View` 类将抛出运行时异常。

### 绘制

- 使用 `drawText()` 绘制文本。通过调用 `setTypeface()` 指定字体，并通过调用 `setColor()` 指定文本颜色。
- 使用 `drawRect()`、`drawOval()` 和 `drawArc()` 绘制基元形状。通过调用`setStyle()`更改形状的填充和/或轮廓。
- 使用 `Path` 类绘制更复杂的形状。通过将线条和曲线添加到 `Path` 对象以定义形状，然后使用 `drawPath()` 绘制形状。与基元形状一样，路径可以只描绘轮廓或只进行填充，也可以两者兼具，具体取决于 `setStyle()`。
- 通过创建 `LinearGradient` 对象定义渐变填充。调用 `setShader()` 可在填充的形状上使用 `LinearGradient`。
- 使用 `drawBitmap()` 绘制位图。

## 使视图可交互

绘制界面只是创建自定义视图的一个部分。您还需要让视图以与自己模仿的真实操作非常相似的方式响应用户输入。

用户还能感受到界面中的细微行为变化或者给人带来的细微感觉变化，并对细微之处做出最佳反应来模仿现实世界。

### 处理输入手势

像许多其他界面框架一样，`Android` 支持输入事件模型。用户操作会转变为可触发回调的事件，您可以替换回调来自定义应用对用户的响应方式。

轻触事件本身并不特别实用。现代触控界面根据手势定义互动，例如**点按**、**拉**、**推**、**快滑**和**缩放**。为了将原始轻触事件转换成手势，`Android` 提供了 `GestureDetector`。

### 创建符合物理原理的运动

### 实现流畅切换

## 优化视图

您现在已拥有一个设计精良的视图，能够响应不同的手势和切换状态，接下来要确保这个视图快速运行。

### 精简代码，降低调用频率

## Reference

- [android training custom-views](https://developer.android.com/training/custom-views/create-view#java)

## TODO

### react-native-wheel-picker

- [react-native-wheel-picker](https://github.com/GregFrench/react-native-wheel-picker), 1.0.3 jcenter()
- 自己接 cn.aigestudio.wheelpicker:WheelPicker:1.1.3 error: divide by zero

```java
wheelPicker.getHandler().postDelayed(() -> wheelPicker.setSelectedItemPosition(3), 100);
```
