---
title: 现代Windows开发运维Windows Terminal(终端)主题和字体美化
date: 2022-10-05 14:58:36
tags: [Windows, Terminal]
categories: [Windows]
---

前言
--

好久没弄Windows Terminal，发现有点时境过迁了，当时写它的时候，Windows Terminal才刚出茅庐，还没达到今天这般完善和广泛采纳。

![](https://s2.loli.net/2023/07/09/edi8x6U1h9aRG5Y.png)

```json
{
        "theme": "dark",
        "profiles": [
            {
                "name" : "Powershell",
                "source" : "Windows.Terminal.PowershellCore",
                "acrylicOpacity" : 0.5,
                "colorScheme" : "One Half Dark",
                "cursorColor" : "#FFFFFF",
                "font": 
                {
                    "face": "CaskaydiaCove Nerd Font"
                },
                "useAcrylic" : true
            }
        ]
    }

```

如今，随着Oh-My-Posh迈入新阶段，之前的方式也不能用了，需要更新姿势了。

![](https://s2.loli.net/2023/07/09/yLw2hKVGgXRjHxP.png)

概念解读
----

### Oh My Posh

> [https://ohmyposh.dev](https://ohmyposh.dev/)

**Oh My Posh是一个自定义的提示引擎，适用于任何shell，能够用函数或变量调整提示字符串**。

传统上，提示工具是通过每个主题的自定义脚本(就像Oh My Posh 2那样)或大量的CLI配置开关来定义它的外观。对于Oh My Posh，我想从一个单一的配置文件开始，可以很容易地在任何地方共享，消除了真正掌握下面发生的事情的需要。

当你看到像Agnoster或Paradox这样的提示时，你会注意到它们通常由一些构件组成，其中包含一个或多个显示某种信息的片段。Oh My Posh的配置正是如此。积木是一个或多个片段的组合。

```json
{
    "blocks": [
        {
            // positioning metadata (not shown)
            "segments": []
        }
    ]
}

```

段落渲染了一个单一的上下文，如显示当前文件夹、用户信息或相关的git状态。它可以以任何你想要的方式进行造型，从而使你所寻找的提示可视化。

### Nerd Fonts

> [https://www.nerdfonts.com](https://www.nerdfonts.com/)

**Nerd Fonts修补了具有大量字形(图标)的开发者目标字体**。特别是要从流行的 "标志性字体"，如Font Awesome、Devicons、Octicons和其他字体中添加大量的额外字形。

![375390-20220715213720027-1131040770.png](https://s2.loli.net/2023/07/09/tJ7uMvNb5E6e2Zw.png)

### Powerline和编程连字

**Powerline是一个常用的命令行插件，用于在提示中显示附加信息**。它使用一些附加的字形来正确显示此信息。

**编程连字是通过组合字符创建的字形。它们在编写代码时最有用**。

![375390-20220715202452678-466450611.gif](https://s2.loli.net/2023/07/09/385JcH7aLmIyRMq.gif)

### Cascadia Code

> [https://github.com/microsoft/cascadia-code](https://github.com/microsoft/cascadia-code)

**Cascadia Code是Microsoft提供的一种新的等宽字体，可为命令行应用程序和文本编辑器提供全新的体验**。Cascadia Code是与Windows终端一起开发的。建议将此字体与终端应用程序和文本编辑器（如Visual Studio和Visual Studio Code）一起使用。

有多个版本的Cascadia Code可供使用，其中包括连字和字形。所有版本的Cascadia Code都可以从[Cascadia Code GitHub发布页](https://github.com/microsoft/cascadia-code/releases)下载。Windows终端在其包中提供Cascadia Code和Cascadia Mono，并默认使用Cascadia Mono

| 字体名称 | 包括连字 | 包括 Powerline 字形 |
| --- | --- | --- |
| Cascadia Code | 是 | 否 |
| Cascadia Mono | 否 | 否 |
| Cascadia Code PL | 是 | 是 |
| Cascadia Mono PL | 否 | 是 |

"Code"变体包含连字，而"Mono"变体不包含连字。

Cascadia Code已获得GitHub上的[SIL开源字体授权](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)的许可。

### Terminal-Icons

> [https://github.com/devblackops/Terminal-Icons](https://github.com/devblackops/Terminal-Icons)

**Terminal-Icons是一个PowerShell模块，它会添加在Windows终端中显示文件或文件夹时可能缺少的文件和文件夹图标，并基于名称或扩展名查找相应的图标**。它尝试将图标用于已知文件/文件夹，但如果找不到此内容，则会回滚到通用文件或文件夹图标。

### Posh-Git

Posh-Git是一个PowerShell模块，它集成了Git和PowerShell，提供可在PowerShell提示符中显示的Git状态摘要信息。

### Caskaydia Cove Nerd Font

基于CascadiaCode的一个Nerd Font的字体补充库，里面包括了很多图标，这里推荐使用它。

*   [CascadiaCode.zip](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/CascadiaCode.zip)

![375390-20220715220632146-6859336.png](https://s2.loli.net/2023/07/09/QZUNVy1aCgtvo8i.png)

![](https://s2.loli.net/2023/07/09/P86hW1iZn9KcdSm.png)

![375390-20220715220824185-141637806.png](https://s2.loli.net/2023/07/09/uGclW1TCZexJs6R.png)

### PSReadLine

> [https://github.com/PowerShell/PSReadLine](https://github.com/PowerShell/PSReadLine)

PSReadLine是一个受bash启发的用于PowerShell的readline实现。

它的模块取代了PowerShell 3及以上版本的命令行编辑体验。它提供了:

*   语法着色
*   简单的语法错误通知
*   良好的多行体验（包括编辑和历史）。
*   可定制的键绑定
*   Cmd和emacs模式（两者都没有完全实现，但都可以使用）
*   许多配置选项
*   Bash风格的补全（Cmd模式下可选，Emacs模式下默认）。
*   Bash/zsh风格的交互式历史搜索(CTRL-R)
*   Emacs yank/kill环
*   基于PowerShell令牌的 "单词 "移动和删除
*   撤销/重做
*   自动保存历史记录，包括在实时会话中共享历史记录
*   通过Ctrl+Space的 "菜单 "完成（有点像Intellisense，用箭头选择完成）。

开箱即用的体验是为了让PowerShell用户非常熟悉--应该不需要学习任何新的按键。

如果你在Windows 10上使用Windows PowerShell或使用PowerShell 6+，PSReadLine已经安装了。最新的Windows 10上的Windows PowerShell有2.0.0-beta2版本的PSReadLine。PowerShell 6+版本有较新的PSReadLine的预发布版本。

操作指南
----

### 安装字体

> 这里推荐安装上面提到的`Caskaydia Cove Nerd Font`字体。

如果你从[Github](https://github.com/microsoft/cascadia-code/releases)下载了Cascadia Code或者从[Nerd Fonts](https://www.nerdfonts.com/font-downloads)下载了其它字体，把它解压出来。

![](https://s2.loli.net/2023/07/09/Pd9n5XyBi8vzo4b.png)

选择其中ttf格式，找到其中的`*.ttf`字体文件。

从系统搜索`字体`这个控制面板入口，点击打开它。

![](https://s2.loli.net/2023/07/09/4bArZNGFSaVcfej.png)

![](https://s2.loli.net/2023/07/09/tupPUgXwA3ZYlDi.png)

从解压后的文件夹中选中所有要添加的字体文件，复制后粘贴到上诉字体对话框，或者以拖拽的方式丢进去也可以，它会提示安装。

![](https://s2.loli.net/2023/07/09/OQcMbT4I3dUJDmi.png)

对于重复的字体，我们勾选`为所有当前项目执行此操作`这个选项，然后点击`是`按钮即可。

![375390-20220715203400891-557438099.png](https://s2.loli.net/2023/07/09/k9EzX76FBqAZiC3.png)

为了保障字体被完全安装，建议将所有的字体文件都一口气安装上，以免后续使用遇到问题。

![375390-20220715203508421-431819842.png](https://s2.loli.net/2023/07/09/NShML5tpPFzWCG3.png)

### 设置字体

在`Windows Terminal(终端)`中，点击顶部小三角下拉进入`设置`面板。

![375390-20220715210009807-193279683.png](https://s2.loli.net/2023/07/09/31lia8FWCZEQ4hg.png)

在左侧`配置文件`设置块中，我们找到`Windows PowerShell`，先来设置它的配置文件，在`其他设置`里面，有一个`外观`设置，点击它。

![375390-20220715204228705-1508292854.png](https://s2.loli.net/2023/07/09/xmEQVsvYNch2fUn.png)

接下来，可以在字体这项属性设置，下拉找到我们前面安装的`CaskaydiaCove Nerd Font`字体，点击`保存`按钮即可。

接下来，要么重启`Windows Terminal(终端)`，要么新开一个标签页才能看到效果。

![375390-20220807162908323-2075453769.png](https://s2.loli.net/2023/07/09/sAfT9z2VIPCi8Wd.png)

### 安装Oh My Posh

#### 通过Winget进行安装(推荐)

```
winget install JanDeDobbeleer.OhMyPosh -s winget

```

![375390-20220715205927871-564283615.png](https://s2.loli.net/2023/07/09/MCQHm7ZEaVzYeLB.png)

![375390-20220715205850620-1857100692.png](https://s2.loli.net/2023/07/09/tivpHWlz4r6TJjF.png)

它安装后会包括：

*   oh-my-posh.exe
*   内置的多个主题

保持更新：

```
winget upgrade oh-my-posh

```

#### 通过Microsoft Store安装

> ms-windows-store://pdp/?productid=XP8K0HKJFRXGCK

*   [oh-my-posh on Microsoft Store](https://apps.microsoft.com/store/detail/XP8K0HKJFRXGCK)

![375390-20220715205610474-63845355.png](https://s2.loli.net/2023/07/09/g3QG157t4rq8sLS.png)

### 设置Oh My Posh

首先，我们需要知道安装后自带的主题是哪些，安装后，我们可以通过如下命令全部展示出来：

```powershell
Get-PoshThemes

```

![375390-20220715205819677-825478762.png](https://s2.loli.net/2023/07/09/5jYEHhkvMVG3RsN.png)

从这里找到自己比较中意的主题，比如这里我暂时选的就是`powerline`这个主题。

![375390-20220715210350654-1389471987.png](https://s2.loli.net/2023/07/09/npA938ohfWcvHXu.png)

怎么使用呢？接下来，我们要去设置PowerShell的配置文件，在当前`Windows Terminal(终端)`窗口中，输入`notepad $PROFILE`，回车后可打开它的配置。

![375390-20220715210634133-1456518540.png](https://s2.loli.net/2023/07/09/4VQmD3wL6yNl9ZS.png)

如果之前没有配置文件，第一次Notepad会提示你是否创建一个，所以我们直接点击`是`按钮来创建一个就好了。

![375390-20220715211651630-875107161.png](https://s2.loli.net/2023/07/09/d7eV3UAOlp2FG4x.png)

在新的一行，追加如下格式的信息：

```
oh-my-posh init pwsh --config $themeConfigFilePath | Invoke-Expression

```

关键来了，这个`themeConfigFilePath`怎么填呢？

这个主题配置文件的路径实际上就是前面我们看上的主题那个配置的路径，一般来说，它就在`UserAppData`下面，例如：

```
C:\Users\xxxx\AppData\Local\Programs\oh-my-posh\themes\powerline.omp.json

```

最终拼在一起，完整的举例是：

```
oh-my-posh init pwsh --config C:\Users\xxxx\AppData\Local\Programs\oh-my-posh\themes\powerline.omp.json | Invoke-Expression

```

![375390-20220715211047459-2036640189.png](https://s2.loli.net/2023/07/09/7xkCO25QhcmAZHs.png)

现在，每个新的PowerShell实例都将通过导入Oh My Posh并设置命令行主题启动。

这时候，我们重启`Windows Terminal(终端)`查看效果吧。

![375390-20220715211201979-2030437282.png](https://s2.loli.net/2023/07/09/rCkoLUhvREz2utP.png)

### 设置配色

如果感觉别人的视觉好看更好看，那估计对方也是改了配色方案了，前往`设置`面板-`配置文件`\-`Windows PowerShell配置`\-`其他设置`\-`外观`设置界面。

在`配色方案`这块，选择喜欢的配色方案，上面还能直接预览效果，如果满意就点击保存即可。

![375390-20220715212856705-1579692537.png](https://s2.loli.net/2023/07/09/UI7lgtVHnWoAXG6.png)

如果对内置的配色方案不满意，我们还可以从[Windows Terminal Themes](https://windowsterminalthemes.dev/)这个网站找到更多配色方案。

![375390-20220715213123864-61196167.png](https://s2.loli.net/2023/07/09/ZPn6RydTEisq7XD.png)

预览效果满意后，点击`Get Theme`按钮，它会把配色方案的Json配置复制到粘贴板。

在`Windows Terminal(终端)`中使用快捷键`Ctrl` + `Shift` + `,` 组合可以打开配置文件。

把Json内容添加到`schemes`节点列表末尾。

![375390-20220715213446159-2026809591.png](https://s2.loli.net/2023/07/09/SAaIgWXydLOPesn.png)

这里推荐一个配色方案，叫`One Half Dark`，它的地址：[https://github.com/sonph/onehalf](https://github.com/sonph/onehalf)

```json
{
	"background" : "#282C34",
	"black" : "#282C34",
	"blue" : "#61AFEF",
	"brightBlack" : "#808080",
	"brightBlue" : "#61AFEF",
	"brightCyan" : "#56B6C2",
	"brightGreen" : "#98C379",
	"brightPurple" : "#C678DD",
	"brightRed" : "#E06C75",
	"brightWhite" : "#DCDFE4",
	"brightYellow" : "#E5C07B",
	"cyan" : "#56B6C2",
	"foreground" : "#DCDFE4",
	"green" : "#98C379",
	"name" : "One Half Dark",
	"purple" : "#C678DD",
	"red" : "#E06C75",
	"white" : "#DCDFE4",
	"yellow" : "#E5C07B"
},
{
	"background" : "#FAFAFA",
	"black" : "#383A42",
	"blue" : "#0184BC",
	"brightBlack" : "#383A42",
	"brightBlue" : "#0184BC",
	"brightCyan" : "#0997B3",
	"brightGreen" : "#50A14F",
	"brightPurple" : "#A626A4",
	"brightRed" : "#E45649",
	"brightWhite" : "#FAFAFA",
	"brightYellow" : "#C18401",
	"cyan" : "#0997B3",
	"foreground" : "#383A42",
	"green" : "#50A14F",
	"name" : "One Half Light",
	"purple" : "#A626A4",
	"red" : "#E45649",
	"white" : "#FAFAFA",
	"yellow" : "#C18401"
}

```

贴进去之后，真是色彩多。

![375390-20220715222923126-693765726.png](https://s2.loli.net/2023/07/09/zFtp9hDA47jO2XS.png)

![375390-20220715222912837-1593004608.png](https://s2.loli.net/2023/07/09/2Rm3XwzdYKHTPa7.png)

这里还贴一个Ubuntu色

```json
{
    "background": "#300A24",
    "black": "#2E3436",
    "blue": "#3465A4",
    "brightBlack": "#79613c",
    "brightBlue": "#729FCF",
    "brightCyan": "#34E2E2",
    "brightGreen": "#8AE234",
    "brightPurple": "#AD7FA8",
    "brightRed": "#EF2929",
    "brightWhite": "#EEEEEC",
    "brightYellow": "#FCE94F",
    "cursorColor": "#BBBBBB",
    "cyan": "#06989A",
    "foreground": "#EEEEEC",
    "green": "#4E9A06",
    "name": "Ubuntu",
    "purple": "#75507B",
    "red": "#CC0000",
    "selectionBackground": "#B5D5FF",
    "white": "#D3D7CF",
    "yellow": "#C4A000"
}

```

![375390-20220718111406696-530920415.png](https://s2.loli.net/2023/07/09/ah6eDRsYZW2QBEV.png)

这里需要注意，采用网上的配色，后面发现`brightBlack`这个值有点问题，自己做了一些修正。

### 清除欢迎

每次我们打开`Windows Terminal(终端)`都会有几段欢迎词，如果你不想看到它，这个也是可以设置的。

我们前往`设置`面板-`配置文件`\-`Windows PowerShell配置`\-`命令行`这里，点击它可展开进行编辑，在之前路径的后面追加 `-NoLogo`

![375390-20220715212419204-1188588693.png](https://s2.loli.net/2023/07/09/kE9t4qosHLgaYrb.png)

然后点击`保存`即可。

![375390-20220715212522677-1622752701.png](https://s2.loli.net/2023/07/09/CHhNktW2qGOTigp.png)

哈哈，可惜有点bug。

### 定制欢迎

先前往这个网站，生成你喜欢的欢迎词：[http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=TaylorShi](http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=TaylorShi)

点击你中意的一项的`Select & Copy`，内容例如：

```cmd
  _______          _            _____ _     _ 
 |__   __|        | |          / ____| |   (_)
    | | __ _ _   _| | ___  _ _| (___ | |__  _ 
    | |/ _` | | | | |/ _ \| '__\___ \| '_ \| |
    | | (_| | |_| | | (_) | |  ____) | | | | |
    |_|\__,_|\__, |_|\___/|_| |_____/|_| |_|_|
              __/ |                           
             |___/                            

```

接下来，我们前往PowerShell配置文件：`notepad $PROFILE`，在追前面添加如下内容：

```powershell
clear
$hello="
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| |  _________   | || |      __      | || |  ____  ____  | || |   _____      | || |     ____     | || |  _______     | |
| | |  _   _  |  | || |     /  \     | || | |_  _||_  _| | || |  |_   _|     | || |   .'    `.   | || | |_   __ \    | |
| | |_/ | | \_|  | || |    / /\ \    | || |   \ \  / /   | || |    | |       | || |  /  .--.  \  | || |   | |__) |   | |
| |     | |      | || |   / ____ \   | || |    \ \/ /    | || |    | |   _   | || |  | |    | |  | || |   |  __ /    | |
| |    _| |_     | || | _/ /    \ \_ | || |    _|  |_    | || |   _| |__/ |  | || |  \  `--'  /  | || |  _| |  \ \_  | |
| |   |_____|    | || ||____|  |____|| || |   |______|   | || |  |________|  | || |   `.____.'   | || | |____| |___| | |
| |              | || |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
"
$hello
"Welcome back, Taylor"

```

![375390-20220716154836033-1997964146.png](https://s2.loli.net/2023/07/09/zObH9QZyLoM6jTR.png)

保存即可。

接下来，要么重启`Windows Terminal(终端)`，要么新开一个标签页才能看到效果。

![375390-20220716154940979-646695633.png](https://s2.loli.net/2023/07/09/A1E6PuSKMyZBUQx.png)

### 安装Terminal-Icons

通过管理员模式打开`Windows Terminal(终端)`打开。

![375390-20220715214521952-537686489.png](https://s2.loli.net/2023/07/09/htqWNKgex53Ziu8.png)

运行如下命令：

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery

```

![375390-20220715214637000-1629539159.png](https://s2.loli.net/2023/07/09/p9El3qAr5Itk6O7.png)

安装之后，我们前往PowerShell配置文件：`notepad $PROFILE`

追加对它的引入：

```
Import-Module Terminal-Icons

```

![375390-20220715220952375-1612126266.png](https://s2.loli.net/2023/07/09/mwReoO6kLKNjJEY.png)

这里建议配合安装前面提到的`Caskaydia Cove Nerd Font`来使用会更好，将字体设置成`CaskaydiaCove NF`即可。

![375390-20220715221123927-1367086754.png](https://s2.loli.net/2023/07/09/rlWGVBMjgimHudz.png)

这样，各种文件或者文件夹就会识别出现图标了。

![375390-20220715221200636-1932054725.png](https://s2.loli.net/2023/07/09/5CzatWLX4ZVoxIB.png)

### 安装Posh-git

Posh-git是一个PowerShell模块，它将Git和PowerShell整合在一起，提供可以在PowerShell提示符下显示的Git状态汇总信息，例如：

![375390-20220715221656239-818076259.png](https://s2.loli.net/2023/07/09/soSAl2DcCfRNHzZ.png)

通过管理员模式打开`Windows Terminal(终端)`打开。

![375390-20220715214521952-537686489.png](https://s2.loli.net/2023/07/09/htqWNKgex53Ziu8.png)

运行如下命令：

```
Install-Module posh-git -Scope CurrentUser

```

![375390-20220715221904884-261312191.png](https://s2.loli.net/2023/07/09/TykO3LZ2QsKawdx.png)

安装之后，我们前往PowerShell配置文件：`notepad $PROFILE`

追加对它的引入：

```
Import-Module posh-git

```

![375390-20220715222007229-1652220618.png](https://s2.loli.net/2023/07/09/m6ZIYXdlEvTNki1.png)

### 亚克力和透明度

![375390-20220715223124392-1137289221.png](https://s2.loli.net/2023/07/09/rUgV9EKRMybfso8.png)

![375390-20220715223053281-1948323439.png](https://s2.loli.net/2023/07/09/yjIMcYvVs7KJGPL.png)

### 自动补全

通过`PSReadLine`可以显现自动补全，在Windows 10开始已经自带了，如果需要补装可以使用：

通过管理员模式打开`Windows Terminal(终端)`打开。

```
Install-Module PSReadLine -Scope CurrentUser

```

安装之后，我们前往PowerShell配置文件：`notepad $PROFILE`

追加对它的配置项：

```bash
# Shows navigable menu of all options when hitting Tab
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete

# Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward

# auto suggestions
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History

```

![375390-20220716210558213-1011679552.png](https://s2.loli.net/2023/07/09/4W5KxZHyUCkBtmu.png)

保存后即可生效。

使用的时候，它会自动提示你猜测的补全，如果你要采纳，按下`->`左箭头按钮即可。

![375390-20220716210734523-177182483.png](https://s2.loli.net/2023/07/09/5CyXdKkN8fYO3Lo.png)

通过向上按键和向下按键即可切换历史的命令。

### 交互可视化

> [https://github.com/PowerShell/GraphicalTools](https://github.com/PowerShell/GraphicalTools)

通过`GraphicalTools`可实现可视化交互。

```
Install-Module Microsoft.PowerShell.ConsoleGuiTools

```

![375390-20220716212220581-485478966.gif](https://s2.loli.net/2023/07/09/XZBWhstw8vT7AaE.gif)

### 卸载插件

通过命令`Uninstall-Module`即可卸载指定的插件。

> 卸载Oh-My-Posh

```
Uninstall-Module oh-my-posh

```

> 卸载Terminal-Icons

```
Uninstall-Module Terminal-Icons

```

> 卸载posh-git

```
Uninstall-Module posh-git

```

Ubuntu中安装配置
-----------

> Github加速站：[https://github.91chi.fun](https://github.91chi.fun/)

### 安装Oh My Posh

> [https://ohmyposh.dev/docs/installation/linux](https://ohmyposh.dev/docs/installation/linux)

虽然官方也建议用`Homebrew`来安装，但是也可以手动安装。

```bash
sudo wget https://github.91chi.fun/https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/posh-linux-amd64 -O /usr/local/bin/oh-my-posh

```

![375390-20220806014341483-1120213545.png](https://s2.loli.net/2023/07/09/ypWai6IwojtbOrs.png)

```
sudo chmod +x /usr/local/bin/oh-my-posh

```

![375390-20220806014351388-1719631709.png](https://s2.loli.net/2023/07/09/lN7OmBfTLeaQ5UE.png)

### 下载主题

先创建一个存储目录：

```
mkdir ~/.poshthemes

```

下载主题压缩包

```bash
wget https://github.91chi.fun/https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/themes.zip -O ~/.poshthemes/themes.zip

```

![375390-20220806014901973-1711448782.png](https://s2.loli.net/2023/07/09/PdGL68iVeTkpgDy.png)

解压主题压缩包

```bash
sudo apt install unzip && unzip ~/.poshthemes/themes.zip -d ~/.poshthemes

```

如果提示`unzip`不存在，那就先安装它：`apt install unzip`

![375390-20220806015049630-424145855.png](https://s2.loli.net/2023/07/09/vBHdqYIV1XsOLCl.png)

给主题配置文件增加权限

```shell
chmod u+rw ~/.poshthemes/*.json

```

![375390-20220806015121638-618088372.png](https://s2.loli.net/2023/07/09/STpsnr2Ydf4bDgw.png)

移除主题压缩包缓存

```shell
rm ~/.poshthemes/themes.zip

```

![375390-20220806015151714-102960902.png](https://s2.loli.net/2023/07/09/SnGLecdm4yzMC2I.png)

我们进入主题文件夹看下有哪些主题：

```shell
cd ~/.poshthemes && ls

```

从中间选一个，比如我这里选`powerline.omp.json`

![375390-20220806015757363-1101734430.png](https://s2.loli.net/2023/07/09/9GPQvKSBap4ANFD.png)

修改Bash主题

```shell
vim ~/.bashrc

```

![375390-20220806015228571-734872411.png](https://s2.loli.net/2023/07/09/LFKR9qojAdlmryx.png)

按下`i`进入编辑状态，然后再最后一行追加：

```shell
eval "$(oh-my-posh --init --shell bash --config ~/.poshthemes/powerline.omp.json)"

```

这里`powerline.omp.json`就是你自己选中的主题配置文件。

![375390-20220806015834133-1299204246.png](https://s2.loli.net/2023/07/09/8Exfkd9SyJW2AjH.png)

按`ESC`退出编辑，然后输入`:wq`保存。

重新打开终端，这时候会发现变化。

![375390-20220806015928017-1493452215.png](https://s2.loli.net/2023/07/09/OR5u2FviNQzp7t4.png)

### 安装字体

接下来就是安装字体了，从[nerdfonts](https://www.nerdfonts.com/font-downloads)网站找一个心仪的字体。

下载并解压字体到`/usr/share/fonts/CascadiaCode`下。

```shell
wget https://github.91chi.fun/https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/CascadiaCode.zip && sudo unzip CascadiaCode -d /usr/share/fonts/CascadiaCode && rm -f CascadiaCode.zip

```

![375390-20220806020624668-1137783015.png](https://s2.loli.net/2023/07/09/qUDMVJ1Gh5PAs6Z.png)

前往字体目录

```shell
cd /usr/share/fonts/CascadiaCode && sudo chmod 744 *.ttf

```

刷新字体缓存

```shell
sudo apt install xfonts-utils -y && mkfontscale && mkfontdir && sudo apt install fontconfig && fc-cache -fv

```

![375390-20220806021541163-913868445.png](https://s2.loli.net/2023/07/09/3iK1gwc2CuNIxAy.png)

### 设置字体

接下来，我们需要在Ternimal里面设置我们当前这个Ubuntu版本的字体。

进入对应的Ubuntu Bash的设置中外观这项。

![375390-20220807162542951-2054054208.png](https://s2.loli.net/2023/07/09/UYIyLmgsNqHupDX.png)

![375390-20220807162555928-221241174.png](https://s2.loli.net/2023/07/09/FChqbe8JVv6LwuA.png)

把字体切换到`CaskaydiaCove Nerd Font`，保存即可，再次进入就可以了

![375390-20220807162635507-2025129777.png](https://s2.loli.net/2023/07/09/z9Cq8rZfQBMGwF7.png)

笔者之前这步没达到预期效果，后面发现竟然是自己设置错了对象，所以这里要看清楚，WSL对应的同一个版本，在Ternimal可能存在多个入口，我们要找到正确的。

![375390-20220807162757299-2074273977.png](https://s2.loli.net/2023/07/09/Gq259sCThdKcYj1.png)

参考
--

*   [Oh My Posh](https://ohmyposh.dev/)
*   [Terminal终端美化(Oh My Posh)](https://juejin.cn/post/7095370896822501390)
*   [Windows 终端的 PowerShell 主题中的 Oh-My-Posh](https://docs.microsoft.com/zh-cn/windows/terminal/custom-terminal-gallery/powerline-in-powershell)
*   [Windows Terminal美化：oh-my-posh配置记录](https://blog.csdn.net/qq_45755158/article/details/124677516)
*   [利用oh-my-posh美化Windows Terminal](https://zhuanlan.zhihu.com/p/517728544)
*   [Windows Terminal for Nerd Font And FontForge](https://www.jianshu.com/p/a60a262d81f5)
*   [https://windowsterminalthemes.dev](https://windowsterminalthemes.dev/)
*   [Nerd Fonts](https://www.nerdfonts.com/)
*   [Powerline fonts & Nerd fonts 简介](https://juejin.cn/post/6844904054322102285)
*   [ubuntu 字体安装 —— 以nerd font为例](https://blog.csdn.net/qq_39785418/article/details/122796861)
*   [Powerline fonts & Nerd fonts 简介](https://juejin.cn/post/6844904054322102285)
*   [Cascadia Code](https://docs.microsoft.com/zh-cn/windows/terminal/cascadia-code#powerline-and-programming-ligatures)
*   [microsoft/cascadia-code](https://github.com/microsoft/cascadia-code)
*   [教程：使用 Oh My Posh 为 PowerShell 或 WSL 设置自定义提示符](https://docs.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup)
*   [Terminal-Icons](https://github.com/devblackops/Terminal-Icons)
*   [PSReadLine - Powershell 的强化工具](https://blog.csdn.net/sigmarising/article/details/107287275)
*   [PowerShell/PSReadLine](https://github.com/PowerShell/PSReadLine)
*   [使用Oh My Posh自定义WSL提示符](https://docs.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup#customize-your-wsl-prompt-with-oh-my-posh)
*   [Oh My Posh For Linux](https://ohmyposh.dev/docs/installation/linux)
*   [Homebrew](https://brew.sh/)
*   [ubuntu安装 oh-my-posh](https://www.cnblogs.com/bitbw/p/15393007.html)
*   [Ubuntu美化——安装Oh-My-Zsh](https://www.cnblogs.com/langkyeSir/p/13906461.html)
*   [PowerShell和WSL for Ubuntu安装oh-my-posh](https://blog.csdn.net/hys__handsome/article/details/125697108)
*   [Linux 系统安装 Oh my posh 终端美化工具](https://www.cnblogs.com/oddpage/p/16135169.html)
*   [GitHub 文件加速](https://github.91chi.fun/)
*   [https://github.com/hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
*   [ubuntu 字体安装 —— 以nerd font为例](https://www.cnblogs.com/zi-wang/p/12566898.html)
*   [Linux 系列快速入门-01-常用命令](https://www.cnblogs.com/oddpage/p/guideToLinux-01-common-cmd.html)
*   [入门：如何更改 Ubuntu 的终端的字体和大小 | Linux 中国](https://zhuanlan.zhihu.com/p/434307553)

