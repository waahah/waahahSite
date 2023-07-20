---
title: 使用Marked库出现marked is not a function
date: 2023-06-04 14:58:36
tags: [JavaScript, Error, Marked]
categories: [Coding, JavaScript]
---

### 前言

使用Marked库出现bug：Uncaught TypeError: marked is not a function at ＜anonymous＞:1:14_marked.parse

直接引用marked.js到`<script>`标签，结果console出现errors: marked is not a function
-----------------------------------------------------------------------------------------------------------------------------------

![453502ed5f504af6a1de64ccbc25a50c.png](https://s2.loli.net/2023/07/13/3m75sPBZFNGaKMW.png)

### 尝试解决方案:

**1.** 怀疑可能时marked.js版本不合适，于是换版本，更改marked.js的引用url路径为`https://unpkg.com/marked@4.0.13/lib/marked.umd.js`  
**无效**  
**2.** 查看Marked官方文档  

![0221ab24525947178bce8c32f7a5d492.png](https://s2.loli.net/2023/07/13/QEkbrdFy6aCq29T.png)

试用了上述引用，仍然**无效**，所以，肯定不是引用的问题，接着看下去。  
**3.** **marked is not a function** 这个报错说明，只可能在`marked（）`这里出现了问题，因此，发现官方文档用的是 **marked.parse()** 来将Markdown格式转换为HTML格式。  

![3c5a5030b69b478aae0f5e24d4b10c0c.png](https://s2.loli.net/2023/07/13/qNwY4lnLehx7ukj.png)

**更换使用方法后，bug解除**。  

![5512d594f22a48f69a1152673eb56370.png](https://s2.loli.net/2023/07/14/vyzNZkG32dBUcP7.png)
