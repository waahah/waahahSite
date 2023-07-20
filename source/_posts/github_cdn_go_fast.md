---
title: Github源七牛云CDN加速教程
date: 2023-05-14 14:58:36
tags: [Hexo, Github, CDN]
categories: [Coding, JavaScript]
---

前言
----

> Hexo使用Github Pages时存在加载缓慢的问题，国内很多CDN平台可以为网站提供加速服务，由于偶然的原因选择了[七牛云](https://portal.qiniu.com/)，可以免费生成SSL证书，http协议免费10g流量。但是网上相关教程并不友好，花了好多时间终于成功，在此将过程记录下来供后人参考。

需求描述
----

> 我的当前情况和需求：

*   已经申请了域名 [zywvvd.com](http://zywvvd.com/)
*   服务器为国外的Github
*   正在使用Github分发的二级域名 [zywvvd.github.io](http://zywvvd.github.io/)
*   已经将Hexo挂载到 [www.zywvvd.com](http://www.zywvvd.com/)
*   **需要** : 七牛云CDN加速站点，使得用户访问 [www.waahah.xyz](http://www.waahah.xyz/) 时速度快，而且顺利转到我的Hexo主页

CDN(Content Delivery Network)加速原理
---------------------------------

> 访问Github Pages缓慢的原因

*   服务器在国外，数据交互困难
*   客观因素无法改变，但是我们还是要求国内访问要快

> CDN 原理

*   国内建立多个用于缓存静态页面的服务器
*   建立缓存区指向国外的站点，将其缓存到到国内的服务器
*   生成指向国内缓存的CANME（IP地址的别名）
*   将要加速的域名解析到上述CANME上，实现该域名访问时的加速

相关资料
----

*   测速网站1 ：[http://www.webkaka.com/Ping.aspx](http://www.webkaka.com/Ping.aspx)
    
*   测速网站2：[https://www.17ce.com/](https://www.17ce.com/)
    
*   教程1：[Hexo 开启 CDN 加速访问](https://www.zywvvd.com/%5Bhttps://geek-space.cn/post/hexo-qiniu.html#%E4%B8%8B%E9%9D%A2%E5%B0%B1%E6%98%AF%E6%95%99%E7%A8%8B%E4%BA%86%EF%BC%88%E8%BF%99%E9%87%8C%E5%81%87%E8%AE%BE%E6%82%A8%E5%B7%B2%E7%BB%8F%E6%8E%8C%E6%8F%A1%E4%BA%86%E5%BB%BA%E7%AB%99%E7%9A%84%E6%8A%80%E6%9C%AF%EF%BC%89%5D(https://geek-space.cn/post/hexo-qiniu.html#%E4%B8%8B%E9%9D%A2%E5%B0%B1%E6%98%AF%E6%95%99%E7%A8%8B%E4%BA%86%EF%BC%88%E8%BF%99%E9%87%8C%E5%81%87%E8%AE%BE%E6%82%A8%E5%B7%B2%E7%BB%8F%E6%8E%8C%E6%8F%A1%E4%BA%86%E5%BB%BA%E7%AB%99%E7%9A%84%E6%8A%80%E6%9C%AF%EF%BC%89))
    
*   教程2：[Hexo+Next 使用 CDN 加速网站以及静态文件](https://www.zhyong.cn/posts/ddf2/)
    
*   教程3：[使用CDN加速你的博客](https://blog.csdn.net/zydarChen/article/details/89584937)
    

准备工作
----

*   Hexo建站成功并挂载在互联网
*   已经申请并备案自己的域名并成功绑定Hexo站点
*   申请[七牛云](https://portal.qiniu.com/)账号

加速教程
----

> 正片开始

### 重新解析站点到其他二级域名

> 这里的其他是相对与前缀`www`来说的。
> 
> 是这样的，因为我想来访者通过域名 [www.waahah.xyz](http://www.waahah.xyz/) 访问站点，也就是说这是我需要加速的域名，不能再把这个域名直接解析到我们的Hexo站点了，但是还是需要有一个二级域名指向他，因此需要将Hexo站点绑定到其他二级域名，我用的是 [https://zzz.waahah.xyz/](https://zzz.waahah.xyz/)

![](https://s2.loli.net/2023/07/12/WwHjEhdTDs2ZrSI.png)

![](https://s2.loli.net/2023/07/12/pTtNF6uJkvzoLMV.png)

> 此时可以通过 [https://zzz.waahah.xyz/](https://zzz.waahah.xyz/) 访问站点，但仍是原来的龟速

![](https://s2.loli.net/2023/07/12/CtvZEn3r6VwL7AQ.png)

### 申请SSL免费证书（貌似可选）

> SSL证书用于域名支持https协议，七牛云在http协议下每月提供10g免费流量，但是我不开启https就无法访问站点，所以申请了证书，需要每月流量费用0.28元/GB，对我来说一个月几块钱足够了。
> 
> 建议提前申请证书，开通域名加速后再申请会提示不支持www开头的域名，但是直接申请可以发放。

*   进入七牛云控制台，选择SSL证书服务：

![20210829225002.png](https://s2.loli.net/2023/07/12/8VWglbYvDsTuG3O.png)

*   购买证书（别慌，免费的）

![20210829225015.png](https://s2.loli.net/2023/07/12/fZhN19lvs5M7aCz.png)

*   选择TrustAsia DV 域名型

![20210829225026.png](https://s2.loli.net/2023/07/12/jWiU1XDegS7wAnP.png)

*   点击核对信息并支付，确认支付即可

![20210829225038.png](https://s2.loli.net/2023/07/12/qNgYZLEo8MXxetc.png)

*   点击补全信息，填入站点域名、备注、企业和个人信息（信息仅用于此次注册）

![20210829225046.png](https://s2.loli.net/2023/07/12/R6bmxUXfYC1TVH5.png)

*   提交后需要DNS验证，在一级域名出建立指定的二级域名，记录类型设置为TXT，主机记录填入指定值，一会就会验证成功

![20210829225056.png](https://s2.loli.net/2023/07/12/9I4y5mh6wC1qSgV.png)

*   等待一会就签发成功啦

![20210829225112.png](https://s2.loli.net/2023/07/12/NxhL3R1ldGsEYmX.png)

### 在Hexo添加测试文件

*   所谓的测试文件就是随便一个小文件，放在Hexo/source文件夹下

![20210829225121.png](https://s2.loli.net/2023/07/12/AObtLMvswNfYxGc.png)

*   hexo g ，hexo d 后可以访问 [waahah.github.io/test.html](http://waahah.github.io/test.html) 查看

![20210829225130.png](https://s2.loli.net/2023/07/12/SCqo8hy2NFgP3Y9.png)

### 添加CDN加速域名

*   七牛云控制台，CDN，选择域名管理，添加域名

![20210829225143.png](https://s2.loli.net/2023/07/12/WK7OfqeQcZszpUh.png)

*   选择 普通域名 填写你要加速的域名（需要备案） 选择通信协议 https（我用http失败了）

![20210829225152.png](https://s2.loli.net/2023/07/12/ykBgcausrxET3D7.png)

*   重点！！！

> 覆盖范围：按照个人需求设置
> 
> 使用场景：动态加速
> 
> 源站配置：源站填github分发的二级域名
> 
> 回源Host：填之前我们移动的二级域名，比如我的是 [zzz.waahah.xyz/](http://zzz.waahah.xyz/)
> 
> 源站测试：填入刚刚的test.html，点击测试

![20210829225204.png](https://s2.loli.net/2023/07/12/xLYNO7rZ8n2pVUc.png)

*   其他根据个人需求配置，没特殊要求默认即可，等待一会即提示成功建立加速域名

### 添加七牛云CNAME解析

*   此时配置刚刚建立的域名，会提示你需要配置CNAME

![20210829225212.png](https://s2.loli.net/2023/07/12/Ufcet7hYlOkPIp5.png)

*   返回域名管理，复制CNAME

![20210829225220.png](https://s2.loli.net/2023/07/12/nclE9PKIRXHsbdx.png)

*   在域名商处添加加速前缀的二级域名，解析到上述CNAME

![20210829225226.png](https://s2.loli.net/2023/07/12/JFDsi3lGvtBwrzy.png)

### 测试

> 此时我们已经完成了：

*   加速域名 → 七牛云CNAME → 备用二级域名 → Gtihub二级域名 → 站点服务器

> 可以用dig 命令测试 ，见到七牛云的CNAME解析就可以了:

```bash
dig www.zywvvd.com
```

![20210829225235.png](https://s2.loli.net/2023/07/12/GBz61I9P8Z4n5QK.png)

> 最实在的当然还是测速了

![20210829225242.png](https://s2.loli.net/2023/07/12/5aQEmpFgtN9W8iM.png)

> 舒服。。。

