---
title: VMware 安装macOS 系统无法安装VMtools解决方案 
date: 2022-06-03 14:58:36
tags: [VMware, macOS, Unlocker]
categories: [IDE, VMware]
---

VMware 安装macOS 系统无法安装VMtools解决方案(Darwin.iso)
------------------------------------------------------------------------------------------

##### 最近突然想玩一玩macOS，所以通过VM虚拟机安装了一下，但是发现装完以后屏幕大小不能变成我想要的那么大，也就是没有安装VMtools，各种办法都尝试了，但是都没有解决，都卡在了VMtools更新上面，也就是没有正确的Darwin.iso。

回到正题：解决办法：  
在macOS的文件夹下面可以看到有一个unlocker文件夹，打开里面可以看到有gettools.py文件，用记事本这类的软件打开。如图：

![VMware 安装macOS 系统无法安装VMtools解决方案](https://www.likecs.com/default/index/img?u=L2RlZmF1bHQvaW5kZXgvaW1nP3U9YUhSMGNITTZMeTl3YVdGdWMyaGxiaTVqYjIwdmFXMWhaMlZ6THpRMk1DOHhOelExTVROaE1tVXhZelJqWlROa01tUTJOVFkzT1dRMk1HWmlZekkxWXk1d2JtYz0=)  

发现问题所在，也就是这个地方的预先设定的网址软件内部不能正确访问，所以没有办法下载VMtools进行安装和更新，把该网址复制到浏览器打开，如图：  

![VMware 安装macOS 系统无法安装VMtools解决方案](https://www.likecs.com/default/index/img?u=L2RlZmF1bHQvaW5kZXgvaW1nP3U9YUhSMGNITTZMeTl3YVdGdWMyaGxiaTVqYjIwdmFXMWhaMlZ6THpRNE9TOWlNamhsTXpVellUVTFNbU0yWldReE5XWXhPRE5pWW1NNFlXRTNaRGxrT1M1d2JtYz0=)  

会出现各种版本的VMtools文件，然后选择较新的版本下载下来。解压，进入payload文件夹，就会发现下载好的darwin.iso，在虚拟机软件里面，“编辑此虚拟机设置”–>CD/DVD部分选择“使用ISO映像文件”，然后点击浏览，引导到我们刚刚下载的darwin.iso文件，再打开虚拟就就万事大吉啦。  

附上下载地址：
- <http://softwareupdate.vmware.com/cds/vmw-desktop/fusion>
