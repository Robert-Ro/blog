# Throublesshoot

## Failed to connect to gitlab.mapleimage.com port 80 after 6 ms: Couldn't connect to server

docker executor 无法访问，但是 windows shell 没有问题
解决方法：

- gitlab runner 新增配置：
  ```bash
    [runners.docker]
      network_mode = "host" # 使用宿主机的网络栈
  ```

## gitlab runer 的选择
