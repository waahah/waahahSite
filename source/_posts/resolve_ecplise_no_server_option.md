---
title: 解决Eclipse没有Server选项
date: 2021-10-06 14:58:36
tags: [Eclipse, Java, Server]
categories: [IDE, Eclipse]


---

### 前言

Eclipse是一个开放源代码的、基于java的可扩展开发平台。它使用频率十分高，然而当使用它部署项目时候，经常会发现一个重要的问题就是打开eclipse之后没有了server选项，那么该怎么解决这个问题呢？今天小编分享一下如何找回server选项，希望能够帮到大家。



### 工具/环境


*   Eclipse

### 方法/步骤


1.   第一步、在eclipse菜单“Help”中选择“`InstallNew Software`”如下图所示。

![](https://s2.loli.net/2023/07/02/8lp5ROPeQx4uWdL.webp)

2. 第二步、然后在Work with中点击Add，如下图所示，加入Name=="Kepler" repository；Location==http://download.eclipse.org/releases/kepler。

![](https://s2.loli.net/2023/07/02/JvVnDRtsfqAG5gb.webp)

3. 第三步、再点击`Add`按钮，找到选项“`Web,XML, Java EE and OSGi Enterprise Development`”选项下“`JST Server AdaptersExtensions`”，进行勾选。然后点击下一步`Next`按钮。

![](https://s2.loli.net/2023/07/02/Ytjgbd9aRBmFu74.webp)

![](https://s2.loli.net/2023/07/02/Mxa9U1OjlfNqPsJ.webp)

![](https://s2.loli.net/2023/07/02/3wKN7Rm9ZLdtiC5.webp)

4. 第四步、再点击一下`Next`按钮，会进入如下界面，然后点击接受协议，再点击`Finish`按钮完成即可。

![](https://s2.loli.net/2023/07/02/fSFxbaIRBrhP3XW.webp)

5. 第五步、然后再下载依赖，等加载完成以后，点击`Restart Now`按钮，重启eclipse软件。会发现已经有了`Sever`选项，就可以正常使用了哦。

![5c2a1ad149299a88700aa65167eeadbcbf2f7fad.webp](https://s2.loli.net/2023/07/02/P8fNGde2tpD7TJE.webp)

END