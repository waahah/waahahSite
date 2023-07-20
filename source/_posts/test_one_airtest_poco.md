---
title: 测试一、Airtest+Poco快速上手
date: 2022-12-24 14:58:36
tags: [Python, Airtest, Poco, Test]
categories: [Coding, 测试]
---

一、Airtest+Poco快速上手[¶](about:blank#airtestpoco "Permanent link")
===============================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

本文档将演示使用`AirtestProject`专用的编辑器[AirtestIDE](https://airtest.netease.com/home/)，编写`Airtest`+`Poco`自动化脚本的**全流程**。强烈建议新手从本文档开始阅读，并使用`AirtestIDE`上手脚本编写。

2\. 简介[¶](about:blank#2 "Permanent link")
-----------------------------------------

`AirtestIDE` 是一个跨平台的UI自动化测试编辑器，适用于游戏和App。

*   自动化脚本录制、一键回放、报告查看，轻而易举实现自动化测试流程
*   支持基于图像识别的[Airtest](https://github.com/AirtestProject/Airtest)框架，适用于所有Android/iOS/Windows应用
*   支持基于UI控件搜索的[Poco](https://github.com/AirtestProject/Poco)框架，适用于Unity3d，Cocos2d与Android/iOS App等多种平台
*   能够运行在Windows、MacOS、Linux平台上

访问[官网](http://airtest.netease.com/)通过视频查看更多特性。

![](https://s2.loli.net/2023/07/10/U1FryYlT2Aio3sc.jpg)

通过本教程，你将学会如何上手自动化测试（或者写点脚本来自动玩游戏）。相信我，这个过程会非常愉快~

3\. 安装[¶](about:blank#3 "Permanent link")
-----------------------------------------

目前AirtestIDE提供了Windows、Mac和Linux的客户端，请从[官网](https://airtest.netease.com/home/)下载，解压即用。（关于Linux平台，只有1.2.3及更低版本的AirtestIDE支持，所以我们 **更建议在Windows和Mac平台上使用我们的AirtestIDE** 。）

4\. 连接设备[¶](about:blank#4 "Permanent link")
-------------------------------------------

AirtestIDE目前支持测试`Android`/`Windows`/`iOS`上的应用，其他更多平台的支持正在开发中。

无论是`Android`/`iOS`手机，还是`Windows`窗口，在`Airtest`中都将它视为一个**设备**，接下来我们将演示如何**连接一个设备**。

#### 1）连接Android手机[¶](about:blank#1android "Permanent link")

通过ADB连接你的电脑和Android手机，即可开始调试Android应用。[ADB](https://developer.android.com/studio/command-line/adb.html?hl=zh-cn)是Google官方提供的Android调试工具。AirtestIDE依赖ADB与安卓设备进行通信。

打开AirtestIDE，按照以下步骤进行连接：

*   打开手机`设置-开发者选项-USB调试`开关，参考[安卓官方文档](https://developer.android.com/studio/debug/dev-options.html#debugging)
*   在AirtestIDE设备面板中点击`refresh ADB`按钮，查看连接上的设备
*   如果没有显示出设备，试试`restart ADB`，如果还不行，参考[FAQ](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/3_android_faq/)文档进行问题排查
*   能够成功看到设备后，点击对应设备的`Connect`按钮，进行初始化

![](https://s2.loli.net/2023/07/10/mlK3jJvukWnpTcZ.gif)

手机连接成功后，即可在AirtestIDE中看到手机屏幕的镜像显示，并对手机画面进行实时操作。

> 如果手机连接失败，请先参考[FAQ](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/3_android_faq/)文档进行问题排查。若依然不成功，请将手机型号和AirtestIDE后台报错提交到[Github Issue](https://github.com/AirtestProject/AirtestIDE)，开发人员会尽快修复。由于Android手机的碎片化问题严重，我们非常感谢您的反馈可以帮助这个项目做的更好。

#### 2）连接Windows窗口[¶](about:blank#2windows "Permanent link")

对于Windows桌面程序的测试，AirtestIDE可以将被测窗口嵌入，方便脚本录制和调试。

*   在AirtestIDE设备面板中点击`选择游戏画面`按钮
*   将鼠标移动到被测程序的窗口上，会显示红色边框，将对应的窗口框出
*   单击鼠标左键即可将对应的窗口嵌入到AirtestIDE中
*   也可以点击`搜索窗口` 按钮，选择对应title的窗口，然后点击`连接`

![](https://s2.loli.net/2023/07/10/oPBxnCTAgMrX4KN.gif)

如果上述方法不能正确找到被测程序的窗口，你还可以[使用备用连接方法](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/5_windows_connection/#2-windows)。

#### 3）连接iOS手机[¶](about:blank#3ios "Permanent link")

要连接一台iOS手机，你需要先准备好一台安装了Xcode的Mac电脑，连接方法参考[文档](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/4_ios_connection/)。

![ios_1.png](https://s2.loli.net/2023/07/10/S4LYkdcbBeglu5N.png)

![ios_2.png](https://s2.loli.net/2023/07/10/drwqNVEH9PS2Xct.png)

5\. 录制自动化脚本[¶](about:blank#5 "Permanent link")
----------------------------------------------

在连上设备后，我们可以开始录制自动化测试脚本了，在接下来的内容中，我们将会使用一台Android设备上的一款Unity游戏应用，给大家演示如何录制脚本。

#### 1）模拟输入[¶](about:blank#1_1 "Permanent link")

让我们先从最常用的**模拟点击**开始吧，模拟点击的意思就是，模仿你的操作去点击设备上的某个指定位置。

##### ① 基于图像识别[¶](about:blank#1_2 "Permanent link")

目前我们支持通过图像识别的方式，找到你想要点击的位置并进行操作，这是基于[Airtest](https://github.com/AirtestProject/Airtest)这个框架实现的。

我们可以先看看如何自动录制脚本：点击AirtestIDE左侧的Airtest辅助窗上的 `录制` 按钮，然后随着你在设备窗口上操作手机，代码会自动生成在代码窗口中。

![4.gif](https://s2.loli.net/2023/07/10/aOGonCmFEhY1uiz.gif)

马上来验证一下，点击`运行`按钮运行你的第一个自动化脚本吧！

如果你觉得自动录制生成的图标不够精确，还可以点击Airtest辅助窗上的`touch`按钮，然后在设备窗口上框选精确的图标，也可以自动生成一条`touch`语句。

![5.gif](https://s2.loli.net/2023/07/10/LoMtepfQ7BI8mYz.gif)

类似的模拟输入操作还有滑动：点击`swipe`按钮，在设备窗口上框选精确的图标作为滑动起点，然后点击滑动终点位置，即会自动生成一个`swipe`语句。

其他模拟输入的API包括：

*   `text`：文字输入
*   `keyevent`：按键输入，包括(HOME/BACK/MENU等)
*   `sleep`：等待
*   `snapshot`：截屏

##### ② 基于UI控件[¶](about:blank#2-ui "Permanent link")

如果你发现图像识别不够精确，还可以使用**基于UI控件搜索**的方式进行自动化测试，与刚才的`Airtest`不同，这是[Poco](https://github.com/AirtestProject/Poco)这个框架实现的功能。

目前`Poco`直接支持Unity3d、Cocos2d、白鹭引擎等多种游戏引擎，以及Android/iOS原生App。

如果**是Android/iOS原生应用，是即插即用的**，无需接入SDK。但由于游戏引擎使用OpenGL等图形接口直接渲染，而没有使用Android原生的UI系统，我们需要与游戏的Runtime进行通信获取整个UI结构。

我们提供了非常方便的SDK接入方法，[点这里](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html)查阅目前支持的平台列表，以及如何为你的项目接入Poco。

如果你的项目使用的引擎或平台不在文档中，我们同样支持[自行扩展SDK](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/implementation_guide.html)。

> 实际上在网易游戏内部，我们就是用这种方式支持了Messiah/NeoX/梦幻等多个自研引擎。

接入完成后我们即可开始。手机启动游戏，在AirtestIDE中的 **Poco辅助窗切换模式至对应引擎类型** ，即可看到整个UI结构。

![6.gif](https://s2.loli.net/2023/07/10/SLANu95n28BcjMz.gif)

点击录制按钮，然后随着你的鼠标操作，会自动生成Poco语句到脚本编辑框中。

![7.gif](https://s2.loli.net/2023/07/10/knIm47Jy1LtwvHc.gif)

同样，你也可以通过UI树形结构更精确的检视UI控件，**双击节点自动生成Poco语句**，或者自行选择更好的写法。

自动录制出的语句不一定能够适应所有场景，采用更合理的选择器编写代码，通常会增强整个自动化脚本的健壮性和可读性，这是门[学问](http://poco-chinese.readthedocs.io/zh_CN/latest/source/README.html#working-with-poco-objects)。

![8.gif](https://s2.loli.net/2023/07/10/hSNO7Ml4HuqwoAz.gif)

录制完脚本后记得运行试试效果。

对于Android/iOS的原生应用来说，不需要接入SDK即可使用，例如在连上Android手机后，将Poco辅助窗的模式切换至`Android`，能可以看到整个UI树形结构。

![9.gif](https://s2.loli.net/2023/07/10/6AGfdoxi7FR43Xm.gif)

#### 2）框架信息[¶](about:blank#2_1 "Permanent link")

上述两种UI识别方式，分别是基于两个框架：

*   基于图像识别的[Airtest](https://github.com/AirtestProject/Airtest)框架
*   基于UI控件搜索的[Poco](https://github.com/AirtestProject/Poco)框架

这两个框架都是由我们团队开发的Python第三方库，在实际项目使用经验中，我们发现两者 **互相配合** 会得到最好的效果。在脚本编写的过程中，我们往往也需要查阅它们的项目API文档。

#### 3）使用Python语法[¶](about:blank#3python "Permanent link")

整个AirtestIDE中录制和运行的代码都是基于`Python`语言。Python语法简洁而强大，第三库和工具也非常多。

对于新手，Python上手非常容易，学会基本语法即可写出自动化脚本中所需的逻辑语句。

```python
touch("开卡包.png")
if exists("奖励面板.png"):
    for i in range(5):
        Poco("奖励-%s" % i).click()
```

对于老手，你可以在AirtestIDE中使用各种第三方库来使你的自动化脚本更加强大，通过[添加PYTHONPATH](https://airtest.doc.io.netease.com/IDEdocs/3.4run_script/0_run_script/#4)设置，可以使用本地的`python.exe`来运行你的脚本。

除了辅助窗口里面提供的语句，更多的API文档，可以查看[Airtest](https://github.com/AirtestProject/Airtest)和[Poco](https://github.com/AirtestProject/Poco)的仓库。

#### 4）断言[¶](about:blank#4_1 "Permanent link")

到这里，我们已经有各种模拟输入方法，配合逻辑控制语句让手机动起来。自动化测试中还有很重要的一个步骤：**结果验证**，那么我们来看看怎样声明断言。

##### ① 验证UI界面[¶](about:blank#1-ui "Permanent link")

录制方法与模拟输入类似

*   `assert_exists`：断言图片存在
*   `assert_not_exists`：断言图片不存在

![10.gif](https://s2.loli.net/2023/07/10/bKjnMQA6xPERIuD.gif)

##### ② 验证数值[¶](about:blank#2_2 "Permanent link")

通过Poco获取属性值，手写代码进行断言

*   `assert_equal`：断言相等
*   `assert_not_equal`：断言不等

例如

```
# ... 模拟输入并获得20分之后

value = Poco("分数按钮").attr("num")
assert_equal(value, 20, "获到20分")

```

6\. 查看测试报告[¶](about:blank#6 "Permanent link")
---------------------------------------------

脚本运行完毕后，点击`查看报告`按钮（快捷键Ctrl+L），会使用默认浏览器打开结果报告页面（最好使用**chrome浏览器**打开，兼容性最好）。报告中将展示出每一个步骤的内容和实际执行过程的截图、运行结果，方便查看步骤是否执行成功。

![report.png](https://s2.loli.net/2023/07/10/PJGsmWngI8Q2Vtj.png)

![report02.png](https://s2.loli.net/2023/07/10/ZOxWsmG7g4MlvAK.png)

7\. 命令行接口[¶](about:blank#7 "Permanent link")
--------------------------------------------

现在，你已经学会自动化测试了。接下来呢，你可以使用命令行接口将自动化测试与持续集成结合起来。[持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)

在AirtestIDE运行脚本时，LOG窗口中会打印运行命令。

![11.jpg](https://s2.loli.net/2023/07/10/rnD1JE6KWkbMRxg.jpg)

你可以在不开启IDE的情况下，在命令行中使用那条命令来启动测试脚本，例如：

```cmd
"D:\迅雷下载\AirtestIDE\AirtestIDE" runner "D:\AirtestIDE_2018-01-24_83\untitled.air"  --device Android://127.0.0.1:5037/F8UDU16409004135 --log "C:\Users\gzliuxin\AppData\Local\Temp\AirtestIDE\scripts\cdfc40e8c297b6ad88e09de64d8bafa3"

```

使用AirtestIDE你可以轻松的录制出测试脚本，保存为`.air`脚本。请注意一个`.air`脚本中不要包含太多内容，用良好的脚本命名和目录结构来组织你的脚本，覆盖所有测试点。

你还可以在不同电脑上针对不同设备运行测试， 这时候你就需要[用命令行运行 .air 脚本](https://airtest.doc.io.netease.com/IDEdocs/3.4run_script/1_useCommand_runScript/) 。 对于多平台发布的产品，灵活使用跨平台API和命令行，还可以让同一套测试脚本运行在Android和Windows上进行测试。

> 在网易游戏内部，我们的大型游戏通常会有数百个测试脚本，覆盖常用的玩法测试。每周，这数百个脚本会分别运行在200台手机上进行兼容性测试。
