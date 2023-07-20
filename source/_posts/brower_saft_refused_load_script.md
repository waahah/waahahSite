---
title: 浏览器安全问题Refused to load the script xxxxxx
date: 2023-07-23 14:58:36
tags: [JavaScript, CORS, CSP]
categories: [Coding, JavaScript]
---

### 前言

今天控制台加载脚本时碰到一个这样的问题：大致问题是这样的，我把新生成的国外cdn路径放到页面上来用来查看，发现会出现如下类似的错误信息

![1332332-20180606174824611-561589558.png](https://s2.loli.net/2023/07/17/IjpRieMDGZvAFOW.png)

`Refused to load the script xxxxxx because it violates the following Content Security Policy directive:"script-src 'self' xxxxxxxxxxxxx"`

原图已经没了，我在阮一峰的博客上把这张图贴上来，这个问题主要是由于浏览器为了防止跨域脚本攻击，而推出"网页安全政策"（Content Security Policy，缩写 CSP），

![1332332-20180606175420436-632777126.png](https://s2.loli.net/2023/07/17/bDOuvln84ay26Wi.png)

而我的**nginx服务器开启了CSP**，所以在对另一个域名下的资源就不能启动js脚本。

CSP的含义如下：

**#激活内容安全策略Content Security Policy (CSP) ，大部分浏览器支持**  
**\# 告诉浏览器只能从本域名和你显式指定的网址下载脚本。**

接着就是修改nginx配置，了解以下概念，我找到原先unsafe-inline 指向的cdn域名，利用通配符\*使得该所有二级域名都符合unsafe-inline 

![1332332-20180606180250057-25334647.png](https://s2.loli.net/2023/07/17/nlr85X9styJDeVU.png)

最后访问成功！

 总结：首先你已经把资源文件放入到服务器上，配置好了`nginx`，能正常运行，这时你想对浏览器做一个限制，想弄的安全一点，不想让外人对你的网站注入病毒脚本，所以你在nginx配置上添加 `add_header`  `Content-Security-Policy` ，把你需要访问的url写进去 ，这样就  算完成CSP了。 

