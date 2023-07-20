---
title: Charles抓包工具在Windows系统中闪退无法打开的问题修复
date: 2022-03-20 14:58:36
tags: [Charles, Web]
categories: [Coding, Python]
---

### Charles突然无法打开

也许你正经历和我一样的情况，Charles抓包工具之前装得好好的，突然打不开了；或者你重新安装了Charles但故障依旧；甚至你从来没装过，但装完就是打不开。体现的症状就是双击后没反应。那么下面的内容可能对你有所帮助。

### 排查问题

既然双击无法打开，那么在命令行里我们看下能不能打开。在cmd中进入安装目录，然后执行：

```cmd
C:\Users\chaijunkun>cd "c:\Program Files\Charles"
C:\Program Files\Charles>Charles.exe

```

然后提示如下错误：

```powershell
C:\Program Files\Charles>java.awt.AWTError: Assistive Technology not found: com.sun.java.accessibility.AccessBridge
        at java.desktop/java.awt.Toolkit.newAWTError(Unknown Source)
        at java.desktop/java.awt.Toolkit.fallbackToLoadClassForAT(Unknown Source)
        at java.base/java.util.stream.ForEachOps$ForEachOp$OfRef.accept(Unknown Source)
……
Caused by: java.lang.ClassNotFoundException: com.sun.java.accessibility.AccessBridge
……

```

看来是没有找到一个叫AccessBridge的东西。但是作为一个成熟的商业产品，没有理由不考虑用户安装环境，缺少这么个组件啊。如果你是专业的开发人员，可能也不会随便动这个组件。

### 寻找解决办法

在Stack Overflow上，找到了相关的说明。Java Access Bridge这样一个基于Java的辅助功能桥接库是随着JRE安装的。但是作为开发人员，可能只装了JDK，在默认配置文件JDK\_HOME/jre/lib/accessibility.properties中会有其具体配置。另外对于Windows用户而言，同样的配置还会出现在用户目录下：

```cmd
C:\Users\current_user\.accessibility.properties

```

但其实大多数情况下，我们并不需要配置它。**只需要把这个文件删除，或者把每一行注释掉（以#号开头）就好了**。

### 更多

- [Charles破解工具](https://tools.zzzmode.com/mytools/charles/)

参考文献：  
\[1\]JayDi,Perception.Assistive Technology not found  
\[EB/OL\].https://stackoverflow.com/questions/15260989/exception-in-thread-main-java-awt-awterror-assistive-technology-not-found,2021-03-13.
