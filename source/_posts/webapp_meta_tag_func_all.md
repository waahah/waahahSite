---
title: WebApp 里Meta标签作用大全
date: 2023-06-15 14:58:36
tags: [Html, WebApp, Meta]
categories: [Coding, Html]
---

1. 先说说mate标签里的viewport：

viewport即可视区域，对于桌面浏览器而言，viewport指的就是除去所有工具栏、状态栏、滚动条等等之后用于看网页的区域。对于传统WEB页面来说，980的宽度在iphone上显示是很正常的，也是满屏的，但对于webapp而言，可能就有点问题了，在iphone上我们的webapp在竖屏下通常宽度都是320。

因此我们必须改变viewport，我们就有如下几种属性值可以设置：

width: viewport 的宽度 （范围从 200 到 10,000 ，默认为 980 像素 ）

height: viewport 的高度 （范围从 223 到 10,000 ）

initial-scale: 初始的缩放比例 （范围从>0到 10 ）

minimum-scale: 允许用户缩放到的最小比例

maximum-scale: 允许用户缩放到的最大比例

user-scalable: 用户是否可以手动缩放

对于这些属性，我们可以设置其中的一个或者多个，并不需要你同时都设置，iPhone 会根据你设置的属性自动推算其他属性值 ，而非直接采用默认值。

如果你把initial-scale=1 ，那么 width 和 height在竖屏时自动为320\*356 （不是320\*480 因为地址栏等都占据空间 ），横屏时自动为 480\*208。类似地 ，如果你仅仅设置了 width ，就会自动推算出initial-scale 以及height。例如你设置了 width=320 ，竖屏时 initial-scale 就是 1 ，横屏时则变成 1.5 了

那么到底这些设置如何让 Safari 知道 ？其实很简单 ，就一个 meta ，形如 ：

```html
<meta name=”viewport” content=”width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;” /> 设置了meat后我们页面将如此呈现了
```

2. meta标签里的name属性

   name 属性  
(1)、＜meta name="Generator" contect=""＞用以说明生成工具（如Microsoft FrontPage 4.0）等；  
  
(2)、＜meta name="keywords" contect=""＞向搜索引擎说明你的网页的关键词；  
  
(3)、＜meta name="Description" contect=""＞告诉搜索引擎你的站点的主要内容；  
  
(4)、＜meta name="Author" contect="你的姓名"＞告诉搜索引擎你的站点的制作的作者；  
  
(5)、＜meta name="Robots" contect="all | none | index | noindex | follow | nofollow"＞  
  
其中的属性说明如下：  
  
设定为all：文件将被检索，且页面上的链接可以被查询；  
  
设定为none：文件将不被检索，且页面上的链接不可以被查询；  
  
设定为index：文件将被检索；  
  
设定为follow：页面上的链接可以被查询；  
  
设定为noindex：文件将不被检索，但页面上的链接可以被查询；  
  
设定为nofollow：文件将不被检索，页面上的链接可以被查询

3. webapp里主要的mate用途

```html
<meta name="apple-touch-fullscreen" content="yes">  添加到主屏幕后，全屏显示。

<meta name="apple-mobile-web-app-capable" content="yes" />
```
这meta的作用就是删除默认的苹果工具栏和菜单栏。content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。

```html
<meta name=”apple-mobile-web-app-status-bar-style” content=black” />
```
默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。  
注意： 若值为“black-translucent”将会占据页面px位置，浮在页面上方（会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。  
  
  ```html
<meta name="apple-mobile-web-app-capable" content="yes">  
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```
在iOS中有两个meta值，apple-mobile-web-app-capable和apple-mobile-web-app-status-bar-style，这两个会让网页内容以应用程序风格显示，并使状态栏透明。

```html
<link rel="apple-touch-icon-precomposed" href="http://spion.blog.163.com/blog/iphone\_milanoo.png" /> 
```
说明： 这个link就是设置web app的放置主屏幕上icon文件路径。  
图片尺寸可以设定为57\*57（px）或者Retina可以定为114\*114（px），ipad尺寸为72\*72（px）  

