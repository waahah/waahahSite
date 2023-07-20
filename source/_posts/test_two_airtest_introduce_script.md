---
title: 测试二、Airtest介绍和脚本入门
date: 2022-12-26 14:58:36
tags: [Python, Airtest, Poco, Test]
categories: [Coding, 测试]
---

二、Airtest介绍与脚本入门[¶](about:blank#airtest "Permanent link")
=========================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

通过阅读本小节教程，你将了解以下内容：

*   Airtest的简单介绍
    
*   新手入门：一个Airtest脚本的详细解析
    
*   如何在Python脚本中调用Airtest接口
*   如何查阅平台相关的接口文档并调用API
*   图片语句的相关参数介绍

2\. Airtest介绍[¶](about:blank#2-airtest "Permanent link")
--------------------------------------------------------

Airtest是一款**基于Python的**、跨平台的UI自动化测试框架，基于图像识别原理，适用于游戏和App。

访问Github上的 [Airtest源码地址](https://github.com/AirtestProject/Airtest) ，可以获得更多信息，也欢迎各位帮忙完善项目，提交PR，也可以在issues页面中 [提交bug或建议](https://github.com/AirtestProject/Airtest/issues) 。

#### 1）如何快速上手[¶](about:blank#1_1 "Permanent link")

首先，想要编写Airtest脚本，需要具备基础的Python语法知识。虽然借助我们的AirtestIDE提供的录制功能，也能简单地根据操作步骤录制出可以回放操作的脚本，但是通常来说，熟练掌握Python语法能够帮助我们写出应用更广泛、更不容易出错的脚本。

若对 Python 语法不熟悉，网络上有不少非常优秀的Python教程可以学习，例如 [廖雪峰的Python新手教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)。

关于Airtest项目的安装、基本使用方法和简单的例子，请查看Airtest文档页的 [快速上手](https://airtest.readthedocs.io/zh_CN/latest/README_MORE.html) 章节。

3\. 一个简单的.air脚本解析[¶](about:blank#3-air "Permanent link")
--------------------------------------------------------

#### 1）什么是.air脚本[¶](about:blank#1air "Permanent link")

在下载解压Airtest脚本的专属IDE——AirtestIDE后，点击“新建脚本”按钮，默认即可创建一个后缀名为`.air`的脚本文件，`.air`这是Airtest脚本的专属后缀。

让我们打开刚才新建脚本的文件夹，可以看到实际上`.air`脚本文件是一个普通的文件夹，里面附带了一个**同名**的`.py`文件。

![](https://s2.loli.net/2023/07/10/6SfUiWVcGpNT4aK.png)

AirtestIDE在执行脚本时，**实际上执行的是里面的`.py`文件**。也就是说，Airtest脚本虽然自带一个后缀名，然而本质上依然是Python脚本，遵循的是Python语法，我们可以根据实际需要自由地`import`其他Python第三方库。

值得注意的是，`.air`文件夹中必须要有同名的`.py`文件，否则在命令行执行`airtest run test.air` 这样的运行指令时会导致失败。

#### 2）如何使用AirtestIDE录制Airtest脚本[¶](about:blank#2airtestideairtest "Permanent link")

在观看本篇教程前，如果你已经阅读过我们的 [快速上手教程](https://airtest.doc.io.netease.com/1_quick_start_guide/) 的话，应该就知道我们在录制脚本前需要先连上一个**设备**。这个**设备**可以是一台Android手机、一个Windows窗口、或是iOS设备等等，请参考我们的[设备连接](https://airtest.doc.io.netease.com/IDEdocs/3.2device_connection/1_android_phone_connection/)文档，在`AirtestIDE`里根据需要连接一个设备。

成功连接设备后，就可以根据[Airtest脚本录制](https://airtest.doc.io.netease.com/IDEdocs/3.3record_script/2_airtest_window/)文档中描述的两种功能： **手工按键录制与自动录制** ，来录制你需要的脚本内容了。

同时可以通过使用Python的判断、循环等语法，让脚本实现更加复杂的功能，完成自动化测试的需求。

#### 3） Airtest脚本示例与解析[¶](about:blank#3-airtest "Permanent link")

这是一个简单的脚本示例内容，在AirtestIDE中，显示效果如图：

![](https://s2.loli.net/2023/07/10/GIeAhYotkC62uFM.png)

实际上，脚本内容是这样的一个Python脚本(AirtestIDE中会自动将`Template(xxxx)`渲染为图片形式)：

```python
# -*- encoding=utf8 -*-
__author__ = "user"

# 初始化环境
from airtest.core.api import *
auto_setup(__file__)

start_app("org.cocos2d.blackjack")

# 模拟点击
touch(Template(r"tpl1556019871196.png", record_pos=(0.204, -0.153), resolution=(1280, 720)))
sleep(2)
swipe(Template(r"tpl1561952588795.png", record_pos=(-0.067, 0.134), resolution=(1280, 720)), vector=[0.2783, 0.0374])
wait(Template(r"tpl1561952704834.png", record_pos=(-0.186, -0.093), resolution=(1280, 720)))

keyevent("BACK")

# 一些简单的逻辑判断
if exists(Template(r"tpl1559100640980.png", record_pos=(-0.33, -0.105), resolution=(1920, 1080))):
    text("test")

# 断言
assert_exists(Template(r"tpl1561952631660.png", record_pos=(-0.373, -0.108), resolution=(1280, 720)), "验证内容存在")

stop_app("org.cocos2d.blackjack")
```

接下来我们将详细解释示例脚本中的每一行代码具体做了什么事。

##### ① 初始化环境[¶](about:blank#1_2 "Permanent link")

首先，就像一个普通的Python脚本一样，我们需要在代码文件的最开头部分，写上`from airtest.core.api import *`，将Airtest的主要API都 `import` 进来，以便在后续脚本中使用这些API。

`auto_setup` 是一个用来初始化环境的接口，接口文档在[这里](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html#airtest.core.api.auto_setup)，它接受5个参数，我们可以设置当前脚本所在的路径、指定运行脚本的设备、设置默认的log路径、设置脚本父路径和屏幕截图的压缩比率。

*   如果`auto_setup`不传入任何参数的话（即 `auto_setup(__file__)`），Airtest将会读取运行时命令行中传入的各项参数，来对环境进行初始化。
*   在AirtestIDE创建脚本时，默认生成的代码里是最简单的初始化代码`auto_setup(__file__)`，意思是将脚本文件作为脚本路径传入，其他参数内容将默认读取运行命令行传入的参数。
*   **请尽量在脚本初始化期间调用`auto_setup`接口**，这样能保证尽可能正确地初始化环境、并生成log文件，否则默认是不生成log内容的

脚本运行命令行有两种形式，命令行中的参数包含`device`、`log`等：

*   命令行运行Airtest脚本的示例：`>airtest run untitled.air --device Android:///手机设备号 --log log/`。  
    更多使用命令行运行脚本信息，请参考[文档](https://airtest.doc.io.netease.com/IDEdocs/3.4run_script/1_useCommand_runScript/)。
*   在使用AirtestIDE运行脚本时，会在“Log查看窗”中自动生成一个可用的命令行，可以供大家作为参考。  
    `"D:\AirtestIDE-path\AirtestIDE" runner "D:\script-path\untitled.air" --device Android://127.0.0.1:5037/5PZTQWQOGES8RWUG --log "C:\Users\username\AppData\Local\Temp\AirtestIDE\scripts\aa8c71acdfa70c3068b862cb42ffb8dc"`

##### ② 设备连接[¶](about:blank#2 "Permanent link")

*   在运行时的命令行中如果传入了类似`--device Android:///`这样的设备参数，那么脚本在初始化时会自动连上对应的设备，不需要再另外写代码连接了。
*   如果没有在初始化时连上设备，可以在`auto_setup(__file__,devices=["Android://127.0.0.1:5037/5PZTQWQOGES8RWUG"])`接口中指定运行脚本的设备，或者使用`connect_device`接口来连接设备。
*   Airtest支持在一个脚本里同时连接多个设备，使用`set_current`接口可以在多个设备中进行切换，`device()`接口可以获取到当前使用中的设备。用这个接口可以轻易写出多台手机之间交互的用例代码了，比如用两台手机相互添加好友。

##### ③ 模拟点击[¶](about:blank#3 "Permanent link")

Airtest作为自动化测试框架，模拟的是人的操作，常见接口主要有：

*   `touch` ：点击某个位置，可以设定被点击的位置、次数、按住时长等参数
*   `swipe` ：从一个位置滑动到另外一个位置
*   `text` ：调用输入法输入指定内容
*   `keyevent` ：输入某个按键响应，例如回车键、删除键
*   `wait` ：等待某个指定的图片元素出现
*   `snapshot` ：对当前画面截一张图
*   其他......

核心API请参见这个[文档](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html)，在这个文档页里出现的API都是跨平台API，由于我们在代码的第一行里将`airtest.core.api`里的接口全部`import`进来了，因此这些API可以在代码里直接进行调用，像这样：

```python
from airtest.core.api import *
touch((x, y))

```

在很多接口中，支持传入`Template`图片对象作为参数，在运行时将会去点击图片在画面中的所在位置，类似这样：

```python
# 等价于 touch((x, y)), (x, y)是图片所在的中心点
touch(Template(r"tpl1556019871196.png", record_pos=(0.204, -0.153), resolution=(1280, 720)))

```

其中，`Template`对象是一个图片类，Airtest会先尝试在当前画面中寻找能够匹配这张图片的位置，如果找到了，将对这个坐标进行点击操作，如果找不到，将抛出识别异常。我们将在后文对`Template`图片类进行更加详细的介绍。

##### ④ 平台相关的接口[¶](about:blank#4 "Permanent link")

刚才提到的`airtest.core.api`中的接口，都是跨平台的，但是每个接口具体支持的平台可能各不相同。例如，[install](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html#airtest.core.api.install)接口在文档中的`支持平台`一栏里，只有`Android`，意味着在连了`Windows`设备（即某个Windows窗口）时，是不能使用这个接口来安装应用程序的。

具体查看某个接口在某个平台下的支持情况，请翻阅文档目录中的`平台相关的API`，根据具体的平台查找对应的接口，同时，还能发现在不同的平台下，有一些独有接口可供调用，例如在[Android平台](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.android.html)下：

```python
from airtest.core.api import *
# Android平台下的touch接口支持额外的参数duration来控制点击屏幕的时长
# 翻阅airtest.core.android.android中的Android包含的touch方法来获取更多参数信息
touch((600, 500), duration=1)

# 在Android中，有一个平台独有的接口list_app可以列出所有安装过的应用
dev = device()  # 先获取到当前设备对象，这里的dev即是一个Android对象
print(dev.list_app())  # 然后就可以调用平台独有接口了

```

##### ⑤ 断言语句[¶](about:blank#5 "Permanent link")

[断言](https://baike.baidu.com/item/%E6%96%AD%E8%A8%80/13021995)在单元测试代码中非常重要，因此建议在我们的脚本里使用断言语句来判定被测应用当前的状态是否是我们预期中的状态。

Airtest提供了`assert_exists`和`assert_not_exists`两个接口，来断言一张图片存在或不存在于当前画面中。

同时，还提供了`assert_equal`和`assert_not_equal`两个语句，来断言传入的两个值相等或者不相等。

4\. 如何在Python脚本中使用Airtest[¶](about:blank#4-pythonairtest "Permanent link")
--------------------------------------------------------------------------

AirtestIDE在新建脚本时，也能够直接创建一个`.py`脚本文件，但是在创建之前会弹出一个设置窗口，要求填写一些指定的参数。

在我们了解过`auto_setup`接口后就会知道，这些参数就是为了传给它，然后初始化Airtest运行环境用的。因此，一个纯`.py`脚本的初始化代码可以是这样的：

```python
from airtest.core.api import *
from airtest.cli.parser import cli_setup

if not cli_setup():
    auto_setup(__file__, logdir=True, devices=[
        "Android:///?cap_method=javacap&ori_method=adbori",
    ])

# do something
# touch((x, y))

```

上面这段代码的意思是说，当使用 `python xxx.py` 来运行本文件，且不带任何命令行参数时，则自动使用 `auto_setup` 这个接口来对airtest相关的参数进行初始化。这样只需要在写py脚本时，填写好指定的参数就能直接用 `python xx.py` 指令来运行脚本。

同时，原先传统的 `airtest run xx.air –-devices Android:///` 命令行运行方式也不受影响，只要脚本检测到传入了命令行参数（即代码中的`if not cli_setup()`判断），就依然优先使用命令行参数来初始化Airtest环境。

当然，熟练掌握API的各位，也可以根据实际需求在自己的Python脚本中调用Airtest API，与使用正常的Python第三方库方法相同。

5\. 图片类`Template`的参数介绍[¶](about:blank#5-template "Permanent link")
------------------------------------------------------------------

在AirtestIDE中，带有截图的语句是能够展示出对应的图片的，方便大家知道这个语句使用的是什么截图。在编辑器中点击鼠标右键菜单的`图片/代码模式切换`，可以将当前编辑窗口中的代码切换成纯文本代码，那么我们将会看到，一个`touch(图片)`这样的语句，可能会变成这样的格式：

```python
touch(Template(r"tpl1556019871196.png", record_pos=(0.204, -0.153), resolution=(1280, 720)))

```

![debug_code.png](https://s2.loli.net/2023/07/10/9eAtrsh8XSfY4va.png)

`Template`即Airtest封装的图片类，运行时会先去读取这张图片，然后在当前画面中找到最符合这张图片的坐标点，最后才执行`touch`点击。

在AirtestIDE中截的图，默认会自带3个参数，第一个参数是图片路径（IDE的截图显示相对路径），第二个`record_pos`记录了截取这张图片时，它所在的位置，第三个`resolution`记录的是截取图片时，当前画面的分辨率。

*   `record_pos`的作用是，可以让Airtest在回放脚本时优先在录制时的位置附近查找，如果找不到符合条件的图片，再扩大寻找范围到整个画面。这样能够提升查找图片的速度和精确度。
*   `resolution`记录的是画面的分辨率，如果在不同设备上回放脚本，Airtest将会对当前画面的分辨率按照比例进行一定的缩放，方便图片的跨分辨率匹配。
*   虽然直接使用图片路径来初始化一个`Template`类，也同样能够运行代码，但是为了能够适配更多分辨率的设备，以及提升图像查找速率，建议各位尽量填写参数。AirtestIDE截取的图片将会自动生成对应的参数，如果对截取的图片不满意，可以使用[图片编辑器](https://airtest.doc.io.netease.com/IDEdocs/3.3record_script/5_script_window/#2)功能修改图像参数来对图片进一步修改。

除了以上三个参数之外，图片还支持更多参数，对运行过程中的图像识别阈值、点击位置和是否灰度进行修改。其中，图像匹配的阈值`threshold`值与图像识别的成功率息息相关，请阅读[文档](https://airtest.doc.io.netease.com/IDEdocs/airtest_framework/7_script_settings/#4thresholdthreshold_strict)获得更多细节。

#### 1）图像识别的全局配置项[¶](about:blank#1_3 "Permanent link")

在上一小节中，我们介绍了图像模板类`Template`的各项参数，当我们修改那些参数时，只有对应的那张图片会生效，举个例子：

```python
touch(Template(r"tpl1556019871196.png", threshold=0.9)

```

在这行代码中，我们将一张图片的识别阈值`threshold`设置为0.9，意思是当识别结果的可信度大于等于90%时，我们才认为这次图像识别匹配成功，是一个相当严格的设置了。

假如我们希望能够将这个设置扩展到整个脚本中的所有图片，又不希望挨个修改每张图片的代码时，我们可以考虑修改Airtest的全局配置来实现这个需求：

```python
from airtest.core.api import *
# airtest.core.api中包含了一个名为ST的变量，即为全局设置
ST.THRESHOLD = 0.8

# 未指定图片threshold，默认使用ST.THRESHOLD中的0.8
touch(Template(r"tpl1532588127987.png", record_pos=(0.779, 0.382), resolution=(407, 264)))

# 手工指定图片threshold，以图片设置的0.6为准
touch(Template(r"tpl1532588127987.png", record_pos=(0.779, 0.382), resolution=(407, 264), threshold=0.6))

```

还有更多可定制的全局配置项，请各位查看[脚本全局配置](https://airtest.doc.io.netease.com/IDEdocs/airtest_framework/7_script_settings/#1)文档页来获取更多配置项的介绍。

6\. 总结[¶](about:blank#6 "Permanent link")
-----------------------------------------

通过阅读本节教程，希望大家能够对Airtest脚本有更加深入的印象，它不仅仅能够在AirtestIDE上通过几次鼠标点击来生成录制脚本，还可以结合Python、运用编程技巧编写代码实现更多复杂需求。

因此，使用Airtest与使用其他Python第三方库一样，需要多加阅读[Airtest API](https://airtest.readthedocs.io/zh_CN/latest/)文档，而Github上的[源码](https://github.com/AirtestProject/Airtest)也清晰易懂，欢迎各位阅读源码或与我们交流。

