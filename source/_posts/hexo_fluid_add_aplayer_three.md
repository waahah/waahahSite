---
title: Hexo添加全局吸底APlayer
date: 2023-05-20 14:58:36
tags: [Hexo, Aplayer, Fluid]
categories: [Coding, JavaScript]
---

本篇文章记录了创建此博客的过程，建立博客的初衷是将自己遇到的问题写入博客中，方便自己查询阅读，同时也希望能帮助他人。

更新了网站全局的css以及添加了侧边栏时钟

### 侧边栏时钟

NPM 插件安装的部署方法：

```powershell
npm i hexo-electric-clock --save

# 或者

cnpm i hexo-electric-clock --save
```

注意，一定要加 `--save`，不然本地预览的时候可能不会显示！！！

新增网站根目录\_config 配置项 (不是主题的)：
```yml
electric_clock:
  priority: 5
  enable: true
  enable_page: all
  layout:
    type: class
    name: sticky_layout
    index: 0
  temple_html: '<div class="card-widget card-clock"><div class="card-glass"><div class="card-background"><div class="card-content"><div id="hexo_electric_clock"><img id="card-clock-loading" src="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-clock/clock/images/weather/loading.gif" style="height: 120px; width: 100%;" data-ll-status="loading" class="entered loading"></div></div></div></div></div>'

```

enable

参数：true/false  
含义：是否开启插件

enable\_page

参数：all  
含义：路由地址，all 代表全局开启。如 / 代表主页。

priority

参数：1  
含义：插件的叠放顺序，数字越大，叠放约靠前。
```yml
electric_clock:
  enable: true
  priority: 5 # 这里是参数
```

### layout

参数：type; （class&id）  
参数：name;  
参数：index；（数字）  
含义：如果说 electric\_clock 是一幅画，那么这个 layout 就是指定了哪面墙来挂画  
而在 HTML 的是世界里有两种墙分别 type 为 id 和 class。  
其中在定义 class 的时候会出现多个 class 的情况，这时就需要使用 index，确定是哪一个。  
最后墙的名字即是 name;

```html
<div desc="我是墙" id="recent-posts">
  <!-- id=>type  recent-posts=>name    -->
  <div desc="我是画框">
    <div desc="我是纸">
      <!--这里通过js挂载electric_clock，也就是画画-->
    </div>
  </div>
</div>
```

temple\_html

参数：html 模板字段  
含义：包含挂载容器

```html
<div class="card-widget card-clock">
  <!-- 挂载容器 -->
  <div class="card-glass">
    <div class="card-background">
      <div class="card-content">
        <div id="hexo_electric_clock">
          <img
            id="card-clock-loading"
            src="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-clock/clock/images/weather/loading.gif"
            style="height: 120px; width: 100%;"
            data-ll-status="loading"
            class="entered loading"
          />
        </div>
      </div>
    </div>
  </div>
</div>
```

hexo 三连

执行 hexo 三连

```bash
hexo clean && hexo g && hexo s
```

即可发现已经成功部署。

