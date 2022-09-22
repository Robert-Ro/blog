# API

## Keyboard

The Keyboard module allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.

### Methods

- `addListener()`
  - keyboardWillShow
  - keyboardDidShow
  - keyboardWillHide
  - keyboardDidHide
  - keyboardWillChangeFrame
  - keyboardDidChangeFrame
- `removeListener()`

## LayoutAnimation

## Linking⭐⭐⭐

## PanResponder

## PixelRatio⭐⭐

## Platform

> 设备信息

## PlatformColor⭐

## RootTag

## Systrace

`Systrace` is a standard **Android** **marker-based profiling tool** (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format. Both the Android SDK and React Native framework provide standard markers that you can visualize.

## Transforms

Transforms are style properties that will help you modify the appearance and position of your components using **2D or 3D transformations**. _However, once you apply transforms, the layouts remain the same around the transformed component hence it might overlap with the nearby components_. You can apply margin to the transformed component, the nearby components or padding to the container to prevent such overlaps.

## Vibration

Vibrates the device

## useColorScheme

## BackHandler

## PermissionsAndroid

### Permissions that require prompting the user

Available as constants under `PermissionsAndroid.PERMISSIONS`:

### Result strings for requesting permissions​

Available as constants under `PermissionsAndroid.RESULTS`:

- `GRANTED`: 'granted'
- `DENIED`: 'denied'
- `NEVER_ASK_AGAIN`: 'never_ask_again'

### Methods

#### check():

```ts
check(permission)
```

Returns a promise resolving to a boolean value as to whether the specified permissions has been granted.

#### request():

```ts
request(permission, [rationale])
interface Rationale {
  title: string
  message: string
  buttonPositive: string
  buttonNegative?: string
  buttonNeutral?: string
}
```

#### requestMultiple()

```ts
requestMultiple(permissions)
```

Prompts the user to enable multiple permissions in the same dialog and returns an object with the permissions as keys and strings as values (see result strings above) indicating whether the user allowed or denied the request or does not want to be asked again 一次性请求多个权限. TODO need to try

## ToastAndroid

React Native's ToastAndroid API exposes the Android platform's ToastAndroid module as a JS module.

- `API`的方式
- 组件声明式的方式
