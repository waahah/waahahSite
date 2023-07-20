---
title: 全网最详细nvm安装和使用保姆级教程
date: 2023-07-12 14:58:36
tags: [Version, Nvm, Nodejs]
categories: [Coding, Nodejs]
---

nvm安装和使用保姆级教程（详细）
=================

### 一、 nvm是什么  ：

  `nvm`全英文也叫`node.js version management`，是一个nodejs的版本管理工具。`nvm`和`npm`都是node.js版本管理工具，为了解决node.js各种版本存在不兼容现象可以通过它可以安装和切换不同版本的node.js。

### 二、卸载之前安装的node:

1、**不能安装任何node版本（如存在请删除后安装nvm）;**

2、打开系统的控制面板，点击卸载程序，卸载nodejs

![1087e63c71bb42519cdeaa8ae5d6f115.png](https://s2.loli.net/2023/07/15/bjxBTI4hK3Q7GHS.png)

![a9cc478b3ef04e4990b953b5f8135f17.png](https://s2.loli.net/2023/07/15/qzl5hFTDYEvRuUa.png)

3、删除node的安装目录

默认是C:\\Program Files\\nodejs，也可能在其他盘，主要取决于安装时的选择。

查看该路径下是否有node文件，我这里已经没有了，在控制面板卸载node后一般会自动删除node文件，如果文件还在的话就手动删除。

![49fac0af6e60417c856ac78cf3c9a506.png](https://s2.loli.net/2023/07/15/S3kjm62CurKwiGN.png)

4、查找.npmrc文件是否存在，有就删除

默认在C:\\User\\用户名。

![993e5db1b5ae437aa81254383d6db264.png](https://s2.loli.net/2023/07/15/rKPnMtDJX6hUjie.png)

5、逐一查看一下文件是否存在，存在就删除

C:\\Program Files (x86)\\Nodejs  
C:\\Program Files\\Nodejs  
C:\\Users\\用户名\\AppData\\Roaming\\npm  
C:\\Users\\用户名\\AppData\\Roaming\\npm-cache  
 

![64f9daff4f274b89b01fb4bf784134ab.png](https://s2.loli.net/2023/07/15/P5JK2yTlFCBMY31.png)

6、查看是否删除成功

在键盘上按下win + R ，输入cmd ，然后点击回车键，在命令行中输入node -v

![ee55ab36eba24ec09648012b455a3b3e.png](https://s2.loli.net/2023/07/15/je1xbvUl8dWLYMR.png)

![1de1e6cf41604abc8edcce397c28311b.png](https://s2.loli.net/2023/07/15/8Hfm72F4OIlKWkV.png)

* * *

### 三、nvm下载

nvm下载地址

可在点此在github上下载最新版本,本次下载安装的是windows版本。打开网址我们可以看到有两个版本：

nvm 1.1.7-setup.zip：安装版，推荐使用  
nvm 1.1.7-noinstall.zip: 绿色免安装版，但使用时需进行配置。

![0fc79825365448ed8fec18c445ad2616.png](https://s2.loli.net/2023/07/15/poMhuFlJLdwePQT.png)

* * *

### 四、nvm安装

1.下载完成后解压,nvm-setup.zip，直接运行nvm-setup.exe

![fcd7f90b460a4fd58caf5faf8017cae5.png](https://s2.loli.net/2023/07/15/i3JGjOweQsYSp5N.png)

2.选择nvm安装路径

![055a05d28fc14d3d8b048076f82f7404.png](https://s2.loli.net/2023/07/15/sOnjXM1I6HV4hQP.png)

3、选择nodejs路径

![0b78cdfcf100430d8ccbe86ba06f0f46.png](https://s2.loli.net/2023/07/15/wjrZ58UgbLnu3pT.png)

4.确认安装即可

![358390f4e4a046c5a2e4aeacaf8ed3c2.png](https://s2.loli.net/2023/07/15/4Qma1JcquhYIM3H.png)

5.安装完确认

![9a443d3543274bbda84364452114d5ce.png](https://s2.loli.net/2023/07/15/rI6FvxRDKhweGCZ.png)

打开CMD，输入命令 nvm ，安装成功则如下显示。可以看到里面列出了各种命令，本节最后会列出这些命令的中文示意。

6、nvm命令提示

```shell
nvm arch：显示node是运行在32位还是64位。
nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
nvm on ：开启node.js版本管理。
nvm off ：关闭node.js版本管理。
nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm uninstall <version> ：卸载指定版本node。
nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
nvm version ：显示nvm版本。version可简化为v。
```

* * *

### 五、安装node.js版本

1、nvm list available 显示可下载版本的部分列表

![6842207d50fa4ab3aeaae829f0c63796.png](https://s2.loli.net/2023/07/15/q5h2iMrsHkgyQoA.png)

2、nvm install 版本号 安装指定的版本的nodejs

![4b4c0741e2104b9b8d8fb08a02158fa4.png](https://s2.loli.net/2023/07/15/Yg8F4MKewVIyBpN.png)

![1b0e8dcf18234a1aa9ede2db2e9d8ded.png](https://s2.loli.net/2023/07/15/IPKWyLJujYfpixC.png)

3、查看已安装版本

nvm list或nvm ls查看目前已经安装的版本 （ 当前版本号前面没有 \* ， 此时还没有使用任何一个版本，这时使用 node.js 时会报错 ）

![300446f1b2c34c848962e07bf8c151ce.png](https://s2.loli.net/2023/07/15/1NRGMv5BpgSUIKs.png)

切换node版本  
nvm use版本号 使用指定版本的nodejs （ 这时会发现在启用的 node 版本前面有 \* 标记，这时就可以使用 node.js ）

![c879e75a467148c0ace4417f0dfd7ee3.png](https://s2.loli.net/2023/07/15/hf4nC8WMwkKT91s.png)

### 六、nvm常见问题

  
如果下载node过慢，请更换国内镜像源, 在 nvm 的安装路径下，找到 settings.txt，设置node_mirro与npm_mirror为国内镜像地址。下载就飞快了~~

root: D:\\nvm（此路径代表安装nvm的时候nvm安装的地址）  
path: D:\\nodejs（此路径代表切换node的地址）  
node_mirror: https://npm.taobao.org/mirrors/node/  
npm_mirror: https://npm.taobao.org/mirrors/npm/

### nvm的环境变量配置：

  
1到这个链接下载nvm的安装包：https://github.com/coreybutler/nvm-windows/releases。  
2然后点击一顿下一步，安装即可！  
3安装完成后，还需要配置环境变量。在我的电脑->属性->高级系统设置->环境变量->系统环境变量->Path下新建一个，把nvm所处的路径填入进去即可！

![5ed7151b670f45ca9ebb3a05b6d513f1.png](https://s2.loli.net/2023/07/15/1StjCVDvlKs9mNH.png)

  
4打开cmd，然后输入nvm，如果没有提示没有找不到这个命令。说明已经安装成功！  
nvm常用命令：

（1）nvm install node：安装最新版的node.js。nvm i == nvm install。  
（2）nvm install [version]：安装指定版本的node.js 。  
（3）nvm use [version]：使用某个版本的node。  
如果之前安装过node，此处会导致nvm use命令失效（提示成功，但是实际并未切换），本次由于环境变量中自动生成的NVM_SYMLINK配置有误，解决办法：

　　　　![df085beec56f438289f94eedce3836a9.png](https://s2.loli.net/2023/07/15/lAbGK8EfOXUowBF.png)

 成功解决。

nvm list：列出当前安装了哪些版本的node。  
nvm uninstall [version]：卸载指定版本的node。  
nvm node_mirror [url]：设置nvm的镜像。

