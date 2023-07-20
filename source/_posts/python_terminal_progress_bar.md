---
title: 超酷炫Python 终端进度条
date: 2022-12-19 14:58:36
tags: [Python, Terminal]
categories: [Coding, Python]
---

### 前言

想象一下，在您使用 Python 开发了一个脚本，在下载某些文件的时候你一定会不时看看进度条，在写代码的时候使用进度条可以便捷的观察任务处理情况，或者还需要多久才能完成。

如果有加载屏幕或进度条指示剩余时间或使用百分比的剩余进度，就安心多了。我们可以使用 Python 来编写进度条。在本教程中，我们将了解如何使用 Python 在终端中创建进度条。

**先决条件**

对于本教程，我们将使用 Ubuntu 来运行我们的脚本。Ubuntu 是基于 Linux 的操作系统。在 Ubuntu 中已经安装了 Python，因此无需再次安装它们。遵循本教程，任何基于 Debian 的操作系统都不会出现任何问题。

如果您使用的是 Windows 操作系统，请确保您已安装 Python 并设置了环境变量，因为您需要从终端运行脚本。

**使用 Python 的进度条**

Python 是一种高级编程语言。并且可以用来实现几乎任何事情。Python 中有许多很酷的库来创建进度条。在本教程中，我们将看到其中的一些：

*   tqdm
    
*   alive\_progress
    
*   halo
    
*   yaspin
    

**1、TQDM**

`Tqdm` 是一个易于使用的库。特别是对于循环。它给出了循环的进度条。只需要两行代码，就完成了。

**安装**

点击终端并执行以下命令:

```
linuxmi@linuxmi /home/linuxmi/www.linuxmi.com`                             ⚡ pip3 install tqdm
```


![](https://s2.loli.net/2023/07/10/KSeucbr1AalZhJU.png)

**使用**

使用 tqdm 非常简单，只需要将它添加到 for 循环中，如下所示：
```python
from tqdm import tqdm
import time
for i in tqdm(range(20), desc = 'tqdm() Progress Bar'):
    time.sleep(0.1)
    # 这里有一些任务
    # 这里还有一些操作
    # Linux迷 www.linuxmi.coms
```
输出：

这里的 desc 是用于描述进度条的众多参数之一。例如，当获取一个文件时，它可以是“downloading”。

tqdm 可在任何平台（Linux、Windows、Mac、FreeBSD、NetBSD、Solaris/SunOS）、任何控制台或 GUI 中工作，并且还可以在 IPython/Jupyter Notebooks 中使用。

Tqdm 可以在代码中以多种方式使用。您应该查看官方文档了解更多代码片段和特性。

**2、ALIVE\_PROGRESS**

这是另一个带有炫酷动画的进度条库。Alive\_progress很神奇，因为在这里我们可以完全控制进度条，而且它可以被设置为动态。它比 tqdm 好很多，因为它有更多的功能，我们有不同的动画可供选择。

**安装**

点击终端并执行以下命令:

```
linuxmi@linuxmi /home/linuxmi/www.linuxmi.com`                             ⚡ pip3 install alive-progress
```


![](https://s2.loli.net/2023/07/10/TUzg3IE7CminR52.png)

**使用**

如果你有一个从互联网上下载文件的脚本，以下是一个示例代码:

```python
from alive_progress import alive_bar
import time
 
for i in range(3):
    with alive_bar(100, ctrl_c=False, title=f'下载 {i}') as bar:
         for i in range(100):
             time.sleep(0.02)
             bar()
```

其中 100 是进度的最大长度。ctrl\_c = False 表示当执行进度条中的代码时，CTRL + C 将不起作用 (CTRL + C用于在终端中终止任务)。当一个重要的任务正在执行，而您不希望用户终止该任务时，特别可以使用这个选项。缺省情况下为True。title是进度条的标题。

输出：

![](https://s2.loli.net/2023/07/10/hZi1uWMJcg6jElX.gif)

我们还可以修改进度条的主题，如下所示:

```python
from alive_progress import alive_bar
import time
 
for i in range(3):
    with alive_bar(100, ctrl_c=False, title=f'下载 {i}', bar='halloween', spinner='twirls') as bar:
         for i in range(100):
             time.sleep(0.02)
             bar()
```
输出：

![](https://s2.loli.net/2023/07/10/WS3N8GcbOhlKX72.gif)

可以从许多可用的主题中进行选择。你可以同时展示它们，然后选择最适合你的:

```python
from alive_progress.styles import showtime
showtime()
```
输出如下：

![](https://s2.loli.net/2023/07/10/DGL4g2crqKhFlwW.gif)

访问 GitHub 存储库获取更多详细信息。

**3、Halo**

Halo 更像是一个微调器，而不是加载屏幕。当操作需要较少时间时可以使用它。

**安装**

点击终端并执行以下命令：

```python
linuxmi@linuxmi /home/linuxmi/www.linuxmi.com`                             
⚡ pip3 install halo
```

![640 _2_.png](https://s2.loli.net/2023/07/10/goDWvxtAHlZw3cV.png)

**使用：**

```python
from __future__ import unicode_literals
import os
import sys
import time
 
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
 
from halo import Halo
 
success_message = '加载成功'
failed_message = '加载失败'
unicorn_message = '加载 unicorn'
 
spinner = Halo(text=success_message, spinner='dots')
 
try:
    spinner.start()
    time.sleep(1)
    spinner.succeed()
    spinner.start(failed_message)
    time.sleep(1)
    spinner.fail()
    spinner.start(unicorn_message)
    time.sleep(1)
    spinner.stop_and_persist(symbol='🦄'.encode('utf-8'), text=unicorn_message)
except (KeyboardInterrupt, SystemExit):
    spinner.stop()
```

输出如下：

![640 _3_.gif](https://s2.loli.net/2023/07/10/zux2r5hpk6CDVIA.gif)

查看 GitHub 存储库以获取更多信息。

**4、Yaspin**

您的命令行应用程序的另一个微调器库。在 Yaspin，我们有多种选择。它适用于比平时需要更多时间的操作。

**安装**

点击终端并执行以下命令：

```python
linuxmi@linuxmi /home/linuxmi/www.linuxmi.com`                             ⚡ pip3 install yaspin
```


![640 _3_.png](https://s2.loli.net/2023/07/10/LVFJpfUnoC15hsx.png)

**使用：**

```python
import time
from random import randint
from yaspin import yaspin
from yaspin.spinners import Spinners
 
with yaspin(text="Loading", color="yellow") as spinner:
    time.sleep(1)  # time consuming code
 
    success = randint(0, 1)
    if success:
        spinner.ok("✅ ")
    else:
        spinner.fail("💥 ")
         
  
with yaspin(Spinners.earth, text="Earth") as sp:
    time.sleep(1)                # time consuming code
 
    # change spinner
    sp.spinner = Spinners.moon
    sp.text = "Moon"
 
    time.sleep(1)  
     
 
     
with yaspin(text="Colors!") as sp:
    # Support all basic termcolor text colors
    colors = ("red", "green", "yellow", "blue", "magenta", "cyan", "white")
 
    for color in colors:
        sp.color, sp.text = color, color
        time.sleep(0.5)
```

输出如下：

![640 _4_.gif](https://s2.loli.net/2023/07/10/iaUvk5NHVoOPexY.gif)
