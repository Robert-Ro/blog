# Providers
Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a `provider` – `services`, `repositories`, `factories`, `helpers`, and so on. The main idea of a provider is that it can be injected as a dependency当作依赖注入; this means objects can create various relationships with each other彼此创建多样关系, and the function of **"wiring up"**(提升) instances of objects can largely be delegated委托/代理 to the Nest runtime system.

- Dependency injection
  > design pattern, [recommend reading](https://angular.io/guide/dependency-injection)
- Scopes
  Provider具有与应用生命周期同步的作用域。当应用启动后，每一个依赖必需被解析，因此每一个provider都必须被实例化。同样，当应用被销毁，每一个provider都必须被销毁。此外，有一些方式让你的provider的生命周期与单个请求生命周期保持一致，[链接](https://angular.io/guide/dependency-injection)
- 自定义provider
  nest内置了控制反转(IoC)容器，用以解决providers之间的关系。自定义providers[具体方式](https://docs.nestjs.com/fundamentals/dependency-injection)
  - use plain values,
  - classes,
  - and either asynchronous or synchronous factories.
- 可选的provider
  有时，有些provider不需要被解析。比如，一个类依赖了一个配置对象，但不是必需的，这是就会使用默认值。在这种情况下，这个依赖会是可选的，因为缺少这个配置provider也不会导致错误。
- Property-based injection
- Provider registration
  - 注册到`@Module`中
- Manual instantiation
  - 动态实例化, 参考[Module reference](https://docs.nestjs.com/fundamentals/module-ref)