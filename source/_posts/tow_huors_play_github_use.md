---
title: 两小时玩转Github
date: 2021-09-26 14:58:36
tags: [Github, Bash,Git]
categories: [Git]

---

## 前言
**1\. 了解Git和Github**

1.1什么是Git
---------

Git是一个免费、开源的版本控制软件

1.2什么是版本控制系统
------------

版本控制是一种记录一个或若干个文件内容变化，以便将来查阅特定版本修订情况得系统。

Ø  系统具体功能

记录文件的所有历史变化

随时可恢复到任何一个历史状态

多人协作开发或修改

错误恢复

1.3什么是Github
------------

Github是全球最大的社交编程及代码托管网站（https://github.com/）。

Github可以托管各种git库，并提供一个web界面（用户名.github.io/仓库名）

1.4Github和Git是什么关系
------------------

Git是版本控制软件

Github是项目代码托管的平台，借助git来管理项目代码

1.5为什么学习github
--------------

学习优秀的开源项目

关注行业前辈了解最新的行业动态

如：

PHP 鸟哥，前新浪总架构师 https://github.com/laruence

国内最流行的PHP开发框架（thinkphp）：https://github.com/top-think/thinkphp

全球最流行的PHP框架（laravel）：https://github.com/laravel/laravel

PHP编码规范（FIG-PHP）：https://www.gitbook.com/book/jifei/php-fig-standards/details

2\. 使用Github
============

2.1目的
-----

借助github托管项目代码

2.2基本概念
-------

### 仓库（Repository）

仓库用来存放项目代码，每个项目对应一个仓库，多个开源项目则有多个仓库

### 收藏（Star）

收藏项目，方便下次查看

### 复制克隆项目（Fork）

