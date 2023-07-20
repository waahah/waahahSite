---
title: 测试三、Poco的介绍和入门教学 
date: 2022-12-28 14:58:36
tags: [Python, Airtest, Poco, Test]
categories: [Coding, 测试]
---

三、Poco的介绍和入门教学[¶](about:blank#poco "Permanent link")
====================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

前面我们已经介绍了基于图像识别的测试框架Airtest，通过图像识别，已经可以编写大部分的测试脚本。但是在某些特殊情况下，例如对于游戏或App里的动态元素，通过图像识别来定位就较为困难。

并且，如果我们测试的应用，UI界面迭代比较频繁的话，我们的Airtest图像脚本也要频繁迭代，成本比较高；所以，我们的Airtest Project解决方案也提供了另外一种基于UI控件搜索的自动化框架 Poco，下面我们简单介绍下Poco框架并且通过示例看下Poco如何使用。

2\. Poco介绍[¶](about:blank#2-poco "Permanent link")
--------------------------------------------------

Poco是一款**基于Python**语法的、与引擎无关的自动化测试框架，它基于控件搜索原理，可以准确定位到应用里面的控件，并且对控件进行点击、滑动等操作：

![](https://s2.loli.net/2023/07/10/rE72UjhtodHDJmM.png)

3\. Poco测试不同应用的示例[¶](about:blank#3-poco "Permanent link")
---------------------------------------------------------

#### 1）原生应用[¶](about:blank#1_1 "Permanent link")

对于Android和iOS平台上的原生应用（包括系统界面），可以直接使用Poco

准备工作：下载 [Airtest IDE](http://airtest.netease.com/)，解压并运行

##### ① Android 原生应用[¶](about:blank#1-android "Permanent link")

1.  准备一台Android手机，打开USB调试功能，然后连接电脑。正常情况下，就可以在Airtest IDE中看到手机列表： 
![](https://s2.loli.net/2023/07/10/i63kKpa2lMwOq5c.png)
2.  点击`connect`，即可在Airtest IDE 中看到设备屏幕。现在进入Android主界面，点击左侧的Poco辅助窗，选择`Android`模式，即可看到当前界面的UI树结构：
![](https://s2.loli.net/2023/07/10/kgsD6O7RV5YP2ir.png)
3.  选择Poco辅助窗口中的`Poco Inspector`按钮，即可对页面上的UI控件进行定位： 
![3.png](https://s2.loli.net/2023/07/10/jMLkiWxpDAzlv4G.png)
4.  与Airtest的使用方式类似，我们可以使用Poco提供的方法对界面上的元素进行操作：

```python
# 选择Android模式时，AirtestIDE自动插入的初始化语句

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)

# 点击设置图标
poco(desc="设置").click()

```

如上所示代码，即可通过UI属性进行元素定位，并进行操作。

关于使用Poco测试Android原生应用的更多细节，可以参考教程（[五、如何在Android手机上进行自动化测试（下）](https://airtest.doc.io.netease.com/5_Android_automated_testing_two/)）。

##### ⑤ iOS 原生应用[¶](about:blank#5-ios "Permanent link")

对于iOS原生应用，Poco同样可以获取到UI层级结构。除了下载运行Airtest IDE之外，我们还需要运行[ios-Tagent](https://github.com/AirtestProject/iOS-Tagent)项目，才可以获取到iOS界面的UI信息。具体步骤如下

1.  连接iOS手机，启动[ios-Tagent](https://github.com/AirtestProject/iOS-Tagent)项目，以Test方式运行到手机上。
2.  使用`iproxy`命令启动代理 `bash iproxy 8100 8100` 如果希望在另外一台电脑连接iOS手机，可以安装[wdaproxy](https://github.com/openatx/wdaproxy)
3.  启动Airtest IDE， 输入proxy地址，即可连接iOS手机
![4.png](https://s2.loli.net/2023/07/10/sVj1cW64JUpwbuy.png)
4.  选择Poco辅助窗中的`iOS`模式，即可看到当前界面的UI树结构： 
![5.png](https://s2.loli.net/2023/07/10/wK23Z4Ba7ErVsRc.png)
5.  获取到界面UI层级关系之后，我们就可以用Poco提供的[API](https://poco.readthedocs.io/zh_CN/latest/source/poco.proxy.html)来编写自动化脚本了~

#### 2）游戏[¶](about:blank#2 "Permanent link")

由于游戏的界面是通过**游戏引擎**渲染出来的，游戏界面没有系统原生的控件信息，所以对于游戏，我们需要接入 [poco-sdk](https://github.com/AirtestProject/Poco-SDK) 才能获取到游戏界面中的控件信息。下面以Unity开发的手游为例，介绍如何在Android和iOS平台进行连接。

##### ① Android 游戏[¶](about:blank#1-android_1 "Permanent link")

1.  参考 [引擎接入指引](https://poco.readthedocs.io/en/latest/source/doc/integration.html)，给游戏源码接入Poco-sdk，并打出Android包，安装到安卓测试设备上。
2.  启动Airtest IDE，并在安卓手机上启动对应的游戏后，选择Poco辅助窗中的`Unity`模式，即可看到当前界面的UI树结构：
![7.png](https://s2.loli.net/2023/07/10/joXTmr4B5fEaS1N.png)
3.  在选择Unity模式之后，Airtest IDE会自动插入poco的初始化代码：

```python
from poco.drivers.unity3d import UnityPoco
poco = UnityPoco()

```

之后的脚本编写，就可以利用Poco提供的API对游戏界面上的元素进行操作了

##### ② iOS 游戏[¶](about:blank#2-ios "Permanent link")

1.  同样的，先完成引擎SDK接入，然后通过Airtest IDE连接iOS手机
    
2.  与Android不同的是，iOS Unity Poco的连接需要启动两个proxy，8100端口用于连接iOS手机，5001端口用于连接poco-sdk的rpc端口 `iproxy 8100 8100 iproxy 5001 5001` ，这里的iproxy相当于adb中的forward
    
3.  连接好iOS手机之后，选择Poco辅助窗中的`Unity`模式，即可看到当前界面的UI树结构： 
![8.png](https://s2.loli.net/2023/07/10/AtXQ5VaF3CnRSbJ.png)
    
4.  之后即可通过Poco提供的API，对iOS上的游戏编写自动化测试脚本了。
    

4\. Poco代码示例[¶](about:blank#4-poco "Permanent link")
----------------------------------------------------

Poco脚本与Airtest脚本的差别很大，Airtest脚本基本上离不开截图，但Poco脚本都基于控件定位和控件操作，我们可以从下述示例来了解下Poco脚本：

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *

auto_setup(__file__)

# Android poco的初始化脚本
from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)

# 控件点击操作
poco("网易云音乐").click()

# 控件滑动操作
poco(text="我好像在哪见过你 (电影《精灵王座》主题曲)").swipe([0.0492, -0.3799])

# 如果存在控件，则进行控件点击
if poco("star_single").exists():
    poco("pos_input").child("Text").click()

# 等待控件出现
poco("basic").wait_for_appearance()

# 获取控件文本属性
score = poco("scoreVal").get_text()

# 遍历控件和拖动控件
for star in poco("playDragAndDrop").child("star"):
    star.drag_to(poco("shell"))

```

可以看到，poco脚本基本上是1个控件定位脚本，例如 `poco("star_single")` ，后面带上控件的操作，例如 `click()` 、 `get_text()` 等。

关于Poco的定位方式，我们可以查看下述资料：

*   [Poco的3种定位选择器](https://mp.weixin.qq.com/s/PYI-kGWZCpoaxe2Tmw5d5Q)
    
*   [利用正则表达式匹配Poco控件](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485237&idx=1&sn=1e0683649b0d0ce0d1c6526b3bb46b53&chksm=f97ce736ce0b6e20ee72d934dcb8759eb649a9694c0f46c3a2d6dcbd4a46428583b9f63f5c87&token=1579680795&lang=zh_CN#rd)
    

对于Poco控件操作的API，我们可以查看其[API文档](https://poco.readthedocs.io/zh_CN/latest/source/poco.proxy.html)。

5\. Poco的平台支持情况[¶](about:blank#5-poco "Permanent link")
-------------------------------------------------------

Poco在大多数平台中，需要**事先接入Poco-SDK**才可正常使用 ，在少数平台（如Android与iOS原生APP）可直接使用Poco，目前支持平台如下：

| 平台 | Airtest | Poco |
| :-: | :-: | :-: |
| Android 原生APP | √ | 直接使用 |
| iOS 原生APP | √ | 直接使用 |
| Unity3D | √ | [Poco-SDK接入文档](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#unity3d%3E) |
| Cocos2dx-lua | √ | [Poco-SDK接入文档](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos2dx-lua) |
| Cocos2dx-js | √ | [Poco-SDK接入文档](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos2dx-js-beta) |
| cocos-creator | √ | [Poco-SDK接入文档](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos-creator) |
| Egret | √ | [Poco-SDK接入文档](https://github.com/AirtestProject/Poco-SDK/tree/master/Egret) |
| UE4 | √ | [Poco-SDK接入文档](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484258&idx=1&sn=0fec4461bc870077af4e096b494d646a&chksm=f97ce361ce0b6a77c885193a900d2be08d22c3cf86a0e90a5fb0e83758aaffc65a9d00ec3927&token=1860040772&lang=zh_CN#rd) |
| Other engines | √ | [可自行接入](https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/implementation_guide.html) |
| WeChat Applet&webview | √ | [参考文档](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484464&idx=1&sn=ce3c483a38641034bc601d513d01c36f&chksm=f97ce433ce0b6d25e5cac47aa9c4881ef17520551e5c42e5b45ffca048f3e4a4919d62ed84fa&token=1579680795&lang=zh_CN#rd) 随着微信更新可能会失效 |
| Windows | √ | 目前仅支持接入了PocoSDK的游戏窗口 |
| MacOS | √ | 努力开发中，敬请期待 |

5\. 更多详细资料参考[¶](about:blank#5 "Permanent link")
-----------------------------------------------

请查看[Poco官方文档](https://poco.readthedocs.io/zh_CN/latest/source/README.html)获得更多教程与API信息，这里是一些关注度较高的内容：

*   [入门教学用例](https://poco.readthedocs.io/zh_CN/latest/source/README.html#tutorials-and-examples)
*   [如何使用Poco选择UI对象?](https://poco.readthedocs.io/zh_CN/latest/source/README.html#working-with-poco-objects)
*   **API文档参考：**[Poco instance API](https://poco.readthedocs.io/zh_CN/latest/source/poco.pocofw.html)，[UI proxy object API](https://poco.readthedocs.io/zh_CN/latest/source/poco.proxy.html)
*   [各类引擎如何接入Poco SDK？](https://poco.readthedocs.io/en/latest/source/doc/integration.html)
*   [如何为自定义引擎编写Poco SDK？](https://poco.readthedocs.io/zh_CN/latest/source/doc/implementation_guide.html)


