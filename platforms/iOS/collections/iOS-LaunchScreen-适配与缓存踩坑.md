# iOS LaunchScreen 适配与缓存踩坑

测试时候发现这次改完的新启动图 Launch Screen.storyboard 打包之后给测试同学升级安装 , 启动图还是旧的, 于是就去看了下 Launch Screen 源码

```c
NSError *error;
[NSFileManager.defaultManager removeItemAtPath:[NSString stringWithFormat:@"%@/Library/SplashBoard",NSHomeDirectory()] error:&error];
if (error) {
  NSLog(@"Failed to delete launch screen cache: %@",error);
}
```

- 启动图不要放在 `Assets.xcassets` 里边, 每次更新图片用不同的名字
