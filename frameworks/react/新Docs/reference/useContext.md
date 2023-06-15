# useContext

`useContext` 是一个 React Hook，它允许你从组件中读取并订阅上下文(Context)

## Reference

### useContext(SomeContext)

在组件的顶层使用 useContext 来读取并订阅上下文（Context）。

```JSX
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
}
```

#### Parameters

SomeContext: 之前用 createContext 创建的上下文。上下文本身并不持有信息，它只代表你可以提供给组件或从组件中读取的信息的类型。

#### Returns

`useContext` returns the context value for the calling component. It is determined as the value passed to the closest `SomeContext.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to createContext for that context. The returned value is always up-to-date. React automatically re-renders components that read some context if it changes.

`useContext` 返回调用组件的上下文值。该值由位于组件上方的最近的 `SomeContext.Provider` 提供者传递的值决定。如果不存在这样的提供者，则返回的值将是你在 `createContext` 中为该上下文传递的 `defaultValue`。返回的值始终是最新的。如果上下文发生变化，React 会自动重新渲染读取该上下文的组件。

#### Caveats

在 React 组件中，`useContext()` 调用不会受到同一组件返回的提供者的影响。相应的 `<Context.Provider>` 需要位于调用 `useContext()` 的组件之上。

React 会自动重新渲染使用特定上下文的所有子组件，从接收到不同值的提供者开始。先前的值和下一个值使用 Object.is 进行比较。**使用记忆化（例如 React.memo()）并不会阻止子组件获取最新的上下文值**。

如果你的构建系统在输出中生成了重复的模块（可能是由于符号链接导致的），这可能会破坏上下文。通过上下文传递值只能在提供和读取上下文的对象完全相同（通过 === 比较判断）的情况下正常工作。

## Usage

### 将数据深层传递到组件树中

#### Pitfall

useContext() 总是在调用它的组件上方寻找最近的提供者（Provider）。它向上搜索，并不考虑在调用 useContext() 的组件中的提供者。

### Updating data passed via context 更新通过上下文传递的数据

通常，你可能希望**上下文随时间而变化**。为了更新上下文，可以将其与状态结合使用。在父组件中声明一个状态变量，并将当前状态作为上下文值传递给提供者组件。

```JSX
// EXAMPLE1
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
// EXAMPLE2
// 创建上下文
const MyContext = React.createContext();

// 创建上下文的提供者组件
const MyProvider = () => {
  const [data, setData] = useState('初始数据');

  // 更新函数
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    // 传递对象和函数
    <MyContext.Provider value={{ data, updateData }}>
      {/* 提供者组件内的其他组件 */}
    </MyContext.Provider>
  );
};

// 在组件中使用上下文
const MyComponent = () => {
  const { data, updateData } = useContext(MyContext);

  const handleClick = () => {
    updateData('更新后的数据');
  };

  return (
    <div>
      <p>{data}</p>
      <button onClick={handleClick}>更新数据</button>
    </div>
  );
};

```

### 指定一个回退的默认值

如果 React 在父级树中找不到特定上下文的任何提供者，那么 useContext() 返回的上下文值将等于你在创建上下文时指定的默认值。

### Overriding context for a part of the tree 在树的一部分中覆盖上下文

你可以通过在树的一部分中使用具有不同值的提供者来覆盖上下文。

```JSX
<ThemeContext.Provider value="dark">
  ...
  <ThemeContext.Provider value="light">
    <Footer />
  </ThemeContext.Provider>
  ...
</ThemeContext.Provider>
```

### Optimizing re-renders when passing objects and functions 在传递对象和函数时优化重新渲染

You can pass any values via context, including objects and functions.

```JSX
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  function login(response) {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      <Page />
    </AuthContext.Provider>
  );
}
```

在这里，上下文值是一个具有两个属性的 JavaScript 对象，其中一个是函数。每当 MyApp 重新渲染（例如在路由更新时），这将是一个不同的对象，指向一个不同的函数，因此 React 也必须重新渲染调用 useContext(AuthContext) 的树中的所有组件。

在较小的应用程序中，这不是一个问题。然而，如果底层数据（如 currentUser）没有发生变化，则没有必要重新渲染它们。为了帮助 React 利用这个事实，你可以使用 useCallback 包装 login 函数，并使用 useMemo 包装对象创建过程。这是一种性能优化：

```JSX
import { useCallback, useMemo } from 'react';

function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Page />
    </AuthContext.Provider>
  );
}
```

## Troubleshooting

### My component doesn’t see the value from my provider

这种情况可能有几种常见的原因：

- 在调用 useContext() 的组件内部（或以下）渲染了 <SomeContext.Provider>。将 <SomeContext.Provider> 移到调用 useContext() 的组件之上并且位于外部。
- 可能忘记了使用 <SomeContext.Provider> 包装组件，或者将其放在了预期的树的不同部分。可以使用 React DevTools 检查层次结构是否正确。
- 可能遇到了一些构建工具方面的问题，导致提供组件中的 SomeContext 和读取组件中的 SomeContext 是两个不同的对象。例如，如果使用符号链接，可能会发生这种情况。可以通过将它们分配给全局变量（如 window.SomeContext1 和 window.SomeContext2），然后在控制台中检查 window.SomeContext1 === window.SomeContext2 来验证这一点。如果它们不相同，请在构建工具层面解决这个问题。

### I am always getting undefined from my context although the default value is different 
如果您始终从上下文中获取到 undefined，可能有几个原因需要考虑：

## Resources

- [link](https://react.dev/reference/react/useContext)
