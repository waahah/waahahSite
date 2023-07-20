---
title: 宝塔面板上WordPress启用https详细教程
date: 2023-03-01 14:58:36
tags: [https, WordPress, Server]
categories: [Coding, PHP]
---

宝塔面板上WordPress启用https详细教程
=========================

我之前分享过一篇关于`WordPress`启用https访问实战教程的文章，但是不少朋友都给我留言说教程不够详细，关于服务器SSL证书安装方面的几乎没有说明，下面就给大家分享一下基于`宝塔面板`WordPress启用https详细教程。
![SSL.jpg](https://s2.loli.net/2023/07/12/lBc6LHquVZwK9iT.jpg)

`宝塔面板`是一款linux/windows平台均可使用的`服务器管理`软件**，**可一键包装`nginx`、`apache`、`php`、`mysql`、`pureftpd`、`phpmyadmin`等环境**，**另外很棒的就是宝塔面板支持一键部署`SSL`证书。关于宝塔面板如何安装**，**这里就不详细介绍了**，**大家可以直接在宝塔面板官网查看相关教程。

### SSL证书申请

网站启用`HTTPS`首先得配置SSL证书**，**最初SSL证书都是收费的且价格不菲**，**但是现在国内的互联网巨头纷纷提供免费的SSL证书**，**国内的阿里云、腾讯云、七牛都有免费的证书可以申请。

【[阿里云证书申请](https://ws234.com/go/aliyunhttps/)】【[腾讯云证书申请](https://ws234.com/go/tencenthttps/)】

### SSL证书安装

1、登录宝塔面板后台>点击左侧菜单网站

2、在右侧网站列表中**，**选择你要安装SSL证书的域名**，**点击“设置”

3、选择你的网站**，**点“设置”**，**切换到“SSL”选项卡

如果使用宝塔的`免费SSL证书`**，**请登录你的宝塔账号**，**点“申请”即可。

如果是安装自己申请的SSL证书**，**将你申请好的网站证书(PEM格式)和密钥(KEY)粘贴到对应的位置即可。

这样服务器端的SSL证书就安装好了**，**下面开始wordpress网站配置。

### WordPress网站配置

1、进入WP后台**，**进入设置-常规 将WordPress地址（URL）、站点地址（URL）两项修改为：https。

2、登录和后台强制开启SSL。

通过修改WP-config.php文件**，**直接在文件末尾加入以下两行代码：
```php
1.  /* 强制后台和登录使用 SSL */
2.  define('FORCE\_SSL\_LOGIN'**，** true);
3.  define('FORCE\_SSL\_ADMIN'**，** true);
```
3、为了保证WordPress站点之前添加的各个链接或者多媒体文件把http协议改成https协议**，**我们还需要通过`数据库`SQL查询执行一条替换命令**，**代码如下：（使用时请按照自己数据库表名（wp\_posts）和`网站域名`修改后在执行即可。）
```
update wp_posts set post_content = replace(post_content， 'http://2bcd.com'，'https://2bcd.com');
```
4、大功告成**，**我们下面要做的就是把外部链接改到新的https地址**，**同时访问一下https版本页面**，**包括首页、栏目页、内页、`sitemap`**，**查一下源代码**，**看看还有没有http地址的存在。

注意：操作之前千万记得备份网站数据**，**千万！

目前https是大势所趋**，**百度、谷歌纷纷表示采用https协议的页面更加安全**，**排名上会优先对待**，**生命不息**，**折腾不止！
