---
title: JavaScript获取URL中各部分
date: 2021-12-08 14:58:36
tags: [JavaScript, URI]
categories: [Coding, JavaScript]


---

 ### 前言

URL即:统一资源定位符 (Uniform Resource Locator, URL)   
完整的URL由这几个部分构成：  
    scheme://host:port/path?query#fragment   

    scheme(通信协议):常用的http,ftp,maito等

    host(主机): 服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。

    port(端口号):整数，可选，省略时使用方案的默认端口，如http的默认端口为80。

    path(路径):由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。

    query(查询):可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&"符号隔开，每个参数的名和值用"="符号隔开。

    fragment(信息片断):字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点.)

对于这样一个URL

[http://www.x2y2.com:80/fisker/post/0703/window.location.html?ver=1.0&id=6#imhere](http://www.x2y2.com/fisker/post/0703/window.location.html?ver=1.0&id=6#imhere)

我们可以用javascript获得其中的各个部分  

1. window.location.href  
         整个URl字符串(在浏览器中就是完整的地址栏)  
         本例返回值: [http://www.x2y2.com:80/fisker/post/0703/window.location.html?ver=1.0&id=6#imhere](http://www.x2y2.com/fisker/post/0703/window.location.html?ver=1.0&id=6#imhere)

2. window.location.protocol  
         URL 的协议部分  
         本例返回值:http:

3. window.location.host  
         URL 的主机部分  
         本例返回值:www.x2y2.com

4. window.location.port  
         URL 的端口部分  
         如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符  
         本例返回值:""

5. window.location.pathname  
         URL 的路径部分(就是文件地址)  
         本例返回值:/fisker/post/0703/window.location.html

6. window.location.search  
         查询(参数)部分  
         除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值  
         本例返回值:?ver=1.0&id=6

7. window.location.hash  
         锚点  
         本例返回值:#imhere <src="[http://feeds.feedburner.com/~s/fisker?i=http://www.x2y2.com/fisker/post/0703/window.location.html](http://feeds.feedburner.com/~s/fisker?i=http://www.x2y2.com/fisker/post/0703/window.location.html)" type="text/javascript" charset="utf-8">