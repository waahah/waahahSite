---
title: IDEA JSP 无法自动提示代码问题完整版
date: 2021-10-20 14:58:36
tags: [IDEA, Java, Jsp]
categories: [Coding, Java]

---

### 前言


首部说明，博主IDEA `JSP`代码始终没有提示，网上遍寻各种答案，尝试过之后全都无果。

一次偶然的机会发现了解决的办法，现在分享给大家，希望和我一样，无论怎么尝试都没法解决`jsp`没法提示代码的人

可以远离烦恼~~~

不过为了解决大多数人问题，还是决定从头码起，前部步骤引用[tangxl2008008](https://my.csdn.net/tangxl2008008)发布的文章

1.首先取消省电模式

取消“Power SaveMode”；File –> Power Save Mode，取消勾选：

这也是可能造成无法代码提示的一个原因。

![](https://s2.loli.net/2023/07/02/K8JUk9IHQzYfWNw.png)

2.有一丝丝小可能没有下插件，不过大多数情况下，配置的时候都已经下了，所以大部分问题不出在这，不过

防止特殊情况的朋友，也在此码下吧~

`setting-->Plugins-->jsp`插件，打钩确认后即可（）

![](https://s2.loli.net/2023/07/02/elqaNSx9h2cuHIA.png)

3.项目结构添加依赖

`File -> Project Structure`，打开项目设置页面；选择到“`Dependencies`”便签 -> 点击“+”-> 2Librarys：

![](https://s2.loli.net/2023/07/02/R26PJGhyHUwqcj5.png)

在`Choose Libraries`页面，选择“`Tomcat`”:

![](https://s2.loli.net/2023/07/02/yT4eh2m9jcYizRo.png)

将Tomcat的Scope设置为Provinced，然后保存设置：

4.保存成功后，回到jsp页面

若依旧无法解决，那么在码jsp代码的时候不要着急闭合标签，输入`<%`之后在后面打代码会有各种提示

![](https://s2.loli.net/2023/07/02/9LA6HYr2FNIMPTg.png)

如果还是没能解决的在此留言，一定会看~~很乐意帮助解决~O(∩\_∩)O~
