这是关于 React Testing Library 的介绍，它是在 DOM Testing Library 的基础上添加了用于处理 React 组件的 API。

您想为 React 组件编写可维护的测试。作为此目标的一部分，您希望**您的测试避免包含组件的实现细节**，而是专注于使测试为您提供所需的信心。作为此目标的一部分，您希望您的测试库在长期运行中是可维护的，以便组件的重构（实现更改但不影响功能）不会破坏您的测试并减慢您和您的团队的速度。

React Testing Library 是一种非常轻量级的测试 React 组件的解决方案。它在 react-dom 和 react-dom/test-utils 之上提供了轻量级的实用程序函数，以鼓励更好的测试实践。它的主要指导原则是：

> [您的测试越像您的软件使用方式，它们就越能给您信心。](guiding-principles.mdx)

因此，您的测试将使用实际的 DOM 节点而不是渲染的 React 组件实例。此库提供的实用程序函数可以以与用户相同的方式查询 DOM。通过标签文本查找表单元素（就像用户一样），通过文本查找链接和按钮（就像用户一样）。它还公开了一种通过 data-testid 查找元素的推荐方法，作为元素的“逃生口”，其中文本内容和标签不合理或不实用。

此库鼓励您的应用程序更易于访问，并允许您更接近使用组件的方式，这使得您的测试可以更有信心，即当真正的用户使用它时，您的应用程序将正常工作。

此库是 Enzyme 的替代品。虽然您可以使用 Enzyme 本身遵循这些指南，但由于 Enzyme 提供的所有额外实用程序（有助于测试实现细节的实用程序） enforcing 这更加困难。在[常见问题解答](react-testing-library/faq.mdx)中了解更多信息。

**此库不是**：

1. 测试运行器或框架
2. 特定于测试框架（尽管我们建议 Jest 作为我们的首选项，但该库可与任何框架一起使用。请参见[使用 Jest](setup.mdx#using-without-jest)

> 注意：此库是建立在[`DOM Testing Library`](dom-testing-library/intro.mdx)之上的，其中大部分查询逻辑都在其中。

## 教程

请查看下面的[“What is React Testing Library?”](https://youtu.be/JKOwJUM4_RM)视频，以介绍该库。

此外，不要错过此[React Testing Library 教程](https://www.robinwieruch.de/react-testing-library)。
