---
title: 给Git配置多个SSH Key
date: 2021-10-12 14:58:36
tags: [Git, SSH, Github]
categories: [Git]

---

### 前言

有时候我们可能需要在同一台电脑上配置多个`SSH Key`，比如公司项目使用的是`GitHub`，个人开发用的是码云`Gitee`。这个时候我们可能需要有两个`SSH Key`，怎么配置呢？ 

假设你之前已经生成了一个`GitHub`的`SSH Key`，可以用命令`cat ~/.ssh/id_rsa.pub`查看已经生成的`SSH Key`: 

![](https://s2.loli.net/2023/07/02/QWfcLsXzjVrNMqJ.webp)

复制命令`ssh-keygen -t rsa -C 'xxxxx@youremail.com' -f ~/.ssh/gitee_id_rsa`生成一个`Gitee`的`SSH Key`，一路回车就可以了(记得把邮箱改成你自己的)。可以看到`.ssh`文件夹下面多了两个文件。 

![](https://s2.loli.net/2023/07/02/n5dSuokDO2hMENq.webp)

![v2-58ef46b0cc4a1719be93b5089da8db73_720w.webp](https://s2.loli.net/2023/07/02/mWITn3GvUJeki2O.jpg)

使用命令`cat ~/.ssh/gitee_id_rsa.pub`查看`Gitee`的`SSH Key`，复制`ssh`开头的那一串公钥，添加到`Gitee`仓库。

![](https://s2.loli.net/2023/07/02/sQprWonXUyHbzCi.webp)

![](https://s2.loli.net/2023/07/02/1By3dNETCqM7h8j.webp)

使用命令`touch ~/.ssh/config`，在`~/.ssh`文件夹下添加config文件，可以看到文件夹下面多了一个config文件。

![](https://s2.loli.net/2023/07/02/9CsUBmVJWdN6M2p.webp)

![](https://s2.loli.net/2023/07/02/afHgVLeiz96NPxI.jpg)

右键使用记事本打开，复制以下信息添加到`config`文件保存，其中`Host`和`HostName`填写git服务器的域名，`IdentityFile`填写私钥的路径。 

``` 
# gitee 
Host gitee.com 
HostName gitee.com 
PreferredAuthentications publickey 
IdentityFile ~/.ssh/gitee_id_rsa 
# github 
Host github.com 
HostName github.com 
PreferredAuthentications publickey 
IdentityFile ~/.ssh/id_rsa 
```

使用以下命令分别测试`GitHub`和`Gitee`，查看`SSH Key`是否添加成功。 
``` 
ssh -T git@gitee.com 
ssh -T git@github.com 
```
看到以下的提示，就表示添加成功，可以拉取、推送代码了。
![](https://s2.loli.net/2023/07/02/sYbOIctSFxjqg45.webp)  