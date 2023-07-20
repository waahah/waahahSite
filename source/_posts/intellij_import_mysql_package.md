---
title: Intellij导入MySQL的驱动包
date: 2021-10-22 14:58:36
tags: [IDEA, Java, MySQL]
categories: [IDE, IDEA]

---

### 前言

intellij导入MySQL的驱动包

1、下载zip格式的驱动包：<https://dev.mysql.com/downloads/connector/j/>

![](https://s2.loli.net/2023/07/02/zwBx52dVnGRm6pe.jpg)

2、解压zip，在`WEB-INF`下创建一个`lib`文件夹，将驱动放到lib文件夹内【`mysql-connector-java.jar`文件就是驱动】。

![](https://s2.loli.net/2023/07/02/7k4w3Mnh6foWcd9.png)

3、打开你的idea工程，File->Project Structure->Modules，选中<Module source，点击右侧的＋号，选第一个`JARs or directories`，选择l你项目下的`lib`文件夹

![](https://s2.loli.net/2023/07/02/6wChaLAT7Q4H2KX.png)

 点击`OK`。查看你的`External Libraries`。

![](https://s2.loli.net/2023/07/02/VcSzEHvRjuUdhKw.png)

返回，查看驱动有无“>”，有就是配置完成了，无，则配置失败了

![](https://s2.loli.net/2023/07/02/zRTBLtd9fwyMpvN.png)

PS：这样的方法以后的驱动都直接放入`lib`下就可以了，不用在配置了

