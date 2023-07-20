---
title: 静态博客部署 Hexo + Netlify-CMS + Vercel （在线构建）
date: 2022-11-22 14:58:36
tags: [Hexo, Netlify-CMS,  Vercel ]
categories: [Coding, JavaScript]
---

### 前言
静态博客部署 Hexo + Netlify-CMS + Vercel （在线构建）

### 目录

*   [引入](#_2)
*   *   [背景](#_3)
    *   [方案](#_33)
*   [步骤](#)
*   *   [生成starter模板](#starter_45)
    *   [添加Netlify CMS在线管理](#Netlify_CMS_53)
    *   [添加Netlify身份验证组件](#Netlify_114)
    *   [启用git gateway身份验证](#git_gateway_147)
    *   [换用Vercel作为CDN](#VercelCDN_166)
    *   *   [重新添加js](#js_172)
        *   [添加身份验证器](#_195)
        *   [绑定oauth](#oauth_223)
    *   [定制404页面](#404_246)
*   [模板](#_299)
*   [已知问题](#_327)

引入
======================================

背景
-----------------------------------------------------------------

Hexo等静态博客相对于Wordpress等动态博客，可以白嫖很多免费部署服务，不需要博主自行维护服务器，同时借由CDN的分发，不受服务器地理位置和计算能力的限制，访问更快速。但静态博客需要在本地维护npm环境，进行构建部署流程较动态博客更为繁琐。

> Netlify-CMS是一个开源的静态博客编辑组件，可以与多种自动构建部署服务商搭配使用  
> Netlify是一家自动构建部署服务商，Netlify-CMS在Netlify上结合使用最为简单

Netlify等自动构建部署的免费服务基于Git管理，让静态博客可以免本地环境运行，但基于Git的管理让博客的编辑过程过于繁琐。另外，Netlify在大陆地区经常性无法访问或速度极慢，若同步至Github Pages也面临周期性抽风的问题。Vercel在大陆绝大部分地区的访问速度较快，相比直接在Netlify或Github Page上部署是更好的选择。

**Netlify-CMS**作为Headless CMS，可以添加在Hexo等静态博客项目中，链接到静态博客的Git源码项目，以提供近似动态博客的在线编辑体验。

然而想要为静态博客添加Netlify-CMS，最简单的方式是直接使用Netlify构建，如果不使用Netlify的构建服务而寻求Vercel等第三方的构建服务，则配置极为繁琐，从零开始熟练操作也需1~2小时，对于初次接触Hexo/Netlify-CMS/Vercel/npm的人来说，完成第一次完美部署至少也需1~2天研究。

**本文是为了给自己和有类似需求的人提供从零开始可轻松遵循的教程，每一步的步骤非常详细，并提供有校验避免某一步出错，同时便于将这一过程在Hugo等其他博客上复现。**

如果想要遵循本文步骤，在动手实践前请认真阅读几遍。另外**本文结尾提供了构建模板**，如果不想从零开始，可以使用模板快速部署自己的博客。

本方案为Hexo+Netlify-CMS+Vercel，具体优势为：

*   完全免费，也无需自行维护服务器
*   静态博客，访问时无渲染时间，可经CDN加速
*   就像动态博客一样支持在线编辑
*   不需要维护本地环境，任何设备都可以随处编辑，并自动构建、部署
*   免备案
*   Vercel CDN在大陆地区访问速度较快
*   Vercel提供 `https://<domain>.vercel.app/`格式的免费域名，绑定第三方域名也非常简单，同时默认支持自动申请维护Let’s Encrypt的SSL证书，直接支持https访问
*   整个教程可以无命令行输入，无环境配置即可完成

另提供Academia学术主题教程，可移步另一篇文章

方案
-----------------------------------------------------------------

1.  博客框架：Hexo
2.  在线编辑框架：Netlify CMS
3.  自动构建部署：Vercel
4.  域名：Namesilo
5.  SSL证书：Vercel提供
6.  自定义404页面

教程复杂，细节较多，因此校验步骤较多。建议实操前全文阅读数遍，有信心的读者可以略过校验步骤。
步骤
======================================

生成starter模板
--------------------------------------------------------------------------

> 参考 [https://www.netlifycms.org/docs/add-to-your-site/](https://www.netlifycms.org/docs/add-to-your-site/)

1.  进入[https://www.staticgen.com/](https://www.staticgen.com/)，选择Hexo处的 `Deploy to Netlify`，登录Netlify，如无帐号则Github授权登录注册，其他方式据称有bug
2.  登录Netlify后，为Netlify授权Github。Netlify会自动将Hexo模板fork到自己的Github仓库中，并自动授权关联Netlify App自动参与构建。之后在 [https://netlify.com/](https://netlify.com/) 主页可以看到已经部署到Netlify的博客主页  
    ![](https://s2.loli.net/2023/07/09/hrlvEFYQyReJkHu.png)

添加Netlify CMS在线管理
--------------------------------------------------------------------------------

> 首先在Netlify里添加Netlify CMS，测试成功后再迁移至Vercel  
> 参考 [https://www.netlifycms.org/docs/add-to-your-site/](https://www.netlifycms.org/docs/add-to-your-site/)

在Github仓库的`source`目录下创建`admin`目录：

```yml
admin
 ├ index.html
 └ config.yml

```

`index.html`内容：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>

```

`config.yml`内容，注意这里可能会根据你的模板所改变

```yml
backend:
  name: git-gateway
  branch: master # Branch to update (master by default)

# These lines should *not* be indented
media_folder: 'source/images' # Media files will be stored in the repo under source/images
public_folder: 'images' # The src attribute for uploaded media will begin with images

# This line should *not* be indented
publish_mode: editorial_workflow

collections:
  - name: 'Post' # Used in routes, e.g., /admin/collections/blog
    label: 'Post' # Used in the UI
    folder: 'source/_posts' # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: '{{slug}}' # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: 'Title', name: 'title', widget: 'string'}
      - {label: 'Publish Date', name: 'date', widget: 'datetime'}
      - {label: 'Body', name: 'body', widget: 'markdown'}

```

并修改仓库根目录的`_config.yml`，跳过对`source/admin`的渲染，否则`source/admin/config.yml`会于发布时丢失。在`_config.yml`中修改为：

```yml
skip_render: admin/**

```

等待netlify自动构建完成后，这时打开`https://<domain>.netlify.app/admin/`  
应为密码输入界面。  
![](https://s2.loli.net/2023/07/09/UcVZTqKruba6s2I.png)

添加Netlify身份验证组件
------------------------------------------------------------------------------

> 参考 [https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget](https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget)

依次进入`app.netlify.com` >> 选择自己的网站 >> `Site settings` >> `Build & Deploy` >> `Post processing` >> `Snippet Injection section` >> `Add Snippet`

`Before</head>`填写

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

```

`Before</body>`填写

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>

```

Github仓库提交一次无谓的修改（如加一行空格）触发自动构建

之后进入`https://<domain>.netlify.app/admin/`，之前的用户名密码就会变成登录按钮，点击按钮会向`https://<domain>.netlify.app/.netlify/`发送一条请求并报错，这是因为还没有开启netlify的身份验证功能。  
![](https://s2.loli.net/2023/07/09/SMmrQPqOetdHKUa.png)

启用git gateway身份验证
--------------------------------------------------------------------------------

> 参考 https://www.netlifycms.org/docs/git-gateway-backend/

依次进入

1.  `app.netlify.com` >> 自己的网站 >> `Identity` >> `Enable Identity`
    
2.  `Site Settings` >> `Identity` >> `Registration` >>`Open`
    
3.  `External providers` >> 添加Github
    
4.  `Site settings` >> `Identity` >> `Services` >> `Git Gateway` >> `Enable Git Gateway` >> 选择对应的Github仓库
    

![](https://s2.loli.net/2023/07/09/XFIUl9GMW6qBtTb.png)

即可使用Github身份登录了，尝试编辑下文章并点击右上角的publish，等待部署完毕后刷新，可以查看到修改的内容。  
![](https://s2.loli.net/2023/07/09/GcWNkYPxDy1fLMF.png)

换用Vercel作为CDN
----------------------------------------------------------------------------

> 参考：  
> [https://zhuanlan.zhihu.com/p/56319868](https://zhuanlan.zhihu.com/p/56319868)  
> [https://github.com/ublabs/netlify-cms-oauth](https://github.com/ublabs/netlify-cms-oauth)  
> [https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget](https://www.netlifycms.org/docs/add-to-your-site/#add-the-netlify-identity-widget)

### 重新添加js

这里建议下载Github仓库并新建上传，从而避免仓库中有太多contributers，也可设为私人仓库。注意如果新建仓库将主分支由`master`切换到了`main`，则`source/admin/config.yml`的分支配置也要对应修改。

前往`https://vercel.com/new`让Vercel进行自动构建。

会得到新的发布链接`https://<domain>.vercel.app/`

此时访问`https://<domain>.vercel.app/admin/`（对于Vercel部署的网站，网址这里必须有最后一个`/`，否则会跳转错误无法访问），又显示为用户名密码登录。

这是因为换为Vercel，无法使用Netlify才有的Snippet Injection功能，需要手动向源代码模板中添加上述代码，

在`source/admin/index.html`里的`</head>`前添加：

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

```

经测试，针对网站首页的js无需添加。

之后去admin尝试登录一下，界面仍然是一个登录按钮，且按下登录按钮，开发者工具网络拦截到`https://<domain>.vercel.app/.netlify`的404请求说明正常

![20210402153250633.png](https://s2.loli.net/2023/07/09/4K1awmZt7JqjSuX.png)

### 添加身份验证器

现在修改为Vercel部署。使用下面的代码作为serverless身份验证器：

> https://github.com/ublabs/netlify-cms-oauth

首先按照readme，修改`source/admin/config.yml`为对应的内容，如我的则是

```yml
backend:
  name: github
  repo: hangvane/hexo-netlify-cms-vercel # Path to your Github/Gitlab repository
  branch: main # Branch to update
  base_url: https://hexo-netlify-cms-vercel.vercel.app

```

上传后测试一下，此时admin点登录后会弹出`https://<domain>.vercel.app/auth`的404页面，说明配置已经正确，只是还未上传身份验证器，所以无法访问serverless函数帮助完成登录过程

![20210402153738851.png](https://s2.loli.net/2023/07/09/pBwn4cdosDlfP19.png)

上传身份验证器：

合并`package.json`：将验证器仓库中的`package.json`和自己的Github仓库中的依赖进行合并，即添加`simple-oauth2`添加至`dependencies`，将`@types/node`和`@types/simple-oauth2`添加至`devDependencies`

同时复制`vercel.json`，`api`文件夹，`lib`文件夹，将这三个文件上传到自己的Github仓库中，等待自动构建完成后再进行验证：

此时点击登录，会弹出一个Github的404错误界面`https://github.com/login/oauth/xxx`，且url中含有一个空的`id=`参数，说明当前步骤正确，只差最后一步绑定Github oauth的ID和Secret  
![20210402154229922.png](https://s2.loli.net/2023/07/09/SwoURAQIHhED9nY.png)

### 绑定oauth

从 [https://github.com/settings/developers](https://github.com/settings/developers) 创建一个oauth，其他项任填，重点是`Authorization callback URL` 必须为`http://<domain>.vercel.app/callback`

之后点击生成一个secret，在 Vercel >> 你的项目 >> `Project Settings` >> `Environment Variables`创建两个`Plaintext`类型的环境变量

分析`lib/config.ts`可以发现，需要为oauth设置两个环境变量分别为`OAUTH_GITHUB_CLIENT_ID`和`OAUTH_GITHUB_CLIENT_SECRET`，他们的值分别为刚创建的Github oauth中的ID和secret

环境变量创建完成后，在Github上提交一次无谓的修改（如加一行空格）触发自动构建

之后可以访问`https://<domain>.vercel.app/admin/`，登录成功。

![20210402154803659.png](https://s2.loli.net/2023/07/09/IOW5nKd6yvG1xuQ.png)

登录后测试功能是否正常，判断标准：

*   可以看到已有的文章.md
*   点开修改后可以成功保存

此时的优点是可以自动创建分支，自动构建分支，供自己预览：  
![20210402154947646.png](https://s2.loli.net/2023/07/09/I397gewO1QtSARn.png)

定制404页面
----------------------------------------------------------------------

在Github仓库中添加`source/404.html`，源代码：

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
    <title>404 Not Found</title>
    <style>
        html, body {
            height: 100%;
        }
        body, a {
            margin: 0;
            padding: 0;
            width: 100%;
            color: #B0BEC5;
            display: table;
            font-weight: 100;
            font-family: 'Lato', sans-serif;
        }
        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }
        .content {
            text-align: center;
            display: inline-block;
        }
        .title {
            font-size: 72px;
            margin-bottom: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="title">404</div>
            <a href="/">> > Go back to the homepage > ></a>
        </div>
    </div>
</body>
</html>

```

并在`/_config.yml`中跳过对其渲染

```yml
skip_render:
  - admin/**
  - 404.html

```

模板
======================================

> [https://github.com/hangvane/hexo-netlify-cms-vercel](https://github.com/hangvane/hexo-netlify-cms-vercel)

该模板已实现vercel上部署Hexo结合Netlify-CMS。

该模板为Hexo默认主题，已结合Netlify-CMS和身份验证器，基于此模板只需遵循如下步骤即可搭建完成：

1.  点击 `Use this template` 将此模板fork为自己的仓库（可私有）
    
2.  修改 `/source/admin/config.yml`. 将 `backend.repo` 和 `backend.base_url` 修改为自己的对应值
    
3.  前往 [Github Developer applications](https://github.com/settings/developers) 创建一个新的验证应用。其他项任填，重点是`Authorization callback URL` 必须为`http://<domain>.vercel.app/callback`
    
4.  前往 [https://vercel.com/new](https://vercel.com/new) 导入仓库并新建项目。在导入流程中点 `Deploy`，添加环境变量 **`OAUTH_GITHUB_CLIENT_ID`** 和 **`OAUTH_GITHUB_CLIENT_SECRET`** ，将它们的值设为上一步生成的值
    
5.  点击 `Deploy` 等待部署完成
    
6.  如果你想更改 **Vercel** 提供的域名或绑定第三方域名， _Settings > Domains_.
    
7.  打开 **`https://<domain>/admin/`** 并登录 **Netlify-CMS** 后台，注意URL中最后一个 `/` 符号不能省略
    
8.  测试一下 **Netlify-CMS** 是否正常工作
    
9.  如果需要**Netlify-CMS**提供的草稿预览功能，也就是在单击 `save` 后提供一个文章的预览链接，则还需要链接到 [**Netlify**](https://app.netlify.com/start) 服务。这个过程和绑定Vercel很类似，但是不需要设置环境变量，因为不从Netlify这一侧进行文章的更新，只是利用它的预览功能
    
10.  部署成功！
    

已知问题
======================================

*   Vercel部署下，输入`https://<domain>.vercel.app/admin`会跳转错误从而报错，URL末尾必须加 `/`
*   Netlify-CMS的markdown编辑器有一些bug，使用`---`分隔符和`#`标时尽量上下各空一行，避免`.md`文件生成错误
