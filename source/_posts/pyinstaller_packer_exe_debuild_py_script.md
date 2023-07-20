---
title: Pyinstaller打包的exe之一键反编译py脚本与防反编译
date: 2022-11-29 14:58:36
tags: [Python, Pyinstaller]
categories: [Coding, Python]
---

Pyinstaller打包的exe之一键反编译py脚本与防反编译
-----------------------------------

今天教大家如何反编译exe文件。

这次以最近写的一篇gui《Python一键自动整理归类文件，GUI窗口程序拿来即用》为例进行演示。

地址：https://blog.csdn.net/as604049322/article/details/119619221

打包成单文件所使用的命令为：

```bash
pyinstaller -Fw --icon=h.ico auto_organize_gui.py --add-data="h.ico;/"

```

打包成文件夹所使用的命令为：

```bash
pyinstaller -w --icon=h.ico auto_organize_gui.py --add-data="h.ico;."

```

不管是哪种打包方式都会留下一个exe文件。

### 文章目录


首先我们需要从exe文件中抽取出其中的pyc文件：

🏆抽取pyinstaller打包的exe中的pyc文件
----------------------------

提取pyc文件有两种方法：

1.  通过 pyinstxtractor.py 脚本提取pyc文件
2.  通过 pyi-archive\_viewer 工具提取pyc文件

### 🛬pyinstxtractor.py 脚本提取pyc文件

pyinstxtractor.py 脚本可以在github项目[python](/search.html?type=0&ref=2&word=python)\-exe-unpacker中下载，地址：

<https://github.com/countercept/python-exe-unpacker>

下载该项目后把其中的`pyinstxtractor.py`脚本文件复制到与exe同级的目录。

然后进入exe所在目录的cmd执行：

```bash
python pyinstxtractor.py auto_organize_gui.exe

```

执行后便得到exe文件名加上`_extracted`后缀的文件夹：

