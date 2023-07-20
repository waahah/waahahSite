---
title: 宝塔面板搭建音乐播放器
date: 2023-05-22 14:58:36
tags: [JavaScript, BT Panel, Music]
categories: [Coding, JavaScript]
---

1.搭建后台 api 服务
-------------------------------------------------------------------------------------------------

### 1.1下载网易云音乐 Node.js API service

*   方式一：git下载
```bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
```
*   方式二：Github地址
```bash
https://github.com/Binaryify/NeteaseCloudMusicApi
```

### 1.2安装依赖包

  在下载的文件的根目录下右键`Git Bash Here`,输入以下命令  

```bash
#如果报错，请自行百度安装nodejs和npm
npm install
```

  成功后大概会是下面这样  
![](https://s2.loli.net/2023/07/13/ZJ3yGvYhXzLo2Ft.png)

### 1.3部署至服务器端

  将该目录文件进行打包，上传至目录/www/wwwroot，将上传的`NeteaseCloudMusicApi`压缩包解压至目录/www/wwwroot/NeteaseCloudMusicApi

### 1.4下载安装PM2管理器

  宝塔面板左侧搜索PM2，然后安装。

### 1.5添加部署项目

  点击PM2配置添加项目  

```
#启动文件填写
/www/wwwroot/NeteaseCloudMusicApi/app.js
#运行目录填写
/www/wwwroot/NeteaseCloudMusicApi
```

![](https://s2.loli.net/2023/07/13/DkVP4zOYwbKTJmS.png)

  然后就可以看到项目成功运行（默认端口为`3000`端口，在服务器和宝塔面板同时放行）  
![](https://s2.loli.net/2023/07/13/e3zv21M7HdSNGyB.png)

  点击算端口设置，监听端口设置为`3000`  
![](https://s2.loli.net/2023/07/13/6PuqxOosyjcDJG5.png)

### 1.6域名绑定（非必须）

  点击右侧映射，填写已经解析好的`域名`，更目录填写运行目录`/www/wwwroot/NeteaseCloudMusicApi`  
![](https://s2.loli.net/2023/07/13/AnPigH5xupj13fo.png)

  此时,宝塔面板网站页面会多出一个你刚刚配置的域名的网站，点击SSL,为其添加`SSL证书`，如若使用宝塔申请SSL证书，请先关闭`反向代理`，待`SSL`配置成功之后再重新开启反向代理。此时，访问绑定的域名，如果出现下面这样的页面，则说明 api 部署成功！  
![](https://s2.loli.net/2023/07/13/9bolzSdVrfRtqen.png)

2.部署前端页面
-------------------------------------------------------------------------------------------

### 2.1本地工作

#### 2.1.1下载 Vue-mmPlayer

*   方式一：git下载
```bash
git clone https://github.com/maomao1996/Vue-mmPlayer.git
```
*   方式二：Github地址

```bash
https://github.com/maomao1996/Vue-mmPlayer
```

#### 2.1.2安装依赖包

  在下载的文件的根目录下右键`Git Bash Here`,输入以下命令  

```bash
#如果报错，请自行百度安装nodejs和npm
npm install
```

#### 2.1.3配置

  将 `.env` 文件的 `VUE_APP_BASE_API_URL` 地址修改为刚刚部署的 API 服务地址；访客统计`VUE_APP_VISITOR_BADGE_ID`可不用管，PS：访客统计详情参考：[https://github.com/jwenjian/visitor-badge](https://github.com/jwenjian/visitor-badge) 。

#### 2.1.4编译打包

```bash
npm run build
```

  运行完成后，将此文件重新压缩。  
![](https://s2.loli.net/2023/07/13/ayfRAQF9l1vBZmL.png)

### 2.2服务器端工作

#### 2.2.1创建网站

  在宝塔面板左侧选择网站，创建新的网站，域名填写解析好的该音乐网站域名，目录随意。  
![](https://s2.loli.net/2023/07/13/ybOaeHsZ6IU5cfj.png)

#### 2.2.2上传

  将压缩包上传至目录刚刚创建的网站目录下，将上传的`Vue-mmPlayer`压缩包解压至此目录，打开文件夹进入`dist`目录，剪切`dist`目录下的所有文件，粘贴至创建的该网站目录下。

#### 2.2.3部署SSL

  如若想网站以`https`访问，则需要配置SSL证书，方法同上。

  此时，访问配置的音乐网站的域名即可正常访问，前端UI自行修改即可。  
![](https://s2.loli.net/2023/07/13/3c9QJAymDzljFCw.png)

3.部分UI修改
---------------------------------------------------------------------------

  百度统计， 在本地文件 /Vue-mmPlayer/public/index.html  

```
//大概142行
//从？后边开始替换
https://hm.baidu.com/hm.js?xxxx
//如若没有，注册地址https://tongji.baidu.com/web5/welcome/login
```

  阿里图标引入也是在此文件  

```html
//大概22行
<link rel="stylesheet" href="//at.alicdn.com/t/font_1367495_eza6utwbiqn.css" />
```

  主页右侧github图标及部分文字修改,/Vue-mmPlayer/src/components/lyricl/lyric.vue  

```html
//大概16行
<a class="hover" target="_blank" href="https://alvie.cn">
<!-- <mm-icon type="github" :size="14" /> -->
&nbsp;Alvie
</a>
```

  进度条上方文字，/Vue-mmPlayer/src/pages/music.vue  

```html
//大概32行
<template v-else>欢迎使用Alvie在线音乐播放器</template>
```

`/Vue-mmPlayer/src/components/mm-header/mm-header.vue`  

```js
//大概148行
this.$mmToast(`${this.user.nickname} 欢迎使用 Alvie`)
```

  主页访客统计旁标题，直接更改会报错，可修改编译后的文件/Vue-mmPlayer/dist/js/app-legacy.04e69cd5.js和/Vue-mmPlayer/src/dist/js/app.783a22f4.js ps:控制台信息并未修改。

  动态标题修改，`/Vue-mmPlayer/src/App.vue`  

```js
//大概49行
// 设置title
let OriginTitile = document.title
let titleTime
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = '为人民某幸福！'
    clearTimeout(titleTime)
  } else {
    document.title = '为民族谋复兴！'
    titleTime = setTimeout(function () {
      document.title = OriginTitile
    }, 2000)
  }
})
```

![](https://s2.loli.net/2023/07/13/EPbaYMWNJvi83hB.webp)

