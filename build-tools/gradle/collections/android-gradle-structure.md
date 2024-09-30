A multi-module project has **one main module** and many submodules. It has this layout:

```shell
(root)
  +- settings.gradle
  +- build.gradle          # optional (commonly present)
  +- gradle.properties     # optional
  +-- buildSrc/            # optional
  |     +- build.gradle
  |     +-- src/...
  +-- build-conventions/   # optional
  |     +- settings.gradle # empty
  |     +- build.gradle
  |     +-- src/
  |           +-- myconvention.gradle
  +-- my-gradle-stuff/     # optional
  |     +- utils.gradle    # optional
  +-- sub-a/
  |     +- build.gradle
  |     +- src/
  +-- sub-b/
        +- build.gradle
        +- src/
```

submodules can also be located deeper in subfolders, but without modifying code in settings.gradle, their name will include the name of such folders.

## `settings.gradle`

The main role of `settings.gradle` is to define all included submodules and to mark the directory root of a tree of modules, so you can only have one `settings.gradle` file in a multi-module project.

```groovy
rootProject.name = 'project-x'

include 'sub-a', 'sub-b'
```

The settings file is also written in groovy, and submodule lookup can be customized.

## `build.gradle`

There is one such file per module, it contains the build logic for this module.

In the `build.gradle` file of the **main module**, you can use `allprojects {}` or `subprojects {}` to define settings for all other modules.

In the `build.gradle` file of the submodules, you can use compile `project(':sub-a')` to make one submodule depend on the other.

## gradle.properties

This is optional, its main purpose is to provide startup options to use for running gradle itself, e.g.

```conf
org.gradle.jvmargs=-Xmx=... -Dfile.encoding=UTF-8 ...
org.gradle.configureondemand=true
```

These values can be overridden by a file `USER_HOME/.gradle/gradle.properties`, and overridden by gradle command line arguments. Also it is possible to set environment variables for the build in this file using `systemProp.` as prefix.

Any property in this file can be used in any `build.gradle`, so some projects also put dependency version or release information in gradle.properties, but that is likely an abuse of this file.

## my-gradle-stuff/utils.gradle

(Any name of folder or file is possible.) You can define additional custom gradle files to reuse definitions, and include them in other gradle files via

```groovy
apply from: "$rootDir/gradle/utils.gradle"
```

other places to put this might be `src/gradle` or `src/build/gradle`

## `buildSrc/...`

This folder is special, it is like a separate gradle project in itself. It is built before doing anything else, and can provide function to use in any other gradle file. Because of technical reasons, IDE support for references to this folder work much better than any other way of extracting common code from multiple build.gradle files to a separate location.

You can define complex custom build logic in java, groovy or kotlin, instead of writing and deploying a plugin. This is also useful for unit-testing your custom build code, as you can have unit tests. The source folder structure in buildSrc can be adapted like for any java/groovy/kotlin project.

## `build-conventions/...`

This element is optional and used as a replacement for buildSrc when the logic to be shared is simple, like version numbers, and should not necessarily trigger a full rebuild of a large project for just changing one version of one dependency. The name of this directory is arbitrary, it needs however to be included in the root settings.gradle like this: includeBuild 'build-conventions', and it's build.gradle should have plugins {id("groovy-gradle-plugin")}.

this then allows to extract build logic in .gradle files that can simply be included in other modules like this plugins {id("myconvention")}.

This can also be combined with the buildSrc folder.
