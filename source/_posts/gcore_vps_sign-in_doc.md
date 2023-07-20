---
title: Gcore无限流量vps注册申请教程
date: 2023-08-07 14:58:36
tags: [VPS, V2ray, Gcore]
categories: [Linux]
---

Gcore无限流量vps注册申请教程
==================

如果您使用过[Gcore的cdn](https://www.hicairo.com/post/40.html)，应该对Gcore这个公司比较了解。这是一家俄罗斯主机商，不但提供CDN，还提供虚拟主机、VPS和独立服务器租用等，可供选择的数据中心也比较多，包括网友比较感兴趣的香港、新加坡、东京和首尔机房，同时在法国、德国、波兰、美国洛杉矶、迈阿密、芝加哥、圣克拉拉等国家或地区设有数据中心，部分节点无限流量，月付最低3.25欧元起。对于经常看Netflix、youtube或需要大量下载的小伙伴，终于不用担心流量用超的问题了。

**一、测试节点速度**

使用如下网址可以测试本地到节点的连接速度。提供无限流量的节点，个人感觉美西的几个节点（例如洛杉矶、圣克拉拉等）速度都还不错。

测速网址：[https://lg.gcore.lu](https://lg.gcore.lu)

**二、账号注册**

1、打开如下网址，点击“Sign up”按钮。

[https://gcore.com/hosting/?from=10359176](https://gcore.com/hosting/?from=10359176)

![202211171668668405353060.webp](https://s2.loli.net/2023/07/18/YAQisEzlxJ91OTB.webp)

2、填入个人信息，选择同意协议后，点击“Sign up”按钮。

![202211171668668426563332.webp](https://s2.loli.net/2023/07/18/9xQJFM58gpb6Wcj.webp)

3、注册成功后，直接跳转到如下界面，选择“All services”中的“Virtual private servers”。


![202211171668668441211629.webp](https://s2.loli.net/2023/07/18/ygzpLTRDmnBGNMo.webp)

4、选择数据中心，例如USA,Los Angeles，你会看到带宽200M，流量不限，售价为3.25欧元/月，然后点击“Order now”按钮。

![202211171668668455872860.webp](https://s2.loli.net/2023/07/18/3N9AZGVpJC1yYF4.webp)

5、选择操作系统、默认提供一个ipv4地址，ipv6地址是免费的，我们可以选择上，然后填入你的域名后点击“Pay 3.25 EUR”进行付款。

![202211171668668469131079.webp](https://s2.loli.net/2023/07/18/LAaRZVzCb4sGrug.webp)

6、支持支付宝方式进行付款。

![202211171668668484622968.webp](https://s2.loli.net/2023/07/18/yJOLSvGCPWx7wMR.webp)

7、选择国家，付款人状态选择“个人”后继续。

![202211171668668498329206.webp](https://s2.loli.net/2023/07/18/aw16bcMUCFBzEm7.webp)

8、输入付款人信息后继续。

![202211171668668511146727.webp](https://s2.loli.net/2023/07/18/hJ2vTmzgaDIiw6H.webp)

9、确认付款金额后继续。

![202211171668668527441472.webp](https://s2.loli.net/2023/07/18/4SQy1ch7PF8BDKi.webp)

10、确认付款方式为支付宝后继续。

![202211171668668540475057.webp](https://s2.loli.net/2023/07/18/93jQKV6sZ7WI4Ci.webp)

11、此时页面跳转至支付宝收银台，使用手机扫描二维码支付即可。

![202211171668668553394023.webp](https://s2.loli.net/2023/07/18/j3xhrDMEOa2vNiB.webp)

12、付款成功后，页面会自动跳转回Gcore，点击菜单中的“Dashboard”按钮，下面会显示你的主机信息。个人感觉Gcore开机速度比较慢，大概需要等几分钟时间，你可以刷新页面，查看开机状态，状态为“Active”说明开机成功，然后点击“menu”中的“ Instruction”查看vps信息。

![202211171668668569621168.webp](https://s2.loli.net/2023/07/18/MhRlJFvqaDcL1zU.webp)

13、在这个页面你可以看到vps的域名、ip、root用户的密码等。然后你就可以使用putty等工具管理你的vps了。

![202211171668668586306665.webp](https://s2.loli.net/2023/07/18/KQ4ZWYAVJrx3n2b.webp)

**三、测速情况**

1、使用本站提供的[V2ray多合一脚本](#)安装VMESS+websocket+TLS+Nginx，然后[套CDN](https://www.hicairo.com/post/24.html)。

```bash
bash <(curl -sL https://raw.githubusercontent.com/hiifeng/v2ray/main/install_v2ray.sh)
```

2、我的宽带下行200M/上行30M，晚上上网高峰期，测速如下图。在油管上测试时4k秒开，8k稍微有点延迟，但是也可以正常观看。

![202211171668668604721760.webp](https://s2.loli.net/2023/07/18/3CczAuHgaRsl9GX.webp)

![202211171668668616393019.webp](https://s2.loli.net/2023/07/18/kpdIOHqjYu5KEtS.webp)

