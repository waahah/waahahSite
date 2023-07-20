---
title: vscode的颜色设置，开启护眼模式
date: 2021-10-24 14:58:36
tags: [VScode, Theme, Color]
categories: [IDE, VScode]

---

### 前言

vscode的颜色设置，开启护眼模式

打开settings.json
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

代码如下

```
{
    "window.zoomLevel": 1, //窗口.缩放级别
    "editor.tabSize": 2, //工作台主题颜色
    "typescript.updateImportsOnFileMove.enabled": "always",
    "editor.formatOnSave": true, // 保存时格式化
    "breadcrumbs.enabled": false, // 开启 vscode 文件路径导航
    // "tslint.autoFixOnSave": true, // #每次保存的时候将代码按tslint格式进行修复
    "eslint.autoFixOnSave": true, // #每次保存的时候将代码按eslint格式进行修复
    // "prettier.semi": false,//prettier 设置语句末尾不加分号
    "prettier.singleQuote": true, // prettier 设置强制单引号
    "vetur.format.defaultFormatter.js": "vscode-typescript", // #让vue中的js按编辑器自带的ts格式进行格式化 
    "window.enableMenuBarMnemonics": false,
    "liveServer.settings.donotShowInfoMsg": true,
    // "workbench.colorTheme": "Winter is Coming (Light)", //窗口.不启用菜单栏输入法,修改主题配色
    "workbench.colorTheme": "Default Light+",
    "workbench.colorCustomizations": { // 颜色设置
        // "foreground": "#75a478",
        "editor.background": "#C7EDCC",
        // "editor.background": "#c1d8ac",
        "sideBar.background": "#FAF9DE",
        "terminal.background": "#EAEAEF"
    }
}

```

![](https://s2.loli.net/2023/07/02/tzhaUfYRuF9T1o6.png)

看看这配色，真美，我可是专门咨询过公司的设计，O(∩\_∩)O哈哈~

 
