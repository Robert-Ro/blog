# I18N

## 本地化关注地方

- 姓名规则，比如是姓氏在前还是名字在前
- 电话号码格式
- 日期和时间格式，如日/月/年、月/日/年
- 货币，可能需要转换成对应的当地货币值
- 书写方向，大多数语言是从左向右，但希伯来语和阿拉伯语是从右向左，有些亚洲语言是竖着书写
- 度量单位，如公制或英制
- 标点，例如各语言使用的引号各不相同，在英语中是 (`""`)，在德语中是 (`„“`)，在法语中是 (`<<>>`)
- 符号和象形图，包括勾号、停止标志以及用颜色传达的意思
- 电压、频率和插头
- 法律要求，如使用欧盟公民的个人数据时应遵守的 GDPR(General_Data_Protection_Regulation)

国际化没有单一的规范定义，但 W3C 提供了以下指导：

"国际化是一种产品、应用程序或文档的设计和开发，可以方便地为不同文化、地区或语言的目标受众进行本地化。"

## 国际化下的文字适配

## 国际化下的 rtl 语言的适配

## Resource

- [这些都不知道，产品还怎么国际化？](http://www.woshipm.com/pmd/848570.html)
- vue-18n
- [General_Data_Protection_Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)
- [Using Arabic, Hebrew, and Other Right-To-Left Languages In Web Pages](https://thenewcode.com/88/Using-Arabic-Hebrew-and-Other-Right-To-Left-Languages-In-Web-Pages)
- [在网页中使用阿拉伯语，希伯来语和其他从右至左的语言](https://blog.csdn.net/cungui5726/article/details/108207343)
- [国际化 - 通用 LTR/RTL 布局解决方案](https://zhuanlan.zhihu.com/p/47864242)

## repos

- [vue-lang-router](https://github.com/adbrosaci/vue-lang-router), Vue language routing with (optional) localized URLs.含有语言的路由解决方案

## 商用平台

- [火山云国际化翻译平台](https://www.volcengine.com/docs/6411/0) ✨✨✨
- [localize](https://localizejs.com/)

## 翻译接口

- 本地 llm 来翻译？
- 喂给 gpt 的工具
- google: @google-cloud/translate
- azure: @azure-rest/ai-translation-text
