---
title: Windows下Node升级到最新版本
date: 2023-02-22 14:58:36
tags: [Javascript, Nvm, Nodejs]
categories: [Coding, Nodejs]
---

一、直接更新
------------------------------------------------------------------------

1.访问[node官网](http://nodejs.cn/)，下载最新版本或者稳定版本  
![](https://s2.loli.net/2023/07/11/h2C8mSYeOuJtDrL.png)

2.查看当前node安装位置

node -v 查看当前node版本

where node 查看当前node安装位置

![](https://s2.loli.net/2023/07/12/bGURCMB8FV49J1A.png)
3.将下载下来的node安装到相同路径即可。

二、nvmw
------------------------------------------------------------------------

nvmw是一款针对windows的node版本管理工具 ，nvm是mac中的node版本管理工具。

安装nvmw
------------------------------------------------------------------------

```bash
npm install -g nvmw

```

使用nvmw
------------------------------------------------------------------------

nvmw -h 帮助

nvmw -v 版本  
![](https://s2.loli.net/2023/07/12/bPu9xMpD3FjCNkw.png)

_**nvmw install v8.12.0**_ 安装8.12.0版本的node,安装成功后提示

运行 _**nvmw use v8.12.0**_ 切换到当前版本，至此成功升级node并切换到对应的版本。

```bash
// 安装
nvmw install <version>

// 切换版本
nvmw use <version>

```

![](https://s2.loli.net/2023/07/12/4tcCwkKTZMyxUf6.png)
![](https://s2.loli.net/2023/07/12/sNa7LzcYeW4JnTU.png)

注意每次使用前都需要切换node版本，nvmw仅为版本控制工具，只是同时安装了两个版本的node，每次使用前需要指定要使用的node版本。

参考文档：  
- https://blog.csdn.net/lpf1215/article/details/52843523

npm的版本管理：  
- https://www.runoob.com/w3cnote/nvm-manager-node-versions.html

**nvmw切换不生效问题看这里：**  
- https://www.jianshu.com/p/2a60f9276d38

