---
title: 详解用Eclipse如何创建JavaWeb项目
date: 2021-04-27 14:58:36
tags: [IDE, Eclipse,JavaWeb]
categories: [IDE, Eclipse]
---

###  前言
以前使用MyEclipse已经习惯了，后来改成Eclipse感觉怪怪的。

在创建web项目之前首先配置好jdk环境和tomcat环境(即在开发工具中添加tomcat服务器)

eclipse下载注意：

Java开发下载eclipse不同版本注意：

jdk版本和eclipse版本一致，否则eclipse打开不了。如eclipse和jdk均是64位

eclipse下载选择：Eclispe IDE for Java EE Developers

不同版本在页面右下角“MORE DOWNLOADS”

eclipse不同版本下载最好选择“Mars Packages”或者“Luna Packages”

如果使用Eclipse创建的web想，还是保持MyEclipse一样的项目结构(即发布到tomcat后的项目结构)，

请注意下面新建项目过程。

#### 1、如图1。点击新建Dynamic Web Project选项。

![1](https://s2.loli.net/2023/06/10/SOTzhPZIJVGnHls.png)

#### 2、如图2。注意Dynamic web module version值，我习惯了使用2.5版本，也就是web.xml文件的内容不一样了。

![2](https://s2.loli.net/2023/06/10/BkNwWdYJ5Es9zxA.png)

#### 3、如图3。注意Default output folder目录位置，我习惯了MyEclipse的路径，即WebRoot\\WEB-INF\\classes。

![3](https://s2.loli.net/2023/06/10/mKJCU8awEhoc5px.png)

#### 4、如图4。注意Content directory值：WebRoot。点击finish完成。

![4](https://s2.loli.net/2023/06/10/AScpXFTIlKtb1zZ.png)

#### 5、如图5。看看项目结构和文件位置。

![5](https://s2.loli.net/2023/06/10/aKtscQNI5pOwAlh.png)

#### 总结
以上就是本文的全部内容，希望对大家的学习有所帮助，也希望大家多多支持无名小站。

  