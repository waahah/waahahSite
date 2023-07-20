---
title: Flask的安装
date: 2022-02-26 14:58:36
tags: [Python, Flask, Spider, Web]
categories: [Coding, Python]
---

Flask的安装
==================================
本文字数： 611 阅读时长 ≈ 1 分钟

`Flask`是一个轻量级的`Web`服务程序，它简单、易用、灵活，这里主要用来做一些`API`服务。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   GitHub：<https://github.com/pallets/flask>
*   官方文档：<http://flask.pocoo.org>
*   中文文档：<http://docs.jinkan.org/docs/flask>
*   PyPI：<https://pypi.python.org/pypi/Flask>

[](about:blank#2-pip%E5%AE%89%E8%A3%85 "2. pip安装")2\. pip安装
-----------------------------------------------------------

这里推荐使用pip安装，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">pip3 <span class="keyword">install</span> flask</span><br></pre></td></tr></tbody></table>

运行完毕后，就完成安装了。

[](about:blank#3-%E9%AA%8C%E8%AF%81%E5%AE%89%E8%A3%85 "3. 验证安装")3\. 验证安装
------------------------------------------------------------------------

安装成功后，可以运行如下实例代码测试一下：

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
```

可以发现，系统会在5000端口开启Web服务，控制台输出如下：

```powershell
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

直接访问<http://127.0.0.1:5000/>，可以观察到网页中呈现了Hello World!，如图1-41所示，一个最简单的Flask程序就运行成功了。

![1-41.png](https://s2.loli.net/2023/07/05/jz5ZlPSCNYLdny6.png)
图1-41 运行结果

[](about:blank#4-%E7%BB%93%E8%AF%AD "4. 结语")4\. 结语
--------------------------------------------------

后面，我们可以利用Flask来暴漏python API提供服务。
