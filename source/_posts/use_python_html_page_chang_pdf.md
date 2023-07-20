---
title: 使用wkhtmltopdf将html网页转成pdf文件
date: 2023-07-21 14:58:36
tags: [Python, Markdown, PDF]
categories: [Coding, Python]
---

### 前言

我们看到一些比较写的比较好文章或者博客的时候，想保存下来到本地当一个pdf文件，当做自己的知识储备，以后即使这个博客或者文章的连接不存在了，或者被删掉，咱们自己也还有。

当然咱们作为一个coder，这样的事情肯定不能手动保存下来然后再转成pdf存起来对不对，有失咱们码农的身份，当然要自动化的来实现了~

**准备工作**
--------

那怎么办呢，python里面有个模块是pdfkit，他可以帮咱们把一个html（也就是一个网页）变成一个pdf文件。

pdfkit是python对wkhtmltopdf这个把网页转成pdf工具的一个封装，所以咱们必须得先安装一个wkhtmltopdf，这个工具的下载网站是：https://wkhtmltopdf.org/downloads.html，根据自己的操作系统下载对应的版本即可。ps：这里要记住安装目录啊，下面要用到它，不要忘记它的安装目录~

上面说到了pdfkit这个模块，这个是第三方模块，需要安装，使用pip安装即可。

```
pip install pdfkit
```

**写代码实现**
---------

pdfkit它给咱们提供了很多功能，可以给它一个 url，他会自动获取 url 里面的内容，帮你保存好，也可以给他一个 html 文件，也可以保存，也可以给他一个字符串，也可以保存成 pdf，下面是代码：

```python
import pdfkit
 
url\='https://www.cnblogs.com/sriba/p/8043294.html'#一篇博客的url
confg = pdfkit.configuration(wkhtmltopdf='C:\\Python35\\wkhtmltopdf.exe')
#这里指定一下wkhtmltopdf的路径，这就是我为啥在前面让记住这个路径
pdfkit.from\_url(url, 'jmeter\_下载文件.pdf',configuration=confg)
# from\_url这个函数是从url里面获取内容
# 这有3个参数，第一个是url，第二个是文件名，第三个就是khtmltopdf的路径
 
#pdfkit.from\_file('my.html', 'jmeter\_下载文件2.pdf',configuration=confg)
# from\_file这个函数是从文件里面获取内容
# 这有3个参数，第一个是一个html文件，第二个是文生成的pdf的名字，第三个就是khtmltopdf的路径
 
html\='''
<div>
<h1>title</h1>
<p>content</p>
</div>
'''#这个html是我从一个页面上拷下来的一段，也可以
 
#pdfkit.from\_string(html, 'jmeter\_下载文件3.pdf',configuration=confg)
# from\_file这个函数是从一个字符串里面获取内容
# 这有3个参数，第一个是一个字符串，第二个是文生成的pdf的名字，第三个就是khtmltopdf的路径
```

是不是很简单，快去试试吧
