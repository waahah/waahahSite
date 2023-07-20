---
title: 打造个性化的GitHub首页 
date: 2022-10-10 14:58:36
tags: [GitHub, JavaScript]
categories: [Coding,  JavaScript]
---

一、前言
----

Github 首页美化教程

> 这是之前写过的一篇文章了，现在把这篇文章发表在个人博客上，希望各位大佬可以多多支持。

相信很多童靴在敲代码之余，都致力于美化自身所处的环境。比如对IDE的美化，对电脑壁纸的精挑细选等等。

GitHub（Gayhub）相信大多数童靴（程序基）都不陌生，GitHub用户的个人主页是这样的。

![](https://s2.loli.net/2023/07/09/rL2NQGnuexfpawP.webp)

然鹅...

我们在GitHub上见到过更炫酷的主页！

![](https://s2.loli.net/2023/07/09/FtmiHeQSBZ5Dqsy.png)

想拥有吗？

那么正式进入我们今天的教程部分。

二、秘密仓库
------

其实DIY Github 的首页很简单，我们只需要新建一个仓库名和自己 Github 用户名相同的仓库并且添加一个 `README.md`自述文件即可。

理论存在，实践开始。（新建一个同名仓库，并添加一个自述文件后确认）

![](https://s2.loli.net/2023/07/09/IYR3u8ofnaLOqCp.webp)

新建同名仓库

GitHub默认为此文件添加了demo，我们编辑此文件，即可开启自己的DIY之路了！

![v2-720cb4d03b7572d5646d3072dafcc861_720w.webp](https://s2.loli.net/2023/07/09/qh2E1KpeDUcXvLi.webp)

编辑文件

![v2-f552bc43f36445492d099c9777f998b6_720w.webp](https://s2.loli.net/2023/07/09/WB7QmgPTwSvkKUd.webp)

变化前

![v2-46c131f339d0b73033a708173ff8e058_720w.webp](https://s2.loli.net/2023/07/09/G3CE8AgwzOUDo56.webp)

变化后

三、炫酷一点
------

Github提供了这样一个特殊的`markdown`文件以供我们DIY主页，扩展性很高，如果您熟悉HTML，CSS以及MarkDown 语法的话。

可是。。。毕竟个人的创造力有限，如何能在短时间拥有一个酷炫的个人主页呢！

emmm，有了，`ctrl+c` `ctrl+v`

> 以下展示内容基本上把我的Github ID换成你自己的就可以了， sun0225SUN --> your id

### 1、Metrics（GitHub 信息统计）

![](https://s2.loli.net/2023/07/09/T1w2gUfnH7CSz35.png)

获得类似上图的 GitHub 数据统计，需要用到一个在线工具[「Metrics」](https://metrics.lecoq.io/)，打开网站之后，在左侧输入你的 GitHub ID，稍等一会，就会返回右侧所有和你相关的数据。

点击右侧的 Markdown code 选项卡，切换到统计视图对应的 Markdown 链接，复制代码添加到`README.md`文件中。

> 代码格式可以是markdown语法，也可以是HTML语法，但HTML的扩展性更强一点，建议采用HTML语法格式书写。

```html
<div align="center"> <img src="https://metrics.lecoq.io/sun0225SUN?template=classic&config.timezone=Asia%2FShanghai"> </div>
```

> 其实这个网站能做的还有很多，不只这一个，我会在后续的教程中展示这个网站`amazing`的地方

* * *

### 2、GitHub Stats Card（GitHub 统计卡片）

在您的自述文件中获取动态生成的 GitHub 统计信息 --> [传送门](https://github.com/anuraghazra/github-readme-stats)

![](https://s2.loli.net/2023/07/09/T1w2gUfnH7CSz35.png)

`详情可以看上面的官方文档，在README.md添加如下代码，查看展示demo`

```html
<div align="center"> <img height="137px" src="https://github-readme-stats.vercel.app/api?username=waahah&hide_title=true&hide_border=true&show_icons=trueline_height=21&text_color=000&icon_color=000&bg_color=0,ea6161,ffc64d,fffc4d,52fa5a&theme=graywhite" /> </div>
```

* * *

### 3、Most used languages（GitHub 使用语言统计）

在您的自述文件中添加使用编程语言对比统计图 --> [传送门](https://github.com/anuraghazra/github-readme-stats)

![](https://s2.loli.net/2023/07/09/lcoRDvL95XTZHAG.png)

```html
<div align="center"> <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=waahah&hide_title=true&hide_border=true&layout=compact&langs_count=6&text_color=000&icon_color=fff&bg_color=0,52fa5a,4dfcff,c64dff&theme=graywhite" /> </div>
```

* * *

### 4、Github Profile Trophy（GitHub 资料奖杯）

添加奖杯信息--> [传送门](https://github.com/ryo-ma/github-profile-trophy/)

![](https://s2.loli.net/2023/07/09/Gfo6TdBiCp1IbWE.png)

  

```html
<div align="center"> <img src="https://github-profile-trophy.vercel.app/?username=sun0225SUN" /> </div>
```

* * *

### 5、Shields（GitHub 徽章）

为你的开源项目生成高质量小徽章图标，直接复制链接使用。 --> [传送门](https://shields.io/)

![](https://s2.loli.net/2023/07/09/qPiNv4WoFsZAcKb.png)

```html
<span > <img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3" /> <img src="https://img.shields.io/badge/-JavaScript-oringe?style=flat-square&logo=javascript" /> </span>
```

* * *

### 6、Visitor Badge（GitHub 访客徽章）

这个徽章会实时改变，记录此页面被访问的次数。-->[传送门](https://link.zhihu.com/?target=https%3A//visitor-badge.glitch.me/)

![v2-811a33979c06f220de9c94c47c6cd147_720w.webp](https://s2.loli.net/2023/07/09/npW1UAvDFoQ9jGy.png)

```html
<div align="center"> <img src="https://visitor-badge.glitch.me/badge?page_id=sun0225SUN" /> </div>
```

* * *

### 7、GitHub Readme Activity Graph （GitHub 活动统计图）

动态生成的活动图，用于显示您过去 31 天的 GitHub 活动。 --> [传送门](https://github.com/Ashutosh00710/github-readme-activity-graph/)

![](https://s2.loli.net/2023/07/09/Jis9lmAYvya4w2R.png)

```html
<div align="center"> <img src="https://activity-graph.herokuapp.com/graph?username=sun0225SUN&theme=xcode" /> </div>
```

* * *

### 8、GitHub streak（GitHub 连续打卡）

在 README 中展示您连续提交代码的次数。 --> [传送门](https://github.com/DenverCoder1/github-readme-streak-stats)

![](https://s2.loli.net/2023/07/09/TeWfidkhr1tIbml.png)

```html
<div align="center"> <img src="https://github-readme-streak-stats.herokuapp.com/?user=sun0225SUN" /> </div>
```

* * *

### 9、社交统计

在 README 中展示你在一些流行的网站的数据。 --> [传送门](https://github.com/songquanpeng/stats-cards)

![](https://s2.loli.net/2023/07/09/m9kCI7aDsfHwNug.png)

```html
<div align="center"> <img src="https://stats.justsong.cn/api/csdn?id=weixin_50915462"> </div>
```

* * *

### 10、打字特效

![](https://s2.loli.net/2023/07/09/zrLtHnjOgAkd5C7.png)

嗯。。。对，是种循环打字的效果，很炫酷，--> [传送门](https://github.com/DenverCoder1/readme-typing-svg)

```html
<h1 align="center"> <a href="https://sunguoqi.com/"> <img src="https://readme-typing-svg.herokuapp.com/?lines=console.log(%22Hello%2C%20World!%22);小孙同学祝您今天愉快!&center=true&size=27"> </a> </h1>
```

四、优秀案例
------

### 1、毛遂自荐

我的GitHub主页，欢迎大佬star，fork，follow哦！

<https://github.com/waahah>

### 2、案例仓库

GitHub是一个大的开源代码托管仓库，自述文件（README.md）肯定也是开源的，当我们看到了好的创意，优秀的布局，炫酷的页面的时候，我们直接到大佬的仓库里拉取就好了，记得给大佬star。

下面是两个个人认为比较好仓库，里面收录了很多好看的 profiles!

<https://github.com/EddieHubCommunity/awesome-github-profiles>

![](https://s2.loli.net/2023/07/09/B2YAzLTVm9hUREc.webp)

<https://link.zhihu.com/?target=https%3A//github.com/abhisheknaiidu/awesome-github-profile-readme>

![](https://s2.loli.net/2023/07/09/TY2JCVXyhKv4ceU.webp)

五、后记
----

本次教程分享的内容，大多是通过大佬们做好的API插入到我们的`readme.md`文件中进行展示的，虽然也有动态更新的效果，但是没法完全做到类似于我现在的主页的这种效果。

其实还有很大一部分内容是通过GitHub actions去做的。

> 不足与展望：毕竟我个人的收集能力有限，会遗漏更多更炫酷的展示效果，希望各位知友可以多多在评论区留言交流，分享下您的经验。

