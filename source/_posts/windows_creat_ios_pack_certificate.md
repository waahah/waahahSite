---
title: Windows下创建IOS打包证书的详细流程
date: 2023-06-11 14:58:36
tags: [JavaScript, H5, APP, IOS]
categories: [Coding, JavaScript]
---

windows下创建ios打包证书的详细流程
======================

* * *

当我们在`hbuilderX`、`apicloud`或其他云打包的平台编译app的时候，需要ios打包证书：.p12证书文件和.mobileprovision描述文件。

但是根据苹果官方提供的方法，这个证书的创建需要mac电脑，而我们大部分开发人员都没有mac电脑，那么怎么生成ios证书呢？

你可以使用生成ios证书的工具：[https://www.yunedit.com/createcert](https://www.yunedit.com/createcert)

详细的生成流程如下：

1、假如你还没有苹果开发者账号，你可以参考下面的文章先注册苹果开发者中心： [https://blog.csdn.net/handsome0916/article/details/113779348](https://blog.csdn.net/handsome0916/article/details/113779348)

2、登录香蕉云编控制台，创建csr文件，并将这个创建好的csr文件下载到你的电脑本地  

![](https://s2.loli.net/2023/07/14/sezu9GK7OWSrBvw.png)

2、登录苹果开发者中心，假如你已经按照第一步注册并缴费成为开发者，会见到Certificates菜单. 点击Certificates菜单，点蓝色加号，创建证书，假如不知道苹果开发者中心在哪里，可以看第一步。 记得创建证书的时候一定要选择ios distribution app store and ad hoc类型的证书，可千万别选择了apple distribution类型或选择了develpment类型的证书，选择错了你后面打包就会失败。  

![](https://s2.loli.net/2023/07/14/BogFR6VwLEp7Zic.png)

创建的过程中，会要求我们上传刚才创建的csr文件，上传刚才从本站生成的csr文件，就可以生成cer文件。  
![3 _1_.png](https://s2.loli.net/2023/07/14/tpbUFTejR2w45yS.png)

3、创建cer证书成功后，将这个cer证书下载到我们电脑本地。

4、回到香蕉云编的控制台，在对应的行里面，上传这个cer文件，就可以生成最终的.p12格式的证书了。  
![5 _1_.png](https://s2.loli.net/2023/07/14/d24o7zJPMgp8WKv.png)

### 到这里，p12格式的证书我们已经创建成功了，下面我们来讲述如何生成.mobileprovision描述文件

  

  

1、登录苹果开发者中心控制台，点击Identifiers，点击蓝色加号，创建一个appid，这个appid要跟你在hbuilder打包用的包名一致，假如已经创建，则跳过这一步。  
![8 _1_.png](https://s2.loli.net/2023/07/14/ZrntK2ik65eIzDP.png)

2、点击profiles，开始创建描述文件，创建的时候选择app store类型，假如你选择的是ad hoc类型，则看第四步。  
![6.png](https://s2.loli.net/2023/07/14/LH1cvQDXawqFBUd.png)

3、创建的过程中会要求我们选择第一步创建的appid：。  
![7 _1_.png](https://s2.loli.net/2023/07/14/UI53ng6LAdDrbYS.png)

4、假如你创建的是ad hoc类型的profile（假如你创建的是app store类型的profile则不需要这一步），则创建过程中，还需要提供测试手机的udid，你可以使用你的iphone手机，打开本站（香蕉云编）的这个获取手机udid的工具，获取手机的udid: [https://www.yunedit.com/udid](https://www.yunedit.com/udid "获取udid")

### 到这里，已经介绍完全部的流程，谢谢大家！
