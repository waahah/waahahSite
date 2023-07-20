---
title: 测试十二、在Windows平台上测试PC游戏 
date: 2023-01-16 14:58:36
tags: [Python, Airtest, Poco, Test, Windows]
categories: [Coding, 测试]
---

十二、在Windows平台测试PC游戏[¶](about:blank#windowspc "Permanent link")
==============================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

在阅读本文之前，强烈希望大家回顾一下我们之前的教程--[如何测试Windows应用程序](#)，了解如何在AirtestIDE中连接Windows窗口以及如何调用Windows操作的接口，这样将有助于大家对下文的内容进行理解。

2\. 新增的一些指令[¶](about:blank#2 "Permanent link")
----------------------------------------------

之前Airtest已经支持Windows应用程序的测试了，但在涉及到对一些要求 **DirectInput设备** 的PC游戏的测试时，之前提供的方法并不能十分有效地模拟键盘和鼠标输入，因此我们提供了新的接口来支持此类PC游戏的测试。

#### 1）`key_press(key)`和`key_release(key)`[¶](about:blank#1key_presskeykey_releasekey "Permanent link")

一些PC游戏只接收来自底层硬件层面的发送的键盘扫描码，而不响应例如`keyevent()`所用的`pywinauto`库发送的操作系统层面的虚拟键码，所以我们提供了新的接口，`key_press(key)`和`key_release(key)`，来通过发送键盘扫描码进行键盘按键按下和释放的模拟。一些游戏要求在按键按下和释放之间进行一定的操作，因此我们将`keyevent(...)`拆分成了按下和释放两个步骤，这样做也比传入一个`duration`参数要更加精确。

因为目前是Windows平台独有的接口，所以指令并没有放在公共API中。在使用时需要先获取设备，再调用方法来模拟对应的键盘操作。

```python
win = device()
win.key_press('W')
... // some operations
win.key_release('W')

```

具体`key_press(key)`和`key_release(key)`接受的参数`key`的类型可以在官方[Windows平台api文档](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.win.win.html)中查看。

![image](https://airtest.doc.io.netease.com/img_12/keyevents.gif)

#### 2）`mouse_move(pos)`，`mouse_down(button)`和`mouse_up(button)`[¶](about:blank#2mouse_moveposmouse_downbuttonmouse_upbutton "Permanent link")

一些3D游戏需要通过控制鼠标的移动来操作镜头，通过对鼠标按钮的点击和释放来进行例如包括射击在内的的一些操作。我们提取了原来`swipe(...)`和`touch(...)`中的一些逻辑并封装成了三个新的指令，`mouse_move(pos)`，`mouse_down(button)`和`mouse_up(button)`，来模拟鼠标的操作。这三个指令也可以在官方[Windows平台api文档](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.win.win.html)中查看。

在一些对镜头移动要求十分严格的游戏中，例如需要鼠标移动来瞄准敌人进行射击，可能需要进行反复的调试或自己提供算法来确定`pos`这个参数具体的值。

同样，在模拟一些鼠标的操作时，也需要先获取设备再模拟对应的鼠标操作。

```python
import win32api

win = device()
x, y = win32api.GetCursorPos()
win.mouse_move((x+10, y+10))
win.mouse_down('right')
...  // some operations
win.mouse_up('right')

```

3\. 一些常见的问题及解决方法[¶](about:blank#3 "Permanent link")
---------------------------------------------------

#### 1）游戏窗口嵌入问题[¶](about:blank#1_1 "Permanent link")

一些游戏在使用窗口嵌入模式时会出现包括无法框选窗口或者画面消失在内的问题。如果窗口无法框选的话，可以尝试搜索窗口。如果连接窗口以后整个游戏窗口消失的话，可以选择无嵌入模式。如果仍旧无法连接窗口，可以尝试桌面模式。

![search _1_.png](https://s2.loli.net/2023/07/10/7HNxGMTgQLheYpj.png)
_搜索窗口_

![no_embedded.png](https://s2.loli.net/2023/07/10/PXh87dsWMmr5QDa.png)
_无嵌入模式_

![desk.png](https://s2.loli.net/2023/07/10/g4q2KExFhklmuRe.png)
_桌面模式_

#### 2）使用桌面模式的图像脚本处理[¶](about:blank#2_1 "Permanent link")

因为使用了桌面模式，如果你的脚本当中涉及到图像识别，那很有可能在跑脚本的过程中识别到脚本中的图像，而不是游戏画面当中的图像。此时可以右键单击脚本，选择 **图片/代码模式切换** ，将模式转换成代码模式，就能顺利运行脚本了。

![mode.gif](https://s2.loli.net/2023/07/10/cx2M8v5Zqg3tVfj.gif)

#### 3）PC游戏的光标限制[¶](about:blank#3pc "Permanent link")

一些PC游戏对光标进行了限制，玩家无法将光标移出游戏画面以外。在编写脚本的时候，可以利用`Tab+Alt`的方式进行窗口切换。
