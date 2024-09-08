# Android 开发中 Gradle 使用详解

## 基本概念

- `Project`：Gradle 构建的基本单位，通常对应一个工程。
- `Task`：Gradle 构建的操作单位，用于执行具体的构建任务，如编译、打包等。
- `Build Script`：Gradle 构建脚本，使用 `Groovy` 或 `Kotlin` DSL 编写，用于配置构建过程。
- `Plugin`：Gradle 插件，用于扩展构建功能和简化构建配置。

## 配置构建脚本

在 Android 项目中，通常有两个 Gradle 构建脚本：`build.gradle`（项目级）和 `build.gradle`（模块级）。

### 项目级构建脚本

项目级 `build.gradle` 文件主要用于配置整个项目的构建设置。以下是一个典型的项目级构建脚本：

```groovy

// 配置构建脚本的依赖，如 Android Gradle 插件
buildscript {
    // 配置依赖库的仓库，如 Google Maven 仓库和 JCenter 仓库。
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.0'
    }
}
// 配置所有子项目（模块）的设置，这些设置将应用于所有子项目
allprojects {
    repositories {
        google()
        jcenter()
    }
}
// 定义自定义任务，如 clean 任务用于删除项目的构建输出
task clean(type: Delete) {
    delete rootProject.buildDir
}

```

### 模块级构建脚本

模块级 `build.gradle` 文件主要用于配置模块的构建设置。以下是一个典型的模块级构建脚本：

```groovy
// 应用 Android Gradle 插件
apply plugin: 'com.android.application'
// 配置 Android 构建设置，如 SDK 版本、应用 ID、版本号等
android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"
    // 配置默认的构建变体设置
    defaultConfig {
        applicationId "com.example.xxx"
        minSdkVersion 21
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    // 配置不同的构建类型，如 debug 和 release
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
// 配置模块的依赖库
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.2.1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
}

```

### 自定义构建变体和应用 `flavorDimensions`

在 Android 项目中，你可以使用 Gradle 自定义构建变体（如 `debug`、`release` 等）。`flavorDimensions` 的作用是为构建变体提供分组维度，使得你可以更灵活地管理和生成不同版本的应用。以下是如何自定义构建变体并应用`flavorDimensions`:

```groovy
android {
    // ...

    // 定义构建变体的维度，例如这里定义了一个 "tier" 维度
    flavorDimensions "tier"

    // 根据 flavorDimensions 定义不同的产品风味，如 free 和 pro
    productFlavors {
        free {
            dimension "tier"
            applicationIdSuffix ".free"
            versionNameSuffix "-free"
        }

        pro {
            dimension "tier"
            applicationIdSuffix ".pro"
            versionNameSuffix "-pro"
        }
    }

    // 配置不同的构建类型，如 debug 和 release
    buildTypes {
        debug {
            applicationIdSuffix ".debug"
            versionNameSuffix "-debug"
        }

        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

```

通过自定义构建变体并应用 `flavorDimensions`，你可以实现以下目标：

- 将产品风味分组到不同的维度中，以便在构建过程中组合不同维度的产品风味。这样，你可以轻松地为不同的市场、设备类型或功能配置生成不同的应用版本。
- 为不同的产品风味和构建类型生成不同的 APK 文件。例如，你可以生成 `free-debug`、`free-release`、`pro-debug` 和 `pro-release` 四种变体的 APK 文件。
- 每个产品风味可以配置不同的设置，如**应用 ID 后缀**、**版本名后缀**等。这些产品风味将根据 `flavorDimensions` 中定义的维度进行组合，生成不同版本的应用。

```groovy
android {
    // 针对手机和平板电脑分别进行适配
    flavorDimensions "version", "device"

    productFlavors {
        free {
            dimension "version"
            // ... 其他配置 ...
        }

        pro {
            dimension "version"
            // ... 其他配置 ...
        }

        phone {
            dimension "device"
            // ... 其他配置 ...
        }

        tablet {
            dimension "device"
            // ... 其他配置 ...
        }
    }
}

```

## 多模块项目

在大型 Android 项目中，通常需要将项目拆分为多个模块以提高代码的**可维护性**和**可重用性**。以下是如何使用 Gradle 配置多模块项目：

