---
title: Chrome谷歌浏览器安装到其他盘
date: 2023-07-16 14:58:36
tags: [Chrome, Windows]
categories: [Windows]
---

### 前言

_安装Chrome浏览器时，我们会发现该软件会一键自动安装到C盘的问题，本文就此问题提供如何把Chrome浏览器安装到D盘_

**1.确认C:\\Program Files (x86)\\Google\\ 下面没有文件夹Chrome：**

Chrome浏览器的默认安装路径为C:\\Program Files (x86)\\Google\\Chrome，首先先确定 C:\\Program Files (x86)\\Google\\ 下面没有chrome这个文件夹，因为这个要由mklink来创建。而文件夹 D:\\Chrome 要先建立好。

**2.创建 D:\\Chrome文件夹：**

windows系统：符号链接制作命令方法，点击桌面左下角开始菜单，点击运行，输入cmd后确定，在弹出的cmd命令行中输入 mklink /d "C:\\Program Files (x86)\\Google\\Chrome" "D:\\Chrome" 然后回车。

wnidows xp：在命令行里面输入 junction "C:\\Program Files (x86)\\Google\\Chrome" "D:\\Chrome" 然后回车。

![1710284-20200423195730058-999846035.png](https://s2.loli.net/2023/07/16/BC8lwaZ1ntJA4eD.png)

**3.开始安装Chrome浏览器（完成）：**

安装完后进入 D:\\Chrome 文件夹，这个是chrome真正的文件夹，而 C:\\Program Files (x86)\\Google\\Chrome 只是一个映射，不占用c盘空间。

**![1710284-20200423195842540-2090553884.png](https://s2.loli.net/2023/07/16/nZmaoyjOKzJV4gL.png)**

**![1710284-20200423200023704-1480595724.png](https://s2.loli.net/2023/07/16/tywv3N2ker9LOif.png)**

 ![1710284-20200423200033589-916348722.png](https://s2.loli.net/2023/07/16/G9PzIBu68pSgb2K.png)
