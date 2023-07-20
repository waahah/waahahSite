---
title: 利用GITLAB PAGES和HEXO搭建一个个人博客
date: 2021-10-14 14:58:36
tags: [Gitlab, Blog, Github]
categories: [Git]

---

### 前言

利用`GITLAB PAGES`和HEXO搭建一个个人博客

### 1.使用GITHUB PAGES存在的问题

目前网上有很多利用github pages和hexo搭建个人博客的教程，但是github目前拒绝了百度蜘蛛的爬取，因此如果希望自己的博客能够被百度收录，就需要采用一些别的方法托管。之前网上有一些利用coding.net进行托管共百度爬取的方法，但是最近`coding.net`进行了改版，在打开托管的个人pages时会强行加入一个5s的等待跳转页面，导致百度的蜘蛛无法正确爬取到博客的内容。因此，这篇文章将手把手教你如何用gitlab托管你的博客，实现让百度可以爬取你的博客内容。

### 2.安装必要的环境

以下操作均在`windows10`的环境下进行，其他的环境操作如果有问题请自行进行必要的修改。

#### 2.1安装NODEJS
最新版的`nodejs`可以在[这里](https://nodejs.org/en/)获取，下载后直接安装即可，安装完后打开`cmd`，输入`npm -v`，如果能输出版本号则说明安装成功。

#### 2.2 安装GIT
`git`的安装和配置请自行百度，这里就不详细写了，这是`git`的下载地址

#### 2.3 安装HEXO
如果已经完成了以上两步，在一个私人文件夹下打开`cmd`，运行

```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```
如果一切正常，在浏览器中访问<http://localhost:4000/>就可以看到运行在本地的博客了。

### 3.将博客部署到GITLAB PAGES上

#### 3.1添加SSH-KEY
在[gitlab](https://gitlab.com/)完成注册后，首先访问[这里](https://gitlab.com/profile/keys)，向你的帐户添加`ssh keys`，ssh keys的生成可以参考如下的步骤，打开2.2安装的`Git Bash`，输入如下命令(自行替换其中的用户名和邮箱信息)

```
git config --global user.name "Boyuan"
git config --global user.email "work@aiboy.pub"
ssh-****** -t rsa -C "work@aiboy.pub"
```
最终生成的文件一般位于C:\Users\UserName.ssh文件夹下，打开`id_rsa.pub`，将里面的所有内容添加到[这里](https://gitlab.com/profile/keys)。

#### 3.2 新建一个项目
接着点页面右上角的+号，新建一个项目。项目名为”`username.gitlab.io`”，其中`username`为你的gitlab账号用户名，项目类型选择`Private`

#### 3.3 添加.GITLAB-CI.YML文件
利用gitlab部署你的博客和github最大不同在于，在github上部署博客需要先在本地生成各种页面文件，然后再推送到github上就可以直接访问了。而使用gitlab则需要在服务器端完成生成和部署两个阶段，应该需要在项目的根目录下添加一个`.gitlab-ci.yml`文件用来指导服务器如何处理你提交的源文件。一个完整可用的.gitlab-ci.yml如下，其中我把hexo默认的公式渲染引擎替换为了pandoc，同时添加了生成站点地图的功能。

```
before_script:
  - apt-get update -qq && apt-get install -y -qq pandoc
image: node:4.2.2
pages:
  cache:
    paths:
    - node_modules/
  script:
  - npm install hexo-cli -g
  - npm install
  - npm uninstall hexo-renderer-marked --save
  - npm install hexo-renderer-pandoc --save
  - npm install hexo-generator-sitemap --save
  - npm install hexo-generator-baidu-sitemap --save
  - npm install hexo-util --save
  - hexo deploy
  artifacts:
    paths:
    - public
  only:
  - master
```

#### 3.4 修改站点配置文件&更换主题
这里推荐大家使用NexT主题，这也是本站目前使用的主题，具体的安装步骤可以参考这里，有一点需要注意的是，将`themes\next\`目录下的`.git`文件夹删除。
下面主要还需要对项目根目录下的_config.yml进行修改

接下来，在项目根目录下运行如下命令

```
git init
git remote add origin git@gitlab.com:feixiang/feixiang.gitlab.io.git
git add .
git commit -m "init blog"
git push -u origin master
```
以上第二句命令请根据自己的项目名称进行调整。
完成推送后，访问你的项目主页，如果看到passed的图标，就表示构建成功了，访问<https://username.gitlab.io/>就可以看到自己刚刚建立的博客了。
如果需要添加新的文章，将文章的md文件保存到source_posts文件夹下然后重新执行推送就可以了，服务器端完成构建后，如果没有错误就会出现在你的博客页面上。
到此何如在gitlab上搭建一个博客就说完了，如果想绑定自己的域名实现让百度爬取请继续往下看。

### 4.绑定个人域名
修改`_config.yml`文件中的url地址为*http://你的域名，重新提交，服务器端编译通过后，在项目主页访问`Settings->Pages->New Domain`*，输入你的自己的域名就可以了。然后去你的域名注册商那添加一条指向`username.gitlab.io`. 的`CNAME`记录记录，输入你的域名，看看是不是可以访问了。
利用百度爬虫抓取，可以看到可以成功抓取。图一是使用gatlab托管的抓取状态，图二是利用github抓取的状态。

![c428fea40c234f8a33535eea18aecf40.png](https://s2.loli.net/2023/07/02/iWY4CFBZsIu8DMo.png)

![](https://s2.loli.net/2023/07/02/xXoYeRVFAafiGpb.png)