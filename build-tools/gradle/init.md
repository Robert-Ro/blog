## 起作用的 init.gradle 配置

```kotlin
// init.gradle.kts
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
    pluginManagement.repositories.enableMirror()
    // 6.8 及更高版本执行 DependencyResolutionManagement 配置
    if (gradle.gradleVersion >= "6.8") {
        val getDrm = settings.javaClass.getDeclaredMethod("getDependencyResolutionManagement")
        val drm = getDrm.invoke(settings)
        val getRepos = drm.javaClass.getDeclaredMethod("getRepositories")
        val repos = getRepos.invoke(drm) as RepositoryHandler
        repos.enableMirror()
        println("Gradle ${gradle.gradleVersion} DependencyResolutionManagement Configured $settings")
    } else {
        println("Gradle ${gradle.gradleVersion} DependencyResolutionManagement Ignored $settings")
    }
}
```

```groovy
// 存在问题
def repoConfig = {
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/public' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven { url 'https://maven.aliyun.com/repository/apache-snapshots' }
    maven { url 'https://mirrors.cernet.edu.cn/flutter/download.flutter.io' }
    mavenCentral()
    all {
        ArtifactRepository repo ->
            if (repo instanceof MavenArtifactRepository) {
                def url = repo.url.toString()
                if (url.contains('https://dl.google.com/dl/android/maven2/')) {
//                    println "(${repo.name} : ${repo.url}) replaced"
                    // 替换为阿里云的 Maven 镜像
//                     repo.setUrl('https://maven.aliyun.com/repository/central/') // no 7.3.0
//                     repo.setUrl('https://maven.aliyun.com/repository/google/') // no 8.3.1
                    //  repo.setUrl('https://maven.aliyun.com/repository/gradle-plugin/') // no 7.3.0
                    repo.setUrl('https://mirrors.cloud.tencent.com/nexus/repository/maven-public/') // no asm-commons-6.0.jar
//                     repo.setUrl('https://repo.huaweicloud.com/repository/maven/') // no 8.3.1.pom
                }else if (url.contains('https://plugins.gradle.org/m2/')){
//                    println "(${repo.name} : ${repo.url}) replaced"
                    repo.setUrl(' https://mirrors.tencent.com/nexus/repository/gradle-plugins/')
                }
            }
    }
}

// 现在新建的项目会在 settings.gradle就配置仓库，这个会比build.gradle先运行，添加下面的code 覆盖settings配置
settingsEvaluated { settings ->
        settings.pluginManagement {
            // Print repositories collection
            // println "Repositories names: " + repositories.getNames()
            // Clear repositories collection
            // repositories.clear()
            // Add my Artifactory mirror
            repositories repoConfig
            // Print repositories collection
            // println "Repositories names: " + repositories.getNames()
        }
        println "gradle version $gradle.gradleVersion"
        if ((gradle.gradleVersion <=> "6.8")>=0){
            // dependencyResolutionManagement enabled since gradle 6.8
            settings.dependencyResolutionManagement {
            // println "Repositories names: " + repositories.getNames()
            // repositories.clear()
            repositories repoConfig
            // println "Repositories names: " + repositories.getNames()
        }
    }
}


allprojects {
    buildscript {
        repositories repoConfig
    }
    repositories repoConfig
}



```

> 实际使用的，供参考
> // NOTE 不适合 gradle 8.x

```groovy
def repoConfig = {
    println("===============notice: use %gradle-user-home%/init.gradle=================")
    mavenLocal()
    // 并行查找依赖？
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/public' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven { url 'https://maven.aliyun.com/repository/apache-snapshots' }
    maven { url 'https://repo.huaweicloud.com/repository/maven/' }
    maven { url 'https://mirrors.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://mirrors.163.com/maven/repository/maven-public/' } // slow
    maven { url 'https://mirrors.tuna.tsinghua.edu.cn/git/flutter/download.flutter.io' }
    maven { url 'https://mirrors.cernet.edu.cn/flutter/download.flutter.io' }
    mavenCentral()
    all {
        ArtifactRepository repo ->
            if (repo instanceof MavenArtifactRepository) {
                def url = repo.url.toString()
                if (url.contains('https://dl.google.com/dl/android/maven2/')) {
                    repo.setUrl('https://mirrors.cloud.tencent.com/nexus/repository/maven-public/') //
                }else if (url.contains('https://plugins.gradle.org/m2/')){
                    repo.setUrl(' https://mirrors.tencent.com/nexus/repository/gradle-plugins/')
                }
            }
    }
}

// 现在新建的项目会在 settings.gradle就配置仓库，这个会比build.gradle先运行，添加下面的code 覆盖settings配置
settingsEvaluated { settings ->
        settings.pluginManagement {
             repositories.clear()
            repositories repoConfig
        }
        println "gradle version $gradle.gradleVersion"
        if ((gradle.gradleVersion <=> "6.8")>=0){
            // dependencyResolutionManagement enabled since gradle 6.8
            settings.dependencyResolutionManagement {
             repositories.clear()
            repositories repoConfig
        }
    }
}


allprojects {
    buildscript {
        repositories repoConfig
    }
    repositories repoConfig
}
```

