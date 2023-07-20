---
title: Hexo博客Fluid主题添加Aplayer组件_hexo-tag-aplayer
date: 2023-05-16 14:58:36
tags: [Hexo, Aplayer, Fluid]
categories: [Coding, JavaScript]
---

前言
----

aplayer是一个非常漂亮好用的HTML5音乐播放器，和dplayer师出同门。我用的主题是fluid，记录一下添加音乐插件的过程。

我的[HEXO博客](https://waahah.xyz/)

![](https://s2.loli.net/2023/07/12/c2odgnQNXqFraUP.png)

安装aplayer
======================================

npm和github两种方式二选一，拿到dist文件夹就可以了。

npm安装
--------------------------------------------------------------------

在hexo博客的文件夹根目录打开git bash，并输入:

```bash
npm install --save hexo-tag-aplayer

```

可以看到在node\_module文件夹中多出来一个aplayer文件夹即可

![](https://s2.loli.net/2023/07/12/nioELmTul2wc3bO.png)

为了方便，将这个dist文件夹复制一份到主题目录下的source文件夹中。

Github下载源码
-------------------------------------------------------------------------

[去github clone源码](https://github.com/DIYgod/APlayer)，并复制dist文件夹到主题下的source。

![](https://s2.loli.net/2023/07/12/ai8pvrWS7fcMCZx.png)

配置js组件
======================================

这一步可以根据[教程](https://blog.yleao.com/2018/0902/hexo%E4%B8%8A%E7%9A%84aplayer%E5%BA%94%E7%94%A8.html)选择自己喜欢的模式。新建一个music.js（名字随便起），放到主题的source文件夹里（我放在source/js/diy/music.js）例如：

![82c62c9febb8838ac376ec641923eba4.png](https://s2.loli.net/2023/07/12/3HQM9tOXpC6Ykef.png)

*   和我选择一样的跟随模式

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
	autoplay: true, //自动播放
    audio: [
	{
        name: '',
        artist: '',
        url: '',
        cover: '',
    }, 
	]
});

```

*   选择普通模式

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: '',
        artist: '',
        url: '',
        cover: '',
    }]
});

```

等等

搞音乐外链
======================================

*   在一些网站上搜索，例如：https://www.ytmp3.cn/

好用是好用，但是没有cover，逼格不够；包含的音乐也有点少。

*   自己动手薅

1.  比如说找[deca joins的浴室](https://music.163.com/#/song?id=483378334)，在页面按F12进入开发者模式，选择Network。
    
    ![82c62c9febb8838ac376ec641923eba4.png](https://s2.loli.net/2023/07/12/3HQM9tOXpC6Ykef.png)
    
2.  点击播放，找media类型的Request URL就是音乐的URL。

![9579265dea76110e5ffeb00990ee0f7e.png](https://s2.loli.net/2023/07/12/LXkqCthjBwNZWEe.png)

![1b9d17d2cfc785c10c4bb30982d55569.png](https://s2.loli.net/2023/07/12/6VA5LcZKeJQ1pDN.png)
    
    
3.  同样的找到想要的cover图片的URL，然后一起填到之前的music.js中。
    

例如我的：

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
	autoplay: true, //自动播放
    audio: [
	{
        name: "浴室",
        artist: 'deca joins',
        url: 'https://m704.music.126.net/20211212133437/6298f876daf4b3a20b984659f71f8968/jdyyaac/000c/560b/5153/7f43625368aa52c4fbb0f968fa2007d2.m4a?authSecret=0000017dad0be60506550aa4681408a0',
        cover: 'https://p1.music.126.net/byjfkEIOWI_RmxSKEWTPyw==/18910500486297525.jpg?param=200y200',	
    },
	]
});

```

布置到想要的页面中
======================================

因为我用的是fluid主题，作者在\_config.yml文件中预留了修改html的接口，所以我就直接添加在

![c099a40292281ff77da40bac39408b07.png](https://s2.loli.net/2023/07/12/RkQmAbaIWP21TLc.png)

```html
<link rel="stylesheet" href="/dist/APlayer.min.css">
<div id="aplayer"></div>
<script type="text/javascript" src="/dist/APlayer.min.js"></script>
<script type="text/javascript" src="/js/diy/music.js"></script>

```

值得注意的是，这里的`id=“aplayer”`要和上面music.js中的`container: document.getElementById(‘aplayer’)`填的Id相同。

然后就保存发布即可！

最终效果：

![9b62cb79506030c0ccaa5e2bb91f9a94.png](https://s2.loli.net/2023/07/12/ur27VBAG8svOJb4.png)

TODO
======================================

如何获取歌词lrc，有哪位老哥知道可以和我分享一下。感谢！
