---
title: 测试八、微信小程序和小游戏自动化测试
date: 2023-01-08 14:58:36
tags: [Python, Airtest, Poco, Test, Wechat]
categories: [Coding, 测试]
---

八、微信小程序和小游戏自动化测试[¶](about:blank#_1 "Permanent link")
====================================================

Airtest Project自动化测试方案除了支持原生应用，游戏，Web之外，也支持了最新推出的微信小程序和小游戏平台。下面我们分别来看下如何利用Airtest Project进行小程序和小游戏的自动化测试：

1\. 小程序[¶](about:blank#1 "Permanent link")
------------------------------------------

对于微信小程序，我们既可以利用 **Airtest的图像识别的方式** 来进行自动化测试，也可以直接利用原生平台的Poco进行控件识别。

微信小程序目前采用的内核信息可以参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/upnwjs.html)。我们用最新版（V8.0.10）的微信测试，可以直接用Android或者iOS poco模式对相应平台的小程序进行控件识别。如果无法使用，可能是由于部分Android设备的Webview内核设置问题，请参考[文档](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484464&idx=1&sn=ce3c483a38641034bc601d513d01c36f&chksm=f97ce433ce0b6d25e5cac47aa9c4881ef17520551e5c42e5b45ffca048f3e4a4919d62ed84fa&token=7447076&lang=zh_CN#rd)进行修改。

下面来分别看下Android和iOS上的效果：

#### 1）Android小程序[¶](about:blank#1android "Permanent link")

连接Android手机，并打开微信小程序，以星巴克小程序为例，在Airtest IDE中选择`Android`模式，可以对页面进行控件识别：

![android_applet.png](https://s2.loli.net/2023/07/10/3GUI5Qq7oYc6plE.png)

下述代码可以点击星巴克小程序上面 `text` 属性为 "一起恰秋味" 的控件：

```python
from airtest.core.api import *

auto_setup(__file__)

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)

poco(text="一起恰秋味").click()

```

#### 2） iOS小程序[¶](about:blank#2-ios "Permanent link")

连接iOS手机，并打开微信小程序，以星巴克小程序为例，在Airtest IDE中选择`iOS`模式，可以对页面进行控件识别：

![2_ios_applet.png](https://s2.loli.net/2023/07/10/OvHst9bIWyZaFrk.png)

如下示例代码可以实现在iOS上点击对应卡面的操作：

```python
from airtest.core.api import *

auto_setup(__file__)


from poco.drivers.ios import iosPoco
poco = iosPoco()


while not poco("感恩有你").exists():
    poco.scroll(direction='vertical', percent=0.3, duration=1.0)
    snapshot()

poco("感恩有你").click()

```

2\. 小游戏[¶](about:blank#2 "Permanent link")
------------------------------------------

Airtest 可以使用 **基于图像识别** 的方式对小游戏进行自动化测试，此外，Poco UI控件检索也对使用[白鹭引擎](https://www.egret.com/)开发的小游戏进行了支持。Poco的接入需要在源代码中接入[poco-sdk](https://github.com/AirtestProject/Poco-SDK)，具体接入指引如下：

#### 1） 环境配置[¶](about:blank#1_1 "Permanent link")

*   首先下载 [poco-sdk](https://github.com/AirtestProject/Poco-SDK)
*   然后在`egretProperties.json`中修改modules属性，添加红框内相应字段，**其中name属性必须为poco**
*   路径可以是相对路径也可以是绝对路径，具体可以参考[白鹭引擎说明文档](http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/configFile/index.html)中有关于 modules字段的说明

![3_poco_path.png](https://s2.loli.net/2023/07/10/vB5wm8IQYP3ti7o.png)

*   然后通过快捷键 ctrl+\` 呼出终端 在终端中执行命令 egret build -e

![4_execute_commond.png](https://s2.loli.net/2023/07/10/27SwUQiVzbaGqDP.png)

*   在入口文件`main.ts`的rungame函数中新建类型为`PocoManager`的对象，并且传入this.stage

![5_pocoManager.png](https://s2.loli.net/2023/07/10/xnwd7G3p2u8j1kh.png)

*   运行代码，启动游戏
*   最后在在终端中输入`python -m poco.utils.net.stdbroker ws://*:5003 tcp://*:15004` ，打开代理服务器broker
*   其中websocket端口默认为5003，如果有更改的需要，可以在新建pocomanager的时候传入端口参数

![6_open_broker.png](https://s2.loli.net/2023/07/10/1eFcvsM8JrCgRji.png)

#### 2）使用AirtestIDE连接[¶](about:blank#2airtestide "Permanent link")

AirtestIDE支持Android和iOS手机连接，可以在手机上打开Egret页面（或者微信小程序/游戏），然后通过AirtestIDE进行连接，Windows和MacOS版本IDE都可以使用。连接基本原理为：

![7_connectTheory.png](https://s2.loli.net/2023/07/10/jPDk4RQ9AcIoU6a.png)

具体步骤如下：

*   通过usb连接Android手机，确认`adb devices`连接ok，在电脑上执行如下命令，将手机的5003端口映射到电脑的5003端口

```bash
adb reverse tcp:5003 tcp:5003

```

*   在电脑上启动broker：

```bash
 python -m poco.utils.net.stdbroker "ws://*:5003" "tcp://*:15004"

```

*   启动broker之后，在手机上访问Egret的页面（需要使用全屏模式保证坐标准确）。访问的时候，broker会打印手机连接上的log，如下：

```shell
~ python -m poco.utils.net.stdbroker "ws://*:5003" "tcp://*:15004"
server listens on ("0.0.0.0", 5003) transport websocket
server listens on ("0.0.0.0", 15004) transport socket
StdBroker on.
server on accept. <poco.utils.net.transport.ws.MyWsApp object at 0x1100620d0>

```

*   打开AirtestIDE连接手机，选择poco `Std-broker`模式，即可以看到UI层级结构。同时broker会打印连接日志：

```shell
server on accept. <poco.utils.net.transport.ws.MyWsApp object at 0x10d03d2d0>
accept from: ('127.0.0.1', 56872)
received_message from ('127.0.0.1', 56323) {"id":"2a0ce828-132e-4d15-a645-55493d7eaf4b","jsonrpc":"2.0","result":{"children"

```

AirtestIDE界面如下：

![8_airtestIDE.png](https://s2.loli.net/2023/07/10/3qCnsB8aYI5HpLW.png)

在AirtestIDE里编写脚本并运行，还可以查看报告

![9_RUN.gif](https://s2.loli.net/2023/07/10/BkQCUL4YeHKWc2A.gif)


