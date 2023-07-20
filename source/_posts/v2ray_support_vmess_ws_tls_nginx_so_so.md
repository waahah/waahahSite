---
title: V2ray多合一脚本_支持VMESS+websocket+TLS+Nginx、VLESS+TCP+XTLS、VLESS+TCP+TLS等组合
date: 2023-08-08 14:58:36
tags: [VPS, V2ray, Gcore]
categories: [Linux]
---

V2ray多合一脚本：支持VMESS+websocket+TLS+Nginx、VLESS+TCP+XTLS、VLESS+TCP+TLS等组合
======================================================================

首先向网络跳越致敬！！！该脚本原作者为网络跳越，该脚本默认支持BBR加速，ipv6 only服务器，好像已经停止维护，目前由ifeng修改Bug进行维护。

**一、安装条件**

1、VPS 一台，推荐使用CentOS 7（Without SELinux），Redhat等类Linux操作系统。

2、如果用VMESS+WS+TLS或者VLESS系列协议，还需域名一个，免费二级域名即可。（可以在dynv6.net上自行注册）

3、如果VPS运营商开启了防火墙（阿里云、Ucloud、腾讯云、AWS、GCP等商家默认有，搬瓦工/Hostdare/Vultr等商家默认关闭），请先登录vps管理后台放行80和443端口，否则可能会导致获取证书失败。此外，本脚本支持上传自定义证书，可跳过申请证书这一步。

**二、脚本支持以下功能**

`VMESS`，即最普通的V2ray服务器，没有伪装，也不是VLESS

`VMESS`+KCP，传输协议使用mKCP，VPS线路不好时可能有奇效

`VMESS`+TCP+TLS，带伪装的V2ray，不能过CDN中转

`VMESS`+WS+TLS，即最通用的V2ray伪装方式，能过CDN中转，推荐使用

`VLESS`+KCP，传输协议使用mKCP

`VLESS`+TCP+TLS，通用的VLESS版本，不能过CDN中转，但比VMESS+TCP+TLS方式性能更好

`VLESS`+WS+TLS，基于websocket的V2ray伪装VLESS版本，能过CDN中转，有过CDN情况下推荐使用

`VLESS`+TCP+XTLS，目前最强悍的VLESS+XTLS组合，强力推荐使用（但是支持的客户端少一些）

trojan，轻量级的伪装协议

trojan+XTLS，trojan加强版，使用XTLS技术提升性能

> 注意：目前一些客户端不支持VLESS协议，或者不支持XTLS，请按照自己的情况选择组合。

**三、安装脚本**

1、ssh连接到VPS，复制（或手动输入）下面命令。

```bash
bash <(curl -sL https://raw.githubusercontent.com/hiifeng/v2ray/main/install_v2ray.sh)
```

按回车键，将出现如下操作菜单。如果菜单没出现，CentOS系统请输入 `yum install -y curl`，Ubuntu/Debian系统请输入 `sudo apt install -y curl`，然后再次运行上面的命令。

![20220929182847166444732777493.webp](https://s2.loli.net/2023/07/18/dFKIe5otrz2EcB9.webp)

2、按照自己的需求选择一个方式。例如4，然后回车。按照脚本提示输入信息，也可以直接按回车使用默认值。需要注意的是，对于要输入伪装域名的情况，如果服务器上有网站在运行，请联系网站管理员再执行脚本，否则可能导致原来网站无法访问！

![20220929182921166444736167631.webp](https://s2.loli.net/2023/07/18/67VsXSoObrJhdW5.webp)

3、脚本接下来会自动运行，一切顺利的话结束后会输出配置信息。

![20220929182949166444738976425.webp](https://s2.loli.net/2023/07/18/wg3kT61esIh5lMd.webp)

到此服务端配置完毕，服务器可能会自动重启（没提示重启则不需要），windows终端出现“disconnected”，mac出现“closed by remote host”说明服务器成功重启了。

对于VLESS协议、VMESS+WS+TLS的组合，网页上输入伪装域名，能正常打开伪装站，说明服务端已经正确配置好。
