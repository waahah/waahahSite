---
title: APK反编译 - JEB 的安装
date: 2023-06-30 14:58:36
tags: [Anoroid, JEB, APK, Spider]
categories: [Coding, Python]
---

JEB 的安装
========

`JEB` 是由 PNF 软件（PNF Software）机构开发的一款专业的安卓应用程序的反编译工具，适用于逆向和审计工程，功能非常强大。相比 jadx 来说，JEB 不仅仅支持安卓 apk 的反编译，安卓应用的动态调试，还支持 `ARM`、`MIPS`、`AVR`、`Intel-x86`、`WebAssembly`、`Ethereum`（以太坊）等程序的反编译、反汇编、动态调试等功能，另外还能对一些 `PDF` 文件进行解析和处理，是一个极其强大的综合性逆向和审计工具。

由于本章的主要内容和安卓逆向相关，所以我们主要关注其和安卓相关的功能。对于安卓应用来说，JEB 主要提供如下功能：

*   可以对安卓应用程序和 Dalvik（Android 虚拟机，类似 Java 中的 JVM）字节码执行精确和快速的反编译操作。
*   内置的分析模块可以对高度混淆的代码可以提供虚拟层次化重构，对混淆代码的分析很有帮助。
*   可以对接 JEB API 来执行一些逆向任务，支持 Java 和 Python 来编写自动化逆向脚本。

JEB 支持 Windows、Linux、Mac 三大平台，其官网地址为 [https://www.pnfsoftware.com，目前主要分为三个版本：JEB](https://www.pnfsoftware.com，目前主要分为三个版本：JEB) CE（社区版）、JEB Android（安卓版）、JEB Pro（专业版）。JEB CE 提供了一些基础的功能，如支持 dex 文件的反编译，支持 Intel-x86 的反编译和反汇编，但不支持 Dalvik 字节码的反编译等功能。JEB Android 则更专注于安卓，支持 dex 文件的反编译，也支持 Dalvik 字节码的反编译和反汇编，JEB Pro 则是 “完全体”，支持官网所介绍的所有的功能。具体的功能对比可以参考官网的介绍：[https://www.pnfsoftware.com/jeb。三个版本中，JEB](https://www.pnfsoftware.com/jeb。三个版本中，JEB) CE 是免费的，JEB Android 和 JEB Pro 都是收费的，需要购买许可证才可以使用。

安装
--------------

如果从官方网站直接下载的话，一些 Android 功能是没法用的，这里建议下载社区大佬们提供的破解版，请移步：[https://bbs.pediy.com/thread-268316.htm](https://bbs.pediy.com/thread-268316.htm)。

另外这里我也准备了一个安装包，链接: [https://pan.baidu.com/s/1GyMCbJwjfiNjv9zSBWcoow](https://pan.baidu.com/s/1GyMCbJwjfiNjv9zSBWcoow) 提取码: e53q

备用链接（另一个版本的安装包）: [https://pan.baidu.com/s/1DXTqwWMrLJ-YhPb0zgZKyQ](https://pan.baidu.com/s/1DXTqwWMrLJ-YhPb0zgZKyQ) 提取码: 4m49

下载完成，解压后会得到如下的文件目录：

![og9tb.png](https://s2.loli.net/2023/07/15/rZ61O8sAzdj4yl9.png)

这里有三个运行脚本，分别适配 Windows、Linux、Mac，分别运行 jeb_wincon.bat、jeb_linux.sh、jeb_macos.sh 即可。

如 Mac 下就可以运行：

```shell
sh jeb_macos.sh
```

运行之后会出现如下内容：

```shell
Memory Usage: 981.5M allocated (144.9M used, 836.6M free) - max: 14.2G
JEB 4.3.0.202107131915 (jeb-ce) is starting...
Current directory: /usr/local/etc/jeb
Base directory: /usr/local/etc/jeb
Program directory: /usr/local/etc/jeb/bin
System: Mac OS X 11.5.2 (x86_64) en_CN
Java: Oracle Corporation 1.8.0_282
External plugin loaded: com.pnf.plugin.androidjnihelper.DynamicJNIDetectionPlugin
External plugin loaded: com.pnf.androsig.gen.AndroidSigGenPlugin
External plugin loaded: com.pnf.androsig.apply.andsig.AndroidSigApplyPlugin
External plugin loaded: com.pnf.plugin.oat.OATPlugin
External plugin loaded: com.pnf.plugin.pdf.PdfPlugin
External plugin loaded: com.pnf.diemvm.DiemIdentifier
External plugin loaded: com.pnf.diemvm.DiemDisassemblerPlugin
External plugin loaded: com.pnf.diemvm.DiemDecompilerPlugin
Checking for update...
```

接着就会弹出 JEB 的窗口，如图所示：

![ymjkt.png](https://s2.loli.net/2023/07/15/fDzRQF7NqvxZGXa.png)

然后就可以使用了。
