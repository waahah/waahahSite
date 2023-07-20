---
title: Hexo添加Aplayer播放器 
date: 2023-05-18 14:58:36
tags: [Hexo, Aplayer, Fluid]
categories: [Coding, JavaScript]
---

> 感谢开源！！让我们用上了这么好的插件！

创建歌单页面
======

由于我想在单独的页面加入歌单，所以额外创了个页面，也可以直接在文章中插入，原理都是一样的。

1.  新建页面，命名为playlist：
    
```bash
hexo new page playlist
    
```
    
2.  这时候在 /Hexo/source 文件夹下会生成一个playlist文件夹，打开里面的index.md，修改如下：
    
```yml
title: 歌单
date: 2021-02-21 16:14:00
type: "playlist"
```
    
3.  打开主题的 \_config.yml文件，在menu下新建一个名为playlist的类（注意这里使用的图标是图标库中的图标，网址为 [http://www.fontawesome.com.cn/faicons/](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.fontawesome.com.cn%2Ffaicons%2F) 。可以选择自己喜欢的图标，我这里选择的是music）。完成后如下所示：
    
```yml
menu:
  home: / || home
  categories: /categories/ || th
  tags: /tags/ || tags
  archives: /archives/ || archive
  playlist: /playlist/ || music
  about: /about/ || user
```
    
4.  打开/Hexo/themes/hexo-theme-next/languages/zh-Hans.yml，添加对应的中文翻译：
```yml
menu:
  playlist: 歌单
```
    
这样歌单就创建完成啦~

使用 hexo-tag-aplayer 插件
======================

1.  hexo-tag-aplayer 是Aplayer在hexo上的插件，这里的配置参考的是[官方文档](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md) ，第一步安装 hexo-tag-aplayer：
    
```
npm install --save hexo-tag-aplayer
```
    
2.  最新版的 hexo-tag-aplayer 已经支持了MetingJS的使用，可以直接解析网络平台的歌曲（简直是神器），首先要在站点配置文件中开启meting模式，添加以下代码在配置文件的最后：
    
```yml
aplayer:
  meting: true
```
    
3.  复制歌单的链接，然后复制歌单的id，例如 [https://music.163.com/playlist?id=523845661&userid=46562117](https://music.163.com/playlist?id=523845661&userid=46562117) ，这个歌单的id就是523845661，公司名可以是tencent、netease或是其他公司，下面给出一个例子，打开 /Hexo/source/playlist/index.md文件，输入：
    

```
{% meting "523845661" "netease" "playlist" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```

效果还是很不错的：

![16555752-e4991349fc0b736c.webp](https://s2.loli.net/2023/07/13/2RJbU8tyFA45wWd.webp)

