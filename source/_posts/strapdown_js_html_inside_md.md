---
title: strapdown.js HTML 内嵌 Markdown 的静态解决方案
date: 2023-07-19 14:58:36
tags: [JavaScript, Markdown, strapdown]
categories: [Coding, JavaScript]
---

strapdown.js HTML 内嵌 Markdown 的静态解决方案
=====================================

**简介：** 只需在 html 文件中引用strapdown.js，然后在<xmp>标签内书写 Markdown 内容即可。浏览器加载时会自动将 Markdown 渲染为 HTML。再方便不过。

[strapdown.js](http://strapdownjs.com/)使得基于 Markdown 编写网页极其便利：

只需在 html 文件中引用`strapdown.js`，然后在`<xmp>`标签内书写 Markdown 内容即可。浏览器加载时会自动将 Markdown 渲染为 HTML。再方便不过。

  

示例
----

```html
<!DOCTYPE html>

<html>

<title>Hello Strapdown</title>

<xmp theme="united" style="display:none;">

# Markdown text goes in here

## Chapter 1

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore

et dolore magna aliqua. 

## Chapter 2

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut

aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse

cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in

culpa qui officia deserunt mollit anim id est laborum.

</xmp>

<script src="http://strapdownjs.com/v/0.2/strapdown.js"></script>

</html>
```


特性
--

*   搜索引擎友好
*   跨浏览器支持
*   支持解析 Github-flavored Markdown
*   可定制主题

![8d80b65f7d8e4de5b85ffa33a79353db.png](https://s2.loli.net/2023/07/16/fhBYGJPAHjyadoI.png)

项目主页
----

- [http://strapdownjs.com](http://strapdownjs.com/)

