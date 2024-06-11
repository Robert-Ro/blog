# Preflight 基础预设值

> 与其他样式库冲突的也是这里

An opinionated set of base styles for Tailwind projects.

Built on top of [modern-normalize](https://github.com/sindresorhus/modern-normalize), Preflight is a set of base styles for Tailwind projects that are designed to smooth over cross-browser inconsistencies and make it easier for you to work within the constraints of your design system.

Tailwind automatically injects these styles when you include @tailwind base in your CSS:

```CSS
@tailwind base; /* Preflight will be injected here */

@tailwind components;

@tailwind utilities;

```

## TroubleShoots

### 解决 antd@V5 样式冲突的问题

> 策略：以 antd 的样式为主

```jsx
import { StyleProvider } from '@ant-design/cssinjs'

export default () => {
  return <StyleProvider hashPriority="high">{children}</StyleProvider>
}
```
