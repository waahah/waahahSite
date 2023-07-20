---
title: 测试五、如何在Android手机上进行自动化测试（下）
date: 2023-01-02 14:58:36
tags: [Python, Airtest, Poco, Test, Android]
categories: [Coding, 测试]
---

五、如何在Android手机上进行自动化测试（下）[¶](about:blank#android "Permanent link")
==================================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

通过阅读本篇教程，你将会了解到：

*   如何使用Poco对 Android原生应用 进行测试

Poco支持直接对任何**Android原生应用**（非游戏引擎、非webview）进行UI层次结构识别，用法上与Poco在其他平台上一模一样。

注：基于webview的应用比较特殊（如微信小程序或浏览器），请见文档[Poco如何支持WebView检视](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484464&idx=1&sn=ce3c483a38641034bc601d513d01c36f&chksm=f97ce433ce0b6d25e5cac47aa9c4881ef17520551e5c42e5b45ffca048f3e4a4919d62ed84fa&token=7447076&lang=zh_CN#rd)。

2\. Poco测试Android原生应用实例[¶](about:blank#2-pocoandroid "Permanent link")
----------------------------------------------------------------------

#### 1）在AirtestIDE的Poco辅助窗查看Android原生控件[¶](about:blank#1airtestidepocoandroid "Permanent link")

在AirtestIDE的`Poco Assistant`面板中选择Android模式之后，AirtestIDE会开始自动向手机里安装`Pocoservice.apk`和`Pocoservice-test.apk`，部分型号手机需要手动点击确认安装才能顺利安装。

如无法自动安装，同学们也可以在IDE解压的文件夹里，找到这俩个apk文件，手动安装到测试设备上：

![pocoservice.png](https://s2.loli.net/2023/07/10/gnpw7uz8PEv2Mjc.png)

安装完成后，AirtestIDE会自动启动`PocoService`，它会定时抓取 Android上界面的层次结构信息，稍等片刻就可以在AirtestIDE界面中看到当前界面的UI层次结构树。

点击UI树上的任意节点，可以Log面板中看到该节点的所有属性，同时设备画面中将出现方框，把对应位置框选出来，方便定位节点。

![android-poco_1_.gif](https://s2.loli.net/2023/07/10/CJwsc3T4Edh8vbq.gif)

同时，Poco辅助窗还给我们提供了3个辅助功能：

![pocofuzhu.png](https://s2.loli.net/2023/07/10/xdrY8lDsGaqzi9F.png)

功能分别如下：

*   Poco Pause：锁定当前画面并检索当前画面的控件，单击需要检索的控件，log查看窗会出现该控件的详细信息
*   Poco Inspector：不锁定当前画面检索控件，鼠标移动到哪个控件，log查看窗就会显示哪个控件的详细信息；并且鼠标对控件进行点击时，设备画面也会实时响应
*   Poco Auto Recording：Poco脚本自动录制功能，随鼠标对控件进行点击、滑动等操作，会自动在脚本编辑窗口生成对应的Poco操作脚本

如果`Pocoservice`启动失败，会导致`Pocoservice.apk`反复重装，此时可以检查以下几个方面：

*   是否Android版本过低，Poco支持`Android SDK API` ≥ 19，即Android 4.4及以上
*   请关闭PC或手机上连接的网络代理Proxy，否则可能导致连不上Poco
*   可以尝试卸载手机中的2个Pocoservice相关的APK后，手工重新安装一遍，在`poco\poco\drivers\android\lib`目录下能够找到这两个APK
*   部分vivo和oppo手机需要将手机设置-输入法设置中，把`Yosemite`输入法设置为默认输入法+当前输入法
*   检查手机助手内是否对 `pocoservice.apk` 做了限制，例如在某版本的华为手机中需要开启 **允许自启动** 和 **允许后台活动** ,部分一加手机要把 `pocoservice.apk` 的 **电池优化** 关掉，详情可以参考 “[Android连接常见问题](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/3_android_faq/)” 的文档
*   不能和uiautomator同时启动，否则会相互冲突
*   可以尝试 重启手机 看看是否会恢复

#### 2）一个使用计算器的例子[¶](about:blank#2 "Permanent link")

在这里我们提供一个使用Poco对一个计算器应用编写代码的例子，点这里下载[示例App(calculator)](http://top.gdl.netease.com/poco-res/poco-demo-android-native-app.zip)，并事先将此App安装到手机上。

按照刚才说的，在AirtestIDE中的Poco辅助窗下拉菜单中选择`Android`后，AirtestIDE将会自动启动`Pocoservice`，显示出当前的UI控件层次结构树。此后就可以在AirtestIDE中进行Poco语句的编写和录制了。

#### 3）代码示例[¶](about:blank#3 "Permanent link")

下面这段代码例子将演示一个简单的功能：点击calculator的界面，实现一个1+1=2的运算验证。

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *

auto_setup(__file__)

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco()

poco('com.google.android.calculator:id/digit_1').click()
poco('com.google.android.calculator:id/op_add').click()
poco('com.google.android.calculator:id/digit_1').click()
poco('com.google.android.calculator:id/eq').click()

result = poco('com.google.android.calculator:id/formula').get_text()
assert_equal(result, '2', '1+1=2 ^^')

```

在这段代码中，我们使用`poco = AndroidUiautomationPoco()`初始化了一个poco对象，然后分别选取了`1` `+` `1`按钮进行点击操作后，使用`get_text`接口非常轻松地获取到了结果控件的值`2`，并且使用Airtest的断言语句进行结果验证。

这个例子非常简单，更多poco用法和例子请见[poco tutorial](http://poco.readthedocs.io/en/latest/source/doc/poco-example/index.html)。

3\. 同时连接多台手机使用Poco[¶](about:blank#3-poco "Permanent link")
----------------------------------------------------------

在上一篇教程（[四、如何在Android手机上进行测试（上）-多机协作](#)）中，我们提到了一个脚本里可以连接多台Android手机，并且用`set_current`接口在手机之间切换：

```python
from airtest.core.api import connect_device
dev1 = connect_device("Android://127.0.0.1:5037/serialno1")  # 连上第一台手机
dev2 = connect_device("Android://127.0.0.1:5037/serialno2")  # 第二台手机
set_current(1) # 切到第二台手机

```

假如我们在连上手机后，想要分别使用poco去获取控件和点击这两台不同的手机，此时需要分别初始化两个poco，就像这样：

```python
from airtest.core.api import connect_device
from poco.drivers.android.uiautomation import AndroidUiautomationPoco

dev1 = connect_device("Android://127.0.0.1:5037/serialno1")  # 连上第一台手机
poco1 = AndroidUiautomationPoco(dev1)
dev2 = connect_device("Android://127.0.0.1:5037/serialno2")  # 第二台手机
poco2 = AndroidUiautomationPoco(dev2)

set_current(1)  # 切到第二台手机
poco2('com.google.android.calculator:id/digit_1').click()

```

同理，假如不使用`connect_device`接口连接手机，而是通过直接在命令行中传入`--device`来自动连接手机的话，不需要在代码里重复执行`connect_device`。此时只需要分别获取到设备对象，并且使用设备对象初始化poco就可以了：

```python
from airtest.core.api import G
from poco.drivers.android.uiautomation import AndroidUiautomationPoco

print(G.DEVICE_LIST)  # 假设当前总共有2台手机
poco1 = AndroidUiautomationPoco(G.DEVICE_LIST[0])
poco2 = AndroidUiautomationPoco(G.DEVICE_LIST[1])

```

