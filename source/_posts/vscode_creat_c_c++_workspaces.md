---
title: VScode建立C/C++工作区，断点调试
date: 2023-07-30 14:58:36
tags: [C++, VScode, Test]
categories: [Coding, C++]
---

### 前言

*   本文基于Windows系统

* * *

我的编程之路与大多数人一样，是通过大学中的第一门编程课“C语言”开始的

那时候，老师推荐的是两款轻量级的C语言编译器：Dev C++，Visual C++ 6.0，这两款C语言编辑器确实容易上手，但是

1.  VC 6.0是1998年的古老产品，在如今流行的操作系统中有各种兼容问题，我一开始就抛弃了它
2.  Dev C++对于新手学习C语言是个不错的工具，但是通过它上手C语言后，由于它提供的功能着实有限，无法满足我日益增长的需求，我就像个渣男一样打算把她抛弃了
3.  后来通过网络了解到有一个功能十分强大的C语言标准IDE：Visual Studio，但是这玩意版本太多，体量庞大，一个C语言刚刚入门的学习者使用Visual Studio就像大炮打蚊子，没必要；也像小屁娃子耍大刀，力不从心；Visual Studio着实让那是刚刚入门编程的我眼花缭乱、头晕眼花，于是最终还是回到了Dev C++的怀抱

直至今日，微软推出的**VSCode**逐渐流行起来，尝试下载使用之后，发现体验非常不错；

**VSCode**虽然只内置了JavaScript, TypeScript 和 Node.js，但是它有非常丰富的其他语言的插件扩展系统

> It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity).

遂打算使用**VSCode**配置C/C++环境，满足我偶尔的C语言编程需要，同时也将这个过程记录下来，希望能帮助大家

目录一：Microsoft C/C++ extension
===============================================================================================

1.  打开VSCode
2.  点击侧边栏的**Manage extensions**图标  

3.  搜索**C/C++**，点击**install**即可  

