---
title: APK反编译 - Jadx 的安装
date: 2023-06-29 14:58:36
tags: [Anoroid, Jadx, APK, Spider]
categories: [Coding, Python]
---

jadx 的安装
========

`jadx` 是一款使用广泛的反编译工具，可以一键把 `apk` 文件还原成 Java 代码，使用起来简单，功能 强大，还具有一些附加功能可以辅助代码追查。

相关链接
---------------------------------------------------------------

*   GitHub：<https://github.com/skylot/jadx>

安装方法
---------------------------------------------------------------

### Windows

直接到 GitHub 下载对应的 Release 包即可：<https://github.com/skylot/jadx/releases>。

![okntn.png](https://s2.loli.net/2023/07/15/UcX2zJCMvHeSDTk.png)

下载之后直接解压即可。

解压之后会得到一个 bin 目录，进入 bin 目录直接运行 jdax 和 jadx-gui 即可，Windows 可以直接双击 jadx.bat 或 jadx-gui.bat 即可运行。

### Mac

对于 Mac 来说，可以直接使用 Homebrew 安装：

```bash
brew install jadx
```

### Linux

```shell
sudo pacman -S jadx
```

更多安装说明可以参考：<https://github.com/skylot/jadx>。

验证安装
---------------------------------------------------------------

只要 jadx 和 jadx-gui 能正常启动，就证明安装成功了。