![](https://s2.loli.net/2023/07/10/eUCflIXQSLEZv7h.png)

对两种打包方式产生的exe提取出的文件结构稍有区别：

![](https://s2.loli.net/2023/07/10/PmCaSqeoUzRc4Ty.png)

### 🛬pyi-archive\_viewer 工具提取pyc文件

pyi-archive\_viewer是PyInstaller自己提供的工具，它可以直接提取打包结果exe中的pyc文件。

详细介绍可参考官方文档：  
/en/stable/advanced-topics.html#using-pyi-archive-viewer

执行`pyi-archive_viewer [filename]`即可查看 exe 内部的文件结构：

```bash
pyi-archive_viewer auto_organize.exe

```

操作命令：

```bash
U: go Up one level
O <name>: open embedded archive name
X <name>: extract name
Q: quit

```

然后可以提取出指定需要提取的文件：

![](https://s2.loli.net/2023/07/10/Kis4J5tVQCplB7D.png)

要提取其他被导入的pyc文件，则需要先打开`PYZ-00.pyz`：

![](https://s2.loli.net/2023/07/10/9I1RhiyEbtwHJMv.png)

很显然，使用PyInstaller的pyi-archive\_viewer 工具操作起来比较麻烦，一次只能提取一个文件，遇到子模块还需执行一次打开操作。所以后面我也只使用pyinstxtractor.py 脚本来提取pyc文件。

🏆反编译pyc文件为py脚本
---------------

有很多对pyc文件进行解密的网站，例如：

*   /pyc/

不过我们直接使用 `uncompyle6` 库进行解码，使用pip可以直接安装：

```bash
pip install uncompyle6

```

uncompyle6可以反编译.pyc后缀结尾的文件，两种命令形式：

1.  `uncompyle6 xxx.pyc>xxx.py`
2.  `uncompyle6 -o xxx.py xxx.pyc`

以前面编码过程中生成的缓存为例进行演示：

```bash
uncompyle6 auto_organize.cpython-37.pyc>auto_organize.py

```

执行后便直接将.pyc文件反编译成python脚本了：

![](https://s2.loli.net/2023/07/10/Fg8YtBw9I7eNdoZ.png)

从编译结果看注释也被保留了下来：

![](https://s2.loli.net/2023/07/10/ZnuFTCtS4NUY9mb.png)

对于不是pyc后缀结尾的文件，使用uncompyle6反编译时会报出`must point to a Python source that can be compiled, or Python bytecode (.pyc, .pyo)`的错误。

所以我们需要先对提取出的内容人工修改后缀：

![](https://s2.loli.net/2023/07/10/Yt3NzARiOFDIKne.png)

### 🛬运行入口pyc文件反编译

对于从pyinstaller提取出来的pyc文件并不能直接反编译，入口运行类共16字节的 `magic` 和 `时间戳`被去掉了。

如果直接进行反编译，例如执行`uncompyle6 auto_organize_gui.exe_extracted/auto_organize_gui.pyc`

会报出如下错误：`ImportError: Unknown magic number 227 in auto_organize_gui.exe_extracted\auto_organize_gui.pyc`

使用支持16进制编辑的文本编辑器查看一探究竟，这里我使用`UltraEdit32`：

分别打开正常情况下编译出的pyc和从pyinstaller提取出来的pyc文件进行对比：

![](https://s2.loli.net/2023/07/10/8iBp95RJSoZeMb1.png)

可以看到前16个字节都被去掉了，其中前四个字节是`magic`，这四个字节会随着系统和python版本发生变化，必须一致。后四个字节包括时间戳和一些其他的信息，都可以随意填写。

我们先通过`UltraEdit32`向pyinstaller提取的文件添加头信息：

![](https://s2.loli.net/2023/07/10/V5r8RoJkq6u3Zmx.png)

选择开头插入16个字节后，只需要替换前4个字节为当前环境下的magic：

![](https://s2.loli.net/2023/07/10/c37nPhDjdG6zxgF.gif)

然后执行：

```
uncompyle6 auto_organize_gui.exe_extracted/auto_organize_gui.pyc>auto_organize_gui.py

```

执行后可以看到文件已经顺利的被反编译：

![](https://s2.loli.net/2023/07/10/olp9BgU7q5hNjuV.png)

### 🛬依赖性pyc文件反编译

考虑再反编译导入的其他依赖文件：

![](https://s2.loli.net/2023/07/10/AhFtjEr4NWZyQXC.png)

先用`UltraEdit32`打开查看一下：

![](https://s2.loli.net/2023/07/10/eiLkMSl1qHo23KB.png)

可以看到对于非入口运行的pyc文件是从12字节开始缺4个字节。

这里我们选择第13个字节再插入四个字节即可：

![235047802_15_2021113010492621.gif](https://s2.loli.net/2023/07/10/ZIRV67Nkpvfj9Si.gif)

然后再执行：

```bash
uncompyle6 auto_organize_gui.exe_extracted/PYZ-00.pyz_extracted/auto_organize.pyc > auto_organize.py

```

然后成功的反编译出依赖的文件：

![235047802_16_20211130104926208_wm.png](https://s2.loli.net/2023/07/10/Oj4bilapdGhPsnq.png)

代码与原文件几乎完全一致：

![235047802_17_20211130104926474_wm.png](https://s2.loli.net/2023/07/10/uInjCXqRvGSb5OB.png)

🏆批量反编译一个exe中的所有python脚本
------------------------

如果一个exe需要被反编译的python脚本只有3个以内的文件，我们都完全可以人工来操作。但是假如一个exe涉及几十个甚至上百个python脚本需要反编译的时候，人工操作未免工作量过于巨大，我们考虑将以上过程用python实现，从而达到批量反编译的效果。

### 🛬提取exe中的pyc

```python
import os
import sys
import pyinstxtractor

exe_file = r"D:/PycharmProjects/gui_project/dist/auto_organize_gui.exe"
sys.argv = ['pyinstxtractor', exe_file]
pyinstxtractor.main()
# 恢复当前目录位置
os.chdir("..")

```
```bash
[*] Processing D:/PycharmProjects/gui_project/dist/auto_organize_gui.exe
[*] Pyinstaller version: 2.1+
[*] Python version: 37
[*] Length of package: 9491710 bytes
[*] Found 984 files in CArchive
[*] Beginning extraction...please standby
[*] Found 157 files in PYZ archive
[*] Successfully extracted pyinstaller archive: D:/PycharmProjects/gui_project/dist/auto_organize_gui.exe

You can now use a python decompiler on the pyc files within the extracted directory

```

### 🛬预处理pyc文件修护校验头

```python
def find_main(pyc_dir):
    for pyc_file in os.listdir(pyc_dir):
        if not pyc_file.startswith("pyi-") and pyc_file.endswith("manifest"):
            main_file = pyc_file.replace(".exe.manifest", "")
            result = f"{pyc_dir}/{main_file}"
            if os.path.exists(result):
                return main_file

pyc_dir = os.path.basename(exe_file)+"_extracted"
main_file = find_main(pyc_dir)
main_file

```

读取从pyz目录抽取的pyc文件的前4个字节作基准：

```python
pyz_dir = f"{pyc_dir}/PYZ-00.pyz_extracted"
for pyc_file in os.listdir(pyz_dir):
    if pyc_file.endswith(".pyc"):
        file = f"{pyz_dir}/{pyc_file}"
        break
with open(file, "rb") as f:
    head = f.read(4)
list(map(hex, head))

```
```python
['0x42', '0xd', '0xd', '0xa']

```

校准入口类：

```python
import shutil
if os.path.exists("pycfile_tmp"):
    shutil.rmtree("pycfile_tmp")
os.mkdir("pycfile_tmp")
main_file_result = f"pycfile_tmp/{main_file}.pyc"
with open(f"{pyc_dir}/{main_file}", "rb") as read, open(main_file_result, "wb") as write:
    write.write(head)
    write.write(b"\0"*12)
    write.write(read.read())

```

校准子类：

```python
pyz_dir = f"{pyc_dir}/PYZ-00.pyz_extracted"
for pyc_file in os.listdir(pyz_dir):
    pyc_file_src = f"{pyz_dir}/{pyc_file}"
    pyc_file_dest = f"pycfile_tmp/{pyc_file}"
    print(pyc_file_src, pyc_file_dest)
    with open(pyc_file_src, "rb") as read, open(pyc_file_dest, "wb") as write:
        write.write(read.read(12))
        write.write(b"\0"*4)
        write.write(read.read())

```

### 🛬开始反编译

```python
from uncompyle6.bin import uncompile

if not os.path.exists("py_result"):
    os.mkdir("py_result")
for pyc_file in os.listdir("pycfile_tmp"):
    sys.argv = ['uncompyle6', '-o',
                f'py_result/{pyc_file[:-1]}', f'pycfile_tmp/{pyc_file}']
    uncompile.main_bin()

```

![235047802_18_20211130104926583_wm.png](https://s2.loli.net/2023/07/10/wLepCrl4fUi85Qh.png)

### 🛬完整代码

```python
#!/usr/bin/env python
# coding: utf-8

# 提取exe中的pyc
import os
import sys
import pyinstxtractor
from uncompyle6.bin import uncompile
import shutil

# 预处理pyc文件修护校验头
def find_main(pyc_dir):
    for pyc_file in os.listdir(pyc_dir):
        if not pyc_file.startswith("pyi-") and pyc_file.endswith("manifest"):
            main_file = pyc_file.replace(".exe.manifest", "")
            result = f"{pyc_dir}/{main_file}"
            if os.path.exists(result):
                return main_file

def uncompyle_exe(exe_file, complie_child=False):
    sys.argv = ['pyinstxtractor', exe_file]
    pyinstxtractor.main()
    # 恢复当前目录位置
    os.chdir("..")

    pyc_dir = os.path.basename(exe_file)+"_extracted"
    main_file = find_main(pyc_dir)

    pyz_dir = f"{pyc_dir}/PYZ-00.pyz_extracted"
    for pyc_file in os.listdir(pyz_dir):
        if pyc_file.endswith(".pyc"):
            file = f"{pyz_dir}/{pyc_file}"
            break
    else:
        print("子文件中没有找到pyc文件，无法反编译！")
        return
    with open(file, "rb") as f:
        head = f.read(4)

    if os.path.exists("pycfile_tmp"):
        shutil.rmtree("pycfile_tmp")
    os.mkdir("pycfile_tmp")
    main_file_result = f"pycfile_tmp/{main_file}.pyc"
    with open(f"{pyc_dir}/{main_file}", "rb") as read, open(main_file_result, "wb") as write:
        write.write(head)
        write.write(b"\0"*12)
        write.write(read.read())
    
    if os.path.exists("py_result"):
        shutil.rmtree("py_result")
    os.mkdir("py_result")
    sys.argv = ['uncompyle6', '-o',
                f'py_result/{main_file}.py', main_file_result]
    uncompile.main_bin()

    if not complie_child:
        return
    for pyc_file in os.listdir(pyz_dir):
        if not pyc_file.endswith(".pyc"):
            continue
        pyc_file_src = f"{pyz_dir}/{pyc_file}"
        pyc_file_dest = f"pycfile_tmp/{pyc_file}"
        print(pyc_file_src, pyc_file_dest)
        with open(pyc_file_src, "rb") as read, open(pyc_file_dest, "wb") as write:
            write.write(read.read(12))
            write.write(b"\0"*4)
            write.write(read.read())

    os.mkdir("py_result/other")
    for pyc_file in os.listdir("pycfile_tmp"):
        if pyc_file==main_file+".pyc":
            continue
        sys.argv = ['uncompyle6', '-o',
                    f'py_result/other/{pyc_file[:-1]}', f'pycfile_tmp/{pyc_file}']
        uncompile.main_bin()

```

调用：

```python
exe_file = r"D:/PycharmProjects/gui_project/dist/auto_organize_gui.exe"
uncompyle_exe(exe_file, True)

```

可以看到已经完美的反编译出exe其中的python脚本：

![235047802_19_20211130104926708_wm.png](https://s2.loli.net/2023/07/10/3ZbycSxjduDMYO6.png)

🏆如何防止自己打包的exe被反编译呢？
--------------------

只需在打包命令后面加上`--key`命令即可，例如文章开头的命令可以更换为：

```bash
pyinstaller -Fw --icon=h.ico auto_organize_gui.py --add-data="h.ico;/" --key 123456

```

> `123456`是你用来加密的密钥，可以随意更换。

该加密参数依赖tinyaes，可以通过以下命令安装：

```bash
pip install tinyaes

```

打包后再次执行反编译：

```python
exe_file = r"D:/PycharmProjects/gui_project/dist/auto_organize_gui.exe"
uncompyle_exe(exe_file, True)

```

结果只有入口脚本反编译成功，被依赖的脚本均被加密，无法直接被反编译：

![235047802_20_20211130104926864_wm.png](https://s2.loli.net/2023/07/10/tCPhQZO7zuEcbv1.png)

可以看到抽取的中间结果变成了`.pyc.encrypted`格式，无法直接被反编译：

![235047802_21_2021113010492783_wm.png](https://s2.loli.net/2023/07/10/tVyJZ7Wr2OGhufT.png)

可以看到，常规手段就无法直接反编译了。这个时候还想反编译就需要底层的逆向分析研究了，或者pyinstaller的源码完整研究一遍，了解其加密处理的机制，看看有没有破解的可能。
