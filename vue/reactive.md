## Watcher, Dep, Observer

- Watcher 观察者
- Dep 订阅管理者
- Observer 被观察者

![流程图](../assets/image/1606e7eaa2a664e8_tplv-t2oaga2asx-watermark.awebp)

## 依赖收集

### 为什么需要依赖收集

仅收集依赖了响应式数据的地方，即收集**被依赖对象**，也即**观察者对象`Watcher`**
