---
title: Python中 FPDF error:Not a PNG file_'1.png'
date: 2022-12-16 14:58:36
tags: [Python, FPDF, Error]
categories: [Coding, Python]
---

### 前言

使用FPDF操作图片转化成PDF的时候，运行出现这样的错误

`FPDF error:Not a PNG file :'1.png'`

出现这个错误的原因：

是获取图片的时候 PNG和JPG格式定义错了

我的图片之前是`jpg`格式,然后我改后缀名改成`png`,看起来你已经修改了,但实际上还是没有改,图片依然是`jpg`格式的,

所以解决办法就比较简单了：

1. 确定目标图片的格式，是`JPG`还是`PNG`还是其他格式

2. 把`FPDF`中用到的格式改成和目标一致的图片格式即可。

