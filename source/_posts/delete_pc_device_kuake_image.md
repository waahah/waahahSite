---
title: 删除电脑设备和驱动器的夸克图标
date: 2023-05-02 14:58:36
tags: [Windows, Lenovo, Xiaoxin]
categories: [Windows]
---

电脑设备和驱动器的夸克图标怎么删除
=================

电脑设备和驱动器的夸克图标怎么删除

解决方法：

方法一：通过相关的软件设置去除掉由于是某个软件留下的，当把该软件重新安装后你会发现它又恢复正常了，这时候我们只需要打开相关的软件找到相关的设置拒绝在我的电脑的设备和驱动器中添加图标，这样就自动去除了。

方法二：通过注册表解决（为避免出现意外问题，建议你在修改注册表前对注册表信息进行备份）以上的问题是因为软件在注册表中存有残留导致的，我们只需将相关的注册表信息删除掉就可以解决了。
按`win键+R`，输入`regedit` 回车 打开注册表编辑器，定位到：`HKEY\_CURRENT\_USERSoftwareMicrosoftWindowsCurrentVersionExplorerMyComputer`将其中的注册表信息完全删除掉重启电脑就可以解决问题了。

