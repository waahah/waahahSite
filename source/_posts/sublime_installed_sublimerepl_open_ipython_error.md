---
title: sublime text 4 安装完SublimeREPL 打开IPython报错
date: 2021-09-30 14:58:36
tags: [Sublime Text, SublimeREPL, IPython]
categories: [IDE, Sublime Text]
---

### 前言
sublime text 4 安装完`SublimeREPL` 打开`ipython`报错
之前我碰到这个情况，后来一直在`git-bash`玩`ipython`，最近有空倒腾了，已经解决。

[SublimeREPL and IPython](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/28664989/sublimerepl-and-ipython)

或者直接往下看

### 软件环境：

*   `Windows 10`
*   `Sublime Text 4`
*   C:/Python27 (`Python`路径)
*   C:/Python27/Scripts (`IPython`路径)

### 解决办法：

Sublime Text 3 -> 设置 -> 浏览资源包 -> SublimeREPL -> config -> Python，用sublime其中的 **Main.sublime-menu** 文件，修改其中id为“`repl\_python\_ipython`”的配置项，将"`windows`"项由
```json
["python", "-u", "${packages}/SublimeREPL/config/Python/ipy\_repl.py"]
```
改为你的`ipython`程序路径(我的为"C:/Python27/Scripts/ipython")，具体对比如下图：

  

![](https://s2.loli.net/2023/07/02/sb1RcPpVlDFmK8W.png)

![](https://s2.loli.net/2023/07/02/rUySfOT8Plp5MCs.png)

  

参数"`--colors=NoColor`"非必须项，自行设置。



