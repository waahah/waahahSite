---
title: Git GUI汉化,设置成中文
date: 2021-09-22 14:58:36
tags: [Git, Bash,Gui]
categories: [Git]

---



### **Git bash设置中文**

这个`Git bash`本身就支持中文，只需要在打开Git bash后命令窗口右键Options -->Windows  -->UI languages 下拉选择 `zh\_CN`即可。当然记得保存哦！！

![](https://s2.loli.net/2023/06/12/ur7UkB6vWfZnphO.png)

上图是就可以设置`Git bash`的界面。

### **Git GUI汉化**

啥？你说为啥汉化？？嗯，那你为啥子来看我帖子~~~~ 

因为我么有找到哪里能设置中文的地方，那么到底应该怎么设置`Git GUI`的中文显示呢？

哈哈哈， 其实超简单的，下载此文件：

[https://github.com/stayor/git-gui-zh-master.zip](https://files.cnblogs.com/files/chenghu/git-gui-zh-master.zip )  

解压缩后得到 `zh\_cn.msg`文件。

![](https://s2.loli.net/2023/06/12/LripSjVMJhCAn9v.png)

将其放到/mingw64/share/git-gui/lib/msgs/zh\_cn.msg 路径下

不过`Git`安装路径下面没有`msgs`这个文件夹，我反正是没有的。那么自己创建之后再将这个汉化文件放进去。嗯，这样就算是汉化完了。

重新打开`Git GUI` ，你就会发现界面已经变成了中文了。

![](https://s2.loli.net/2023/06/12/HYpSReDuzEZiOJW.png)

![](https://s2.loli.net/2023/06/12/EGtWxJi7QzfYj2u.png)

 _本文Git GUI汉化包来源：[https://github.com/stayor/git-gui-zh](https://github.com/stayor/git-gui-zh)_ 

嗯，写完了。

  