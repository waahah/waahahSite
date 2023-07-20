---
title: 测试十六、Airtest封装Anoroid常用的ADB操作
date: 2023-01-24 14:58:36
tags: [Android, Airtest, Poco, Test, ADB]
categories: [Coding, 测试]
---

十六、Airtest封装Anoroid常用的ADB操作[¶](about:blank#airtestadb "Permanent link")
=============================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

`ADB`，即 `Android Debug Bridge` （安卓调试桥）。它就是一个命令行窗口，用于通过电脑端与模拟器或者真机设备进行交互。

对于Android开发和测试人员来说，它都是不可替代的强大工具。所以今天，我们将跟同学们一起来聊一聊一些常用的ADB操作和Airtest给我们封装好的一些ADB接口。

2\. 一些使用ADB命令的场景[¶](about:blank#2-adb "Permanent link")
-------------------------------------------------------

作为一名测试人员，相信大家对使用ADB的场景都不陌生了。比如在做真机或者模拟器测试之前，我们常用 `adb devices` 命令去查看被测设备是否已经跟我们的电脑建立了连接：

```shell
>>> adb devices
List of devices attached
PFT4PBLF75GQHYBM        device
emulator-5554   device

```

再比如，我们在使用Airtest进行测试自动化时，经常遇到ADB版本冲突的报错：

```bash
raise AdbError(stdout, stderr)
airtest.core.error.AdbError: stdout[] stderr[adb server version (36) doesn't match this client (40); killing...
could not read ok from ADB Server

```

而我们不清楚电脑里面那么多ADB，究竟哪些是40版本，哪些是36版本时，我们就可以使用 `adb version` 查看当前的ADB版本，然后将电脑里面所有的ADB替换成同一个版本，从而解决这个版本冲突的问题：

```bash
>>> adb version
Android Debug Bridge version 1.0.40
Version 4986621
Installed as C:\Users\xiaojuan\adb.exe

```

3\. 常用的ADB操作及使用示例[¶](about:blank#3-adb "Permanent link")
--------------------------------------------------------

当然，除了上面已经提到的查询已连接的设备/模拟器命令 `adb devices`， 和查看ADB版本的命令`adb version` ，ADB操作可以做的事情还非常多：

#### 1）应用管理[¶](about:blank#1_1 "Permanent link")

① 查看应用列表

```bash
# 查看设备上的所有应用
adb shell pm list packages

# 查看设备上的第三方应用
adb shell pm list packages -3

# 查看设备上的系统应用
adb shell pm list packages -s

```

② 安装APK

```shell
adb install "D:/demo/tutorial-blackjack-release-signed.apk"

```

③ 卸载应用

```shell
adb uninstall com.netease.cloudmusic

```

④ 查看应用详细信息

```shell
adb shell dumpsys package com.netease.cloudmusic

```

#### 2）文件管理[¶](about:blank#2 "Permanent link")

① 复制设备里的文件到电脑

```bash
# adb pull <设备里的文件路径> [电脑上的目录]
adb pull /sdcard/sr.mp4 ~/tmp/

```

② 复制电脑里的文件到设备

```bash
# adb push <电脑上的文件路径> <设备里的目录>
adb push ~/sr.mp4 /sdcard/

```

#### 3）模拟按键输入[¶](about:blank#3 "Permanent link")

① 模拟电源键： `adb shell input keyevent 26`

② 模拟HOME键： `adb shell input keyevent 3`

③ 模拟返回键： `adb shell input keyevent 4`

④ 点亮/熄灭屏幕：

```bash
# 点亮屏幕
adb shell input keyevent 224

# 熄灭屏幕
adb shell input keyevent 223

```

⑤ 模拟滑动解锁

```bash
# 300 1000 300 500 分别表示起始点x坐标 起始点y坐标 结束点x坐标 结束点y坐标
adb shell input swipe 300 1000 300 500

```

⑥ 输入文本

```bash
adb shell input text airtest

```

#### 4）查看设备信息[¶](about:blank#4 "Permanent link")

① 查看设备型号

```bash
>>> adb -s PFT4PBLF75GQHYBM shell getprop ro.product.model
OPPO A83

```

② 查看屏幕分辨率

```bash
>>> adb -s PFT4PBLF75GQHYBM shell wm size
Physical size: 720x1440

```

③ 查看Android系统版本

```bash
>>> adb -s PFT4PBLF75GQHYBM shell getprop ro.build.version.release
7.1.1

```

#### 5）更多ADB命令详解[¶](about:blank#5adb "Permanent link")

想了解更多详细的ADB操作的同学，我们推荐大家阅读这篇GitHub文档：https://github.com/mzlogin/awesome-adb 。

4\. Airtest封装好的ADB接口及使用示例[¶](about:blank#4-airtestadb "Permanent link")
-----------------------------------------------------------------------

在Airtest库中，大部分的ADB操作我们已经帮大家封装好了，所以同学们可以不用再单独去执行ADB命令。

举个简单的例子，利用Airtest封装好的ADB接口打印设备序列号和设备所有的第三方应用：

![](https://s2.loli.net/2023/07/10/QfbzAGKYktsr8RN.png)

可以看到，我们只需要调用一些封装好的airtest接口，即可替代完整的ADB命令，另外在log查看窗的运行日志中，我们还可以看到这个接口实际执行的ADB命令：

```python
# android.get_default_device()对应的ADB命令
adb.exe devices

# android.list_app(third_only=True)对应的ADB命令
adb.exe -s PFT4PBLF75GQHYBM shell pm list packages -3

```

另外Airtest还有很多常用的封装好的ADB接口：

#### 1）返回应用的完整路径：path\_app()[¶](about:blank#1path_app "Permanent link")

```python
android = Android()
android.path_app("com.netease.cloudmusic")

```

#### 2）检查应用是否存在于当前设备上：check\_app()[¶](about:blank#2check_app "Permanent link")

```python
android = Android()
android.check_app("com.netease.cloudmusic")

```

#### 3）停止应用运行：stop\_app()[¶](about:blank#3stop_app "Permanent link")

```python
stop_app("com.netease.cloudmusic")

# 启动应用:start_app()
start_app("com.netease.cloudmusic")

# 清除应用数据：clear_app()
clear_app("com.netease.cloudmusic")

```

#### 4）安装应用：install\_app()[¶](about:blank#4install_app "Permanent link")

```python
install(r"D:\demo\tutorial-blackjack-release-signed.apk")

# 卸载应用：uninstall_app()
uninstall("org.cocos2dx.javascript")

```

#### 5）关键词操作：keyevent()[¶](about:blank#5keyevent "Permanent link")

```python
keyevent("HOME")
keyevent("POWER")

```

#### 6）唤醒设备：wake()[¶](about:blank#6wake "Permanent link")

```python
wake()

```

#### 7）返回HOME：home()[¶](about:blank#7homehome "Permanent link")

```python
home()

```

#### 8）文本输入：text()[¶](about:blank#8text "Permanent link")

```python
text("123")

```

#### 9）检查屏幕是否打开：is\_screenon()[¶](about:blank#9is_screenon "Permanent link")

```python
android = Android()
android.is_screenon()

```

#### 10）检查设备是否锁定：is\_locked()[¶](about:blank#10is_locked "Permanent link")

```python
android = Android()
android.is_locked()

```

#### 11）获取当前设备的分辨率：get\_current\_resolution()[¶](about:blank#11get_current_resolution "Permanent link")

```python
android = Android()
android.get_current_resolution()

```

#### 12）其它adb shell命令：shell()[¶](about:blank#12adb-shellshell "Permanent link")

```python
shell("ls")
shell("pm list packages -3")

```

![packages-1.png](https://s2.loli.net/2023/07/10/gqpBtO8CLnA5z6b.png)

实际上，airtest的 `shell()` ，就是帮忙补充了 `adb -s 手机序列号 shell` 这一部分，后面的内容同学们就按正常shell指令来传就行了。

#### 13）更多Airtest封装好的ADB接口介绍[¶](about:blank#13airtestadb "Permanent link")

若同学们需要了解更多详细的Airtest封装好的ADB接口介绍，可以到你本地的Airtest库里面查找这个文件查看：`airtest/core/android/android.py` 。


