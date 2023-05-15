# @testing-library

> Testing Library 的内部实现原理是基于 DOM 节点的查询和交互。它提供了一组 API，这些 API 允许您在 DOM 中查找元素并与它们进行交互，例如模拟用户点击、输入和选择。这些 API 的设计旨在模拟用户与页面交互的方式，而不是直接操作组件的内部细节。这种方法使得测试更加贴近实际用户的使用场景，从而提高了测试的可靠性和可维护性。Testing Library 的实现原理是基于这种哲学和方法论，以帮助开发人员编写更好的测试。

## Introduction

The `@testing-library` family of packages helps you test UI components in a `user-centric`(以用户为中心的) way.

### The Problem

您希望编写易于维护的测试，以高度确信您的组件对用户有效。作为实现这一目标的一部分，您希望您的测试避免包含实现细节，以便对组件进行重构（更改实现但不更改功能）时不会破坏您的测试，从而减慢您和您的团队的速度。

### The Solution

核心库 [`DOM Testing Library`](https://testing-library.com/docs/dom-testing-library/intro) 是一种轻量级的解决方案，用于通过查询和与 `DOM` 节点交互（无论是使用 `JSDOM/Jest` 模拟还是在浏览器中）测试网页。它提供的主要实用程序涉及以**类似于用户在页面上查找元素的方式查询 `DOM` 节点**。通过这种方式，该库有助于确保您的测试让您有信心，当真正的用户使用它时，您的应用程序将正常工作。

核心库已经包装成为几个框架提供人性化的 API，包括 React、Angular 和 Vue。还有一个插件可用于在 Cypress 中使用 testing-library 查询进行端到端测试，以及一个 React Native 的实现。

### What this library is not

1. 这个库不是测试运行器或框架
2. 也不是特定于某个测试框架的。`DOM Testing Library`适用于任何提供**DOM API**的环境，例如`Jest`、`Mocha` + `JSDOM`或真实的浏览器。

Testing Library 鼓励您避免测试实现细节，例如您正在测试的组件的内部细节（尽管这仍然是可能的）。该库的指导原则强调了关注与用户交互方式密切相关的测试。

### What you should avoid with Testing Library

Testing Library 鼓励您避免测试实现细节，例如您正在测试的组件的内部细节（尽管这仍然是可能的）。该库的指导原则强调了关注与用户交互方式密切相关的测试。

您可能希望避免以下实现细节：

- 组件的内部状态
- 组件的内部方法
- 组件的生命周期方法
- 子组件

## Guiding Principles

这个项目中包含的实用程序是基于以下指导原则：

1. 如果涉及呈现组件，则应处理 `DOM 节点`而不是组件实例，并且不应鼓励处理组件实例。
2. 它应该对于**以用户使用方式测试应用程序组件**是普遍有用的。我们在这里做出了一些权衡，因为我们使用的是计算机和通常是模拟的浏览器环境，但通常，实用程序应该鼓励使用组件的方式来进行测试，以便按照其预期使用方式使用组件。
3. 实用程序的实现和 `API` 应该简单而灵活。

最终，我们希望这个库非常轻量级、简单易懂。这样，我们就可以更加自信地编写测试。

## FAQ

### Which get method should I use?

See [Which Query Should I Use](https://testing-library.com/docs/queries/about/#priority)

### Can I write unit tests with this library?我可以使用这个库编写单元测试吗？

Definitely yes! You can write unit, integration, and end-to-end tests with this
library.

As you write your tests, keep in mind:

> The more your tests resemble the way your software is used, the more
> confidence they can give you. - [17 Feb 2018][guiding-principle]

### What if my app is localized and I don't have access to the text in test?如果我的应用程序是本地化的，而我无法在测试中访问文本怎么办？

This is fairly common. Our first bit of advice is to try to get the default text
used in your tests. That will make everything much easier (more than just using
this utility). If that's not possible, then you're probably best to just stick
with `data-testid`s (which is not bad anyway).

这是相当常见的情况。我们的第一个建议是尝试获取测试中使用的默认文本。这将使一切变得更加容易（不仅仅是使用此实用程序）。如果这不可能，那么您最好坚持使用 data-testid（这也不是坏事）。

### I really don't like data-testids, but none of the other queries make sense. Do I have to use a data-testid?如果我真的不喜欢 data-testid，但其他查询都没有意义，我必须使用 data-testid 吗？

Definitely not. That said, a common reason people don't like the `data-testid`
attribute is they're concerned about shipping that to production. I'd suggest
that you probably want some simple E2E tests that run in production on occasion
to make certain that things are working smoothly. In that case the `data-testid`
attributes will be very useful. Even if you don't run these in production, you
may want to run some E2E tests that run on the same code you're about to ship to
production. In that case, the `data-testid` attributes will be valuable there as
well.

All that said, if you really don't want to ship `data-testid` attributes, then
you can use
[this simple babel plugin](https://www.npmjs.com/package/babel-plugin-react-remove-properties)
to remove them.

If you don't want to use them at all, then you can simply use regular DOM
methods and properties to query elements off your container.

```javascript
const firstLiInDiv = container.querySelector('div li')
const allLisInDiv = container.querySelectorAll('div li')
const rootElement = container.firstChild
```

绝对不是。尽管如此，人们不喜欢 data-testid 属性的一个常见原因是他们担心将其发布到生产环境中。我建议您可能需要定期运行一些简单的 E2E 测试来确保一切正常运行。在这种情况下，data-testid 属性将非常有用。即使您不在生产环境中运行这些测试，您可能仍希望运行一些 E2E 测试，这些测试在您即将发布到生产环境的相同代码上运行。在这种情况下，data-testid 属性也将非常有价值。

所有这些都说了，如果您真的不想发布 data-testid 属性，那么您可以使用这个简单的 babel 插件来删除它们。

如果您根本不想使用它们，那么您可以简单地使用常规的 DOM 方法和属性从容器中查询素。

### What if I’m iterating over a list of items that I want to put the

data-testid="item" attribute on. How do I distinguish them from each other?如果我正在迭代一个项目列表，并希望将 data-testid =“item”属性放在上面，我该如何区分它们？

You can make your selector just choose the one you want by including `:nth-child` in the selector.

```javascript
const thirdLiInUl = container.querySelector('ul > li:nth-child(3)')
```

Or you could use `getAllByRole` to query the `listitem` role and access the index in question:

```javascript
const items = [
  /* your items */
]
const { container } = render(/* however you render this stuff */)
const thirdItem = getAllByRole(container, 'listitem')[2]
```

### Help! I can't access component methods or the component instance!我无法访问组件方法或组件实例怎么办？

This is **intentional**.

We want you to focus on testing the output and functionality of the component as
it is observed by the user and to **avoid worrying about the implementation
details** of the component.

We believe this leads to less brittle and more meaningful test code.

Please refer to the [Guiding Principles](guiding-principles.mdx) of this testing
library for more info.

[guiding-principle]: https://twitter.com/kentcdodds/status/977018512689455106

这是有意为之的。

我们希望您专注于测试组件的输出和功能，就像用户观察到的那样，并避免担心组件的实现细节。

我们相信这会导致更少脆弱和更有意义的测试代码。

请参阅此测试库的指导原则以获取更多信息。

## Resources

- [dom-testing-library cheatsheet queries](https://testing-library.com/docs/dom-testing-library/cheatsheet/#queries)
