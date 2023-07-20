---
title: 如何查看Chrome扩展的源代码, Chrome扩展二次开发
date: 2023-08-27 14:58:36
tags: [JavaScript, Extensions, Chrome]
categories: [Coding, JavaScript]
---

如何查看chrome扩展的源代码, chrome扩展二次开发
==============================

1.   在chrome浏览器地址栏里输入 chrome://extensions/  打开扩展页面
        
    ![](https://s2.loli.net/2023/07/19/joRJaqLDM3ge7CZ.png)
    
2.  记录要查看的扩展的ID
    ![2 _2_.png](https://s2.loli.net/2023/07/19/MEsvJuq3ZrTFtBl.png)

3.  在地址栏输入 chrome://version/ 找到 配置文件路径 这一项。将路径拷贝
    ![3 _2_.png](https://s2.loli.net/2023/07/19/lBREGozOyshZPbd.png)

    *   在Ubuntu下，**~/.config/google-chrome/Default/Extensions/xxxx**
    *   在Windows7下，**C:Users<username>AppDataLocalGoogleChromeUser DataDefaultExtensionsxxxx”**
    *   一般是上面的地址
4.  将上面拷贝的路径输入资源管理器的地址栏，进入Extensions目录

![](https://s2.loli.net/2023/07/19/mNoMPB8fhnCXZtc.png)

5.  进入目录名是扩展ID 的那个目录[  

![](https://s2.loli.net/2023/07/19/7At6a4ps2GLeP3C.png)

6.  进入版本目录

![](https://s2.loli.net/2023/07/19/cwJ3H8kLjQzhP2N.png)
    
7.  看到源码了

![](https://s2.loli.net/2023/07/19/tYCSp5ZJNeIOGLQ.png)
    

以上是手动方法，下面有安装专门插件的方法：
=====================

一切都是需求驱动的
=========

话说某天我在网上猎奇的时候无意间发现这么一款神奇的谷歌浏览器插件：[Extension Source Locator](https://chrome.google.com/webstore/detail/extension-source-locator/cmhbfegjgncgaikpopenldnaidbhdopp)。翻译成大中华语意思大概是扩展程序源码定位器！

![](https://s2.loli.net/2023/07/19/RZHO3FUwkXg8Dob.png)

它是干什么的呢，根据被翻译过来的不太准确的大中华语可以大概知道这玩意儿可以定位到一个你已经在谷歌浏览器上安装了的扩展程序的源码，或者说源文件 ，在你电脑磁盘的哪个地方。

这当然没什么神奇的了，你或许说我可以通过上网查查就知道谷歌浏览器扩展程序安装后与之相关的文件在磁盘什么地方了。但有了它使我们更加方便地定位到源文件所在文件夹。

更重要的是它让我意识到我可以修改一些我喜欢的扩展程序，让其更加适合自己的使用。

因为很多时候我会碰到这种情况，遇到一个扩展，装上之后非常喜欢，用段时间后觉得有些地方如果能这样，那就更好了。如果能那样，那这个插件就完美了,etc.

这个时候，第一反应还是乖乖的去该插件的评论页面给作者提建议，并且一个插件里的评论大部分确实是这样的建设性意见：如果怎么怎么着我就给你打五分。。。。

大家都知道，作者一般很忙，往往会把用户这些无趣的需求置之不理。

作为程序员的我，当然知道自己动手方能丰衣足食。

安装Extension Source Locator插件，不装其实也可以
====================================

[Extension Source Locator](https://chrome.google.com/webstore/detail/extension-source-locator/cmhbfegjgncgaikpopenldnaidbhdopp)安装页面在[Google Web Store](https://chrome.google.com/webstore/detail/extension-source-locator/cmhbfegjgncgaikpopenldnaidbhdopp)，的盆友们可以前往安装。

![](https://s2.loli.net/2023/07/19/6EvYr93F5LHKDoh.png)

装好之后你再打开一个空的页面时，页面应该呈现的是这样的画面了：

![](https://s2.loli.net/2023/07/19/q3acSe85KM9n7Yk.png)

**如何使用：**

使用过程当然是点击”Copy to clipboard” 按扭。这个页面还有任何其他按扭么一\_一!!

点击后得到一个插件的文件夹地址，将其粘贴到Windows 资源管理器的地址栏中，轻击回车，你就来到了这个一谷歌浏览器扩展程序的源文件存放的地方了。

比如上面截图的的Google+ 这个扩展程序。

![](https://s2.loli.net/2023/07/19/bFqKlCgMsPoEThv.png)

点开该1.2.0.418_0文件夹，里面存放了Google+ 这个扩展程序相关的源文件。

