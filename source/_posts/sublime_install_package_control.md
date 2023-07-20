---
title: Sublime安装Package control组件
date: 2021-08-14 14:58:36
tags: [IDE, Sublime Text]
categories: [IDE, Sublime Text]
---

### 前言
本篇文章主要给大家介绍**Sublime安装Package control组件**的方法。

**Package Control**是 Sublime Text包管理器。它包含可供安装的2,500多个软件包的列表，用户可以自己添加任何`GitHub` 或`BitBucket`存储库。简单的说，也就是sublime只有安装了`Package control`组件，后期才能安装各种不同的插件。

**Sublime安装Package control组件有两种方法：**

###  **第一种方法：**

#### 1.  打开sublime界面，按**Ctrl+shift+P**组合键，然后可调出以下界面：

![](https://s2.loli.net/2023/06/12/KvaEkU1sqBCM8Nf.png)

#### 2. 搜索选择第二个选项install package control，然后直接点击。

#### 3.  安装好后就会有如下提示信息，点击确定即可。

![](https://s2.loli.net/2023/06/12/eKaqSrotXcGVLyT.png)

#### 4.  最后看到以下组件显示就表示安装组件成功了。

![](https://s2.loli.net/2023/06/12/n1A7j4yX9VzRGUH.png)

### **第二种方法：**

#### 1.  打开sublime界面，按 **Ctrl+\`** (此符号为tab按键上面的按键)组合键，即可调出命令行。

#### 2.  然后粘贴以下代码到命令行并回车：

<table border="0" cellpadding="0" cellspacing="0" class="syntaxhighlighter  php"><tbody><tr><td class="gutter"><p class="line number1 index0 alt2">1</p></td><td class="code"><div class="container"><p class="line number1 index0 alt2"><code class="php plain">import urllib.request,os; pf = </code><code class="php string">'Package Control.sublime-package'</code><code class="php plain">; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), </code><code class="php string">'wb'</code><code class="php plain">).write(urllib.request.urlopen( </code><code class="php string">'http://sublime.wbond.net/'</code> <code class="php plain">+ pf.replace(</code><code class="php string">' '</code><code class="php plain">,</code><code class="php string">'%20'</code><code class="php plain">)).read())</code></p></div></td></tr></tbody></table>

![](https://s2.loli.net/2023/06/12/SmuZCtqk31BDfzg.png)

#### 3.  然后耐心等待安装。

![](https://s2.loli.net/2023/06/12/j8u3OqW4saEHfb2.png)

#### 4.  同样，我们查看到以下选项则表示Package control组件安装成功。

![](https://s2.loli.net/2023/06/12/nymtcwJxqeaCljA.png)

### 总结
本篇文章就是关于**sublime安装Package control组件**的两种方法介绍，大家可以根据自身需求选择哪种方法安装，当前无论哪种安装都很简单的，希望本文对需要的朋友有所帮助！
