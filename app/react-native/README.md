# React Native

## Design & style

### layout with Flexbox

#### ⭐⭐Absolute & Relative Layout

- `relative`: 相对定位，默认值
  元素定位根据自然文档流， 偏移值`offset`基于`top`, `right`, `botom`, `left`，相对自身原本位置偏移，偏移值不受任何父元素或者兄弟元素影响
- `absolute`：绝对定位
  元素不根据文档流定位，独立于兄弟元素来定位，偏移值`offset`由`top`, `right`, `botom`, `left`而定

## Image

### Props:

- ⭐⭐⭐progressiveRenderingEnabled: 渐进性渲染 When true, enables progressive jpeg streaming - https://frescolib.org/docs/progressive-jpegs.
- ⭐⭐resizeMode：Determines how to resize the image when the frame doesn't match the raw image dimensions. Defaults to `cover`.
- ⭐resizeMethod:
- blurRadius: 模糊半径
- defaultSource：占位图
- loadingIndicatorSource：

### Events:

- onError
- onLayout: Invoked on mount and on layout changes.
- onLoad: Invoked when load completes successfully.
- onLoadEnd: Invoked when load either succeeds or fails.
- onLoadStart: Invoked on load start.
- onProgress: Invoked on download progress.

### Methods

> 缓存和预加载

- ⭐⭐`prefetch(): await Image.prefetch(url);`: Prefetches a remote image for later use by downloading it to the disk cache. Returns a promise which resolves to a boolean.
- ⭐⭐`queryCache(): await Image.queryCache(urls);`: Perform cache interrogation.

## Text

A React component for displaying text. `Text` supports nesting, styling, and touch handling(`onPress`).

### fontFamily 问题

- 使用一致性的字体去创建自定义`Text`组件

### Props

- android_hyphenationFrequency
- ⭐dataDetectorType
- ⭐⭐ellipsizeMode
- ⭐⭐numberOfLines
- ⭐⭐textBreakStrategy

## View

The most fundamental component for building a UI, `View` is a container that supports layout with `flexbox`, `style`,` some touch handling`, and `accessibility` controls

### Props

- collapsable

### Events

- onLongPress
- onMoveShouldSetResponder
- onPress

## TouchableOpacity

> 模拟按钮

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

## TouchableHighlight

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.
> 模拟按钮

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

## TouchableWithoutFeedback

Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched.

## Pressable⭐⭐⭐

> `Pressable` uses React Native's `Pressability` API. For more information around the state machine flow of Pressability and how it works, check out the implementation for [Pressability](https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347).

Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

On an element wrapped by `Pressable`:

- `onPressIn` is called when a press is activated.
- `onPressOut` is called when the press gesture is deactivated.

After pressing `onPressIn`, one of two things will happen:

- The person will remove their finger, triggering `onPressOut` followed by `onPress`.
- If the person leaves their finger longer than 500 milliseconds before removing it, `onLongPress` is triggered. (`onPressOut` will still fire when they remove their finger.)

![You can set HitRect with hitSlop and set PressRect with pressRetentionOffset](https://d33wubrfki0l68.cloudfront.net/9b416a15e621e19463eadfb31eb16a058008ac9c/aecda/docs/assets/d_pressable_anatomy.svg)

### Props

- android_disableSound
- ⭐⭐⭐android_ripple
- ⭐delayLongPress
- disabled
- hitSlop
- pressRetentionOffset

### Event

- onLongPress
- onPress
- onPressIn
- onPressOut

### ⭐RippleConfig 波纹效果配置

| NAME       | TYPE    | REQUIRED | DESCRIPTION                                                                                                                                                                                                                                                      |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color      | color   | No       | Defines the color of the ripple effect.                                                                                                                                                                                                                          |
| borderless | boolean | No       | Defines if ripple effect should not include border.                                                                                                                                                                                                              |
| radius     | number  | No       | Defines the radius of the ripple effect.                                                                                                                                                                                                                         |
| foreground | boolean | No       | **Set to true to add the ripple effect to the foreground of the view, instead of the background**. This is useful if one of your child views has a background of its own, or you're e.g. displaying images, and you don't want the ripple to be covered by them. |

## ActivityIndicator

Displays a circular loading indicator.

### Props

- animating
- color: null (system accent default color)(Android)
- size: `small`/`large`

## Reference

- [React Native doc](https://reactnative.dev/docs)
- [yoga layout engine](https://github.com/facebook/yoga), Yoga is a **cross-platform layout engine**(it was written in portable `C/C++`) which implements Flexbox
- [yogalayout](https://yogalayout.com/playground/)
- [Layout Props](https://reactnative.dev/docs/layout-props), 布局属性参考
- [Image Style Props](https://reactnative.dev/docs/image-style-props), 图片属性参考
- [Shadow Props](https://reactnative.dev/docs/shadow-props), 阴影属性参考
- [Text Style Props](https://reactnative.dev/docs/text-style-props), 文本属性参考
- [View Style Props](https://reactnative.dev/docs/view-style-props), View 属性参考
