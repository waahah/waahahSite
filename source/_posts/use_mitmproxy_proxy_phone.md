---
title: 如何使用 mitmproxy 监控你的手机 
date: 2023-06-27 14:58:36
tags: [Python, Mitmproxy, Spider]
categories: [Coding, Python]
---

上次给大家说过

**“中间的男人”**

**[那个站在中间的男人，使用Python就能直接操控你的上网请求](#)**    

相信你已经对 mitmproxy

有一定的了解了

不过现在的你可能有些许疑惑

  

如何监听 https 的数据呢？  

如何监控手机上的传输数据呢？  

那么接下里就是  

**学习python的正确姿势**

其实如果你之前有看过我的

`fiddler`教程  

那么对你来说应该 so easy

首先我们来启动一下 mitmproxy  

  

![v2-72611442a95693830b1140b719c9d8e7_720w.png](https://s2.loli.net/2023/07/14/D7jIKV8hsJUmHEP.png)

  

这时候我们电脑端

开启了 8080 端口

用来监听数据


![v2-2369084e2d327282f28f28fe73045fe1_720w.webp](https://s2.loli.net/2023/07/14/fXkilnuxb7yVjJI.webp)


这个时候我们要监听手机上的数据  

那么我们就要走它的代理了



打开你天天在用的手机  

把你的手机 WiFi 连接到和

你电脑相同的局域网下 

这时候要看看你电脑的 IP 地址  

我们等下在手机上要用到它  


如何查看你电脑的 IP 呢？  

如果你是 WIN 的话就打开 DOS

输入 ipconfig 就完事

  

如果你是 Linux 的话就输入  

ifconfig

  

这时候你就可以看到你的 IP 了

  

![v2-5e552cf40230fcc3a9d84f8bfbe4e601_720w.webp](https://s2.loli.net/2023/07/14/tUnfecNML4qi6Al.webp)


ok  

现在打开你的手机

连接好你的 WIFI

  

  

然后打开 WIFI 设置

然后选择 HTTP 代理

  

  

  

![v2-fca6a1e09adfab8f2ab4ca7efa2e9c99_720w.webp](https://s2.loli.net/2023/07/14/J2nLga4bmZXsK3o.webp)
  

  

然后选择手动操作  

输入你刚刚看到的电脑 IP

以及 mitmproxy 的 8080 端口

  

  

  

![v2-b7ac2a317399fdc0510ed7c2b2721851_720w.webp](https://s2.loli.net/2023/07/14/rGzw3Rs1gUuZx2b.webp)


设置完了之后呢

你就已经可以在电脑监控你手机的数据了


不过手机上的 APP 大多都是 HTTPS 的

那就安装个证书吧

  

打开你手机的浏览器

输入

**mitm.it**  


![v2-7a8580b18b814e475019ce76ad7f4e20_720w.webp](https://s2.loli.net/2023/07/14/zvx1JNd743L5uPD.webp)




根据你的手机系统

自行选择安装对应的证书

必须同意安装

  

  

  

![v2-ecd103de698dc6a89df63cc9422db4c9_720w.webp](https://s2.loli.net/2023/07/14/iBVhr7mXTQZN2gP.webp)

  

  

  

装完之后  

你要信任这个证书才行

  

打开你的手机--设置--通用  

找到 profile 证书


找到 mitmproxy 证书

点击右上角安装一波  


![v2-031b9b17770d2a37c443d43ca2ed5b75_720w.webp](https://s2.loli.net/2023/07/14/AOPgSYL2de8vu6N.webp)


验证完成  


![v2-e504b9bffa28a064bde43a2fa798dc01_720w.webp](https://s2.loli.net/2023/07/14/oMKuk2Pt7bQ6Zp4.webp)

  

完事了  

手机打开 b 站

  

再看看 mitmweb  



![v2-7905a26bf023cddd474995d07c0d9887_720w.webp](https://s2.loli.net/2023/07/14/YvkPQDXeVgFAqoj.webp)
