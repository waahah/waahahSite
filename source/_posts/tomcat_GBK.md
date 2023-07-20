---
title: 解决tomcat控制台出现乱码
date: 2021-04-29 14:58:36
tags: [Coding, Java,Tomcat]
categories: [Coding, Java]
---

### 前言
解决`tomcat`控制台出现乱码

### 问题

乱码的界面如下：  
![1](https://s2.loli.net/2023/06/10/9RNzaJVv6FGxkl4.webp)

### 分析问题

出现乱码的情况是，`tomcat`支持的编码格式与控制台不一致导致的，所以可以查看控制台编码格式。  
打开`cmd`，查看属性：  
![2](https://s2.loli.net/2023/06/10/tnTK3qCuj5PLYF2.webp)  
可以看出控制台支持的编码格式为`GBK`  
现在有两种方法解决：我们可以修改控制台的编码格式，或者修改`tomcat`的编码格式。

优先考虑修改`tomcat`的日志编码格式。

### 解决方案

#### 1.  找到 Tomcat解压路径`/conf/logging.properties` 
![3](https://s2.loli.net/2023/06/10/XxKogpfOzn5Y3c1.webp)

#### 2.  添加语句（或修改命令行）：`java.util.logging.ConsoleHandler.encoding = GBK`  
![4](https://s2.loli.net/2023/06/10/kuJxfOWKH9lpiUC.webp)

#### 3.  重启tomcat，查看日志数据即可！  
![5](https://s2.loli.net/2023/06/10/iPBs2F7tn1rMYGa.webp)
