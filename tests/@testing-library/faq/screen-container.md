`screen` 和 `container` 都是 `@testing-library/react` 中的导出对象，用于在测试中访问渲染的组件。

`container` 是一个 DOM 元素，它包含了渲染组件的整个 DOM 树。您可以使用 `container` 来查询和断言组件的子元素，例如：

```javascript
import { render } from '@testing-library/react'

test('renders a heading', () => {
  const { container } = render(<h1>Hello, world!</h1>)
  const heading = container.querySelector('h1')
  expect(heading).toBeInTheDocument()
})
```

`screen` 是一个更高级别的 API，它是一个包含了许多常用查询方法的对象。使用 `screen`，您可以更轻松地查询和断言组件的子元素，例如：

```javascript
import { render, screen } from '@testing-library/react'

test('renders a heading', () => {
  render(<h1>Hello, world!</h1>)
  const heading = screen.getByRole('heading', { name: /hello, world!/i })
  expect(heading).toBeInTheDocument()
})
```

`screen` 对象提供了许多查询方法，例如 `getByRole`、`getByText`、`getByLabelText` 等等。这些方法使得查询和断言组件的子元素变得更加简单和直观。

总的来说，`container` 和 `screen` 都可以用于访问渲染的组件，但是 `screen` 提供了更高级别的 API，使得查询和断言组件的子元素变得更加简单和直观。
