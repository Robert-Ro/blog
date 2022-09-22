#

## 性能量化

- use browser fps info layer
- use memory

## 渲染

### FPS

- 将动效和非动效使用 level 分层
- 减少 setOption 次数
- 降低屏幕分辨率
- instace 对象不能 Reactive
- 注意去重

## 内存占用

- instace 对象不能 Reactive
- 注意实例、事件等回收(注意 context，关注吞吐量)
- 关注 Performace=>memory=>Allocation
- setTimeout 让浏览器休息下

## Resources

- [video](https://www.bilibili.com/video/BV1P4411V7LJ)
- [code](https://codepen.io/yuanyuanlife/project/editor/XbBxwn)
