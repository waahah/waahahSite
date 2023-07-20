---
title: 测试十一、如何测试基于Unity3D引擎的游戏
date: 2023-01-14 14:58:36
tags: [Python, Airtest, Poco, Test, Unity3D]
categories: [Coding, 测试]
---

十一、如何测试基于unity3D引擎的游戏[¶](about:blank#unity3d "Permanent link")
==============================================================

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

由于游戏的界面是通过游戏引擎渲染出来的，游戏界面没有系统原生的控件信息，所以对于游戏，我们需要接入 poco-sdk 才能获取到游戏界面中的控件信息。下面以Unity开发的手游为例，介绍如何在Android和iOS平台进行连接。

2\. Android 平台[¶](about:blank#2-android "Permanent link")
---------------------------------------------------------

1.  从 [poco sdk repo](https://github.com/AirtestProject/Poco-SDK) 将`Unity3D`这个文件夹克隆下来。
    
    ![](https://s2.loli.net/2023/07/10/NmwpaYlfkhZxOPn.png)
    
2.  将克隆下来的`Unity3D`文件夹放置于你的Unity项目的`Assets/Scripts`文件夹下。
    
    ![](https://s2.loli.net/2023/07/10/Br7ZJWmwxoQlusY.png)
    
3.  将`Assets/Scripts/Unity3D`目录下以未用到的UI系统命名的文件夹删除。例：假如您的项目使用的UI系统是`ugui`，请将`fairygui`和`ngui`两个文件夹删除，保留`ugui`文件夹。
    
    ![](https://s2.loli.net/2023/07/10/DE8W1PkfHz5l7yK.png)
    
4.  在`Unity3D`中打开您的项目，并将`Unity3D/PocoManager.cs`作为一个`script component`添加到您的`GameObject`中，**要求挂载在一个永不销毁的对象下** ，比如通常情况下的主相机。
    
    举例:  
    点击`demo`这个场景下的`Main Camera`, 会在右方出现`inspector`界面，点击`inspector`界面当中的`Add Component`。
    
    ![4_main_camera.png](https://s2.loli.net/2023/07/10/vmzAy5Jn4IpMRU1.png)
    
    ![5_add_component.png](https://s2.loli.net/2023/07/10/M8P9pFKmAWROgkz.png)
    
    在弹出的对话框中输入`poco`，选择出现的`Poco Manager`这个选项。
    
    ![6_poco_manager.png](https://s2.loli.net/2023/07/10/iG5LuwNnR8HYKjp.png)
    
    完成后会在`inspector`界面出现如图所示的`component`。
    
    ![7_manager_script.png](https://s2.loli.net/2023/07/10/HFRyoufUrtK5Bkx.png)
    
5.  点击界面左上角`File->Build Settings`, 生成一个合适的安卓包，并安装到您的手机上。
    
6.  启动`Airtest IDE`，按照上文所述将`Airtest IDE`与您的手机链接，并启动对应的游戏。
    
7.  在左下角的`Poco辅助窗`中选择`Unity`模式，即可看到当前界面的UI树结构：
    
    ![8_unity_mode.png](https://s2.loli.net/2023/07/10/6tKIkwhVYRQFWBC.png)
    
8.  在选择`Unity`模式之后，`Airtest IDE`会自动插入poco的初始化代码：
    

![9_initialization_code.png](https://s2.loli.net/2023/07/10/UXqr45WBfv9KgAn.png)

之后的脚本编写，就可以利用Poco提供的API对游戏界面上的元素进行操作了。

下面是一个简单的测试用例。您可以从[这里](http://top.gdl.netease.com/poco-res/poco-demo-unity-game-android.zip)下载这个简单的Unity3D小游戏。在安装完成后，打开游戏后点击`Start`再点击`drag drop`会出现如下所示的界面。

![10_unity3d_game.png](https://s2.loli.net/2023/07/10/YCbsytS1UwdzcJV.png)

每将一颗星星拖动到屏幕中心的贝壳上，将得到20分；如果将5颗星星依次拖动到贝壳上，那将获得100分。下面的脚本就是在测试依次拖动5颗星星是否会得到100分的分数。

```python
from airtest.core.api import *

auto_setup(__file__)

from poco.drivers.unity3d import UnityPoco
poco = UnityPoco()

poco('btn_start').click()
time.sleep(1.5)


poco('drag_and_drop').click()

shell = poco('shell').focus('center')
for star in poco('plays').offspring('star'):
    star.drag_to(shell)
time.sleep(1)

assert poco('scoreVal').get_text() == "100", "score correct."
poco('btn_back', type='Button').click()

```

点击运行脚本按钮，就会得到如下所示的结果。

![image](https://airtest.doc.io.netease.com/img_11/11_run_script.gif)

3\. iOS平台[¶](about:blank#3-ios "Permanent link")
------------------------------------------------

1.  同样的，先完成引擎SDK接入，打包出来安装在iOS手机上，然后通过Airtest IDE连接iOS手机
2.  与Android不同的是，iOS Unity Poco的连接需要启动两个proxy，8100端口用于连接iOS手机，5001端口用于连接poco-sdk的rpc端口  
    `iproxy 8100 8100 iproxy 5001 5001` 这里的iproxy相当于adb中的forward
    
3.  连接好iOS手机之后，选择Poco辅助窗中的`Unity`模式，即可看到当前界面的UI树结构：
    
    ![12_ios_unity.png](https://s2.loli.net/2023/07/10/m3S4uPjdvWeQXcr.png)
    
4.  之后即可通过Poco提供的API，对iOS上的游戏编写自动化测试脚本了。

