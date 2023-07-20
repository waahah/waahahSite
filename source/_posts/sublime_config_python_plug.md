---
title: 对Sublime Text进行python相关配置 
date: 2021-10-30 14:58:36
tags: [Sublime Text, Plug ]
categories: [IDE, Sublime Text]


---

### 前言

前言:最近`Anaconda3 (64-bit)`的`Spyder`运行超级缓慢,每打开`Spyder`就只能运行一次,之后再怎么点击运行都是无动于衷,迫不得已,只能用sublime text4来配置python进行使用.

以下我是找了网上相关资料,并且有效/有用的资料,具体如下:

### 1.Sublime Text 的注册码

Sublime Text 3的注册码 个人记录,便于查找,找了n多个版本就以下版本可以使用.

适用于Sublime Text3同时也适用于Sublime Text4

```
ZYNGA INC.
50 User License
EA7E-811825
927BA117 84C9300F 4A0CCBC4 34A56B44
985E4562 59F2B63B CCCFF92F 0E646B83
0FD6487D 1507AE29 9CC4F9F5 0A6F32E3
0343D868 C18E2CD5 27641A71 25475648
309705B3 E468DDC4 1B766A18 7952D28C
E627DDBA 960A2153 69A2D98A C87C0607
45DC6049 8C04EC29 D18DFA40 442C680B

1342224D 44D90641 33A3B9F2 46AADB8F

```

### 2.安装Package Control

Package Control说白了就是一个类似插件管理包的小工具，这个使用起来非常的方便。  
**方法1:手动安装**

可能由于各种原因，无法使用代码安装，那可以通过以下步骤手动安装Package Control：

1.点击Preferences _\>_ Browse Packages菜单

2.进入打开的目录的上层目录，然后再进入Installed Packages/目录

