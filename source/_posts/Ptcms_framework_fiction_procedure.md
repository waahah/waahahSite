---
title: Ptcms小说聚合安装环境配置
date: 2023-04-18 14:58:36
tags: [ PHP, Apache, Memcache, Mysql, Nginx, Linux, BT Panel]
categories: [Coding, PHP]
---

### 前言

ptcms安装环境配置

发现网络上后很多人安装不好ptcms这款小说小偷程序，大部分都是ptcms安装环境问题今天就来发布一下这款程序的环境要求和具体配置方法；

ptcms安装环境：`linux`/`win`+`apache`+`php5.6`开通`memcache`扩展+`mysql5`+Memcached+伪静态（nginx所需）配置环境使用宝塔面板比较方便；

![](https://s2.loli.net/2023/07/12/63QTCIwJvxLzSq1.jpg)

1、首先是服务器系统方面使用win2008及以上或则linux都可以这个没有要求win2003是不行的哈应为需要用到php5.6的版本win2003不支持；

2、内存和带宽以及硬盘方面，服务器内容最好是2G内存，带宽当然越大越好硬盘方面测试了下采集1万本小说大概需要1G数据库硬盘占用。

3、Web服务器选用nginx或者apache都可以；注：apache不用另外配置伪静态；

4、Php和php扩展php最好使用5.6版本并且安装php扩展里的memcache否者安装过程中会提示没有安装或者开通memcache导致安装步骤过不了哟；

![](https://s2.loli.net/2023/07/12/hfN7z4E2t9XBOIw.jpg)

5、  Memcached这个宝塔面板软件商店里直接安装就好蓝色图标的。

6、伪静态如果web服务器使用的是apache那就不用设置，如果采用的是nginx那就使用如下代码

```shell
location / {

        if (!-e $request\_filename){

                rewrite  ^(.\*)$  /index.php?s=$1  last;   break;

        }

}
```

以上就上ptcms安装环境的全部知识谢谢

### 更多
- [ptcms采集规则分享](https://www.mlk.name/?id=127)

