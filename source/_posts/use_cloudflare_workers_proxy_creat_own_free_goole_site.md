---
title: 利用Cloudflare Workers反向代理搭建属于自己的免费Google镜像站
date: 2023-08-17 14:58:36
tags: [VPS, V2ray, Cloudflare, Proxy, Pages, Google]
categories: [Linux]
---

1.首先创建一个属于自己的镜像站
================

参考开源项目gh-proxy地址：<https://github.com/hunshcn/gh-proxy.git>

首先，点击 [CloudFlare](https://blog.csdn.net/) 链接 ，创建一个属于自己的账户

![cd73743a0f224e2ca7d0756ea8102fa8.png](https://s2.loli.net/2023/07/18/ljkexC82wr1WVUL.png)

登录后，点击 Workers 

![610a4b09288b26a0ffab170fafc798bf.png](https://s2.loli.net/2023/07/18/GjkzalNTAEgMpdS.png)

 这个子域，可以自定义

![61123fe10c9e2f742cbb4343722f7153.png](https://s2.loli.net/2023/07/18/nsv5oKcQMbUpBfq.png)

输入好后点set up

然后选择订阅模式，免费直接free！

免费版本每天的访问次数是10w次，应该是远远够用的！

如果你是第一次用cloudflare还会有邮箱验证，去邮箱验证一下就行了。

验证完后刷新，点击创建

![72c948b4d8ed4f23b0bc5dae3c57a5f9.png](https://s2.loli.net/2023/07/18/BqRv1mzcXap9Es2.png)

![32982369af72488e9715aa14c0dab132.png](https://s2.loli.net/2023/07/18/kHQltBcYqAMCibT.png)
然后点击创建服务 。

创建服务后，点击快速编辑！ 

 ![d8945f613ac44588b1da62d8d62e52dc.png](https://s2.loli.net/2023/07/18/gNevQTd82s7p9GU.png)

![636420bc4f574fab855ec308d1e62344.png](https://s2.loli.net/2023/07/18/cieCQzknL3lw9Jv.png)
点击快速编辑后，复制下面代码，粘贴到上面代码区域

```javascript
// 反代目标网站.
const upstream = 'www.google.com'
 
// 反代目标网站的移动版.
const upstream_mobile = 'www.google.com'
 
// 访问区域黑名单（按需设置）.
const blocked_region = ['TK']
 
// IP地址黑名单（按需设置）.
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']
 
// 路径替换.
const replace_dict = {
'$upstream': '$custom_domain',
'//archiveofourown.org': ''
}
 
addEventListener('fetch', event => {
event.respondWith(fetchAndApply(event.request));
})
 
async function fetchAndApply(request) {
 
const region = request.headers.get('cf-ipcountry').toUpperCase();
const ip_address = request.headers.get('cf-connecting-ip');
const user_agent = request.headers.get('user-agent');
 
let response = null;
let url = new URL(request.url);
let url_host = url.host;
 
if (url.protocol == 'http:') {
    url.protocol = 'https:'
    response = Response.redirect(url.href);
    return response;
}
 
if (await device_status(user_agent)) {
    var upstream_domain = upstream;
} else {
    var upstream_domain = upstream_mobile;
}
 
url.host = upstream_domain;
 
if (blocked_region.includes(region)) {
    response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
        status: 403
    });
} else if(blocked_ip_address.includes(ip_address)){
    response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
        status: 403
    });
} else{
    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);
 
    new_request_headers.set('Host', upstream_domain);
    new_request_headers.set('Referer', url.href);
 
    let original_response = await fetch(url.href, {
        method: method,
        headers: new_request_headers
    })
 
    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;
 
    new_response_headers.set('cache-control' ,'public, max-age=14400')
    new_response_headers.set('access-control-allow-origin', '*');
    new_response_headers.set('access-control-allow-credentials', true);
    new_response_headers.delete('content-security-policy');
    new_response_headers.delete('content-security-policy-report-only');
    new_response_headers.delete('clear-site-data');
 
    const content_type = new_response_headers.get('content-type');
    if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
        original_text = await replace_response_text(original_response_clone, upstream_domain, url_host);
    } else {
        original_text = original_response_clone.body
    }
 
    response = new Response(original_text, {
        status,
        headers: new_response_headers
    })
}
return response;
}
 
async function replace_response_text(response, upstream_domain, host_name) {
let text = await response.text()
 
var i, j;
for (i in replace_dict) {
    j = replace_dict[i]
    if (i == '$upstream') {
        i = upstream_domain
    } else if (i == '$custom_domain') {
        i = host_name
    }
    
    if (j == '$upstream') {
        j = upstream_domain
    } else if (j == '$custom_domain') {
        j = host_name
    }
 
    let re = new RegExp(i, 'g')
    text = text.replace(re, j);
}
return text;
}
 
 
async function device_status (user_agent_info) {
var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
var flag = true;
for (var v = 0; v < agents.length; v++) {
    if (user_agent_info.indexOf(agents[v]) > 0) {
        flag = false;
        break;
    }
}
return flag;
}
```

![6ef658abcb0c497e805ecc5c9c97c453.png](https://s2.loli.net/2023/07/18/7uPVy6fshQMSGdB.png)

![3d5596c10d8f4843b91da55ea9f9b3fa.png](https://s2.loli.net/2023/07/18/3fN5hgWaeX78UJx.png)

 点击预览，就能看到Google了

![29bb47d3b9624aeaa53e7024d783c579.png](https://s2.loli.net/2023/07/18/UVzG9scvL3DmbjO.png)

 不仅可以预览，将预览中的地址，**粘贴到浏览器的地址栏**也能够进行访问！

![b384808b8a294d318be4f4ede17e4f7c.png](https://s2.loli.net/2023/07/18/vhYxlbkA1ciGWK2.png)

 但是很遗憾，连接超时！！！下面是这篇文章的正题部分

2\. 解决在浏览器地址栏无法访问的问题
====================

> **前提：**
> 
> 1.  拥有一个域名（我推荐Freenom）
> 2.  在这里使用[硅云](https://www.vpsor.cn/ "硅云")【其它平台也都可以，方法大同小异】

登录之后，选择域名

添加域名模板，进行实名认证

域名模板建立好后，点击新注域名，它会跳转到购买域名链接处

>  注意：是新用户，才是免费的！

* * *

> 获取了域名后，将域名添加到CloudFlare 中
> 
![a1e0ace1a79c4707a71e5ff5be61354c.png](https://s2.loli.net/2023/07/18/f9sd2S16ErZuHbQ.png)
> 
> 添加站点 

![84ad48b3b39a404987e2e772d0350306.png](https://s2.loli.net/2023/07/18/4dDB62QcGOrqyIS.png)

![b3b8200c1d064e90b1a4fc5c8005e961.png](https://s2.loli.net/2023/07/18/E4byWnaedYFOuUN.png)

记住dns

![b548142aaf254e719b6e5989bc196097.png](https://s2.loli.net/2023/07/18/N2y7SfwQLhPXgk5.png)

 回到硅云（你注册域名的地方，也叫域名提供商）

![a29b84b04f464ff9a712001ff5fb3d73.png](https://s2.loli.net/2023/07/18/k5H3ulDFQWMNJVa.png)

![8947a62a8738456ab1294c8ee53cb2cc.png](https://s2.loli.net/2023/07/18/wjYQL3pMPXgZ9dI.png)

![8f245669bba74ba6b5206d27116edfc0.png](https://s2.loli.net/2023/07/18/dIMRpazhBFJZXbD.png)

回到首页，即可看到添加成功

![f92d3da5b4514691b3a36c0fb99fd31a.png](https://s2.loli.net/2023/07/18/t1LcP7n2mwvYTW4.png)

>  添加成功后，要等几个小时，会受到激活成功的邮箱信息，并且你添加的站点的首页也会出现下图所提示页面
> 
![3adf119915cc4bb9b3133ebf04187063.png](https://s2.loli.net/2023/07/18/qFxKYDgVioB8vcQ.png)

 参考链接：[workers.dev 域名被 dns 污染的解决方案 | Sakura's Blog (smoe.top)](https://www.smoe.top/2022/05/29/workers-dev-dns/#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88 "workers.dev 域名被 dns 污染的解决方案 | Sakura's Blog (smoe.top)")

点击站点后，选中DNS，添加记录 

![6608f8ba5c2e4a1fb10a9aaa731ec11c.png](https://s2.loli.net/2023/07/18/HF6AL7oZWNKrnX9.png)

![78308c36e18d455cb5c99be6618c3d5c.png](https://s2.loli.net/2023/07/18/tkEWd5lTebzX7rN.png)

![195b589ef1a34e989715a2040343acae.png](https://s2.loli.net/2023/07/18/KVCOBzvAUZjxrIq.png)

![d6f283990e474182bb692ff8e67f2d84.png](https://s2.loli.net/2023/07/18/VEpNzIrgavxXsli.png)

![23691f9d79ec46a18469f8cd80e115d1.png](https://s2.loli.net/2023/07/18/cF23khUQMLwlseB.png)

通过google.域名 就能够访问了

