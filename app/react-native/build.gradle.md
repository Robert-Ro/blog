# RN 相关的 `build.gradle` 配置项

The `react.gradle` file registers a task for each `build variant` (e.g. `bundleDebugJsAndAssets`
and `bundleReleaseJsAndAssets`).
These basically call `react-native bundle` with the correct arguments during the Android build
cycle. By default, `bundleDebugJsAndAssets` is skipped, as in `debug/dev` mode we prefer to _load the
bundle directly from the development server_. Below you can see all the possible configurations
and their defaults. If you decide to add a configuration block, make sure to add it before the
`apply from: "../../node_modules/react-native/react.gradle"` line.

## all the possible configurations and their defaults

`project.ext.react` = [

- **bundleAssetName**: `"index.android.bundle"`: the name of the generated asset file containing your JS bundle, 最终打包出的文件

- **entryFile**: `"index.android.js"`,
  the entry file for bundle generation. If none specified and
  `"index.android.js"` exists, it will be used. Otherwise `"index.js"` is
  default. Can be overridden with `ENTRY_FILE` environment variable.

- **bundleCommand**: `"ram-bundle"`, 参考：[enable-the-ram-format](https://reactnative.dev/docs/performance#enable-the-ram-format)

- **bundleInDebug**: `false`, whether to bundle JS and assets in debug mode

- **bundleInRelease**: `true`, whether to bundle JS and assets in release mode

  // whether to bundle JS and assets in another build variant (if configured).
  // See http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Build-Variants
  // The configuration property can be in the following formats

  - 'bundleIn${productFlavor}${buildType}'
  - 'bundleIn${buildType}'
  - bundleInFreeDebug: true,
  - bundleInPaidRelease: true,
  - bundleInBeta: true,

  // whether to disable dev mode in custom build variants (by default only disabled in release)
  // for example: to disable dev mode in the staging build type (if configured)
  devDisabledInStaging: true,
  // The configuration property can be in the following formats

  - `devDisabledIn${productFlavor}${buildType}'`
  - `'devDisabledIn${buildType}'`

- **root**: "../../" the root of your project, i.e. where `"package.json"` lives

  // where to put the JS bundle asset in debug mode

- **jsBundleDirDebug**: "$buildDir/intermediates/assets/debug",

  // where to put the JS bundle asset in release mode

- **jsBundleDirRelease**: "$buildDir/intermediates/assets/release",

  // where to put drawable resources / React Native assets, e.g. the ones you use via
  // require('./image.png')), in debug mode

- **resourcesDirDebug**: "$buildDir/intermediates/res/merged/debug",

  // where to put drawable resources / React Native assets, e.g. the ones you use via
  // require('./image.png')), in release mode

- **resourcesDirRelease**: "$buildDir/intermediates/res/merged/release",

  // by default the gradle tasks are skipped if none of the JS files or assets change; this means
  // that we don't look at files in android/ or ios/ to determine whether the tasks are up to
  // date; if you have any other folders that you want to ignore for performance reasons (gradle
  // indexes the entire tree), add them here. Alternatively, if you have JS files in android/
  // for example, you might want to remove it from here.

- **inputExcludes**: ["android/", "ios/"],

  // override which node gets called and with what additional arguments

- **nodeExecutableAndArgs**: ["node"],

  // supply additional arguments to the packager

- **extraPackagerArgs**: []
  ]

## misc

- `enableSeparateBuildPerCPUArchitecture`:
  Set this to true to create two separate APKs instead of one:

  - An APK that only works on ARM devices
  - An APK that only works on x86 devices

  The advantage is the size of the APK is reduced by about 4MB.
  Upload all the APKs to the Play Store and people will download
  the correct one based on the CPU architecture of their device.
- `enableProguardInReleaseBuilds`: Run Proguard to shrink the Java bytecode in release builds.
- `def jscFlavor = 'org.webkit:android-jsc:+'`: The preferred build flavor of JavaScriptCore
- `def enableHermes = project.ext.react.get("enableHermes", false);`: Whether to enable the Hermes VM.
- `def nativeArchitectures = project.getProperties().get("reactNativeDebugArchitectures")`: Architectures to build native code for in debug.