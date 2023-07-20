---
title: VMware 安装Android系统 一步一步的手把手教学
date: 2022-06-07 14:58:36
tags: [VMware, Android]
categories: [IDE, VMware]
---

### 前言

VMware 安装安卓虚拟机 一步一步的手把手教学_vmware安装安卓系统

### VMware 安装 安卓虚拟机

*   [一、下载安卓镜像](about:blank#_8)
*   [二、创建新的虚拟机](about:blank#_24)
*   [三、勾选3D加速的情况](about:blank#3D_42)
*   *   [新建安卓分区，配置系统](about:blank#_46)
    *   [重要](about:blank#_55)
    *   [重点来了！！！！！](about:blank#_96)
*   [四、不勾选3D加速的情况](about:blank#3D_115)
*   [五、安装完成](about:blank#_166)
*   [六.网络设置](about:blank#_188)
*   [七. 可以安装软件了](about:blank#__228)


**平台：PC  
CPU：R7 3700X  
显卡：3060  
软件：VMware16  
系统：Win10 1909  
镜像：android-x86\_64-9.0-r2-k49.iso**

一、下载安卓镜像
=======================================================================

网址：[https://osdn.net/projects/android-x86/releases/71931](https://osdn.net/projects/android-x86/releases/71931/)

**我用的迅雷下载，很快**

度盘链接： pwd 2022

链接：
- <https://pan.baidu.com/s/1HaSEB\_CkyE\_UmJwHlvzbrw?pwd=2022>  
- [包含Android7-9三个镜像](https://pan.baidu.com/s/1HaSEB_CkyE_UmJwHlvzbrw?pwd=2022)

二、创建新的虚拟机
========================================================================

![](https://s2.loli.net/2023/07/08/JnRdCo3Tv1IirL9.png)

![](https://s2.loli.net/2023/07/08/28DOspEU4nVyYtl.png)

![](https://s2.loli.net/2023/07/08/IFqX5ReYKw2rSP1.png)

![](https://s2.loli.net/2023/07/08/mVHokzbK3q4U7AF.png)

![](https://s2.loli.net/2023/07/08/OeXrmVyd9CAuf8D.png)

![bb7fa94d9ab343d6836b3c1986ce02d3.png](https://s2.loli.net/2023/07/08/6eMzXO1cdtNHkI9.png)

![](https://s2.loli.net/2023/07/08/j9D4EoVIp7sTuN1.png)

![](https://s2.loli.net/2023/07/08/V3cIj1rSPqFlJXd.png)

![](https://s2.loli.net/2023/07/08/WEAlV6kgR1ezsxv.png)

![](https://s2.loli.net/2023/07/08/pvCSRMXdouwqbBy.png)

![](https://s2.loli.net/2023/07/08/rDlRIyJCaUPb23m.png)

![](https://s2.loli.net/2023/07/08/FLy3GqjpaxQ8Ukw.png)

![](https://s2.loli.net/2023/07/08/Wa3ALbvQMcdT5xX.png))

三、勾选3D加速的情况
==========================================================================

![](https://s2.loli.net/2023/07/08/PS4crLRBzHKnTJb.png) 
到这里虚拟机就算创建完成了

新建安卓分区，配置系统
--------------------------------------------------------------------------

![](https://s2.loli.net/2023/07/08/5oGIiVQAU6TMlmX.png)
`按下2，按上下箭头移动`

![3cb3af5bdfba4d5ca5478d5ee84c56b7.png](https://s2.loli.net/2023/07/08/IqyAFouLQb1NMZB.png)

重要
-----------------------------------------------------------------

`这里选择no！！！！！！！！！`‘

`否则下一步没办法出现bootable`  
![](https://s2.loli.net/2023/07/08/PbMl4V6S7gifzns.png)

新建一个分区

![b72a1da4536848efb2cbe2d041d57003.png](https://s2.loli.net/2023/07/08/4wdl52jLDBZYKmx.png)

![56457452f3594840b8ff13d1bb8b1214.png](https://s2.loli.net/2023/07/08/MKSN15aQZoxdBrw.png)

直接回车  
![](https://s2.loli.net/2023/07/08/ZWle6FS5MoOQgjT.png)

**选中bootable  
回车  
然后注意Flags这里**  
![](https://s2.loli.net/2023/07/08/prtH6vSsbcGdWT2.png)

**从上一步到这里后Flags会出现boot**  
![](https://s2.loli.net/2023/07/08/LKDM4FxNVhc5JUC.png) 
**移动箭头到Write这里**  
![](https://s2.loli.net/2023/07/08/SNeDGuPocr2ZvBO.png)

**这里要输入 yes  
但是显示不完整，问题不大**

![](https://s2.loli.net/2023/07/08/7bY5sqlUkSGJpDR.png)

**然后选择quit 退出**  
![](https://s2.loli.net/2023/07/08/NALIovgzFPmkuBf.png)

**默认选择sda1，然后ok**  
![](https://s2.loli.net/2023/07/08/eZkmXKlbGVLDh3y.png) 
**选择ext4**

![](https://s2.loli.net/2023/07/08/Wnb3TthXODp7JRL.png) 
**确定格式化**  
![](https://s2.loli.net/2023/07/08/Wnb3TthXODp7JRL.png)

**安装GRUB**  
![](https://s2.loli.net/2023/07/08/elaoHQk7O3pqBc6.png)

**安装系统到刚刚的sda1**  
![](https://s2.loli.net/2023/07/08/Se4OfQDlvNALr5H.png)

重点来了！！！！！
------------------------------------------------------------------------

**出现下面这个页面的时候，千万不要着急**

![](https://s2.loli.net/2023/07/08/qPdMNVeQSg9lCRW.png)

**首先要断开CD的连接！！！**

![881cf027240645ae959cbff209b57061.png](https://s2.loli.net/2023/07/08/GHTilXygqtK3jp6.png)

**勾勾去掉！！！！**

![](https://s2.loli.net/2023/07/08/vhH4UZaEboiuAWM.png)

![](https://s2.loli.net/2023/07/08/MQGTu7y2OKUHk6f.png)

**然后选择 Reboot**

![](https://s2.loli.net/2023/07/08/jCDtEP8VYXGMgo6.png)

**选择第一个**  
![](https://s2.loli.net/2023/07/08/Un24kV7xcodHtWh.png)

四、不勾选3D加速的情况
===========================================================================

注意：`此时镜像是Android 8.1 了`

如果勾选3D加速已经可以正常进入的情况下，可以跳过这里，直接去第五

这里选择`Reboot`  

![](https://s2.loli.net/2023/07/08/n6P5YQUitMFjKZw.png)

这个时候其实已经安装完成了  
但是显示不了图形界面  

![](https://s2.loli.net/2023/07/08/UIAbyBTmdYgQwPz.png)

这时候关掉虚拟机重新开机，选择第二个`Debug Mode`，回车

![](https://s2.loli.net/2023/07/08/NQuLOKbvjDtlsZE.png)

进入另一个界面后按下回车，然后`mount -o remount,rw /mnt`  
出现这个界面

![](https://s2.loli.net/2023/07/08/hbzKl7e9dw8G6aP.png) 

还是老样子先回车一下;  
![](https://s2.loli.net/2023/07/08/QUKXmhSyHgb7cLd.png)

输入命令后发现  
![](https://s2.loli.net/2023/07/08/cuBYrDpWhkiR3xG.png)

intel可能不会出现这个现象，我的是amd会出现，但是问题不大，不理他，继续

然后要修改 `/mnt/grub/menu.lst` 文件

输入：`vi /mnt/grub/menu.lst` 回车

不懂vi的语法的老哥们可以百度一下  
![](https://s2.loli.net/2023/07/08/SbzajDqI1RoO2He.png)

打开了文件`menu.lst`  
![a1e1f4bffb0d4603ad3646c0f279288b.png](https://s2.loli.net/2023/07/08/HD82GqnTx7Jj9pO.png) 
按 i 进入编辑模式  
光标移动到第一个启动项  
在 quiet 后面加上 `nomodeset`  
![3a33291a67904cb48eb980c2fe66fc3d.png](https://s2.loli.net/2023/07/08/UOyBDoEJ4Xnuah3.png)

然后按下ESC，退出编辑模式，进入命令行模式

保存并退出 按照以下步骤操作  
英文输入状态下 输入 `：wq` 回车  
其实就是按shift + : 再输入wq 然后回车

![4f0b968c1fb7409c97a45ec1bf6d7be8.png](https://s2.loli.net/2023/07/08/GxWC2Z7PzFKursc.png)

然后重启虚拟机就可以看见

五、安装完成
=====================================================================

![7572078bd34c43f0906e961064ca4a75.png](https://s2.loli.net/2023/07/08/IEMeg2QuWSUZmJw.png)

**然后就可以看见Android的logo了**  
![](https://s2.loli.net/2023/07/08/ihf3cnt9EUwCXpR.png)

**按照个人情况来选择，一步一步往下走**

![](https://s2.loli.net/2023/07/08/ihf3cnt9EUwCXpR.png)

**先跳过网络**  
![](https://s2.loli.net/2023/07/08/co1Y8xaub2vA3IX.png) 

**继续往下走**  

![](https://s2.loli.net/2023/07/08/C6SzeKwmEWARp9B.png) 

**密码，随你们了**  
![](https://s2.loli.net/2023/07/08/C6SzeKwmEWARp9B.png) 
**当当当！  
现在已经成功安装安卓系统了**  
![](https://s2.loli.net/2023/07/08/m9AgDfEjKniePZp.png)

![](https://s2.loli.net/2023/07/08/w218pHgFC6XMbl7.png) 
**然后发现上不了网**  
![](https://s2.loli.net/2023/07/08/hFpnY7kCHb5GLMi.png)

六.网络设置
=====================================================================

**打开虚拟网络编辑器**  
![](https://s2.loli.net/2023/07/08/2cRXwO5tSoLfknj.png) 
**更改设置**

![](https://s2.loli.net/2023/07/08/tdj87HJvQqXOhPD.png)
**选择桥接  
我的是网线连接，就没有wifi**  
![](https://s2.loli.net/2023/07/08/LB7XNvhjmykKCFq.png)
**打开虚拟机的设置**  
![](https://s2.loli.net/2023/07/08/vf63uxLsRMoOB8U.png) 
**网络选择：桥接**  
![](https://s2.loli.net/2023/07/08/KhMzGoBWA4JxTHa.png) 
**下拉安卓的通知栏**  
![2f3d59b1147948e4bd6e31092cf69c51.png](https://s2.loli.net/2023/07/08/O2nQic6zIxKGLX4.png) 
**点击wifi，连接**  
![325c386683df4eca948229483b8cdd71.png](https://s2.loli.net/2023/07/08/C68PcvEunq9GWl3.png) 
**已连接，但是显示无法联网  
不慌，先去浏览器试试**  
![](https://s2.loli.net/2023/07/08/1EvfSRJLOXQ9MFh.png) 
**输入百度的网站，可以看到能够正常访问网站**  
![](https://s2.loli.net/2023/07/08/PiNZOIfzgrhy7Ml.png) 
**顺便下载个输入法**

![](https://s2.loli.net/2023/07/08/xfurU54WnvIYFwL.png) 
**看个新闻**  
![](https://s2.loli.net/2023/07/08/BNdkWwXZ19Arfvn.png)

关于安装软件这一块，我的建议是先在里面下载个ES文件浏览器，或者是插个U盘里面放好安装包  
![](https://s2.loli.net/2023/07/08/Fg6El7z8cfYmSW4.png)
然后可以通过局域网访问电脑的文件，  
![](https://s2.loli.net/2023/07/08/oC3rQYsHnwGO2xP.png)

也可以通过ftp的方式，PC访问Android下的目录  
![](https://s2.loli.net/2023/07/08/JqsdamOYrA35yWV.png) 
![76e4ef7f428d4760b64b93687808e43d.png](https://s2.loli.net/2023/07/08/OWRDdJZBkVgrF7Y.png)
七. 可以安装软件了
=========================================================================

**到这里，安卓的安装就算是大功告成了，所以，你们该干啥就干啥吧**

![](https://s2.loli.net/2023/07/08/hBgjvbAwnPKYyk6.gif)
![](https://s2.loli.net/2023/07/08/WdxytCY9vgBIROD.gif)

