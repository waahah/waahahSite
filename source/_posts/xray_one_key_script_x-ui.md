---
title: Xray 一键脚本可视化管理面板(X-ui版) 等组合
date: 2023-08-09 14:58:36
tags: [VPS, Xray]
categories: [Linux]
---

Xray 一键脚本可视化管理面板(X-ui版)
=======================
![maxresdefault-2.jpg](https://s2.loli.net/2023/07/18/gGFCcbHVt3kD4RW.jpg)

目录

[](about:blank#)

*   [执行配置命令](about:blank#%E6%89%A7%E8%A1%8C%E9%85%8D%E7%BD%AE%E5%91%BD%E4%BB%A4 "执行配置命令")
*   [使用xray节点服务器](about:blank#%E4%BD%BF%E7%94%A8xray%E8%8A%82%E7%82%B9%E6%9C%8D%E5%8A%A1%E5%99%A8 "使用xray节点服务器")
*   [客户端配置](about:blank#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE "客户端配置")
*   [更多客户端教程](about:blank#%E6%9B%B4%E5%A4%9A%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%95%99%E7%A8%8B "更多客户端教程")

**注意本教程使用 centOS** 7**作为演示版本，如果你没有其他要求的话请选择 **centOS** 7系统**

本X2ray一键脚本需要准备如下：

1\. 准备一个境外服务器，想服务器速度快请参考 [搬瓦工VPS购买教程](https://www.xiaoglt.top/?p=232) 或从  [CN2 GIA VPS商家推荐](https://www.xiaoglt.top/?p=211) 选购，想ip被封后免费换请参考：[购买vultr服务器超详细图文教程](https://www.xiaoglt.top/?p=292)。如果你不知道什么样的vps更适合你请看这里

如果用VMESS+WS+TLS或者VLESS系列协议，则还需一个域名。对域名没有要求，国内/国外注册的都可以，**不需要备案**，不会影响使用，也不会带来安全/隐私上的问题。购买域名可参考：[Namesilo购买域名详细教程](https://www.xiaoglt.top/?p=390)。

2\. 如果vps运营商开启了防火墙（阿里云、Ucloud、腾讯云、AWS、GCP等商家默认有，搬瓦工/hostdare/vultr等商家默认关闭），请先登录vps管理后台放行80和443端口，否则可能会导致获取证书失败

3\. ssh连接到服务器。Windows系统请参考 [Bitvise连接Linux服务器教程](https://www.xiaoglt.top/?p=248)，mac用户请参考 [Mac电脑连接Linux教程](https://www.xiaoglt.top/?p=275)。

4.如果你觉得搭建流程太麻烦，可以考虑Justmysocks的代理服务，可以免去搭建流程，速度和性价比也不错。[just-my-socks购买和使用教程](https://www.xiaoglt.top/just-my-socks%E8%B4%AD%E4%B9%B0%E5%92%8C%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/)

**执行配置命令**
----------

准备好vps 和域名之后我们正式开始搭建：

**更新系统**

依次执行这三条命令

```shell
Debian10:
apt update -y

CentOS：
yum update -y
```

![](https://s2.loli.net/2023/07/18/HCgwS2y1E3tI4AK.png)

```shell
Debian10:
apt install -y curl

CentOS：
yum install -y curl
```

![](https://s2.loli.net/2023/07/18/E7wXjFplgWtYTBm.png)

```shell
Debian10:
apt install -y socat

CentOS：
yum install -y socat
```

![](https://s2.loli.net/2023/07/18/eFj87x1QSL5BtXv.png)

**安装脚本 命令**

```bash
curl https://raw.githubusercontent.com/acmesh-official/acme.sh/master/acme.sh | sh -s -- --install-online
```

![](https://s2.loli.net/2023/07/18/lz9gMiPLUbHh1Wv.png)

这些注册账号获取ssl证书，邮箱改成你自己的邮箱

```bash
~/.acme.sh/acme.sh --register-account -m xxx@gmail.com
```

![](https://s2.loli.net/2023/07/18/OHBDEiGUMXmWaKf.png)

**放行端口**

```bash
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --dport 3600 -j ACCEPT
```

![](https://s2.loli.net/2023/07/18/D9BmkS61E83Zwil.png)

**申请证书 域名需要替换 需要点时间**

域名要改成你申请的域名，并且已经成功解析到你的服务器ip上，否则是失败

```bash
~/.acme.sh/acme.sh --issue -d xxx.com --standalone
```

![](https://s2.loli.net/2023/07/18/uHsa5rBPwNRMqCO.png)

```bash
~/.acme.sh/acme.sh --installcert -d c.tiktok1319.life --key-file /root/private.key --fullchain-file /root/cert.crt
```

![](https://s2.loli.net/2023/07/18/ZfSukIJjboNtm9l.png)

**Xray一键代码安装**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
```

1.选择 y

![](https://s2.loli.net/2023/07/18/SC5rmzVRKGis1do.png)

2.依次按照如下输入，你也可以自定义，前提是你知道这些字段的含义。 其中 **root 和admin 是xray管理后台的账户密码** 这个账号记住，后面需要用到

![](https://s2.loli.net/2023/07/18/CtBApUSaEkQzNFX.png)

3.运行 x-ui

![](https://s2.loli.net/2023/07/18/qnrt2CDmF5xApGk.png)

4.输入15 安装bbr加速

![](https://s2.loli.net/2023/07/18/OLpbmjwtHA8UJaN.png)

5.出现提示已经安装bbr成功

![](https://s2.loli.net/2023/07/18/puMqJmWLQe2saiB.png)

**放行443端口**

```shell
iptables -I INPUT -p tcp --dport 443 -j ACCEPT
```

![](https://s2.loli.net/2023/07/18/8WXsklx2JUFCRQH.png)

**使用xray节点服务器**
---------------

通过完成上面的步骤你已经成功搭建一个xray节点服务器了。那么现在怎么使用呢？

1，进入xray节点管理后台，后台地址是 **你的服务器ip:3600** （注意中间的: 是存在的）。 比如我们后台地址是： 141.164.540.73:3600 你就可以通过浏览器打开这个后台。 输入前面你设置的账号和密码

![](https://s2.loli.net/2023/07/18/JFn8mhyYPaeWQro.png)

2.配置xray节点链接信息(注意：如果配置之后xray链接不上， 请配置协议为 vmess 再尝试能否联网)

![](https://s2.loli.net/2023/07/18/2tTD4is65EmvWgd.png)

![](https://s2.loli.net/2023/07/18/FBlWnwXb7RcgNt8.png)

3\. 到这里 你已经完成节点的搭建了， 你可以通过扫码的方式 将节点信息导入你的代理上网工具

![](https://s2.loli.net/2023/07/18/YTctsFqXd1xSM7D.png)

你也可以通过复制协议链接的方式导入到你的代理上网工具

![](https://s2.loli.net/2023/07/18/C7NHZnD6yVEqaKY.png)

**客户端配置**
---------

1.下载 **V2rayN** 软件 [V2RAY客户端全集](http://www.xiaoglt.top/?p=73)

2.配置教程请参考 下载界面中对应的软件教程

**需要注意**的是 xray需要输入伪装域名，否则无法上网，如图：

![](https://s2.loli.net/2023/07/18/9CqiN6amwsW47ry.png)

**更多客户端教程**
-----------

- [trojan客户端下载](https://www.xiaoglt.top/?p=134)

- [trojan-go客户端下载](https://www.xiaoglt.top/?p=163)

- [Shadowsocks/SS客户端](https://www.xiaoglt.top/?p=143)

- [ShadowsocksR/SSR客户端](https://www.xiaoglt.top/?p=153)

