---
title: 使用Github Pages创建个人博客详细流程 
date: 2021-10-08 14:58:36
tags: [Github, Git, Blog]
categories: [Git, ]

---

### 前言

最近自己瞎搞了一个[个人博客](http://waahah.tk)，个人觉得还不错，决定把制作博客的过程写下来，帮助想要构建自己博客的朋友们。 
### 准备工作

首先，我们需要在[github](http://www.github.com)上面创建一个账号。如果你还没有github账号，那么可以在首页进行快速注册 

![](https://s2.loli.net/2023/07/02/PGtywvLSjY1e3bc.webp)  

填写完成确定信息没有重复的情况下，点击下面的_Sign up for Github_按钮，然后跳转到新界面。新界面用来选择是否进行付费购买github的仓库加密服务，如果你希望托管在github上面的项目不是开源的，那么选择付费很有必要。 

这里默认选择了_free_免费，我们滑动到网页下面选择绿色按钮就可以注册成功了。注册完成后进行界面内，我们可以通过右下角的_New_按钮进行邮箱认证，认证完成后点击认证链接跳转到这个界面

![](https://s2.loli.net/2023/07/02/WPSUdVRjMuameBg.webp)

到了这一步，我们博客的准备工作就完成了。 

### 创建github博客

我们点击上图的_`New repository`_创建新项目，项目名称必须为`github名字.github.io`，比如本文中的github名称为`SindriLinGithubTest`，那么新仓库的名字必须为`SindriLinGithubTest .github.io`

![](https://s2.loli.net/2023/07/02/jvXSzAtKuYWf2ya.webp)  

按照图上的信息填写之后，我们完成了博客仓库的搭建，接着要进行下一步的配置   

1、 对博客仓库进行配置   

![](https://s2.loli.net/2023/07/02/DkdT7bafeJCj8uN.webp)

2、第一次配置博客    

![](https://s2.loli.net/2023/07/02/RNp2B7Sx8uIQsnh.webp)

3、创建博客页面   

![](https://s2.loli.net/2023/07/02/Sm6cRnYw1GlJhFu.webp)

4、选择博客主题（生成css、html等文件帮我们构建博客，可以对这些文件进行修改） 

![](https://s2.loli.net/2023/07/02/xN6jn4BXMv2ySzU.webp)

5、在浏览器上访问`SindriLinGithubTest.github.io`地址 

![](https://s2.loli.net/2023/07/02/BN4psMOohxS6bUA.webp)

6、在博客仓库下面的文件中修改博客布局，显示内容等。通过博客显示内容和这些文件内容对比进行修改 

![](https://s2.loli.net/2023/07/02/V8CZhgDMYoiEKHU.webp) 

现在你的博客已经搭建完毕，可以给你的好朋友看看了 

7、怎么删除我们存在的仓库呢？如果我们要使用别人已存在的主题进行博客搭建，那么我们上面创建的仓库就要删除，删除仓库要在**_Settings_**里面删除  

![](https://s2.loli.net/2023/07/02/usIBKN85OHC3dwE.webp)

![](https://s2.loli.net/2023/07/02/K9tUICw1z24qG5d.webp)

![](https://s2.loli.net/2023/07/02/fqMS9YjdlGtAJNw.webp)

### 快速定制主题

通过上面的方式我们创建了自己的博客，但是对于不懂`html/css`的人来说，定制博客是一个苦恼的问题。然而，现在我们不用再担心这个问题了。[jekyllthemes](http://jekyllthemes.org)是一个简单的静态博客网站工具，我们可以在这个网站上面寻找我们喜欢的主题下载后直接使用。

![](https://s2.loli.net/2023/07/02/6R8gIdGYZMHbSLh.webp)

博主我现在使用的模板是其中的_Twenty_主题，点击你想要的主题，然后进行下载

![](https://s2.loli.net/2023/07/02/v3gs2pqfnxeyVI9.webp)

下载之后我们要做的步骤如下   
1、修改主题文件名为`github名字.github.io`

![](https://s2.loli.net/2023/07/02/eCmhFfQ7JDy8Ncz.webp)
2、通过[github工具](http://www.macupdate.com/app/mac/39062/github/)上传到你的[github仓库](http://www.github.com)（注意仓库里面同名的博客仓库文件要删除），如果你没有也不想下载github工具，那么可以参考[这篇文章](http://blog.csdn.net/yangbo_hbzjk/article/details/9022767)来使用命令行上传文件到服务器  

![](https://s2.loli.net/2023/07/02/rmOKNHM29WwzYAh.webp)

![](https://s2.loli.net/2023/07/02/4L6pjwuihFDJX5d.webp)

3、登录[github网站](http://www.github.com)修改包括**_index.html，\_config.yml_**等博客布局文件（这里上传成功后github博客页面已经发生改变，根据页面信息到下面相应的文件中进行修改） 

![](https://s2.loli.net/2023/07/02/M1BihLu3xJqtZN8.webp)

4、修改完成博客效果    

![](https://s2.loli.net/2023/07/02/8uxpqaimPD4EBdl.webp)
### 域名绑定

现在博客虽然已经搭建好了，但是访问地址看起来总是不舒服的，我们想要通过指定的地址访问怎么办呢？我们需要拥有一个自己的域名，登录[万网](http://wanwang.aliyun.com/?utm_medium=text&utm_source=bdbrandww&utm_campaign=bdbrand&utm_content=se_103066)可以进行域名购买 

![](https://s2.loli.net/2023/07/02/Lq9omZBik8FW7eb.webp)

我们在购买域名前输入想要的域名进行检测是否存在，如果域名处于可购买状态，我们注册万网账号，然后把域名加入购买清单，进行付款购买。博主已经购买了[xxxx.com](http://www.xxxx.com)这个域名（com价格比net贵，各位酌情购买。博主的域名是三年$149）  

![](https://s2.loli.net/2023/07/02/F9TyA2c7sY8VRor.webp)

完成域名购买之后，我们还需要对域名进行解析，使之有效并且和我们的博客关联在一起   

1、我们要进入产品管理界面，选择**_域名_**，然后对我们已经购买的域名进行解析 

![](https://s2.loli.net/2023/07/02/8vyYT1ZNFD3hXt2.webp)  

2、进入[github pages](https://pages.github.com)界面，选择右上角的**_Pages Help_**，然后选择绑定博客DNS和域名   

![](https://s2.loli.net/2023/07/02/EZQnL3Sh6si4g81.webp)   

![](https://s2.loli.net/2023/07/02/LxCoOajJRvZUrS9.webp)

![](https://s2.loli.net/2023/07/02/EZQnL3Sh6si4g81.webp) 
3、进行域名解析，纪录类型为`A`，主机纪录包括`@`、`www`两种，记录值为上面两个DNS中其中一个（这里我添加了两次解析）  

![](https://s2.loli.net/2023/07/02/8ABRboUdGgI9hO4.webp)

4、打开github仓库，在博客仓库目录下新增文件，命名为CNAME，并且写入购买的域名  

![](https://s2.loli.net/2023/07/02/QdS7V2RzqYm8lCO.webp)  

![](https://s2.loli.net/2023/07/02/8BkbGe62uC4mZFH.webp)

5、更改博客仓库的**_\_config.yml_**配置，设置url为购买域名地址   

![](https://s2.loli.net/2023/07/02/r7TZjDudfinsAMt.webp)

6、保存配置后，点击仓库的Settings，如果出现链接地址是蓝色的，那么说明博客跟域名已经关联好了，等待几分钟就可以通过自己购买的域名进行访问   

![](https://s2.loli.net/2023/07/02/KXxng8rSjo34tPW.webp)

### 新博客
正常来说，在我们下载的主题里面有个**_\_posts_**文件夹，这里面存放的是博客文章，正常而言是md（markdown）格式。我的建议是不要删除这些文件，我们的博客可以在这些文件的格式上进行修改书写。   
这里我使用的markdown编辑器是[typora](http://www.macupdate.com/app/mac/52992/typora)，个人觉得这个markdown编辑器简洁好用。选择**_\_posts_**目录下随便一个md文件右键使用typora打开，文件中红框勾选起来的部分千万不要随意删除，可以进行修改。如果不小心删除了可能会导致博客无法显示或者你的博客页面错乱等问题  

![](https://s2.loli.net/2023/07/02/14ZXCVvocAthU5y.webp)

完成博客后，直接保存在**_\_posts_**文件下，然后使用[github for mac](http://www.macupdate.com/app/mac/39062/github/)，然后提交修改，点击右上角的**_sync_**进行文件同步，再过一会博客就更新了。另外博客图片可以放在仓库的**_images_**文件下使用html语句进行获取 

### 怎么更换主题
在完成上面的操作之后，正常来说我们已经搭建好了我们的博客和主题，在确认之前应该让你的朋友访问一下仓库域名确认，如果出现了    

![](https://s2.loli.net/2023/07/02/CzXboUaPWirLy8S.webp)

这就说明你的博客主题搭建失败，这个主题是没用的。那么这时候我们需要删除github上面的仓库

![783864-5e016676b3f77b34 _1_.webp](https://s2.loli.net/2023/07/02/A3J67okCwlpDa2U.webp)

![783864-c7b488b065ccdaa9 _1_.webp](https://s2.loli.net/2023/07/02/1LNRouZHwl4p9gO.webp) 

成功删除github上面托管的博客仓库之后，我们还需要移除本地github工具上面的博客文件   右键项目 -> `Remove` 
完成之后我们下载新的主题，然后按照上面的方式重新提交，直到我们选择的主题能够访问为止 
### 更多
由于本文创建的博客服务器位于github，在进行访问的时候加载速度可能不够高。如果是追求完美主义者，可以在万网上购买阿里的云服务器，然后找个会后台开发的小伙伴们一起开发共用服务器。   
其他资源：  
- [markdown语法](http://www.appinn.com/markdown/)  
-  [阿里云服务器购买](http://www.aliyun.com/?utm_medium=text&utm_source=bdbrand&utm_campaign=bdbrand&utm_content=se_32492) 
-  [笔者博客](http://waahah.tk)   
-  [笔者Github](https://github.com/waahah) 