---
title: 测试十七、Airtest入门的超长攻略
date: 2023-01-26 14:58:36
tags: [Android, Airtest, Poco, Test, ADB]
categories: [Coding, 测试]
---

**前言**

不知道你有没有遇到这种情况？在刚接触我们的Airtest项目的时候，总是兴致满满、斗志昂扬；但使用一段时间后，却总是被“找不到图片”、“连不上设备”、“录制的脚本不能运行”这些问题劝退。

不要着急，今天我们特意跟同学们分享下当年入坑Airtest的经验；希望看完今天这篇攻略，可以让你在入门Airtest的时候少走一些弯路！


**1.设备连接篇**

##### **1）连接Android设备**

Airtest支持2种类型的安卓设备，一种是安卓真机，另一种是安卓模拟器。

先来说下真机，用USB线连接手机和电脑、打开开发者模式的USB调试选项，这些基本操作都不在话下，重要的是，完成这些基本操作之后，发现IDE还是连不上这些安卓设备。

连不上的典型现象如下：

① 在IDE的设备连接窗口，看到待测设备的ADB status是 `unauthorized` 。这时候你就要看下手机上是否出现了1个 **允许USB调试的弹窗** ，看到了点击确认即可。如果没看到的话，那就拔插设备，重新来一遍基础操作。