3.下载[Package Control.sublime-package](https://sublime.wbond.net/Package%20Control.sublime-package)并复制到Installed Packages/目录

4.重启Sublime Text。  
参考链接:[怎么用sublime text 3搭建python 的ide](https://www.zhihu.com/question/22904994)

> 我用得是方法1,有效

**方法2:简单安装**  

![](https://s2.loli.net/2023/07/02/XQh1Mo2RD3twIpe.webp)


安装完毕后我们看到弹出了安装成功的界面。  

![](https://s2.loli.net/2023/07/02/nQBfHK9pubdzsW7.webp)


参考链接:[对Python来说，是Sublime Text还是Notepad++，这是个问题！](https://mp.weixin.qq.com/s?src=11&timestamp=1536842968&ver=1120&signature=*WBmTqannUkJguk9ySE*3CSbxn22oHF22Ajrd8zZb6zDIBNyx9qgzYmG5UxGgpujq5nD99KjcBs4Xkjwrx7aOlManKI8T3UUd-y4*2Wnuv5a1I8EHOWDMQCgZREh6KhT&new=1)

> 方法2暂时没试过,仅供参考

### 3.设置中文界面

我们下载好的Sublime Text3是英文界面的（版本 V3.0），使用起来不是很方便，调整成中文的吧。

在 “Preferences\\Package Control”中我们选择安装”install package”，如下图：  

![](https://s2.loli.net/2023/07/02/3RCfLHqSQoOPlu5.webp)


在弹出的窗口中输入”localization”，如下图：  

![](https://s2.loli.net/2023/07/02/RqOgGWcQPEx9zw5.webp)


然后等待安装插件。看变成中文界面了，是不是很神奇啊！  

![](https://s2.loli.net/2023/07/02/uXmTQ3RpP9qoy6z.webp)


如果你还想调回英文，请在”帮助/Language”中进行调整。  
参考链接:[对Python来说，是Sublime Text3还是Notepad++，这是个问题！](https://mp.weixin.qq.com/s?src=11&timestamp=1536842968&ver=1120&signature=*WBmTqannUkJguk9ySE*3CSbxn22oHF22Ajrd8zZb6zDIBNyx9qgzYmG5UxGgpujq5nD99KjcBs4Xkjwrx7aOlManKI8T3UUd-y4*2Wnuv5a1I8EHOWDMQCgZREh6KhT&new=1)

### 4.Python编辑器设置

这里我选择了3个较为常见的插件，实际上关于Python的插件有很多很多，选择一个适合自己的才是正确的。当然我还是那句话，最为轻量级的程序编辑器要想实现多么复杂的功能不太现实，选择它就是为了快。

#### 4.1安装Anaconda插件

Anaconda是一个插件，它将您的SublimeText 3转换成一个丰富的Python开发编辑器，它可以提高您的工作效率，并帮助您确保代码的质量和风格。

**Anaconda插件共性设置**  
我们可以在”首选项\\Package Control”进行下载安装，如下图：  

![](https://s2.loli.net/2023/07/02/G5JK847z1VMwZm6.webp)


安装完毕后如下图：  

![](https://s2.loli.net/2023/07/02/TDHr8mcPYduZsNR.webp)


因为我在安装Python的时候默认是将Python的可执行程序加入到系统的环境变量当中的，即我在命令行中输入Python的时候是不会报错的，如：  

![](https://s2.loli.net/2023/07/02/WHGbNmuDnAtofYc.webp)

如果你没有将Python的可执行程序增加到系统环境变量中，需要设置，在”首选项\\Package Settings\\Anaconda\\Settings-Default”里。跳出的设置里面，搜索python\_interpreter，将其对应的值改成Python对应的可执行程序。如：**C:/Python/Python35-32/python.exe**

**Anaconda插件个性设置**

为了更好的使用Anaconda插件，我们可以再做一些个性化的设置，我们在”首选项\\Package Settings\\Anaconda\\Settings-User”里面设置。例如：

```
{
    //忽略各种空格不对, 超过80字, import的函数没有使用的提醒,
    "pep8_ignore": ["E501", "W292", "E303", "W391", "E225", "E302", "W293", "E402"],
    "pyflakes_explicit_ignore":
    [
        "UnusedImport"
    ],
    //保存文件后自动pep8格式化
    "auto_formatting": true,
    //库函数的提示
    "enable_signatures_tooltip": true,
    "merge_signatures_and_doc":true,
    "anaconda_linting": false,
}

```

sublime text3设置的结果如下:

  

![](https://s2.loli.net/2023/07/02/tgGZNC27U4HsyXY.webp)

![](https://s2.loli.net/2023/07/02/qsINVa5kSRzu9Bj.webp)

  

来看看效果啊!


![](https://s2.loli.net/2023/07/02/2P7EJxpdby4NGL6.webp)

#### 4.2代码自动提示插件SublimeCodeIntel

安装方式和Anaconda一样，在”首选项\\Package Control”选择安装”install package”，在弹出的窗口中输入”SublimeCodeIntel”，搞定。

![](https://s2.loli.net/2023/07/02/8Eh2cq4FfXOLoRb.webp)

  

这个插件同样需要简单的配置一下。具体在这个地方配置，如下图：

  

![](https://s2.loli.net/2023/07/02/QjroKD5RLlMyP9v.webp)

  

我们在配置文件里面写上如下图所示的内容。

```
{
    "python":{
        "python":"C:/Users/Administrator/AppData/Local/Programs/Python/Python35-32/python.exe",
        "pythonExtraPaths":[
            "C:/Users/Administrator/AppData/Local/Programs/Python/Python35-32",
            "C:/Users/Administrator/AppData/Local/Programs/Python/Python35-32/DLLs",
            "C:/Users/Administrator/AppData/Local/Programs/Python/Python35-32/Lib",
            "C:/Users/Administrator/AppData/Local/Programs/Python/Python35-32/Lib/site-packages",

        ]
    }
}

```

注意：Python的路径一定要写上自己电脑上安装的路径，可不能直接复制粘贴。  
比如我的设置如下:

  

![9945523-c67757c9dbf8f5c0.webp](https://s2.loli.net/2023/07/02/sq1RdCfT7iHtlwz.webp)

我们来看看效果，很强大！

![](https://s2.loli.net/2023/07/02/28Dbri4EywlM7NF.webp)

#### 4.3SideBarEnhancements插件

安装方式和Anaconda一样，在”首选项\\Package Control”选择安装”install package”，在弹出的窗口中输入”SideBarEnhancements”，搞定。

然后”项目”菜单栏中，”打开项目”就能显示侧边栏进行有效的项目管理了，如下图：

  

![9945523-20590e81dfe8e2e6.webp](https://s2.loli.net/2023/07/02/sGnoJcV4yvhxYBk.webp)

  

单击右键也能进行一些简单的项目管理功能，如下图：

  

![](https://s2.loli.net/2023/07/02/JzbEjRDywrAIHvB.webp)

### 5.如何运行Python程序

话说了那么多，我用Sublime Text3该怎么运行Python程序呢？

使用系统自带的**Ctrl+B**运行Python程序，一般没有什么问题。但是一旦遇到需要输入内容的时候就抓瞎了。所以这里推荐安装**SublimeREPL插件。**

**SublimeREPL插件**  
安装方式和Anaconda一样，在”首选项\\Package Control”选择安装”install package”，在弹出的窗口中输入”SublimeREPL”，搞定。

为了更好的显示效果，我们还需要将整个编辑器分屏一下，如下图：

  

![](https://s2.loli.net/2023/07/02/HBe6A2XsUjQJr7x.webp)

  

我们来试试效果：

  

![](https://s2.loli.net/2023/07/02/M3PQTqA4EJBUxvX.webp)


如我所愿，成功运行Python程序。

但，还是有问题，不能每次运行程序都去菜单里面点击吧，还是设置一个快捷键吧！

**SublimeREPL插件快捷键设置**

我们在”首选项\\快捷键设置”里面进行设置，如下：

```
[
 {"keys":["f1"],
"caption": "SublimeREPL: Python",
"command": "run_existing_window_command", "args":
{"id": "repl_python",
"file": "config/Python/Main.sublime-menu"}}
,
{"keys":["f2"],
"caption": "SublimeREPL: Python - RUN current file",
"command": "run_existing_window_command", "args":
{"id": "repl_python_run",
"file": "config/Python/Main.sublime-menu"}}
]

```

![](https://s2.loli.net/2023/07/02/mWL57eXMRZTUCQt.webp)

  

设置完成后，我们再来看看效果！（F1/F2是快捷键）

* F2快捷键的作用:运行当前代码

    

  ![](https://s2.loli.net/2023/07/02/T9IyYKOENkciq8w.webp)

    

  这里需要备注一下:需要提醒一下,按F2之前,需要将鼠标点在当前需要运行的文件,否则会出现运行错误.具体如下截图

    

  ![](https://s2.loli.net/2023/07/02/ACcoQtxJXRB9hfd.webp)

* F1快捷键的作用:使sublime text3相当于图片右边的python的作用

    

  ![](https://s2.loli.net/2023/07/02/4kvycCehJGb2XSl.webp)

参考链接:

- [怎么用sublime text 搭建python 的ide](https://www.zhihu.com/question/22904994)