### 创建模块

在 Android Studio 中，你可以通过 `File` > `New` > `New Module` 菜单创建新的模块。

### 配置模块依赖

在主模块的 `build.gradle` 文件中，添加对子模块的依赖：

```groovy
dependencies {
    implementation project(':library-module')
}

```

## 使用 Gradle 命令

### 常用 Gradle 命令

你可以使用 Gradle 命令来执行构建任务，如编译、打包、安装、运行等。以下是一些常用的 Gradle 命令：

- `./gradlew tasks`：列出所有可用的任务。
- `./gradlew assemble`：编译并打包所有构建变体的 APK 文件。
- `./gradlew assembleDebug`：编译并打包 debug 构建变体的 APK 文件。
- `./gradlew installDebug`：编译、打包并安装 debug 构建变体的 APK 文件。
- `./gradlew clean`：清除项目的构建输出。

### Android Gradle 插件中主要任务的作用和实现

Android Gradle 插件是一个强大的构建工具，它为 Android 项目提供了许多预定义的任务（Task）。这些任务负责处理构建过程中的各个阶段，例如资源处理、编译、打包和签名等。以下是一些 Android Gradle 插件中主要任务的作用和实现：

- `preBuild`：这是一个预构建任务，用于在构建过程开始之前执行一些准备工作。可以在此任务中添加自定义的初始化操作。

- `assemble`：这是一个汇总任务，用于触发所有构建变体（Build Variant）的 assemble 任务。例如，如果你的项目有 debug 和 release 两个构建变体，那么执行 assemble 任务将会触发 assembleDebug 和 assembleRelease 任务。

- `assembleDebug` 和 `assembleRelease`：这些任务负责构建特定构建变体（debug 或 release）的 APK 文件。在这些任务中，Gradle 插件会执行资源处理、编译、打包和签名等操作。

- `check`：这是一个汇总任务，用于触发所有构建变体的 check 任务。例如，如果你的项目有 debug 和 release 两个构建变体，那么执行 check 任务将会触发 checkDebug 和 checkRelease 任务。这些任务执行代码检查、静态分析和单元测试等操作。

- `clean`：这个任务用于清理构建目录，删除生成的文件和缓存。执行 clean 任务后，项目将恢复到初始状态，可以重新开始构建过程。

- `compileDebugJavaWithJavac` 和 `compileReleaseJavaWithJavac`：这些任务负责编译特定构建变体的 Java 源代码。在这些任务中，Gradle 插件会使用 Java 编译器（如 javac）将 Java 源代码编译成字节码文件（.class 文件）。

- `mergeDebugResources` 和 `mergeReleaseResources`：这些任务负责合并特定构建变体的资源文件（如图片、布局和字符串等）。在这些任务中，Gradle 插件会处理资源冲突、合并资源文件，并生成 R.java 文件，以便在代码中引用资源。

- `processDebugManifest` 和 `processReleaseManifest`：这些任务负责处理特定构建变体的 `AndroidManifest.xml` 文件。在这些任务中，Gradle 插件会合并各个模块的 `AndroidManifest.xml` 文件、处理清单占位符（manifest placeholders）并生成最终的 `AndroidManifest.xml` 文件。

- `dexDebug` 和 `dexRelease`：这些任务负责将特定构建变体的 `Java` 字节码文件转换成 `Dalvik` 字节码文件（`.dex` 文件）。在这些任务中，Gradle 插件会使用 D8 或 DX 工具将 `.class` 文件转换成 `.dex` 文件，以便在 Android 设备上运行。

- `packageDebug` 和 `packageRelease`：这些任务负责将特定构建变体的资源、代码和清单文件打包成 APK 文件。在这些任务中，Gradle 插件会使用 `AAPT2` 工具将文件打包成 APK，然后对 APK 进行签名。

- `installDebug` 和 `installRelease`：这些任务负责将特定构建变体的 APK 文件安装到连接的 Android 设备或模拟器上。在这些任务中，Gradle 插件会使用 adb 工具将 APK 文件安装到设备上。

