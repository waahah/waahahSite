---
title: Fiddler手机抓包及简单使用
date: 2022-03-18 14:58:36
tags: [Fiddler, Web]
categories: [Coding, Python]
---

Fiddler与wireshark对比

> Fiddler是在windows上运行的程序，专门用来捕获HTTP，HTTPS的。
> 
> wireshark能获取HTTP，也能获取HTTPS，但是不能解密HTTPS，所以wireshark看不懂HTTPS中的内容

### Fiddler下载与安装

官网地址[https://www.telerik.com/fiddler](https://www.telerik.com/fiddler)

打开可能有点慢

最新版是收费的，作为白嫖党，自然是下载 免费的经典版  
![854e625d6f3044dd95a1f3c96189eb6f.png](https://s2.loli.net/2023/07/07/2TZqJKxM9tAh7PL.png)
随便回答下他们的问题，开始下载  
![abca2e89f3cb4a628422e75b51af0334.png](https://s2.loli.net/2023/07/07/Y3QBH5VWOA7yvuC.png)

![6d75bbed1ca54f8bb6fbfe09dae68603.png](https://s2.loli.net/2023/07/07/d57tgerQC1kTsmn.png)

下载完成后，根据提示，完成安装。

### 电脑抓包设置

Fiddler是比较牛批的，在你打开fiddler后，他会自动帮你设置好系统代理。  
因此，你不用任何操作，所有通过这台电脑发出的请求，都会走fiddler的代理。

也就是说

打开fiddler，电脑端的抓包已经开始了

但是，此时只能抓到http的请求。

要抓取https的请求，需要一点简单的设置

Tools——Options——Https  
![1ce578347f4c4be3b857f3e1305d7ad5.png](https://s2.loli.net/2023/07/07/Q42Izd3FBmneoPV.png)
开启https的开关后，fiddler就会抓取你电脑上发出的所有的（http和https）请求  
![a048b8380b794b5e9ba834d9346161a9.png](https://s2.loli.net/2023/07/07/P4ZsSYBT8G1XyfD.png)

### 手机抓包设置

手机抓包的条件

> 1.  设置fiddler代理（允许远程连接）
> 2.  手机和fiddler处于同一网路
> 3.  手机配置fiddler代理
> 4.  手机安装证书（用于抓取https请求）

#### 1\. 设置fiddler代理

Tools——Options——Connections  
![035c37746e3c41bcaf6ae5f8c4d454f3.png](https://s2.loli.net/2023/07/07/EzL2SNbeyJTjt4A.png)

#### 2\. 手机与fiddler处于同一局域网

只要保证手机与fiddler在同一局域网就可以

#### 3\. 手机配置fiddler代理

先查看fiddler所在网路

打开命令提示符，输入ipconfig 查看当前局域网ip

![5e0f30ca9bfe4b758d218522dabfeb75.png](https://s2.loli.net/2023/07/07/9xhsUMTy6ZvwXDF.png)
手机设置fiddler代理  
![b68e5471204b4cd588950ad0ed005e05.jpg](https://s2.loli.net/2023/07/07/kPQmz92USbuy8cN.jpg)
这一步结束后，就可以开始抓包了，但只能抓http协议的包

对于https协议的包需要安装以下证书。

#### 4\. 手机安装证书

打开手机浏览器，输入 fiddler所在主机ip+fiddler代理端口号

本例为 `192.16.8.111:8888`

![4638efcb00ab4cb88b9849f5e3119306.png](https://s2.loli.net/2023/07/07/wRYW4jL1aMP87e2.png)
进入上图界面，点击下载证书。

如果没有打开上图界面，检查前三步是否出错，重复前三步

找到证书下载路径，点击安装证书即可。

完成安装后，就可以抓取手机app的http和https的请求了。

### Fiddler简单使用


![1b2ff2afadc7429192ab8b4e5f2292d0.png](https://s2.loli.net/2023/07/07/2cPEMgkjxSNB8vI.png)

### 配置抓包过滤器

![84a2bc21eaa541b0a7f1b2fef7ba3748.png](https://s2.loli.net/2023/07/07/UGjVvy6caPpK8Yb.png)
正则表达式  
`REGEX:\.(js|css|google|favicon\?.*)+`

查看请求信息和响应与浏览器开发者工具一样

