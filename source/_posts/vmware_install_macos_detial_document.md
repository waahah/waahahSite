---
title: 零费用体验原生苹果macOS系统，使用VMware虚拟机安装macOS系统最详细教程
date: 2022-05-29 14:58:36
tags: [VMware, macOS, Unlocker]
categories: [IDE, VMware]
---

零费用体验原生苹果macOS系统，全网最详细使用VMware虚拟机安装macOS系统教程
--------------------------------------------

作为苦逼的搬砖族，拥有一台苹果笔记本Macbook一直是一种奢望。想要体验苹果macOS系统的魅力，虽说购买正品Macbook的价格让我们望而却步，但是我们却可以另辟蹊径，在现有的PC条件下来装一个原生的macOS系统。

![](https://s2.loli.net/2023/07/08/AQM5hteJlvTVEad.jpg)

就目前而言，PC安装macOS有两种途径：一个是制作双系统（也就是常说的黑苹果），还有就是利用虚拟机安装。

不过黑苹果我个人建议你不是特别能折腾的就别尝试了，各种限制各种不兼容，你折腾好几天可能到头来全部白费。

所以我更建议大家使用虚拟机安装macOS系统，相对来说限制更少，也容易很多！

PS：这里说的容易其实也不算容易，相对我们在虚拟机安装一个Windows系统麻烦很多，所以今天的教程为了小白朋友少走弯路一次成功，我几乎每个步骤都截图了，非常的详细，有兴趣的记得收藏哦！

话不多说，直接动起来！

安装前的准备
------

**NO.1 一台普通电脑**

不管台式机或者笔记本都可以，但是必备条件是这台电脑的CPU要求支持虚拟化。一般来说目前绝大部分intel的CPU都支持，AMD系列CPU支持的比较少，这个请自行搜索。

**NO.2 安装虚拟机软件**

虚拟机软件我们当然是用强大的VMware虚拟机了，它的安装方法直接看我上一篇文章，里面有详细教程，这里就不再赘述了。

**NO.3 苹果macOS系统镜像**

macOS系统默认的系统格式是dmg，而我们虚拟机可以识别安装的系统格式只能是iso或者cdr的。你可以直接下载别人修订好的cdr或者iso文件，但是我更建议大家去官网下载纯正的dmg系统，然后通过UltraISO（软碟通）软件把dmg格式转为iso就可以了。


![](https://s2.loli.net/2023/07/08/ByixkAYKt5eSnhq.webp)

  

我今天给大家演示的是苹果最新的macOS.Big.Sur.11.2。

**NO.4 解锁工具 macOS Unlocker**

因为默认的VMware不支持安装macOS, 通过解锁工具就可以让VMware虚拟机支持macOS的安装了。


![](https://s2.loli.net/2023/07/08/LNEKVymYOa4UwJt.webp)

  

解锁工具 macOS Unlocker我们可以通过该网址直接下载到本地，解压之后就可以直接使用了。需要注意的是解压之后的文件夹不能包含中文，

下载地址：[https://github.com/BDisp/unlocker/releases](https://link.zhihu.com/?target=https%3A//github.com/BDisp/unlocker/releases)

我今天演示的苹果macOS系统镜像和解锁工具 macOS Unlocker打包分享：

天翼云盘：[https://cloud.189.cn/t/RbaqYvyMBrie](https://link.zhihu.com/?target=https%3A//cloud.189.cn/t/RbaqYvyMBrie) (访问码:riv3)

使用unlocker解锁macOS
-----------------

上面说过，VMware虚拟机时原生不支持macOS，我们需要用解锁工具来让它支持macOS系统的安装。

  

![](https://s2.loli.net/2023/07/08/mvzEAWY1ckn7Sbp.webp)

  

首先我们必须先关闭掉VMware虚拟机的所有进程，我这里是鼠标右键“开始键”，选择“任务管理器”，当然你也可以快捷键“Ctrl+Alt+Delete”。

PS：如果你是首次安装VMware虚拟机并且没有打开的情况下，关闭掉VMware虚拟机的所有进程这部可以不用操作。

  

![](https://s2.loli.net/2023/07/08/pRi8uMYtcxzDNhd.webp)

  

然后在进程里面找到所有VMware开头的文件，然后鼠标右键“结束任务”把它干掉，一个都别留！

  

![v2-b838527fc2c7cc8606ea9bb3ce38adca_720w.webp](https://s2.loli.net/2023/07/08/pbK9Ncax3lBER5t.webp)

  

然后来到我们下载并解压好的解锁工具 Unlocker文件夹，找到“win-install.cmd”文件鼠标右键“以管理员身份运行”，开始解锁操作。

  

![](https://s2.loli.net/2023/07/08/adWPF6lhCIkE4NA.webp)

  

然后该程序会自动跑代码，完成之后会自动关闭。

PS：请留意你那边的杀毒软件，此次跑代码可能会被某些杀毒软件拦截，如果你那边跑代码失败很有可能就是杀毒软件的问题，这个时候你先关闭杀毒软件。

  

![](https://s2.loli.net/2023/07/08/1bgyaG9LmeKRqQx.webp)

  

然后我们就可以检查解锁效果了。打开VMware虚拟机软件，点击“创建新的虚拟机”

  

![](https://s2.loli.net/2023/07/08/GxL9YNHO2Qft7Xm.webp)

  

下一步

  

![](https://s2.loli.net/2023/07/08/3dWQLEZzevrgFOH.webp)

  

在这步选择“稍后安装操作系统”，继续下一步。

  

![](https://s2.loli.net/2023/07/08/4yE7CoZJmr1z9p2.webp)

  

如果在这个页面显示有APPle Mac OS X（M），那么恭喜你解锁成功！

正式安装 macOS
----------

前面准备了这么多，其实到这里才正式开始！

  

![](https://s2.loli.net/2023/07/08/1bgyaG9LmeKRqQx.webp)

  

打开VMware虚拟机软件，选择“创建新的虚拟机”。

  

![](https://s2.loli.net/2023/07/08/qLvyf6xeTI2Z9AR.webp)

  

默认的“典型（推荐）”不管它，继续下一步。

  

![](https://s2.loli.net/2023/07/08/KtsqO4xgmAHyol6.webp)

  

在这步里选择你下载到本地的苹果macOS系统镜像文件（也就是那个iso文件），和我们装windows系统不一样，下面可能会提示无法识别的系统，不用理会，直接下一步。

  

![](https://s2.loli.net/2023/07/08/HJZSMq89geFI3lT.webp)

  

然后这里选择我们刚刚解锁的Apple Mac OS X 选项，下面的版本直接选择你对应的系统版本。我前面说过我下载的苹果macOS系统镜像是macOS.Big.Sur.11.2，所以这里理所当然的选择了macOS 11。

  

![](https://s2.loli.net/2023/07/08/iO6mwNhJeg4W73z.webp)

  

然后选择你虚拟机位置，建议选择一个大点的磁盘空间，最低40GB以上。创建的这个虚拟机的位置等下还会用到的，所以你还要记得才行。

  

![](https://s2.loli.net/2023/07/08/zl3IdREUxfe2HhC.webp)

  

我这里直接保持默认80GB，如果你硬盘空间有限也可以设置小一点，但是建议不要低于40GB.

  

![](https://s2.loli.net/2023/07/08/K5q3sdjvY6VTSgG.webp)

  

到这里，点击“完成”按钮，苹果macOS系统的虚拟机就创建完成了！

但是这并没有结束，并且你还不能打开虚拟机，因为这个时候打开虚拟机你就会看到“白苹果”（进不了系统）。

  

![v2-aa84b10a74abe9e152a38fa4ce1f0a8e_720w.webp](https://s2.loli.net/2023/07/08/bPgVlJsx9MohK1F.webp)

  

找到上面让你记下的虚拟机创建的位置（目录），然后点击后缀为 .vmx 的文件，比如我这边的是macOS 11.vmx，然后鼠标右键“打开方式”选择“记事本”

  

![](https://s2.loli.net/2023/07/08/h1FNwI97tbmXzqS.webp)

  

然后在最后添加一行：

**smc.version = 0**

最后保存并退出即可。

到此，苹果macOS系统虚拟机才正式创建完成！

启动苹果macOS系统虚拟机
--------------

终于到了激动人心的时刻了，能不能成功就在此一举！

  

![](https://s2.loli.net/2023/07/08/tmSHPCF7JeL3TNY.webp)

  

选中虚拟机种的“macOS 11"然后点击”开启此虚拟机“

  

![](https://s2.loli.net/2023/07/08/VKsvEedIDpC4Otu.webp)

  

当你看见上图中的画面那么恭喜你！你的电脑可以成功支持苹果macOS系统的虚拟机安装。

PS：如果显示的是英文字母Boot Manager，下面还有一系列英文啥的，那就是说你虚拟的这个镜像文件不支持你的cpu，你也只能换个镜像重新弄了~~

  

![](https://s2.loli.net/2023/07/08/BvAa3mJ7gjRIT6F.webp)

  

语言这步选择“简体中文”，然后下一步。

  

![](https://s2.loli.net/2023/07/08/GePUF2auZwVSN6l.webp)

  

然后在这里选择“磁盘工具”之后再点“继续”按钮

  

![](https://s2.loli.net/2023/07/08/oa3wQTpGxrMZqB1.webp)

  

在这个页面先点击左侧的VMware开头的那项，然后右侧点击上方的“抹掉”

  

![](https://s2.loli.net/2023/07/08/PMzIcSgyTmX5Gv9.webp)

  

名称自己随意填，其它的默认，然后点击“抹掉”按钮。

  

![](https://s2.loli.net/2023/07/08/5QAtSVKC3FEWkug.webp)

  

等待系统自动抹掉完成之后点击上图红色方框的位置退出该页面。

  

![](https://s2.loli.net/2023/07/08/6iDCfn1quobcr7g.webp)


回到这个页面点击“安装macOS Big Sur”，然后选择“继续”按钮

  

![](https://s2.loli.net/2023/07/08/TxPL9VnjWIgtlZh.webp)

  

点击“继续”

  

![](https://s2.loli.net/2023/07/08/NYs3MmIW7tZnDqw.webp)

  

  

![](https://s2.loli.net/2023/07/08/mf9DocLltbMeZys.webp)

  

点击“同意”

  

![](https://s2.loli.net/2023/07/08/8Hictyx6F39gqzr.webp)

  

点击我们刚刚抹掉的那个盘，然后点击“继续”按钮

  

![](https://s2.loli.net/2023/07/08/EUrjlGf34goWCZq.webp)

  

  

![](https://s2.loli.net/2023/07/08/63fS7G1QoPJNYqp.webp)

  

然后就是漫长的等待时间，我这边差不多有半个小时之久，比安装windows可能3分钟就能完成相比差别太远了！

配置苹果macOS系统虚拟机
--------------

  

  

![](https://s2.loli.net/2023/07/08/VntBMWviA7SmLJO.webp)

  

经过漫长的等待，当出现这个场面的时候就说明你正式的进入了虚拟机种的苹果macOS系统。地区当然是选择“中国大陆”了。

  

![](https://s2.loli.net/2023/07/08/4wNshfktKYOJapi.webp)

  

保持默认，点“继续”

  

![](https://s2.loli.net/2023/07/08/NpJ9blDqKuI4kEf.webp)

  

点击“以后”

  

![](https://s2.loli.net/2023/07/08/bzTtUxmravo2Gik.webp)

  

保持默认的“本地网络”，点“继续”

  

![](https://s2.loli.net/2023/07/08/HtDMdNObSiIqZF6.webp)

  

  

![](https://s2.loli.net/2023/07/08/TZhVHRwK37d6vtD.webp)

  

啥也不管，继续点“继续”

  

![](https://s2.loli.net/2023/07/08/ENHIbvBgL5y24MG.webp)

  

继续点“继续”

  

![](https://s2.loli.net/2023/07/08/Rh4eO9Kq2z1TDC3.webp)

  

这里点击左下角“以后”

  

![](https://s2.loli.net/2023/07/08/cC7jTyqWQVORdFZ.webp)

  

  

![](https://s2.loli.net/2023/07/08/Yow5kUQhIsfaP8v.webp)

  

点“同意”

  

![](https://s2.loli.net/2023/07/08/52iLBRxSTQGk9Ea.webp)

  

然后这步提示可以不填，其它的自己随意填写即可。不过密码你可要记住了，等下就是你的系统密码。完成之后还是点“继续”

  

![](https://s2.loli.net/2023/07/08/8Zc6GKdBsw59PND.webp)

  

点“继续”

  

![](https://s2.loli.net/2023/07/08/XrxaHeg89DJsVbf.webp)

  

保持默认的不勾选，点击“继续”

  

![](https://s2.loli.net/2023/07/08/8tveZw4kLouBxJl.webp)

  

点击“继续”

  

![](https://s2.loli.net/2023/07/08/xe9TWmAVkh1ncas.webp)

  

  

![](https://s2.loli.net/2023/07/08/XkzIjgaAtoqK7LY.webp)

  

这里关于Siri的选项自己随意吧，可选可不选

  

![](https://s2.loli.net/2023/07/08/SeZa6q4iYoRy52X.webp)

  

外观啥的也是自己随意选择，其实这些后期进入macOS系统以后可以再次设置的。

  

![](https://s2.loli.net/2023/07/08/FU2Y7BwqIzCiTdy.webp)

  

经过一些列看似高大上，其实异常啰嗦的设置之后，终于见到了久违的Mac桌面了！

  

![](https://s2.loli.net/2023/07/08/lTHi1XreY25qWVk.webp)

  

目前最新的macOS Big Sur系统（虽说版本号不是最新的）。

最后的调试
-----

你你以为见到桌面就大功告成了吗？NO！你还有一些设置需要完成呢！

  

![](https://s2.loli.net/2023/07/08/76bO9kPSGznWlLt.webp)

  

首先我们打开浏览器，随便打开一个网站会提示没有接入互联网的。

  

![](https://s2.loli.net/2023/07/08/utlVswrbLPUOWQn.webp)

  

这个时候我们先点击虚拟机上面标签页后面的“X”，然后选择“关机”

  

![](https://s2.loli.net/2023/07/08/RWCrFevgiYID2xL.webp)

  

回到VMware虚拟机主页，点击“macOS--编辑虚拟机设置”

  

![](https://s2.loli.net/2023/07/08/jVNAzhSMKWP9pvQ.webp)

  

然后选择“网络适配器”，将网络连接改为“桥接模式”，完成之后点击“确定”。

  

![](https://s2.loli.net/2023/07/08/R4WDFi6E9PK5e8f.webp)

  

再次开启macOS虚拟机，进入系统之后这里需要输入的密码就是上边你设置的那个系统密码，输入好之后直接点“回车”就进入系统桌面了。

  

![](https://s2.loli.net/2023/07/08/3BLW5hFCDnbHoIk.webp)

  

再次打开浏览器，可以发现已经可以正常使用了。

然后我们还要继续安装一个重要的组件【VMware Tools】

PS：VMware Tools组件，是VMware官方对虚拟机提供的一个组件包，能改善鼠标移动性、视频和性能，虚拟机显示没有黑边，屏幕会根据窗口大小自动调整，还能实现文件无缝拖入。

  

![](https://s2.loli.net/2023/07/08/JYohIRGLzAg24v9.webp)

  

这步我忘记截图，随便找了个网图。直接鼠标右键该虚拟机并点击“安装VMware tools”

  

![](https://s2.loli.net/2023/07/08/dtz5VYAQiKW9bHN.webp)

  

然后在系统上面就会弹出一个提示，选择“安装VMware tools”即可。

  

![](https://s2.loli.net/2023/07/08/4hoSy72YjGbWlVK.webp)

  

首次安装第三方软件会有这个提示，按照要求操作即可。点击”继续“

  

![](https://s2.loli.net/2023/07/08/4G5AuYL8dO6lHSE.webp)

  

选择”安装“

  

![](https://s2.loli.net/2023/07/08/N2pUhByMXxm5gJu.webp)

  

这里需要输入密码，密码还是那个你设置的系统密码，完成之后点”安装软件“

  

![](https://s2.loli.net/2023/07/08/jucC2y8nUE7q6SA.webp)

  

然后软件自己开始安装

  

![](https://s2.loli.net/2023/07/08/lOZj9NEUg6SqwdJ.webp)

  

到这里选择击“打开安全性偏好设置”

  

![](https://s2.loli.net/2023/07/08/tToSHEu9efNxnBb.webp)

  

点击左下角锁按钮

  

![](https://s2.loli.net/2023/07/08/YTUx38RSE5KeXyw.webp)

  

再次输入系统密码之后点击”解锁“按钮

  

![](https://s2.loli.net/2023/07/08/fPae2lOwXLvS3Rh.webp)

  

点击“允许”

  

![](https://s2.loli.net/2023/07/08/21uGd9SwDYbPLfX.webp)

  

这里直接点击”重新启动“吧！其实也可以先点击”以后“，但是等下还是会提示重新启动的。

  

![](https://s2.loli.net/2023/07/08/uGiTQYIXhl9V8f7.webp)

  

同时会有“安装成功”的提示，就说明VMware Tools安装好了。

最后点击“重新启动”，这个时候，苹果macOS系统虚拟机基本就算真正的配置完成了，这个时候你就可以愉快的玩耍了！

苹果macOS系统虚拟机初体验
---------------

  

![](https://s2.loli.net/2023/07/08/ObVHXvdqKuE29WF.webp)

  

随便用苹果浏览器打开张大妈，丝质顺滑！

  

![](https://s2.loli.net/2023/07/08/7nByxoAi81jISeG.webp)

  

当然，你也可以在设置中登录自己的ID账号。

  

![](https://s2.loli.net/2023/07/08/9PiHogKJfxseNMh.webp)

  

有意思的是登录之后下面的列表竟然准确的显示了是VMware虚拟机。

  

![](https://s2.loli.net/2023/07/08/xAkZDh2oyu8BrH3.webp)

  

当然，进应用商店也是OK的~

至此，今天的教程到此结束。

好了，以上就是今天给大家分享的内容，如果今天的内容对你有帮助请记得留言常来，我会经常给大家分享各类有意思的软件和免费干货！谢谢大家~~
