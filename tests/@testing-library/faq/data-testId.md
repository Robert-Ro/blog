Q: `testing-library`提供的`ByTestId`，每个节点都需要提供`data-testid`
A: 是的，`testing-library` 提供的 `ByTestId` 查询方法需要在要查询的节点上提供 `data-testid` 属性。这是因为 `testing-library` 的设计理念是基于用户行为而不是实现细节的，因此它鼓励开发人员使用 `data-testid` 属性来标识组件的特定部分，以便测试人员可以轻松地查询这些部分。

虽然在每个节点上添加 `data-testid` 属性可能会增加一些工作量，但这也有助于提高测试的可维护性和可读性。通过使用 `data-testid` 属性，测试人员可以更容易地理解测试的目的，并且测试代码也更容易阅读和维护。

如果您的组件很大或嵌套很深，手动添加 `data-testid` 属性可能会变得很繁琐。在这种情况下，您可以考虑使用自动化工具来为您的组件添加 `data-testid` 属性。例如，您可以使用 `babel-plugin-react-data-testid` Babel 插件来自动为您的组件添加 `data-testid` 属性。

总的来说，虽然在每个节点上添加 `data-testid` 属性可能会增加一些工作量，但这也有助于提高测试的可维护性和可读性。通过使用 `data-testid` 属性，测试人员可以更容易地理解测试的目的，并且测试代码也更容易阅读和维护。

Q: 为每个节点上添加 data-testid 属性是不是有违背不考虑组件的内部实现的测试原则
A: 在测试中，确实应该尽量避免依赖组件的内部实现细节，而是应该基于用户行为来编写测试。这是因为组件的内部实现可能会随着时间的推移而发生变化，而测试应该是稳定的，不应该因为组件的内部实现发生变化而失效。

然而，在实践中，为每个节点添加 `data-testid` 属性并不一定违反这个原则。这是因为 `data-testid` 属性并不是组件的内部实现细节，而是一种用于标识组件特定部分的公共约定。通过使用 `data-testid` 属性，测试人员可以更容易地理解测试的目的，并且测试代码也更容易阅读和维护。

另外，`testing-library` 的设计理念是基于用户行为而不是实现细节的，因此它鼓励开发人员使用 `data-testid` 属性来**标识组件的特定部分**，以便测试人员可以轻松地查询这些部分。这并不意味着测试人员应该依赖组件的内部实现细节来编写测试，而是应该基于用户行为来编写测试，并使用 `data-testid` 属性来标识组件的特定部分。

总的来说，为每个节点添加 `data-testid` 属性并不一定违反不考虑组件的内部实现的测试原则，但测试人员应该尽量避免依赖组件的内部实现细节来编写测试。