![](https://s2.loli.net/2023/07/01/mkgVG4OojfHuXAQ.png) 
脚下留心：该fork的项目时独立存在的

### 发起请求（Pull Request）

![](https://s2.loli.net/2023/07/01/9Y7n3Q8FahvTlmZ.png)

### 关注（Watch）

关注项目，当项目更新可以接收到通知

### 事务卡片（Issue）

发现代码BUG，但是目前没有成型代码，需要讨论时用；

### Github主页

账号创建成功或点击网址导航栏github图标都可进入github主页：该页左侧主要显示用户动态以及关注用户或关注仓库的动态；右侧显示所有的git库

### 仓库主页

仓库主页主要显示项目的信息，如：项目代码，版本，收藏/关注/fork情况等

### 个人主页

个人信息：头像，个人简介，关注我的人，我关注的人，我关注的git库，我的开源项目，我贡献的开源项目等信息

2.3注册github账号
-------------

### 官方网址

github.com

 ![](https://s2.loli.net/2023/07/01/oIP1sY2d4pn8AtX.png)  

![](https://s2.loli.net/2023/07/01/SebTiX2WU5cqIpV.png)  

![](https://s2.loli.net/2023/07/01/7vRGxazQsF35Spn.png)  

![](https://s2.loli.net/2023/07/01/2jBg6KwFv3HyEOM.png)  

![](https://s2.loli.net/2023/07/01/GToxncBmbe1D8h3.png)  

### 脚下留心

1、因为github在国外服务器所以访问较慢或者无法访问，需要翻墙（Shadowsocks/V2ray/Clash）

2、私有仓库只能自己或者指定的朋友才有权限操作（私有仓库是收费的）

3、新注册的用户必须验证邮箱后才可以创建git库仓库（）



2.4创建仓库/创建新项目
-------------

### 说明

一个git库（仓库）对应一个开源项目

通过git管理git库

### 创建仓库

1)点击【Start aproject】创建一个仓库

![](https://s2.loli.net/2023/07/01/FyQXP3YvgbxitBE.png)

2)问题：点击【Start aproject】创建一个仓库，后出现该页面

2)原因：未验证邮箱，点击下图框框中的链接进行验证

![](https://s2.loli.net/2023/07/01/Hsqgk9Mnp3t8DIr.png)

3)点击【resend】发送邮件验证邮箱

![](https://s2.loli.net/2023/07/01/s3gLWtTJEVjG8BZ.png)

4)点击【verifyemail address】验证邮箱

   说明：验证成功后会自动跳转github主页，重新点击【Start a project】即可创建仓库

![](https://s2.loli.net/2023/07/01/yACeuKkdW1NIglZ.png)

5) 验证邮箱后，点击【Start a project】进入下图界面

![](https://s2.loli.net/2023/07/01/RwAPkynzpiQx7Vs.png)

### 仓库主页说明

![](https://s2.loli.net/2023/07/01/BkqhXYIE54MoCjf.png)

### 脚下留心

qq邮箱需要设置白名单才可以收到邮件

**︴未验证邮箱提示页面**

![](https://s2.loli.net/2023/07/01/hrbqGajTlR6tZLk.png) 

### ︴设置QQ邮箱白名单

1、打开QQ邮箱、点击【设置】

2、点击【反垃圾】

3、点击【设置域名白名单】

4、在新页面的input框中输入【github.com】添加即可

![](https://s2.loli.net/2023/07/01/dg81DmP5M9kJRjO.png)

![](https://s2.loli.net/2023/07/01/uEAImj4xrDy3cL5.png)

2.5仓库管理
-------

### 新建文件

仓库主页，点击【create new file】创建仓库文件

![](https://s2.loli.net/2023/07/01/j53iYc6vqf8Ztmu.png)

![](https://s2.loli.net/2023/07/01/78fCVoheptGmxgl.png)

![](https://s2.loli.net/2023/07/01/X9fDRLkm7tqjnaZ.png)

![](https://s2.loli.net/2023/07/01/rxmzBGhEc5PkoFY.png)

### 编辑文件

仓库主页，点击【需要修改的文件】进入文件详情页

![](https://s2.loli.net/2023/07/01/BLznZe4OuCoktVy.png)

![](https://s2.loli.net/2023/07/01/W6J94iVH1QmlFBe.png)

![](https://s2.loli.net/2023/07/01/dNw72jMQhBH9km1.png)

**删除文件**

![](https://s2.loli.net/2023/07/01/Dyc9oTjHhAb7LGR.png)

![](https://s2.loli.net/2023/07/01/nLJcrtNzE57RBpj.png)

![](https://s2.loli.net/2023/07/01/3NV7s1zSYGaMgjx.png)

︴思考被删除文件如何查看信息

答案：点击commits按钮查看

![](https://s2.loli.net/2023/07/01/j1oKUcAiOsDHweT.png)

### 上传文件

![](https://s2.loli.net/2023/07/01/ZU3G5Q2FKYNI7CS.png)

![](https://s2.loli.net/2023/07/01/rldGk2uZ1B8oinh.png)

![](https://img-blog.csdn.net/2018040721130380?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3RpY2hpbWkzMzc1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 搜索仓库文件

多学一招：快捷键（t）

![](https://s2.loli.net/2023/07/01/ONJPY6hFX9tWnk2.png)

### 下载/检出项目

![](https://s2.loli.net/2023/07/01/R6gqcYIa1oUFjwP.png)


2.6Github Issues
----------------

作用：发现代码BUG，但是目前没有成型代码，需要讨论时用；或者使用开源项目出现问题时使用 

情景：张三发现李四开源git库，则发提交了一个issue；李四隔天登录在github主页看到通知并和张三交流，最后关闭issue

![](https://s2.loli.net/2023/07/01/OAoY9vpuhyFVjsb.png)

![](https://s2.loli.net/2023/07/01/SnEv8Wq3DyXKVIC.png)

![](https://s2.loli.net/2023/07/01/CWvES8pKwhnx2Om.png)

![](https://s2.loli.net/2023/07/01/5EY1ZbijNwgCKcF.png)

![](https://s2.loli.net/2023/07/01/OCkWieUZw4j6bsh.png)

2.6基本概念（实战操作）
-------------

### Github主页

![](https://s2.loli.net/2023/07/01/Ghqzp2PYaMI86jm.png)

### 个人主页

![20180407212439701.png](https://s2.loli.net/2023/07/01/xi2LUecSnvtVbpP.png)

![20180407212452564.png](https://s2.loli.net/2023/07/01/J2PDVA871g54qCm.png)

### 收藏（Star）

【如何收藏】

 操作：打开对应项目主页，点击右上角  star 按钮即可收藏

 情景：张三无意访问到李四的开源项目感觉不错并进行收藏

![20180407212649946.png](https://s2.loli.net/2023/07/01/cYGX6OM7PgJHnjf.png)

【如何查看自己得收藏】

![20180407212704932.png](https://s2.loli.net/2023/07/01/9qL3znvZX8b2FcU.png)

![20180407212714474.png](https://s2.loli.net/2023/07/01/sbD3eCvNacyQRLZ.png)

### 关注（Watch）

情景：张三关注了李四的项目，李四添加项目文件，张三的github主页会有怎样的展示？

![20180407212919775.png](https://s2.loli.net/2023/07/01/7FMtruI3kOSmKX4.png)

![20180407212934425.png](https://s2.loli.net/2023/07/01/Mhzi76gaIbvcH3Z.png)

![20180407212947180.png](https://s2.loli.net/2023/07/01/pktJhNaYwZAmfnB.png)

### 复制克隆项目（Fork）

情景：张三fork了李四的项目，相当于张三复制了李四的项目，所以自己也单独有了一个一样名称的仓库（注：该仓库会声明来自于李四，但是独立存在）

![20180407213316861.png](https://s2.loli.net/2023/07/01/mhNb5Dodz8SXRps.png)

︴验证：fork后的仓库是否单独存在

![20180407213341616.png](https://s2.loli.net/2023/07/02/5JHZN82OsPgKlh9.png)

![20180407213405964.png](https://s2.loli.net/2023/07/02/LQj6qcnU8POXmvp.png)

### 发起请求（Pull Request）

情景：张三修改了fork的项目中的文件，希望更新到原来的仓库，这时候他要新建一个pull request

1）Git1 发起一个更新请求

![201804072138252.png](https://s2.loli.net/2023/07/02/DctWhayi5j6uKVO.png)

 ![20180407213842347.png](https://s2.loli.net/2023/07/02/IjKlFkQfAsJmvzq.png)

![20180407213858255.png](https://s2.loli.net/2023/07/02/7A9P43xZt18lycq.png)

 ![20180407213914439.png](https://s2.loli.net/2023/07/02/18GDLWg6cAikfuZ.png)

![20180407213932315.png](https://s2.loli.net/2023/07/02/8DGqFXSyCePHgrY.png)

![2018040721394465.png](https://s2.loli.net/2023/07/02/V7GgoxCQacWnyRA.png)

 **2.7开源项目贡献流程**

### 1）新建Issue

提交使用问题或者建议或者想法

 **2）Pull Request**

步骤：

1、 fork项目

2、 修改自己仓库的项目代码

3、 新建 pull request

4、 等待作者操作审核

3\. Git安装和使用
============

目的
--

通过git管理github托管项目代码

下载安装
----

### 1）GIt官网下载：[https://www.git-scm.com/download/win](https://www.git-scm.com/download/win)

### 2）双击安装

**3）选择安装的工作目录**

**4）选择组件**

**5）开始菜单目录名设置**

**6）选择使用命令行环境**

![2018040722020265.png](https://s2.loli.net/2023/07/02/7TchIyzPpWGusr1.png)

### 7）以下三步默认，直接点击next

**8）等待安装**

**9） 检验是否安装成功**

![20180407220229200.png](https://s2.loli.net/2023/07/02/fBZcV8gR2qJLGDA.png)

**4\. Git基本工作流程**

Git工作区域
-------

![20180407220319637.png](https://s2.loli.net/2023/07/02/4sEUBWYd6vMXcko.png)

  **向仓库中添加文件流程**

![20180407220529159.png](https://s2.loli.net/2023/07/02/YKsFq8Gn4vw9hVc.png)

 **5\. Git初始化及仓库创建和操作**

基本信息设置
------

1\. 设置用户名
```
git config --global user.name 'itcastphpgit1'
```
2\. 设置用户名邮箱
```
git config --global user.email '485434609@qq.com'
```
脚下留心：该设置在github仓库主页显示谁提交了该文件

初始化一个新的Git仓库
------------

1、创建文件夹

![20180407221242157.png](https://s2.loli.net/2023/07/02/1EdNlDrR6xf5YuF.png)

2、在文件内初始化git（创建git仓库）
```
cd test

git init  
```
![20180407222144943.png](https://s2.loli.net/2023/07/02/EjyOJiSpP8IXGl7.png)

向仓库添加文件
-------
```
toucha1.php                         # 创建a1.php文件到工作目录

git adda1.php                      # 添加a1.php到暂存区

gitcommit -m  '第一次提交文件'     # 添加a1.php到仓库
```
![20180407222201725.png](https://s2.loli.net/2023/07/02/tXyduLr3aEFj7SJ.png)

![2018040722221491.png](https://s2.loli.net/2023/07/02/I5u2T1RNJjdStn6.png)

![20180407222226646.png](https://s2.loli.net/2023/07/02/Q3vKycdGeWs7Jrg.png)

修改仓库文件
------

![20180407222931495.png](https://s2.loli.net/2023/07/02/JxiTdcqHBGZ8l9a.png)

![20180407222953106.png](https://s2.loli.net/2023/07/02/MhlcTqEG9Xu3oWw.png) 

删除仓库文件
------

![20180407223118655.png](https://s2.loli.net/2023/07/02/76npcSCYjwvGiZR.png)

6\. Git管理远程仓库
=============

使用远程仓库的目的
---------

作用：备份，实现代码共享集中化管理

![20180407223739902.png](https://s2.loli.net/2023/07/02/mshMrlW6uTFjNad.png)

![20180407223750526.png](https://s2.loli.net/2023/07/02/QUatFJw9WuCZVgn.png)

Git克隆操作      
-------------

### 目的

将远程仓库（github对应的项目）复制到本地

### 代码

`git clone` 仓库地址

![20180407223847538.png](https://s2.loli.net/2023/07/02/oFOUAZbJsexnNYj.png)

![20180407223857432.png](https://s2.loli.net/2023/07/02/GS6HplnwtYVeFkE.png)

多学一招：仓库地址由来

![20180407223909965.png](https://s2.loli.net/2023/07/02/x8KvVO3GlTwHc79.png)

将本地仓库同步到git远程仓库中
----------------
```
git push
```
![2018040723035268.png](https://s2.loli.net/2023/07/02/tbB7k3Rv8glSM2a.png)

︴思考：为什么无法同步

 或没有权限

`The requested URL returned error: 403Forbidden while accessing`

 答案：私有项目，没有权限，输入用户名密码，或者远程地址采用这种类型：

 vi.git/config

 # 将
```
[remote"origin"] 

    url = https://github.com/用户名/仓库名.git

修改为：

[remote"origin"]

    url = https://用户名:密码@github.com/用户名/仓库名.git
```
 **6\. GithubPages 搭建网站**

个人站点
----

### 访问

[https://用户名.github.io](https://waahah.github.io/)

### 搭建步骤

1） 创建个人站点   ->  新建仓库（注：仓库名必须是【用户名.github.io】）

2） 在仓库下新建`index.html`的文件即可

![](https://s2.loli.net/2023/07/02/cESnD7Ay1mXBQeT.png)

![20180407231904583.png](https://s2.loli.net/2023/07/02/UhzYbuxIqoGmRPB.png)

![20180407231919236.png](https://s2.loli.net/2023/07/02/QxS8zCakue4PfL7.png)

![20180407231932433.png](https://s2.loli.net/2023/07/02/JzwBeKpZNrHgjA2.png)

### 脚下留心

1、github pages仅支持`静态`网页

2、仓库里面是.html文件

3、个人主页也可以设置主题

ProjectPages 项目站点
-----------------

### 访问

[https://用户名.github.io](https://waahah.github.io/)/仓库名 

### 原理

gh-pages 用于构建和发布

### 搭建步骤

1）进入项目主页，点击`settings`

2）在`settings`页面，点击【`Launch automatic page generator` 】来自动生成主题页面

3）新建站点基础信息设置

4）选择主题

5）生成网页

至此，教程结束，谢谢大家  

  
