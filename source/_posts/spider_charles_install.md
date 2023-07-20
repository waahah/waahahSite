---
title: Spider-Charles的安装
date: 2022-01-02 14:58:36
tags: [Python, Charles, Spider]
categories: [Coding, Python]

---

Charles的安装
====================================

本文字数： 2.1k 阅读时长 ≈ 12 分钟

Charles是一个网络抓包工具，相比Fiddler，其功能更为强大，而且跨平台支持得更好，所以这里选用它来作为主要的移动端抓包工具。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   官方网站：<https://www.charlesproxy.com>
*   下载链接：<https://www.charlesproxy.com/download>

[](about:blank#2-%E4%B8%8B%E8%BD%BDCharles "2. 下载Charles")2\. 下载Charles
-----------------------------------------------------------------------

我们可以在官网下载最新的稳定版本，如图1-43所示。可以发现，它支持Windows、Linux和Mac三大平台。

![](https://s2.loli.net/2023/07/05/MrcQp3mW6jZPBTd.jpg)图1-43 Charles下载页面

直接点击对应的安装包下载即可，具体的安装过程这里不再赘述。

Charles是收费软件，不过可以免费试用30天。如果试用期过了，其实还可以试用，不过每次试用不能超过30分钟，启动有10秒的延时，但是完整的软件功能还是可以使用的，所以还算比较友好。

[](about:blank#3-%E8%AF%81%E4%B9%A6%E9%85%8D%E7%BD%AE "3. 证书配置")3\. 证书配置
------------------------------------------------------------------------

现在很多页面都在向HTTPS方向发展，HTTPS通信协议应用得越来越广泛。如果一个App通信应用了HTTPS协议，那么它通信的数据都会是被加密的，常规的截包方法是无法识别请求内部的数据的。

安装完成后，如果我们想要做HTTPS抓包的话，那么还需要配置一下相关SSL证书。接下来，我们再看看各个平台下的证书配置过程。

Charles是运行在PC端的，我们要抓取的是App端的数据，所以要在PC和手机端都安装证书。

### [](about:blank#Windows "Windows")Windows

如果你的PC是Windows系统，可以按照下面的操作进行证书配置。

首先打开Charles，点击Help→SSL Proxying→Install Charles Root Certificate，即可进入证书的安装页面，如图1-44所示。

![](https://s2.loli.net/2023/07/05/m8oEAKBSbtR4zMp.jpg)图1-44 证书安装页面入口

接下来，会弹出一个安装证书的页面，如图1-45 所示。

![](https://s2.loli.net/2023/07/05/ReY6Zwn1bWi2myl.jpg)图1-45 证书安装页面

点击“安装证书”按钮，就会打开证书导入向导，如图1-46所示。

![1-46.jpg](https://s2.loli.net/2023/07/05/fxEjLQGnBuKitTM.jpg)图1-46 证书导入向导

直接点击“下一步”按钮，此时需要选择证书的存储区域，点击第二个选项“将所有的证书放入下列存储”，然后点击“浏览”按钮，从中选择证书存储位置为“受信任的根证书颁发机构”，再点击“确定”按钮，然后点击“下一步”按钮，如图1-47所示。

![1-47.jpg](https://s2.loli.net/2023/07/05/Io2tPsHJe7XYbrQ.jpg)图1-47 选择证书存储区域

再继续点击“下一步”按钮完成导入。

### [](about:blank#Mac "Mac")Mac

如果你的PC是Mac系统，可以按照下面的操作进行证书配置。

同样是点击Help→SSL Proxying→Install Charles Root Certificate，即可进入证书的安装页面。

接下来，找到Charles的证书并双击，将“信任”设置为“始终信任”即可，如图1-48所示。

![1-48.jpg](https://s2.loli.net/2023/07/05/mrenLkN9Pt5D2cY.jpg)图1-48 证书配置

这样就成功安装了证书。

### [](about:blank#iOS "iOS")iOS

如果你的手机是iOS系统，可以按照下面的操作进行证书配置。

首先，查看电脑的Charles代理是否开启，具体操作是点击Proxy→Proxy Settings，打开代理设置页面，确保当前的HTTP代理是开启的，如图1-49所示。这里的代理端口为8888，也可以自行修改。

![1-49.png](https://s2.loli.net/2023/07/05/UZH1tMdXJkA5rjO.png)图1-49 代理设置

接下来，将手机和电脑连在同一个局域网下。例如，当前电脑的IP为192.168.1.76，那么首先设置手机的代理为192.168.1.76:8888，如图1-50所示。

![1-50.jpg](https://s2.loli.net/2023/07/05/KXZTQ87LRSFqk3v.jpg)图1-50 代理设置

设置完毕后，电脑上会出现一个提示窗口，询问是否信任此设备，如图1-51所示。

![1-51.png](https://s2.loli.net/2023/07/05/swrz736tJWoKg1a.png)图1-51 提示窗口

此时点击Allow按钮即可。这样手机就和PC连在同一个局域网内了，而且设置了Charles的代理，即Charles可以抓取到流经App的数据包了。

接下来，再安装Charles的HTTPS证书。

在电脑上打开Help→SSL Proxying→Install Charles Root Certificate on a Mobile Device or Remote Browser，如图1-52所示。

![1-52.jpg](https://s2.loli.net/2023/07/05/2shYI3kS4cuPpLd.jpg)图1-52 证书安装页面入口

此时会看到如图1-53所示的提示。

![1-53.png](https://s2.loli.net/2023/07/05/6ZqXYFp2WjLsmEl.png)图1-53 提示窗口

它提示我们在手机上设置好Charles的代理（刚才已经设置好了），然后在手机浏览器中打开chls.pro/ssl下载证书。

在手机上打开chls.pro/ssl后，便会弹出证书的安装页面，如图1-54所示：

![1-54.jpg](https://s2.loli.net/2023/07/05/IjWmyMieqOfZpUs.jpg)图1-54 证书安装页面

点击“安装”按钮，然后输入密码即可完成安装，如图1-55所示。

![1-55.jpg](https://s2.loli.net/2023/07/05/r4KoQZPEkGq5X2m.jpg)图1-55 安装成功页面

如果你的iOS版本是10.3以下的话，信任CA证书的流程就已经完成了。

如果你的iOS版本是10.3及以上，还需要在“设置”→“通用”→“关于本机”→“证书信任设置”中将证书的完全信任开关打开，如图1-56所示。

![1-56.jpg](https://s2.loli.net/2023/07/05/IYPcfyLuDdVTCpr.jpg)图1-56 证书信任设置

### [](about:blank#Android "Android")Android

如果你的手机是Android系统，可以按照下面的操作进行证书配置。

在Android系统中，同样需要设置代理为Charles的代理，如图1-57所示。

![1-57.jpg](https://s2.loli.net/2023/07/05/4RJXfi3NLo9c1Ix.jpg)图1-57 代理设置

设置完毕后，电脑上就会出现一个提示窗口，询问是否信任此设备，如图1-51所示，此时直接点击Allow按钮即可。

接下来，像iOS设备那样，在手机浏览器上打开chls.pro/ssl，这时会出现一个提示框，如图1-58所示。

![](https://s2.loli.net/2023/07/05/swrz736tJWoKg1a.png)图1-58 证书安装页面

我们为证书添加一个名称，然后点击“确定”按钮即可完成证书的安装。
