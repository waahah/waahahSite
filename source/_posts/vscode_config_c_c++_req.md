---
title: VScode配置C/C++环境（超详细保姆级教学）
date: 2023-07-29 14:58:36
tags: [C++, VScode, C]
categories: [Coding, C++]
---


>         安装了vscode，但是下载安装后不会配置C++环境，自己连查带问搞了几个小时终于配置好了。后面身边很多同学也不会配，都来找我帮忙配，加上之前自己摸索着配的时候感觉网上没有详细又靠谱的教程，所以决定把配置的过程记录一下供大家参考，希望可以帮到跟我一样想用却不会配置vscode的同学们。

**目录**

[第一步 下载安装VSCode](about:blank#%E7%AC%AC%E4%B8%80%E6%AD%A5%20%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85VSCode)

[第二步 下载安装g++](about:blank#%C2%A0%E7%AC%AC%E4%BA%8C%E6%AD%A5%20%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85g%2B%2B)

[第三步 安装VSCode插件](about:blank#%E7%AC%AC%E4%B8%89%E6%AD%A5%20%E5%AE%89%E8%A3%85VSCode%E6%8F%92%E4%BB%B6)

[第四步 配置调试功能](about:blank#%E7%AC%AC%E5%9B%9B%E6%AD%A5%20%E9%85%8D%E7%BD%AE%E8%B0%83%E8%AF%95%E5%8A%9F%E8%83%BD)

[其他事项](about:blank#%E5%85%B6%E4%BB%96%E4%BA%8B%E9%A1%B9)

[1.中文显示乱码](about:blank#1.%E4%B8%AD%E6%96%87%E6%98%BE%E7%A4%BA%E4%B9%B1%E7%A0%81)

        [](about:blank#2.%E5%9C%A8%E7%BB%88%E7%AB%AF%E4%B8%AD%E8%BF%90%E8%A1%8C) [2.在终端中运行](about:blank#2.%E5%9C%A8%E7%BB%88%E7%AB%AF%E4%B8%AD%E8%BF%90%E8%A1%8C)

[3.调试时显示“找不到g++”](about:blank#3.%E8%B0%83%E8%AF%95%E6%97%B6%E6%98%BE%E7%A4%BA%E2%80%9C%E6%89%BE%E4%B8%8D%E5%88%B0g%2B%2B%E2%80%9D)

* * *

第一步 下载安装VSCode
--------------

这应该是最简单的一步，相信大家自己就可以完成。如果在vscode官网感觉下载特别慢的话，可以去试一下腾讯软件中心，我都是在这个网页上下载的。下载好之后根据提示安装就可以了。  
![5142db7b754a4b888344424669d9a2e8.png](https://s2.loli.net/2023/07/17/RBZSypKscMENw1Q.png)

 第二步 下载安装g++
------------

- [MinGW Distro - nuwen.net(https://nuwen.net/mingw.html "MinGW Distro - nuwen.net")

这是当初找教程的时候在评论区找到的链接，用自己的网络就可以下载 

进去之后点击图中圈起来的那个链接下载

![8bf478d19442443290f89282f26b20aa.png](https://s2.loli.net/2023/07/17/kGWmE4b5VUqfiZS.png)

下载完成后进行安装，自己选择安装路径，安装的路径需要记住，马上就要用到

注意路径中不能出现中文！注意路径中不能出现中文！注意路径中不能出现中文！

![370839d8d63643578a263d14947fe922.png](https://s2.loli.net/2023/07/17/3PztsN7DBnZrLpk.png)

我这里为了方便直接装在C盘了

![c7a8c2bf98824666aafc0b613e49a381.png](https://s2.loli.net/2023/07/17/XAcjtv3BoVfCOq8.png)

安装完成之后我们打开刚刚的安装路径，找到并打开MinGW -> bin,进入bin文件夹之后点一下这里，右键复制路径

![bb1d4d8f4d9148ca96f122015990f920.png](https://s2.loli.net/2023/07/17/Lc7rQbloE6akgMu.png)

 之后我们进入设置，搜索“环境变量”，选择“编辑系统环境变量”

![742c0d9349fa45afbb020e0010db95e7.png](https://s2.loli.net/2023/07/17/CoRnTxSGPeNq65y.png)

点击进入环境变量 

![f5f83baaa7b9432497832867cf9c718b.png](https://s2.loli.net/2023/07/17/FDksBSzGLQdRjqX.png)

 双击Path

![1d3dc3bd218d4580b368a8dd893ff501.png](https://s2.loli.net/2023/07/17/Y4vcrkq5LQRTpaF.png)

 点击新建，然后把刚刚复制的路径粘贴上去
![a8c489d5d28b48ba84aefb64fd23de11.png](https://s2.loli.net/2023/07/17/vNVOAP1ZBL8Q3Mi.png)

还要点击多次确定哦，将刚刚打开的页面全部通过确定关掉

假设我的安装路径为：D:\mingw-w64，则配置的环境变量为：D:\mingw-w64\bin

 然后我们再来看一看刚刚的操作有没有成功，按Win+R,输入cmd，在控制台中输入
```bash
g++ --version
gdb --version

```

出现这样的界面就算成功了

![20200320014606476.png](https://s2.loli.net/2023/07/17/GFozPOh8d4xq7LC.png)

 这样我们的g++就算安装好啦！

第三步 安装VSCode插件
--------------

现在我们打开我们刚刚安装好的VSCode,点击这个按钮

![bb3c2877a0094fc1bb0fdce84c6e3785.png](https://s2.loli.net/2023/07/17/LU1yzTrHkDPR8cx.png)

 搜索C/C++ 安装第一个插件（我之前已经配置过了所以已经安装好了）

![0c9277007c9d4b7d92221380317bbf47.png](https://s2.loli.net/2023/07/17/vyz79YWDdFcIKjk.png)

还有很多好用的插件，比如自动补齐，括号换颜色等，大家有需要可以自己搜一搜，这里我就不说题外话了

第四步 配置调试功能
----------

这是配置过程中的重中之重！之前的内容在各个平台也都很容易搜得到，然后我就在这一步被卡了几个小时。

首先大家在一个你希望的位置建一个文件夹，随意起名就可以（注意不可以用中文！），以后的C/C++代码文件都要放在这个文件夹里才可以正常调试。

![f6444768c06042ed81bba1835432aabc.png](https://s2.loli.net/2023/07/17/2SNGIkt9ZqzdmUL.png)

这里我就建在桌面上了。

然后进入VSCode,点击Open Folder或者点击左上角File -> Open Folder，然后打开刚刚建的文件夹，选择信任父级文件夹

点击这个图标新建一个文件夹，命名为.vscode（注意必须是这个名字！）

![190273d802ed4802881c8bfe360e0c8c.png](https://s2.loli.net/2023/07/17/dDIACbaeZ6TOqwo.png)

![a39317efdce740bf8466be00d209b0c2.png](https://s2.loli.net/2023/07/17/rSYoZagXmLEklzh.png)

创建完成后再点击这个图标新建四个文件，文件名分别是

```
//c_cpp_properties.json
//launch.json
//settings.json
//tasks.json

```

![f2416b518f2a451e804286163bede1e1.png](https://s2.loli.net/2023/07/17/4oCck8bzxtpA2LJ.png)

接下来复制粘贴这四个文件的内容 

首先是c\_cpp\_properties.json

```json
{
  "configurations": [
    {
      "name": "Win64",
      "includePath": ["${workspaceFolder}/**"],
      "defines": ["_DEBUG", "UNICODE", "_UNICODE"],
      "windowsSdkVersion": "10.0.18362.0",
      "compilerPath": "C:/MinGW/bin/g++.exe",
      "cStandard": "c17",
      "cppStandard": "c++17",
      "intelliSenseMode": "gcc-x64"
    }
  ],
  "version": 4
}

```

注意compilerPath这一项要把路径改成刚才g++的安装路径：找到刚刚的安装文件夹->MinGW->bin->g++,exe ,然后复制或者手动把g++.exe的路径敲上去，格式要跟上面代码段一样

然后是launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(gdb) Launch", 
      "type": "cppdbg", 
      "request": "launch", 
      "program": "${fileDirname}\\${fileBasenameNoExtension}.exe", 
      "args": [], 
      "stopAtEntry": false,
      "cwd": "${workspaceRoot}",
      "environment": [],
      "externalConsole": true, 
      "MIMode": "gdb",
      "miDebuggerPath": "C:\\MinGW\\bin\\gdb.exe",
      "preLaunchTask": "g++",
      "setupCommands": [
        {
          "description": "Enable pretty-printing for gdb",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ]
    }
  ]
}
```

注意miDebuggerPath这一项也要把路径改成刚才g++的安装路径：找到刚刚的安装文件夹->MinGW->bin->gdb,exe ,然后复制或者手动把gdb.exe的路径敲上去，格式要跟上面代码段一样

 接下来是settings.json

```json
{
  "files.associations": {
    "*.py": "python",
    "iostream": "cpp",
    "*.tcc": "cpp",
    "string": "cpp",
    "unordered_map": "cpp",
    "vector": "cpp",
    "ostream": "cpp",
    "new": "cpp",
    "typeinfo": "cpp",
    "deque": "cpp",
    "initializer_list": "cpp",
    "iosfwd": "cpp",
    "fstream": "cpp",
    "sstream": "cpp",
    "map": "c",
    "stdio.h": "c",
    "algorithm": "cpp",
    "atomic": "cpp",
    "bit": "cpp",
    "cctype": "cpp",
    "clocale": "cpp",
    "cmath": "cpp",
    "compare": "cpp",
    "concepts": "cpp",
    "cstddef": "cpp",
    "cstdint": "cpp",
    "cstdio": "cpp",
    "cstdlib": "cpp",
    "cstring": "cpp",
    "ctime": "cpp",
    "cwchar": "cpp",
    "exception": "cpp",
    "ios": "cpp",
    "istream": "cpp",
    "iterator": "cpp",
    "limits": "cpp",
    "memory": "cpp",
    "random": "cpp",
    "set": "cpp",
    "stack": "cpp",
    "stdexcept": "cpp",
    "streambuf": "cpp",
    "system_error": "cpp",
    "tuple": "cpp",
    "type_traits": "cpp",
    "utility": "cpp",
    "xfacet": "cpp",
    "xiosbase": "cpp",
    "xlocale": "cpp",
    "xlocinfo": "cpp",
    "xlocnum": "cpp",
    "xmemory": "cpp",
    "xstddef": "cpp",
    "xstring": "cpp",
    "xtr1common": "cpp",
    "xtree": "cpp",
    "xutility": "cpp",
    "stdlib.h": "c",
    "string.h": "c"
  },
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "aiXcoder.showTrayIcon": true
}
```

 最后是tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "g++",
      "command": "g++",
      "args": [
        "-g",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}.exe"
      ],
      "problemMatcher": {
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
          "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "message": 5
        }
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}

```

 保存这四个文件就配置完成了！

**再次强调：以后的C/C++代码文件必须放在这个Code文件夹里，或者说有.vscode文件夹的文件夹里，如果调试放在其他位置的代码文件会报错！**

**可以像我这样在Code文件中建多个文件夹分类存放代码。**

![751f2829cebc4432bdb60d5a04c707b0.png](https://s2.loli.net/2023/07/17/DzLvAfrsEZdjJHe.png)

如果上述流程你都完成了，那么现在你已经可以新建一个.c或者.cpp文件写代码测试一下你刚刚配置好的VSCode啦！（注意文件名也不能用中文！）

其他事项
----

### 1.中文显示乱码

这是个很常见的问题，所以帮别人配置的时候一般也会帮忙搞一下

首先点击左下角的齿轮按钮，打开Settings（设置）

![862ff2498ea74f98860f09e1779c9365.png](https://s2.loli.net/2023/07/17/laKsX4xjZYB8voM.png)

在搜索框中输入ecoding,然后如图把Encoding改成GBK （原来应该是UTF-8）

![7d3626a49b104c21a57886018fceee52.png](https://s2.loli.net/2023/07/17/3JezLmTUS1osydk.png)

设置完之后编辑有中文的文件就不会显示乱码啦！

2.在终端中运行
--------

如果不喜欢每次都弹出一个小黑框的话，可以选择在终端中运行，效果如图

![407b8a02a01741aa9fff3c26a33f9c51.png](https://s2.loli.net/2023/07/17/LeyNcCBpGaFSgxb.png)

这个设置也很简单，打开设置，搜索run in terminal ，找到这个选项打勾就可以啦

![10d4ee6d8d4d44318a67b099e35dcbd5.png](https://s2.loli.net/2023/07/17/HQu7WMs23bifLGY.png)

 之后就可以点击右上角这个按钮在下面的终端运行/调试，或者按快捷键Ctrl+Alt+N运行（个人比较喜欢）

注意在终端运行之前一定要先保存，否则运行的是保存之前代码（可以在File中勾选自动保存）

![681b100adaef416fa42626433da7b8f8.png](https://s2.loli.net/2023/07/17/Zh6eCbPo4Mwr7uO.png)

 当然也依旧可以选择按F5使用小黑框进行运行调试的

但是两个进程是冲突的，只是多了一种选择，是不可以同时用的！比如我正在终端运行代码的时候，再按F5调试代码就会出错

### 3.调试时显示“找不到g++”

首先检查一下是不是g++的安装路径或者文件名里面存在中文，如果存在中文需要把中文名改掉或者更换其他路径安装

如果不存在中文的话，右键点击VSCode的图标，选择“属性”

然后选择“兼容性”，勾选“以管理员身份运行此程序” ，然后依次点击“应用”，‘确定’即可（部分电脑需要选择这个选项）

![079b422a9a474c6a9998c8c44dfd3b44.png](https://s2.loli.net/2023/07/17/vItHeEUQ6baCcJ3.png)
