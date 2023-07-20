---
title: PhpStorm配置Xdebug最完整最详解教程
date: 2022-03-14 14:58:36
tags: [PHP, Web, Xdebug]
categories: [Coding, PHP]
---

### 前言

PhpStorm配置Xdebug最完整最详解教程，100%成功！

很多人好奇网上关于php配置xdebug的教程那么多，`为什么`我还要写这篇文章？  
因为网上的教程配置很乱，很多都是复制粘贴，有些配置项根本不需要，也不解释干嘛的，而且不够详细。

本教程主要应用于Windows，Mac和Linux基本上同理。

### 配置xdebug扩展

只配置Debug，不配置profiler和trace，profiler和trace干嘛的请百度。  
因为大多数情况下是单用户调试，所以`不需要`配置多用户参数，  
如：php.ini 文件 xdebug.idekey 参数和 PhpStorm的Debug -> DBGp Proxy 。

所以php.ini大概配置如下：

```ini
zend_extension = php_xdebug.dll
xdebug.remote_enable = On
xdebug.remote_host = 127.0.0.1
xdebug.remote_port = 9100

```

xdebug官网下载地址：https://xdebug.org/download.php  
扩展一定要装对，注意区分ts和nts版本，`phpinfo()`查看扩展是否成功。  
推荐 [phpEnv集成环境](http://www.phpenv.cn/) ，自带xdebug扩展和多版本php

### 设置PhpStorm

打开PhpStorm，菜单 File -> Settings ，然后找到 `Languages & Frameworks -> PHP -> Debug`  
设置`Debug port`为`9100`  
为什么不是9000？因为会和一些集成环境的php-cgi或者php-fpm端口冲突.

![](https://s2.loli.net/2023/07/07/sc25FHnNyQMP3Zo.png)

然后配置`Languages & Frameworks -> PHP -> Servers`  
![20190424122001895.png](https://s2.loli.net/2023/07/07/GMTCV4Ov5rejHch.png)

然后找到PhpStorm右上角电话图标，开始监听php debug的链接

![20190424122014390.png](https://s2.loli.net/2023/07/07/BW9L5DuEdYycGQa.png)

打开 [phpEnv集成环境](http://www.phpenv.cn/) 的 TCP端口进程列表，有9100端口，说明监听成功

![20190424122027298.png](https://s2.loli.net/2023/07/07/7RfLP5i8WlnjmZY.png)

### 触发断点调试

在你需要的代码处打断点，这是基础和必须，就不多介绍了。  
![20190424122045766.png](https://s2.loli.net/2023/07/07/JnSw5uI4ikWc3jG.png)

触发PhpStorm的debug方式主要有两种

1.  GET、POST存在`XDEBUG_SESSION_START` 参数或者cookie里存在`XDEBUG_SESSION`，单用户调试 值随意。GET、POST会生成cookie `XDEBUG_SESSION`，有效期为1个小时（可修改php.ini配置）。很多教程需要下载`Xdebug helper`等浏览器插件，原理就是请求里附加cookie。
2.  php.ini 文件 `xdebug.remote_autostart` 参数设置为 On 或者1，无需设置GET、POST、cookie。（不推荐，虽然不需要设置参数，设置针对环境，而不是项目，还要重启php环境）

### 浏览器调试

针对`第 1 种`，教大家用一种更简单的方式，不需要下载浏览器插件。  
找到PhpStorm右上角  
![](https://s2.loli.net/2023/07/07/kHLCTen4GutO1Rs.png)

![20190424122127588.png](https://s2.loli.net/2023/07/07/lyaSPsRJDkMUt6c.png)
然后点小甲虫图标  
![2019042412214398.png](https://s2.loli.net/2023/07/07/VwTU2e5GJtumiXM.png)
会打开浏览器访问你的url，并且携带GET参数`XDEBUG_SESSION_START`，同时生成cookie `XDEBUG_SESSION`，也就是说，下次（cookie有效期1小时）无需点击小甲虫，浏览器直接输入，如 www.a.com 或 www.a.com/chat/1/ 即可触发调试

![20190424122152416.png](https://s2.loli.net/2023/07/07/w1IhsVZjOXpRNDK.png)

### Postman接口调试

针对`第 1 种`，Postman触发方式如图  
![20200728180909682.png](https://s2.loli.net/2023/07/07/IYkMiABVszjCtNd.png)
可以直接添加GET、POST参数，在请求结束后，会自动附加cookie `XDEBUG_SESSION`，也可以手动添加cookie `XDEBUG_SESSION`

