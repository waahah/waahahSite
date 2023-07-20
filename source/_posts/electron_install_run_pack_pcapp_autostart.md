---
title: Electron安装+运行+打包成桌面应用+打包成安装文件+开机自启动
date: 2023-08-30 14:58:36
tags: [JavaScript, App, Electron]
categories: [Coding, JavaScript]
---

### 什么是Electron？

Electron 是一个开源的 JavaScript 框架代码，很多应用都使用它进行了开发，比较著名的案例有 Discord,Slack,Notion,Vscode,Spotify 等。

Electron结合了Chromium（谷歌浏览器的核心）、`Node.js`（服务器端JavaScript运行环境）和Native APIs（操作系统原生接口），让你能够用网页技术创建具有原生体验的桌面应用。

### 为什么选择Electron？

- 跨平台：一次编写，到处运行。Electron让你只需编写一次代码，就能在不同平台上运行。
- 丰富的生态系统：Electron背后有着强大的开源社区和丰富的资源，让你在开发过程中如虎添翼。
- 简单易学：只要你懂得基本的网页技术，上手Electron就非常轻松。

### 如何开始？
1. 安装`Node.js`：Electron依赖Node.js，因此请先访问[Node.js](https://nodejs.org/)官网下载并安装。

2. 创建项目文件夹：建立一个新的文件夹，用于存放项目文件。

3. 初始化node项目，生成package.json文件，在项目文件夹中打开命令行工具运行
```bash
npm init
```

4. 安装Electron，将Electron添加到项目的开发依赖中。
```bash
npm install electron --save-dev
```

### 一个简单的Electron应用
创建一个简单的Electron应用，只需要以下几个文件：

1. `package.json`：项目配置文件，已在初始化项目时生成。
2. `main.js`：应用的主入口文件，用于控制应用的生命周期。
3. `index.html`：应用的界面文件，用于展示应用的内容。

### 根目录下新建index.js或main.js文件

```js
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
```

### 修改package.json
在`package.json`中，添加如下内容：

```json
"scripts": {
  "start": "electron ."
},
"main": "main.js"
```

### 根目录下新建index.html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Hello Electron!!</h1>
</body>
</html>
```

### 运行应用
在项目文件夹中打开命令行工具，执行启动命令:

```bash
npm start
```

![](https://s2.loli.net/2023/07/19/N4YB1yQUf5WzjP8.png)

目前为止，一个最糙的demo就完成了，但这样是远远不够的，作为一个桌面应用程序，我们希望点击exe文件就能直接启动应用，而不是打开命令行，输入启动命令。这一步就需要打包工具来完成了。

### 打包可执行程序

1. 安装electron打包工具`electron-packager`

```bash
npm install electron-packager -g
```

2. 配置打包命令

```json
"scripts": {
    "start": "electron .",
    "pack": "electron-packager . myClient --win --out ../myClient --arch=x64 --app-version=0.0.1 --electron-version=2.0.0"
  }
```

3. 命令结构如下（根据实际情况修改）：

- `.`：需要打包的应用目录（即当前目录），

- `myClient`：应用名称，

- `--win`：打包平台（以Windows为例），

- `--out ../myClient`：输出目录，

- `--arch=64`：64位，

- `--app-version=0.0.1`：应用版本，

- `--electron-version=2.0.0`：electron版本

3. 执行打包命令：

```bash
npm run pack
```

打包完成后，找到输出目录，打开打包完成后的文件夹，

![1111288-20180830125206593-482381090.png](https://s2.loli.net/2023/07/19/ufjkoHEJ2iga5db.png)

可以看到生成了.exe的执行文件以及其他的一堆配置文件，双击myClient.exe就可以打开应用程序了。

现在，我们已经得到了应用程序的绿色版本（无需安装，拷贝整个文件目录之后即可使用），但是作为客户端应用程序，我们更希望能直接得到一个安装包，安装之后通过桌面快捷方式的形式去访问，这时候就需要Inno Setup出场了。

### 打包安装包

下载安装`Inno Setup`

下载地址：<https://pc.qq.com/detail/13/detail_1313.html>

安装完成以后打开`Inno Setup`客户端

1. file->new，新建脚本

![1111288-20180830130856716-538372404.png](https://s2.loli.net/2023/07/19/Lh7c32WUnjZTwze.png)

2. 填写应用程序信息，黑体为必填项

- `Application name`： 应用名称；

- `Application version`：应用版本；

- `Application publisher`：发行单位（可选）；

- `Application websiter`：应用程序网址（可选）；

![1111288-20180830131207169-2126939655.png](https://s2.loli.net/2023/07/19/blGgxo9VQdarOn5.png)

4. 完善应用文件信息

- `Application destination base folder`：应用程序目标基本文件夹，可默认也可自定义；

- `Application folder name`：应用文件夹名称；

- `Allow user to change the application folder`：勾选，允许用户自定义安装位置；

![1111288-20180830131655386-1627691514.png](https://s2.loli.net/2023/07/19/qOkWM7jQnP5eVr6.png)

5. 指定属于应用程序的文件

- `Application main executable file`：应用程序主执行文件，即第8步中打包生成的.exe文件；

- `Allow user to start the application after Setup has finished`：允许用户在安装完成后启动应用程序；

- `Add folders`：添加应用程序文件，选择第8步中打包出的文件根目录即可，要把所有.dll文件及其他配置文件都包含进去；

![1111288-20180830132530971-1183817547.png](https://s2.loli.net/2023/07/19/niFIGs1ByAJO5vg.png)

点击添加之后可以看到：

![1111288-20180830170548376-1777612815.png](https://s2.loli.net/2023/07/19/YGJ6NWLbIBj5FtR.png)

文件目录以自己的实际情况为准。

6. 指定应用程序的快捷方式，勾选默认的两项即可，即“创建主执行程序的快捷方式到公共开始菜单程序文件夹”、“允许用户创建桌面快捷方式”

![1111288-20180830132949182-381967293.png](https://s2.loli.net/2023/07/19/Bu6HRXUDyIewagA.png)

7. 指定安装期间要显示的文档文件

- `License file`：许可文件；

- `Information file shown before installation`：安装之前显示信息文件；

- `Information file shown after installation`：安装之后显示信息文件；

![1111288-20180830133233804-1914289111.png](https://s2.loli.net/2023/07/19/nRLshYcwDufIrWd.png)

8. 指定应包括的安装语言（汉化版的有简体中文选项），选择之后点击下一步

![1111288-20180830133354525-244584303.png](https://s2.loli.net/2023/07/19/udKWTsONtehDIgf.png)

9. 指定基本编译设置

- `Custom compiler output folder`：自定义编译器输出文件夹，即最终编译出的安装包要放哪个位置；

- `Compiler output base file name`：编辑器输出基本文件名，即安装包名称；

- `Custom Setup icon file`：自定义安装程序图标文件；

- `Setup password`：安装密码；

![1111288-20180830134824434-1790296012.png](https://s2.loli.net/2023/07/19/ZXTKD4QifV72rlj.png)

10. 点击下一步

![1111288-20180830134908158-257778451.png](https://s2.loli.net/2023/07/19/UHDje23NTmWIu6h.png)

11. 剩下的就是一路确定了，会询问你在编译之前要不要保存你的脚本（上面的配置步骤，最终会生成一个编译脚本文件），点击保存，先不要编译，打开脚本文件，新增配置项，修改注册表，设置开机自启动

![1111288-20180830135735948-1665387271.png](https://s2.loli.net/2023/07/19/zAB8V1FTK3koi5v.png)

```
[Registry]
Root: HKLM; Subkey: "SOFTWARE\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "testrun"; ValueData: "{app}\{#MyAppExeName}"
```

12. 然后，执行编译文件：build->compile

![1111288-20180830140026934-1741138062.png](https://s2.loli.net/2023/07/19/3u2eSijmrRAwBMZ.png)

至此，所有步骤已经完成了，赶快去看看你的安装包能不能正常使用吧。

### 相关资源：

- [Electron官方文档](https://www.electronjs.org/docs)
- [Electron中文文档](https://www.electronjs.org/zh/docs/latest/)
- [Awesome Electron](https://github.com/sindresorhus/awesome-electron)：Electron相关资源的汇总
- [Electron Fiddle](https://www.electronjs.org/fiddle)：Electron代码实验工具