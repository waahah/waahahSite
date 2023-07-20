---
title: Hexo友链朋友圈后端部署
date: 2023-04-24 14:58:36
tags: [ JavaScript, Python, Hexo, Blog, Qrcode, hexo_circle_of_friends]
categories: [Coding, Python]
---

### 前言

Hexo友链朋友圈后端部署
======================================

> 如果您不是第一次部署而是版本更新，旧版本有些配置可能已经不兼容，请以最新版本为准！

其中github为云端部署（无服务器部署）

[github部署](#)
-------------------------------------------------------

> **注意**：如果前端部署采用[带管理面板的前端方案](#/frontenddeploy)，则fork时**不要修改仓库名称**，否则会导致管理面板部分功能不可用。

### [github+sqlite部署](#)

这是默认的部署方式，即：github+sqlite+vercel

部署方法：

fork友链朋友圈的项目仓库，地址：[https://github.com/Rock-Candy-Tea/hexo-circle-of-friends](https://github.com/Rock-Candy-Tea/hexo-circle-of-friends)

编辑`/hexo_circle_of_friends/fc_settings.yaml`文件，需要修改的配置如下：

```yml
LINK:
    - {link: "https://www.yyyzyyyz.cn/link/", theme: "butterfly"}  # link改为你的友链页地址，theme选择你的博客主题
```

然后点击仓库的`Settings-->Secrets-->New repository secret`

![](https://s2.loli.net/2023/07/12/KlsBxJHobSCUIZO.png)

添加4个环境变量secret：

*   `GH_NAME`：github名称，也就是你的用户名
*   `GH_EMAIL`：github邮箱，填写你注册github的邮箱
*   `GH_TOKEN`：github访问token，获取方式，请参考[官方文档](https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)，其中，`Select scopes`选择`repo`和`workflow`。
*   `STORAGE_TYPE`：存储方式，填写`sqlite`

![image-20221008230906574.png](https://s2.loli.net/2023/07/12/W7jtilRmAgPbyH5.png)

配置完成后，应该如下图所示：

![image-20221009000607317.png](https://s2.loli.net/2023/07/12/wanLzCJhIxG6D1O.png)

然后点击仓库的`setting-->Actions-->General-->勾选Read and write permissions-->Save`

![workflow_permissions.png](https://s2.loli.net/2023/07/12/fvXAD4tzpElIBFW.png)

前往[vercel官网](https://vercel.com/)，直接用github创建账号并用手机号绑定。

点击`New Project`新建项目

找到`Import Git Repository`，应该可以看见你刚刚`fork`的仓库，点击`Import`。

![QQ截图20220205082743.png](https://s2.loli.net/2023/07/12/2IpwDGfX3Y1eavB.png)

然后点击`Deploy`，回到首页，等待一会，应该会部署完成。

添加vercel环境变量，进入刚才创建的项目主页，点击`Settings-->Environment Variables`

![image-20221008231737297.png](https://s2.loli.net/2023/07/12/bLeChiWkDqH4PXK.png)

与前面的secret相同，添加`GH_NAME`、`GH_EMAIL`、`GH_TOKEN`，此外，还需要添加`VERCEL_ACCESS_TOKEN`，获取方式如下：

点击vercel页面右上角的`Settings-->Tokens--->Create`

![image-20221008231925321.png](https://s2.loli.net/2023/07/12/RMgJ1N5vP6AukqY.png)

随便输入一个名称后，点击`CREATE TOKEN`，复制生成的token，添加到vercel环境变量中即可

![image-20221008232056360.png](https://s2.loli.net/2023/07/12/igNHjzZSyWG3qKv.png)

添加完成后，应该如下图所示：

![image-20221008232407601.png](https://s2.loli.net/2023/07/12/fepNrhqCkvM5AGT.png)

接下来，回到github，启用`fork`后仓库的github action，点击`Actions-->I understand my workflows, go ahead and enable them`

![QQ截图20220205081120.png](https://s2.loli.net/2023/07/12/KrqvhCPDByHcdt4.png)

之后点击`update-friends-posts`并启用`workflow`

![QQ截图20220205081424.png](https://s2.loli.net/2023/07/12/UlJd9BLN7RfuiVy.png)

然后点击`Run workflow--->Run workflow`进行第一次运行

![image-20221008232746973.png](https://s2.loli.net/2023/07/12/gzBijL5OuK3NtRb.png)

等待运行完毕后，仓库应该会上传`data.db`，并且vercel也会同步更新。

前往vercel，在项目中找到`DOMAINS`下面的地址，如：[https://hexo-friendcircle4-api.vercel.app，](https://hexo-friendcircle4-api.vercel.app，) （注：本来只需要这个地址，但由于vercel被墙，需要绑定自定义域名后，使用自定义域名的地址）。在这个地址后面拼接`/all`尝试访问，出现数据就说明配置成功，这个地址就是前端所需的api地址。

![QQ截图20220205083633.png](https://s2.loli.net/2023/07/12/5wyhr8zOeFLqMIf.png)

至此，后端部分搭建完成。