在 [C/C++ for Visual Studio Code (Preview)](https://code.visualstudio.com/docs/languages/cpp) 中，明确说明此插件不包括C++编译器或调试器，需要下载C++编译器（除非你电脑上已经有C++编译器）

> The C/C++ extension does not include a C++ compiler or debugger. You will need to install these tools or use those already installed on your computer.

目录二：GCC via Mingw-w64 on Windows
==================================================================================================

第一步：下载Mingw-w64
---------------------------------------------------------------------------------

对于Window用户，官方推荐了两个C++编译器（补充：C++兼容C）：

*   [官方文档：GCC via Mingw-w64 on Windows](https://code.visualstudio.com/docs/cpp/config-mingw)
*   [官方文档：Microsoft C++ compiler on Windows](https://code.visualstudio.com/docs/cpp/config-msvc)

我选择下载的是**GCC via Mingw-w64 on Windows**，

*   [官方下载链接](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z/download)，等待5秒即可下载，下载的是一个压缩包
*   [蓝奏云链接：x86\_64-8.1.0-release-posix-seh-rt\_v6-rev0.7z](https://www.lanzous.com/iafyh2d)
*   注意：Mingw-w64下载解压后，存放的文件夹路径名中不能出现空格！

假设安装在：`D:\mingw-w64`

目录三：建立C++工作区
==============================================================================

**一：**新建一个文件夹用于存放你编写的c++代码，位置自己决定，不建议放到桌面

我直接将文件夹取名为 **C++**

**二：**用VSCode打开C++文件夹

1.  最干脆的办法：选中文件夹 > 鼠标右键 > 通过Code打开
    
2.  如果VSCode没有注册到你的右键菜单中，你就老老实实的打开VSCode > file > open folder
    

![20200322113839367.png](https://s2.loli.net/2023/07/17/UndJyuKFQ6zbtvR.png)

**三：**在工作区C++中先创建一个c++文件，保证后续操作的成功

![20200322114044588.png](https://s2.loli.net/2023/07/17/KYMkFluEGonv87j.png)

**四：**生成tasks.json文件

**tasks.json文件调用g ++编译器，基于源代码（c++文件）创建可执行文件（exe文件）**

主菜单中选择Terminal > Configure Default Build Task  
![20200322111549466.png](https://s2.loli.net/2023/07/17/EONeBrniCT1546g.png)

在下拉列表中，列出了C ++编译器的各种预定义构建任务，

选择**g++.exe build active file**  
![20200322114150775.png](https://s2.loli.net/2023/07/17/RUzZkN5s8iXEeW4.png)
那么，VSCode会自动在工作区下生成tasks.json文件，放在.vscode文件夹下  
![20200322114334243.png](https://s2.loli.net/2023/07/17/PGiEVx8M3bgNeA5.png)
一般，需要在args数组中加入编码设置，不然中文输出是乱码

```ini
"-fexec-charset=GBK"

```

**四：**编译c++代码

假设我要运行test.cpp

1.  回到test.cpp窗口  
    ![2020032211524847.png](https://s2.loli.net/2023/07/17/VC3mveziF1cnYKf.png)
2.  Terminal > Run Build Task  
    生成可执行文件  
    ![](https://img-blog.csdnimg.cn/20200322115856722.png)  
    并且在代码编辑去下方出现集成终端面板  
    ![20200322115856722.png](https://s2.loli.net/2023/07/17/8KqAIgvDpFZRhBf.png)

**五：**执行c++代码

在VSCode中运行可执行文件，VSCode会提示你安装PowerShell插件，按照提示安装即可

这里大概率会遇到一个问题：无法加载文件 \*\*\*\*\*\*.ps1，因为在此系统中禁止执行脚本  
你可以看一下[我找到的一篇文章，清晰明了的讲解原因并给出了解决办法](https://www.jb51.net/article/95022.htm)

1.  在集成终端面板中，打开PowerShell终端  
    ![20200322120807492.png](https://s2.loli.net/2023/07/17/nZ4SNh9yCvVeWXc.png)
    点击 + 即可
    
2.  在终端中输入`.\test.exe`  
    ![20200322120905446.png](https://s2.loli.net/2023/07/17/am7tD4kIXbvcLiK.png)
    回车
    

**六：**一次性编译多个C++源文件

默认生成的**tasks.json**文件，一次只能编译当前C++源文件，

将**tasks.json**文件中：args数组中的`"${file}"`改为`${workspaceFolder}\\*.cpp`，可以一次性编译工作区下所有C++源文件

目录四：建立C工作区
============================================================================

与上述操作重复度极高

1.  要么重复上述操作，但是要选择**gcc.exe build active file**  
    ![202003221241251.png](https://s2.loli.net/2023/07/17/KSYUgGnj4oVRMcf.png)
2.  要么直接修改C++工作区中tasks.json文件中的两个值

`"label": "g++.exe build active file"`改为`"label": "gcc.exe build active file"`；

`"command": "mingw64路径\\bin\\g++.exe"`改为`"command": "mingw64路径\\bin\\gcc.exe"`

> mingw64路径：你安装mingw64的路径，记得要写双斜杠

目录五：Debug
===========================================================================

**一：**生成launch.json文件

启动GDB调试器

打开VSCode，Run > Add Configuration…  
选择**C++（GDB/LLDB）**  
![20200322154304606.png](https://s2.loli.net/2023/07/17/njkYh3yx82tfvZm.png)

*   **如果是C工作区**，在下拉列表中选择：**gcc.exe build and debug active file**  
    ![20200322154451549.png](https://s2.loli.net/2023/07/17/72axMKm3tPkvqb9.png)
*   **如果是C++工作区**，在下拉列表中选择：**g++.exe build and debug active file**

那么，VSCode会自动在工作区下生成launch.json文件，放在.vscode文件夹下  
![20200322154738747.png](https://s2.loli.net/2023/07/17/Oj2fqVGtLENRl1e.png)

*   默认情况下，C ++扩展不会在源代码中添加任何断点，  
    将`"stopAtEntry"`的值改为`true`，在启动调试时使调试器在main方法上停止
*   `"cwd": "${workspaceFolder}"`，调试程序时的工作目录为工作区文件夹；值改成`${fileDirname}`可变为文件所在目录

![20200322202818522.png](https://s2.loli.net/2023/07/17/EW7oFIRGjJMsNh8.png)

目录六：简单讲讲 Microsoft C/C++ extension 的 Details
==============================================================================================================

点击VSCode的插件管理中的**C/C++**  
![2020031915032963.png](https://s2.loli.net/2023/07/17/1sjaNo78BmXhzJn.png)

![20200319151254779.png](https://s2.loli.net/2023/07/17/Qhmsa1gUtyY5FLN.png)

*   这个扩展插件是一个在github上开源的项目
*   **Repository**，插件在github上的仓库
*   **Issues**，插件在github上的问题讨论区，可以提交bug、提交解决方案
*   **Documentation** 文档，其实指向的网页就是VSCode官方文档对此扩展插件介绍的子页面
*   **Code Samples** 代码示例，我们可以通过github看到插件的新特性

> This sample is a simple C++ program that computes and outputs the volume of a box.  
> We use this example in our blog posts to illustrate new extension features.

*   **Offline Installers** 脱机安装程序，名字可能不好理解，其实就是在VSCode中安装插件失败了，请直接到github上把插件下载下来，手动安装打VSCode中

![20200319155247960.png](https://s2.loli.net/2023/07/17/skoGxEVc2eZCTaO.png)
Visual Studio Live Share 是正在推广中的一个插件，直接跳过

然后 Overview and getting started，Quick links，Questions and feedback，就是上面提到的网站的细化导航

Offline installation，教你如何手动安装此插件

Microsoft Open Source Code of Conduct，微软开源准则

Data and telemetry，这个插件会收集用户的数据，传给微软用来改善用户体验，反正我是无所谓的

> This extension collects usage data and sends it to Microsoft to help improve our products and services.

* * *

参考文章：

*   [VSCode官方文档](https://code.visualstudio.com/docs)
*   [microsoft/vscode-cpptools](https://github.com/microsoft/vscode-cpptools)
