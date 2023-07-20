---
title: 在HTML页面中引用Markdown编辑器（Editor.md）
date: 2023-07-18 14:58:36
tags: [JavaScript, Markdown. Html]
categories: [Coding, JavaScript]
---

在HTML页面中引用Markdown编辑器（Editor.md）
================================

**简介：** 在HTML页面中引用Markdown编辑器（Editor.md）

最近写博客项目，用到了Markdown编辑器，这里介绍一款国内好用的Markdown编辑器：Editor.md，下面介绍一下该编辑器以及如果在页面中引用。

### 1、下载Ediotor.md

官网：[Editor.md - 开源在线 Markdown 编辑器](https://pandao.github.io/editor.md/)

>  这个编辑器是国内开源的，一些文档也是用中文写的，方便大家阅读

![97389b98fb414996b651e3dc633a8681.png](https://s2.loli.net/2023/07/16/5ot4EHf7sxILuke.png)

点击下载安装，页面会下滑，点击Github下载会得到一个压缩包。

![978f80f57a7147c3a4327dbe4a1d30f5.png](https://s2.loli.net/2023/07/16/NW8Bynpi2skbUfA.png)

> 如果大家闲麻烦，这里我放在百度云中，大家自行下载：
> 
> 链接：[https://pan.baidu.com/s/15dsdsEQn3Z5Ur0N8Lg8-cQ](https://pan.baidu.com/s/15dsdsEQn3Z5Ur0N8Lg8-cQ) 
> 
> 提取码：5a7l

###  2、引入Ediotor.md

把上面下载的Editor.md代码解压缩，这里解压缩后的名字我改为 editor.md，然后与我们想要放的html文件同级。

![53c40ec92f3944e7934fdfba665551c5.png](https://s2.loli.net/2023/07/16/6t41feuoVRTpDsS.png)

下一步，在html中引入下面几行代码

```html
<link rel="stylesheet" href="editor.md/css/editormd.min.css">
    <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>    <script src="editor.md/lib/marked.min.js"></script>    <script src="editor.md/lib/prettify.min.js"></script>    <script src="editor.md/editormd.js"></script>
```

注意：文件名和路径一定要与代码中的一一对应，要不然会引入失败！！！

### 3、确定Ediotor.md在哪里显示

我们先创建一个div标签，用来显示Ediotor.md，id设为editor

![image](https://ucc.alicdn.com/images/user-upload-01/d35f084e2d934a07a6444fe4937992e3.png "image")

 然后在代码中，添加下面代码

```html
<script>
        var editor = editormd("editor", {
            // 这里的尺寸必须在这里设置，设置样式会被 editormd 自动覆盖
            width: "100%",
            // 设置高度
            height: "500px",
            // 编辑器中初始内容
            markdown: "# 在这里写下一篇博客",
            // 指定插件路径
            path: "editor.md/lib/"
        });
    </script>
```

代码中 editor 与 div标签id属性对应

添加完之后，Ediotor.md就引入成功啦

![d35f084e2d934a07a6444fe4937992e3.png](https://s2.loli.net/2023/07/16/FuixvnV6YfTRlUZ.png)

> 拓展：如果想给编译器添加一些样式，可以添加到div中，如果要设置透明，可以使用opacity这个属性。

![7c05e973cb1341bf80be2b127e5ffbd1.png](https://s2.loli.net/2023/07/16/K4eczN8TnauYZyh.png)

