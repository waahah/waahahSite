---
title: Node.js安装及环境配置之Windows篇
date: 2021-07-27 14:58:36
tags: [Coding, Nodejs]
categories: [Coding, Nodejs]

---

### 一、安装环境

#### 1、本机系统：Windows 10 Pro（64位）  

#### 2、Node.js：v14.9.2LTS（64位）

### 二、安装Node.js步骤

#### 1、下载对应你系统的`Node.js`版本:[https://nodejs.org/en/download/](https://nodejs.org/en/download/)  

#### 2、选安装目录进行安装  

#### 3、环境配置  

#### 4、测试

### 三、前期准备

#### 1、Node.js简介  

简单的说 `Node.js` 就是运行在服务端的 `JavaScript`。`Node.js` 是一个基于 [Chrome V8](https://developers.google.com/v8/) 引擎的 JavaScript 运行环境。`Node.js` 使用了一个事件驱动、非阻塞式 `I/O` 的模型，使其轻量又高效。`Node.js` 的包管理器 [npm](https://www.npmjs.com/)，是全球最大的开源库生态系统。  

#### 2、下载Node.js

打开官网下载链接:[https://nodejs.org/en/download/](https://nodejs.org/en/download/) 我这里下载的是`node-v6.9.2-x64.msi`,如下图：

![](https://s2.loli.net/2023/06/11/3LjmprtsZzcMXCY.png)

### 四、开始安装

1、下载完成后，双击`node-v6.9.2-x64.msi`，开始安装`Node.js`

![](https://s2.loli.net/2023/06/11/ePlCHa8wj9RNYWq.png)


点击【Next】按钮

![2267589-69648c7b8aa496fe.png](https://s2.loli.net/2023/06/11/REeDMSltri1P4Q3.png)


勾选复选框，点击【Next】按钮

![](https://s2.loli.net/2023/06/11/SJY7tc3hlwpDBg9.webp)


修改好目录后，点击【Next】按钮

![](https://s2.loli.net/2023/06/11/QztV6CZLfpObl78.png)

![](https://s2.loli.net/2023/06/11/uI9gdWkxaRKHbU8.png)


安装完后点击【Finish】按钮完成安装

![](https://s2.loli.net/2023/06/11/Y2J1mDjix46sfG8.png)

至此`Node.js`已经安装完成，可以先进行下简单的测试安装是否成功了，后面还要进行环境配置  
在键盘按下【`win+R`】键，输入`cmd`，然后回车，打开`cmd`窗口

![](https://s2.loli.net/2023/06/11/rNjD7qPXS6d5HlJ.png)

![](https://s2.loli.net/2023/06/11/tp41y5lzcaL2Xvn.png)

安装完后的目录如下图所示：

![](https://s2.loli.net/2023/06/11/pfUKy1BoFGjnYAd.png)

此处说明下：新版的`Node.js`已自带`npm`，安装`Node.js`时会一起安装，`npm`的作用就是对`Node.js`依赖的包进行管理，也可以理解为用来安装/卸载`Node.js`需要装的东西

### 五、环境配置

说明：这里的环境配置主要配置的是npm安装的全局模块所在的路径，以及缓存cache的路径，之所以要配置，是因为以后在执行类似：`npm install express \[-g\]` （后面的可选参数`-g`，`g`代表`global`全局安装的意思）的安装语句时，会将安装的模块安装到【C:\\Users\\用户名\\AppData\\Roaming\\npm】路径中，占C盘空间。  
例如：我希望将全模块所在路径和缓存路径放在我node.js安装的文件夹中，则在我安装的文件夹【D:\\Develop\\nodejs】下创建两个文件夹【`node\_global`】及【`node\_cache`】如下图：

![](https://s2.loli.net/2023/06/11/1dQ7HIF6W4nUvac.png)

创建完两个空文件夹之后，打开`cmd`命令窗口，输入

```bash
npm config set prefix "D:\Develop\nodejs\node_global"
npm config set cache "D:\Develop\nodejs\node_cache"
```

![](https://s2.loli.net/2023/06/11/Dc6UYuWmEr37SIi.png)

接下来设置环境变量，关闭`cmd`窗口，“我的电脑”-右键-“属性”-“高级系统设置”-“高级”-“环境变量”

![](https://s2.loli.net/2023/06/11/iCPYKhf6XWg3QRI.png)

进入环境变量对话框，在【系统变量】下新建【NODE\_PATH】，输入【D:\\Develop\\nodejs\\node\_global\\node\_modules】，将【用户变量】下的【Path】修改为【D:\\Develop\\nodejs\\node\_global】

![2267589-ca94af8646fab0b4.png](https://s2.loli.net/2023/06/11/ubOTI4PAFcRfrUd.png)

![](https://s2.loli.net/2023/06/11/pDYou6XxkRez4cJ.png)

![](https://s2.loli.net/2023/06/11/4SqiAOeawoDyL8v.png)

![](https://s2.loli.net/2023/06/11/s3uhiT5IxMPoKpD.png)

### 六、测试

配置完后，安装个module测试下，我们就安装最常用的express模块，打开`cmd`窗口，  
输入如下命令进行模块的全局安装：

```bash
npm install express -g     # -g是全局安装的意思
```

![](https://s2.loli.net/2023/06/11/MC5aNzjI9lWisqQ.png)

