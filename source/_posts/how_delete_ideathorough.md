---
title: 如何卸载干净 IDEA（图文讲解）
date: 2023-06-20 14:58:36
tags: [Java, IDEA, IntelliJ]
categories: [Coding, Java]
---

如何卸载干净 IDEA（图文讲解）
=================

很多小伙伴会问 Windows / Mac 系统上要怎么彻底卸载 IDEA 呢？ 本文通过图片+文字，详细讲解具体步骤：

Windows
-------

Windows 系统要想彻底卸载 IDEA, 步骤如下：

### 1、卸载 IDEA 程序

点击屏幕左下角 **Windows 图标** -> **设置**：

![166540010490748.png](https://s2.loli.net/2023/07/14/a5OWlerC4DHLdUT.jpg)

点击**应用**：

![166540028794955.png](https://s2.loli.net/2023/07/14/975twqVYgXo4lcp.jpg)

在应用中找到 IDEA, 单击它会出现卸载按钮，点击开始卸载：

![166540044052592.png](https://s2.loli.net/2023/07/14/UxnMhwbjazlADgE.jpg)

勾选第一栏 `Delete IntelliJ IDEA 2022.2 caches and local history`，表示同时删除 IDEA 本地缓存以及历史：

![166540068310382.png](https://s2.loli.net/2023/07/14/Ok9q1ISVYbznsAy.jpg)

> `Delete IntellJ IDEA 2022.2 settings and installed plugins` : 删除 IDEA 相关设置，如字体大小、主题等等，以及删除已安装的插件。
> 
> **此选项可不用勾选。**

### 2、注册表清理

每个程序安装后，在注册表中都会留下相关信息。如何清理呢？

按住快捷键 `windos + R`, 然后输入 `regedit` 回车调出注册表。

依次点击菜单 `计算机\HKEY_CURRENT_USER\SOFTWARE\JavaSoft\Prefs\jetbrains`， 然后右键删除。

![166540143012239.png](https://s2.loli.net/2023/07/14/dJ52jZoKGUEYCBA.jpg)

### 3、残留清理

最后，还有几个地方的缓存数据需要删除：

```cmd
C:\用户\${用户名称}\IdeaProjects\
# 如果你想删除 IDEA 相关，则只需要删除 JetBrains 目录下包含 IDEA 的文件夹即可
C:\用户\${用户名称}\AppData\Roaming\JetBrains
# 如果你想删除 IDEA 相关，则只需要删除 JetBrains 目录下包含 IDEA 的文件夹即可
C:\用户\${用户名称}\AppData\Local\JetBrains
C:\用户\公用\.jetbrains
# 如果你想删除 IDEA 相关，则只需要删除 JetBrains 目录下包含 IDEA 的文件夹即可
C:\Program Files\JetBrains
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\JetBrains\

```

Mac
---

Mac 系统要想彻底卸载 IDEA, 步骤如下：

### 1、卸载 IDEA 程序

打开【访达】-> 【应用程序】, 找到 IDEA 右键【移到废纸篓】：

![166520901678412.jpg](https://s2.loli.net/2023/07/14/rs5G428dbxlypEJ.jpg)

### 2、残留清理

打开终端，执行如下命令，进入 _Library_ 目录下，准备删除 IDEA 的残留信息：

```bash
cd /Users/XXX/Library

```

> 注意：路径中的 _XXX_ 为用户名，**替换成你实际的用户名，再执行**即可。

#### 新老版本残留所在的目录不一样

建议先 `cd` 进去看下文件夹命名规则，再删除。

##### 较新版本

执行如下删除命令：

```bash
rm -rf Preferences/JetBrains/IntelliJIdea*
rm -rf Caches/JetBrains/IntelliJIdea*
rm -rf Application\ Support/JetBrains/IntelliJIdea*
rm -rf Logs/JetBrains/IntelliJIdea*

```

> TIP: `*` 表示版本号。

##### 老版本

执行如下删除命令：

```shell
rm -rf Preferences/IntelliJIdea*
rm -rf Caches/IntelliJIdea*
rm -rf Application\ Support/IntelliJIdea*
rm -rf Logs/IntelliJIdea*

```
