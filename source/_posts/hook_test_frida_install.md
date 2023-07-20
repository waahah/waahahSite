---
title: Hook调试 - Frida 的安装
date: 2023-07-02 14:58:36
tags: [App, Frida, Hook]
categories: [Coding, Python]
---

Frida 的安装
=========

`Frida` 是一个基于 `Python` 和 `JavaScript` 的 `Hook` 与调试框架，是一款易用的跨平台 Hook 工具，无 论` Java` 层的逻辑，还是 `Native` 层的逻辑，它都可以 Hook。Frida 可以把代码插入原生 App 的内存空 间，然后动态地监视和修改其行为，支持 `Windows`、`Mac`、`Linux`、`Android`、`iOS` 全平台。

相关链接
---------------------------------------------------------------

*   官网：<https://frida.re/>
*   GitHub：<https://github.com/frida/frida>

安装
-----------------------------------------

### pip 安装

推荐使用 pip3 安装，命令如下：

```bash
pip3 install frida frida-tools
```

命令执行完毕之后即可完成安装。

验证安装
---------------------------------------------------------------

安装完成之后，可以在 Python 命令行下测试。

```python
$ python3
>>> import frida
```

如果没有错误报出，则证明库已经安装好了。

更多安装说明参考：<https://frida.re/docs/installation/>


