---
title: 使用 CodeSandBox.io 搭建免费高速 v2ray 节点
date: 2023-08-15 14:58:36
tags: [VPS, V2ray, CodeSandBox]
categories: [Linux]
---

使用 CodeSandBox.io 搭建免费高速 v2ray 节点
=================================

**一、CodeSandBox.io 介绍**

CodeSandbox 是一家由 Ives van Hoorne 和 Bas Buursma 于 2017 年建立的初创公司。目前已经从顶级风险投资公司、运营商和天使投资人那里筹集了 1500 万美元，总部位于荷兰首都阿姆斯特丹。与 [Replit](#) 与 [Doprax](#) 一样，CodeSandbox 同样是一个云开发平台。当然，使用 CodeSandbox 也可以完美搭建 v2ray 节点。

CodeSandbox 官方文档：[https://codesandbox.io/docs/](https://codesandbox.io/docs/)

**二、注意事项**

对于任何一个云开发平台，挖矿和流量代理项目都是不受欢迎的，属于滥用行为。建议可以将 CodeSandbox 作为防失联用途使用，科学上网主线路可以使用付费的 vps 。我前一段时间在 [telegram](https://t.me/HiaiFeng) 群里为大家推荐的 [Gcore 200M 带宽不限流量套餐](https://www.hicairo.com/post/42.html)，每月 3.25 欧元，折合人民币 24 元左右，我觉得大多数人都可以承受。提醒各位小伙伴，本项目仅限技术交流使用，请勿滥用，由此引起的账号封禁等风险自负。

**三、GitHub 项目地址**

[https://github.com/hiifeng/V2ray-for-Codesandbox](https://github.com/hiifeng/V2ray-for-Codesandbox)

**四、注册并登录 CodeSandbox.io**

CodeSandbox 支持 GitHub / Google / Apple 账号进行登录，请使用以下地址注册并进行登录。

官方地址：[https://codesandbox.io/signin?utm\_source=landingpage](https://codesandbox.io/signin?utm_source=landingpage)

**五、v2ray 节点搭建**

1、下载 V2ray-for-Codesandbox.zip 文件并解压。

[https://github.com/hiifeng/V2ray-for-Codesandbox/raw/main/V2ray-for-Codesandbox.zip](https://github.com/hiifeng/V2ray-for-Codesandbox/raw/main/V2ray-for-Codesandbox.zip)

2、登录 CodeSandbox 并点击 New from a template 按钮。

![202303241679644432371288.webp](https://s2.loli.net/2023/07/18/b29VYqhGOyFBLli.webp)

3、点击 Docker 按钮。

![202303241679644498128371.webp](https://s2.loli.net/2023/07/18/xlHZDSLndP7NRoT.webp)

4、这时已经使用模板创建好了实例，将第 1 步解压出来的 6 个文件拖动到左侧菜单的 .codesandbox 目录中。

![202303241679644511866694.webp](https://s2.loli.net/2023/07/18/yLeVplYZrs5UXIt.webp)

5、文件上传完成后，屏幕左下角会提示 Dockerfile 已发生变化，询问是否重建镜像并重启实例，选择 Yes 。

![202303241679644527792000.webp](https://s2.loli.net/2023/07/18/sLIG53YWuSAQmqz.webp)

6、实例重启完成后，会出现如下界面。你会发现右侧 info 窗口中的网址和 nginx 欢迎页面中的网址不一致，这时点击左上角图标，在下拉菜单中点击 Restart Sandbox 再次重启实例。

![202303241679644547787988.webp](https://s2.loli.net/2023/07/18/tCGFvHSRa6DTpM2.webp)

7、点击右侧 info 窗口中的网址，获取节点信息后导入即可。

![202303241679644562746762.webp](https://s2.loli.net/2023/07/18/dGoM8UvaAOpzTPS.webp)

**六、节点服务器端配置**

1、请使用 [第三方工具](https://www.v2fly.org/awesome/tools.html) 生成一个新的 UUID 。

2、点击左上角图标，在下拉菜单中点击 Project Settings 。  

![202303241679644709470836.webp](https://s2.loli.net/2023/07/18/TVCLlmnqW8cOeEF.webp)

3、点击 Env Variables 添加环境变量，然后点击 Restart instance 重启实例，最后点击右侧 info 窗口中的网址，重新获取新的节点信息。

![202303241679644727415016.webp](https://s2.loli.net/2023/07/18/6MVWlcoYRtAg28k.webp)

注意："VMESS_WSPATH" 和 "VLESS_WSPATH" 变量分别代表 vmess 的伪装路径和 vless 的伪装路径， value 值需要以"/"符号开头。

```bash
# example:
UUID                        de04add9-5c68-8bab-950c-08cd5320df18
VMESS_WSPATH                /vm
VLESS_WSPATH                /vl
```

**七、使用 Cloudflare CDN 对 CodeSandbox 节点进行提速**

**![202303241679644748134492.webp](https://s2.loli.net/2023/07/18/loOjASRVa6xuzTI.webp)**

通过测试， CodeSandbox 分配的 IP 地址在德国，目前平台分配的域名还可以正常使用，以上截图是没有套 CF 的测速情况，个人感觉晚高峰时速度不是很理想，建议配合 Cloudflare CDN 使用。具体教程请参考以下文档：

- [https://www.hicairo.com/post/59.html](https://www.hicairo.com/post/59.html)

