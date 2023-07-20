---
title: Nginx 代理Google搜索 
date: 2023-07-13 14:58:36
tags: [Proxy, Nginx, Google]
categories: [Coding, Nodejs]
---

nginx 代理google搜索
================

![google.png](https://s2.loli.net/2023/07/15/VX8CALh2NSR37wD.png)

为了能够正常访问google进行搜索，之前一直用的ssh转socks代理。后来觉得如果s2主机只用来做代理，有点浪费了。于是就想了干脆反向代理一个google搜索。网上相关的文章比较多，随便搜索一下就可以找到相关的代码。基于nginx的主要配置代码如下：

```nginx
proxy_cache_path /tmp/accounts levels=1:2 keys_zone=cache:10m max_size=10g inactive=60m use_temp_path=off;
server {
        server_name h4ck.ws;
        location / {
      proxy_redirect off;
      proxy_cache cache;
      proxy_cache_valid   200 304 12h;
      proxy_cache_valid   any 10m;
      proxy_cookie_domain google.com h4ck.ws;
      proxy_pass https://www.google.com;
      proxy_connect_timeout 20s;
      proxy_read_timeout 600s;
      proxy_send_timeout 600s;

      proxy_set_header Host "www.google.com";
      proxy_set_header User-Agent $http_user_agent;
      proxy_set_header Referer https://www.google.com;
      proxy_set_header Accept-Encoding "";
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
      proxy_set_header Accept-Language "zh-CN";
#     proxy_set_header Cookie "PREF=ID=047808f19f6de346:U=0f62f33dd8549d11:FF=2:LD=zh-CN:NW=1:TM=1325338577:LM=1332142444:GM=1:SG=2:S=rE0SyJh2W1IQ-Maw"; #这行代码可能会导致google监测到流量异常
      sub_filter https://www.google.com https://h4ck.ws;
      sub_filter https://www.google.co.jp https://h4ck.ws;
      sub_filter_once off;
      addition_types *;
  }
}

```

不过今天在使用的时候发现搜索按钮不好使了，又跳回到了google的连接。一直没想明白问题出在什么地方，知道晚上开了代理之后发现跳转的连接是流量异常被检测到限制了(我们的系统检测到您的计算机网络中存在异常流量。此网页用于确认这些请求是由您而不是自动程序发出的。为什么会这样？)：

![google_error.png](https://s2.loli.net/2023/07/15/Vd12YGSy7RJirfj.png)

猜测是因为上面的代码设置了cookie导致的，如下一行：

```nginx
proxy_set_header Cookie "PREF=ID=047808f19f6de346:U=0f62f33dd8549d11:FF=2:LD=zh-CN:NW=1:TM=1325338577:LM=1332142444:GM=1:SG=2:S=rE0SyJh2W1IQ-Maw"
```

搜索了一下发现[有人说](https://zvv.me/mip/1785.html)传这个是为了防止“#传固定的 cookie 给谷歌，是为了禁止即时搜索，因为开启即时搜索无法替换内容”。但是具体看一下这个cookie的内容就会发现1325338577这个unix对应的时间是2011-12-31 21:36:17。一个是时间比较久远，另外一个是网上所有的google代理 可能用的都是这个cookie。我直接禁用之后搜索就正常了。

![search _2_.png](https://s2.loli.net/2023/07/15/WgHGa5OC2qhUmLI.png)

如果要想更高级一点可以通过配置nginx的upstream实现负载均衡等，配置信息如下：

```
upstream www.google.com {
    server 216.58.221.68:443 weight=6;
    server 74.125.23.99:443 weight=5;
    #日本东京都东京 google.com
    server 172.217.25.68:443 weight=4;
    #日本东京都东京 google.com
    server 216.58.200.196:443 weight=4;
    #日本大阪府大阪 google.com
    server 216.58.197.4:443 weight=3;
    #新加坡 google.com
    server 74.125.130.147:443 weight=2;
    #美国 google.com
    server 74.125.28.104:443 weight=1;
    #美国 google.com
    server 74.125.28.147:443 weight=1;
    #美国华盛顿州西雅图 google.com
    server 172.217.3.196:443 weight=1;

    }

```

这个只是个样本，建议根据自己的服务器所在的国家，通过nslookup或者ping命令之类的查询当前国家的google返回的地址进行替换。网上的文章很多代码出处都是一样的，但是在使用的时候最好变通一下，之前的代码或者随着时间变化很多内容可能不一样了。

全部的配置教程可以参考这篇文章：<https://zvv.me/mip/1785.html>

