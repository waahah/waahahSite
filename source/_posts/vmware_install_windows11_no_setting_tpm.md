---
title: VMware虚拟机安装Windows11-无需设置TPM密码
date: 2022-05-26 14:58:36
tags: [VMware, Windows, TPM]
categories: [IDE, VMware]
---

VMware虚拟机安装Windows11（无需设置TPM密码）
==============================================================================================

注意：需要新版VMware，目前小白的版本为 `16.2.3`

一、新建虚拟机向导
------------------------------------------------------------------------

1. 新建虚拟机

点击菜单栏文件 → 新建虚拟机

![](https://s2.loli.net/2023/07/08/4Seyp3h6Yz8goaE.png)

2. 配置选择`典型(推荐)`

![](https://s2.loli.net/2023/07/08/HaroWLmiIefk8MC.png)

3. 选择`稍后安装操作系统`

![](https://s2.loli.net/2023/07/08/3yKNhJ5odStQPgU.png)

4. 选择`Windows 10 x64`版本

![](https://s2.loli.net/2023/07/08/MgGkfPOpqem6Scr.png)
5. 虚拟机自定义名称  
![](https://s2.loli.net/2023/07/08/QYPiEIl4N5oGuqx.png)
6. 磁盘容量默认大小即可

![](https://s2.loli.net/2023/07/08/fuSUZCsgXQyYeNj.png)

7. 完成基本配置

二、开启TPM
----------------------------------------------------------------------

1. 打开刚开创建的虚拟机目录

![](https://s2.loli.net/2023/07/08/MOlUCdziWyK9g42.png)

2. 找到以`.vmx`为后缀的文件，如`Windows11.vmx`，使用任意文本编辑器打开

![](https://s2.loli.net/2023/07/08/c7YVhRwE3HujeMs.png)

3. 在结尾处添加如下代码后，记得保存该文件

```ini
managedvm.autoAddVTPM = "software"

```

![](https://s2.loli.net/2023/07/08/1adiFpKJTCfg5MA.png)

4. 先点击窗口中的`X`关闭当前虚拟机窗口，然后重新打开，即可看到设备中已经自动添加了`可信平台模块`

![](https://s2.loli.net/2023/07/08/A9TKFgyGw2Zqi18.png)

三、编辑虚拟机设置
------------------------------------------------------------------------

1. 点击`编辑虚拟机设置`，进入虚拟机设置界面

![](https://s2.loli.net/2023/07/08/xdETzB18LhsHMN9.png)

2. 点击`4GB`，或者手动将虚拟机内存大小调整为`4096MB`

![](https://s2.loli.net/2023/07/08/mWky91d4jO5ocaG.png)

3. 点击`CD/DVD(SATA)`，选择`使用ISO映像文件`，点击`浏览`，选择已经下载好的Windows11镜像

如：zh-cn\_windows\_11\_consumer\_editions\_updated\_may\_2022\_x64\_dvd\_0fd9ef7c.iso

![](https://s2.loli.net/2023/07/08/nT3BezQ4HXLakb8.png)

4. 点击右下角的`确定`按钮，完成配置

四、安装Windows11操作系统
--------------------------------------------------------------------------------

1. 点击`开启此虚拟机`

![](https://s2.loli.net/2023/07/08/lhkJBpiyDzVMnIv.png)

2. 当出现`Press any key...`时**迅速**按个回车键（任意按键均可）

!!!注意：此步骤一定要快

![](https://s2.loli.net/2023/07/08/GoywBbMLNTz1ncQ.png)

如果因为手速慢出现`Time out`等情况，重新启动当前客户机，再来一次，也要快！

如果鼠标无法点击虚拟机重启按钮，使用`Ctrl+Alt`即可显示鼠标指针

![](https://s2.loli.net/2023/07/08/czTtJrEhCFnqIdf.png)

3. 选择安装语言，默认即可

![](https://s2.loli.net/2023/07/08/NqgTHMnRxEzGCw4.png)

4. 点击`现在安装`

![](https://s2.loli.net/2023/07/08/8VUEhNcoWteT7jd.png)

5. 点击`我没有产品秘钥`

![](https://s2.loli.net/2023/07/08/3tExLVUWNIKMAHu.png)

6. 选择`Windows 11 专业版`

![](https://s2.loli.net/2023/07/08/M6aujneSghWJDOq.png)

7. 接收协议

![](https://s2.loli.net/2023/07/08/Lj29sbzwaBS1fAW.png)

8. 选择`自定义...`

![](https://s2.loli.net/2023/07/08/uJkELWcohpeKnRQ.png)

9. 选择安装盘符，默认即可

![](https://s2.loli.net/2023/07/08/MhKP2irRmg1kWyN.png)

10. 等待安装流程走完，会自动重启，请耐心等待

![](https://s2.loli.net/2023/07/08/nYMAVysGTXtQz26.png)

![](https://s2.loli.net/2023/07/08/HUKpugJ5yTenbi7.png)

11. 选择祖国

![](https://s2.loli.net/2023/07/08/t4n1IUsvW8bxVgi.png)

12. 选择输入法

![](https://s2.loli.net/2023/07/08/JbWavVC2PUQlTGD.png)

13. 跳过第二种布局

![](https://s2.loli.net/2023/07/08/IQmWCHDvt2xhPjB.png)

14. 如果不想给设备取名，可以选择`暂时跳过`，系统会自动生成

!!!注意：这里是设备名称，不是用户名

![bc1c77b532804e378e3c70e3dfdaef5d.png](https://s2.loli.net/2023/07/08/ILb6y1dNTncilh2.png)

15. 选择针对个人使用进行设置

![](https://s2.loli.net/2023/07/08/cd1fDs9ABFhgKEY.png)

16. 点击`登录选项`

![](https://s2.loli.net/2023/07/08/rv8QitysPJdlBEO.png)

17. 选择`脱机账户`

![](https://s2.loli.net/2023/07/08/ZH9Ue4I6L2E1ckS.png)

18. 点击`暂时跳过`

![](https://s2.loli.net/2023/07/08/8kbNI3HAXQ7eEnv.png)

19. 输入自定义的用户名

![](https://s2.loli.net/2023/07/08/ztJL1OuavEcW6Kh.png)

20. 可以不用输入密码，直接点击下一步

![](https://s2.loli.net/2023/07/08/CT1Qh4JUZz59WnP.png)

21. 根据个人需要选择性开关隐私设置，点击接受之后，耐心等待系统重启

![](https://s2.loli.net/2023/07/08/xEOok7PSerZTbQJ.png)

22. 大功告成

![](https://s2.loli.net/2023/07/08/bv6zrCTIX321Ymk.png)

五、安准VMware Tools
-------------------------------------------------------------------------------

VMware Tools可以实现主机与虚拟机之间的文件共享，同时可支持自由拖拽的功能，鼠标也可在虚拟机与主机之间自由移动（不用再按Ctrl+Alt），且虚拟机屏幕也可实现全屏化。

1. 点击VMware菜单栏 `虚拟机` → 安装VMware Tools

![](https://s2.loli.net/2023/07/08/H6jv3kNVeDButbl.png)

2. 打开虚拟机中刚才安装Windows11操作系统中的文件资源管理器，双击DVD运行安装程序

![](https://s2.loli.net/2023/07/08/z6SuYFnkV8c35jm.png) 
3. 弹出提示界面选择`是`

![](https://s2.loli.net/2023/07/08/HVmvTgOxsqi1WEQ.png)

4. 一直`下一步`，即可安装成功

![](https://s2.loli.net/2023/07/08/EtMeAWDg4zvJrRL.png)

5. 安装完成后，会提示重启，此时重启系统即可。

![](https://s2.loli.net/2023/07/08/waKMUl3R5Z2DIxo.png)