```html
<meta content="telephone=no" name="format-detection" />  
<meta content="email=no" name="format-detection" /> //将不识别邮箱  
```
告诉设备忽略将页面中的数字识别为电话号码

```html
<link rel="apple-touch-icon" href="/static/images/identity/HTML5\_Badge\_64.png" />  
<link rel="apple-touch-icon-precomposed" href="/static/images/identity/HTML5\_Badge\_64.png" />
```

iOS用rel="apple-touch-icon",android 用rel="apple-touch-icon-precomposed"。这样就能在用户把网页存为书签时，在手机HOME界面创建应用程序样式的图标。

```html
<meta name="sharecontent" data-msg-img="缩略图地址" data-msg-title="标题" data-msg-content="简介" data-msg-callBack="" data-line-img="缩略图地址" data-line-title="标题" data-line-callBack=""/>  
```

微信分享页面设置

### html标签里面的<meta>标签的作用

<meta> 元素可提供有关页面的元信息（meta-information）例如作者、日期和时间、网页描述、关键词、页面刷新等.并不是专门给搜索引擎而设的。  
但其中的keyword 和 description 是搜索引擎来找到网页的一个方式。  
 

### html的meta标签、title 标签、Description标签、keyword 标签是什概念？如果应用这些标签？

<META>”（即通常所说的META标签）。META标签用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等。  
  
??在有关搜索引擎注册、搜索引擎优化排名等网络营销方法内容中，通常都要谈论META标签的作用，我们甚至可以说，META标签的内容设计对于搜索引擎营销来说是至关重要的一个因素，尤其是其中的 “description”（网页描述）和“Keywords”（关键词）两个属性更为重要【参见网络营销教学网站的专文介绍：description Keywords 】。尽管现在的搜索引擎检索信息的决定搜索结果的排名很少依赖META标签中的内容，但META标签的内容设计仍然是很重要的。  
  
关于META标签中的HTTP-EQUIV  
  
HTML代码实例中有一项内容是  
 
```html
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">  
``` 
其作用是指定了当前文档所使用的字符编码为gb2312，也就是中文简体字符。根据这一行代码，浏览器就可以识别出这个网页应该用中文简体字符显示。类似地，如果 将 “gb2312”替换为“big5”，就是我们熟知的中文繁体字符了。  
  
HTTP-EQUIV用于向浏览器提供一些说明信息，从而可以根据这些说明做出相应。HTTP-EQUIV其实并不仅仅只有说明网页的字符编码这一个作用，常用的HTTP-EQUIV类型还包括：网页到期时间、默认的脚本语言、默认的风格页语言、网页自动刷新时间等。  
  
关于META标签中的"description"  
  
HTML代码实例中有关"description"中的代码为：  
 
```html
<meta name="description" content="网络营销教学网站提供《网络营销基础与实践》教学支持:网络营销课件,网络营销论文,网络营销实验教学,电子商务论文,网络营销与电子商务书籍等">  
```

"description"中的content="网页描述"，是对一个网页概况的介绍，这些信息可能会出现在搜索结果中，因此需要根据网页的实际情况来设计，尽量避免与网页内容不相关的“描述”，另外，最好对每个网页有自己相应的描述（至少是同一个栏目的网页有相应的描述），而不是整个网站都采用同样的描述内容，因为一个网站有多个网页，每个网页的内容肯定是不同的，如果采用同样的description，显然会有一些网页内容没有直接关系，这样不仅不利于搜索引擎对网页的排名，也不利于用户根据搜索结果中的信息来判断是否点击进入网站获取进一步的信息。  
  
关于META标签中的"Keywords"  
  
与META标签中的"description"类似，"Keywords"也是用来描述一个网页的属性，只不过要列出的内容是“关键词”，而不是网页的介绍。这就意味着，要根据网页的主题和内容选择合适的关键词。在选择关键词时，除了要考虑与网页核心内容相关之外，还应该是用户易于通过搜索引擎检索的，过于生僻的词汇不太适合做META标签中的关键词。关于META标签中关键词的设计，要注意不要堆砌过多的关键词，罗列大量关键词对于搜索引擎检索没有太大的意义

  
