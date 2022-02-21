# RAM Bundles and Inline Requires

> 优化加载的模块

## Loading JavaScript​

Before react-native can execute JS code, _that code must be loaded into memory and parsed_. With a standard bundle if you load a 50mb bundle, all 50mb must be loaded and parsed before any of it can be executed. The optimization behind RAM bundles is that you can **load only the portion** of the 50mb **that you actually need at startup**, and _progressively load more of the bundle as those sections are needed_.

## Inline Requires​ 懒执行

Inline requires delay the requiring of a module or file until that file is actually needed. A basic example would look like this:

```ts
didPress = () => {
  if (VeryExpensive == null) {
    VeryExpensive = require("./VeryExpensive").default; // 按需加载
  }

  this.setState(() => ({
    needsExpensive: true,
  }));
};
```

Even without the RAM format, inline requires can lead to startup time improvements, because the code within `VeryExpensive.js` will only execute once **it is required for the first time**.

## Enable the RAM format

in file: `android/app/build.gradle`:

```js
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

## Configure Preloading and Inline Requires

Now that we have a RAM bundle, there is overhead for calling `require`. `require` now needs to send a message over the bridge when it encounters a module it has not loaded yet.

**This will impact startup the most**, because that is where the largest number of require calls are likely to take place while the app loads the initial module.

Luckily we can **configure a portion of the modules to be preloaded**. In order to do this, you will need to implement some form of inline require.

## Investigating the Loaded Modules

> 获取加载的模块信息

```js
const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
  .filter((moduleId) => modules[moduleId].isInitialized)
  .map((moduleId) => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
  .filter((moduleId) => !modules[moduleId].isInitialized)
  .map((moduleId) => modules[moduleId].verboseName);

// make sure that the modules you expect to be waiting are actually waiting
console.log(
  "loaded:",
  loadedModuleNames.length,
  "waiting:",
  waitingModuleNames.length
);

// grab this text blob, and put it in a file named packager/modulePaths.js
console.log(
  `module.exports = ${JSON.stringify(loadedModuleNames.sort(), null, 2)};`
);
```

When you run your app, you can look in the console and see how many modules have been loaded, and how many are waiting.

You may want to read the moduleNames and see if there are any surprises. Note that inline requires are invoked the first time the imports are referenced.

You may need to investigate and refactor to ensure only the modules you want are loaded on startup. Note that you can change the Systrace object on require to help debug problematic requires.

```js
require.Systrace.beginEvent = (message) => {
  if (message.includes(problematicModule)) {
    throw new Error();
  }
};
```

Every app is different, _but it may make sense to only load the modules you need for the very first screen_. When you are satisfied, put the output of the loadedModuleNames into a file named `packager/modulePaths.js`.

## Updating the metro.config.js

We now need to update `metro.config.js` in the root of the project to use our newly generated `modulePaths.js` file:

```js
const modulePaths = require("./packager/modulePaths");
const resolve = require("path").resolve;
const fs = require("fs");

// Update the following line if the root folder of your app is somewhere else.
const ROOT_FOLDER = resolve(__dirname, "..");

const config = {
  transformer: {
    getTransformOptions: () => {
      const moduleMap = {};
      modulePaths.forEach((path) => {
        if (fs.existsSync(path)) {
          moduleMap[resolve(path)] = true;
        }
      });
      return {
        preloadedModules: moduleMap, // indicates which modules should be marked as preloaded when building a RAM bundle. When the bundle is loaded, those modules are immediately loaded, before any requires have even executed
        transform: { inlineRequires: { blockList: moduleMap } }, // indicates that those modules should not be required inline. Because they are preloaded, there is no performance benefit from using an inline require.
      };
    },
  },
  projectRoot: ROOT_FOLDER,
};

module.exports = config;
```

## Test and Measure Improvements​

You should now be ready to build your app using the RAM format and inline requires. Make sure you measure the before and after startup times.
