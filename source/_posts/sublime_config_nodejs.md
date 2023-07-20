---
title: sublime配置nodejs环境
date: 2021-07-23 14:58:36
tags: [IDE, Sublime Text,Nodejs]
categories: [IDE, Sublime Text]

---

### 前言

sublime配置nodejs环境

#### 1. 到nodejs的官网下载安装包，直接点击Install即可。（参照自己的系统版本安装，官网会自动匹配系统的版本。）node.js环境可以在如下网址进行下载安装：<https://nodejs.org/en/>,安装完成node环境后，在终端输入如下命令获取node的路径：

windows使用

```powershell
where node
```

macos使用

```bash
which node
```

#### 2. 完成后，在开始菜单找到Node.js，即开始-->Node.js-->Node.js command prompt，输入`node -v`检查版本号，看能否成功，成功后继续输入`npm -v`。

#### 3. 配置sublime，搭建一个系统环境：打开Sublime Text -> Tools -> Build -> Build System -> New Build System

![3](https://s2.loli.net/2023/06/10/bqKs8fzVvJRD4tx.png)


#### 4. 把上一步的内容清空，输入下面的内容，保存并命名为 `node.sublime-build`。 

```json
{
    "cmd": ["node", "$file"], "selector": "source.js" 
}

```

#### 5. 新建一个js文件，输入：`console.log("Hello world!")` 。`Ctrl+B`进行运行，即可在控制台看到相应的输出:Hello world!

![5](https://s2.loli.net/2023/06/10/UcwsYOPK2HlvJ4C.png)

#### 6. 如果有朋友遇到了  

    “\[Errno 2\] No such file or directory: ‘node’（或者系统找不到指定文件）  
    \[cmd: \['node’, ‘/Users/mcdong/mcdong/tmp/demo.js’\]\]  
    \[dir: /Users/mcdong/mcdong/tmp\]  
    \[path: /usr/bin:/bin:/usr/sbin:/sbin\]  
    \[Finished\]”  
    的问题，这时候应该把node.sublime-build中的node改成你安装路径中的node的绝对地址，我的绝对地址是D:/Program Files/nodejs/node

