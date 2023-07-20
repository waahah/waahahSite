---
title: VScode运行Java时终端输出乱码
date: 2021-08-10 14:58:36
tags: [IDE, VScode,Java]
categories: [IDE, VScode]
---

### 前言
`java`运行时终端输出乱码

_**备忘录**_

###   说明  
前一阵子，使用`vscode`运行简单的`java`程序。因为比`idea`打开快捷方便点，写写小程序还是满舒服的。但是后来使用时发现会出现这种情况：”输入中文后，输出中文会乱码或者不显示”。这一看就是老问题了，编码问题。

### 解决办法  
从几个角度来进行寻找解决办法：**windows系统编码**，**vscode的文件编码**，**java运行时编码相关的参数设置**。
#### 1. windows系统编码：  
中国地区默认`GBK`，**我看见网上许多人说改为utf-8即可。我改了，没起作用，估计是我操作有问题。**
        
#### 2. vscode的文件编码  
`vscode`的文件`file.encoding`默认是`utf-8`。这是新建文件后默认的初始编码。  
(我试过无论文件编码是在UTF-8下还是GBK下，只要当前中文显示无乱码，在输出控制台后都没有乱码。比如`System.out.println(“来啊”)`)  
**暂时保持文件编码不变为`utf-8`。如果出现乱码就进行一下将其编码也改为`GBK`，与系统编码保持一致。**  
`vscode`设置当前文件的编码很简便，底部栏切换即可）  
![](https://s2.loli.net/2023/06/11/OEHJkDfzRNmWXvr.png)
        
#### 3 java运行时编码相关的参数设置  
在vscode里安装那几个插件后，一般运行`java`文件方式是`run without debugging`。我观察到在运行时，默认的编码是`utf-8`。  
![](https://s2.loli.net/2023/06/11/vqs9W3Yt8AhrnVb.png)  
但是考虑到vscode运行调用的是windows的`cmd`或者`powershell`终端，但是其运行终端编码使用`chcp`命令查询又是默认的UTF-8。知道中文的windows系统编码默认`GBK`的情况下，可以不用理会其终端为什么默认`UTF-8`，尝试将运行时的编码设置为GBK。  
#### 4. 打开`Run`下的`Open Configurations` 
![](https://s2.loli.net/2023/06/11/4eIxRk3Bmpy5EX7.png)  
#### 5. 添加编码参数` “encoding”: "GBK"`
![](https://s2.loli.net/2023/06/11/6umzfcHnhbeVlYM.png)  
再运行就发现乱码消失了
        
### 总结  
其他方法试了一些，只是没成功。这个解决方法的思路就是**将运行时的编码参数设置成与`windwos`编码一样都是GBK**，来实现中文输出的乱码问题，如果还是乱码再`vscode`的文件编码设置成`GBK`。至于为什么不把所有编码都设置为`UTF-8`，你懂的。  
建议还是`idea`，不必为这些问题烦心。
