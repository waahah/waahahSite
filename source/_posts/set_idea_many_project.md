---
title: 设置IntelliJ IDEA 在同一窗口查看多个项目
date: 2021-08-02 14:58:36
tags: [IDE, IDEA, Java]
categories: [IDE, IDEA]

---

### 前言

idea默认打开项目多个项目是多窗口显示的，这样项目间切换比较麻烦。

本文介绍 IntelliJ IDEA 如何在一个窗口显示多个项目。

首先有两个或多个项目，此处不做说明

下面是第一个项目：

![](https://s2.loli.net/2023/06/11/mhbEXqQjCTJag5Z.webp)

当前窗口只显示一个项目。

操作步骤如下：（可以使用快捷键`Ctrl+Alt+Shift+S`）  
点击File----->`Project Structure`

![](https://s2.loli.net/2023/06/11/1xUnrfHBYLcudgE.webp)

打开项目设置界面，点击选中`Modules`，会看到你的项目信息

![](https://s2.loli.net/2023/06/11/NoAbBGYhtEkJWXQ.webp)

点击`+`号，出现添加模块的窗口，点击`Import Module `

![](https://s2.loli.net/2023/06/11/I6LO9gPK8njrHoy.webp)

弹出项目选择窗口，选择要添加的项目，点击`OK  `

比如说你想要导入Day02这个项目

![](https://s2.loli.net/2023/06/11/uVGQw8dTaMqjt2O.webp)

根据项目实际类型选择向导，Next..Next-> Finish  

![11683282-bce268bb2e26f1a5.webp](https://s2.loli.net/2023/06/11/KIaSXTHz7pvYG3C.webp)

记得勾选  
`Import Maven projects automatically`  
让他自动导入`maven`的依赖。  

![11683282-7c718620d7da81a1.webp](https://s2.loli.net/2023/06/11/XsnbAMhURV8CzPT.webp)

选择finish  

![](https://s2.loli.net/2023/06/11/7iE4xNAR5tOrVCP.webp)


![](https://s2.loli.net/2023/06/11/B8gYFmUtbynRO69.webp)


项目添加成功

![](https://s2.loli.net/2023/06/11/yQtkuSPebhFNzH8.webp)



