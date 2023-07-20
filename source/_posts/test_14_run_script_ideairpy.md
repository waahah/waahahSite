---
title: 测试十四、在 AirtestIDE运行.air脚本和.py脚本的区别
date: 2023-01-20 14:58:36
tags: [Python, Airtest, Poco, Test, Selenium]
categories: [Coding, 测试]
---

十四、在 AirtestIDE运行.air脚本和.py脚本的区别[¶](about:blank#airtest-seleniumweb "Permanent link")
=================================================================================

1）运行命令的区别¶
-----------------------------------------

首先我们对比下运行 `.air` 脚本和 `.py` 脚本的命令有什么不同：

```shell
# 在IDE运行.air脚本的命令
"D:\demo\AirtestIDE-win-1.2.12\AirtestIDE\AirtestIDE" runner "D:\test\song.air"  --device android://127.0.0.1:5037/127.0.0.1:7555?cap_method=MINICAP&&ori_method=MINICAPORI&&touch_method=MINITOUCH --log "D:/test/test01\0d86098ed0cd4a54c8c611578a3d71b7"

# 在IDE运行.py脚本的命令
"D:\demo\AirtestIDE-win-1.2.12\AirtestIDE\AirtestIDE" pyrunner "D:\test\song.py" 
```

可以看到，在IDE运行 .air 脚本，会自动帮我们传入设备窗口连接的设备信息，并且在默认的log存放路径下保存运行的log内容；

但运行 .py 脚本就只是单纯地运行了1个 .py 文件，并未帮我们在命令中传入任何设备信息或者保存log的信息。

这就意味着，在IDE中运行 .py 脚本，连接设备和保存log的工作要我们自行在 .py 脚本中处理。

2）初始化脚本的区别¶
-----------------------------------------

这也就意味着，.air 和 .py 的初始化脚本是不一样的。.air 脚本的初始化语句仅使用下述脚本即可：

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *

auto_setup(__file__)
```

即使 `auto_setup` 接口里面不传入任何参数，IDE也会在运行脚本时自动帮我们用命令连接设备并且保存`log`内容。无需我们额外处理，非常简单省事。

但 .py 的初始化脚本却不同：

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *
from airtest.cli.parser import cli_setup

if not cli_setup():
    auto_setup(__file__, logdir=True, devices=["android://127.0.0.1:5037/127.0.0.1:7555?cap_method=MINICAP&&ori_method=MINICAPORI&&touch_method=MINITOUCH",])
```

这段初始化代码的意思是说，当使用 `python xxx.py` 来运行本文件，不带任何命令行参数时，则自动使用 `auto_setup` 这个接口来对airtest相关的参数进行初始化。这里的 auto_setup 接口里面，设置了 `logdir=True` ，即在当前脚本目录下保存log内容，方便后续生成airtest报告；devices 传入了1个设备列表，里面包含1台端口号为`7555`的`mumu模拟器`，即表示当前脚本会在这台设备上面运行。

在脚本里面处理好了期望的参数，我们就能直接用 python xx.py 指令来运行脚本。而原先的 `airtest run xx.air --devices xx` 也不受影响，只要脚本检测到传入了命令行参数，就依然优先使用命令行参数来初始化airtest。

> 注意
----
> 所以我们非常建议新手同学使用 .air 脚本而不是 .py 脚本，当然，如果同学们已经非常熟悉俩者的区别，可以轻松地在 .py脚本中添加必要的参数，也可以使用 .py 脚本来编写我们的自动化脚本。

3. 运行脚本的注意事项¶
---
1. 请勿随意删除初始化脚本¶

在IDE新建 .air 或者 .py 脚本时，都会自动帮我们插入一些初始化代码，请同学们务必不要轻易删除这些初始化代码，以免影响脚本的正常运行。

2. 注意区分正式运行和只运行选中代码¶

点击 运行按钮 运行脚本，与 只运行选中代码 的差别是很大的，点击 运行按钮 运行脚本，IDE可以帮助我们保存log内容，方便后续生成airtest报告；但 只运行选中代码 就只是简单的调试了一下脚本，IDE并不会帮助我们保存log内容，也就不能直接生成airtest报告了。

3. 设置本地Python环境运行脚本无高亮显示¶

上文中我们也有提到，使用IDE自带的python环境在运行脚本过程中，IDE的脚本编辑窗口会用高亮显示当前运行到了哪一条脚本；但如果在IDE中设置了本地python环境来运行脚本，将不会高亮显示当前运行到了哪一句脚本。
