---
title: Spider-ChromeDriver的安装
date: 2022-01-30 14:58:36
tags: [Python, ChromeDriver, Spider]
categories: [Coding, Python]

---

ChromeDriver的安装
=========================================

本文字数： 1.8k 阅读时长 ≈ 2 分钟

前面我们成功安装好了`Selenium`库，但是它是一个自动化测试工具，需要浏览器来配合使用，本节中我们就介绍一下`Chrome`浏览器及`ChromeDriver`驱动的配置。

首先，下载Chrome浏览器，方法有很多，在此不再赘述。

随后安装ChromeDriver。因为只有安装ChromeDriver，才能驱动Chrome浏览器完成相应的操作。下面我们来介绍下怎样安装ChromeDriver。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   官方网站：<https://sites.google.com/a/chromium.org/chromedriver>
*   下载地址：<https://chromedriver.storage.googleapis.com/index.html>

[](about:blank#2-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C "2. 准备工作")2\. 准备工作
------------------------------------------------------------------------

在这之前请确保已经正确安装好了Chrome浏览器并可以正常运行，安装过程不再赘述。

[](about:blank#3-%E6%9F%A5%E7%9C%8B%E7%89%88%E6%9C%AC "3. 查看版本")3\. 查看版本
------------------------------------------------------------------------

点击Chrome菜单“帮助”→“关于Google Chrome”，即可查看Chrome的版本号，如图1-14所示。
![](https://s2.loli.net/2023/07/05/phaAMGJKiyXuBCP.jpg)

图1-14 Chrome版本号

这里我的Chrome版本是58.0。

请记住Chrome版本号，因为选择ChromeDriver版本时需要用到。

[](about:blank#4-%E4%B8%8B%E8%BD%BDChromeDriver "4. 下载ChromeDriver")4\. 下载ChromeDriver
--------------------------------------------------------------------------------------

打开ChromeDriver的官方网站，可以看到最新版本为2.31，其支持的Chrome浏览器版本为58~60，官网页面如图1-15所示。

> 更新：现在 2020 年，Chrome 版本已经更新到 80+，请以最新的 ChromeDriver 为准！https://chromedriver.chromium.org/downloads

![](https://s2.loli.net/2023/07/05/zImSbfCGF7v8o94.jpg)

图1-15 官网页面

如果你的Chrome版本号是58~60，那么可以选择此版本下载。

如果你的Chrome版本号不在此范围，可以继续查看之前的ChromeDriver版本。每个版本都有相应的支持Chrome版本的介绍，请找好自己的Chrome浏览器版本对应的ChromeDriver版本再下载，否则可能无法正常工作。

找好对应的版本号后，随后到ChromeDriver镜像站下载对应的安装包即可：https://chromedriver.storage.googleapis.com/index.html。在不同平台下，可以下载不同的安装包。

[](about:blank#5-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E9%85%8D%E7%BD%AE "5. 环境变量配置")5\. 环境变量配置
----------------------------------------------------------------------------------------------

下载完成后，将ChromeDriver的可执行文件配置到环境变量下。

在Windows下，建议直接将chromedriver.exe文件拖到Python的Scripts目录下，如图1-16所示。

![](https://s2.loli.net/2023/07/05/JbuKZWMiEPkQ1v9.jpg)

图1-16 Python Scripts目录

此外，也可以单独将其所在路径配置到环境变量，具体的配置方法请参见1.1节。

在Linux和Mac下，需要将可执行文件配置到环境变量或将文件移动到属于环境变量的目录里。

例如，要移动文件到/usr/bin目录。首先，需要在命令行模式下进入其所在路径，然后将其移动到/usr/bin：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">sudo mv chromedriver <span class="regexp">/usr/</span>bin</span><br></pre></td></tr></tbody></table>

当然，也可以将ChromeDriver配置到$PATH。首先，可以将可执行文件放到某一目录，目录可以任意选择，例如将当前可执行文件放在/usr/local/chromedriver目录下，接下来可以修改~/.profile文件，相关命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="builtin-name">export</span> <span class="attribute">PATH</span>=<span class="string">"<span class="variable">$PATH</span>:/usr/local/chromedriver"</span></span><br></pre></td></tr></tbody></table>

保存后执行如下命令：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">source</span> ~/.<span class="keyword">profile</span></span><br></pre></td></tr></tbody></table>

即可完成环境变量的添加。

[](about:blank#6-%E9%AA%8C%E8%AF%81%E5%AE%89%E8%A3%85 "6. 验证安装")6\. 验证安装
------------------------------------------------------------------------

配置完成后，就可以在命令行下直接执行`chromedriver`命令了：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">chromedriver</span></span><br></pre></td></tr></tbody></table>

如果输入控制台有类似图1-17所示的输出，则证明ChromeDriver的环境变量配置好了。

![1-17.jpg](https://s2.loli.net/2023/07/05/4ZqmuXKPNlfiAUW.jpg)

图1-17 控制台输出

随后再在程序中测试，执行如下Python代码：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">from</span> <span class="keyword">selenium </span><span class="meta">import</span> webdriver</span><br><span class="line"><span class="keyword">browser </span>= webdriver.Chrome()</span><br></pre></td></tr></tbody></table>

运行之后，如果弹出一个空白的Chrome浏览器，则证明所有的配置都没有问题。如果没有弹出，请检查之前的每一步配置。

如果弹出后闪退，则可能是`ChromeDriver`版本和Chrome版本不兼容，请更换ChromeDriver版本。

如果没有问题，接下来就可以利用Chrome来做网页抓取了。

