---
title: Pyinstaller打包后无法获取当前路径
date: 2022-12-13 14:58:36
tags: [Python, Urllib, Error]
categories: [Coding, Python]
---

### 前言
pyinstaller 打包 cannot find path

在代码中需要获取当前路径下的文件，本来用的是下面的代码，在pycharm下一切正常

```python
path = sys.path[0]
```

可是打包后直接报错，类似于下面这样  
`ERROR: Can not find path /usr/lib/libSystem.B.dylib (needed by /Users/yao/opt/anaconda3/envs/DailyReport/bin/python3.7)`  
在网上一番查找后  
将代码改为

```python
path = os.getcwd()
```

打包正常了，也可以运行，只是路径只能获取到Users/yao这一级，也是不行，于是又是一番查找，终于解决  
**需要检查应用程序是作为脚本还是作为冻结的exe运行：**

```python
import os
import sys

# determine if application is a script file or frozen exe
if getattr(sys, 'frozen', False):
    path = os.path.dirname(sys.executable)
elif __file__:
    path = os.path.dirname(__file__)

```

参考：
- [https://www.imooc.com/wenda/detail/596941](https://www.imooc.com/wenda/detail/596941)

