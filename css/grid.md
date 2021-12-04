# Grid 二维布局

- 容器
- 项目
- 行和列
- 单元格：行列的交叉区域
- 网格线

## 容器属性

- display: `grid` | `inline-grid`
- grid-template-columns 和 grid-template-rows
  - grid-template-columns: 每一列的列宽: px | % | repeat(<列数>, <宽度单位>)
    - repeat
    - auto-fill: 单元格大小固定，容器大小不确定: repeat(auto-fill, <宽度单位>)，容器尽可能地容纳更多的列
    - fr 关键字：fraction 的缩写，列之间的宽度比例
    - minmax： `function(minValue, maxValue)`
    - auto: 浏览器自己决定宽度
    - 网格线名称：[c1] 100px [c2] 100px [c3] auto [c4]
    - 布局实列
  - grid-template-rows: 每一行的行高
- `grid-row-gap`属性, `grid-column-gap`属性和`grid-gap`属性
  - `grid-row-gap`: 行与行的间隔，行间距
  - `grid-column-gap`: 列与列的间隔，列间距
  - `grid-gap`: 属性是`grid-column-gap`和`grid-row-gap`的合并简写形式
- `grid-template-areas`属性
- `grid-auto-flow`属性
  ```css
  grid-auto-flow: row;
  grid-auto-flow: column;
  grid-auto-flow: dense;
  grid-auto-flow: row dense;
  grid-auto-flow: column dense;
  ```
- `justify-items` 属性，`align-items` 属性，`place-items` 属性
  - `justify-items`: 单元格内容的水平位置， `start | end | center | stretch`
  - `align-items`：单元格内容的垂直位置, `start | end | center | stretch`
- `justify-content` 属性，`align-content` 属性，`place-content `属性
  - `justify-content`属性是整个内容区域在容器里面的水平位置（左中右）:`start | end | center | stretch | space-around | space-between | space-evenly`
  - `align-content`属性是整个内容区域的垂直位置（上中下）:`start | end | center | stretch | space-around | space-between | space-evenly`
- `grid-auto-columns` 属性，`grid-auto-rows` 属性
- `grid-template` 属性，`grid` 属性

## 项目属性

- grid-column-start 属性，grid-column-end 属性，grid-row-start 属性，grid-row-end 属性
- grid-column 属性，grid-row 属性
- grid-area 属性
- justify-self 属性，align-self 属性，place-self 属性

## Reference

- [complete-guide-grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
