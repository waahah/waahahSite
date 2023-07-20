---
title: Node.js 版本管理工具 - nvm安装流程 
date: 2023-07-11 14:58:36
tags: [Version, Nvm, Nodejs]
categories: [Coding, Nodejs]
---

### 前言

nvm可以管理node不同版本之间的丝滑切换，避免重复入坑，特此记录。


**注意：在下载nvm之前需要卸载本电脑已经安装的node!**

一、进入官网[http://nvm.uihtm.com/](http://nvm.uihtm.com/) 下载
----------------------------------------------------------------------------------------

![v2-cf4a9c44739bb3be36a71965f86ae210_720w.webp](https://s2.loli.net/2023/07/15/VaAtnKg7h3lO6Fd.webp)


二、启动解压后的程序
----------

![v2-3e5e6250d8c955e6559fa642e793b8c9_720w.webp](https://s2.loli.net/2023/07/15/8ekUZzRLDMcQauY.png)

1.开始安装nvm

![v2-36422c4dc8ce12659752ad7eff486971_720w.webp](https://s2.loli.net/2023/07/15/GAldVvBnezmakYS.webp)

  

2\. 选择安装路径，默认是c盘，我自己指定的是d盘的nvm文件夹，nvm和以后所有node版本会下载到你指定的文件夹，如下图所示。（我自己为了节省c盘空间，可以省略）

![v2-cb83f316b0ca35f2dae1c39cb03f3628_720w.webp](https://s2.loli.net/2023/07/15/LJidvCM6qUxQhDy.webp)

![v2-b1370ab1f055a999abf7af962507048b_720w.webp](https://s2.loli.net/2023/07/15/hze7q6gQOFRA5TP.webp)

这是正常使用的时候，安装了node的8.17.0和9.11.2和12.0.0三个版本都是自动下载到了nvm中



3\. 设定当前系统使用node版本的存放位置

![v2-9e6b737d8f7fcd5cfcd42dc22db8e68c_720w.webp](https://s2.loli.net/2023/07/15/mKjkyC38qFcuYMX.webp)

  

![v2-de55e34e142bf3586eb34c0a05536c7b_720w.webp](https://s2.loli.net/2023/07/15/dDYBGQieSFwusgz.webp)

也就是说系统最终使用的是这个文件夹里面的node版本，nvm下载了多个版本，指定某个版本后，这个指定的版本就会放到这个node文件中，供系统使用。
  

3.最后点击完成即可

![v2-6c27608e266fc8442ffda1ec11235c73_720w.webp](https://s2.loli.net/2023/07/15/TVdfbD9rInlkWLS.webp)


三、在cmd控制台进行操作
-------------

### nvm 查询版本号

![v2-a05c26a4bbaf3dd6a415310f57236f07_720w.webp](https://s2.loli.net/2023/07/15/ZoYhlEzMbA4Ki3t.webp)

  

### 查询可以下载的node版本

```
nvm list available  
```

![v2-03c4da75749ba305ca1fac5b98c0d1d8_720w.webp](https://s2.loli.net/2023/07/15/8F5GlqA9BmTkZnj.webp)


### 安装指定版本

```
nvm install xxx   
```

![v2-3189c31ba85da8326382bed391065cab_720w.webp](https://s2.loli.net/2023/07/15/ZgunxdaJbVEjSMB.webp)

正常来说，node和npm会捆绑下载，如果出现npm没有下载，环境变量的顺序NVM\_HOME和NVM\_SYMLINK这两个顺序颠倒一下试试。

![v2-9c1b310ce3c59e80571c8dea0b2a034c_720w.webp](https://s2.loli.net/2023/07/15/sfhWY4e26lBdSXa.webp)
  

### 查看已经安装的node版本

```
nvm list
```

![v2-4ba251ed41a55ec2255161f2a8658ed7_720w.webp](https://s2.loli.net/2023/07/15/cUEGbeP8Qh2VYwA.jpg)



### 切换node版本(如果失败那就用管理员身份打开cmd进行切换)

```
nvm use xxx
```

![v2-d4d1e7176017274eccb25e4eb5772e0c_720w.webp](https://s2.loli.net/2023/07/15/xEADBUwgyX97lhf.webp)

