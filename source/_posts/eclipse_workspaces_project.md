---
title: Eclipse中怎样删除工程
date: 2021-07-31 14:58:36
tags: [IDE, Eclipse, Java]
categories: [IDE, Eclipse]
---

### 前言
eclipse中怎样删除工程

在 eclipse中建立了 很多工程，就是很多文件夹，就是在eclipse-SDK-3.5.2-win32目录  下的很多文件夹 怎样从eclipse中删除那些多余的工程呢，直接删除文件夹是不行的，再次打开eclipse时候，他就说 在保存文件的时候文件夹会自动出生了，但是 新出生的文件夹只有一个文件（`.project`文件）

那什么方式才能彻底删除那个文件夹呢

在你要删除的工程名上右键点击`delete`，然后一般会出来一个对话框，上面选择`delete project contents on disk`，如果勾了，确定，就从硬盘上删除了你的工程，彻底没有了，再也找不回来了

如果想移除`java project`，找到projectName -->单击右键 -->Delete -->选择`Do not delete contents` -->这样projectName会从工作空间中删除没有了

