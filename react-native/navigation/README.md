# React Navigation

- 类比浏览器 history stack

## Navigate

navigation stack

- `navigate`
- `push`
- `goBack`
- `popToTop`

> android handware back button fires `goBack()` function

### Passing parameters to routes

- JSON-serializable
- `setParams`: update their params, avoid use their method to update screen options, use `setOption` instead
- Initial params, merge with any params that you pass
- passing params to previous screen
- passing params to nested navigators
- what should be in params
  - avoid the full data, example: using userid instead of user object
  - avoid passing data which is used by multiple screens, such data should be in a global store
  - keep as little data as possible

### Configuring the header bar

> repetition is key to learning!

- Setting the header title
  - use options: `{{ title: 'xxx' }}`
  - use options: `{({route}) => ({title: route.params.xx})}`
    - the argument that is passed in to the `option` funciton is an object with following properties:
      - `navigation`: the [navigation prop](https://reactnavigation.org/docs/navigation-prop) for the screen
      - `route`: the [route prop](https://reactnavigation.org/docs/route-prop) for the screen



## Reference
- [reactnavigation](https://reactnavigation.org)