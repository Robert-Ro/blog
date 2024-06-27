```groovy
    splits {
        // Configures multiple APKs based on ABI.
        abi {
            // Enables building multiple APKs per ABI.
            enable true
            // By default all ABIs are included, so use reset() and include to specify that you only
            // want APKs for x86 and x86_64.
            // Resets the list of ABIs for Gradle to create APKs for to none.
            reset()
            // Specifies a list of ABIs for Gradle to create APKs for.
            include "armeabi-v7a","arm64-v8a" // -> 关键
            // Specifies that you don't want to also generate a universal APK that includes all ABIs.
            universalApk false
        }
    }
```

打包命令：

```bash
./gradlew tasks # 查看任务
./gradlew assemble # 全产物输出含debug/release包
# arm64-v8a/armeabi-v7a
./gradlew assemble -PreactNativeArchitectures=arm64-v8a
# 指定架构
./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a
# 输出arm64-v8a/armeabi-v7a两种release包
./gradlew assembleRelease
```

## CPU 架构

- arm64-v8a 是 64 位架构，提供了更多的寄存器和更大的内存寻址空间。
- armeabi-v7a 是 32 位架构，兼容性更广，但内存寻址空间和性能相对较低。
