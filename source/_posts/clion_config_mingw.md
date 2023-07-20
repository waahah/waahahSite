---
title: CLion配置MinGW编译器
date: 2023-07-31 14:58:36
tags: [C++, CLion, Test]
categories: [Coding, C++]
---

### 前言

这里使用**MinGW**作为C语言的开发环境。

1、下载MinGW
---------

下载地址：[MinGW-w64 - for 32 and 64 bit Windows download | SourceForge.net](https://sourceforge.net/projects/mingw-w64/ "MinGW-w64 - for 32 and 64 bit Windows download | SourceForge.net")

好像用一般的网络下载比较慢，[点击这里](https://download.csdn.net/download/WwLK123/86510068 "点击这里")直接下载我下载好的MinGW，不需要积分和VIP，直接下载即可。

进入到MinGW下载网址之后，点击Files

![aef982aa03e0428d91cac053a0dbf18c.png](https://s2.loli.net/2023/07/17/PKvFzn87wGcDQ4U.png)

然后下拉找到如下文件 ，选择下载GCC-8.1.0即可。

![d5b4b6d29e9245fc9f5143f9e2831dd1.png](https://s2.loli.net/2023/07/17/ZIaF6muPBAjQJTL.png)

2、配置环境变量
--------

把上一步下载好的文件解压放到指定目录，然后配置环境变量，找到Path把MinGW的bin目录添加进去

![78e8acac9f62430194b63eca6d03518f.png](https://s2.loli.net/2023/07/17/kMNGxYSwHnoI1ec.png)

打开cmd，检查MinGW是否安装成功，输入命令**gcc -v**，最后一行打印出版本号即安装成功。 

![f806031c67e1477796c17aee642801a2.png](https://s2.loli.net/2023/07/17/kNYEFTopq6y2c8K.png)

3、CLion配置MinGW
--------------

打开CLion的设置

![1cef06a0950f4f0fb843fdac287d82a0.png](https://s2.loli.net/2023/07/17/2TMFqmaGepLdRPr.png)

找到你的MinGW的文件路径即可，只需要选择MinGW之后，对应的其他选项会自动配置好。

然后创建一个新的C程序，点击File->New Project

![8704ca87e1144be4b0f516e78b58c0a8.png](https://s2.loli.net/2023/07/17/xomaVBZsXGvbJwr.png)

 点击运行按钮，可以看到第一个C语言程序运行成功 

![8446bfcea4c64331970b30689b40a80b.png](https://s2.loli.net/2023/07/17/euxkSOTsoAWbdIU.png)