这些任务只是 Android Gradle 插件中的一部分，实际上还有更多的任务用于处理不同的构建阶段。你可以在 Android 项目的构建过程中自定义这些任务，以实现特定的构建需求。

## 使用 Gradle 插件

### 使用 Gradle 插件的基本方法

Gradle 提供了丰富的插件生态，你可以使用这些插件来扩展构建功能和简化构建配置。以下是如何使用 Gradle 插件：

1. 在项目级 `build.gradle` 文件中，添加插件的依赖：

```groovy
buildscript {
    dependencies {
        classpath 'com.example:my-gradle-plugin:1.0.0'
    }
}
```

2. 在模块级 `build.gradle` 文件中，应用插件：

```groovy
apply plugin: 'com.example.my-gradle-plugin'
```

3. 根据插件的文档，配置插件的设置和任务。

### 如何实现一个 Gradle 插件

在模块的 `build.gradle` 文件中，添加 Gradle 插件开发所需的依赖:

```groovy
apply plugin: 'groovy'
apply plugin: 'maven'

dependencies {
    implementation gradleApi()
    implementation localGroovy()
}

```

接下来，创建一个继承自 `Plugin<Project>` 的类，实现 apply 方法：

```groovy
import org.gradle.api.Plugin;
import org.gradle.api.Project;

public class MyGradlePlugin implements Plugin<Project> {
    @Override
    public void apply(Project project) {
        // 在这里配置项目、添加任务和操作 Android 构建流程
    }
}

```

在 `apply` 方法中，你可以访问 `Project` 对象，从而操作构建流程。例如，你可以添加一个自定义的任务：

```groovy
import org.gradle.api.DefaultTask;
import org.gradle.api.tasks.TaskAction;

public class MyCustomTask extends DefaultTask {
    @TaskAction
    public void perform() {
        System.out.println("Hello from MyCustomTask!");
    }
}

```

然后，在 `apply` 方法中注册这个任务：

```groovy
public void apply(Project project) {
    project.getTasks().create("myCustomTask", MyCustomTask.class);
}

```

最后，将你的 Gradle 插件发布到本地或远程仓库，然后在 Android 项目的 `build.gradle` 文件中应用它：

```groovy
buildscript {
    repositories {
        mavenLocal() // 或其他仓库
    }
    dependencies {
        classpath 'com.example:my-gradle-plugin:1.0.0' // 替换为实际插件的 groupId、artifactId 和版本
    }
}

apply plugin: 'com.example.mygradleplugin'

```

现在，当你运行 Android 项目的构建时，你的 Gradle 插件会在构建流程中添加自定义功能。你可以根据实际需求修改插件的实现，以实现所需的功能。

### 如何在 Android 构建流程中添加自定义功能 ✨✨✨

要在 Android 构建流程中添加自定义功能，你需要访问 Android Gradle 插件提供的扩展和任务。首先，在 build.gradle 文件中添加 Android Gradle 插件的依赖：

```groovy
dependencies {
    implementation gradleApi()
    implementation localGroovy()
    implementation 'com.android.tools.build:gradle:4.2.2' // 替换为实际使用的版本
}

```

接下来，在 `apply` 方法中访问 Android 扩展和任务：

```groovy
import com.android.build.gradle.AppExtension;
import org.gradle.api.DomainObjectSet;
import org.gradle.api.plugins.ExtensionContainer;
import org.gradle.api.tasks.TaskContainer;

public void apply(Project project) {
    // 访问 Android 扩展
    ExtensionContainer extensions = project.getExtensions();
    AppExtension android = extensions.getByType(AppExtension.class);

    // 访问 Android 任务
    TaskContainer tasks = project.getTasks();
    DomainObjectSet<BaseVariant> applicationVariants = android.getApplicationVariants();
    applicationVariants.all(variant -> {
        // 在这里操作 variant 对象，例如添加自定义任务
    });
}

```

在这个示例中，我们访问了 Android 扩展，以及每个构建变体（build variant）的任务。你可以在这里添加自定义任务，或者修改现有任务的行为。

## Gradle 和 Maven 仓库

