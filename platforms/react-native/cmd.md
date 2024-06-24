# `ANDROID` 开发相关的 CMD

## ADB

`adb`（Android Debug Bridge）是 Android 开发中一个非常有用的命令行工具，它允许你与连接的 Android 设备或模拟器进行通信。以下是一些常用的 `adb` 命令：

1. **查看设备列表**：✨

   ```sh
   adb devices
   ```

2. **安装应用程序**：✨✨

   ```sh
   adb install 路径/到/应用.apk
   ```

3. **卸载应用程序**：

   ```sh
   adb uninstall 包名
   ```

4. **运行应用程序**：

   ```sh
   adb shell am start -n 包名/.活动名
   ```

5. **推送文件到设备**：✨

   ```sh
   adb push 本地路径 远程路径
   ```

6. **从设备拉取文件**：

   ```sh
   adb pull 远程路径 本地路径
   ```

7. **查看设备的文件系统**：

   ```sh
   adb shell
   ```

8. **查看设备的日志**：

   ```sh
   adb logcat
   ```

9. **清除应用数据和缓存**：

   ```sh
   adb shell pm clear 包名
   ```

10. **获取设备的屏幕截图**：

    ```sh
    adb shell screencap -p > 路径/屏幕截图.png
    ```

11. **录制设备的屏幕**：

    ```sh
    adb shell screenrecord --size 1080x1920 /sdcard/screenrecord.mp4
    ```

12. **重启设备**：

    ```sh
    adb reboot
    ```

13. **重启到恢复模式**：

    ```sh
    adb reboot recovery
    ```

14. **检查设备的内存使用情况**：

    ```sh
    adb shell dumpsys meminfo 包名
    ```

15. **查看设备的硬件信息**：

    ```sh
    adb shell getprop
    ```

16. **杀死特定的进程**：

    ```sh
    adb shell am kill 包名
    ```

17. **查看设备的网络状态**：

    ```sh
    adb shell ip addr
    ```

18. **设置设备的网络配置**：

    ```sh
    adb shell setprop net.dns1 <IP地址>
    ```

19. **获取设备的序列号**：

    ```sh
    adb shell getprop ro.serialno
    ```

20. **检查设备的 CPU 使用情况**：
    ```sh
    adb shell top
    ```

这些命令覆盖了设备管理、应用管理、文件传输、屏幕捕获、日志查看和系统信息查询等多个方面。使用 `adb` 命令时，确保你有足够的权限，并且设备已经通过 USB 调试模式连接到你的计算机。此外，某些命令可能需要 root 权限才能执行。

## emulator

```bash
# 启动模拟器
emulator.exe -avd Pixel_5_34
```

## sdkmanager

```sh
# windows 安装cmdline-tools
sdkmanager --sdk_root=C:\Users\liuts\Android\Sdk --channel=0 --install "cmdline-tools;latest"  --proxy=http  --proxy_host=127.0.0.1  --proxy_port=7890
```
