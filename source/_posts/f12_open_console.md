---
title: JavaScript控制台窗口设置视频播放速度
date: 2021-07-25 14:58:36
tags: [Coding, JavaScript, Video]
categories: [Coding, JavaScript]

---

### 前言

`F12`打开`console`窗口设置视频播放速度，想要多快要多快

#### 短话短说，`F12`开控制台代码如下：

```javascript
var tags=document.getElementsByTagName("video");
[...tags].forEach(val=>val.playbackRate = 2.5);//这里的2.5可以是任何你想要的倍数。
```

#### PS：前提你在页面能看到`video`标签，如我看的阿里quick bi的页面 [http://cloud.video.taobao.com/](http://cloud.video.taobao.com/) 有一个video标签如下：

```html
<video src="http://cloud.video.taobao.com/play/u/3430055553/p/1/e/6/t/1/235955854473.mp4" controls="" data="http://cloud.video.taobao.com/play/u/3430055553/p/1/e/6/t/1/235955854473.mp4" id="object-7lv-7df-oih" controlslist="nodownload"></video>
```

