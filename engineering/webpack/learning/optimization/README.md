# Webpack Optimization

## Directions

- Improving the building speed
- Reducing the size of the packaged files
- Improving the user experience

## Improving the building speed

- thread-loader: 引入多线程
- cache-loader: 使用缓存, 改为配置项: `cache: true`
- hot update
- exclude/include

## Reducing the size of the packaged files

- Reducing the size of the packaged files
  - Minify CSS Code: `css-minimizer-webpack-plugin`
  - Minify JavaScript Code: `terser-webpack-plugin`
- tree-shaking
  - `mode: 'production'`
- source-map
  - development: `eval-cheap-module-source-map`
  - production: `nosources-source-map`
- Bundle Analyzer

## Improving the user experience

- Module lazy loading
  - use `import()` dynamic import function
- Gzip
- base64
  - asset-module
- Properly configure hash

## Resources

- thread-loader
- cache-loader

## webpack 支持的代码拆分和按需加载

主要是三种：

- 通过入口配置手动分割代码
- 动态导入支持(`import()`)
- 通过 `splitChunk` 插件提取公共代码(公共代码分割)

## tree-shaking

- [使用说明](./tree-shaking/README.md)

## FAQ

- 懒加载效果测试
- 三方模块问题

## 优化效果评估

> **量化**, web vites, performance, lightHouse, 特定的指标`FMP`, `LCP`

评价线上应用的优化效果通常需要综合考虑多个因素和指标。以下是一些评价优化效果的方法和指标：

1. **性能指标**：

   - **加载时间**：测量页面加载所需的时间，包括首次加载和页面重载。
   - **渲染时间**：页面在浏览器中完成渲染的时间。
   - **首屏加载时间**：测量页面上首屏内容加载和渲染所需的时间。
   - **页面大小**：测量页面的文件大小，包括 HTML、CSS、JavaScript 和其他资源。
   - **页面速度指数（PSI）**：Google PageSpeed Insights 提供的指标，综合考虑了多个性能因素，包括加载时间、渲染时间和交互性。
   - **资源加载时间**：分析各种资源（如图片、CSS、JavaScript 文件）的加载时间。
   - **浏览器性能指标**：使用浏览器开发工具中的性能分析工具，查看页面性能，包括 CPU 使用率、内存使用率和网络活动。

2. **用户体验**：

   - **交互性**：确保页面可以快速响应用户交互，例如点击按钮或滚动页面。
   - **用户反馈**：收集用户反馈，了解他们的体验和满意度。

3. **SEO（搜索引擎优化）**：

   - **SEO 指标**：检查是否有助于提高搜索引擎排名的因素，如页面加载速度、页面可访问性和移动友好性。

4. **负载测试**：

   - 使用负载测试工具来模拟多用户同时访问网站，评估网站在高负载下的性能。

5. **异常和错误报告**：

   - 监控应用程序的异常和错误日志，以便及时发现和解决问题。

6. **用户行为分析**：

   - 使用分析工具（如 Google Analytics）来了解用户行为，包括跳出率、页面访问深度和转化率。

7. **A/B 测试**：

   - 进行 A/B 测试，比较不同版本的页面，以确定哪个版本在性能和用户体验方面更优秀。

8. **成本效益**：
   - 考虑优化的成本和效益，以确保所做的改进值得投入。

总的来说，综合考虑性能指标、用户体验、SEO、负载测试、异常监控和用户行为等因素，可以帮助您评价线上应用的优化效果。在进行优化之前和之后，定期监控这些指标，并根据数据来优化您的策略。
