---
title: VS Code 更换主题颜色
date: 2021-10-28 14:58:36
tags: [VScode, Theme, HBuilderX]
categories: [IDE, VScode]

---

### 前言

> Microsoft在2015年4月30日Build 开发者大会上正式宣布了 Visual Studio Code 项目：一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。  
> 该编辑器支持多种语言和文件格式的编写：如：F#、HandleBars、Markdown、Python、Java、PHP、Haxe、Ruby、Sass、Rust、PowerShell、Groovy、R、Makefile、HTML、JSON、TypeScript、Batch、Visual Basic、Swift、Less、SQL、XML、Lua、Go、C++、Ini、Razor、Clojure、C#、Objective-C、CSS、JavaScript、Perl、Coffee Script、Dockerfile。

刚开始学前端的时候用的是HBuilder,后来想用VScode发现主题颜色太丑了，试着下载了好几个也是不合心意，于是自己改！对于我这种经常长时间盯电脑的人来讲，当然是改成护眼色了！

1.  首先将主题颜色设置成Atom One Light，打开管理——颜色主题，没有的话下载安装一下。
    ![](https://s2.loli.net/2023/07/02/BZGNVqYHJRfLrsz.png)
    
    ![](https://s2.loli.net/2023/07/02/6UFCzO9HDbkpSRo.png)
    
2.  然后打开设置，在右上角打开json文件，将以下代码全部替换进去，保存。  
    ![](https://s2.loli.net/2023/07/02/L5yzpwU2Q1MB9Cn.png)
    

```
{
    "editor.fontSize": 16,
    "editor.mouseWheelZoom": true,
    "editor.tabSize": 2,
    "workbench.colorCustomizations": {
    	// 写在 Atom One Light  里面则只对该主题有效
        "[Atom One Light]": {
            "editor.background": "#c5f3cb",  
	        "sideBar.background": "#b8e4be",
            "activityBar.background": "#9cce9c", 
            // 终端前景背景色
            "terminal.foreground" : "#141416",
            "terminal.background" : "#a0ecd9",

            "editor.selectionHighlightBorder": "#94767c00",
            "editor.selectionHighlightBackground": "#f3bf708c",
            "editorIndentGuide.activeBackground":"#9ba4af",
            "editorBracketMatch.background": "#ff8a05a9",
            "editorBracketMatch.border": "#ff0000",
            "tab.activeBackground": "#c0d9f070",

            "titleBar.activeBackground": "#839eb870"

        },
        "editorLineNumber.foreground": "#f19012",
    },
    "workbench.statusBar.feedback.visible": false,
    "workbench.colorTheme": "Atom One Light",
    "workbench.startupEditor": "newUntitledFile",
}

```

3.  效果如下图所示：  
    ![](https://s2.loli.net/2023/07/02/A6kYgSKW841ZBRN.png)

    ![](https://s2.loli.net/2023/07/02/Co1nyPhf75eQl4j.png)

更多软件背景颜色设置：  
- [网红护眼色——豆沙绿](https://blog.csdn.net/weixin_42826790/article/details/111239268)  
- [Notepad++更改背景颜色（护眼色）](https://blog.csdn.net/weixin_42826790/article/details/110727597)

 