——-此处转载小冰博客 文章作者: しゅふがく 文章链接: [https://zfe.space/post/hexo-electric-clock.html](https://zfe.space/post/hexo-electric-clock.html)

2021/12/10
-------------------------------------------------

修复了github自定义域名自动重定向，解决办法如下

在blog/source路径下创建一个文件，名为CNAME，没有后缀

内容为重定向的域名

2021/12/07
-------------------------------------------------

更新了aplayer与live2D看板娘

### 添加全局吸底APlayer

第一步

打开 `themes\Butterfly\layout\includes\head.pug`

结尾加一句

```bash
include ./third-party/aplayer.pug
```

第二步  
然后在themes\\Butterfly\\layout\\includes\\third-party\\里面新建一个文件叫 aplayer.pug ,内容如下

```js
if theme.aplayer && theme.aplayer.enable
	.aplayer(data-id=theme.aplayer.id data-server=theme.aplayer.server data-type=theme.aplayer.type data-fixed=theme.aplayer.fixed data-mini=theme.aplayer.mini data-listFolded=theme.aplayer.listFolded data-order=theme.aplayer.order data-preload=theme.aplayer.preload)
	each item in theme.aplayer.css
		link(rel='stylesheet', href=item)
	each item in theme.aplayer.js
		script(src=item)
```

第三步  
然后打开butterfly.yml(如果你没有启用的话,就打开source/\_data/butterfly.yml) 加入以下内容

```yml
##侧边栏歌单
aplayer:
  enable: true
  js:
    - https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.js
    - https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js
  css:
    - https://cdn.bootcss.com/aplayer/1.10.1/APlayer.min.css
  id: 2693598459
  server: netease 
  type: playlist
  fixed: 'true'
  order: random
  preload: none
  listFolded: 'false'
```

### 添加live2D看板娘

1.下载

经过张书樵大神魔改后的项目下载地址：[https://github.com/stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

下载解压到：themes\\butterfly\\source\\文件夹下

例如我的：

```cmd
C:\Users\yezhangzhe\blog\node_modules\hexo-theme-butterfly\source\live2d-widget-master
```

2.设置绝对路径

打开项目目录进入修改autoload.js文件，将live2d\_path设为自己的路径，一般没什么太大变化都为：/live2d-widget-master/

```js
// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "/live2d-widget-master/";
```

3.导入

打开butterfly下的layout下的including目录,修改head.pug文件,在文件末尾粘贴：

```js
script(src='/live2d-widget/autoload.js')
```

最后在主题配置文件\_config.yml中开启live2d看板娘：

```
# 看板娘
live2d:
  enable: true
```

**在live2d-widget目录下的waifu.css中可以看板娘的相关配置**

2021/12/06
-------------------------------------------------

更新了about关于界面，整理了文章归档，同时把两个博客的地址加入了百度的收录

2021/12/01
-------------------------------------------------

### 解决了如何在文章中添加图片

1.安装支持图片插件

```
$ npm install hexo-asset-image --save
```

2.打开配置文件

找到 post\_asset\_folder，把这个选项从false改成true

3.打开

```cmd
/node_modules/hexo-asset-image/index.js
```

将内容更换为下面的代码

```cmd
代码放在个人网盘的hexo文件夹中的hexo-asset-imageindex.txt
```

现在就可以插入图片了，比如hexo new post photo之后  
就在source/\_posts生成photo.md文件和photo文件夹，我们把要插入的图片复制到photo文件夹内，  
在photo.md文件里面按markdown的标准写,（我的文件名是head.jpeg）比如

```markdown
![这是代替图片的文字，随便写](head.jpeg)
```

* * *

2021/11/30
-------------------------------------------------

#### 学习md文章格式

| 写法 | 解释 |
| --- | --- |
| title | \[必选\]页面标题 |
| date | \[必选\]页面创建日期 |
| type | \[必选\]标签、分头、友情链接三个页面需要配置 |
| updated | \[可选\]页面更新日期 |
| description | \[可选\]页面描述 |
| keywords | \[可选\]页面关键字 |
| comments | \[可选\]显示页面的评论模块（默认true） |
| top\_img | \[可选\]页面顶部图片 |
| mathjax | \[可选\]显示mathjax（当设置mathjax的per\_page: false时，才需要配置，默认false） |
| katex | \[可选\]显示katex（当设置katex的per\_page: false时，才需要配置，默认false） |
| aside | \[可选\]显示侧旁栏（默认true） |
| aplayer | \[可选\]在需要的页面加载aplayer的js和css |
| highlight\_shrink | \[可选\]配置代码块是否展开 |

#### 添加导航栏内容

使用new page命令在博客目录下新建分栏 这里以tags为例子

```bash
$ hexo new page tags
```

创建成功后在source文件夹下会生成tags的目录

打开tags目录中的index.md，修改其中的内容为

`title: '标签'`  
`date: 2021-11-30 10:12:15`  
`type: tags`

#### 添加友情链接

使用new page命令在博客目录下新建友情链接分栏，且配置index.md

之后在source文件夹下创建\_data文件夹

在\_data文件夹中创建一个link.yml文件，内容为

*   `class_name: 分栏名字`  
    `class_desc: 分栏介绍`  
    `link_list:`
    *   `name: 友链名字`  
        `link: 友链链接`  
        `avatar: 友链图标`  
        `descr: 友链描述`

* * *

