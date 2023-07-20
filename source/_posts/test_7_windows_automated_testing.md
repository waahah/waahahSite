---
title: 测试七、如何测试Windows应用程序
date: 2023-01-06 14:58:36
tags: [Python, Airtest, Poco, Test, Windows]
categories: [Coding, 测试]
---

七、如何测试Windows应用程序[¶](about:blank#windows "Permanent link")
==========================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

本教程主要讲解如何使用AirtestIDE进行Windows应用程序的自动化测试（以网易云音乐Windows版为案例）。

通过阅读本文，你将学会：

*   使用AirtestIDE对一个Windows软件窗口进行脚本录制
*   如何调用Windows操作的接口
*   如何在脚本和命令行里指定连接某个Windows窗口

2\. 基本原理[¶](about:blank#2 "Permanent link")
-------------------------------------------

AirtestIDE对普通Windows应用程序的测试支持，主要依靠图像识别框架（Airtest）进行位置定位，使用 [pywinauto](https://pywinauto.readthedocs.io/en/latest/index.html) 的操作接口进行模拟操作。

![1_windows_framework_1_.png](https://s2.loli.net/2023/07/10/UOt253wyLhNpVg7.png)

Poco在Windows上的支持暂时尚未推出，我们将会尽快推出该功能，敬请期待。

3\. 在AirtestIDE中连接Windows窗口[¶](about:blank#3-airtestidewindows "Permanent link")
--------------------------------------------------------------------------------

要使用AirtestIDE测试某个Windows程序，首先要将待测试的Windows窗口与AirtestIDE进行连接，其实也就是将Windows窗口的**句柄**告诉给AirtestIDE。在成功连接窗口后，Airtest能够将该窗口作为一个**设备**，接下来就像在操作一台Android设备一样，能够对Windows窗口进行图像识别、点击操作等。

**注意：** 由于选定连接Windows窗口后，在AirtestIDE中操作、运行脚本时，将会依赖这个特定的窗口句柄。因此在窗口选定后请不要随意关闭，否则会导致运行时无法找到对应窗口而报错。

#### 1） 常规连接方法-一键嵌入[¶](about:blank#1- "Permanent link")

AirtestIDE提供了一键嵌入Windows窗口的功能，如下所示：

![2_default_embed_1_.gif](https://s2.loli.net/2023/07/10/R1eZmosfGDBJwqi.gif)

点击AirtestIDE的**选定窗口**按钮，将可以选择桌面上一个已经启动的Windows应用（此时窗口边缘将会显示绿色/红色方框），把它嵌入到AirtestIDE中。嵌入窗口后，可以方便地在AirtestIDE中操作窗口、录制语句、运行脚本。

或者我们也可以点击旁边的 **搜索窗口** 按钮，找到我们需要测试应用的标题，然后点击右侧的 **连接** 按钮来嵌入我们的Windows应用窗口进行自动化测试：

![search.png](https://s2.loli.net/2023/07/10/AepDaFNk13QM7lO.png)

#### 2） 另一种备用的连接方法[¶](about:blank#2_1 "Permanent link")

由于Windows应用的底层实现各不相同，有些应用窗口如果使用默认的一键嵌入方法，在嵌入到AirtestIDE里之后会遇到一些问题（例如嵌入后无法用鼠标操作、无法正常嵌入、嵌入后无法显示图像等）。

针对这些问题，我们提供了一种 **无嵌入连接** 的方案，请在AirtestIDE的顶部菜单栏，依次找到选项--设置，然后找到`Device`\-`Windows Embed Backup Method`，勾选后并点击OK，之后即可使用备用方案（即无嵌入模式）来连接窗口。

接下来的连接方式和常规方法一样，点击**选定窗口**，然后把鼠标移动到待测试窗口上，单击左键选择待测窗口程序：

![3_backup_embed_1_.gif](https://s2.loli.net/2023/07/10/g2JvyGC4NhYpwo8.gif)

从图中可以看到，这种窗口连接方式不会将Windows窗口嵌入到AirtestIDE里，虽然在脚本录制时不如默认嵌入方式简单好用，但是能够避免一些窗口嵌入带来的问题。

#### 3） 桌面模式[¶](about:blank#3 "Permanent link")

假如想要测试的窗口不止一个（拥有多个不同的窗口句柄），单独嵌入一个窗口可能无法满足测试需求，此时我们也提供了第三种方案：桌面模式。

![4_window_deskmode.png](https://s2.loli.net/2023/07/10/ibZavL5rKVukz1m.png)

点击桌面模式按钮，**此时AirtestIDE右侧的设备窗口将会完全隐藏**，进入Windows桌面模式。

在此模式下，录制脚本与运行脚本都与正常情况下没有区别，只不过执行时将会对整个桌面进行截图识别，甚至可以识别到AirtestIDE代码窗口里的截图语句（因此在执行脚本时，可以在AirtestIDE的脚本编写窗口，**单击鼠标右键选择`图片/代码模式切换`** ，将脚本编辑窗口的图片切换成代码模式，避免脚本界面里的截图干扰执行结果）。

#### 4） 连接注意事项[¶](about:blank#4 "Permanent link")

*   由于在选定窗口时，桌面上可能会有不少同时打开着的其他窗口，导致选择时的绿色/红色方框不一定能够很准确地框选到被测应用，请大家在点击**选定窗口**按钮之前，尽可能**先把所有其他无关窗口都最小化**，这样做可以让窗口选择更准确。
*   为了防止出现异常情况，**请不要选择自己的桌面、AirtestIDE软件本体**。因为窗口嵌入的功能原理是，将一个Windows窗口设置为IDE的子窗口，因此如果试图连接桌面，可能会导致无法预料的异常情况发生。如果只是想测试桌面上的所有窗口，可以选择我们的桌面模式来录制脚本。
*   由于Windows窗口在截图时需要记录分辨率，因此把窗口嵌入到IDE后大小将会被固定，无法修改。如果觉得嵌入后窗口过大，可以在嵌入之前先将窗口调整至合适大小再进行嵌入。
*   对于嵌入AirtestIDE后出现异常情况的应用窗体，我们尽量使用非嵌入模式/桌面模式来进行测试。

#### 5）退出Windows连接[¶](about:blank#5windows "Permanent link")

*   直接关闭AirtestIDE即可退出本次Windows连接，并将先前嵌入的窗口自动弹出
*   也可以通过右上角的`Disconnect current device`按钮来退出窗口连接

![5_exit_windowConnect.png](https://s2.loli.net/2023/07/10/PKvmnbAZ2kj7DHe.png)

4\. 录制与编写Airtest脚本[¶](about:blank#4-airtest "Permanent link")
-------------------------------------------------------------

在成功连接上Windows窗口后，就相当于我们已经连接上了一台**设备**，接下来可以对它进行脚本的录制与回放了。

#### 1） 生成截图语句[¶](about:blank#1_1 "Permanent link")

首先，`touch` / `wait` / `exists` / `assert_exists` / `assert_not_exists`等Airtest带有截图的语句，与在Android/iOS设备上录制并没有太大区别：

![image](https://airtest.doc.io.netease.com/img_7/5_gen_script%5B1%5D.gif)

但是需要注意的是，在使用鼠标拖拽框选好想要截图的位置后，需要**双击该截图区域**才能完成截图，而不会在鼠标松开时自动完成截图，这也是Windows下截图的最大区别。

因此截图的步骤是：

*   拖动鼠标框选合适的区域
*   双击鼠标完成截图
*   点击鼠标右键可以重新进行框选
*   按`Esc`按钮可以退出本次截图操作

以及，在录制`swipe`语句时，在完成截图区域框选后，需要单击滑动终点完成语句录制。

（在AirtestIDE1.2.10及以上版本中，拖拽框选好截图位置后松开鼠标即可完成截图，也不需要双击截图区域了）

#### 2） 调用Windows接口[¶](about:blank#2-windows "Permanent link")

和Android/iOS一样，Airtest也对Windows下的常用操作进行了封装，底层操作接口使用的是[pywinauto](http://pywinauto.readthedocs.io/en/latest/index.html)库。

因此，在编写Windows应用的测试脚本时，我们可能需要查阅以下几个API文档：

*   [Airtest的跨平台API](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html)，这里的所有API都可以在脚本里直接调用
*   [Airtest的Windows专属API](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.win.win.html)，请查阅后面提供的代码示例来了解如何调用Windows设备的专属接口
*   如果需要更复杂的操作，可能需要查阅[pywinauto](https://pywinauto.readthedocs.io/en/latest/code/code.html)提供的API

#### 3）一个简单的示例[¶](about:blank#3_1 "Permanent link")

为了方便演示，我们假设这个脚本没有在命令行中传入参数，而是在脚本里使用`connect_device`接口来连上一个句柄为123456的窗口，并对它进行一些操作：

```
from airtest.core.api import *
dev = connect_device("Windows:///123456")
# 通用的接口调用方式，与其他平台相同：
touch(图片)

```

假如我们希望能够调用一些Windows的专属操作，比如查阅了[Airtest的Windows专属API](https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.win.win.html)文档后，我们发现有一些操作是只有Windows窗口才有的：

```
# 调用Windows专属的接口，例如获取当前窗口的标题内容
print(dev.get_title())
# 把窗口移动到某个坐标位置
dev.move((100, 200))

```

接下来，假设我们现在想要使用鼠标滚轮，在查阅Airtest的API后发现，Airtest的Windows模块并没有封装鼠标滚轮的功能，此时我们可以进一步查询[pywinauto](https://pywinauto.readthedocs.io/en/latest/code/code.html)的文档，寻找到`mouse`相关的章节后，就知道如何调用鼠标滚轮接口了：

```
dev.mouse.scroll(coords=(80, 100), wheel_dist=1)

```

#### 4）输入keyevent[¶](about:blank#4keyevent "Permanent link")

在Android中，我们可以通过`keyevent("HOME")`来实现按下HOME键的操作，而在Windows中，我们同样可以通过`keyevent`接口发送一些按键响应。Android的按键码是基于ADB的，而Airtest的Windows模块则封装使用了 [pywinauto](https://pywinauto.readthedocs.io/en/latest/code/code.html) 支持的按键码，请查阅[pywinauto.keyboard](https://pywinauto.readthedocs.io/en/latest/code/pywinauto.keyboard.html)文档内容来编写Windows下的`keyevent`接口参数：

```
# 在pywinauto中，符号^也代表了CTRL键，因此^a即为全选（Ctrl+A）
keyevent("^a")
# 例如这是删除键的输入方式，需要加上括号{}
keyevent("{DEL}")

```

请大家根据实际需求，查阅文档后再编写按键响应的代码。

5\. 如何在运行脚本时，指定连接某个窗口[¶](about:blank#5 "Permanent link")
--------------------------------------------------------

在AirtestIDE的Windows模式中，运行脚本和查看报告与其他平台并无不同：

![image](https://airtest.doc.io.netease.com/img_7/6_run_script%5B1%5D.gif)

然而，最需要注意的一点是：在AirtestIDE里连接的窗口，都是用**窗口句柄**连接的。窗口句柄是每个Windows窗口对象拥有的独一无二的32位无符号整数，**而且每次打开窗口，这个数值都会变化**。

这就意味着，假如我们用某个窗口嵌入到AirtestIDE里写出了一个脚本，虽然这次可以直接运行，但是通过复制AirtestIDE里的脚本命令行的方式，是无法保证下一次还能够运行的。因为AirtestIDE里的命令行，将会有这样的参数内容`--device Windows:///句柄`，而下次再打开窗口，可能句柄已经发生了变化。

因此，我们也可以不使用句柄，而是通过其他的方式来连接窗口。Airtest的Windows模块，使用了pywinauto的[connect](https://pywinauto.readthedocs.io/en/latest/HowTo.html?highlight=connect#how-to-specify-a-usable-application-instance)接口来连接窗口，因此除了句柄以外，我们可以通过窗口标题来连接：

```
# 连接一个Windows窗口，窗口句柄为123456
Windows:///123456
# 连接一个Windows窗口，窗口名称匹配某个正则表达式
Windows:///?title_re=Unity.*
# 连接windows桌面，不指定任何窗口，对应IDE的桌面模式
Windows:///

```

在命令行中假如想使用窗口名称连接，不需要添加引号等符号，直接这样写：

```
airtest run test.air --device Windows:///?title_re=Unity.*

```

6\. Poco支持[¶](about:blank#6-poco "Permanent link")
--------------------------------------------------

#### 1） 接入了Poco-SDK的Windows窗口[¶](about:blank#1-poco-sdkwindows "Permanent link")

有一些Windows-app已经接入了Poco（例如Unity游戏窗口），我们同样能够使用AirtestIDE来方便地查看和选中UI节点。但是在使用这个功能前，需要事先告诉AirtestIDE这个Windows窗口所在位置以及窗口大小。

在“选项”-“设置”-“Poco”，选择“Windows Content Area Rect”，框选窗口主画面后双击确认(右键/esc可取消)，随后即可开始使用Poco相关功能了，如图所示：

![image](https://airtest.doc.io.netease.com/img_7/windows_poco_render_rect%5B1%5D.gif)

#### 2） Poco-Windows支持[¶](about:blank#2-poco-windows "Permanent link")

针对Windows窗口的Poco支持，官方正在完善文档和功能，敬请期待。
