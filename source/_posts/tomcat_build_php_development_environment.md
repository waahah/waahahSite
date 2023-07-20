---
title: Tomcat环境下部署PHP开发环境
date: 2022-12-04 14:58:36
tags: [Tomcat, Java, PHP]
categories: [Coding, Java]
---

### 前言
tomcat环境下部署php开发环境

资源：<http://windows.php.net/download/>

1、下载php的程序包，本文环境为windows环境，故下载为zip包

2、解压到tomcat的安装路径下，重命名为php

3、设置环境变量，path添加刚才的路径D:\\apache-tomcat-8.0.36\\php;

cmd输入php -v 或php -version验证，若返回如下信息则php设置成功

```cmd
1.  `C:\Users\Administrator>php -v`
2.  `PHP 7.2.1 (cli) (built: Jan  4 2018 04:00:18) ( NTS MSVC15 (Visual C++ 2017) x64`
3.   `)`
4.  `Copyright (c) 1997-2017 The PHP Group`
5.  `Zend Engine v3.2.0, Copyright (c) 1998-2017 Zend Technologies`
```

4、配置php.ini

到php路径下备份php.ini-development，并将原文件修改为php.ini

修改如下配置：

（1）去掉extension\_dir = “ext”前面的;

（2）去掉cgi.force\_redirect前面的;，并将值修改为0

5、配置tomcat

打开tomcat的conf文件夹，修改context.xml文件，在Context加上属性privileged=”true”，如图

![](https://s2.loli.net/2023/07/10/PKE43BZlDkG7jeX.png)

然后修改web.xml文件，在中加入如下，其中executable为php-cgi的执行路径

```xml
1.  `<servlet>`
2.          `<servlet-name>php</servlet-name>`
3.          `<servlet-class>org.apache.catalina.servlets.CGIServlet</servlet-class>`
4.          `<init-param>`
5.            `<param-name>clientInputTimeout</param-name>`
6.            `<param-value>200</param-value>`
7.          `</init-param>`
8.          `<init-param>`
9.            `<param-name>debug</param-name>`
10.            `<param-value>0</param-value>`
11.          `</init-param>`
12.          `<init-param>`
13.            `<param-name>executable</param-name>`
14.            `<param-value>D:\apache-tomcat-8.0.36\php\php-cgi.exe</param-value>`
15.          `</init-param>`
16.          `<init-param>`
17.            `<param-name>passShellEnvironment</param-name>`
18.            `<param-value>true</param-value>`
19.          `</init-param>`
20.          `<init-param>`
21.            `<param-name>cgiPathPrefix</param-name>`
22.            `<param-value>WEB-INF/phpbin</param-value>`
23.          `</init-param>`
24.           `<load-on-startup>5</load-on-startup>`
25.      `</servlet>`
```

并添加如下 ，其中url-pattern为php脚本路径

```xml
1.  `<servlet-mapping>`
2.          `<servlet-name>php</servlet-name>`
3.          `<url-pattern>/phpbin/*</url-pattern>`
4.      `</servlet-mapping>`
```

![](https://s2.loli.net/2023/07/10/bteqWlGcBPVyCvz.png)

![71bc2a61e7a94648a468cf4a1a443f2f.png](https://s2.loli.net/2023/07/10/r8jV4zGlfSZsLI7.png)

6、测试

在webapps\\ROOT\\WEB-INF下新建一个phpbin的文件夹，并将index.php放置其中，内容如下

```php
1.  `<?php phpinfo();?>`
```

重启tomcat，在浏览器输入<http://localhost:8080/phpbin/index.php>，打开界面如下时说明配置成功

![45c759773a254ff2a7ef266004618678.png](https://s2.loli.net/2023/07/10/KIvSsPq48Om5raw.png)

后续编写的代码也放到phpbin路径下，即可在浏览器打开。