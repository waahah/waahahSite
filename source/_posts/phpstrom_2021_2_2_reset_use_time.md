---
title: 关于PhpStorm2021.2.2 30天试用到期后无法进入重置试用时间
date: 2022-09-25 14:58:36
tags: [PHP, Jetbrains]
categories: [IDE, PHPStorm]
---

### 前言

当`jetbrains`系列30天试用期过后，无法进入IDE时可以找到

```cmd
C:\Users\xxx\AppData\Roaming\JetBrains\PhpStorm2021.2\
```

路径下的eval文件夹将其删除，就可以重新进入IDE了。

![](https://s2.loli.net/2023/07/09/DnHWLUeYipG3jVA.jpg)

为何不删除上一级的PhpStorm2021.2文件夹嘞，因为删了之后当前版本项目信息及其配置也都没了，而单单删除eval文件夹则不会。

其它jetbrains家产品也可同样操作。