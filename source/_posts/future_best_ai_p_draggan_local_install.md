---
title: 未来最理想的AI P图软件——DragGAN 抢先体验与本地部署教程
date: 2023-08-23 14:58:36
tags: [Python, Windows, DragGAN, AI]
categories: [Coding, Python]
---

### 前言

> 更新：官方代码已开源，地址：<https://github.com/XingangPan/DragGAN>

最近风靡全网的`DragGAN`, 官方代码尚未放出。不过现在已经可以抢先体验第三方实现的版本啦。

项目地址

*   [Zeqiang-Lai/DragGAN](https://github.com/Zeqiang-Lai/DragGAN): 相关代码模型，支持本地部署，Colab在线体验。
*   [OpenGVLab/InternGPT](https://github.com/OpenGVLab/InternGPT): 可以免费在线体验

在线体验
----------------------------------------------------------

[InternGPT](https://igpt.opengvlab.com/) [Google Colab](https://colab.research.google.com/github/Zeqiang-Lai/DragGAN/blob/master/colab.ipynb) [CodewithGPU](https://www.codewithgpu.com/i/Zeqiang-Lai/DragGAN/DragGAN)

> ⚠️ 注意 Google Colab 记得通过`代码执行程序/更改运行时类型` 选择一块GPU。

<video controls="" preload="auto" width="100%" playsinline="" class="html-video">
    <source src="https://zeqiang-lai.github.io/blog/posts/ai/drag_gan/demo_interngpt.mp4" type="video/mp4">
  <span>Your browser doesn't support embedded videos, but don't worry, you can <a href="https://zeqiang-lai.github.io/blog/posts/ai/drag_gan/demo_interngpt.mp4">download it</a> and watch it with your favorite video player!</span>
</video>

<video controls="" preload="auto" width="100%" playsinline="" class="html-video">
    <source src="https://zeqiang-lai.github.io/blog/posts/ai/drag_gan/demo.mp4" type="video/mp4">
  <span>Your browser doesn't support embedded videos, but don't worry, you can <a href="https://zeqiang-lai.github.io/blog/posts/ai/drag_gan/demo.mp4">download it</a> and watch it with your favorite video player!</span>
</video>

本地部署 - Pip Install 方式
------------------------------------------------------------------------------------------------------------

接来下的图片展示以Windows下的部署为例，Linux下的部署也是相同的

目前， [Zeqiang-Lai/DragGAN](https://github.com/Zeqiang-Lai/DragGAN) 的实现已经上传到 PyPI 源上了，因此，我们无需下载代码，只需要使用 `pip install` 即可进行安装。

### 安装 Conda

为了避免依赖冲突，我们首先使用Conda创建一个虚拟环境，如果你还没有安装Conda，可以在 [这里](https://docs.conda.io/en/latest/miniconda.html)下载一个Miniconda。

![miniconda.png](https://s2.loli.net/2023/07/18/rwaLec9JxdfDRHE.png)

下载完成后，点击安装包一直下一步就可以了。

![miniconda_install.png](https://s2.loli.net/2023/07/18/XwRqUKx9rDeW7Vu.png)

### 创建 Conda 虚拟环境

接下来从 Windows 菜单栏选择 Anaconda Powershell Prompt (miniconda3) 进入Conda 的命令行。

![prompt.png](https://s2.loli.net/2023/07/18/koYAWKDi2lXUauh.png)

进入之后，输入以下指令创建一个名为 `draggan` 的环境，python 版本为3.7。提示是否继续的时候输入 `y` 即可继续。

```bash
conda create -n draggan python=3.7

```

> 因为我这把已经有一个环境叫draggan了，所以图片里用的是draggan2

![create_env.png](https://s2.loli.net/2023/07/18/EMuUVq5Tf7wcN14.png)

### 安装 PyTorch

我们首先激活一下刚刚创建的环境，输入以下指令即可

```bash
conda activate draggan

```

![activate.png](https://s2.loli.net/2023/07/18/v9Q5K162mzN4ALl.png)

接着，参考PyTorch的 [官方安装教程](https://pytorch.org/get-started/locally/)，

![pytorch.png](https://s2.loli.net/2023/07/18/8eBiWqYb1pThvjN.png)

我们可以使用以下指令安装PyTorch，**二选一即可**，具体选哪个按下载速度自行选择，

```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117

conda install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia

```

**没有GPU**的用户用这个指令安装

```bash
pip3 install torch torchvision torchaudio

```

当出现 Successfully installed 就说明安装成功啦，其他 WARNING 都不用管。

### 安装 DragGAN

安装完成之后，我们安装DragGAN，这可以通过以下指令进行

```bash
pip install draggan

```

因为一些我也不知道的原因，清华pip源没有同步`draggan` 这个包，如果你的 pip 配置过清华或国内的pip源，你可能会遇到包找不到的问题


这时候你可以使用这个指令，临时使用官方源进行安装

```bash
pip install draggan -i https://pypi.org/simple/

```

与PyTorch安装类似，当出现 Successfully installed 就说明安装成功了，其他 WARNING 都不用管。

至此，所有依赖安装完成，接下来可以开始运行了。

### 运行 DragGAN Demo

你可以通过以下指令运行 DragGAN 的 Demo

```bash
python -m draggan.web

```

如果你不小心关掉了命令行，也不用重新安装，通过 Anaconda Powershell Prompt (miniconda3) 重新进入Conda 的命令行，激活环境，运行即可。

```bash
conda activate draggan
python -m draggan.web

```

没有GPU的用户，使用

```bash
python -m draggan.web --device cpu

```

当出现这个网址的时候 http://127.0.0.1:7860 ，说明程序已经成功运行


将这个网址输入到浏览器里就可以访问到 `DragGAN` 的 `Demo` 了


功能介绍
----------------------------------------------------------

界面功能介绍如下

*   选择模型：目前我们提供了10个模型（在web界面选择后会自动下载），不同模型输出图片分辨率，和对显存要求不一样，具体如下

模型信息汇总

| 名称 | 分辨率 | 显存占用 (MB) |
| --- | --- | --- |
| stylegan2-ffhq-config-f.pt | 1024 | 7987 |
| stylegan2-cat-config-f.pt | 256 | 4085 |
| stylegan2-church-config-f.pt | 256 | 4085 |
| stylegan2-horse-config-f.pt | 256 | 4085 |
| ada/ffhq.pt | 1024 | 7987 |
| ada/afhqcat.pt | 512 | 4473 |
| ada/afhqdog.pt | 512 | 4473 |
| ada/afhqwild.pt | 512 | 4473 |
| ada/brecahad.pt | 512 | 4473 |
| ada/metfaces.pt | 512 | 4473 |

![](https://zeqiang-lai.github.io/models.png)

*   最大迭代步数：有些比较困难的拖拽，需要增大迭代次数，当然简单的也可以减少。
    
*   设置拖拽点对，模型会将蓝色的点拖拽到红色点位置。记住需要在 Setup handle points 设置拖拽点对。
    
*   设置可变化区域（可选）：这部分是可选的，你只需要设置拖拽点对就可以正常允许。如果你想的话， 你可以在 Draw a mask 这个面板画出你允许模型改变的区域。注意这是一个软约束，即使你加了这个mask，模型还是有可能会改变超出许可范围的区域。