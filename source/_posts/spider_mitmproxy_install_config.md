---
title: Spider-mitmproxy的安装
date: 2022-02-06 14:58:36
tags: [Python, mitmproxy, Spider]
categories: [Coding, Python]


---

mitmproxy的安装
======================================

本文字数： 3.3k 阅读时长 ≈ 13 分钟

mitmproxy是一个支持HTTP和HTTPS的抓包程序，类似Fiddler、Charles的功能，只不过它通过控制台的形式操作。

此外，mitmproxy还有两个关联组件，一个是mitmdump，它是mitmproxy的命令行接口，利用它可以对接Python脚本，实现监听后的处理；另一个是mitmweb，它是一个Web程序，通过它以清楚地观察到mitmproxy捕获的请求。

本节中，我们就来了解一下mitmproxy、mitmdump和mitmweb的安装方式。

[](about:blank#1-%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5 "1. 相关链接")1\. 相关链接
------------------------------------------------------------------------

*   GitHub：<https://github.com/mitmproxy/mitmproxy>
*   官方网站：<https://mitmproxy.org>
*   PyPI：<https://pypi.python.org/pypi/mitmproxy>
*   官方文档：<http://docs.mitmproxy.org>
*   mitmdump脚本：<http://docs.mitmproxy.org/en/stable/scripting/overview.html>
*   下载地址：<https://github.com/mitmproxy/mitmproxy/releases>
*   DockerHub：<https://hub.docker.com/r/mitmproxy/mitmproxy>

[](about:blank#2-pip%E5%AE%89%E8%A3%85 "2. pip安装")2\. pip安装
-----------------------------------------------------------

最简单的安装方式还是使用pip，直接执行如下命令即可安装：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">pip3 <span class="keyword">install</span> mitmproxy</span><br></pre></td></tr></tbody></table>

这是最简单和通用的安装方式，执行完毕之后即可完成mitmproxy的安装，另外还附带安装了mitmdump和mitmweb这两个组件。如果不想用这种方式安装，也可以选择后面列出的专门针对各个平台的安装方式或者Docker安装方式。

[](about:blank#3-Windows%E4%B8%8B%E7%9A%84%E5%AE%89%E8%A3%85 "3. Windows下的安装")3\. Windows下的安装
---------------------------------------------------------------------------------------------

可以到GitHub上的Releases页面（链接为：<https://github.com/mitmproxy/mitmproxy/releases/>）获取安装包，如图1-59所示。
![1-60.jpg](https://s2.loli.net/2023/07/05/6KcAxn49fCYXMRq.jpg)
图1-59 下载页面

比如，当前的最新版本为2.0.2，则可以选择下载Windows下的exe安装包mitmproxy-2.0.2-windows-installer.exe，下载后直接双击安装包即可安装。

注意，在Windows上不支持mitmproxy的控制台接口，但是可以使用mitmdump和mitmweb。

[](about:blank#4-Linux%E4%B8%8B%E7%9A%84%E5%AE%89%E8%A3%85 "4. Linux下的安装")4\. Linux下的安装
---------------------------------------------------------------------------------------

在Linux下，可以下载编译好的二进制包（下载地址<https://github.com/mitmproxy/mitmproxy/releases/>），此发行包一般是最新版本，它包含了最新版本的mitmproxy和内置的Python 3环境，以及最新的OpenSSL环境。

如果你的环境里没有Python 3和OpenSSL环境，建议使用此种方式安装。

下载之后，需要解压并将其配置到环境变量：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">tar -zxvf mitmproxy<span class="number">-2.0</span><span class="number">.2</span>-linux.tar.gz</span><br><span class="line">sudo mv mitmproxy mitmdump mitmweb /usr/bin</span><br></pre></td></tr></tbody></table>

这样就可以将3个可执行文件移动到了/usr/bin目录。而一般情况下，/usr/bin目录都已经配置在了环境变量下，所以接下来可以直接调用这3个工具了。

[](about:blank#5-Mac%E4%B8%8B%E7%9A%84%E5%AE%89%E8%A3%85 "5. Mac下的安装")5\. Mac下的安装
---------------------------------------------------------------------------------

Mac下的安装非常简单，直接使用Homebrew即可，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">brew </span><span class="keyword">install </span>mitmproxy</span><br></pre></td></tr></tbody></table>

执行命令后，即可完成mitmproxy的安装。

[](about:blank#6-Docker%E5%AE%89%E8%A3%85 "6. Docker安装")6\. Docker安装
--------------------------------------------------------------------

mitmproxy也支持Docker，其DockerHub的地址为<https://hub.docker.com/r/mitmproxy/mitmproxy/>。

在Docker下，mitmproxy的安装命令为：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">docker run --rm -it -p <span class="number">8080</span>:<span class="number">8080</span> mitmproxy/mitmproxy mitmdump</span><br></pre></td></tr></tbody></table>

这样就在8080端口上启动了mitmproxy和mitmdump。

如果想要获取CA证书，可以选择挂载磁盘选项，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">docker run <span class="params">--rm</span> -it -v ~<span class="string">/.mitmproxy</span>:<span class="string">/home/mitmproxy/.mitmproxy</span> -p 8080<span class="function">:8080</span> mitmproxy/mitmproxy mitmdump</span><br></pre></td></tr></tbody></table>

这样就可以在~/.mitmproxy目录下找到CA证书。

另外，还可以在8081端口上启动mitmweb，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">docker run --rm -it -p <span class="number">8080</span>:<span class="number">8080</span> -p <span class="number">127.0</span><span class="number">.0</span><span class="number">.1</span>:<span class="number">8081</span>:<span class="number">8081</span> mitmproxy/mitmproxy mitmweb</span><br></pre></td></tr></tbody></table>

更多启动方式可以参考Docker Hub的安装说明。

[](about:blank#7-%E8%AF%81%E4%B9%A6%E9%85%8D%E7%BD%AE "7. 证书配置")7\. 证书配置
------------------------------------------------------------------------

对于mitmproxy来说，如果想要截获HTTPS请求，就需要设置证书。mitmproxy在安装后会提供一套CA证书，只要客户端信任了mitmproxy提供的证书，就可以通过mitmproxy获取HTTPS请求的具体内容，否则mitmproxy是无法解析HTTPS请求的。

首先，运行以下命令产生CA证书，并启动mitmdump：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">mitmdump</span></span><br></pre></td></tr></tbody></table>

接下来，我们就可以在用户目录下的.mitmproxy目录里面找到CA证书，如图1-60所示。

![](https://s2.loli.net/2023/07/05/VWRQxKG2oDJHU5O.jpg)图1-60 证书文件

证书一共5个，表1-1简要说明了这5个证书。

表1-1 5个证书及其说明

名称

描述

mitmproxy-ca.pem

PEM格式的证书私钥

mitmproxy-ca-cert.pem

PEM格式证书，适用于大多数非Windows平台

mitmproxy-ca-cert.p12

PKCS12格式的证书，适用于Windows平台

mitmproxy-ca-cert.cer

与mitmproxy-ca-cert.pem相同，只是改变了后缀，适用于部分Android平台

mitmproxy-dhparam.pem

PEM格式的秘钥文件，用于增强SSL安全性

下面我们介绍一下Windows、Mac、iOS和Android平台下的证书配置过程。

### [](about:blank#Windows "Windows")Windows

双击mitmproxy-ca.p12，就会出现导入证书的引导页，如图1-61所示。

![](https://s2.loli.net/2023/07/05/O4qxhb61pVTzlUW.jpg)图1-61 证书导入向导

直接点击“下一步”按钮即可，会出现密码设置提示，如图1-62所示。

![](https://s2.loli.net/2023/07/05/XsnSVxmgPpQWqUi.jpg)图1-62 密码设置提示

这里不需要设置密码，直接点击“下一步”按钮即可。

接下来需要选择证书的存储区域，如图1-63所示。这里点击第二个选项“将所有的证书都放入下列存储”，然后点击“浏览”按钮，选择证书存储位置为“受信任的根证书颁发机构”，接着点击“确定”按钮，然后点击“下一步”按钮。

![](https://s2.loli.net/2023/07/05/Vr7mIgUDeNfKTkn.jpg)图1-63 选择证书存储区域

最后，如果有安全警告弹出，如图1-64所示，直接点击“是”按钮即可。

![](https://s2.loli.net/2023/07/05/VJrbIm9uyWMKQPz.jpg)图1-64 安全警告

这样就在Windows下配置完CA证书了。

### [](about:blank#Mac "Mac")Mac

Mac下双击mitmproxy-ca-cert.pem即可弹出钥匙串管理页面，然后找到mitmproxy证书，打开其设置选项，选择“始终信任”即可，如图1-65所示。

![](https://s2.loli.net/2023/07/05/ThrvtgwKd1uJ7qb.jpg)图1-65 证书配置

### [](about:blank#iOS "iOS")iOS

将mitmproxy-ca-cert.pem文件发送到iPhone上，推荐使用邮件方式发送，然后在iPhone上可以直接点击附件并识别安装，如图1-66所示。

![](https://s2.loli.net/2023/07/05/zx9oOeyaAIip2rt.jpg)图1-66 证书安装页面

点击“安装”按钮之后，会跳到安装描述文件的页面，点击“安装”按钮，此时会有警告提示，如图1-67所示。

![](https://s2.loli.net/2023/07/05/EhuQTKrai23I5xL.jpg)图1-67 安装警告页面

继续点击右上角的“安装”按钮，安装成功之后会有已安装的提示，如图1-68所示。

![](https://s2.loli.net/2023/07/05/HkQ3UE2ra4vANVs.jpg)图1-68 安装成功页面

如果你的iOS版本是10.3以下的话，此处信任CA证书的流程就已经完成了。

如果你的iOS版本是10.3及以上版本，还需要在“设置”→“通用”→“关于本机”→“证书信任设置”将mitmproxy的完全信任开关打开，如图1-69所示。此时，在iOS上配置信任CA证书的流程就结束了。

![](https://s2.loli.net/2023/07/05/V8IxhPW2SsAkNz9.jpg)图1-69 证书信任设置

### [](about:blank#Android "Android")Android

在Android手机上，同样需要将证书mitmproxy-ca-cert.pem文件发送到手机上，例如直接复制文件。

接下来，点击证书，便会出现一个提示窗口，如图1-70所示。

![](https://s2.loli.net/2023/07/05/5KAXjEg3zqmVcFv.jpg)图1-70 证书安装页面

这时输入证书的名称，然后点击“确定”按钮即可完成安装。