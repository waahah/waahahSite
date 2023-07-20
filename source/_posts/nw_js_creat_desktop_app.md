---
title: NW.js构建跨平台桌面应用程序
date: 2023-08-29 14:58:36
tags: [JavaScript, App, NW.js]
categories: [Coding, JavaScript]
---

### 前言

现在JavaScript技术的应用访问越来越广泛。今天要介绍的是如何用JavaScript开发桌面应用。

### NW.js

NW.js （原名 node-webkit）是一个基于 Chromium（浏览器引擎） 和 node.js 的开发框架（工具），通过它可以用 HTML 和 JavaScript 编写原生应用程序（桌面应用）。实现了一个用所有 Web 技术来写原生应用程序的新的开发模式。其中Chromium（浏览器引擎）负责界面显示，node.js负责数据处理、操作系统交互。

Chromium 是 Google 的Chrome浏览器背后的引擎，其目的是为了创建一个安全、稳定和快速的通用浏览器。是目前市场占有率最高的浏览器引擎，大部门浏览器都是基于Chromium开发的。Nodejs 是一个让 JavaScript 运行在服务端的开发平台，它让 JavaScript 成为服务端的脚本语言，是目前最受欢迎、发展最快的开发引擎。NW.js把Chromium和Nodejs集成在一起可谓珠联璧合，双剑合璧。

### 特点

（1）以网络最流行的技术编写原生应用程序的新方法

（2）基于HTML5, CSS3, JS and WebGL而编写

（3）完全支持nodejs所有api及第三方模块

（4）可以使用DOM直接调用nodejs模块

（5）容易打包和分发

（6）支持运行环境包括32位和64位的Window、Linux和Mac OS （苹果）

### 环境搭建

  官网[https://nwjs.io/](https://nwjs.io/ "NW.js")

  1.下载适合当前版本的js

  【这里下载的SDK版本，方便后续调试】

![879695-20180127140924194-578316808.png](https://s2.loli.net/2023/07/19/qsEG1XPUwZzRejf.png)

  2.解压到本地

![ac6eddc451da81cbc313efb370b2b41008243135.webp](https://s2.loli.net/2023/07/19/uCKQvz39scEjxpb.webp)

  3.构建自己的project  
　　index.html和package.json这两个文件必须要有的。

![879695-20180127141425240-91657269.png](https://s2.loli.net/2023/07/19/MEawnp5YizmNbye.png)

![879695-20180127141716006-253164036.png](https://s2.loli.net/2023/07/19/sxdiZmq63t7n5Mo.png)

![879695-20180127143336194-1381472222.png](https://s2.loli.net/2023/07/19/o849KVGchlZjBrO.png)

package.json毕竟是配置文件，我们可以多加一些参数如下：

```json
 {
  "name": "newProgram",
  "version": "0.1.0",
  "description": "nw.js demo",
  "main": "index.html",
  "window": {
    "title": "nw-demo", // 应用标题
    "width": 840, // 应用初始化宽度
    "height": 600, // 应用初始化高度
    "toolbar": true, // 是否开启调试工具
    "resizable": false, // 应用是否可以调整高度以及宽度
    "icon": "images/icon.png" // 应用图标路径（相对路径）
  },
```

**对于已有的项目**

  4.把项目放到nw.js解压后的同一目录下

![879695-20180127143522194-1702498653.png](https://s2.loli.net/2023/07/19/CKZ7bNSUHi9fByc.png)

  5.命令进入到当前文件夹 输入 **nw myapp**
  
  注意建议使用cmd时使用这个命令。使用powershell必须使用 ./nw 才可以

![879695-20180127143754444-753849176.png](https://s2.loli.net/2023/07/19/LvOKdqh4HJozW2l.png)

![879695-20180127143820397-1732723710.png](https://s2.loli.net/2023/07/19/ueqcx4rfAthmInK.png)

  也可以直接把项目拖到nw.exe

![879695-20180127143916662-663720595.png](https://s2.loli.net/2023/07/19/Z13nFWraoptmzlK.png)

### 优化
实际开发中html页面可能比较多，所以我们可以把html、css、js等代码单独一个目录中，没必要都放在解压目录下。如下图，我们在解压目录里创建app目录，然后把html等代码转移到app目录下。

![c8177f3e6709c93d4171334bbee99cdad30054e0.webp](https://s2.loli.net/2023/07/19/E4kyrMXhdTYKRSB.webp)

代码转以后一定要修改配置文件（package.json），修改启动页面路径。

![35a85edf8db1cb13bf762db0fc80324893584b54.webp](https://s2.loli.net/2023/07/19/SatT1J54WbnzEkM.webp)

重新双击nw.exe即可打开应用

![37d12f2eb9389b50c04ba536a4e181dbe6116e7c.webp](https://s2.loli.net/2023/07/19/wWjLgeXvTF5sZME.webp)

### 打包

  6.将应用打包成app.nw文件，进入myapp文件夹中，将所有文件选择打成zip包，然后改名为app.nw

  7.合并app.nw和nw.exe:

　　将app.nw文件移动到和nw.exe同级目录下，然后执行命令**copy /b nw.exe+app.nw app.exe**，这时是可以直接执行app.exe的，但换到其它目录就不可以执行了，因为换到其它目录找不到nwjs包内的依赖文件
　　
　　如果你的编辑器是vscode自动打开的是powershell终端，则上面的命令会执行报错，选择默认shell选择cmd即可！

![879695-20180127145430569-322324294.png](https://s2.loli.net/2023/07/19/EdwRiDtUn1x6gYs.png)

【但只能在当前环境执行，在别处使用时需要打包，生成  .exe文件】

  8.使用Enigma Virtual Box打成独立的可执行的exe文件  
　　[http://enigmaprotector.com/en/downloads.html](http://enigmaprotector.com/en/downloads.html "Enigma Virtual Box")

![879695-20180127144650756-851548285.png](https://s2.loli.net/2023/07/19/8jGlKyUZszhICmb.png)

    9.(1)导入项目的.exe文件

　　(2)选择输出路径【打包后的文件存放地址】

       (3)把nw.sj的文件拖到这里，【不包含自己的项目】

  ![879695-20180127150238256-525109107.png](https://s2.loli.net/2023/07/19/OmDVrp6zX1y3xBc.png)

   10.点击process

![879695-20180127150806647-1506194688.png](https://s2.loli.net/2023/07/19/MqHwja8fKWVBAsx.png)

  11.success!

  ![879695-20180127150858522-598072018.png](https://s2.loli.net/2023/07/19/SbAHxfLWwoI4zpy.png)

   12.生成的文件
   ![879695-20180127151053725-308952487.png](https://s2.loli.net/2023/07/19/uqVvZycnjKTltCe.png)

