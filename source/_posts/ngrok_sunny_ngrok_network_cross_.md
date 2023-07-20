---
title: Ngrok 和 Sunny-Ngrok 实现内网穿透教程
date: 2022-10-19 14:58:36
tags: [Ngrok,Sunny-Ngrok, DNS, Web]
categories: [Windows]
---

### 前言

**ngrok是什么我这边就不多介绍了，百度一找一大堆。你可以把它理解为内网穿透的工具。（简而言之就是将内网IP映射成对外可访问的域名）**  
Ngrok使用流程如下:  

从<https://ngrok.com/> 下载ngrok ，然后注册一个账号并获取官方分配一个密钥  

密钥获取方式：  
![2021043010463385.png](https://s2.loli.net/2023/07/09/wBVgfEyZXYNF4ot.png)

![20210430104650661.png](https://s2.loli.net/2023/07/09/NzUfFcdWEsbQLTB.png)
**使用cmd 到ngrok.exe的目录,命令： ngrok -authtoken 密钥 -subdomain 二级域名 端口**  
![20210430104710531.png](https://s2.loli.net/2023/07/09/eIlcdpjOLKuJQm4.png)

![20210430104714739.png](https://s2.loli.net/2023/07/09/cqEvNi2DrTm9HJp.png)

访问<http://aaa.ngrok.com>就可以了。  

访问<https://ngrok.com/dashboard> 可以管理密钥。

_**\---------------------------------------------------分割线--------------------------------------------------------------------**_

介绍的很简略，因为上面的其实并不是正题，还有更简单的实现方式，就是使用国内的Ngrok,网速更快，配置方面也更简单。下面介绍下国内的 Sunny-Ngrok使用教程：  

国内Ngrok官网：<https://www.ngrok.cc/>  
注册账号后，可以直接添加隧道(此处我使用的是google浏览器)：  
关于开通隧道已经有详细的教程了：<https://www.sunnyos.com/article-show-67.html>  
附上我开通的隧道截图：  
![20210430104752108.png](https://s2.loli.net/2023/07/09/w56eSMLhARkyC3c.png)

**下一步就是点击上图的客户端下载：<https://www.ngrok.cc/download.html>，下载自己系统对应的客户端。  
解压之后执行 “Sunny-Ngrok启动工具.bat”脚本，输入你的隧道ID，出现如下界面：**  
![](https://s2.loli.net/2023/07/09/i3HOrGZMUQ7kdKL.png)

此时只要访问<http://wangcw.free.ngrok.cc>就会转发至我本机的<http://127.0.0.1:18080>。