`Gradle` 是一个构建工具，用于自动化项目构建、依赖管理和发布等任务。`Maven` 是一个项目管理工具，同时也是一个常用的依赖库仓库。`Gradle` 可以与 `Maven` 仓库进行交互，以便下载和管理项目所需的依赖库。

### 使用 Gradle 配置 Maven 仓库

以下是 Gradle 如何与 Maven 仓库进行交互的主要步骤：

1. 配置仓库：在 Gradle 构建脚本（`build.gradle`）中，你需要指定 Maven 仓库的位置。这可以是一个公共仓库（如 Maven Central、JCenter 等）或私有仓库。例如，要添加 Maven Central 仓库，可以在项目级别的 `build.gradle` 文件中添加以下内容：

```groovy
allprojects {
    repositories {
        mavenCentral()
    }
}

```

2. 声明依赖：在模块级别的 `build.gradle` 文件中，你需要声明项目所需的依赖库。Gradle 会根据这些声明从配置的 Maven 仓库中下载相应的依赖库。例如，要添加一个名为 `com.example.library:library-name:1.0.0` 的依赖库，可以在 `build.gradle` 文件中添加以下内容：

```groovy
dependencies {
    implementation 'com.example.library:library-name:1.0.0'
}

```

3. 解析依赖：当你运行 Gradle 构建任务时，Gradle 会解析项目中声明的所有依赖库。这包括检查依赖库的版本、下载依赖库以及处理潜在的依赖冲突。

4. 下载依赖：Gradle 会从配置的 Maven 仓库中下载所需的依赖库，并将它们缓存到本地。这样，在以后的构建过程中，Gradle 可以直接从本地缓存加载这些依赖库，而无需再次从 Maven 仓库下载。

5. 构建项目：Gradle 根据项目配置和下载的依赖库执行构建任务，如编译、打包、测试等。在这个过程中，Gradle 会自动处理依赖库之间的关系，确保项目正确地链接到所需的库。

总之，Gradle 通过在构建脚本中配置 Maven 仓库和声明依赖库，与 Maven 仓库进行交互。在构建过程中，Gradle 会自动解析、下载和管理这些依赖库，确保项目正确地构建和运行。

### 如何依赖和发布本地 Maven 仓库

要在 Gradle 中依赖本地 Maven 仓库并发布项目到本地 Maven 仓库，你可以按照以下步骤操作：

1. 依赖本地 Maven 仓库

在项目级别的 `build.gradle` 文件中，添加本地 Maven 仓库的配置。本地 Maven 仓库默认位于用户主目录下的 `.m2/repository` 文件夹。以下是配置示例：

```groovy
allprojects {
    repositories {
        mavenLocal()
        // 如果需要，可以添加其他仓库，例如 Maven Central 或 JCenter
        mavenCentral()
    }
}

```

2. 发布项目到本地 Maven 仓库
   要将项目发布到本地 Maven 仓库，你需要在项目的 `build.gradle` 文件中应用 `maven-publish` 插件并配置发布任务。以下是配置示例：

首先，在模块级别的 `build.gradle` 文件中，应用 `maven-publish` 插件：

```groovy
apply plugin: 'maven-publish'

```

接下来，配置发布任务。确保指定项目的 groupId、artifactId 和 version：

```groovy
publishing {
    publications {
        maven(MavenPublication) {
            // 根据实际情况修改这些值
            groupId 'com.example'
            artifactId 'library-name'
            version '1.0.0'

            // 如果项目是一个 Android 库，添加以下内容
            from components.release
        }
    }
}

```

完成这些配置后，你可以运行以下命令将项目发布到本地 Maven 仓库：

```shell
./gradlew publishToMavenLocal

```

命令执行成功后，项目将被发布到本地 Maven 仓库（默认位于用户主目录下的 `.m2/repository` 文件夹）。
现在，你可以在其他项目中使用本地 Maven 仓库中的依赖库。只需在项目的 `build.gradle` 文件中添加对应的依赖项，例如：

```groovy
dependencies {
    implementation 'com.example:library-name:1.0.0'
}
```

这样，你便可以在项目中使用本地 Maven 仓库中的依赖库，并将项目发布到本地 Maven 仓库。

## Resources

- https://juejin.cn/post/7352079364611260435
