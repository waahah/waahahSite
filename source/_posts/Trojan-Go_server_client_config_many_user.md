---
title: 自建Trojan/Trojan-Go服务器及客户端配置多用户一键脚本
date: 2023-08-10 14:58:36
tags: [VPS, Trojan]
categories: [Linux]
---

自建Trojan/Trojan-Go服务器及客户端配置多用户实现魔法一键脚本
========================================

![Trojan-Trojan-Go一件脚本.png](https://s2.loli.net/2023/07/18/zQhqET7leXrRWpM.png)

目录

[](about:blank#)

*   [trojan一键脚本使用教程](about:blank#trojan%E4%B8%80%E9%94%AE%E8%84%9A%E6%9C%AC%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B "trojan一键脚本使用教程")
*   [其他注意](about:blank#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F "其他注意")
*   [一键安装并开启BBR加速](about:blank#%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E5%B9%B6%E5%BC%80%E5%90%AFBBR%E5%8A%A0%E9%80%9F "一键安装并开启BBR加速")
*   [Trojan客户端配置](about:blank#Trojan%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE "Trojan客户端配置")

本系列教程适合新手小白，当然老鸟也可以看看，也许会有你还不知道的黑科技。手把手教你搭建**SS/SSR/V2Ray/Trojan**节点服务器并实现自由上网，这可能是史上最全、最简单、最适合小白萌新的一键搭建Trojan服务器教程。本篇**Trojan**节点搭建教程内容包括购买域名和**VPS**，远程连接并管理VPS和[Trojan](https://trojan-gfw.github.io/trojan/)一键安装脚本最新版以及多用户配置的方法，并开启BBR加速以及**Trojan**客户端配置教程。

**注意：**

1\. 如果服务器已经有运行网站，请联系网站运维再执行脚本，否则可能导致原来网站无法访问，本人不负责！

2\. 对域名没有要求，不管国内还是国外注册的都可以，**不需要备案**，不会影响使用，也不会带来安全/隐私上的问题；

3\. 根据 [Namesilo购买域名详细教程](https://www.xiaoglt.top/?p=390) 购买的域名，默认@和www在买之前都已经做了解析，因此尽管www已经改成了你服务器的ip，但执行本脚本时可能还会出现“主机未解析到当前服务器IP”的错误。这时只需要换个名称做解析即可，例如 www2；

4\. 除非443端口被墙或另有它用，建议使用443！

5.刚搭建好trojan不要猛上流量，否则可能导致被限速、端口被墙，严重可能ip被墙。

**trojan一键脚本使用教程**
------------------

1\. 请准备一台境外服务器和一个域名。想服务器速度快请参考 [搬瓦工VPS购买教程](https://www.xiaoglt.top/?p=232) 或从  [CN2 GIA VPS商家推荐](https://www.xiaoglt.top/?p=211) 选购 ，想ip被封后免费换请参考：[购买vultr服务器超详细图文教程](https://www.xiaoglt.top/?p=292)。对域名没有要求，国内/国外注册的都可以，**不需要备案**，不会影响使用，也不会带来安全/隐私上的问题。购买域名可参考：[Namesilo购买域名详细教程](https://www.xiaoglt.top/?p=390)；

2.如果vps运营商开启了防火墙（阿里云、Ucloud、AWS、GCP等默认开启，搬瓦工/hostdare/vultr默认关闭），请先登录vps管理后台放行**80**和**443**端口，否则会导致获取证书失败；

3\. ssh登录到服务器（windows请参考 [Bitvise连接Linux服务器教程](https://www.xiaoglt.top/?p=248)，mac用户请参考 [Mac电脑连接Linux教程](https://www.xiaoglt.top/?p=275)），在终端（黑框框）输入如下命令：

**（1）安装 Curl 依赖包**

```shell
yum update -y && yum install curl -y #CentOS/Fedora

apt-get update -y && apt-get install curl -y #Debian/Ubuntu
```

**（2）执行Trojan一键安装脚本**

Trojan自诞生之日起，就得到不少技术大神的关注，其中最出名的是**Randy**大佬的作品，但并不够傻瓜化，而且功能不够强大，我这里不推荐小白萌新用它。经过仔细斟酌，并结合长期使用经验，这里我选中并推荐以下3款一键搭建脚本，分别是**johnrosen1**大神的“VPS Toolbox”和**Jrohy**大神的“Trojan多用户管理部署程序”，还有珍妮女神的“Trojan-Go+TLS 2合1 一键脚本”。

其中，以上3款Trojan一键搭建脚本中最出名是**johnrosen1**大神的“VPS Toolbox”，仅支持单用户，功能非常强大，但安装失败率高（此脚本跟VPS服务商的限制有关系，因为占用资源较多）；我仍然最喜欢Jrohy大神的“Trojan多用户管理部署程序”，它安装速度非常快，不仅拥有Web可视化管理面板，而且支持多用户，使用也非常稳定，现在已经支持**Trojan-Go**，而且 **Trojan/Trojan-Go** 模式可以自由切换；珍妮女神的“**Trojan-Go+TLS** 2合1 一键脚本”是**Trojan-Go**专版，也是目前很好用的**Trojan-Go**一键安装脚本，但目前功能还不够强大，比如移动端还不支持开启**CDN**，我非常看好**Trojan-Go**的未来。

注意事项：不建议您在**CentOS**系统上运行 **johnrosen1** 大神的“VPS Toolbox”，即“Trojan-GFW 一键安装脚本”，推荐您使用 Debian 10 及以上版本系统。如果你的系统版本低于 Debian 10，那么在安装过程中，脚本提示你升级到 Debian 10，直接回车即可。另外，由于此脚本功能过于强大，也过于臃肿，占用系统资源较多，即使我手动选择组件也可能会安装很多并不需要的组件，导致安装过程非常漫长，而且失败率较高，每次都是在“**Install Nginx ing**”安装 Nginx 环节被远程服务器强行断开。我在 Vultr VPS 的 CentOS/Debian 系统测试安装均以失败告终，而换用 PacifickRack VPS 后顺利安装，故我推测是 Vultr 服务商的限制所导致的，所以我不推荐您在 Vultr VPS 上安装此脚本。

**（3）执行搭建 Trojan多用户一键搭建脚本– Jrohy**

1.执行一键脚本安装命令

```shell
source <(curl -sL https://git.io/trojan-install)
```

当以上命令执行完毕会安装Trojan管理程序，然后选择安装SSL证书的方式并绑定域名，我们选择“**1.Let’s Encrypt 证书**”，

![](https://s2.loli.net/2023/07/18/FeUlx2jf5ZGDhqC.png)

然后输入你申请的域名，如“v.xiaoglt.top”。如下图所示：

![](https://s2.loli.net/2023/07/18/c3GuVPah4Y81wlk.png)

请确认域名输入准确无误，然后回车，进入**SSL**证书安装过程。稍等片刻安装完成，系统进入选择安装**mysql**方式的选项，我们选择“1.安装docker版**mysql(mariadb)**”。如下图所示：

![](https://s2.loli.net/2023/07/18/CpzdTv9QGn6UlBZ.png)

你只需在键盘按数字“**1**”，然后直接进入”安装docker版mysql(mariadb)”的过程。安装完成后，一键安装脚本提示设置连接Trojan服务器的用户名和密码。如下图所示：

![](https://s2.loli.net/2023/07/18/8o6LFJXZ5MIRlHu.png)

一般情况下，我们使用随机用户名和密码，**直接回车即可**。如果你对默认的用户名和密码不满意，还可以自己设置，或安装完成后到Web面板里修改；如果你忘记了登录密码，也可以在“web管理”重置web管理员密码。

至此，**Trojan**多用户一键搭建脚本安装完毕。现在你可以输入’**trojan**’可进入管理程序，在出现的管理程序菜单，直接在键盘按“数字键”直接进入相关菜单或执行命令，直接按“回车键”返回上级菜单。比如，你直接按数字键“5”，可查看用户配置的用户名、密码和Trojan分享链接，以及单用户的上传、下载流量和流量限额。如下图所示：

![](https://s2.loli.net/2023/07/18/upA7ELVo8GNQ6XO.png)

```bash
trojan://zTAibyEg@c.tk1319.life:443#c.tiktok1319.life%3A443
这一段用于导入到上网客户端，详细请参考最后一节的客户端使用教程

```

你也可以在浏览器访问“<https://域名>”，比如 <https://xiaohlt.top>，登录web面板管理trojan用户。如下图所示：

![Trojan多用户一键搭建脚本后台管理面板.png](https://s2.loli.net/2023/07/18/6BnzCxQkG4uXwaD.png)

**到此 trojan 或 trojan-go 已经安装完成**

**其他注意**
--------

**#卸载命令**

```bash
source <(curl -sL https://git.io/trojan-install) –remove
```

**#命令行**

```bash
Usage:
trojan [flags]
trojan [command]

Available Commands:
add 添加用户
clean 清空指定用户流量
completion 自动命令补全(支持bash和zsh)
del 删除用户
help Help about any command
info 用户信息列表
log 查看trojan日志
port 修改trojan端口
restart 重启trojan
start 启动trojan
status 查看trojan状态
stop 停止trojan
tls 证书安装
update 更新trojan
updateWeb 更新trojan管理程序
version 显示版本号
import [path] 导入sql文件
export [path] 导出sql文件
web 以web方式启动

Flags:
-h, --help help for trojan
```

**一键安装并开启BBR加速**
----------------

**（1）安装 wget 依赖包**

```bash
yum -y install wget #CentOS
apt-get install wget #Ubuntu/Debian
```

**（2）执行BBR加速一键安装脚本命令**

```bash
cd /usr/src && wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
```

执行以上安装命令后，如下图所示：

![BBR加速TCP加速-一键安装管理脚本.png](https://s2.loli.net/2023/07/18/kN61vc25poHaRwn.png)

我这里选择“2”，“安装 BBRplus版内核”加速。在安装过程中，可能会出现如下提示，用右方向键选“**<No>**”，然后回车。如下图所示：

![TCP加速-一键安装管理脚本-移除原内核警示.png](https://s2.loli.net/2023/07/18/qj8bRXZaCei6TPl.png)

安装完成后会提示重启服务器，这时候输入字母“y”，回车后，重启服务器。当服务器启动后，我们再次执行安装命令，选择“7”启用“使用BBRplus版加速”。

**Trojan客户端配置**
---------------

配置了服务端节点之后需要使用上网客户端才能实现上外网，参考下列任意教程：

[trojan-go客户端下载](https://www.xiaoglt.top/?p=163)

[trojan客户端下载](https://www.xiaoglt.top/?p=134)

[Shadowrocket配置trojan教程](https://www.xiaoglt.top/shadowrocket%E9%85%8D%E7%BD%AEtrojan%E6%95%99%E7%A8%8B-2/)

[trojan mac客户端配置教程](https://www.xiaoglt.top/trojan-mac%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%95%99%E7%A8%8B/)

[igniter安卓客户端配置trojan教程](https://www.xiaoglt.top/igniter%E5%AE%89%E5%8D%93%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AEtrojan%E6%95%99%E7%A8%8B/)

[ClashX mac配置Trojan教程](https://www.xiaoglt.top/clashx-mac%E9%85%8D%E7%BD%AEtrojan%E6%95%99%E7%A8%8B/)

[trojan Windows客户端配置教程](https://www.xiaoglt.top/trojan-windows%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%95%99%E7%A8%8B/)

[Clash for Android配置trojan教程](https://www.xiaoglt.top/clash-for-android%E9%85%8D%E7%BD%AEtrojan%E6%95%99%E7%A8%8B/)

[Clash for Windows配置trojan教程](https://www.xiaoglt.top/clash-for-windows%E9%85%8D%E7%BD%AEtrojan%E6%95%99%E7%A8%8B/)

