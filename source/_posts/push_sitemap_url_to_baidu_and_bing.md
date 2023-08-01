---
title: 主动推送网站链接至必应百度搜索引擎，提升网站收录质量和速度
date: 2023-09-01 14:58:36
tags: [Python, Sitemap, Baidu, Bing]
categories: [Coding, Python]
---

## 前言

为了方便自己推送网站url到搜索引擎，于是就写了这个程序。使用脚本推送可主动推送博客sitemap新链接至必应、百度搜索引擎站长平台以**提升网站收录质量和速度**。本程序允许你向各大搜索引擎发送**纯天然、植物饲养**的索引编制请求，一劳永逸。

**地址：[pushSitemapUrls](https://github.com/waahah/pushSitemapUrls)**

## 操作步骤

快速入门：

1. 获取各站长平台密钥
2. 下载代码并配置所需依赖环境
3. `python xxxx,py`，并查询推送结果
4. 如果推送成功，前往 [Github 地址](https://github.com/waahah/pushSitemapUrls)点击 Star 按钮以支持



### 百度

### 添加网址

> 百度提交[网址入口](https://ziyuan.baidu.com/site/index)，用百度账号登录后，还是添加网站的过程

![20210831105428.png](https://s2.loli.net/2023/08/01/qktwaHc2NfvmdL1.png)

> 补充个人信息后，来到第一步输入网站，建议为www前缀：

![20210831105439.png](https://s2.loli.net/2023/08/01/1YnoGaujgl5BWmt.png)

> 第二步根据个人情况填写信息，每个月只能改一次，确定就好；
>
> 第三步选择我们已经熟悉的CNAME验证，根据给定的前缀建立解析，类型CNAME，值填 [ziyuan.baidu.com](http://ziyuan.baidu.com/)

![20210831105450.png](https://s2.loli.net/2023/08/01/7o5eAgw6SNFHIVq.png)

> 点击验证即可：

![20210831105502.png](https://s2.loli.net/2023/08/01/JbXdFgqnuyRSl3Z.png)

### 提交百度搜索的不同方式

> 百度提供了自动提交和手动提交两种方式，其中自动提交又分为主动推送、自动推送和 sitemap 三种方式，以下是官方给出的解释：

- 主动推送：最为快速的提交方式，推荐您将站点当天新产出链接立即通过此方式推送给百度，以保证新链接可以及时被百度收录
- 自动推送：是轻量级链接提交组件，将自动推送的 JS 代码放置在站点每一个页面源代码中，当页面被访问时，页面链接会自动推送给百度，有利于新页面更快被百度发现
- sitemap：您可以定期将网站链接放到sitemap中，然后将sitemap提交给百度。百度会周期性的抓取检查您提交的sitemap，对其中的链接进行处理，但收录速度慢于主动推送
- 手动提交：如果您不想通过程序提交，那么可以采用此种方式，手动将链接提交给百度

> 四种提交方式对比：

![20210831105515.jpg](https://s2.loli.net/2023/08/01/BdjExyFqOoU7zsH.jpg)

### 百度主动推送

1. 搜索服务，普通收录，API提交，记下下方接口调用地址的【百度站长平台中注册的域名，密匙】：<http://data.zz.baidu.com/urls?site=https://waahah.github.io&token=密匙>，这里即【 <https://waahah.github.io> ，密匙】

![屏幕截图 2023-08-01 203816.png](https://s2.loli.net/2023/08/01/OtoqQTxb65NSzLU.png)

>提示
如果网站使用 github page 发布，建议删掉百度站长平台的 sitemap ，用 API 主动提交，我从 5 月底开始百度索引掉了一半，最后发现是当时加 sitemap ，但百度对 github 托管的 sitemap 不友好，动不动抓取失败，影响网站权重。删并用 API 推送后，索引量迅速回升

2. 修改代码对应处为自己的信息
```python
apiUri = 'http://data.zz.baidu.com/urls?site=网址&token=密钥' #接口调用地址
sitemapUrl = 'https://waahah.xyz/sitemap.xml' #网站的sitemap站点地图地址
```

### 必应
### 操作步骤
1. 注册、登陆必应新站长平台（ <https://www.bing.com/webmasters> ）
2. 添加网站（同上，这里就不说了）
3. 进入网站管理页面，设置，API 访问，API 密钥 ，记下 API 密匙
![20200805181854.jpg](https://s2.loli.net/2023/08/01/rCxWvdeBMpK56mS.jpg)

![20200805182136.jpg](https://s2.loli.net/2023/08/01/n5jEQCZhwXpA4q8.jpg)

![20200805182258.jpg](https://s2.loli.net/2023/08/01/h7bPrSsnj1f5Tua.jpg)

4. 修改代码对应处为自己的信息
```python
userData = {
        'apiKey': '26a3a020ce354de19b7e3686e824eb76', #必应站长token密钥
        'siteUrl': 'https://waahah.xyz', #自己的网址
        'sitemapUrl': 'https://waahah.xyz/sitemap.xml' #网站的sitemap站点地图地址
    }
```

至此就可以运行程序主动推送了