## Reference

```groovy
// 多项目公用的全局gradle配置
def repoConfig = {
    all { ArtifactRepository repo ->
        if (repo instanceof MavenArtifactRepository) {
            def url = repo.url.toString()
            if (url.contains('repo1.maven.org/maven2') || url.contains('jcenter.bintray.com')) {
                println "gradle init: (${repo.name}: ${repo.url}) removed"
                remove repo
            }
        }
    }
    maven { url 'http://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
}


// 项目依赖仓库
allprojects {
    repositories {
        println "aliyun repositories"
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/central' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url "https://maven.aliyun.com/repository/jcenter" }
    }
    allprojects {
        println "aliyun allprojects ${project.name}"
        repositories {
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/central' }
            maven { url 'https://maven.aliyun.com/repository/public' }
            maven { url "https://maven.aliyun.com/repository/jcenter" }
        }
    }
}

// Gradle脚本依赖仓库
gradle.projectsLoaded {
    rootProject.buildscript {
        repositories {
            maven { url "https://maven.aliyun.com/repository/google" }
            maven { url "https://maven.aliyun.com/repository/jcenter" }
        }
    }
}

settingsEvaluated { settings ->
    println "aliyun pluginManagement"
    settings.pluginManagement {
        repositories {
            maven { url "https://maven.aliyun.com/repository/gradle-plugin" }
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/central' }
            maven { url 'https://maven.aliyun.com/repository/public' }
            maven { url "https://maven.aliyun.com/repository/jcenter" }
            gradlePluginPortal()
        }
    }
}

/**
会导致一个问题
A problem occurred configuring project ':gradle-plugin'.
> Could not resolve all files for configuration ':gradle-plugin:classpath'.
   > Could not find kotlin-util-klib-1.7.22.jar (org.jetbrains.kotlin:kotlin-util-klib:1.7.22).
     Searched in the following locations:
         https://maven.aliyun.com/repository/jcenter/org/jetbrains/kotlin/kotlin-util-klib/1.7.22/kotlin-util-klib-1.7.22.jar
   > Could not find kotlin-annotation-processing-gradle-1.7.22.jar (org.jetbrains.kotlin:kotlin-annotation-processing-gradle:1.7.22).
     Searched in the following locations:
         https://maven.aliyun.com/repository/jcenter/org/jetbrains/kotlin/kotlin-annotation-processing-gradle/1.7.22/kotlin-annotation-processing-gradle-1.7.22.jar
   > Could not find kotlin-build-common-1.7.22.jar (org.jetbrains.kotlin:kotlin-build-common:1.7.22).
     Searched in the following locations:
         https://maven.aliyun.com/repository/jcenter/org/jetbrains/kotlin/kotlin-build-common/1.7.22/kotlin-build-common-1.7.22.jar


*/
```

```groovy

gradle.projectsEvaluated {
    allprojects {
            configurations.configureEach {
                resolutionStrategy.eachDependency { details ->
                    println details.requested.name
                    if (details.requested instanceof ModuleVersionSelector) {
                        def configName = it.name
                        println "Configuration: $configName"
                        println "Dependency: ${details.requested.group}:${details.requested.name}:${details.requested.version}"
                    }
                }
            }
            repositories.each {
                  if (it != null) {
                        if( it instanceof DefaultFlatDirArtifactRepository){
                            println "Repository: ${it.name}, dir: ${it.dirs}"
                        }else{
                            println "Repository: ${it.name}, url: ${it.url}"
                        }
                  }

        }
    }
}
```

## 测试项目中的仓库

```groovy
tasks.register('showRepos') {
    def repositoryNames = repositories.collect { it.name }
    doLast {
        println "All repos:"
        println repositoryNames
    }
}
```

## Resources

- [init_scripts](https://docs.gradle.org/current/userguide/init_scripts.html)
- [Gradle - Initialization Scripts](https://www.hi-cat.cn/11958)
