---
title: Spider-Appium的安装
date: 2022-02-10 14:58:36
tags: [Python, Appium, Spider]
categories: [Coding, Python]

---

Appium的安装
===================================

本文字数： 2.2k 阅读时长 ≈ 12 分钟

Appium是移动端的自动化测试工具，类似于前面所说的Selenium，利用它可以驱动Android、iOS等设备完成自动化测试，比如模拟点击、滑动、输入等操作，其官方网站为：http://appium.io/。本节中，我们就来了解一下Appium的安装方式。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   GitHub：<https://github.com/appium/appium>
*   官方网站：<http://appium.io>
*   官方文档：<http://appium.io/introduction.html>
*   下载链接：<https://github.com/appium/appium-desktop/releases>
*   Python Client：<https://github.com/appium/python-client>

[](about:blank#2-%E5%AE%89%E8%A3%85Appium "2. 安装Appium")2\. 安装Appium
--------------------------------------------------------------------

首先，需要安装Appium。Appium负责驱动移动端来完成一系列操作，对于iOS设备来说，它使用苹果的UIAutomation来实现驱动；对于Android来说，它使用UIAutomator和Selendroid来实现驱动。

同时Appium也相当于一个服务器，我们可以向它发送一些操作指令，它会根据不同的指令对移动设备进行驱动，以完成不同的动作。

安装Appium有两种方式，一种是直接下载安装包Appium Desktop来安装，另一种是通过Node.js来安装，下面我们介绍一下这两种安装方式。

### [](about:blank#Appium-Desktop "Appium Desktop")Appium Desktop

Appium Desktop支持全平台的安装，我们直接从GitHub的Releases里面安装即可，链接为<https://github.com/appium/appium-desktop/releases>。目前的最新版本是1.1，下载页面如图1-71所示。

![](https://s2.loli.net/2023/07/05/OD76yNqZMfQKYwe.jpg)图1-71 下载页面

Windows平台可以下载exe安装包appium-desktop-Setup-1.1.0.exe，Mac平台可以下载dmg安装包如appium-desktop-1.1.0.dmg，Linux平台可以选择下载源码，但是更推荐用Node.js安装方式。

安装完成后运行，看到的页面如图1-72所示。

![](https://s2.loli.net/2023/07/05/5BL17P8tjmKd3NW.jpg)图1-72 运行页面

如果出现此页面，则证明安装成功。

### [](about:blank#Node-js "Node.js")Node.js

首先需要安装Node.js，具体的安装方式可以参见<http://www.runoob.com/nodejs/nodejs-install-setup.html>，安装完成之后就可以使用`npm`命令了。

接下来，使用`npm`命令全局安装Appium即可：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">npm <span class="keyword">install</span> -g appium</span><br></pre></td></tr></tbody></table>

此时等待命令执行完成即可，这样就成功安装了Appium。

[](about:blank#3-Android%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE "3. Android开发环境配置")3\. Android开发环境配置
-------------------------------------------------------------------------------------------------------------------

如果我们要使用Android设备做App抓取的话，还需要下载和配置Android SDK，这里推荐直接安装Android Studio，其下载地址为<https://developer.android.com/studio/index.html?hl=zh-cn>。下载后直接安装即可。

然后，我们还需要下载Android SDK。直接打开首选项里面的Android SDK设置页面，勾选要安装的SDK版本，点击OK按钮即可下载和安装勾选的SDK版本，如图1-73所示。

![](https://s2.loli.net/2023/07/05/KueR1T5qVObvZg3.jpg)图1-73 Android SDK设置页面

另外，还需要配置一下环境变量，添加ANDROID\_HOME为Android SDK所在路径，然后再添加SDK文件夹下的tools和platform-tools文件夹到PATH中。

更详细的配置可以参考Android Studio的官方文档：<https://developer.android.com/studio/intro/index.html>。

[](about:blank#4-iOS%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83 "4. iOS开发环境")4\. iOS开发环境
---------------------------------------------------------------------------------

首先需要声明的是，Appium是一个做自动化测试的工具，用它来测试我们自己开发的App是完全没问题的，因为它携带的是开发证书（Development Certificate）。但如果我们想拿iOS设备来做数据爬取的话，那又是另外一回事了。一般情况下，我们做数据爬取都是使用现有的App，在iOS上一般都是通过App Store下载的，它携带的是分发证书（Distribution Certificate），而携带这种证书的应用都是禁止被测试的，所以只有获取ipa安装包再重新签名之后才可以被Appium测试，具体的方法这里不再展开阐述。

这里推荐直接使用Android来进行测试。如果你可以完成上述重签名操作，那么可以参考如下内容配置iOS开发环境。

Appium驱动iOS设备必须要在Mac下进行，Windows和Linux平台是无法完成的，所以下面介绍一下Mac平台的相关配置。

Mac平台需要的配置如下：

*   macOS 10.12及更高版本
*   XCode 8及更高版本

配置满足要求之后，执行如下命令即可配置开发依赖的一些库和工具：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">xcode-<span class="keyword">select</span> <span class="comment">--install</span></span><br></pre></td></tr></tbody></table>

这样iOS部分的开发环境就配置完成了，我们就可以用iOS模拟器来进行测试和数据抓取了。

如果想要用真机进行测试和数据抓取，还需要额外配置其他环境，具体可以参考<https://github.com/appium/appium/blob/master/docs/en/appium-setup/real-devices-ios.md>。

[](about:blank#5-Python-%E9%A9%B1%E5%8A%A8 "5. Python 驱动")5\. Python 驱动
-----------------------------------------------------------------------

另外还需要安装 Python 驱动，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">pip3 <span class="keyword">install</span> appium-python-<span class="keyword">client</span></span><br></pre></td></tr></tbody></table>