![](https://s2.loli.net/2023/07/10/SyV2YkM6lBnTbOE.png)

② 连接设备的时候，log查看窗出现1个 `AdbShellError` 的报错，这个情况就复杂的多。因为造成这个报错的原因有很多种，比如出现ADB冲突，这时候往往会出现 `adb server version (40) doesn't match this client (39); killing...` 这样的提示。又或者是你的手机没有成功安装Airtest的输入法Yosemite.apk。当然，更多的可能是你这个真机是某些特殊品牌，需要开启一些额外的设置，才能够使用我们的Airtest，这个额外设置因设备而异，具体可以参考我们的 官方文档 给大家 **总结的特殊设备厂商需要开启的额外设置** （https://airtest.doc.io.netease.com/IDEdocs/device\_connection/2\_android\_faq/#2）。

③ 连接上设备之后黑屏、闪退或者不能点击屏幕。这时候只能请出3个备选连接参数了，通常情况下，黑屏或者闪退，可以勾选第一个 `use Javacap` ，不能点击屏幕的特殊设备，可以勾选最后一个 `use Adb Touch` 。

![](https://s2.loli.net/2023/07/10/3Ur5LphgbnklO26.png)

再来说下安卓模拟器，市面上主流的模拟器就那么几款，连接模拟器时，除了基本的打开开发者模式的USB调试之外，我们主要注意以下事项即可：

① 手动给模拟器装上Airtets专用输入法Yosemite.apk，因为很多款模拟器都不能自动装上这个应用，所以我们提前手动装下更加稳妥

② 模拟器基本上都自带adb工具，所以这时候要特别注意下模拟器自带的adb工具版本跟Airtest的adb工具版本是否一致，不一致的话请统一成1个版本，不然非常容易造成ADB冲突，导致模拟器连接不上

③ 搞清楚自己所用品牌的模拟器端口和在IDE连接时是否需要勾选备选连接参数，下述表格可供同学们参考

![640 _6_.png](https://s2.loli.net/2023/07/10/rAuW6HnwVjQGRkZ.png)

##### **2）连接iOS设备**

目前Airtest只支持连接iOS真机；另外我们连接iOS设备，还是需要一台mac完成前期的一些部署工作。

如果底层工具使用的是我们的iOS-tagent（支持到iOS13.5），则连接步骤为：

*   用xcode部署iOS-tagent到真机
    
*   设置代理
    
*   在IDE中连接iOS
    

详细教程可以参考官方文档的 iOS设备连接 章节。（https://airtest.doc.io.netease.com/IDEdocs/device\_connection/4\_ios\_connection/）

如果底层工具使用的是appium的WebDriverAgent（Airtest1.1.8版本或者AirtestIDE1.2.8版本开始兼容），则连接步骤为：

*   用`xcode`部署`appium`的WebDriverAgent
    
*   设置代理
    
*   在IDE中连接iOS
    

使用`appium`的`WebDriverAgent`，`xcode`和`iOS`都可以支持到最新版本；另外部署的详细教程可以参考官方的往期推文：[Airtest年前重磅更新，对iOS的支持全面升级优化啦！](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485486&idx=1&sn=a52bf780f8f08e8c2e5f62413a98a405&chksm=f97ce82dce0b613b38ff7c4938157dc2d844e0ea392f11b98fa9d4d6f92f17c326e95d4c9dcd&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

此外，再跟大家分享1个用PC测试iOS的好工具--tidevice，可实现不依赖 xcode 启动 WebDriverAgent 完成设备连接！详细教程可以参考我们的往期推文： [脱离Mac搞iOS自动化，tidevice工具教你轻松实现！](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485577&idx=1&sn=bdc1895134f66c7e106f6cb668d77f13&chksm=f97ce88ace0b619cdd7c18fd698141eebf02086311c331a91ce5dad4a9eb6dee35bf99ce0629&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

另外，iOS测试最头疼的1个问题就是卡顿问题，不像安卓测试那样可以做到实时同步，这个问题受限于底层的WebDriverAgent工具，暂时没有非常好的优化办法，如后续有了较好的优化效果，也会同步给大家的。

##### **3）连接Windows应用**

我们需要明确，IDE连接Windows应用，有2种模式，嵌入模式和非嵌入模式。顾名思义，嵌入模式，就是连接Windows窗口时，会把应用窗口嵌入到IDE的设备连接窗口中去：

![](https://s2.loli.net/2023/07/10/vKPUeZBRwlStsr4.png)

而非嵌入模式，则是连接上了Windows窗口，但该窗口不用嵌入到IDE的设备连接窗口中去，仍可在IDE之外自由活动：

![](https://s2.loli.net/2023/07/10/uJSMUdvEqX2rAp9.png)

还需要注意的是，选择嵌入模式和非嵌入模式，取决于你的Windows应用适合哪种模式；因为并不是所有Windows应用都可以嵌入到IDE去进行测试。详细的连接方式和注意事项，可以参考官方的往期推文： [Airtest测试Windows窗口翻车？还是想跟你们聊聊测试win窗口的一些问题](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484869&idx=1&sn=0d98ef02a29249edc075e812469bffd7&chksm=f97ce5c6ce0b6cd0eba8186f6487077806115d6b0998bdb298231dd6911cd621ca995e915ec6&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

##### **4）暂不支持连接mac桌面**

没错，如题所示，我们现在还不支持连接mac桌面来进行自动化测试，后续支持了会在官方Q群和官方公众号同步更新内容。

##### **5）脚本连接设备**

在我们使用AirtestIDE运行 `.air` 脚本时，会默认帮我们用设备连接窗口当前连接上的设备来运行。这就相当于，在IDE运行 `.air`脚本时，它帮助我们做了设备连接这个步骤。因此，即使在脚本中我们没看到连接设备的语句，依然能够使用设备连接窗口的设备来运行我们的自动化脚本。

但是如果我们使用 `.py` 脚本，或者在其它编辑器上运行我们的Airtest脚本时，就需要在脚本开头，用脚本完成设备连接这个步骤。

```python
# 连接安卓设备  
auto_setup(__file__,devices=["Android://127.0.0.1:5037/79d03fa"])  
auto_setup(__file__,devices=["Android://127.0.0.1:5037/127.0.0.1:62001?cap_method=JAVACAP&&ori_method=ADBORI"])  
  
# 连接iOS设备  
auto_setup(__file__,devices=["iOS:///127.0.0.1:8100"])  
  
# 连接Windows窗口  
auto_setup(__file__,devices=["Windows:///123456"])  
auto_setup(__file__,devices=["Windows:///"])  
  
# 不支持连接mac桌面进行自动化测试  

```

当然，使用其它设备连接接口（比如 `connect_device()`、`init_device()`）的方式，以及更多脚本连接设备的注意事项，可以参考我们的往期推文：[用1行代码搞定自动化测试的设备连接问题](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484512&idx=1&sn=ef75b4038e8890bfbc4842dae3ef5d18&chksm=f97ce463ce0b6d75e8270b41b15f6d90eb814eb7d79c87e7c45c71f3752d9e3b2bffc07bb6ba&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

  

**2.脚本录制/编写篇**


##### 1）脚本录制

AirtestIDE支持Airtest、Poco和airtest-selenium脚本的录制：

![](https://s2.loli.net/2023/07/10/ZjN5JvUElFgwXiD.png)

但录制脚本功能的使用，都是有一定前提的：

① Airtest录制，保证IDE的设备连接窗口连接上了安卓设备、iOS设备或者Windows窗口（嵌入不嵌入都行）。

② Poco录制，保证IDE的设备连接连接上了安卓设备或者iOS设备（不支持Windows桌面应用），并且在poco辅助窗中选择了待测的poco模式刷出了正常的UI树。能连接上设备，不能刷出UI树的情况，请参考我们的 官方文档 给出的解决办法。（https://airtest.doc.io.netease.com/IDEdocs/faq/5\_quick\_answer/#12ui）

③ airtest-selenium录制，需要使用selenium window 的浏览器初始化按钮，打开1个chrome或者firefox浏览器之后（只支持这2种浏览器），才能进行录制：

![](https://s2.loli.net/2023/07/10/HseydJLYN2v163r.png)

另外，同学们要明确，录制脚本只适合简单的点击、滑动等操作，且可以帮助新手同学快速上手框架的部分api。但是仅仅依赖录制功能就完成内容复杂的自动化脚本，是不现实的！

而且录制出来的脚本，并不全是符合同学们期待的脚本，有可能存在录制出来的截图脚本回放时不通过的情况；或者录制出来的poco脚本层次过深，导致回放非常不稳定的情况。这时候我们就要根据实际情况来优化这些录制出来的脚本了。

##### **2）脚本编写**

录制不是万能的，最终还是要自己会用框架的api，才能编写出更加丰富，功能更加符合需求的自动化测试脚本。

所以我们来简单聊聊如何编写Airtest脚本：

首先，IDE给我们提供的api快捷键不能放过，这里面几乎包含了Airtest的所有核心API，鼠标移动上去，还可以看到参数详情，非常便捷：

![](https://s2.loli.net/2023/07/10/Y95XxrWbhlwDT8S.png)

其次，Airtest提供了 中文版的API文档 ，核心API还有详细的示例供大家学习（https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.api.html?highlight=start\_app#module-airtest.core.api）：

![](https://s2.loli.net/2023/07/10/JVDZ4kQmX1eNjI9.png)

基本上掌握了核心API，就可以实现我们的大部分测试需求了；剩下的就是python脚本能力的体现了，比如如何编写判断语句、循环语句等等。

不喜欢看API文档的同学，还可以查阅我们往期整理的2篇Airtest API的汇总教程，涵盖了Airtest核心API、设置的介绍和脚本示例：

*   [最全Airtest接口功能介绍和示例总结，新手同学千万不能错过呀！（一）](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485284&idx=1&sn=0d9852538ce0673127a2f1662ee58fe7&chksm=f97ce767ce0b6e715ff488d87743a45903bb080d2cebcb596ad4a1dc718b101f685d26bb2086&token=1471011107&lang=zh_CN&scene=21#wechat_redirect)
    
*   [最全Airtest接口功能介绍和示例总结，新手同学千万不能错过呀！（二）](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485304&idx=1&sn=98998b0d615fb04b81b6e0879955c289&chksm=f97ce77bce0b6e6defb153f2d4cbadb54af76f99140b167218a3c10f04f653e83c52422240ce&token=1471011107&lang=zh_CN&scene=21#wechat_redirect)
    

  

**3.脚本运行篇**


##### **1）如何运行**

如果是在AirtestIDE运行脚本，那直接快捷键F5，或者点击顶部菜单栏的运行按钮即可：

![](https://s2.loli.net/2023/07/10/S7L8fR5UECONi6g.png)

那么脱离AirtestIDE如何运行脚本呢？情况大致分为2种：

① 一种是在命令行使用 `airtest run test.air` 命令运行，该命令后面还可以跟着设备参数、log参数和录屏参数：

*   `--device`，用来指定连接的被测设备
    
*   `--log`，用来指定log内容和截图存放的目录
    
*   `--recording`，运行脚本时进行录屏操作
    

运行脚本时带不带参数，取决于你的脚本是否已经完成了连接设备、保存log、录屏等工作，如果脚本里面已经包含这些步骤，那命令行运行时，这些参数就不用带了；如果你的脚本并没有完成这些步骤，那命令行运行脚本时，就要根据自己的需要，有选择性地带上这些参数。

详细内容可以参考我们的往期推文：[如何使用命令行运行脚本、生成报告](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484232&idx=1&sn=1176675a9801e77249d7d369ab880016&chksm=f97ce34bce0b6a5da17f5de02252c5a9656d45e3fcb00e7cb305ca1fced1d879f76edb56c132&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

② 第二种就是在别的python编辑器上运行我们的airtest脚本，比如pycharm。运行的话一般没什么问题，点击编辑器对应的运行脚本按钮即可。重要的是编写脚本的规范性、以及运行环境的建设问题。以pycharm为例，我们在运行脚本之前，需要部署好当前的python环境，把脚本中用到的库，比如airtest、pocoui或者airtest-selenium装好。另外如果脚本是AirtestIDE迁移过来的，还需要特别注意是否有设备连接语句、截图路径是否正确等等，详细的注意事项，也可以参考我们的往期推文：[在Pycharm上编写Airtest脚本的常见问题，希望你可以避开](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484689&idx=1&sn=22511c628c235040af050c87f8569f3d&chksm=f97ce512ce0b6c04c5eb30c368baaf0b9ffe0236b6a5fd93d899753cd1ab7e7a9bc1c7f118ca&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

##### **2）运行后的常见问题：图像找不到**

像 `Picture xxx not found in screen` ，可能是新手同学在学习Airtest脚本的时候最常遇到的问题了！很多同学会说，明明我用肉眼已经看到截图是存在于设备画面上的，为什么运行总是不通过？或者是截图脚本运行是通过了，但是点到了别的地方去，并不是点到了我的预期位置上。

首先我们要了解截图脚本运行的本质。实际上运行我们的截图脚本，就是1个图像识别的过程，airtest会用多个图像识别算法去设备画面里面匹配我们的截图。算法并不是人眼，它只能依靠截图的一些向量特征或者特征点来匹配结果，这就意味着，它匹配出来的结果会出现不满足我们实际预期的情况。

当然，想要提高我们的截图脚本的命中率，也是有非常多的技巧的，详情可以参考我们的往期推文： [写了10000条Airtest截图脚本总结出来的截图经验，赶紧收藏！](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485026&idx=1&sn=69bfbe72c6c7ae2e10738fbae5cd53ed&chksm=f97ce661ce0b6f776f31b14b48e57879c132afc2d9a7aa1380ecc7036a00de30a4ec946c51ce&token=1471011107&lang=zh_CN&scene=21#wechat_redirect) 。

##### **3）运行后的其它语法问题**

比如 `invalid syntax` 或者 API的用法报错，这些问题都是没有任何捷径的！基本的python语法，比如符号的完整性、缩进格式的统一性，可以直接网上看一些python基础教程来学习。

API的用法错误，请移步上文，多看推文的示例！多翻API文档！

  

**4.生成报告篇**

编写完脚本之后，先运行脚本，再生成报告！右键单独运行某一条脚本，不算正式运行脚本，所以不会保存log内容，也就意味着不会生成有log内容的报告。

##### **1）在IDE生成报告**

在AirtestIDE运行 `.air` 脚本时，运行命令默认是带log参数的，所以运行脚本之后都会保存运行的log内容：

![](https://s2.loli.net/2023/07/10/RJwp4WEik8TPIg2.png)

运行结束之后，我们直接点击顶部菜单栏的查看报告按钮即可一键生成并打开HTML格式的报告。

在AirtestIDE新建 `.py` 脚本，自动生成的初始化脚本带有 `logdir=True` ，所以默认也是保存了log内容的：

![](https://s2.loli.net/2023/07/10/eOBJumgQKhXA5UL.png)

同理，运行完毕之后，也可以点击顶部菜单栏的查看报告按钮一键生成并打开HTML格式的报告。

##### **2）命令行生成报告**

上文我们了解了 `airtest run test.air` 命令用于运行脚本，使用该命令在命令行运行脚本之后，我们可以使用生成报告的指令：`airtest report test.air` 来生成该脚本的Airtest报告。

命令行生成报告可带的参数非常多：

*   `--log_root`，指定log内容和截图文件所在的目录
    
*   `--outfile`，指定生成报告的目录
    
*   `--lang`，指定报告语言，可以是中文/英文
    
*   `--export`，导出一个包含所有资源的报告文件
    
*   `--static_root`，指定静态资源文件的路径
    

##### **3）脚本生成报告**

用python脚本生成报告，有2种方式：

① 使用simple\_report接口：

```python
simple_report(__file__,logpath=True,output=r"D:\test\report02\log.html") 
```

API的参数详情可以参考我们的官方API文档：https://airtest.readthedocs.io/zh\_CN/latest/wiki/code/code\_example\_zh.html?highlight=simple\_report#simple-report 。

② 使用LogToHtml类：

```python
h1 = LogToHtml(script_root=r'D:\test\report01.air', log_root=r"D:\test\report01.air\log", export_dir=r"D:\test\report02" ,logfile=r'D:\test\report01.air\log\log.txt', lang='en', plugins=None)  
h1.report()  

```

此类的使用详情可以参考文档：https://airtest.readthedocs.io/zh\_CN/latest/wiki/code/code\_example\_zh.html?highlight=logtohtml#logtohtml 。

##### **4）生成的报告为空**

报告为空，大概率是因为log.txt文件的内容为空，要么是没有保存log，要么是生成报告的语句放在了脚本开头，导致还没运行到实际的步骤就已经生成了一份空报告。

  

**小结**

那么今天这篇教程，从 **设备连接--脚本录制/编写--脚本运行--生成报告** ，详细给大家分享了入坑Airtest的经验，内容很长，同学们可以收藏起来，慢慢看~

（呀！这么认真都看到这里啦，评论一下呗~灰常感谢~）
