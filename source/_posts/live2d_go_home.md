---
title: 萌萌的live2d看板娘带回家
date: 2022-10-13 14:58:36
tags: [Hexo, JavaScript]
categories: [Coding,  JavaScript]
---

一、前言
----

[点击进入我的个人博客](http://www.waahah.xyz/)  
_萌萌的看板娘不仅B格上来了，还能在你遨游知识的海洋时进行互动，可萌可看家，还等什么，动手吧~_

* * *

实机演示：  
![20200929095608860.png](https://s2.loli.net/2023/07/09/5LHNGdPKxVpiJq7.png)

* * *

![20200929095818889.png](https://s2.loli.net/2023/07/09/y6CqvT2KczB1NkQ.png)

* * *

一、简单模式
======================================================================

#### 1\. 安装hexo-helper-live2d插件

*   如果之前安装过先卸载掉

```bash
npm uninstall hexo-helper-live2d
# 检查博客主目录下面的 package.json里是否有"hexo-helper-live2d": "^3.0.3" 依赖

```

*   没有则执行安装命令

```bash
npm install --save hexo-helper-live2d

```

**注意：** 命令都是在博客主目录执行

#### 2\. 安装之后 `node_moduels`目录下，可以看到有`live2d-widget`文件夹，这些都是动画主配置

*   到github中下载各种动画model

[https://github.com/xiazeyu/live2d-widget-models.git](https://github.com/xiazeyu/live2d-widget-models.git)

#### 3\. 下载好之后将packages里的所有动画模板拷贝到博客的node\_modules目录里

*   注意：拷出的文件跟`live2d-widget`文件夹平级

#### 4\. 把下面的配置复制到博客站点配置文件`_config.yml`最下面

*   模板效果参考链接： [https://blog.csdn.net/wang\_123\_zy/article/details/87181892](https://blog.csdn.net/wang_123_zy/article/details/87181892)

```yml
live2d:
  enable: true
  pluginModelPath: assets/
  model:
    use: live2d-widget-model-epsilon2_1  #模板目录，在node_modules里
  display:
    position: right
    width: 150 
    height: 300
  mobile:
    show: false  #是否在手机进行显示

```

#### 5\. 配置完成之后执行三部曲就OK了：

```js
hexo clean # 清理
hexo g	   # 构建
hexo s     # 运行

```

二、困难模式
======================================================================

#### 1\. 把之前的live2d卸载掉 `npm uninstall hexo-helper-live2d`

#### 2\. 下载配置 [戳这里](https://github.com/stevenjoezhang/live2d-widget)

#### 3\. 下载好后目录为live2d-widget ,拷贝到主目录\\themes\\next\\source目录下

#### 4\. 然后修改autoload.js文件，将路径改为绝对路径

```js
// 注意：live2d_path 参数应使用绝对路径
//const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
const live2d_path = "/live2d-widget/"; //把这里注释解开，上面的路径注释掉就行了

```

#### 5\. 引入链接 ，修改`_layout.swing`文件（复制到head标签中）

*   有一些主题,路径在`/themes/主题名字/layout/_partial/head.ejs`目录下
*   我自己使用的next主题,是在`/themes/next/layout/_layout.swing`目录下

```html
<script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
<script src="/live2d-widget/autoload.js"></script>

```

##### 添加之后如下：

```ejs
<head>
  {{ partial('_partials/head/head.swig', {}, {cache: theme.cache.enable}) }}
  {% include '_partials/head/head-unique.swig' %}
  {{- next_inject('head') }}
  <title>{% block title %}{% endblock %}</title>
  {{ partial('_third-party/analytics/index.swig', {}, {cache: theme.cache.enable}) }}
  {{ partial('_scripts/noscript.swig', {}, {cache: theme.cache.enable}) }}
  <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"/>
  <script src="/live2d-widget/autoload.js"></script>
</head>

```

**想修改看板娘大小、位置、格式、文本内容等，可查看并修改 `waifu-tips.js` 、 `waifu-tips.json` 、`waifu.css`文件**

