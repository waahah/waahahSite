---
title: 测试四、如何在Android手机上进行自动化测试（上）
date: 2022-12-30 14:58:36
tags: [Python, Airtest, Poco, Test, Android]
categories: [Coding, 测试]
---

四、如何在Android手机上进行自动化测试（上）[¶](about:blank#android "Permanent link")
==================================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

通过阅读本节教程，你将了解到以下内容：

*   如何在AirtestIDE中连接Android设备
    
*   如何在脚本代码中、运行脚本时指定手机
    
*   如何填写`--device Android:///`的内容
*   如何便捷地在脚本中调用ADB指令或Android专属接口
*   如何使用Android助手功能

2\. 连接Android手机[¶](about:blank#2-android "Permanent link")
----------------------------------------------------------

#### 1）在AirtestIDE里连接Android手机[¶](about:blank#1airtestideandroid "Permanent link")

使用AirtestIDE对Android应用进行自动化测试时，第一步就需要连接Android设备。

请查阅我们的[设备连接文档](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/1_android_phone_connection/)里的指引，安装好驱动、打开手机里的`开发者选项`、`允许USB调试`选项后，用USB线连上手机并在AirtestIDE中尝试连接。

如果遇到了问题，请查阅[Android连接常见问题](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/3_android_faq/)文档，根据里面提供的自查步骤排查问题，有些品牌手机有专属的选项需要另行开启（例如小米、Vivo/Oppo），请同样查阅对应品牌的注意事项来避免问题。

#### 2）设备的支持情况[¶](about:blank#2 "Permanent link")

目前我们支持市面上几乎绝大多数**Android手机**、**Android模拟器**（模拟器连接教程请查阅[这里](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/2_emulator_connection/)），也可能支持少部分特殊的基于Android系统的硬件设备（这类设备由于种类繁多，我们无法一一进行测试和支持，如果有兼容需求请联系管理员QQ1146924173，添加时请备注问题）。

在成功连上手机后，我们就能够在AirtestIDE里操作手机画面，就像下图中这样，接下来就可以开始用这台手机编写脚本了。

![](https://s2.loli.net/2023/07/10/XKIyZFwulf2tJsr.gif)

#### 3）设备连接的特殊选项设置[¶](about:blank#3 "Permanent link")

有少数 **非手机** 的Android设备（例如智能电视、智能后视镜等），直接点击`connect`按钮不能连接，但是可以尝试通过勾选`connect`下拉菜单中的选项来尝试连接。

例如，我们的默认连接方式不支持模拟器，因此在连接模拟器时，需要先勾选`Use Javacap`选项（部分品牌模拟器还要同时勾选`Use ADB orientation`）。这里`connect`下拉菜单的三个选项，是截屏、旋转和点击的三个备选方案，在默认方案无法生效的时候，使用这3个备选方案可能就可以支持设备了。

![connect_options.png](https://s2.loli.net/2023/07/10/cF23IuvYOWtZM7J.png)

**注意**：部分品牌手机不支持某个功能，可能仅仅只是因为选项没有开启，例如小米手机必须要开启了`允许模拟点击`才能够在AirtestIDE中使用默认方式点击手机（速度更快，效果更好）。如果是正常的手机设备，遇到问题时请尽量先查阅文档排查问题。这几个备选方案的效率都比默认方案低，只有部分特殊的Android设备才需要使用到备选方案。

3\. Android设备的连接字符串[¶](about:blank#3-android "Permanent link")
--------------------------------------------------------------

#### 1） 运行脚本时如何指定手机[¶](about:blank#1_1 "Permanent link")

当我们在AirtestIDE里连上手机并编写完脚本，当点击运行脚本按钮时，默认会在运行时的命令行里使用**当前已经在AirtestIDE里连接的手机**，我们可以在log查看窗的最上面看到像这样的1条命令：

```cmd
"D:\demo\AirtestIDE-win-1.2.10\AirtestIDE\AirtestIDE" runner "D:\test\taikang_test.air"  --device android://127.0.0.1:5037/127.0.0.1:7555?cap_method=MINICAP&&ori_method=MINICAPORI&&touch_method=MINITOUCH --log "D:/test/test01\fe03093fd01433d6bf58dc5fa5556c22"

```

![commond.png](https://s2.loli.net/2023/07/10/xmO6oq7ZLasX9hT.png)

其中`--device android://127.0.0.1:5037/127.0.0.1:7555?cap_method=MINICAP&&ori_method=MINICAPORI&&touch_method=MINITOUCH`就是当前使用的本地手机，它将我们这台设备号为`127.0.0.1:7555`的手机名称告诉Airtest，让它明白我们需要使用这台手机。

我们也可以在命令行中不填写具体的手机设备号，用`--device Android:///`这样的内容来表示**在当前连接的一台Android设备**上运行即可，无论它的设备号是什么。

如果在命令行中，完全不填写`--device`，默认将会不连任何设备来运行代码，那么在运行到需要有设备才能跑的代码时将会报错（例如`touch`语句必须要连上设备才能运行）。

如果希望在脚本中通过代码进行设备连接，可以在`auto_setup`接口中传入`devices`参数，或者使用[`connect_device`](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html#airtest.core.api.connect_device)接口、[`init_device`](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html?highlight=init#airtest.core.api.init_device) 接口等：

```python
auto_setup(__file__, devices=["Android://127.0.0.1:5037/SJE5T17B17"],logdir=True, project_root=r"D:\test\logs", compress=90)

connect_device("Android:///SJE5T17B17?cap_method=javacap&touch_method=adb")

init_device(platform="Android",uuid="SJE5T17B17", cap_method="JAVACAP")

```

#### 2） 设备连接字符串如何编写[¶](about:blank#2_1 "Permanent link")

在刚才的命令行中使用的 `--device`参数，传入的是一个设备字符串，以安卓设备为例，字串完整定义如下:

```python
Android://<adbhost[localhost]>:<adbport[5037]>/<serialno>

```

其中，`adbhost` 是 `adb server` 所在主机的 `ip` ，默认是本机 `1127.0.0.1` ，`adb port` 默认是 `5037` ， `serialno` 是 android手机的序列号。

这里提供一些常见的填写范例供大家参考：

```python
# 什么都不填写，会默认取当前连接中的第一台手机
Android:///
# 连接本机默认端口连的一台设备号为79d03fa的手机
Android://127.0.0.1:5037/79d03fa
# 用本机的adb连接一台adb connect过的远程设备，注意10.254.60.1:5555其实是serialno
Android://127.0.0.1:5037/10.254.60.1:5555

# 模拟器等特殊设备、使用了连接参数时：
# 模拟器连接，勾选了Use javacap模式
Android://127.0.0.1:5037/127.0.0.1:7555?cap_method=JAVACAP
# 所有的选项都勾选上之后连接的设备，用&&来连接多个参数字符串
Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP&&ori_method=ADBORI&&touch_method=ADBTOUCH

```

更多注意事项、其他平台范例、命令行中使用了`&`符号应该如何处理等，都可以在文档[关于设备字符串](https://airtest.doc.io.netease.com/IDEdocs/3.4run_script/1_useCommand_runScript/#3)中找到。

4\. Android设备的多机协作[¶](about:blank#4-android "Permanent link")
-------------------------------------------------------------

Airtest支持一个脚本中连上多台手机，但是需要注意的是，**并不是能够自动让这一个脚本在多台手机上跑**，而是能够在脚本中使用这几台手机，实现一些类似于多机协作的效果（例如让两台手机登录同一个APP并相互“添加好友”）。

假如我们现在正在使用AirtestIDE编写脚本，已经同时连上多台手机，在运行脚本的时候AirtestIDE将会自动在命令行中添加多个`--device`参数，把当前连接的手机都告诉脚本，**无需其他额外操作**。

或者也可以直接在脚本里使用多个`connect_device`语句，分别传入手机连接串信息即可：

```python
from airtest.core.api import connect_device
dev1 = connect_device("Android://127.0.0.1:5037/serialno1")  # 连上第一台手机
dev2 = connect_device("Android://127.0.0.1:5037/serialno2")  # 第二台手机

```

在连接多台手机后，我们能够在Airtest的全局变量`G.DEVICE_LIST`中看到所有当前连接中的设备，可以使用`set_current`接口在多台设备之间切换。

```python
print(G.DEVICE_LIST)  # 此时设备列表为[dev1, dev2]

# 传入数字0切换当前操作的手机到第1台
set_current(0)

# 切换当前操作的手机到序列号为serialno2的手机
set_current("serialno2")

# 使用device()接口获取当前连接中的设备Android对象
current_dev = device()

```

特别注意：我们在AirtestIDE的设备连接窗口或者脚本里面连接上多台设备，并不代表运行脚本时，会自动在所有连接设备上面进行脚本跑测（同时跑测需要自行编写多线程或多进程等来实现）。举个例子，我们在AirtestIDE的设备连接窗口连接上了多台Android设备，点击运行脚本时，只会在设备窗口当前显示的那台设备上运行。

如使用脚本连接上了多台设备，则需要我们使用 `set_current` 接口来指定切换到哪一台设备上进行操作，否则默认会在连接的第一台手机上运行。

5\. Android平台专属功能与接口[¶](about:blank#5-android "Permanent link")
---------------------------------------------------------------

在[二、Airtest介绍与脚本入门-平台相关的接口](https://airtest.doc.io.netease.com/2_Airtest_introduction/#4)一节中，我们提到了每个接口支持的平台可能各不相同，而Android支持的接口是最全面、最丰富的。

基本上`airtest.core.api`中的接口（[文档地址](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html)），在Android平台上都可以直接使用，例如：

```python
# 清理某个应用数据
clear_app("org.cocos2d.blackjack")
# 启动某个应用
start_app("org.cocos2d.blackjack")
# 传入某个按键响应
keyevent("BACK")

```

#### 1）Android设备接口[¶](about:blank#1android "Permanent link")

除了在`airtest.core.api`中提供的跨平台接口之外，Android设备对象还有很多内置的接口可以调用，我们可以在[airtest.core.android.android module](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.android.android.html)这个文档中查阅到Android设备对象拥有的方法，然后像这样调用：

```python
dev = device()  # 获取到当前设备的Android对象
print(dev.get_display_info())  # 查看当前设备的显示信息
print(dev.list_app())  # 打印出当前安装的app列表

```

#### 2） ADB指令调用[¶](about:blank#2-adb "Permanent link")

在Android设备的测试脚本中，有时候我们需要输入一些`ADB`指令，如果在普通的Python脚本中想要调用`ADB`指令，也许需要用到`subprocess`等模块单独启动进程运行命令行才能实现。

但是在Airtest脚本中，调用ADB指令是非常简单的事情：

```python
# 对当前设备执行指令 adb shell ls
print(shell("ls"))

# 对特定设备执行adb指令
dev = connect_device("Android:///device1")
dev.shell("ls")

# 切换到某台设备，执行adb指令
set_current(0)
shell("ls")

```

6\. 安卓手机助手便捷功能[¶](about:blank#6 "Permanent link")
-------------------------------------------------

在使用AirtestIDE连接上Android手机时，我们还提供了一个简单的手机助手功能，使用方法在[这里](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/7_android_assistant/)。

在**连上Android手机**后，点击设备窗口右上角的工具图标，在展开下拉菜单中，选择`Show assistant dialog` 即可打开安卓手机助手。

![android_assistant.png](https://s2.loli.net/2023/07/10/IMEzTaBjO4WK2Gu.png)

在安卓手机助手中，我们提供了以下几种功能：

*   手机应用的安装/卸载/列表查看
*   常用快捷操作：打开网址、输入文本、切换输入法、音量调节等
*   手机Shell调试窗口

希望我们的Android手机助手在大家使用Android手机时，起到良好的辅助作用，如果有BUG或者功能建议，请反馈至[Github](https://github.com/AirtestProject/AirtestIDE/issues)。
