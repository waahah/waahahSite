---
title: Spider_X-Forward-For 看破红尘，代理 IP 无所遁形！
date: 2022-02-18 14:58:36
tags: [Python, Proxy, Spider]
categories: [Coding, Python]
---

X-Forward-For 看破红尘，代理 IP 无所遁形！
==============================

本文字数： 7.9k 阅读时长 ≈ 7 分钟

![](http://q0revehsm.bkt.clouddn.com/sfhfpc/20191124150957.png) 
在开始了解 X-Forward-For 之前，我们先来假设一个场景。你是一名爬虫工程师，现在要爬取目标网站 xxx.com 上面的内容。在编码的时候，你发现单位时间内请求频率过高时会被限制，猜测应该是**目标网站针对 IP 地址做了限制**。现在你有两种选择：

*   **单机，用 IP 代理解决频率高被限制的问题。**
*   **多机，用分布式爬虫解决单机 IP 被限制的问题。**

由于目标网站只需要爬取一次，**单机+IP 代理**这种组合的成本更低，所以你选择了它。从 IP 代理服务商 xx 处购买了代理服务后，你进行了新一轮的测试，代码片段 Forwarded-Test 为测试代码。

```python
import requests

# 请求地址
targetUrl = "http://111.231.93.117/"

# 代理服务器
proxyHost = "220.185.128.170"
proxyPort = "9999"

proxyMeta = "http://%(host)s:%(port)s" % {

    "host": proxyHost,
    "port": proxyPort,
}

proxies = {

    "http": proxyMeta,
}
# 设定一个 Referer
header = {
    "Referer": "http://www.sfhfpc.com",
}
resp = requests.get(targetUrl, proxies=proxies, headers=header)
print(resp.status_code)
print(resp.text)
```

代码片段 Forwarded-Test 代码运行后，你发现你仍然被限制！ 顿时感到头大，于是在各大搜索引擎寻找相关资料，例如：

> ip 代理无效 识别 ip 代理 ip 代理被发现

你发现很多文章中都提到一个东西 X-Forward-For，大家都说它能够**看破** IP 代理。 ![](http://q0revehsm.bkt.clouddn.com/sfhfpc/20191127160630.jpg) 那么问题来了：

*   X-Forward-For 到底是什么呢？
*   为什么 X-Forward-For 能够发现我们使用了 **IP 代理**
*   它怎么能找到**原始 IP** 呢？
*   有什么方法可以骗过 X-Forward-For 呢？

带着这些问题，我们就来研究一下 X-Forward-For。

[](about:blank#X-Forward-For-%E6%98%AF%E4%BB%80%E4%B9%88 "X-Forward-For 是什么")X-Forward-For 是什么
----------------------------------------------------------------------------------------------

X-Forward-For 跟 Referer 和 User-Agent 一样，都是 HTTP 中的头域。HTTP/1.1 的 **RFC** 文档编号为 2616，在 2616 中并未提及 X-Forward-For，也就是说 HTTP/1.1 出现的时候 X-Forward-For 还没出生。真正提出 X-Forward-For 的是2014 年的 RFC7239（详见 https://www.rfc-editor.org/rfc/rfc7239.txt），这时候 X-Forward-For 作为**HTTP 扩展**出现。 [RFC](about:blank#fn_RFC): 全称 Request For Comments，是一系列以编号排定的文件。它收集了互联网相关的协议信息，你可以抽象地将 RFC2616 理解为 HTTP/1.1 的协议规范。Websocket 协议规范的详细解读可参考《Python3 反爬虫原理与绕过实战》一书。 关于 X-Forward-For 的所有正确描述都写在了 RFC7239 中，所有符合规范的 HTTP 也会遵守 RFC7239。当然，你也可以选择**不遵守**。 [不遵守](about:blank#fn_%E4%B8%8D%E9%81%B5%E5%AE%88): 实际上，RFC 只是一种规范、约定，作为大家统一行径的参考，并未强制实现。很多反爬虫手段就是另辟蹊径，采用了与 RFC 约定不同的策略，具体反爬虫思路和案例可参考《Python3 反爬虫原理与绕过实战》一书。 RFC7239 很长，我们不必逐一阅读。实际上跟我们相关的只有几个部分，例如：

```
1.Abstract
7.5. Example Usage
```
Abstract 是本文章的摘要，它描述了 RFC7239 的作用：

> This document defines an HTTP extension header field that allows proxy components to disclose information lost in the proxying process, for example, the originating IP address of a request or IP address of the proxy on the user-agent-facing interface. In a path of proxying components, this makes it possible to arrange it so that each subsequent component will have access to, for example, all IP addresses used in the chain of proxied HTTP requests. This document also specifies guidelines for a proxy administrator to anonymize the origin of a request.

大体意思为本文的定义（扩展）了一个 HTTP 头域，这个字段允许代理组件披露原始 IP 地址。 从这里我们了解到 X-Forward-For 的正向用途是便于服务端识别原始 IP，并根据原始 IP 作出动态处理。例如服务端按照 IP 地址进行负载均衡时，如果能够**看破** IP 代理，取得原始 IP 地址，那么就能够作出**有效**的负载。否则有可能造成资源分配不均，导致**假负载均衡**的情况出现。 Example Usage 给出了 X-Forward-For 的使用示例：

> A request from a client with IP address 192.0.2.43 passes through a proxy with IP address 198.51.100.17, then through another proxy with IP address 203.0.113.60 before reaching an origin server. This could, for example, be an office client behind a corporate malware filter talking to a origin server through a reverse proxy. o The HTTP request between the client and the first proxy has no “Forwarded” header field. o The HTTP request between the first and second proxy has a “Forwarded: for=192.0.2.43” header field. o The HTTP request between the second proxy and the origin server has a “Forwarded: for=192.0.2.43, for=198.51.100.17;by=203.0.113.60;proto=http;host=example.com” header field.

假设原始 IP 为192.0.2.43，它的请求使用了地址为 198.51.100.17 的代理，在到达目标服务器 203.0.113.60 之前还使用了另外一个代理（文章假设另外一个代理为 222.111.222.111）。 这种情况下

*   客户端和第一个代理之间的 HTTP 请求中没有 Forwarded 头域。
*   第一个代理和第二个代理之间的 HTTP 请求中有 Forwarded 头域，头域及值为 Forwarded: for=192.0.2.43 。
*   第二个代理和服务器之间的 HTTP 请求中有 Forwarded 头域，头域及值为 Forwarded: for=192.0.2.43, for=198.51.100.17;by=203.0.113.60;proto=http;host=example.com”

图 forwarded-client-server 描述了上述情景。 ![](http://q0revehsm.bkt.clouddn.com/sfhfpc/20191124123035.jpg) 图 forwarded-client-server 由于客户端到代理 1 的请求没有使用代理，所以值为空或短横线。到代理 2 时，中间经过了代理 1，所以值为原始 IP。到服务端时，中间经过了代理 1 和代理2 ，所以值为原始 IP 和代理 1 IP。 上面就是关于 RFC7239 中部分内容的解读。看到这里，想必你已有丝丝头绪，接下来我们再捋一捋。

[](about:blank#IP-%E4%BB%A3%E7%90%86%E5%AE%9E%E9%AA%8C "IP 代理实验")IP 代理实验
------------------------------------------------------------------------

首先我在自己的测试服务器上安装并启动了 Nginx，它的默认日志格式如下：

```python
log_format  main  
'$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
```

即 access.log 文件中会记录客户端 IP 地址、客户端时间、请求方式、响应状态码、响应正文大小、Referer、User-Agent 和代理清单。

> 提示：Nginx 中 $http\_x\_forwarded\_for 对应的值这里称为代理清单，它与 RFC7239 中的 Forwarded 含义相同。

当我使用计算机终端浏览器访问测试服务器地址时，对应的日志记录如下：

```python
180.137.156.168 - - [24/Nov/2019:12:41:19 +0800] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15" "-"
```

服务器记录到的信息含义如下：

*   客户端 IP 为 180.137.156.168
*   客户端时间为 \[24/Nov/2019:12:41:19 +0800\]
*   请求方式为 GET / HTTP/1.1
*   响应状态码为 200
*   响应正文大小为 612
*   Referer 为短横线，即为空
*   User-Agent 显示浏览器品牌为 Safari
*   代理清单为短横线，即为空。

由于本次并未使用 IP 代理，那么代理清单自然就是短横线。接着我们用 Python 代码测试一下，代码片段 Python-Request 为测试代码。

```python
import requests
resp = requests.get("http://111.231.93.117/")
print(resp.status_code)

```

代码片段 Python-Request 代码运行结果为 200，即目标服务器正确响应了本次请求。对应的日志记录如下：

```
180.137.156.168 - - [24/Nov/2019:12:49:41 +0800] "GET / HTTP/1.1" 200 612 "-" "python-requests/2.21.0" "-"
```

这次也没有使用 IP 代理，所以代理清单依旧是短横线。现在用代理 IP 测试一下，代码片段 Forwarded-Test 中使用了 IP 代理，我们就用它进行测试即可。这里的代理服务器 IP 地址为 220.185.128.170，根据之前对 RFC7239 的了解，猜测本次请求对应的 Forwarded 记录的会是原始 IP，而客户端 IP 则是代理服务器的 IP。 代码运行后，服务器记录到对应的日志信息如下：

```
220.185.128.170 - - [24/Nov/2019:12:52:58 +0800] "GET / HTTP/1.1" 200 612 "http://www.sfhfpc.com" "python-requests/2.21.0" "180.137.156.168"
```

果然，记录中客户端 IP 对应的是 220.185.128.170，即代理服务器的 IP。Forwarded 中记录的 180.137.156.168 是 Python 程序所在的计算机 IP 地址，即原始 IP。 这与 RFC7239 的描述完全相符，服务端可以通过 Forwarded 找到原始 IP，甚至是使用过的代理服务器 IP。

[](about:blank#%E8%B0%83%E7%9A%AE%E7%9A%84-IP-%E4%BB%A3%E7%90%86%E5%95%86 "调皮的 IP 代理商")调皮的 IP 代理商
-------------------------------------------------------------------------------------------------

刚才我们用的是普通 IP 代理，由于它很容易被识别，达不到**隐匿**的目的，所以 IP 代理商又推出了**高匿代理**。 [高匿代理](about:blank#fn_%E9%AB%98%E5%8C%BF%E4%BB%A3%E7%90%86): 相对于普通 IP 代理而言，使用高匿代理后，原始 IP 会被隐藏得更好，服务端更难发现。 这里我使用了 芝麻代理 服务商提供的免费高匿 IP，注册后就可以领取免费 IP，简直就是开箱即用。 ![](http://q0revehsm.bkt.clouddn.com/sfhfpc/20191127155616.png) 将代码片段 Forwarded-Test 中用于设置代理服务器 IP 和端口号的字段值改为高匿 IP 及对应的端口号即可，例如：

```python
# 代理服务器
proxyHost = "58.218.92.132"  # "220.185.128.170"
proxyPort = "2390"  # "9999"
```

保存更改后运行代码，对应的日志记录如下：

```python
125.82.188.4 - - [24/Nov/2019:13:05:07 +0800] "GET / HTTP/1.1" 200 612 "http://www.sfhfpc.com" "python-requests/2.21.0" "-"

```

原始 IP 为 125.82.188.4，代理清单为短横线。细心的你可能会有疑问，为什么填写的代理 IP 是 58.218.92.132，而日志中的却不是呢？ 这是代理服务商做了多一层的转移，58.218.92.132 是给用户的入口，代理商的服务端会将入口为 58.218.92.132 的请求转给地址为 125.82.188.4。其中过程我们不用深究，高匿代理和普通代理的原理会再开一篇文章进行讨论。 日志记录说明高匿 IP 能够帮助我们实现**隐匿**的目的。说到这里不得不提一下，芝麻代理高匿 IP 的质量真的好，听说他们的 IP 还支持高并发调用，有需求的朋友不妨去试试。

[](about:blank#%E6%9C%BA%E6%99%BA%E7%9A%84%E4%BD%A0%E5%92%8C%E6%83%B3%E5%BD%93%E7%84%B6%E7%9A%84%E5%BC%80%E5%8F%91%E8%80%85 "机智的你和想当然的开发者")机智的你和想当然的开发者
-------------------------------------------------------------------------------------------------------------------------------------------------------

难道普通代理就一定会被 X-Forward-For 发现吗？ 办法总是会有的，翻一下 http://www.sfhfpc.com 或者公众号**韦世东学算法和反爬虫**说不定灵感就来了！在解读 RFC7239 - Example Usage 时，我们了解到 X-Forward-For 会记录原始 IP，在使用多层 IP 代理的情况下记录的是上层 IP。利用这个特点，是不是可以**伪造**一下呢？ 既然 X-Forward-For 和 Referer 一样是头域，那么就说明它可以被人为改变。我们只需要在请求时加上 X-Forward-For 请求头和对应的值即可。代码片段 Python-Request-CustomHeader 实现了这样的需求。

```python
import requests

# 请求地址
targetUrl = "http://111.231.93.117/"

# 代理服务器
proxyHost = "220.185.128.170"
proxyPort = "9999"

proxyMeta = "http://%(host)s:%(port)s" % {

    "host": proxyHost,
    "port": proxyPort,
}

proxies = {
    "http": proxyMeta,
}
header = {
    "Referer": "http://www.sfhfpc.com",
    "X-Forwarded-For": "_",
}
resp = requests.get(targetUrl, proxies=proxies, headers=header)
print(resp.status_code)
print(resp.text)
```

代码片段 Python-Request-CustomHeader 代码运行后，控制台结果如下：

```
200
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

响应状态码是 200，并且返回了 Welcome to nginx 等字样，这说明请求成功。对应的日志记录为：

```python
220.185.128.170 - - [24/Nov/2019:14:13:24 +0800] "GET / HTTP/1.1" 200 612 "http://www.sfhfpc.com" "python-requests/2.21.0" "_, 180.137.156.168"
```
记录显示，原始 IP 为 220.185.128.170、代理清单为 “\_, 180.137.156.168”。实际上原始 IP 是 180.137.156.168，而代理服务器的 IP 是 220.185.128.170。代理清单中多出来的短横线是我们在代码中加上的，这里居然也显示了。这说明我们只需要在请求时附带上 X-Forward-For 头域就可以达到**伪造**的目的。 如果我想让服务端认为原始 IP 为 112.113.115.116，那么只需要将代码片段 Python-Request-CustomHeader 中 header 对象中 X-Forwarded-For 键对应的值设置为 112.113.115.116 即可。 保存后运行代码，对应的日志记录如下：

```
220.185.128.170 - - [24/Nov/2019:14:28:08 +0800] "GET / HTTP/1.1" 200 612 "http://www.sfhfpc.com" "python-requests/2.21.0" "112.113.115.116, 180.137.156.168"
```

根据 RFC7239 - Example Usage，开发者会认为代理清单中的第一组 IP 地址是原始 IP，殊不知这是我们特意为他准备的。

[](about:blank#%E5%B0%8F%E7%BB%93 "小结")小结
-----------------------------------------

X-Forward-For 是 HTTP 协议扩展的一个头域，它可以识别出经过多层代理后的原始 IP。捣蛋的人向来不喜欢遵守约定和规范，来了个鱼目混珠。更多关于 RFC 协议解读和通过违反约定实现的反爬虫措施可翻阅《Python3 反爬虫原理与绕过实战》一书。 **提示：点击链接「免费领 IP」可前往芝麻代理领取免费 IP。**
