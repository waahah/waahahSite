---
title: 在idea中使用SpringBoot 写一个程序后,无法访问8080端口
date: 2023-08-04 14:58:36
tags: [SpringBoot, Java]
categories: [Coding, Java]
---

在idea中使用springboot 写一个helloworld程序后，不能访问localhost:8080/hello
-------------------------------------------------------------------------------------------------------------------------------

在idea中，利用springboot开发java项目非常方便，不用写一大堆配置文件，也不用去配置tomcat了。今天我刚重新配置了一下idea环境启动springboot，  
就运行了一个helloworld程序，结果发现在成功运行之后，在页面上打不开，弄了好半天，后来在发现原因的。有以下两个原因：

1. 在进行开发中，tomcat启动后，idea默认的访问端口号的8080，在开发中，由于许多进程可能占用8080，所以很不方便，所以在idea中更改tomcat默认端口号  
在项目中的src/main/resources目录下创建application.properties, 在文件中写入  
_**server.port=8989**_  
进行tomcat的默认端口修改  

2. 笔记本上面自带的Microsoft Edge 浏览器有时候会出现呢不支持springboot访问的情况，所以可以自己下载一个谷歌、火狐或者其他浏览器。

