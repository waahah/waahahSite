---
title: Markdown_图片并排的方案
date: 2023-06-13 14:58:36
tags: [Markdown, Image]
categories: [Markdown]
---

markdown_图片并排的方案
=================

html方案
------

*   效果不够理想/不够稳定
*   依赖于html属性调制
*   多个`<img>`间不要使用的换行

```
<img src\="https://raw.githubusercontent.com/xuchaoxin1375/pictures/main/imagesimage-20220611203203763.png"   width\="280"/><img src\="https://raw.githubusercontent.com/xuchaoxin1375/pictures/main/imagesimage-20220611203203763.png"  width\="200" />
```

* * *

![14140105_62a82421eb24e22406.webp](https://s2.loli.net/2023/07/14/f8g3XsnYd6GPxkc.webp)
![14140105_62a82421eb24e22406.webp](https://s2.loli.net/2023/07/14/f8g3XsnYd6GPxkc.webp)

table 方案(较为通用)
--------------

> 注意,使用表格方案的时候,不要又多余的换行!

*   演示源代码

```
| p1(optional) | p2(optional |  
|--|--|  
| !\[p1\](https://s4.51cto.com/images/blog/202206/14140105\_62a82421eb24e22406.png?x-oss-process\=image/watermark,size\_16,text\_QDUxQ1RP5Y2a5a6i,color\_FFFFFF,t\_100,g\_se,x\_10,y\_10,shadow\_90,type\_ZmFuZ3poZW5naGVpdGk\=) | !\[p2\](https://s4.51cto.com/images/blog/202206/14140105\_62a82421eb24e22406.png?x-oss-process\=image/watermark,size\_16,text\_QDUxQ1RP5Y2a5a6i,color\_FFFFFF,t\_100,g\_se,x\_10,y\_10,shadow\_90,type\_ZmFuZ3poZW5naGVpdGk\=) |
```

### 效果(by table)

<table class="data-table" data-transient-attributes="class" style="width: 100%; outline: none; border-collapse: collapse;" data-width="872px"><colgroup><col span="1" width="436"><col span="1" width="436"></colgroup><tbody><tr style="height: 30px;"><td data-transient-attributes="table-cell-selection" style="min-width: auto; overflow-wrap: break-word; margin: 4px 8px; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default; vertical-align: top;"><p>p1(optional)<br></p></td><td data-transient-attributes="table-cell-selection" class="table-last-row" style="min-width: auto; overflow-wrap: break-word; margin: 4px 8px; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default; vertical-align: top;"><p>p2(optional<br></p></td></tr><tr style="height: 30px;"><td data-transient-attributes="table-cell-selection" class="table-last-column" style="min-width: auto; overflow-wrap: break-word; margin: 4px 8px; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default; vertical-align: top;"><p><img src="https://s2.loli.net/2023/07/14/f8g3XsnYd6GPxkc.webp" alt="markdown_图片并排的方案_github_03" title="在这里插入图片描述" style="width: 465px; visibility: visible; height: 188px;"></p></td><td data-transient-attributes="table-cell-selection" class="table-last-column table-last-row" style="min-width: auto; overflow-wrap: break-word; margin: 4px 8px; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default; vertical-align: top;"><p><img src="https://s2.loli.net/2023/07/14/f8g3XsnYd6GPxkc.webp" alt="markdown_图片并排的方案_github_03" title="在这里插入图片描述" style="width: 465px; visibility: visible; height: 188px;"></p></td></tr></tbody></table>

typora编辑器的渲染
------------

![14140106_62a82422452a714650.webp](https://s2.loli.net/2023/07/14/PCWYeBd8T3VlEHw.webp)

*   typora下设置的演示源码

> 主要利用html属性来设置

  

```
<img src\="https://raw.githubusercontent.com/xuchaoxin1375/pictures/main/imagesimage-20220611203213594.png" alt\="image-20220611203213594" style\="zoom: 80%;" /><img src\="https://raw.githubusercontent.com/xuchaoxin1375/pictures/main/imagesimage-20220611203236335.png" alt\="image-20220611203236335" style\="zoom:80%;" />!\[image-20220611203203763\](https://raw.githubusercontent.com/xuchaoxin1375/pictures/main/imagesimage-20220611203203763.png)
```

![14140106_62a824225ef3661092.webp](https://s2.loli.net/2023/07/14/OSZ6LYT53RI89Mx.webp)