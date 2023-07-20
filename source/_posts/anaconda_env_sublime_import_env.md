---
title: anaconda环境创建+sublime导入环境
date: 2021-10-04 14:58:36
tags: [Sublime Text, Anaconda, Python]
categories: [IDE, Sublime Text]

---

### 前言

 anaconda环境创建+sublime导入环境

* [anaconda环境创建](#anaconda环境创建)
* [anaconda navigator](#anaconda navigator)
* [anaconda prompt](#anaconda prompt)
* [sublime导入环境](#sublime导入环境)

### anaconda环境创建


在anaconda中可以创建基于python版本的环境，这个环境是代码运行编译的环境。

代码运行环境也可以直接使用命令行来设置（`win + R` ==> `cmd`）但是这样会存在很大的问题。在开发项目时，不同的项目可能需要不同的环境，而且项目开发完成后，后续的维护仍需要在原环境下进行。

直接在电脑上进行环境的配置，过程复杂，不仅需要下载包，还有可能需要配置环境变量。而且不同的包之间也许会存在冲突，导致安装不成功，或运行代码出现问题。最大的问题是，一旦将环境配置崩溃，恢复起来相当麻烦。

在anaconda中配置环境就不会出现上述的问题，它相当于创建了一个虚拟环境。在这个虚拟环境中安装需要的包，即使将这个虚拟环境安装崩溃，也不会影响到其他虚拟环境和电脑本身的环境。

在anaconda中配置环境有两种方法，一是在`anaconda navigator`中进行环境的创建；一是在`anaconda prompt`中使用命令来创建环境。

### anaconda navigator

首先打开anaconda navigator，依次选择`environments`和`create`

![](https://s2.loli.net/2023/07/02/f6sy8xTZmqlMAU7.png)

然后选择python的版本，并给这个新环境命名

![](https://s2.loli.net/2023/07/02/AaGk4p17XyqlsoJ.png)

接下来在anaconda prompt中激活想要配置的环境，激活的命令如下，其中`environment\_name`是刚刚创建的环境的名字

```
conda activate environment_name

```

![](https://s2.loli.net/2023/07/02/rzNqk15xvHQwshZ.png)

最后需要什么包，就用命令安装什么包，安装命令如下，可以用`conda`也可以用`pip`

```
conda install pytorch
pip install pytorch

```

![](https://s2.loli.net/2023/07/02/g3ep7kTLsI8Sih5.png)

### anaconda prompt

首先打开anaconda prompt，然后输入如下命令来创建环境。这里是创建了一个名为pytorch的环境，并且这个环境是基于`python3.6`的

```
conda create -n pytorch python=3.6

```

![](https://s2.loli.net/2023/07/02/BJhsMjfqye5gD8K.png)

接下来和上面一样，激活环境，安装环境依赖的包

如果所运行的代码中存在环境配置的信息，例如`env.yml`，那么可以执行下面的代码来创建环境

```
conda create -f env.yml

```

创建完环境，安装完需要的包后，可以在anaconda navigator中查看安装的包，或者在anaconda prompt中输入如下命令来查看安装的包

```
conda list

```

### sublime导入环境

配置好代码运行的环境后，就要在这个虚拟环境中开始执行代码。我用的代码编译器是sublime，接下来就是把环境带入到sublime中。

首先打开sublime，在从工具栏（Tools）中选择`Build System`，在下拉菜单中选择`New Build System`，然后输入如下代码

```
{
    "cmd": ["/path/to/python", "-u", "$file"],
    "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
    "selector": "source.python"
}

```

将/path/to/python改为刚才配置的环境中python.exe的地址，通常在anaconda文件夹的`envs`中的环境文件夹中可以找到

然后将刚刚的文件保存在默认文件夹中（./Sublime Text 3/Packages/User）并命名，这个名字就是配置的环境在sublime中的名字

最后在工具栏（Tools）中的`Build System`中选择刚刚导入的环境，这样在运行代码时，所依赖的环境就是我们配置的环境。

