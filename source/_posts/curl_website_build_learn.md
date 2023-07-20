---
title: curl初学者开发指南 
date: 2022-11-06 14:58:36
tags: [Curl, Bash]
categories: [Coding, Curl]
---

curl初学开发指南 
==========

我一向以为，[curl](http://curl.haxx.se/)只是一个编程用的函数库。

最近才发现，这个命令本身，就是一个无比有用的网站开发工具，请看我整理的它的用法。

\===================================

**curl网站开发指南**

![](https://s2.loli.net/2023/07/09/UEH13h58a9KR2BF.png)

[curl](http://curl.haxx.se/)是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面。

它支持多种协议，下面举例讲解如何将它用于网站开发。

**一、查看网页源码**

直接在curl命令后加上网址，就可以看到网页源码。我们以网址www.sina.com为例（选择该网址，主要因为它的网页代码较短）：
```
$ curl www.sina.com
```
```html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">  
<html><head>  
<title>301 Moved Permanently</title>  
</head><body>  
<h1>Moved Permanently</h1>  
<p>The document has moved <a href="http://www.sina.com.cn/">here</a>.</p>  
</body></html>
```
如果要把这个网页保存下来，可以使用\`-o\`参数，这就相当于使用wget命令了。
```bash
$ curl -o \[文件名\] www.sina.com
```
**二、自动跳转**

有的网址是自动跳转的。使用\`-L\`参数，curl就会跳转到新的网址。
```bash
$ curl -L www.sina.com
```
键入上面的命令，结果就自动跳转为www.sina.com.cn。

**三、显示头信息**

\`-i\`参数可以显示http response的头信息，连同网页代码一起。
```bash
$ curl -i www.sina.com
```
```bash
HTTP/1.0 301 Moved Permanently  
Date: Sat, 03 Sep 2011 23:44:10 GMT  
Server: Apache/2.0.54 (Unix)  
Location: http://www.sina.com.cn/  
Cache-Control: max-age=3600  
Expires: Sun, 04 Sep 2011 00:44:10 GMT  
Vary: Accept-Encoding  
Content-Length: 231  
Content-Type: text/html; charset=iso-8859-1  
Age: 3239  
X-Cache: HIT from sh201-9.sina.com.cn  
Connection: close

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">  
<html><head>  
<title>301 Moved Permanently</title>  
</head><body>  
<h1>Moved Permanently</h1>  
<p>The document has moved <a href="http://www.sina.com.cn/">here</a>.</p>  
</body></html>
```
\`-I\`参数则是只显示http response的头信息。

**四、显示通信过程**

\`-v\`参数可以显示一次http通信的整个过程，包括端口连接和http request头信息。
```bash
$ curl -v www.sina.com
```
> 　　\* About to connect() to www.sina.com port 80 (#0)  
> 　　\* Trying 61.172.201.195... connected  
> 　　\* Connected to www.sina.com (61.172.201.195) port 80 (#0)  
> 　　> GET / HTTP/1.1  
> 　　> User-Agent: curl/7.21.3 (i686-pc-linux-gnu) libcurl/7.21.3 OpenSSL/0.9.8o zlib/1.2.3.4 libidn/1.18  
> 　　> Host: www.sina.com  
> 　　> Accept: \*/\*  
> 　　>  
> 　　\* HTTP 1.0, assume close after body  
> 　　< HTTP/1.0 301 Moved Permanently  
> 　　< Date: Sun, 04 Sep 2011 00:42:39 GMT  
> 　　< Server: Apache/2.0.54 (Unix)  
> 　　< Location: http://www.sina.com.cn/  
> 　　< Cache-Control: max-age=3600  
> 　　< Expires: Sun, 04 Sep 2011 01:42:39 GMT  
> 　　< Vary: Accept-Encoding  
> 　　< Content-Length: 231  
> 　　< Content-Type: text/html; charset=iso-8859-1  
> 　　< X-Cache: MISS from sh201-19.sina.com.cn  
> 　　< Connection: close  
> 　　<  
> 　　<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">  
> 　　<html><head>  
> 　　<title>301 Moved Permanently</title>  
> 　　</head><body>  
> 　　<h1>Moved Permanently</h1>  
> 　　<p>The document has moved <a href="http://www.sina.com.cn/">here</a>.</p>  
> 　　</body></html>  
> 　　\* Closing connection #0

如果你觉得上面的信息还不够，那么下面的命令可以查看更详细的通信过程。
```bash
$ curl --trace output.txt www.sina.com
```
或者
```bash
$ curl --trace-ascii output.txt www.sina.com
```
运行后，请打开output.txt文件查看。

**五、发送表单信息**

发送表单信息有GET和POST两种方法。GET方法相对简单，只要把数据附在网址后面就行。
```bash
$ curl example.com/form.cgi?data=xxx
```
POST方法必须把数据和网址分开，curl就要用到--data参数。
```bash
$ curl -X POST --data "data=xxx" example.com/form.cgi
```
如果你的数据没有经过表单编码，还可以让curl为你编码，参数是\`--data-urlencode\`。
```bash
$ curl -X POST--data-urlencode "date=April 1" example.com/form.cgi
```
**六、HTTP动词**

curl默认的HTTP动词是GET，使用\`-X\`参数可以支持其他动词。
```bash
$ curl -X POST www.example.com
```
```bash
$ curl -X DELETE www.example.com
```
**七、文件上传**

假定文件上传的表单是下面这样：
```html
<form method="POST" enctype='multipart/form-data' action="upload.cgi">  
　　<input type=file name=upload>  
　　<input type=submit name=press value="OK">  
</form>
```
你可以用curl这样上传文件：
```bash
$ curl --form [\[email protected\]](https://www.ruanyifeng.com/cdn-cgi/l/email-protection) --form press=OK \[URL\]
```
**八、Referer字段**

有时你需要在http request头信息中，提供一个referer字段，表示你是从哪里跳转过来的。
```bash
$ curl --referer http://www.example.com http://www.example.com
```
**九、User Agent字段**

这个字段是用来表示客户端的设备信息。服务器有时会根据这个字段，针对不同设备，返回不同格式的网页，比如手机版和桌面版。

iPhone4的User Agent是

> 　　Mozilla/5.0 (iPhone; U; CPU iPhone OS 4\_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7

curl可以这样模拟：
```bash
$ curl --user-agent "\[User Agent\]" \[URL\]
```
**十、cookie**

使用\`--cookie\`参数，可以让curl发送cookie。
```bash
$ curl --cookie "name=xxx" www.example.com
```
至于具体的cookie的值，可以从http response头信息的\`Set-Cookie\`字段中得到。

\`-c cookie-file\`可以保存服务器返回的cookie到文件，\`-b cookie-file\`可以使用这个文件作为cookie信息，进行后续的请求。
```bash
$ curl -c cookies http://example.com  
$ curl -b cookies http://example.com
```

**十一、增加头信息**

有时需要在http request之中，自行增加一个头信息。\`--header\`参数就可以起到这个作用。
```bash
$ curl --header "Content-Type:application/json" http://example.com
```

**十二、HTTP认证**

有些网域需要HTTP认证，这时curl需要用到\`--user\`参数。
```bash
$ curl --user name:password example.com
```
**【参考资料】**

　　\* [Using cURL to automate HTTP jobs](http://curl.haxx.se/docs/httpscripting.html)

　　\* [教你学用CURL](http://bbs.et8.net/bbs/showthread.php?t=568472)

　　\* [9 uses for cURL worth knowing](https://httpkit.com/resources/HTTP-from-the-Command-Line/)

