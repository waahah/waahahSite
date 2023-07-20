---
title: Emby Server 搭建你的家庭流媒体服务中心
date: 2023-02-28 14:58:36
tags: [Emby, Linux, Server]
categories: [Coding, PHP]
---

Emby Server 搭建你的家庭流媒体服务中心
======================================

共1019个字

#### 目 录

*   [准备工作](#title-0 "准备工作")
*   [Emby 服务端下载](#title-1 "Emby 服务端下载")
*   [搭建 Emby 服务端](#title-2 "搭建 Emby 服务端")
*   [测试 Emby](#title-3 "测试 Emby")
*   [进阶](#title-4 "进阶")
*    [体验地址：](#title-5 " 体验地址：")

![](https://s2.loli.net/2023/07/12/IFExoqK7z32DM9a.jpg)

Emby Server 部署服务端**非常简单**，只需要简单的几个步骤就可以搭建属于我们自己的家庭流媒体中心

Windows 7_64位系统下安装

准备工作
----

*   一台设备作为服务端。这台设备可以是以下的任意一种：
    *   闲置的**笔记本**
    *   闲置的**PC**（支持**Windows**、**Linux**以及**Mac**系统）
    *   **NAS**设备
    *   支持**Docker**的设备
*   局域网（服务端以及客户端位于同一局域网）。  
    若当地运营商提供了公网（外网）地址，Emby Serve 开启**公网访问**选项后，也可以通过公网访问服务端。若运营商没提供公网地址，又想通过公网访问服务端，那只能做**内网穿透**

Emby 服务端下载
----------

*   百度网盘只提供**Win系统64位**的下载地址：  
    [https://pan.baidu.com/s/1-9eXhaxJeEeLCINTCqhpYw](https://pan.baidu.com/s/1-9eXhaxJeEeLCINTCqhpYw)提取码：g3zy
*   **其它操作系统**请访问官网下载：  
    [https://emby.media/download.html](https://emby.media/download.html)

搭建 Emby 服务端
-----------

1.解压缩百度网盘提供的绿色版文件后，从 System 子文件夹中，运行 EmbyServer.exe

![1585292191-92eb5ffee6ae2fe.png](https://s2.loli.net/2023/07/12/86VqXGF3W7QsoYZ.png)

2.右键任务栏上出现的绿色小图标，选择**Configure Emby**。若出现“Emby Server is loading.”，则等一小会，再刷新该页面

![](https://s2.loli.net/2023/07/12/OlWR1ILryAP5nJj.png)

3.进入初始化页面后，选择语言为中文**Chinese Simplified**。点击下一步

![1585292270-8277e0910d75019.png](https://s2.loli.net/2023/07/12/3CQHv4dMimYtfpG.png)

4.该页面填写**用户信息**，默认值也可以。直接点击下一步

![](https://s2.loli.net/2023/07/12/aEeqiF8uBkYNTvy.png)

5.这一步**添加媒体库**是最关键的一步，选择**Add Media Library**

![](https://s2.loli.net/2023/07/12/DQwLJjRcAprKt2d.png)

6.添加媒体库的设置，按着下面图片的提示进行填写就可以了。点击确定后再点击下一步

![](https://s2.loli.net/2023/07/12/U4JCdyGLtv8QW1K.png)

![](https://s2.loli.net/2023/07/12/w6fIUCGHc7eJOEP.png)

![1585292563-8ce4b16b22b5889.png](https://s2.loli.net/2023/07/12/NhoImOZ7p2iVQ1B.png)

7.这一步还是设置元数据的首选语言，选中文就行

![1585292798-6f8f57715090da2.png](https://s2.loli.net/2023/07/12/n9MmTdRN7yYZ2h8.png)

8.这一步设置远程访问，有公网的可以都开启。没公网的可通过内网穿透（百度）方式访问

![1585292682-7b774effe4a349c.png](https://s2.loli.net/2023/07/12/8GSNp5C3UOjJeXV.png)

9.最后一步就是同意 Emby 协议的页面了，打上勾勾直接下一步就可以

![1585292683-03c7c0ace395d80.png](https://s2.loli.net/2023/07/12/GvBaxUNFhR2j5qy.png)

10.最后到达**管理页面**，可以看到我们公网和内网的ip信息。局域网客户端直接输入**内网地址:端口号**即可访问 Emby 流媒体

![1585292973-c4ca4238a0b9238.png](https://s2.loli.net/2023/07/12/ug9fHZGEaq3vOwP.png)

测试 Emby
-------

*   服务端（本机）测试：[http://localhost:8096](http://localhost:8096)

![1585293019-c81e728d9d4c2f6.png](https://s2.loli.net/2023/07/12/pTUBhizmj5dJoIs.png)

*   客户端（iphone）测试：[http://10.144.212.177:8096/](http://10.144.212.177:8096/)

![1585293034-eccbc87e4b5ce2f-731x1536.png](https://s2.loli.net/2023/07/12/mh7XNTnDFxJ24q6.png)

进阶
--

*   管理页面中，有很多选项具有高级功能，包括添加用户，控制用户权限，DLNA等功能。可自行尝试

![1585293114-a87ff679a2f3e71.png](https://s2.loli.net/2023/07/12/JluhvX45MTWP7e6.png)

*   客户端可以直接通过 Web 访问媒体库，同时，官方也提供了**各种平台的客户端APP**

![1585293131-e4da3b7fbbce234-2048x1006.png](https://s2.loli.net/2023/07/12/6tz8gueqUVcn1IS.png)

立即提取：
------

- [emby](https://www.rosnas.com/tag/emby/) 
- [教程](https://www.rosnas.com/tag/%e6%95%99%e7%a8%8b/)


