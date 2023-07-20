---
title: Spider-Selenium的安装
date: 2022-01-26 14:58:36
tags: [Python, Selenium, Spider]
categories: [Coding, Python]

---

    

Selenium的安装
=====================================

本文字数： 799 阅读时长 ≈ 1 分钟

Selenium是一个自动化测试工具，利用它我们可以驱动浏览器执行特定的动作，如点击、下拉等操作。对于一些JavaScript渲染的页面来说，这种抓取方式非常有效。下面我们来看看Selenium的安装过程。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   官方网站：<http://www.seleniumhq.org>
*   GitHub：<https://github.com/SeleniumHQ/selenium/tree/master/py>
*   PyPI：<https://pypi.python.org/pypi/selenium>
*   官方文档：<http://selenium-python.readthedocs.io>
*   中文文档：<http://selenium-python-zh.readthedocs.io>

[](about:blank#2-pip%E5%AE%89%E8%A3%85 "2. pip安装")2\. pip安装
-----------------------------------------------------------

这里推荐直接使用pip安装，执行如下命令即可：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">pip3 <span class="keyword">install</span> selenium</span><br></pre></td></tr></tbody></table>

[](about:blank#3-wheel%E5%AE%89%E8%A3%85 "3. wheel安装")3\. wheel安装
-----------------------------------------------------------------

此外，也可以到PyPI下载对应的wheel文件进行安装（下载地址：https://pypi.python.org/pypi/selenium/#downloads），如最新版本为3.4.3，则下载selenium-3.4.3-py2.py3-none-any.whl即可。

然后进入wheel文件目录，使用pip安装：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="selector-tag">pip3</span> <span class="selector-tag">install</span> <span class="selector-tag">selenium-3</span><span class="selector-class">.4</span><span class="selector-class">.3-py2</span><span class="selector-class">.py3-none-any</span><span class="selector-class">.whl</span></span><br></pre></td></tr></tbody></table>

[](about:blank#4-%E9%AA%8C%E8%AF%81%E5%AE%89%E8%A3%85 "4. 验证安装")4\. 验证安装
------------------------------------------------------------------------

进入Python命令行交互模式，导入Selenium包，如果没有报错，则证明安装成功：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">$ python3</span><br><span class="line"><span class="meta">&gt;&gt;</span>&gt; import selenium</span><br></pre></td></tr></tbody></table>

但这样做还不够，因为我们还需要用浏览器（如Chrome、Firefox等）来配合Selenium工作。

后面我们会介绍Chrome、Firefox、PhantomJS三种浏览器的配置方式。有了浏览器，我们才可以配合Selenium进行页面的抓取。

