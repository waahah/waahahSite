---
title: 万能命令-快捷直达你想要的工具 
date: 2021-11-02 14:58:36
tags: [wn, Web ]
categories: [Coding, JavaScript]

---

介绍
--

#### wn万能命令是一个在线工具快捷跳转平台，将各种高质量的在线工具按应用站点聚合起来，让你以方便快捷好记的方式寻找和使用网页型在线工具。

浏览任意网页时，输入这个万能命令 `wn.run/` 或点击一下固定的书签，就会展示出用于`该网页`的各种附加在线工具，比如 快速查看该网页历史存档(网页被删了找回)、快速网页翻译(默认手机端网页翻译会比较繁琐)、快速网页长截图、查看电商历史价格等，并且点击工具时一般会直达`针对该网页的功能详情页`。

特点：  
1、方便快捷，只需输入一个命令或点击一下书签  
2、无需下载、即用即走  
3、无平台限制，`pc`、`android`、`ios`等都可使用  
4、按应用站点分类，快捷寻找到可用的工具，过滤掉无关的工具  
5、一般直接到达用于该网页的工具详情页  
6、收录了很多高质量的工具



使用方式：
-----

### 方式1

万能命令方式。

在任何网页的网址前面加上 `wn.run/` (万能命令，wn为万能拼音简称，run为运行、命令的意思)，即可展示用于该网页的在线工具，并且点击工具时一般会直达针对该网页的功能详情页，无需再复制和粘贴网页链接。  
例如：  
https://item.jd.com/5225346.html  
在网址前面加上wn.run/ ，变为  
[wn.run/https://item.jd.com/5225346.html](https://wn.run/https://item.jd.com/5225346.html)

### 方式2

书签脚本方式。

第一步：拖动下方按钮到浏览器的书签栏(也称网页收藏夹)，相当于添加一个网页小书签，但书签的网址项里填的是一串脚本。 [详细说明](https://wannengrun.com/fu/article/10.html)

拖动本按钮到书签栏 [万能命令书签](javascript:(function(){window.open("https://wannengrun.net/f/#"+document.location.href)})())

   如果是移动端浏览器或其他pc浏览器，无法用上面拖动的方式，可以手动添加一个书签，书签名称可以自定义，比如“万能命令书签”，并在书签的网址项里输入下面的代码。 [ios使用书签脚本](https://wannengrun.com/fu/article/11.html) [android使用书签脚本](https://wannengrun.com/fu/article/12.html)

```
javascript:(function(){window.open("https://wannengrun.net/f/#"+document.location.href)})()
```
第二步：后面浏览任意网页时，有小需求了，只需点击一下书签栏里的“万能命令书签”，即可马上展示用于该网页的各类工具。