---
title: Vercel建站配置DNS
date: 2022-10-16 14:58:36
tags: [Vercel, JavaScript, DNS, Web]
categories: [Coding,  JavaScript]
---

vercel建站配置DNS
=============

字数统计717阅读时长4分
上天之所以不给你，是因为你要的不够强烈

如果还没有github pages，请参考 [here](https://shufanhao.top/posts/c5404504/).

Why use Vercel ?
----------------------------------------------

1.  国内访问github pages比较慢，有时候出现加载的问题。
2.  baidu不能爬到github pages的页面，即使设置了baidusitemap，原因是: 2015年，因为一些不能细说的原因，Github 开始拒绝百度爬虫的访问，直接返回 403。官方给出原因是，百度爬虫爬得太狠，影响了 Github Page 服务的正常使用。这就导致了，但凡在 Github Page 搭建的个人博客，都无法被百度收录。[](https://shufanhao.top/posts/544375c0/) So vercel 可以解决以上问题。

### What is Vercel ?

vercel类似于github page，但远比github page强大，速度也快得多得多，全球很多节点帮你缓存。

而且将Github授权给vercel后，可以达到最优雅的发布体验，只需将代码轻轻一推，项目就自动更新部署了。

vercel还支持部署serverless接口。那代表着，其不仅仅可以部署静态网站，甚至可以部署动态网站，而这些功能，统统都是免费的.

vercel还支持自动配置https，不用自己去FreeSSL申请证书，更是省去了一大堆证书的配置。

How to use Vercel ?
----------------------------------------------------

1.  Access [https://vercel.com/dashboard](https://vercel.com/dashboard)，并且授权github
2.  New project
3.  Import github project

![](https://s2.loli.net/2023/07/09/VrIsv4U7SGDTRHC.png)

4.  Select Framework preset. 这里我选择的是other，就是一个静态网站。因为我repo的master branch 是放的blog的静态网站，而hexo branch放的是Hexo source 文件。

![60886e50e21b4367aa1ea68e50a0e4e8.png](https://s2.loli.net/2023/07/09/K9t32cDiqQUYenF.png)

默认会从github repo的default branch 拉取代码，一旦import后，可以在project -> setting -> git -> Production Branch 设置 branch name.

导入结束后，如果master branch 有任何change，就会trigger vercel 的deployment。

并且在部署成功后，会申请一个默认的域名，我的是shufanhao-github-io.vercel.app。

这个域名太长了，那如何自己定义一个简单域名呢？

How to apply DNS Domain ?
----------------------------------------------------------------

天下没有免费的午餐。如果需要一个自己定义的DNS domain，那只能花钱了。

我自己调研了一下，目前.top的二级域名，稍微便宜点。比较了阿里云和腾讯云，基本价格差不多，所幸直接在阿里云买了shufanhao.top的10年是189块钱。

![7011bd89f8a44832bf789d71bff821ae.png](https://s2.loli.net/2023/07/09/e3aym4hQC5AqEvX.png)

买了之后，就可以根据阿里云的文档一步一步操作了，需要实名认证，人工审核等，大概需要个半天的时间。

How to configure Vercel/Aliyun DNS ?
--------------------------------------------------------------------------------------

### Configure Vercel

输入刚申请的domain，shufanhao.top，然后点击add:  
![831070a105f34562b98d8bdb6137e154.png](https://s2.loli.net/2023/07/09/of2sabkqDPcHUCd.png)

我是选择的第二个，因为我想让网址默认显示shufanhao.top而不是[www.shufanhao.top。](http://www.shufanhao.top./)

![7afad74476d64b1e8945b5f98ebc12ea.png](https://s2.loli.net/2023/07/09/L1DNv9dCtiluHQ3.png)

配置完后，会发现域名解析失败，根据提示到DNS provider 再做设置。

### Aliyun

阿里云设置就是添加一个A记录和CNAME。  
![b308df7759b344a6968fd3a71084e8bc.png](https://s2.loli.net/2023/07/09/MfQuFl1OrAn63Tj.png)

设置完成后，再去查看vercel domains 发现都是正常了。

![1e94953e409c4ddcb24901fb4d030229.png](https://s2.loli.net/2023/07/09/YAv3NCjzwuaxHQ2.png)

至此，我也有了一个自己的域名了。

\------ 本文结束，感谢您的阅读 ------
