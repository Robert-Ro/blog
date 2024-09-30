# proxy 相关

## 使用系统代理

```groovy
// ~/.gradle/gradle.properties
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=8888
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=8888
```

## 使用`init.gradle`替换`google()`等仓库

```kotlin
// ~/.gradle/init.gradle.kts
fun RepositoryHandler.enableMirror() {
    all {
        if (this is MavenArtifactRepository) {
            val originalUrl = this.url.toString().removeSuffix("/")
            urlMappings[originalUrl]?.let {
                logger.lifecycle("Repository[$url] is mirrored to $it")
                this.setUrl(it)
            }
        }
    }
}

val urlMappings = mapOf(
    "https://repo.maven.apache.org/maven2" to "https://mirrors.tencent.com/nexus/repository/maven-public/",
    "https://dl.google.com/dl/android/maven2" to "https://mirrors.tencent.com/nexus/repository/maven-public/",
    "https://plugins.gradle.org/m2" to "https://mirrors.tencent.com/nexus/repository/gradle-plugins/"
)

gradle.allprojects {
    buildscript {
        repositories.enableMirror()
    }
    repositories.enableMirror()
}

gradle.beforeSettings {
// NOTE 区分gradle版本？8.x的好像不兼容？
    pluginManagement.repositories.enableMirror()
    dependencyResolutionManagement.repositories.enableMirror()
}
```

### flutter 的镜像仓库设置

```groovy
// android/build.gradle
allprojects {
    repositories {
        maven { url 'https://mirrors.163.com/maven/repository/maven-public/' }
        maven { url 'https://repo.huaweicloud.com/repository/maven/' }
        maven { url 'https://mirrors.tencent.com/nexus/repository/maven-public/' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        maven { url 'https://mirrors.tuna.tsinghua.edu.cn/git/flutter/download.flutter.io' }
    }
}
```
