# Monorepo

## Goals

- just one `node_modules` folder (int the root of monorepo).
- Each piece have its own folder with its own `package.json`, `tsconfig.json` but use the monorepo's `node_modules`.
- Running `tsc` in the monorepo root transpiles all packages in folder.
- Using `import .. from` can reference local packages withour errors.



## Resources
- https://javascript.plainenglish.io/monorepo-setup-with-npm-and-typescript-90b329ba7275
- https://github.com/tomnil/monorepoplate
- [一个合格的Monorepo 应当具备哪些能力？](https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247490383&idx=1&sn=f15dd8c0b3019dde422e409968d15f10&chksm=c25e7588f529fc9eb59f9fae5c7e405be352ab4869970faa710d4ccc548fe616e97e00fe87f6&mpshare=1&scene=1&srcid=0607da16mwH6M3Au2ZqkZPR5&sharer_sharetime=1654558869508&sharer_shareid=96a8492c25d6f34c62f45fbd7a70f576&version=4.0.6.6516&platform=win#rd)
- [现代 Monorepo 工程技术选型，聊聊我的思考](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247502891&idx=1&sn=1ba8a8b30398d1f2f4164df93e109024&chksm=cf61e901f81660176853a738e2eaeb075e258263c1637c72ef22c02ad950a367eb7c3dd7d37c&mpshare=1&scene=1&srcid=06079eWZgmb03r4UTgM0Wr7H&sharer_sharetime=1654558898175&sharer_shareid=96a8492c25d6f34c62f45fbd7a70f576&version=4.0.6.6516&platform=win#rd)
- [你知道 monorepo 居然有那么多坑么？](https://blog.csdn.net/qiwoo_weekly/article/details/115713366)