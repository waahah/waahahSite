---
title: V2ray使用Cloudflare中转流量，拯救被墙的IP
date: 2023-08-12 14:58:36
tags: [VPS, V2ray, Cloudflare]
categories: [Linux]
---

V2ray使用Cloudflare中转流量，拯救被墙的IP
=============================

**一、什么是Cloudflare**

Cloudflare，网址为[https://www.cloudflare.com](https://www.cloudflare.com)，俗称CF，是一家知名的CDN服务提供商。

**二、CDN的相关介绍**

CDN的全称是Content Delivery Network，即内容分发网络。CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

以上概念有点晦涩难懂，你完全可以把CDN理解成为一个节点/代理服务器，客户端和目标服务器之间的流量通过CDN进行转发。

![](https://s2.loli.net/2023/07/18/AkV6glB21Xeqv5f.webp)

**三、Cloudflare是加速云还是减速云**

使用CDN的目的是降低网络拥塞，提高用户访问速度。但是在使用Cloudflare过程中，经常会出现降速的现象，明白CDN的简单原理后，我们就知道为什么会出现降速现象。如果你直接访问目标服务器速度比访问Cloudflare提供的CDN节点速度快，使用Cloudflare CDN后肯定就会降速。反之，就会加速。

同时，我们也就明白了为什么使用Cloudflare CDN可以拯救被墙的IP，如果Cloudflare CDN节点IP被墙了，那一切都将是浮云。

**四、使用Cloudflare CDN的优点和缺点**

1、不会暴露你服务器的真实IP，因此能防止IP被墙；

2、能拯救被墙的IP，省去换IP的费用；

3、域名解析转移到CF，比Namesilo的DNS解析好用一万倍。

4、使用Cloudflare CDN后可能出现降速现象，我测试的情况，的确是降速了。

5、如果你从事涉密工作，建议就不要使用了，经过CDN中转的流量，从技术原理上讲，是完全可以进行数据分析解密的，如果对方愿意的话。

**五、注册Cloudflare账号，使用Cloudflare CDN**

1、在服务器上部署好带伪装的V2ray。

请参考：[V2ray多合一脚本：支持VMESS+websocket+TLS+Nginx、VLESS+TCP+XTLS、VLESS+TCP+TLS等组合](https://www.hicairo.com/post/12.html)

务必先做完这一步，然后配置你的手机、电脑、平板，确保这些设备能正常上外网。

2、注册Cloudflare账号并登录。

访问[https://www.cloudflare.com](https://www.cloudflare.com)注册并登录你的账号，Cloudflare现在已经支持中文，很好理解。

![202210071665119831403901.webp](https://s2.loli.net/2023/07/18/6yz5fiH8svoXYLO.webp)

3、点击“网站”，点击“添加站点”。

![202210071665119881286528.webp](https://s2.loli.net/2023/07/18/n8dlpxWsXP7HzyB.webp)

4、输入你的域名，点击“添加站点”。

![202210071665119978583270.webp](https://s2.loli.net/2023/07/18/T4kSyOcPYFIq7Hu.webp)

5、选择“开始免费使用”后继续。

![202210071665120038806393.webp](https://s2.loli.net/2023/07/18/T8yDRAUbIE7v2GW.webp)

6、添加dns记录，或者直接点击“继续”，完成设置向导后，再添加记录也可以。

![202210071665120093425069.webp](https://s2.loli.net/2023/07/18/65pHsbZcAgzvRJe.webp)

7、更改你域名的名称服务器地址。

将你的域名名称服务器设置为cloudflare地址，域名注册商更改方法稍有区别。在Freenom.com上注册的域名可参考[免费顶级域名注册（详细图文教程）](https://www.hicairo.com/post/17.html)进行修改。修改域名名称服务器后，同步时间各不相同，最长需要72小时。可以在[https://www.whatsmydns.net/#NS/](https://www.whatsmydns.net/#NS/)上查询名称服务器的同步情况。

![cloudflare新dns.webp](https://s2.loli.net/2023/07/18/lWuc6YRaNm3q2Dr.webp)

8、快速入门指南设置，打开“自动HTTPS重写”开关。

![202210071665120162794194.webp](https://s2.loli.net/2023/07/18/7EFgxnwr5NoJUI8.webp)

9、快速入门指南设置，打开“始终使用HTTPS”开关。

![202210071665120799535819.webp](https://s2.loli.net/2023/07/18/Me59R2gXwQSth8a.webp)

10、快速入门指南设置，“Auto Minify”选择Javascript、CSS、HTML。

![11.Auto Minify.webp](https://www.hicairo.com/zb_users/upload/2022/10/202210071665120821520119.webp "11.Auto Minify.webp")11、快速入门指南设置，打开“Brotli”开关。

![202210071665120821520119.webp](https://s2.loli.net/2023/07/18/gJtowaHiXm74MVs.webp)

12、快速入门指南设置，点击“完成”按钮。

![202210071665120891452862.webp](https://s2.loli.net/2023/07/18/5rxUJDpju9kFHi2.webp)

13、点击左侧菜单“SSL/TLS”按钮，进行加密模式设置。

![202210071665120923225958.webp](https://s2.loli.net/2023/07/18/nmV5Pq2DNucGY7l.webp)

14、点击左侧菜单“DNS”按钮，添加/检查dns记录。

![202210071665120936377470.webp](https://s2.loli.net/2023/07/18/1RBa5cV2Do4T7Eu.webp)

例如添加一条主机名为example，IP为199.59.148.8的A记录。

![202210071665120955916634.webp](https://s2.loli.net/2023/07/18/QGwMItaVD5yTpik.webp)

添加完成后，出现漂亮的小云朵。

![202210071665120968692311.webp](https://s2.loli.net/2023/07/18/RxnN8D7FuUrLePX.webp)

```bash
C:\Users\ifeng>nslookup
默认服务器:  dns.google
Address:  8.8.8.8
> example.baidu.com
服务器:  dns.google
Address:  8.8.8.8
非权威应答:
名称:    example.baidu.com
Addresses:  2606:4700:3237::ac43:dfd1
          2606:4700:3335::6815:4689
          172.67.100.209
          104.21.75.137
```

你会发现你刚才设置的A记录IP是199.59.148.8，但是现在已经变成Cloudflare CDN节点的IP（172.67.100.209等）。你通过域名example.baidu.com访问目标服务器的流量，都将经过Cloudflare CDN节点进行转发。

15、设置客户端

打开手机、电脑上的客户端，在”ip/address”一栏中的IP改成伪装域名，例如“199.59.148.8”改成“example.baidu.com”。trojan因为默认使用域名，此步一般无需操作。

经过上述设置，V2ray的web+websokcet+tls+cdn的配置就完成了。Cloudflare还提供了很多好用的功能，有兴趣的朋友可以自行研究一下。

```
备注：
- DNS解析迁移到Cloudflare，并且设置了经过Cloudflare的代理（记录上有一朵黄色的云），ping伪装域名出现的是Cloudflare的IP，而不是你的服务器IP；
- 在CF上添加新的解析记录，默认是代理/中转状态。如果你需要获取let's encrypt证书，可以先禁用代理（点一下那朵云变成灰色），获取完证书再启用中转；
- 域名修改名称服务器，同步需要一段时间，如果cloudflare提示DNS解析未改过来，多等一会。
```

* * *
