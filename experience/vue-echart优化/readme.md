#
## 性能量化
- use browser fps info layer
- use memory
## 渲染
### FPS
- 将动效和非动效使用level分层
- 减少setOption次数
- 降低屏幕分辨率
- instace对象不能Reactive
- 注意去重
## 内存占用
- instace对象不能Reactive
- 注意实例、事件等回收(注意context，关注吞吐量)
- 关注Performace=>memory=>Allocation
- setTimeout 让浏览器休息下
## Resources
- [video](https://www.bilibili.com/video/BV1P4411V7LJ)
- [code](https://codepen.io/yuanyuanlife/project/editor/XbBxwn)