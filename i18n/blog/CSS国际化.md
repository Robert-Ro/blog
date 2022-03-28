# CSS for internationalisation

## 与语言相关的样式
- :lang()伪类选择器
```html
 <span lang="zh">但是中文则是用<em>着重号</em></span>
```
```css
em:lang(zh){
  font-style: normal;
  text-emphasis: dot; // 着重号
}
```
- 使用属性选择器
```css
[lang="zh"]
/* will match only zh */
[lang^="zh"]
/*将匹配zh，zh HK，zh Hans，zhong，zh123…
*基本上是以zh作为前两个字符的任何内容*/
[lang|="zh"]
/* 将匹配 zh, zh-HK, zh-Hans, zh-amazing, zh-123 */
```

- 普通类或ID如何？
> 也可以
## CSS属性
- Writing mode： 书写方向
  - 从上到下
  - 垂直lr和垂直rl
  - sideways-lr
  - sideways-rl
- text-orientation
## 列表和计数器
## 字体变化
## Resource
- [link](https://chenhuijing.com/blog/css-for-i18n/)