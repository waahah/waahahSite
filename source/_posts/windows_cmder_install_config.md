---
title: Windows下Cmder 安装及配置
date: 2022-09-28 14:58:36
tags: [Cmder, Windows]
categories: [Windows]
---

### 前言

Windows现代终端命令行神器`Cmder`安装及配置

**目录**

[1.下载](about:blank#1.%E4%B8%8B%E8%BD%BD "1.下载")

[2.安装](about:blank#2.%E5%AE%89%E8%A3%85 "2.安装")

[3.添加环境变量](about:blank#3.%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F "3.添加环境变量")

[4.添加到右键菜单](about:blank#%C2%A04.%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95 "4.添加到右键菜单")

[5.中文乱码问题](about:blank#%C2%A05.%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98 "5.中文乱码问题")

[6.修改自带命令提示符](about:blank#%C2%A06.%E4%BF%AE%E6%94%B9%E8%87%AA%E5%B8%A6%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6 "6.修改自带命令提示符")

* * *

1.下载
====

**官网下载地址：[http://cmder.net/](https://links.jianshu.com/go?to=http%3A%2F%2Fcmder.net%2F "http://cmder.net/")**

**github下载地址：**[https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder "https://github.com/cmderdev/cmder") 

2.安装
====

下载完之后直接把压缩包解压，放到自己电脑的某个目录下。

3.添加环境变量
========

 此电脑---属性----高级系统设置

![](https://s2.loli.net/2023/07/09/ICerKXoJh5NbdnM.png)

![](https://s2.loli.net/2023/07/09/DIAHZfat6kyqWdh.png)

![b3b3db36210249fc9c9230a23415f23f.png](https://s2.loli.net/2023/07/09/ZSW9hCgbk3lmjTO.png)

4.添加到右键菜单
=========

切换到`cmder`安装目录，以管理员运行cmd，输入 `Cmder.exe /REGISTER ALL`

5.中文乱码问题
========

点击软件右下角的三道横线，选择`setting`。

然后添加

```ini
setLANG=zh_CN.UTF-8
```

![](https://s2.loli.net/2023/07/09/MXEGtji8Cow4RBL.png)

6.**修改自带命令提示符**
===============

在软件的解压目录的cmder\\vendor中的clink.lua内做如下修改"λ"替换成"$"

![](https://s2.loli.net/2023/07/09/EhfSNcx2gPXotiY.png)
