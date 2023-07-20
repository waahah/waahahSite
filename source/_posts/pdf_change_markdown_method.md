---
title: PDF转换为Markdown的方式
date: 2023-08-06 14:58:36
tags: [JavaScript, PDF, Markdown]
categories: [Coding, JavaScript]
---

### 前言

**markdown 转换为 pdf 有很多方式，反过来，可用的工具却很寥寥。**

### 方式一

上午采用平时惯用的 **pandoc，提示不行**：

> pandoc -f pdf -t markdown .\\caifu.pdf -o [caifu.md](http://caifu.md/)

Unknown reader: pdf

**Pandoc can convert to PDF, but not from PDF.**

### 方式二

下午我尝试 github 上的工具。可行。但格式乱得很。需要很多编辑工作，当然懂一些正则表达式，可以大大提高编辑效率。

**把pdf文件在网页上直接转换为 markdown 语法的网页：[https://pdf2md.morethan.io/](https://pdf2md.morethan.io/)**

下面是该工具的仓库。还有命令行模式支持本地处理文件。

- [https://github.com/jzillmann/pdf-to-markdown](https://github.com/jzillmann/pdf-to-markdown)
- [https://github.com/johnlinp/pdf-to-markdown](https://github.com/johnlinp/pdf-to-markdown)

### 方式三

笔记软件-Obsidian，有pdf转md格式的插件，已测试，秒转

![v2-9980ecb071ed7db7e5dc90a5d051a145_720w.webp](https://s2.loli.net/2023/07/17/bxes3uB9PVK5JkR.png)


