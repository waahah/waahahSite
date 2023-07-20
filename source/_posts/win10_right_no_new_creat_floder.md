---
title: Win10右键新建中没有新建文件夹,电脑右键新建文件夹不见了
date: 2022-10-22 14:58:36
tags: [Windows,Floder, Bug]
categories: [Windows]
---

### 前言
Win10右键新建中没有新建文件夹,电脑右键新建文件夹不见了

### 文章目录

*   [情况一： 右键 - 新建 消失](#)
*   [情况二： 右键 - 新建 - 文件夹 消失](#)
*   *   [情况描述:](#)
    *   [解决方式一(推荐)](#)
    *   [解决方式二](#)
    *   [解决方式三](#)
*   [相关文件](#)

情况一： 右键 - 新建 消失
==============================================================================

![12848512-d3b54ec012a6b8c6.webp](https://s2.loli.net/2023/07/09/G5dZQf1TyMEYjts.webp) 
查到大部分教程是针对这一个消失的修复方式，具体方式是：  
Win + R输入 regedit，打开注册表编辑器  
![12848512-2cc5e7fc50de32dd.webp](https://s2.loli.net/2023/07/09/eQfncApUDdx4SCV.webp)

定位到路径：计算机\\HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Classes\\Directory\\Background\\shellex\\ContextMenuHandlers\\New  
检测默认值是否为：{D969A300-E7FF-11d0-A93B-00A0C90F2719}  
![12848512-6f27b3b25c2c30f0.webp](https://s2.loli.net/2023/07/09/klabn8pYgtdOe6K.webp)

下面为批处理：  
新建 - 文本文档 或者 Ctrl + R 输入 notepad 
![12848512-6f5cc6f6f5f8cfd6.webp](https://s2.loli.net/2023/07/09/HrfZOIXWKumBFvY.webp)

复制下方内容粘贴，保存 xxx.bat，管理员运行即可

```bat
@echo off
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\Background\shellex\ContextMenuHandlers\New" /ve /d "{D969A300-E7FF-11d0-A93B-00A0C90F2719}" /f

```

情况二： 右键 - 新建 - 文件夹 消失
====================================================================================

情况描述:
--------------------------------------------------------------------

win10，右键新建-里新建文件夹选项消失。资源管理器的功能区的新建文件夹点了没有反应  
**网上找了很多,除了 重装系统外 目前只发现下面这下面三种方式有用,其他方法不建议尝试**  
[可以看看我提交给microsoft的](https://answers.microsoft.com/zh-hans/windows/forum/windows_10-files/win10%E5%8F%B3%E9%94%AE%E6%96%B0%E5%BB%BA%E4%B8%AD/f5a7522a-7cbe-49e9-8916-76649530ffa7)  

![](https://s2.loli.net/2023/07/09/MEFLbP5Jmvfph2T.png)

![](https://s2.loli.net/2023/07/09/17aIwFRdHgG4Wtx.webp)

解决方式一(推荐)
------------------------------------------------------------------------

Ctrl + R输入 regedit，打开注册表编辑器  

![12848512-2cc5e7fc50de32dd.webp](https://s2.loli.net/2023/07/09/eQfncApUDdx4SCV.webp)
定位到路径：计算机\\HKEY\_CURRENT\_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Discardable\\PostSetup\\ShellNew  
![](https://s2.loli.net/2023/07/09/Z9owWarUAizcMJD.webp)

双击Classes，一开始出问题是**Folder**消失了  
![](https://s2.loli.net/2023/07/09/iDKsGbxc4oRBjEl.webp)
新建 - 文本文档 或者 Ctrl + R 输入 notepad  
![12848512-6f5cc6f6f5f8cfd6.webp](https://s2.loli.net/2023/07/09/HrfZOIXWKumBFvY.webp)

复制下方内容粘贴，保存 xxx.reg，管理员运行即可

```ini
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Folder]
"ContentViewModeLayoutPatternForBrowse"="delta"
"ContentViewModeForBrowse"="prop:~System.ItemNameDisplay;~System.LayoutPattern.PlaceHolder;~System.LayoutPattern.PlaceHolder;~System.LayoutPattern.PlaceHolder;System.DateModified"
"ContentViewModeLayoutPatternForSearch"="alpha"
"ContentViewModeForSearch"="prop:~System.ItemNameDisplay;System.DateModified;~System.ItemFolderPathDisplay"
@="Folder"
"EditFlags"=hex:d2,03,00,00
"FullDetails"="prop:System.PropGroup.Description;System.ItemNameDisplay;System.ItemTypeText;System.Size"
"NoRecentDocs"=""
"ThumbnailCutoff"=dword:00000000
"TileInfo"="prop:System.Title;System.ItemTypeText"

[HKEY_CLASSES_ROOT\Folder\DefaultIcon]
@=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,00,25,\
00,5c,00,53,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,73,00,68,00,\
65,00,6c,00,6c,00,33,00,32,00,2e,00,64,00,6c,00,6c,00,2c,00,33,00,00,00

[HKEY_CLASSES_ROOT\Folder\shell]

[HKEY_CLASSES_ROOT\Folder\shell\explore]
"MultiSelectModel"="Document"
"ProgrammaticAccessOnly"=""
"LaunchExplorerFlags"=dword:00000018

[HKEY_CLASSES_ROOT\Folder\shell\explore\command]
"DelegateExecute"="{11dbb47c-a525-400b-9e80-a54615a090c0}"

[HKEY_CLASSES_ROOT\Folder\shell\open]
"MultiSelectModel"="Document"

[HKEY_CLASSES_ROOT\Folder\shell\open\command]
"DelegateExecute"="{11dbb47c-a525-400b-9e80-a54615a090c0}"
@=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,00,25,\
00,5c,00,45,00,78,00,70,00,6c,00,6f,00,72,00,65,00,72,00,2e,00,65,00,78,00,\
65,00,00,00

[HKEY_CLASSES_ROOT\Folder\shell\opennewprocess]
"MUIVerb"="@shell32.dll,-8518"
"MultiSelectModel"="Document"
"Extended"=""
"LaunchExplorerFlags"=dword:00000003
"ExplorerHost"="{ceff45ee-c862-41de-aee2-a022c81eda92}"

[HKEY_CLASSES_ROOT\Folder\shell\opennewprocess\command]
"DelegateExecute"="{11dbb47c-a525-400b-9e80-a54615a090c0}"

[HKEY_CLASSES_ROOT\Folder\shell\opennewwindow]
"MUIVerb"="@shell32.dll,-8517"
"MultiSelectModel"="Document"
"OnlyInBrowserWindow"=""
"LaunchExplorerFlags"=dword:00000001

[HKEY_CLASSES_ROOT\Folder\shell\opennewwindow\command]
"DelegateExecute"="{11dbb47c-a525-400b-9e80-a54615a090c0}"

[HKEY_CLASSES_ROOT\Folder\ShellEx]

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers]

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\BriefcaseMenu]
@="{85BBD920-42A0-1069-A2E4-08002B30309D}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\FileMenuTools]
@="{C1B2C38F-3DCA-4E3D-BC34-D5B87B636543}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\HaoZip]
@="{5FED836A-C96C-4d88-A91E-F63F07726585}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\Library Location]
@="{3dad6c5d-2167-4cae-9914-f99e41c12cfa}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\Offline Files]
@="{474C98EE-CF3D-41f5-80E3-4AAB0AB04301}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\TeraCopy]
@="{A8005AF0-D6E8-48AF-8DFA-023B1CF660A7}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers\UnlockerShellExtension]
@="{DDE4BEEB-DDE6-48fd-8EB5-035C09923F83}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\DragDropHandlers]

[HKEY_CLASSES_ROOT\Folder\ShellEx\DragDropHandlers\HaoZip]
@="{5FED836A-C96C-4d88-A91E-F63F07726585}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\DragDropHandlers\TeraCopy]
@="{A7005AF0-D6E8-48AF-8DFA-023B1CF660A7}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\DragDropHandlers\{BD472F60-27FA-11cf-B8B4-444553540000}]
@=""

[HKEY_CLASSES_ROOT\Folder\ShellEx\PropertySheetHandlers]

[HKEY_CLASSES_ROOT\Folder\ShellEx\PropertySheetHandlers\BriefcasePage]
@="{85BBD920-42A0-1069-A2E4-08002B30309D}"

[HKEY_CLASSES_ROOT\Folder\ShellEx\PropertySheetHandlers\Offline Files]
@="{7EFA68C6-086B-43e1-A2D2-55A113531240}"

[HKEY_CLASSES_ROOT\Folder\ShellNew]
"Directory"=""
"IconPath"=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,\
74,00,25,00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,73,\
00,68,00,65,00,6c,00,6c,00,33,00,32,00,2e,00,64,00,6c,00,6c,00,2c,00,33,00,\
00,00
"ItemName"="@shell32.dll,-30396"
"MenuText"="@shell32.dll,-30317"
"NonLFNFileSpec"="@shell32.dll,-30319"

[HKEY_CLASSES_ROOT\Folder\ShellNew\Config]
"AllDrives"=""
"IsFolder"=""
"NoExtension"=""

```

另外还有一段批处理，试过没什么反应，也贴一下吧  
倒数第二行HKEY\_USERS\\这里可以看看具体自己的是什么\\Software，我的是按照这一个输入的：  
![](https://s2.loli.net/2023/07/09/laRIxeM4K2jAyud.webp)

```bat
@ECHO off
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew /v Directory /t reg_sz /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew /v IconPath /t reg_expand_sz /d "%%SystemRoot%%\system32\shell32.dll,3" /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew /v ItemName /t reg_sz /d "@shell32.dll,-30396" /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew /v MenuText /t reg_sz /d "@shell32.dll,-30317" /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew /v NonLFNFileSpec /t reg_sz /d "@shell32.dll,-30319" /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew\Config /v AllDrives /t reg_sz /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew\Config /v IsFolder /t reg_sz /f

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\ShellNew\Config /v NoExtension /t reg_sz /f

reg add HKEY_USERS\S-1-5-21-4274812398-882285575-643737553-1001\Software\Microsoft\Windows\CurrentVersion\Explorer\Discardable\PostSetup\ShellNew /v Classes /t reg_multi_sz /d ".rtf .txt Folder" /f

pause

```

以上内容是查了很久找到的，[参考网址](https://www.jianshu.com/p/9eb3ae6ab171)  
修复的童鞋点个赞吧！

解决方式二
--------------------------------------------------------------------

下载Bandizip，压缩软件自带  
![](https://s2.loli.net/2023/07/09/BHjsQptl8RrFmOe.png)

![](https://s2.loli.net/2023/07/09/EuoibCnms1RDf59.png)

![](https://s2.loli.net/2023/07/09/YOrRo1vMSamCzxA.png)

解决方式三
--------------------------------------------------------------------

**创建新账号使用，并给予管理员权限  
经过我尝试，此法确实能解决，但相关应用程序，需要重新安装或重装设置，你的本地文件并不会丢失，**  
**如果你的应用程序不多的话，或者比较好安装的话可以试试。但比较麻烦**

> [修复 Windows 中损坏的用户配置文件](https://support.microsoft.com/zh-cn/windows/%E4%BF%AE%E5%A4%8D-windows-%E4%B8%AD%E6%8D%9F%E5%9D%8F%E7%9A%84%E7%94%A8%E6%88%B7%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-1cf41c18-7ce3-12f9-8e1d-95896661c5c9)  
> ![](https://s2.loli.net/2023/07/09/YzjHprLXqgUiyFm.png)

**如果你还是不能解决,只有重装系统，或重置系统了**

相关文件
===================================================================

蓝奏云:  
- [解决右键新建问题](https://wwa.lanzoui.com/i44x2v3ffze)  
- [Windows鼠标右键管理工具](https://wwa.lanzoui.com/iQuiYv1e8ed)  
- [Bandizip](https://wwa.lanzoui.com/iJM2ov1e8mb)

其他地址:  
- <https://download.csdn.net/download/qq\_42324086/29083761>
- <https://www.jianshu.com/p/9eb3ae6ab171>
