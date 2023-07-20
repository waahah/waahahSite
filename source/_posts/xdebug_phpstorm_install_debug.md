---
title: Xdebug+phpStorm安装与调试保姆级教程
date: 2022-03-22 14:58:36
tags: [PHP, Web, Xdebug]
categories: [Coding, PHP]
---

### 前言
1. 什么是`Xdebug`?

Xdebug

是一个开放源代码的PHP程序调试器，其实就是一个

Debug工具

而已 可以用来

跟踪，调试、分析

PHP程序当前的运行状况!

2. 为什么要使用Xdebug?

可能在项目开发当中 当你的业务代码复杂到一层又套一层的嵌套的时候， 或者说

print\_r

、

log

、

var\_dump

这些打印方法也满足不了你的时候,并且你也没有在

phpStorm

中配置过

Xdebug

那么我建议可以尝试一下

Xdebug

来调试代码!

3. 在window中如何下载与安装Xdebug 2.7.2

1.下载Xdebug 2.7.2

提示:

在下载

xdebug

时,会有两种版本, 一种是带有

TS

, 另外一种则

不带有TS

，

带"ts"是线程安全的意思

, 主要还是看

php

版本是否支持

线程安全

版本!

所以我们这里要先知道目前你安装的

php

版本是多少! 我的版本是

php7.3.16带ts

如何检测当前php版本

在

ide

编辑器中新建一个

test.php

然后输入以下代码:

echo phpinfo();

运行之后如图:

![d53f8794a4c27d1e1df2b5fe81e90366dcc438fd.webp](https://s2.loli.net/2023/07/08/ft7IA4z8GyKSvLW.webp)

官方下载Xdebug 2.7.2

知道了当前

php版本

等信息之后我们就可以去下载

xdebug

了

打开官方地址:

<https://xdebug.org/>

, 点击

Install

菜单选项

![eac4b74543a98226eb4e92c42bbe17094b90eb0f.webp](https://s2.loli.net/2023/07/08/kzb7LpdOjf5t6ih.webp)

然后找到下面的

Installing on Windows

点击选择

download

![9f510fb30f2442a741cec09f4b7f0343d0130288.webp](https://s2.loli.net/2023/07/08/tIjw6bqmeUZGRki.webp)

然后进行下载选择页面, 在

下载

页面中选择最下面的

historical releases(历史版本)

如图:

![d058ccbf6c81800a0f6ef19f2b099df2838b4758.webp](https://s2.loli.net/2023/07/08/KCxglwLRqZbHVI6.webp)

进入

historical releases(历史版本)

页面 这里我选择是

Xdebug 2.7.2版本

发布日期是

2019-05-06

的

![38dbb6fd5266d0169aaaa8e40e177a0f34fa350b.webp](https://s2.loli.net/2023/07/08/tHE3ZOiUpqf5nKP.webp)

提示: 这里暂时不推荐使用Xdebug3.x版本原因如下:

   1. 3.0跟2.0的配置参数写法有些不一样,并且并彻底修改了设置参数

   2. 如果你phpStorm版本比较低,那么 PhpStorm的检查脚本可能还没有完全更新 使用Xdebug3.x版本集成还有一定的兼容性问题

自动分析你系统对应的xdebug版本

当然如果你确实不知道当前

php

的版本,又懒得去找那么就试试这个地址:

<https://xdebug.org/wizard>

,这个是

xdebug

官方网站给用户提供的一个自动分析当前电脑系统对应的

xdebug

版本的页面! 打开它你将看到以下页面！

![48540923dd54564e1a42030228e2328ad1584faf.webp](https://s2.loli.net/2023/07/08/f419XEYZ53Itwz2.webp)

在这个页面中需要把你在

ide

中输入

`phpinfo()`函数

打印出的php版本信息使用

ctrl+A

全选粘贴到页面中的

多行文本框

中后,再点击

Analyse my phpinfo() output

提交你的

php信息

它会帮你分析出最适合你的

xdebug

版本!

如图

![3e46aef9c97e34f6964f341fca558e88.gif](https://s2.loli.net/2023/07/08/YG2KlMSaVUPELJc.gif)

这个功能很贴心的能够帮助你生成你要找的

xdebug

版本,

![d4628535e5dde711a54a706507d360139c166149.webp](https://s2.loli.net/2023/07/08/EeP6HOwAZ8Tmkn9.webp)

多说一句,虽然这里能够帮助你分析出合适的xdebug版本, 但检测出来的版本也不一定就是匹配正确的! 如果出现问题就多换几个低版本的试试!

那么我这里就下载的是

php\_xdebug-2.7.2-7.3-vc15-x86\_64

下载完毕之后如下图:

![a50f4bfbfbedab64373d0f396c0a01cb78311e44.webp](https://s2.loli.net/2023/07/08/vXtqBxiR2uCcVeE.webp)

   2. 安装Xdebug2.7.2

将下载的php\_xdebug-2.7.2-7.3-vc15-x86\_64.dll文件移动到X:\\php7.3.16\\ext目录下当然如果你是一键php环境例如wamp、xampp等也就在他们的目录下找到对应php版本文件夹下的ext目录就可以了!

![ae51f3deb48f8c545dff8e9ba41583fde0fe7f1f.webp](https://s2.loli.net/2023/07/08/HnjKzlIphQTJZSY.webp)

找到php.ini文件编辑X:\\php7.3.16\\php.ini

![902397dda144ad34532baba94c9ea2fc30ad85c8.webp](https://s2.loli.net/2023/07/08/1oPZTaYNjlXywJ2.webp)

打开

php.ini文件

并在里面添加如下代码:
```ini
\[xdebug\]

;加载xdebug库文件

zend\_extension = "X:\\php7.3.16\\ext\\php\_xdebug-2.7.2-7.3-vc15-x86\_64.dll"
```
注意:

   1. 这里的 X 指的是你自己的硬盘目录

   2. 代码可以直接加在php.ini文件的最后

3.php.ini文件中增加的代码行等号前后有空格，值可以有双引号,当然也可以没有引号,但我个人建议加上

![9c16fdfaaf51f3deac5fbec00dd25e173b29796d.webp](https://s2.loli.net/2023/07/08/WtMTnqkx4OuREpl.webp)

一定要重新启动apache网络服务器

到这里

xdebug

的

下载

和

安装启用

就完成了，重新在php代码中打印

phpinfo()函数

在打开的信息页面中如果有出现下图效果才能说明安装正确!

![86d6277f9e2f070832c2a8b670181691a801f202.webp](https://s2.loli.net/2023/07/08/vhQUlsjN1kCORJL.webp)

4. Xdebug2.x 常见配置参数

我们安装启动好了

xdebug

之后 还需要对它进行一些参数上的配置, 我自己常用的配置参数如下表:

![a044ad345982b2b75cfe90fba89165e776099b75.webp](https://s2.loli.net/2023/07/08/WA9dQ6tN3HLB4Vp.webp)

php.ini中我的配置如下
```ini
\[xdebug\]

;加载xdebug库文件

zend\_extension = "E:\\php7.3.16\\ext\\php\_xdebug-2.7.2-7.3-vc15-x86\_64.dll"

xdebug.auto\_trace="On"

xdebug.show\_exception\_trace="On"

xdebug.remote\_autostart="On"

;开启远程调试

xdebug.remote\_enable = "1"

;客户机ip

xdebug.remote\_host = "localhost"

;客户机xdebug监听端口和调试协议

xdebug.remote\_port = "9001"

;用于zend studio远程调试的应用层通信协议

xdebug.remote\_handler = "dbgp"

xdebug.collect\_vars="On"

;是否开启调试内容

xdebug.profiler\_enable = "On"

xdebug.trace\_output\_dir="E:\\xdebug\_tmp\\debug.log"

xdebug.profiler\_output\_dir="E:\\xdebug\_tmp\\debug.log"
```
5. 如何在本地phpStorm中配置xdebug2.x

   1. 配置端口(port)号

启动

phpStorm

随后在打开

File--->Settings--->Languages & Frameworks(语言与框架中)--->PHP---->Debug

在显示的面板中设置端口，端口默认为9000，我们在

php.ini

中配置的多少这里就设置是多少!

如图

![ac6eddc451da81cb7be5f81bc95a7e1e082431ad.webp](https://s2.loli.net/2023/07/08/gmzbXtav7pRcMlZ.webp)

   2. 设置DBGp Proxy

打开

File--->Settings--->Languages & Frameworks(语言与框架中)--->PHP---->Debug---->DBGp Proxy

在

DBGp Proxy

中配置如下:

idekey

就是在

php.ini

配置文件中设置的名字 (配置文件中没有 也没关系!)

host

是你的服务器ip或者是已经可以解析的域名，或者本地就直接写

localhost

或

127.0.0.1

也行

port

可以自选，一般默认选

80

就好了

如图

![a8ec8a13632762d039bd87223ad0a6f2503dc675.webp](https://s2.loli.net/2023/07/08/oQ1Zzg5JiSkR38n.webp)

   3. 手动添加一个Servers

打开

File--->Settings--->Languages & Frameworks(语言与框架中)--->PHP---->Servers

在出现的对话框中 填写如下信息:

name

填写一个名称 随意都可以!

Host

填写配置当前服务器ip或

localhost

port

是默认80端口，也可以根据你的配置填写 你更改的web端口号

debug

选

xdebug

![a9d3fd1f4134970a4fa3ca950cf67fc0a6865d79.webp](https://s2.loli.net/2023/07/08/qOsbUZhmQwXTlpI.webp)

   4. 测试xdebug2.x的配置是否成功!

再次打开

File--->Settings--->Languages & Frameworks(语言与框架中)--->PHP---->Debug

接着点击右边的

Validate(验证)

按钮 如下图:

![c8177f3e6709c93da0d99d5b050156d4d100543c.webp](https://s2.loli.net/2023/07/08/qIEiJSdkDryGR6g.webp)

会弹出

Validate Debugger Configuration on Web Server(验证Web服务器调试器配置)

对话框

创建一个

调试服务

，用于与真正服务器同步

Path to create Validation script:

是填写 创建验证脚本的路径,也就是你的服务站点路径地址

Url to validation script:

验证脚本的Url地址 也就是你的解析好的域名网络地址目录

如下图:

![35a85edf8db1cb135fb733617c68f84693584bae.webp](https://s2.loli.net/2023/07/08/E75GsfyvdpNKuCo.webp)

到此我们在

phpSrorm

中配置

Xdebug2.x

就完成了!

   6. 测试一下在本地使用Xdebug2.x来调试php代码

在

phpStorm

中新建一个页面名为

index.php

输入以下代码
```php
for($i=0;$i<5;$i++){

echo $i;

}

echo "hello world";

echo phpinfo();
```
然后选择

Run菜单选项----->Debug

， 在弹出对话框中选择

index.php(PHP Script)

![64380cd7912397dd228b0cc6c0be1cbfd2a287c3.webp](https://s2.loli.net/2023/07/08/yJf4UIB1XWcZTdE.webp)

在

phpStorm IDE

右上角再中打开

debug

监听按钮, 如下图

![cefc1e178a82b9012253a41ae8b1077f3812efe6.webp](https://s2.loli.net/2023/07/08/aF9SiJtsvzpM7lk.webp)

现在就可以开始断点调试了! 比如先在要断点的代码处打

断点标记

![dbb44aed2e738bd41a55a65238b729de277ff926.webp](https://s2.loli.net/2023/07/08/EB4kz3pQmtF791v.webp)

然后按下键盘上的

shift+F9

或 直接点

phpStorm IDE

右上角的

小虫

图标

![902397dda144ad34c85c232f4d9ea2fc30ad8578.webp](https://s2.loli.net/2023/07/08/FUrZmlOoMs27tPn.webp)

就可以

断点调试

了, 按下快捷键

F9

或者点击

Resume Program(恢复按钮)

进行基础

断点调试

![771fcf501cc75b60cd4b71948a0f18c5.gif](https://s2.loli.net/2023/07/08/72PJL9j6AyIm1Mo.gif)

关于xdebug的详细使用我会在之后继续更新!

