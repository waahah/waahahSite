---
title: 为Eclipse和IDEA配置tomcat服务器的方法
date: 2021-04-23 14:58:36
tags: [IDE, Eclipse,IDEA]
categories: [IDE, Eclipse]
---

为eclipse和IDEA配置tomcat服务器的方法 
===========================

### 前言
这篇文章主要介绍了为eclipse和IDEA配置tomcat服务器的方法，本文给大家介绍的非常详细，对大家的学习或工作具有一定的参考借鉴价值,需要的朋友可以参考下

**tomcat服务器配置**

当大家学习web的时候，会为自己的工具配置tomcat服务器，但好多博友初学者对于tomcat服务器的配置会有很多疑问，比如感觉其他人的电脑配置都那么轻松，一下子就配置成功了，可是每每到自己就出现这样那样的问题，一度怀疑自己的电脑是假的，那是因为你对于有些东西还不太熟悉，才会导致这样那样的错误。以下我就为大家仔细讲解一下常用的IDEA，eclipse工具进行tomcat配置。

### **一、下载tomcat服务器**

去官网下载tomcat,网址如下：http://tomcat.apache.org/

![](https://s2.loli.net/2023/06/09/arUGOuQ9Sb6zeZC.png) ![](https://s2.loli.net/2023/06/09/kh3ZlB5sYe6n27w.png)

尽量下载tomcat8.0或者9.0版本，我使用的是9.0版本,(注意选择与电脑相符的版本，一般都是64位)

### **二、为eclipse配置tomcat服务器**

（这里大家一定要清楚自己的eclipse版本，比如老版本的eclipse是无法配置tomcat的，推荐大家使用eclipse jee版本的，不然就会出现很多问题，非常恶心）。

#### 1.我下载的是下图版本的eclipse,大家可以去官网上进行下载 (给大家一句忠告，下载软件时，不要下载太新的版本，因为最新版本有的功能是其他软件不能兼容的，尽量下载最普遍使用的。)

![202306092242530.png](https://s2.loli.net/2023/06/09/zW7ExsGkqF8ub3w.png)

#### 2.打开eclipse，点击window菜单，选择最下方的preferences,会进入如下页面。

![](https://s2.loli.net/2023/06/09/XCcuKOB3Rsie148.png)

#### 3.选择此界面下的server选项，并找到Runtime Environments选项，出现以下界面。

![](https://s2.loli.net/2023/06/09/rjVkJOlNLh7b5c2.png)

#### 4.点击右侧的Add按钮，选择你所下载的tomcat服务器版本。

![](https://s2.loli.net/2023/06/09/rCdv7ATq9oH8MBE.png)

#### 5.点击next,选择tomcat的路径.

![](https://s2.loli.net/2023/06/09/sQHrpMm6BESOW3a.png)

#### 6.选择好之后，点击finish,当出现以下界面说明添加成功。

![](https://s2.loli.net/2023/06/09/6wgQYjip8c3bSds.png)

#### 7.此时下方的Servers会出现以下提示，直接点击进入即可(如果下方没有出现Servers，需要点击Window->Show View->Servers进行显示)。点击之后，直接选择tomcat9.0即可。

![](https://s2.loli.net/2023/06/09/GwYarcX3jbn679z.png)

#### 8.此时会出现如下所示界面。则代表你的eclipse配置tomcat9.0成功。

![](https://s2.loli.net/2023/06/09/9ObB2wp3sDKgJlj.png)

### **三、为IDEA配置tomcat服务器**

#### **1.**IDEA的下载****

在Intellij IDEA官网上下载

下载地址[https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

我下载的是IntelllJ IDEA 2019.3.2版本的。

![](https://s2.loli.net/2023/06/09/Zv6dT1XltqVD5NO.png)

#### **2.明确版本**

首先要查看自己的IDEA版本，如果你的IDEA是community(社区版)的，那么恭喜你，你距离tomcat的配置路还很遥远，因为社区版的配置相对来说比较复杂，我之前也试着配置了一下，一顿捣鼓最后还是以失败告终，IDEA中有关web的开发，强烈推荐使用ulimate(旗舰版本)，因为越往后走越会发现许多开发中常用的配置只有旗舰版才具备，社区版只具有一小部分。这也是为啥IDEA工具旗舰版收费的原因，但我们还不得不用。如果愿意投资的可以去购买旗舰版使用，如果你是大学生的话，会存在一波福利，就是大学期间可以免费注册使用（仅限学生期间），网上有具体的操作流程。

#### **3.以下是tomcat配置步骤**

创建一个项目

![2020032614174150.png](https://s2.loli.net/2023/06/09/PJpH1bcLQAW5qXh.png)

选择Java Enterprise,勾选Web Application，之后关于项目名称之类的自己根据实际情况创建就好，点击finish（如果是社区版的话，你是找不到Java Enterprise选项的）

![](https://s2.loli.net/2023/06/09/Xd1BYtDa5qZHm9i.jpg)

找到目录中的run,点击edit configurations

![](https://s2.loli.net/2023/06/09/dOy3bfmhIMPCiHE.png)

点击+，选择tomcat中的local

![](https://s2.loli.net/2023/06/09/HMIErncokUyVqdf.png)

会出现以下界面，对以下位置进行配置即可

![](https://s2.loli.net/2023/06/09/CWEDenV7SYr2j14.jpg)

然后转到旁边的Deployment选项卡，点击“+”号，这里会有Artifact选择它（因为我之前创建过了，所以这里没有显示），选择项目名称

![](https://s2.loli.net/2023/06/09/x8ZdSG6JaAp34sz.png)

配置完之后就可以在项目界面看到下图，点击运行即可

![](https://s2.loli.net/2023/06/09/ONZf3YUc7rQEXku.png)

至此，IDEA的tomcat服务器配置就已完成。



### **总结**

到此这篇关于为eclipse和IDEA配置tomcat服务器的方法的文章就介绍到这了,更多相关为eclipse和IDEA配置tomcat服务器内容请搜索以前的文章