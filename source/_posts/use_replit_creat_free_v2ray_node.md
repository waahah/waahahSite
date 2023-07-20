---
title: 使用 Replit.com 搭建免费高速 v2ray 节点
date: 2023-08-13 14:58:36
tags: [VPS, V2ray, Replit]
categories: [Linux]
---

使用 Replit.com 搭建免费高速 v2ray 节点
=============================

**一、Replit.com 介绍**

Replit（https://repl.it）是一个基于浏览器的云端协同开发平台，可用于构建开发环境、实时协作、托管网络应用等。Replit提供可创建动态或者静态网站的容器，并会自动生成免费https域名（格式为：项目名.用户名.repl.co）。这代表着任何人都可以试用Replit的云服务器创建自己的网站，或者是其他的服务，例如v2ray，而且这一切，都是免费的。

Replit官方文档：[https://docs.replit.com](https://docs.replit.com)

**二、注册 Replit 账号**

官方地址：[https://replit.com](https://replit.com)

注册很简单，只需一个邮箱即可，请使用Gmail或Outlook等邮箱注册，126、QQ等邮箱好像不支持。

**三、v2ray 节点搭建**

1、GitHUB 项目地址

[https://github.com/hiifeng/V2ray-for-Replit](https://github.com/hiifeng/V2ray-for-Replit)

2、浏览器登陆自己的 Replit 账号，Template 选择 Bash ,Title 任意填，创建一个实例。

![202212221671676417413561.webp](https://s2.loli.net/2023/07/18/m8OcZCak2MeD1Gp.webp)

3、使用以下链接下载文件到本地并解压，然后上传解压后的文件，可以全选后拖动到 Files 框内。

[https://github.com/hiifeng/V2ray-for-Replit/raw/main/V2ray-for-Replit.zip](https://github.com/hiifeng/V2ray-for-Replit/raw/main/V2ray-for-Replit.zip)

![202302131676266061661306.webp](https://s2.loli.net/2023/07/18/vSbxFgOHEuYeVcA.webp)

4、等待文件上传完成，大约需要2分钟左右，当出现 Overwrite file 时，选择 Yes，overwrite this file 。

![202212291672276356316990.webp](https://s2.loli.net/2023/07/18/vYuJmIUxHPWSgiT.webp)

5、启动 v2ray 服务

点击顶部的 Run 按钮后，服务会自动运行。然后在屏幕 Console 窗口内拷贝 VMess/VLess 协议的链接，导入客户端软件即可。或者使用手机客户端软件扫描 VMess/VLess 协议的二维码。

注意：如果发现二维码为乱码，请将屏幕中的 Console 窗口拉大即可。

![202212221671676437890211.webp](https://s2.loli.net/2023/07/18/prZNecORqmIHxb9.webp)

6、自定义节点中的 UUID（用户ID）或伪装路径

由于 UUID 默认使用了 Replit 平台提供的 REPL\_ID 变量，每个实例 UUID 都是唯一的，别人不会知道，不会出现节点信息泄露问题。因此自定义 UUID 等信息意义不大。如确实要修改，请参考以下步骤：

① 使用第三方工具（ [https://www.v2fly.org/awesome/tools.html](https://www.v2fly.org/awesome/tools.html) ）生成一个新的 UUID。

② 点击左侧 Tools 菜单中的 Secrets 按钮。添加三个系统变量。key 值分别为

"UUID"、"VMESS\_WSPATH" 和 "VLESS\_WSPATH"。

value 值分别为"使用第三方工具生成的UUID"，"vmess的伪装路径" 和 "vless的伪装路径"。

③ 注意："VMESS\_WSPATH" 和 "VLESS\_WSPATH"的 value 值需要以"/"符号开头。

```bash
# example:
UUID                        de04add9-5c68-8bab-950c-08cd5320df18
VMESS_WSPATH                /vm
VLESS_WSPATH                /vl
```

![202302111676095922895938.webp](https://s2.loli.net/2023/07/18/ayfTZiteIlMEWSh.webp)

**四、有关速度**

Repl项目是在谷歌云中运行的，主服务器8核64G，当然了这不可能都给你用，所有Repl项目会共用这台服务器，直到它到了负荷，会自动切换到下一台。随便开一个Repl，然后shell进入，查看当前主机状态，负载蛮高的。

![202212221671676449725525.webp](https://s2.loli.net/2023/07/18/9oD7QKfCSUFjGLP.webp)

每个免费的项目会得到0.2-0.5个CPU512M内存1GB的硬盘空间，想提高性能就要充值！由于使用了谷歌云，速度也是挺不错的。以下是使用speedtest的测速情况。

![202212221671676461852870.webp](https://s2.loli.net/2023/07/18/SFWk2J7TMh84gut.webp)

**五、其他说明**  

1、程序默认会同时建立VMess和VLess协议的节点，具体使用那个节点，本质上没有区别。

2、搭建该节点，采用的方案依然为nginx+websocket+vmess/vless+tls，当然也是支持套CDN的。

3、请勿滥用。
