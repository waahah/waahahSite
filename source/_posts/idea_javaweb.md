---
title: 使用 IntelliJ IDEA 2020 构建一个最简单的JavaWeb项目 
date: 2021-04-23 14:58:36
tags: [IDE, IDEA, JavaWeb]
categories: [IDE, IDEA]

---


### 前言

针对 IntelliJ IDEA 2020这个新的大版本，不管是在创建项目上，还是在进行一些选项的配置上，与之前的版本相比都有些许的不同。  
自己也是在创建项目时发现了许多问题，老师在创建项目时许多以前的选项，在2020.2版里并不是那么的显眼。  
那么如何创建第一个自己的JavaWeb项目呢？  

* * *

#### 1、打开IDEA，选择New Project  

![](https://pic3.zhimg.com/v2-e137a9fc2bd85c6e20ae6bed3afca016_r.jpg)


####  2、选择Java选项，首先创建一个Java项目  

▶ 在之前的版本中，我们创建 JavaWeb 项目时，是可以通过 Java Enterprise 选项进行创建的（2020.2则不同）  

![](https://pic1.zhimg.com/v2-d2e8da0676945dd2fe215b15e5752994_r.jpg)

  

![](https://pic4.zhimg.com/v2-123044fcb2e8d810929474f9f4936b0b_r.jpg)


#### 3、创建完Java项目后，右击项目，选择Add Frameworks Support  

![](https://pic2.zhimg.com/v2-0dd5071151e8f66f7e943079329c7629_r.jpg)


#### 4、选择Web Application，然后OK  

▶ 这个选项以前在 Java Enterprise 创建项目时会看到（2020.2 的 Java Enterprise 选项里没有了）  

![](https://pic2.zhimg.com/v2-d86f0331d72510965ab0388a66d35b2d_r.jpg)


#### 5、JavaWeb项目的基本结构目录  

![](https://pic4.zhimg.com/v2-f25777c8533bce0528c55c32bd484e73_r.jpg)


#### 6、配置tomcat服务器  

![](https://pic3.zhimg.com/v2-509d4f05cc0c3e94f866fbcf17b01b82_r.jpg)


▶ 选择对应jdk的jre版本，这里Default即可，不放心的可自选  

![](https://pic4.zhimg.com/v2-55b723c3955710d7353a6af3e99020a7_r.jpg)


#### 7、在WEB-INF目录下创建 classes 和 lib 文件夹  

![](https://pic1.zhimg.com/v2-0e045f9af186358a5ac6d4b585fa7a3c_r.jpg)


▶ 进入Project Structure 中将编译后字节码文件的输出路径改为自己创建的 classes 目录，并且将存放jar包的路径也指定到自己创建的 lib 目录  

![](https://pic3.zhimg.com/v2-027c4696f4b10430fd6cf81921d70726_r.jpg)

  

![](https://pic1.zhimg.com/v2-b984b88d6885c59f90458895f69029d0_r.jpg)

  

![](https://pic3.zhimg.com/v2-3d09aa0432e252890fd9d551e8bb5d36_r.jpg)


#### 8、进入tomcat配置修改选项  

▶ 这里比较容易出问题（个人理解），就之前 IDEA 版本而言， 截止到上一步就可以运行项目访问网页了（旧版应该是默认自动就将项目部署好了）。但是我在这里发现（2020.2）tomcat里并没有自动部署项目，而是需要我手动部署。这可能是一些童鞋在启动了tomcat服务器后，结果跳出的页面显示404的原因。  

![](https://pic4.zhimg.com/v2-5f4433e77da538e4bc6244b4c5fa0fff_r.jpg)

  

![](https://pic1.zhimg.com/v2-7254a64928fe0f7631536546c973bb28_r.jpg)

  

![](https://pic2.zhimg.com/v2-a06e9562692eeb9a69666bb21595cad5_r.jpg)


#### 9、访问项目index.jsp页面  

▶ 恭喜你成功的创建了第一个你的 JavaWeb 项目  

![](https://pic2.zhimg.com/v2-994d5c595d9c810a510a65094e3d555d_r.jpg)

  