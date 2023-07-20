---
title: 测试六、如何在iOS手机上进行自动化测试
date: 2023-01-04 14:58:36
tags: [Python, Airtest, Poco, Test, iOS]
categories: [Coding, 测试]
---

六、如何在iOS 手机上进行自动化测试[¶](about:blank#ios "Permanent link")
========================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

Airtest支持iOS自动化测试，在Mac上为iOS手机部署iOS-Tagent之后，就可以使用AirtestIDE连接设备，像连接安卓设备一样，实时投影、控制手机。

iOS测试不仅限于真机测试，iOS模拟器也可以进行。Mac端上部署完成后还可以提供给同一局域网内的windows上远程连接使用。同时支持airtest图像识别和poco UI检索。

本文介绍iOS自动化测试的部署过程，提供一个简单的测试脚本，列举了iOS测试过程中常见的问题。

2\. 功能支持[¶](about:blank#2 "Permanent link")
-------------------------------------------

*   支持AirtestIDE连接，实时控制 iPhone
*   支持基本操作如启动app、点击、滑动、输入、截图等等操作
*   支持控件检索技术Poco和图像识别
*   自动化脚本录制、一键回放、报告查看等基本功能
*   支持真机或者模拟器

3\. 安装部署[¶](about:blank#3 "Permanent link")
-------------------------------------------

#### 1）ios-Tagent支持情况[¶](about:blank#1ios-tagent "Permanent link")

版本需求：  
\- Mac Xcode ≥ 9.3  
\- iPhone iOS ≥ 9.3  
\- 在 9.3≤iOS≤10时，由于基于旧版xcode SDK，建议使用Xcode 版本≤10.1来启动iOS-Tagent，否则会出现手机截屏不全的问题。

iOS-Tagent项目支持情况如下：

| ios-Tagent | 最低支持 | 最高支持 |
| --- | --- | --- |
| iPhone iOS | 9.3 | 13.5 |
| xcode | 9.3 | 12.1 |

对于高版本的iOS和xcode，尽管我们的iOS-Tagent暂时没能支持；但是我们的AirtestIDE1.2.8及以上版本（即airtest1.1.8及以上版本）已经支持了appium的WebDriverAgent，所以有高版本iiOS测试需求的同学，可以部署appium的WebDriverAgent，然后使用我们的AirtestIDE（或者是airtest库）来连接部署好的iOS进行自动化测试。

#### 2） 部署流程[¶](about:blank#2_1 "Permanent link")

1.  在Mac下载 [iOS-Tagent](https://github.com/AirtestProject/iOS-Tagent) ,使用 Xcode 启动 `Test`, 具体启动过程可参考 https://github.com/AirtestProject/iOS-Tagent 。当Xcode的log窗口输出下图信息的时候，就意味着部署成功了。
    
2.  启动代理，在命令行下执行`iproxy 8100 8100`运行代理后，可以在浏览器打开 http://127.0.0.1:8100/status ，查看iOS设备是否能成功连接。
    

> iproxy是usbmuxd附带的一个小工具，它的作用是将设备的某个端口映射到电脑的某个端口。mac下可以通过brew安装 `brew install usbmuxd`。
> 
> `iproxy 8100 8100` 意思就是将手机的8100端口，映射到电脑的8100端口上。这样我们就能通过访问电脑的8100端口来访问到手机了。

1.  在 AirtestIDE 的设备窗口，输入地址：`http://127.0.0.1:8100` 或 `http://x.x.x.x（MAC IP）:8100`：

![image](https://s2.loli.net/2023/07/10/Vc8zoy9vLQDaqfK.png)

点击`Connect`按钮即可连接iOS设备，如图：

![image](https://airtest.doc.io.netease.com/img_6/ios-airtestIDE.gif)

#### 2） 支持Xcode中的iOS模拟器[¶](about:blank#2-xcodeios "Permanent link")

Xcode中的[iOS Simulator](https://developer.apple.com/library/archive/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html)模拟器部署过程和真机一样，但是可以省略步骤2，不需要另外执行proxy。

当Xcode的log窗口看到下面内容的时候，就可以直接用地址 `http://x.x.x.x:8100` 进行连接了，也就是log里显示出来的`ServerURLHere`中的地址：

```python
    WebDriverAgentRunner-Runner[xxx:xxx] ServerURLHere->http://x.x.x.x:8100<-ServerURLHere

```

#### 3） 支持Windows连接iOS[¶](about:blank#3-windowsios "Permanent link")

我们同样能够在Windows上连接一个远程的iOS设备，但是依然需要有Mac电脑与Xcode环境。首先按照上文的部署教程在Mac上启动iOS-Tagent之后，不再使用iproxy启动代理，而是改用 [wdaproxy](https://github.com/openatx/wdaproxy)。因为`iproxy`只支持本机端口的映射，而`wdaproxy`能够支持远程IP映射，这意味着可以在第二部PC上，通过访问ip的方式访问到Mac电脑上连接的iOS设备。

> 通过`brew install openatx/tap/wdaproxy`安装好wdaproxy
> 
> 使用方法与`iproxy`一致，`wdaproxy 8100 8100`，或者不填写端口也可以，默认将会使用8100：

![image](https://s2.loli.net/2023/07/10/Vc8zoy9vLQDaqfK.png)

或者使用阿里开源的ios自动化测试工具--**tidevice**，可以更便捷实现在Windows上对iOS进行自动化测试，只要确保iOS设备上面已经安装好了**WebDriverAgent**，我们就可以利用tidevice工具在Windows平台上启动该**WebDriverAgent**，实现连接iOS。详细教程可以参看我们的公众号文章[脱离Mac搞iOS自动化，tidevice工具教你轻松实现！](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485577&idx=1&sn=bdc1895134f66c7e106f6cb668d77f13&chksm=f97ce88ace0b619cdd7c18fd698141eebf02086311c331a91ce5dad4a9eb6dee35bf99ce0629&token=1579680795&lang=zh_CN#rd) 。

3\. iOS自动化测试实例[¶](about:blank#3-ios "Permanent link")
-----------------------------------------------------

iOS 的测试和其他设备差不多，支持图像识别和UI检索，下面简单介绍一个iOS测试例子： 1. 连接设备 2. 点击home键 3. 截屏 4. 执行滑动操作 5. 使用poco点击app Safari 6. 使用poco点击浏览器的搜索框，获取焦点 7. 在搜索框输入“airtest” 8. 在搜索页面往下滑动 9. 判断是否存在airtest官网地址

```python
from airtest.core.api import *
from poco.drivers.ios import iosPoco

# 连接设备
auto_setup(__file__)
connect_device("ios:///x.x.x.x:8100")

# 初始化iOS原生poco
poco = iosPoco()
# 点击Home键
keyevent("HOME")
# 截屏
snapshot()
# 滑动操作
swipe(Template(r"tpl1561985939879.png", record_pos=(0.356, -0.174), resolution=(750.0, 1334.0)), vector=[-0.685, 0.0481])

# 点击app Safari
poco("Safari").click()
# 点击浏览器的搜索框
poco("URL").click()
# 输入“airtest”
text("airtest")

# poco的滑动
poco("People also search for").swipe([-0.0541, -0.4206])
# 判断是否存在某个截图目标
exists(Template(r"tpl1560844284543.png", record_pos=(-0.292, 0.688), resolution=(750, 1334)))


```

![image](https://airtest.doc.io.netease.com/img_6/ios-test.gif)

4\. 常见问题[¶](about:blank#4 "Permanent link")
-------------------------------------------

#### 1）如何在模拟器安装应用[¶](about:blank#1_1 "Permanent link")

*   把xx.ipa 改成xx.zip,解压得到xx.app
*   打开模拟器, 在终端运行 `xcrun simctl install booted xx.app`

**tips:** 不可以把真机 app 包安装在iOS模拟器上，真机的app是基于arm的，而模拟器是运行在 X86 指令集上的，强行安装会导致闪退的问题。

#### 2）如何进行iOS多机测试[¶](about:blank#2ios "Permanent link")

目前暂未开放iOS多机测试功能，敬请期待

#### 3）**Api 支持状况**[¶](about:blank#3api "Permanent link")

请注意，iOS设备与Android设备有很大的不同，以下通用的 Airtest 的 API 在iOS上都是支持的： 
- 打开应用 `start_app` ： OK 
- 关闭应用 `stop_app` ： OK 
- 截图 `snapshot` ：OK 
- 点击Home键 `keyevent("HOME")` : OK 
- 点击 `touch` : OK 
- 滑动 `swipe` : OK 
- 输入文本 `text` : OK 
- 等待 `wait` : OK 
- 存在截图目标 `exists` : OK 
- 查找并返回所有结果 `find_all` : OK 
- 断言存在 `assert_exists` : OK 
- 断言不存在 `assert_not_exists` : OK

但是以下API是不支持的： 
- 唤醒设备 `wake` : 暂未支持 (考虑用`home`方法替代) 
- 事件操作 `keyevent` : 只支持`home` 事件 
- 清除应用数据 `clear_app` : 暂未支持 
- 安装应用 `install` : 暂未支持 
- 卸载应用 `uninstall` : 暂未支持
