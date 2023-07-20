---
title: 让IDEA像Eclipse一样在一个窗口打开多个项目
date: 2021-08-04 14:58:36
tags: [IDE, IDEA, Java]
categories: [IDE, IDEA]
---

### 前言
在我们刚开始学习java的时候，使用的最多的ide工具就是eclipse，在eclipse中我们可以同时打开多个项目，很方便的在项目之间进行切换，刚开始接触idea的时候，我们发现在一个窗口只能打开一个项目，如果需要打开多个项目就只能打开多个窗口，非常不方便，所以就需要让idea也能支持这样的功能。

开始吧！

相信大家在看到此篇博客之前，应该也在网上搜索了很久，都没有找到可行的解决方案，在这里我先给大家解答下为什么IDEA不提供这样一个功能呢？

在Eclipse中，我们打开的时候，他会让我们指定一个工作空间，这个工作空间里面存放的就是我们后面创建的项目`Project`
IDEA里面没有工作空间的概念，只有项目，因为在IDEA中的项目`Project`其实就是eclipse里面的`workspace`，project下面时`module`，IDEA时这么定义的，一个project下面可以包括多个模块model,所以我们在idea下面可以创建多个模块，每个模块对应一个单独的项目程序。

### 解决问题1：IDEA下多模块开发
#### 1. 创建一个空的项目

![1](https://s2.loli.net/2023/06/11/1TtPV7j86ueNFZl.png)

![2](https://s2.loli.net/2023/06/11/4tTkDWLKcfU69gn.png)

![3](https://s2.loli.net/2023/06/11/sUmLTzkC62tOIbi.png)

![4](https://s2.loli.net/2023/06/11/AZSoLOcpQmEqPW1.png)

#### 2. 到这里后面就是创建普通的项目了，创建完成之后

![5](https://s2.loli.net/2023/06/11/F7sRa5l2dYmBqAK.png)

#### 3. 我们再添加一个模块

![6](https://s2.loli.net/2023/06/11/nuPC1yS7BrXNG2a.png)

![7](https://s2.loli.net/2023/06/11/dBVHq8YgU3hCsPl.png)

#### 4. 点击+号再创建一个模块

![8](https://s2.loli.net/2023/06/11/x6QF3Biy2NChUMG.png)

![9](https://s2.loli.net/2023/06/11/Whyvg1bodrtVDMu.png)

#### 5. 创建完成后，两个模块就创建好了

### 解决问题2:导入再eclipse下创建的空间下的maven项目

#### 1. 首先也是创建一个空的项目，我们再上面的项目基础上进行操作
![10](https://s2.loli.net/2023/06/11/Nsj4W2h8gdOBL1K.png)

#### 2.  注意这里点击+号之后选择的时import module选项，直接依次导入maven项目
![11](https://s2.loli.net/2023/06/11/j9KQno7B3uvOSF8.jpg)

#### 3. 选择自己的项目
![12](https://s2.loli.net/2023/06/11/hDSAvuPcwIWjK4f.png)

![13](https://s2.loli.net/2023/06/11/K6oFYfX9kTMWtEI.png)

![14](https://s2.loli.net/2023/06/11/gVNowKI29etyxqY.png)

![15](https://s2.loli.net/2023/06/11/RP6I3TVoZespcXa.jpg)

![16](https://s2.loli.net/2023/06/11/qZxshXG3oSHO8BP.jpg)

然后重复同样的动作把eclipse下所有的maven项目依次导入