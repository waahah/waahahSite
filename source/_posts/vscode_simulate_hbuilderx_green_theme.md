---
title: VS Code 编辑器仿HBuilderX绿柔主题
date: 2021-10-26 14:58:36
tags: [VScode, Theme, HBuilderX]
categories: [IDE, VScode]

---

### 前言

vscode自带暗黑炫酷是挺好看的，但是看久了眼睛会疲劳，这里模仿`HBuilderX`的绿柔主题做的这个vs code主题，代码如下。

先看最终效果图
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

![](https://s2.loli.net/2023/07/02/3p8FnJPlzUYu5HR.jpg)

### 设置方法

*   **windows：** Ctrl + Shift + P
*   **macOS：** Command + Shift + P
*   选择`Open Settings`（JSON）然后将代码复制进去

### 代码块


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
    // "workbench.colorTheme": "Visual Studio Light",
    "workbench.colorTheme": "Default Light+",
    //代码注释部分颜色
     "editor.tokenColorCustomizations": {
            "comments": "#95a3ab"
        },
    "workbench.colorCustomizations": {
        "editorGroupHeader.tabsBackground": "#FFFAE8", // 标题栏未使用的地方
        "editorLineNumber.foreground": "#9F9371", //代码行号颜色        
        "editor.lineHighlightBackground": "#E8DFC4", //代码选中高亮颜色
        "editor.selectionBackground": "#BCD68D",
        "editor.background": "#FFFAE8",
        "editorIndentGuide.background": "#cecdc2", //代码对齐线颜色
        //标题栏颜色设置
        "titleBar.activeBackground": "#fffef9",
        "titleBar.inactiveBackground": "#fffef9", //失去焦点时titlebar颜色
        //活动栏颜色
        //"activityBar.background": "#FFFAE8",          //设置这个颜色图标显示不清楚
        "activityBar.background": "#539c5f",          //最左边的活动栏背景颜色
        "activityBar.activeBorder": "#41A863",       //好像没有什么用
        //选项卡颜色设置       
        "tab.activeModifiedBorder": "#41A863",
        "tab.hoverBackground": "#daeace",
        "tab.border": "#fffae8",
        "tab.activeBackground": "#41A863",
        "tab.activeForeground": "#ffffff",
        "tab.inactiveBackground": "#fffae8",
        "tab.inactiveForeground": "#41A863",
        //侧边栏颜色设置
        "sideBarSectionHeader.background": "#FFFAE8",
        "sideBar.background": "#FFFAE8",
        "sideBarSectionHeader.foreground": "#AB7E05",
        "sideBar.border": "#d8ca9e",
        "sideBar.foreground": "#46433c",
        "sideBarTitle.foreground": "#46433c",
        //底部状态栏颜色设置
        "statusBar.background": "#fffdf4",
        //滚动条颜色
        "scrollbarSlider.background": "#cfb56a",
        "scrollbarSlider.hoverBackground": "#cfb56a",
        "scrollbarSlider.activeBackground": "#cfb56a",
        //终端窗口面板颜色设置
        "panel.background": "#fffcf3",
        "panel.border": "#d8ca9e",
        //弹出小窗口：选项设置提示窗口，源代码补全窗口
        "editorWidget.background": "#BCD68D", // 弹出小窗口的背景
        "editorSuggestWidget.selectedBackground": "#e8dfc4", //代码提示选中行高亮
        "list.hoverBackground": "#e8dfc4", // 鼠标所在行的颜色
        "editorWidget.border": "#BCD68D", // 弹出小窗口的边框
        "list.activeSelectionBackground": "#41A863", //侧边栏选中高亮
        "list.inactiveSelectionBackground": "#d8ca9e" //侧边栏选中未获得焦点颜色
       
    
    },
    "editor.fontSize": 18,
    "files.autoSave":"afterDelay",   
    "editor.wordWrap":"on",
    
}

```

### SmartyPants

`editor.rangeHighlightBackground` 突出显示范围的背景颜色，例如 “`Quick Open`” 和“查找”功能

SmartyPants将ASCII标点字符转换为“智能”印刷标点HTML实体。例如：

| 图示 | 参数名 | 作用 |
| --- | --- | --- |
| 1 | activityBar.foreground | 活动栏前景色(例如用于图标) |
| 2 | activityBar.background | 活动栏背景色 |
| 3 | sideBarSectionHeader.background | 侧边栏节标题的背景颜色 |
| 4 | sideBar.foreground | 侧边栏前景色 |
| 5 | sideBar.background | 侧边栏背景色 |
| 6 | tab.inactiveForeground | 活动组中非活动选项卡的前景色 |
| 7 | tab.inactiveBackground | 非活动选项卡的背景色 |
| 8 | tab.activeForeground | 活动组中活动选项卡的前景色 |
| 9 | tab.activeBackground | 活动选项卡的背景色 |
| 10 | editorLineNumber.foreground | 编辑器行号颜色 |
| 11 | editorGutter.background | 编辑器导航线的背景色，导航线包括边缘符号和行号 |
| 12 | editor.background | 编辑器背景颜色 |
| 13 | editor.foreground | 编辑器默认前景色 |
| 14 | editorCursor.foreground | 编辑器光标颜色 |
| 15 | editor.lineHighlightBackground | 光标所在行高亮文本的背景颜色 |
| 16 | editorBracketMatch.background | 匹配括号的背景色 |
| 17 | statusBar.background | 标准状态栏背景色 |
| 17 | statusBar.noFolderBackground | 没有打开文件夹时状态栏的背景色 |
| 17 | statusBar.debuggingBackground | 调试程序时状态栏的背景色 |
|  | editor.findMatchBackground | 当前搜索匹配项的颜色 |
|  | editor.findMatchHighlightBackground | 其他搜索匹配项的颜色 |
|  | editor.selectionBackground | 编辑器所选内容的颜色 |
|  | editor.selectionHighlightBackground | 与所选内容具有相同内容的区域颜色 |
|  | editor.rangeHighlightBackground | 突出显示范围的背景颜色，例如 “Quick Open” 和“查找”功能 |

![](https://s2.loli.net/2023/07/02/5C1vyoj9DYIzUit.png)

大家可以根据以上参数代码自定义颜色。

 
