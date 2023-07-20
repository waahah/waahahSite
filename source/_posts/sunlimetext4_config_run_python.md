---
title: Sublime Text4 配置、运行python
date: 2021-08-12 14:58:36
tags: [IDE, Sublime Text,Python]
categories: [IDE, Sublime Text]
---

### 前言
`win10` 系统下关于`sublime text 4` 怎么运行`python`

系统：`win10`

编辑器：`sublime TXT 4`

\---------------------------------

### 有两种方法可以在sublime中直接运行`python`代码。

#### 1. 非交互式程序写完代码保存后直接按`ctrl+B`，如只有输出的程序。

#### 2. 交互式程序需要下载`SublimeREPL`，如需要输入的的程序。

###  **1\. 非交互式程序**

#### 1. 设置：

工具(tool)-->编译系统(build-system)-->设置为自动，或者选择配置`python`

打开sublime text4--tools--build system--new build system
输入（*******为python安装路径，例：`"D:/anaconda3/python.exe"`）

```json
{
 "cmd": ["********","-u","$file"],
 "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
 "selector": "source.python",
}
```
保存在`sublime text4 --package--users`下
注意一下找安装路径（在写时要把 `\` 改成` /` ）


#### 2. 编辑代码
```python
print("hello python.")
```
保存为test.py

#### 3. 执行

按`ctrl+B`，可在sublime界面下方弹出结果。

![](https://s2.loli.net/2023/06/12/YvtKkUzchFmNWbE.png)

注：确保已经正确配置好python的环境变量（PATH）

### **2\. 交互式环境**

准备代码，保存为test.py
```python
msg = input("please input: ")

print("output: ", msg)
```
#### 1. 按ctrl+shift+p快捷键呼出一个输入框，输入`Install Package`，回车，在新出现的输入框里输入`SublimeREPL`安装。

#### 2. 点击Tools->sublimeREPL->python->python run current file，这时候就像`IDLE`一样，会弹出一个新的窗口，而且是可交互的，可以输入。

#### 3. 结果：

![](https://s2.loli.net/2023/06/12/3IfZjVtBz6nwvLh.png)

#### 4. 设置快捷键

点击`preferences->key bindings`

添加：

```json
{ "keys":["f5"],

"caption": "SublimeREPL: Python - RUN current file",

"command": "run_existing_window_command",

"args": {"id": "repl_python_run","file": "config/Python/Main.sublime-menu"}

}
```

重启sublime，现在可以直接按`F5`来运行。

  