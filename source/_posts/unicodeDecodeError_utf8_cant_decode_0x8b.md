---
title: UnicodeDecodeError_‘utf-8‘ codec can‘t decode byte 0x8b in position”解决方案
date: 2022-12-08 14:58:36
tags: [Python, Urllib, Error]
categories: [Coding, Python]
---

### 前言
UnicodeDecodeError: ‘utf-8‘ codec can‘t decode byte 0x8b in position”解决方案 

Python3.x爬虫，

发现报错“UnicodeDecodeError: 'utf-8' codec can't decode byte 0x8b in position 1：invalid start byte”，

方法一：

一直在找文件的错误，最后经过网友的提示，错误原因竟然是我的报头中有一条：

`'Accept-Encoding': 'gzip, deflate'`

这一条是我从Fiddler直接复制过来的，为什么用浏览器可以正常浏览，而用Python模仿就不行呢？

综合网上的解释：

这句话的意思是本地接收压缩格式的数据，服务器传过来压缩格式gzip的文件，而解压这种gzip文件只能用deflate算法，浏览器能够自动解压，程序却不能自动解压gzip，需要额外进行设置才行，设置方法参考<https://www.crifan.com/set\_accept\_encoding\_header\_to\_gzip\_deflate\_return\_messy\_code/>

总结：写爬虫程序时候还是不要写`'Accept-Encoding': 'gzip, deflate'`了，就让服务器传原始文件过来吧，不用压缩了。

方法二：

利用gzip进行解压缩。

python3 ：
```
import gzip

import urllib.request

response\_1 = urllib.request.urlopen('').read()

data=gzip.decompress(response\_1).decode("utf-8")
```
