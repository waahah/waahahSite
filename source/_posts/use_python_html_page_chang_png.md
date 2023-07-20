---
title: 使用Python把html网页转成png
date: 2023-07-22 14:58:36
tags: [Python, Markdown, PDF]
categories: [Coding, Python]
---

python html转png
===============

**简介：** 日常开发过程中，html可以画出非常好看的效果图，但是很多第三方工具并不支持直接展示html，这就需要通过一些第三方工具将html转换为png。很多第三方jar包在做转换的时候，经常出现转化后因为部分css标签不支持，图片效果错位的情况。本文演示一种python html2image包转换图片的案例。

+关注继续查看

#### 安装包

> pip install html2image

![77f1ea5c150348cbbe2882cc813f2c2a.png](https://s2.loli.net/2023/07/16/bDiGsg8aO5k21ze.png)

#### 转换本地html文件

```python
from html2image import Html2Image
hti = Html2Image()
hti.screenshot(other_file='测试.html', save_as='测试.png')
```

#### 转换url

```python
from html2image import Html2Image
hti = Html2Image()
hti.screenshot(url='https://www.baidu.com/', save_as='baidu.png')
```

![c424d2b73c0f4a0cb7e51f0b5334c6af.png](https://s2.loli.net/2023/07/16/jI8ML2mE6YVhJrX.png)

#### 设置图片大小

```python
from html2image import Html2Image
hti = Html2Image()
hti.screenshot(url='https://www.baidu.com/', save_as='baidu.png', size= (1000,1000))
```

![7a8a82e496104cc0bc307d67754762f1.png](https://s2.loli.net/2023/07/16/6eD5IMXmkU2dZL3.png)

#### 更多参考

- [I wrote a Python package that lets you generate images from HTML/CSS strings or files and URLs](https://www.reddit.com/r/Python/comments/k1gw4z/i_wrote_a_python_package_that_lets_you_generate/)  
- [html2image](https://github.com/vgalin/html2image)

