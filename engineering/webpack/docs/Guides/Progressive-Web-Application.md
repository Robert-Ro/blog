# Progressive Web Application

Progressive Web Applications (or PWAs) are web apps that deliver an experience similar to native applications. There are many things that can contribute to that. Of these, the most significant is the ability for an app to be able to function when `offline`. This is achieved through the use of a web technology called [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/).

This section will focus on adding an offline experience to our app. We'll achieve this using a Google project called [Workbox](https://github.com/GoogleChrome/workbox) which provides tools that help make offline support for web apps easier to setup.

## We Don't Work Offline Now

## Adding Workbox

```shell
npm install workbox-webpack-plugin --save-dev
```

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

```log
...
                  Asset       Size  Chunks                    Chunk Names
          app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
        print.bundle.js    2.74 kB       1  [emitted]         print
             index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
      service-worker.js       1 kB          [emitted]
...
```

## Registering Our Service Worker

```js
import _ from 'lodash'
import printMe from './print.js'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
```

## Conclusion

You have built an offline app using the Workbox project. You've started the journey of turning your web app into a PWA. You may now want to think about taking things further. A good resource to help you with that can be found [here](https://web.dev/progressive-web-apps/).
