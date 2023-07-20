---
title: 拥有王一博个性化的终端Windows Terminal 美化
date: 2022-10-25 14:58:36
tags: [Windows,Terminal]
categories: [Windows]
---

Windows Terminal
============================================================================

*   [windows terminal文档](https://learn.microsoft.com/zh-cn/windows/terminal/)  
    https://learn.microsoft.com/zh-cn/windows/terminal
*   [windows terminal下载](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=zh-cn&gl=cn)  
    https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=zh-cn&gl=cn

`Windows 终端` 是一个新式主机应用程序，它面向你喜爱的命令行 shell，如命令提示符、PowerShell 和 bash（通过适用于 Linux 的 Windows 子系统 (WSL)）。  
它的主要功能包括多个选项卡、窗格、Unicode 和 UTF-8 字符支持、GPU 加速文本呈现引擎，你还可用它来创建你自己的主题并自定义文本、颜色、背景和快捷方式

windows terminal 美化
-------------------------------------------------------------------------------

*   [Windows 终端的 PowerShell 主题中的 Oh-My-Posh](https://docs.microsoft.com/zh-cn/windows/terminal/custom-terminal-gallery/powerline-in-powershell?source=recommendations)
*   [windows terminal](https://github.com/microsoft/terminal)
*   [oh-my-posh主题](https://ohmyposh.dev/)
*   [oh-my-posh code](https://github.com/JanDeDobbeleer/oh-my-posh)
*   [nerd字体下载](https://www.nerdfonts.com/font-downloads)
*   [nerd-fonts](https://github.com/ryanoasis/nerd-fonts)
*   [Jetbrains Mono字体下载](https://www.jetbrains.com/lp/mono/)

window11 系统默认会自动安装 windows terminal 的，  
如果是 windows 10 的系统需要先 下载 [windows-terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=zh-cn&gl=cn)

### windows-terminal下载地址

<https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=zh-cn&gl=cn>

![4ce1a805b3b0a923f3c4ece599daf6cf.png](https://s2.loli.net/2023/07/09/729oyrtS3uEkc5Z.png)

相对之前的 cmd 和 powershell 已经是非常好看了，但是还是得搞点个性化的东西，打开 windows terminal 进行设置

![157f1b1d003e18e34183617ca6ad40a9.png](https://s2.loli.net/2023/07/09/5ZcW481KqCYfQda.png)

打开 windows terminal 设置后可以终端的 启动、样式、快捷键、配置的默认等进行设置，这里选择 打开 左下角的 `打开 JSON 文件`，点击后  
默认会使用 编辑器帮你打开

![aa45303586b2ae4bf37054a4c40de8d9.png](https://s2.loli.net/2023/07/09/GjYtFkOgTsNod2B.jpg)

`windows terminal 配置文件所在目录`

C:\\Users\\sunsb\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal\_8wekyb3d8bbwe\\LocalState\\settings.json

```
C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json

```

最好是，打开 settings.json 文件所在目录，对 settings.json 文件拷贝一份

![28206370826d598202164f8308b35242.png](https://s2.loli.net/2023/07/09/cTlHF2Cehp9rSwd.png)

使用编辑器 vscode 或者 notepad++ 打开 settings.json 后 ，找到 profiles 下的 defaults

```json
// C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
{
	"profiles": {
		"defaults": { // 终端的默认值配置
			"experimental.retroTerminalEffect": false, // 复古风格的终端效果
			"font": {
				"face": "Consolas",
				"size": 14
			}
		},
	}
}

```

下方图片就是，上面默认配置的可视化

![c5dafd6a68855919ca8f2fb637460e88.png](https://s2.loli.net/2023/07/09/gPz2OtbXqMV9UdW.png)

`配置终端亚克力效果`
-----------------------------------------------------------------------

```json
{
// C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
	"profiles": {
		"defaults": { // 终端的默认值配置
			"experimental.retroTerminalEffect": false, // 复古风格的终端效果
			"useAcrylic": true, // 是否使用 亚克力效果
			"acrylicOpacity": 0.1, // 亚克力效果 透明度
			"font": {
				"face": "Consolas",
				"size": 14
			}
		},
	}
}

```

![6a9072cd756486b8a971ef1389750a11.png](https://s2.loli.net/2023/07/09/ZFA6weoSPsDcXnl.png)

接下来，给终端配置一个背景图片，并且设置背景图的透明度

```json
// C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
{
	"profiles": {
		"defaults": { // 终端的默认值配置
			"experimental.retroTerminalEffect": false, // 复古风格的终端效果
			"useAcrylic": true, // 是否使用 亚克力效果
			"acrylicOpacity": 0.1, // 亚克力效果 透明度，取值：0 - 1
			"backgroundImage": "D:/Terminal/1.png", // 背景图片路径，注意，图片路径使用 / 正斜杠，拷贝路径过来需要替换下
			"backgroundImageOpacity": 1, // 背景图片透明度，取值：0 - 1
			"font": {
				"face": "Consolas",
				"size": 14
			}
		},
	}
}

```

注意，图片路径使用 / 正斜杠，拷贝路径过来需要替换下

`初次配置背景图效果`  
![1eea29f65662cbfe2f9633b6a7e483c2.png](https://s2.loli.net/2023/07/09/Ofvx3K2Equ9jWgF.png)

对 亚克力效果透明度 `acrylicOpacity: 0.2` 和 背景图片透明度 `backgroundImageOpacity: 0.2` 进行调整，最好找深一点颜色图片来作为背景图

下面是调整过后的效果，可以根据自己选择的背景图片 来调整 亚克力效果透明度 和 背景图片透明度，边调整边查看效果

![7cbadad873e5ccb238c6ba6ccf3b32e5.png](https://s2.loli.net/2023/07/09/T6AN7PiWp3asxFo.png)

oh-my-posh 美化终端
---------------------------------------------------------------------------

使用 [oh-my-posh](https://ohmyposh.dev/) 来进一步的美化终端，打开 oh-my-posh 官网地址查看 `安装命令`，这里采用了 `winget` 的方式安装了

::: block-2

#### oh-my-posh官网

**<https://ohmyposh.dev>**  
:::

![6a2140e7db3722ac350254bc0103bc65.png](https://s2.loli.net/2023/07/09/sn1XEcoAvGFpR96.png)

![d62c84fe0cc8b09e7276090e126759ce.png](https://s2.loli.net/2023/07/09/qjZvHF6Vk7ND38M.png)

### oh-my-posh 的安装方式

1 直接在 `Microsoft Store` 中搜索 `oh-my-posh` 进行安装，这种默认是安装在 C盘的，本着不将东西安装 C盘的原则，不采用这种方式安装

![f957b748de3d2479535c3f3191d861da.png](https://s2.loli.net/2023/07/09/lszCI5SbjfMui1v.png)

2 通过命令安装，这里采用 `winget 命令方式` 进行安装，安装前，先新建 `D:\OhMyPosh` 目录，用于保存 `oh-my-posh` 的安装目录(D:\\OhMyPosh)

![bcca5a4e8e7aa7bec3389c0c49d6aad7.png](https://s2.loli.net/2023/07/09/WUCGx4s2zDlTmRr.png)

安装前的注意事项
--------------------------------------------------------------------

::: block-1

#### Windows PowerShell 执行策略

在执行 **winget install** 命令之前，先查看下，Windows PowerShell 的执行策略

**执行策略** 是 Windows PowerShell安全策略中的一部分，它将决定你是否可以载入配置文件(包括你的 Windows PowerShell profile文件)和运行脚本，它将会在运行前确定哪些文件必须具有数字签名(digitally signed)

**get-ExecutionPolicy** 获取 Windows PowerShell 当前执行策略

**set-ExecutionPolicy** 修改 Windows PowerShell 中执行策略的用户首选项(preference)  
:::

::: block-2

#### 执行策略状态说明

*   **Restricted** 表示状态是禁止的 不载入配置文件, 不执行脚本. **Restricted** 是默认值.
*   **RemoteSigned** 所有从互联网上下载的脚本必须通过信任的出版商签名(trusted publisher)
*   **AllSigned** 所有的配置文件和脚本必须通过信任的出版商签名(trusted publisher)，这里所指的脚本页包括在本地计算机上创建的脚本
*   **Unrestricted** 载入所有的配置文件和脚本，如果运行了一个从互联网上下载且没有数字签名的脚本，在执行前都会被提示是否执行  
    :::

```bash
// 执行策略状态：Restricted/RemoteSigned/AllSigned/Unrestricted

// 获取 Windows PowerShell 当前执行策略
get-ExecutionPolicy

// 修改 Windows PowerShell 中执行策略
set-ExecutionPolicy RemoteSigned


```

#### winget 执行命令安装 oh-my-posh

```powershell
// oh-my-posh 安装命令
winget install JanDeDobbeleer.OhMyPosh -s winget --location D:\OhMyPosh

// oh-my-posh 更新命令
winget upgrade JanDeDobbeleer.OhMyPosh -s winget --location D:\OhMyPosh


```

::: block-2  
– location D:\\OhMyPosh 是将 oh-my-posh 安装到 D:\\OhMyPosh 目录下  
:::

![c8589783558248496a7af6f018c694e4.png](https://s2.loli.net/2023/07/09/A1UjRGfars9V5Do.png)

PowerShell 创建可维护配置文件
--------------------------------------------------------------------------------

*   [powershell文档](https://learn.microsoft.com/zh-cn/powershell)
*   [about\_profiles](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles)

**powershell文档**  
<https://learn.microsoft.com/zh-cn/powershell>

**about\_profiles**  
<https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about\_profiles>

可以创建一个 PowerShell 配置文件来自定义环境并将特定于会话的元素添加到启动的每个 PowerShell 会话中

PowerShell 配置文件是在 PowerShell 启动时运行的脚本，可以将配置文件用作登录脚本来自定义环境，  
可以添加命令、别名、函数、变量、管理单元、模块和 PowerShell 驱动器，  
还可以将其他特定于会话的元素添加到您的配置文件中，以便在每个会话中都可以使用它们，而无需导入或重新创建它们。

PowerShell 控制台支持以下基本配置文件，配置文件按优先顺序列出，第一个配置文件，如：`Microsoft.VSCode_profile.ps1` 具有最高优先级

PowerShell 支持用户和主机程序的多个配置文件，它不会为您创建配置文件

::: block-1

### windows 下的几个变量

| 变量名 | 变量说明 |
| :-- | :-: |
| $HOME | 用户的主目录 |
| $PSHOME | PowerShell 安装目录 |
| $PROFILE | 当前用户、当前主机 配置文件的路径 |
| $PROFILE.CurrentUserCurrentHost | 当前用户、当前主机 配置文件的路径 |
| $PROFILE.CurrentUserAllHosts | 当前用户，所有主机 配置文件的路径 |
| $PROFILE.AllUsersCurrentHost | 所有用户，当前主机 配置文件的路径 |
| $PROFILE.AllUsersAllHosts | 所有用户、所有主机 配置文件的路径 |
| ::: |  |

一般当前用户，当前主机下，PowerShell 配置文件所在位置  
_**$Home\\Documents\\PowerShell\\Microsoft.VSCode\_profile.ps1**_

![7c555c73b82aae9eb7c554a6ae129e21.png](https://s2.loli.net/2023/07/09/YaD95prwfUMQgsF.png)

::: block-1  
注意 PowerShell 配置文件 Profiles 不是自动创建的，有可能这个路径 `C:\Users\sunsb\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 是存在，  
打开电脑对应的目录 C:\\Users\\sunsb\\Documents 却找不到 WindowsPowerShell 目录 和 Microsoft.PowerShell\_profile.ps1 文件  
:::

可以使用命令 **Test-Path $PROFILE** 查看当前是否存在 PowerShell 配置文件

```bat
// 查看当前是否存在 PowerShell 配置文件
// False 不存在配置文件
// True  存在配置文件
Test-Path $PROFILE

```

::: block-1  
如果没有 **Microsoft.PowerShell\_profile.ps1** 文件，使用命令 **new-item -path $PROFILE -itemtype file -force** 创建一个 PowerShell 配置文件，最好是在创建好 PowerShell 配置文件文件后查看下  
当前的 PowerShell 执行策略，**get-ExecutionPolicy** 将执行策略设置为 `RemoteSigned`，执行命令是：**set-ExecutionPolicy RemoteSigned**，如果不设置可能会报错 `无法加载配置文件`  
:::

```powershell
// 创建一个 PowerShell 配置文件
New-Item -Path $PROFILE -Type File -Force
// 当前的 PowerShell 执行策略
get-ExecutionPolicy
// 设置 PowerShell 执行策略为 RemoteSigned
set-ExecutionPolicy RemoteSigned

```

![a01694991547f14339004f04805f0fe0.png](https://s2.loli.net/2023/07/09/TcKsizQL3gykZVr.png)

::: block-1

#### 快速打开配置文件

有个小技巧，在 `C:\Users\sunsb\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 编写函数，如想使用 **vscode** 打开该文件的函数 或者 使用 **nodepad** 打开该文件的函数  
:::

```js
# Microsoft.PowerShell_profile.ps1

# 使用 vscode 打开 $PROFILE 配置文件
function vscodeOpen {
	Code $PROFILE
}

# 使用 nodepad++ 打开 $PROFILE 配置文件
function notepadOpen {
	noetepad $PROFILE
}

```

![c2b330d843e3c6b454edd3b996e89b79.png](https://s2.loli.net/2023/07/09/1XPQfZCLcj27qm8.png)

oh-my-posh 主题定制化配置
------------------------------------------------------------------------------

*   [定制化配置](https://ohmyposh.dev/docs/installation/customize)
*   [oh-my-posh 主题](https://ohmyposh.dev/docs/themes)

**定制化配置**  
<https://ohmyposh.dev/docs/installation/customize>

**oh-my-posh 主题**  
<https://ohmyposh.dev/docs/themes>

C:\\Users\\sunsb\\Documents\\WindowsPowerShell\\Microsoft.PowerShell\_profile.ps1

```powershell
# $PROFILE 配置文件路径
# C:\Users\sunsb\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1

# 配置 oh-my-posh 主题方式一
# 所有的本地主题文件都在 D:/OhMyPosh/themes 目录下，以 .json 结尾
# oh-my-posh init pwsh --config 'D:/OhMyPosh/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式二，远程方式
# oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式三，当前我使用的
# POSH_THEMES_PATH 是 oh-m-posh 的 用户环境变量
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression

# 导出 oh-my-posh 主题
# oh-my-posh config export --output D:/jandedobbeleer.omp.json

```

![20408e85658f5a8cdc47c515cc324d9e.png](https://s2.loli.net/2023/07/09/Ha2tBq9VbAzl7Ev.png)

![cf2bae39fbe1285c6e8faa921c75a4a4.png](https://s2.loli.net/2023/07/09/nsC316DSmGpT9br.png)

![a41f5b02485f7f9bbc94fb9d98f6e837.png](https://s2.loli.net/2023/07/09/KMgSNJ5GRHdCIW3.png)

此时会发现，字体和小图标是乱码的，**oh-my-posh** 想要在终端中正常的显示图标，请安装 **Nerd Font** 字体，并进行终端的 **settings.json** 的配置

**oh-my-posh** 有一个 cli 可以选择和安装 Nerd 字体（测试版）

```powershell
// 此命令需要以管理员身份执行，字体在系统范围内安装
oh-my-posh font install

```

官方也说这个只是测试版本的，个人感觉不太好，有些可能选择的字体可能装不上，根据官方友情提示 去 nerdfonts 官网下载自己想要的字体

*   [nerdfonts](https://www.nerdfonts.com/)
*   [nerdfonts downloads](https://www.nerdfonts.com/font-downloads)

**nerdfonts**  
<https://www.nerdfonts.com/>

**nerdfonts downloads**  
<https://www.nerdfonts.com/font-downloads>

这里以下载、安装、设置 **JetBrainsMono Nerd Font** 为示例

![2be9994c0e9356dcbc7ebf42fe080570.png](https://s2.loli.net/2023/07/09/HuZefTLMlPQJ2hc.png)

![483076e530c475240fbfd05b27af02e4.png](https://s2.loli.net/2023/07/09/qUhb6cN82PtX47B.png)

![a1050f3b6464f87e68bb9393fee408cb.png](https://s2.loli.net/2023/07/09/levt8JECwB19kYM.png)

打开下载的 **JetBrainsMono** 字体包，**Ctrl + a** 全选，右击 **为所有用户安装**

![e15b11c6b8e8e0df93f400ef36aed5db.png](https://s2.loli.net/2023/07/09/AI6QgYMawc4Jonh.png)

windows 下 如何查看本地的字体：**C:\\Windows\\Fonts**

![e061f84a69c50bdcd1fdb2d61f53ca5f.png](https://s2.loli.net/2023/07/09/ceJ5IbHV49lOwus.png)

然后对 windows terminal 的配置文件 **settings.json** 进行修改，选择带有 **Nerd Font** 的，字体名字好像复制不了，只能手敲了

C:\\Users\\sunsb\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal\_8wekyb3d8bbwe\\LocalState\\settings.json

```json
// C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
{
	"profiles": {
		"defaults": { // 终端的默认值配置
			"experimental.retroTerminalEffect": false, // 复古风格的终端效果
			"font": {
				"face": "JetBrainsMono Nerd Font",
				"size": 14
			}
		},
	}
}

```

如何下次快速的打开改文件，进行修改，在 PowerShell 配置文件新增个函数 **openTermialSetting** 即可

C:\\Users\\sunsb\\Documents\\WindowsPowerShell\\Microsoft.PowerShell\_profile.ps1

```powershell
# 去除 Window PowerShell 版权所有提示
clear

# Microsoft.PowerShell_profile.ps1

# 使用 vscode 打开 $PROFILE 配置文件
function vscodeOpen {
	Code $PROFILE
}

# 使用 nodepad++ 打开 $PROFILE 配置文件
function notepadOpen {
	noetepad $PROFILE
}

# 打开 windows termial 设置文件

function openTermialSetting {
	Code C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
}

# 配置 oh-my-posh 主题方式一
# oh-my-posh init pwsh --config 'D:/OhMyPosh/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式二，远程方式
# oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式三，当前我使用的
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression

# 导出 oh-my-posh 主题
# oh-my-posh config export --output D:/jandedobbeleer.omp.json

```

::: bloack-1

#### 如何去除 Window PowerShell 版权所有提示

如何去除 Window PowerShell 版权所有提示，在上面的 Microsoft.PowerShell\_profile.ps1 最前面加上 clear 或者 cls，以为 clear 只能在 Mac 下使用，window terminal 也支持  
:::

### 其他主题的更换

*   在终端使用命令 **get-Poshthemes** 查看本地 oh-my-posh 的所有主题，并且会出现其他出题的样式
*   在 oh-my-posh 官网查看 [oh-my-posh 主题](https://ohmyposh.dev/docs/themes)
*   打开 D:/OhMyPosh/themes/ 复制 .json 前面的替换即可

终端使用上面配置的函数 vscodeOpen 命令打开 $PROFILE 文件，修改对应的 xx.json 名称即可

```json
vscodeOpen

```

C:\\Users\\sunsb\\Documents\\WindowsPowerShell\\Microsoft.PowerShell\_profile.ps1

```powershell
# 去除 Window PowerShell 版权所有提示
clear

# Microsoft.PowerShell_profile.ps1

# 使用 vscode 打开 $PROFILE 配置文件
function vscodeOpen {
	Code $PROFILE
}

# 使用 nodepad++ 打开 $PROFILE 配置文件
function notepadOpen {
	noetepad $PROFILE
}

# 打开 windows termial 设置文件

function openTermialSetting {
	Code C:\Users\sunsb\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
}

# 配置 oh-my-posh 主题方式一
# oh-my-posh init pwsh --config 'D:/OhMyPosh/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式二，远程方式
# oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/jandedobbeleer.omp.json' | Invoke-Expression

# 配置 oh-my-posh 主题方式三，当前我使用的
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression

# 导出 oh-my-posh 主题
# oh-my-posh config export --output D:/jandedobbeleer.omp.json

```
```powershell
# 查看本地 oh-my-posh 所有主题，并且展示其样式
get-Poshthemes

```

![6d3a4955333fcec6c2d8db2885a648ad.png](https://s2.loli.net/2023/07/09/yjvlFPNqxoLU2rI.png)

其他问题处理
------------------------------------------------------------------

#### WindowsTerminal.exe - 系统错误

由于找不到 **MSVCP140.dll**，无法继续执行代码。重新安装程序可能会解决此问题

**Visual Studio 2015** 运行库是 microsoft 微软公司提供的很多程序软件必备的运行环境组件，  
**Visual Studio 2015** 运行库是 `Visual C++ Redistributable Package` 安装运行使用 **Visual Studio 2015** 生成的 C++ 应用程序时所需的运行时组件，  
下载并安装微软 **Visual Studio 2015** 版运行库后重启系统，`msvcp140.dll` 文件即可修复成功

[Microsoft Visual C++ 可再发行程序包最新支持的下载](https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170)

**Microsoft Visual C++ 可再发行程序包最新支持的下载**  
<https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170>

Microsoft Visual C++ 可再发行程序包最新支持的下载：<https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170>，  
找到 Visual Studio 2015、2017、2019 和 2022，我是 64位系统的，下载 体系结构 X64 的 VC\_redist.x64.exe 进行安装即可

### windows11 下，右击展开菜单

可能在平时使用过程中，在某个项目中，需要 右击打开终端，下面是 右键菜单的展开

```cmd
// 使用管理员身份，打开终端，输入命令，重启电脑

// 展开 右击菜单
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

// 折叠 右击菜单 原来的
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f

```

**快点配置一个拥有自己喜欢的明星的个性化终端吧**

![37e8a1327ebfae55c27710f0e51a0ae6.jpeg](https://s2.loli.net/2023/07/09/jar4vB9Mc3Oks6D.jpg)

