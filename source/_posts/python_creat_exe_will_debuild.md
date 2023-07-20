---
title: 对Python生成的EXE文件进行反编译
date: 2022-10-31 14:58:36
tags: [Python,Uncompyle, Wxmedit]
categories: [Coding,  Python]
---

### 源代码误删？小问题，只要没有经过加壳操作，反编译一下吧

*   [我使用的python版本 Python 3.8.8](#python_Python)
*   [第一步 准备需要的软件](#)
*   [第二步 进行反编译](#)
*   [以上方法反编译没有加壳的python生产的exe文件](#pythonexe)

我使用的python版本 Python 3.8.2
======================================

第一步 准备需要的软件
======================================

下载Ming Loh的python反编译项目  
链接: [https://github.com/countercept/python-exe-unpacker](https://github.com/countercept/python-exe-unpacker).  
下载编辑16进制的软件 wxmedit  
官网:[http://wxmedit.github.io/zh\_CN/downloads.html](http://wxmedit.github.io/zh_CN/downloads.html).  
蓝奏云  
链接: https://zzcwhair.lanzous.com/b015dcq1e  
密码:fjlc

第二步 进行反编译
======================================

查看反编译软件的目录  
![](https://s2.loli.net/2023/07/09/gUOhDbs8iWVpKGw.png)

再这里面运行 cmd界面  
python pyinstxtractor.py xx.exe  
![](https://s2.loli.net/2023/07/09/miHfyWw4ZIot6RG.png)

这是运行成功界面  
![](https://s2.loli.net/2023/07/09/xKOvVer5En9PTfY.png)
然后你会发现目录下多了个文件夹  
![](https://s2.loli.net/2023/07/09/aiYkMPQOw9ephtL.png)

进去文件夹后 找到你的软件名称 我这里是修改过了 之前的软件名称是pldc  

![](https://s2.loli.net/2023/07/09/VvC7UwJImKf9nr2.png)
好了 到了这里 就用开始下载的16进制的软件打开这两个文件 进行对比  
![](https://s2.loli.net/2023/07/09/cFvkHsP43fw8Mlz.png)

![](https://s2.loli.net/2023/07/09/6bTAUzpdNBnLaxH.png)
具体什么意思我也不是很懂 看了很多文章说 前面代表版本啥啥啥的 我就不解释了 按下面操作吧  
现在对比 struct 跟 pldc 可以看到 struct 比 pldc 多了一些东西 所以不要慌 给这两个文件复制一下 放到桌面做个备份 免得下面的操作 没实现 就麻烦了  
**以下是我自己操作的过程图 选择查看**  
![](https://s2.loli.net/2023/07/09/CL2lgeTkHv4PJMd.png)

复制后 直接粘贴过去  
![](https://s2.loli.net/2023/07/09/Izfe1CJ39DVRq7s.png)
但是你会发现粘贴的跟你复制的不一样 其实 叫你这样复制 不是为了直接复制过来 因为这个软件我也没搞懂换行跟别的 所以就复制过来了

小问题不要慌 去struct 里面 按ctrl+C 复制一下 再粘贴过来  
![](https://s2.loli.net/2023/07/09/iLcn324VHCAbkwr.png)

![](https://s2.loli.net/2023/07/09/bBlHNie29aoKWft.png)
上面 有几张图是我自己操作过程中 发现没办法换行去增加16进制 所以找的一个蠢方法

**最终的结果图**  
![20200419160519448.png](https://s2.loli.net/2023/07/09/l34a5VBdDk2nmLo.png)

到了这一步 那么老铁 直接保存 然后更改pldc的后缀为 pldc.pyc  
![20200419160732969.png](https://s2.loli.net/2023/07/09/TVMtrzyiQ1Uac4G.png)
然后再终端pip install uncompyle安装uncompyle，  
uncompyle6 pldc.pyc  
![20200419161641220.png](https://s2.loli.net/2023/07/09/BU7co3AQ5ESHRVf.png)
uncompyle6 pldc.pyc > pldc.py  
![20200419161152290.png](https://s2.loli.net/2023/07/09/cVkuPdbZGH5xSO9.png)

废话有点多 将就着看  
python版本是  
Python 3.8.2 (tags/v3.8.2:7b3ab59, Feb 25 2020, 23:03:10) [MSC v.1916 64 bit (AMD64)] on win32  
Type “help”, “copyright”, “credits” or “license” for more information.

别的版本不知道能不能成

### 以上方法反编译没有加壳的python生产的exe文件



