---
title: 介绍一个”牛逼闪闪”开源库：ja-netfilter
date: 2021-12-12 14:58:36
tags: [Jetbrains, Javaagent]
categories: [IDE, IDEA]

---

 ### 前言

介绍一个”牛逼闪闪”开源库：ja-netfilter
==========================

上来先说点题外话，很多人最新说开源项目`IDE Eval Resetter`不好用了。我就问他为什么不好用了，不好编译了吗？他说不是，是不能在IDE上重置了。我心说，这是个学习研究项目，重在学习插件写法，不能用也实在属于正常。于是我去测试了一下，得出了个结论：`2021.2.2`及以下版本很好用；`2021.3`以下（不含）堪堪能用，需要配合一些手法；`2021.3`版本开始正式失效，你可以卸载这个插件了！

所以没错，`IDE Eval Resetter`这个项目我已经弃坑，因为我觉得我插件已经写得很好了（手动狗头，以下很多用词默认手动加了**狗头**），得玩点其他好玩的东西。

这次要来玩个正经的、通用的、高大上的东西。

0x0. 项目背景
---------

首先还是基于上述内容。

我们日常使用的软件中有很多有意或无意被加入网络访问的代码。有些并非恶意，有些则是。  
并非恶意的像一些软件的在线激活验证，如`dbeaver`、`smartgit`等。  
恶意的像有些软件本身就有盗取用户隐私数据的情况，有些软件则是被一些别有用心的人二次加工放入偷取用户数据的代码。

我们通常会使用防火墙来阻断这些软件的恶意访问。但防火墙也不是万能的，比如：跨平台问题、`https`下无法精准阻断某个url访问、部分防火墙不能阻断dns访问。  
于是就有了我今天开源的这个项目：通用的、针对`java`程序的、灵活的、精准基于规则的、基于`AOP`思想的牛逼哄哄防火墙（无数狗头）：`ja-netfilter`！

0x1. 如何安装
---------

### 1). 下载安装：

*   直接到[项目仓库](https://gitee.com/ja-netfilter/ja-netfilter)的[Releases](https://gitee.com/ja-netfilter/ja-netfilter/releases)页面下载我打包好的文件包。
*   按照项目`README.md`所写的方式来配置`-javaagent`参数。某些软件像`dbeaver`和`smartgit`等软件都支持直接编辑配置文件来配置，你可以参考我之前写的agent帮助文件来配置，这里不赘述。
*   编辑`config`目录下的对应配置文件，配置希望阻断的规则。具体见下面的配置文件部分。

### 1). 编译安装：

*   直接到[项目仓库](https://gitee.com/ja-netfilter/ja-netfilter)页面下载源文件，编译出目标`jar`文件即可。
*   同`下载安装`部分。

0x2. 如何使用
---------

*   按照上述安装配置好后直接启动目标程序即可。
*   你甚至能跟你的`tomcat`或`jetty`一起使用，来防止你项目依赖包中的一些恶意请求。

0x3. 如何更新
---------

*   关注上述的开源项目即可获取最新的代码和编译好的包。

0x4. 配置文件
---------

*   在`ja-netfilter.jar`同目录中有个`conf`文件夹，其内存放了所有插件的配置文件，命名为：`插件名(小写).conf`
*   至于配置文件的编写，项目帮助文档中已经写出，这里不再重复说明了。只是简单列举几个例子：

```
# DBEaver 阻断激活验证的 url.conf 配置文件

[URL]
PREFIX,https://dbeaver.com/lmp/checkLicense


```
```
# SmartGit 的 url.conf 配置文件

[URL]
PREFIX,https://store.smartgit.com/check


```
```
# jb 的 dns.conf 配置文件

[DNS]
EQUAL,jetbrains.com


```
```
# jb 的 url.conf 配置文件

[URL]
PREFIX,https://account.jetbrains.com/lservice/rpc/validateKey.action


```

0x5. 开源信息
---------

*   插件是学习研究项目，源代码是开放的。源码仓库地址：[ja-netfilter](https://gitee.com/ja-netfilter/ja-netfilter)。
*   这是个通用的软件包，配置文件灵活自由，**请不要过度想象**。
*   请不要试图结合[IDE Eval Resetter](https://zhile.io/2020/11/18/jetbrains-eval-reset-deprecated.html)一文中所说[热心大佬](https://jetbra.in/s)的`key`来使用本项目。赶快入正！赶快入正！赶快入正！
*   如果你有更好的想法，欢迎给我提`Pull Request`来共同研究完善。
*   插件源码使用：`GPL-3.0`开源协议发布。
*   插件使用`PHP`编写，毕竟`PHP`是世界上最好的编程语言！
*   Telegram group: [ja-netfilter](https://t.me/ja_netfilter_group)
*   Telegram channel: [ja-netfilter channel](https://t.me/ja_netfilter_channel)
*   QQ Group: 638451028

0x6. 支持的产品
----------

*   本防火墙基于`javaagent`，所以目前只有基于`java`的程序能够使用。更通用的防火墙，等我学习更多知识。

0x7. 插件机制
---------

*   新版本`ja-netfilter`已经支持插件机制，各位可以给它开发各种各样有趣的插件了。
*   插件开发请见这个[脚手架项目](https://gitee.com/ja-netfilter/ja-netfilter-sample-plugin)。
*   插件丢进`ja-netfilter.jar`所在的`plugins`子目录即可加载。
*   [Power插件应用：搞定YouTrack和Upsource](https://zhile.io/2022/01/13/youtrack-upsource-hub-via-power.html)

* * *

**下面是国际惯例：**

> 本项目只做个人学习研究之用，不得用于商业用途！

