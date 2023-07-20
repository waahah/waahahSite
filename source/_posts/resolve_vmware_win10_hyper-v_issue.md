---
title: 解决VMware Workstation的虚拟化与win10 自带的Hyper-V服务冲突的问题
date: 2023-07-27 14:58:36
tags: [Windows, VMware, Hyper-V]
categories: [Windows]
---

解决VMware Workstation的虚拟化与win10 自带的Hyper-V服务冲突的问题
================================================

在VMare出现这个问题时，解决方法三种  
![20200105174501908.png](https://s2.loli.net/2023/07/17/u1gP57hUmaTje2l.png)
解决方案：1.在控制面板中关闭Hyper-v功能，把沟取消掉  
![20200105174548720.png](https://s2.loli.net/2023/07/17/ALGHIVRxu7OB3pd.png)

2.第一个方法重启之后无效的话，进入方法二：用管理员权限打开CMD或window powershell 关闭 启动项  
`bcdedit /set hypervisorlaunchtype off`
![20200105174653200.png](https://s2.loli.net/2023/07/17/jXhNflvkpJuqSiz.png)
之后输入bcdedit 查看启动管理器，查看hypervisorlaunchtype是不是off状态的，**重启之后生效。**  
![20200105174747578.png](https://s2.loli.net/2023/07/17/V1slLYu9cne4rUO.png)
3、以上两种方法无效的话，使用第三种方法，改注册表信息。  
前往注册表以下位置：  
`HKEY\_LOCAL\_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity`  
将其中的Enabled项的值设置为0，重启计算机，即可关闭“内存完整性”选项。  
一。win+R运行`regedit`，打开注册表管理。  
![20200105174827450.png](https://s2.loli.net/2023/07/17/A1ON2fedbXruwcx.png)

![20200105174846734.png](https://s2.loli.net/2023/07/17/r4CEFA67pMzae1h.png)
**重启机器后生效。**
