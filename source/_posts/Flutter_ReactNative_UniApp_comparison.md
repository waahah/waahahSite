---
title: 跨平台Flutter,ReactNative,UniApp 分析对比
date: 2023-04-10 14:58:36
tags: [ JavaScript, Flutter, ReactNative, UniApp]
categories: [Coding, JavaScript]
---

跨平台flutter,reactNative,uniApp 分析对比
-------------------------------------------------------------------------------------------------

先带大家看几张图，看下当下跨平台的实际使用范围  
![](https://s2.loli.net/2023/07/12/6cBkvIS1sZVWA28.png)

![](https://s2.loli.net/2023/07/12/p9vecduXtZ17nmP.png)

![](https://s2.loli.net/2023/07/12/YatWnCMT6flGQXF.png)

![](https://s2.loli.net/2023/07/12/EDyNnavhiArg8VF.png)

![](https://s2.loli.net/2023/07/12/e72qx6FJwig9DcQ.png)

![](https://s2.loli.net/2023/07/12/YE7zZTNkeJ3G1Uw.png)

![](https://s2.loli.net/2023/07/12/mNqpIZXuJyjTUrl.png)

具体使用的范围这里小编只带大家看看京东上面rn的使用部分，请看下图:  
![](https://s2.loli.net/2023/07/12/FIONK8uqctrBfpR.jpg)

![](https://s2.loli.net/2023/07/12/BpSm4w9TxOKM1U3.jpg)

这块是京东首页部分->京东超市模块与充值缴费模块，里边还有好多reactNative的使用部分，我这里 手机的开发者模式里的布局边界打开了，为了让大家看的清楚.  
android开发应该都知道这个布局边界，他是android的布局查看，粉红色的代表margin部分，蓝色框代表view的边界。

react-native:
----------------------------------------------------------------------------

> 它是facebook研发的，专注于跨平台App，官方推的是做移动App，不过现在到0.63版本，很多的第三方编写跨平台控件，也勉强可以生成移动网页端，但并不大友好，因为它主要推的是跨平台客户端.

flutter:
-----------------------------------------------------------------------

> Flutter 是 Google 开源的 UI 工具包，帮助开发者通过一套代码库高效构建多平台精美应用，支持移动、Web、桌面和嵌入式平台,Flutter是完全免费、开源的。它也是构建未来的 Google Fuchsia 应用的主要方式。

uniApp
---------------------------------------------------------------------

> uni-app 是一个使用 Vue.js 开发小程序、H5、App的统一前端框架。

**flutter** vs **reactNative**

_结果_:  
**flutter win！**  
_分析_:

> flutter根据google推出的flutter sdk进行编写,完全颠覆了android的开发理念，须知道，android  
> flutter都是google的， android开发使用的android sdk，flutter却不然，自制了一套自己的sdk，直接使用GPU渲染机制，在用户手机上 非常直接的 canvas draw view，其手段已经非常nx。

> reactNative 的bridge(桥接)技术也是很厉害的！他通过了android 与 js  
> 之间构成了bridge，中间经过了编译，最终进行了android控件转换，这点有些像javac编译class那一块了，最终绘制在用户手机上的是原生控件。其中性能问题并不算太大，因为得到的是原生页面，所以比较受欢迎。  
> 相对比下来 rn中间那层转换编译 对于 flutter来说是没有的，相对来说  
> flutter是最直接的，但这里我也要指出，对于目前用户手机性能来说，现在android已经到11了，中间那部分转换损耗的性能，用户基本是感知不到的.

那flutter vs android呢？  
**Android win！**

> 这里不做重点解释，Android结尾给大家说一下。

uniApp

> 当前这个框架采用vue，采用云打包的方式生成apk发布使用.  
> 这个框架我并不看好，开发者可以打开布局边界查看下布局,其中完全使用网页的形式呈现给用户，基本跟android不怎么挂钩，即便挂钩，官方也已经作出了api供用户使用.  
> 虽然说完全使用网页的形式制作，但性能方面不至于太差劲，因为官方做出了很多网页的优化,具体性能暂时劣势于flutter，reactNative。

> 当然，uniapp更适用  
> 于没有原生经验的前端开发，也适用小型企业，毕竟，支持了那么多端的，小程序，android，ios，网页,都是一次编写，随处可用,但我这里不认为支持的多，就代表好.

| 架构 | 优势 | 劣势 |
| --- | --- | --- |
| flutter | 在终端绘制性能较好,支持跨平台，完美通信原生端，可自由在原生端编写代码 | 需要学习dart,android,ios,热更新默认不支持，使用第三方支持了也会损耗性能，编写过程中书写代码如果不会封装，很容易造成嵌套地狱,社区并不是非常活跃，还是有挺多的issue需要解决，第三方包并不会太多需要持续观察 |
| reactNative | 终端绘制采用android绘制，性能偏好，架构设计完全处于还原android原生理念，支持热更新，完美通信原生端，与原生端直接挂钩，息息相关，可自由书写原生代码，比较灵活 | 需要桥接过程中的损耗，需要学习android，ios，react，虽然灵活，但维护成本却并不小 |
| uniApp | vue书写比较简单上手，比起原生，rn，flutter开发速度都是超级快速简单，学习成本较低，支持平台较多，一次编写，处处可运行的理念 | 性能问题存在瓶颈，原生通信受限制，需要根据官方提供间接通信 |

Android
----------------------------------------------------------------------

说了这么多,这又是flutter，又是rn，又是uniApp的，这android要凉了？
-------------------------------------------------------------------------------------------------

**我并不如此认为，须知晓 Android>flutter>reactNative>weex>uniApp, 原生开发性能永远是最直接最高效，一个完整的应用,永远android是首选，喜欢玩app的码友们可以打开手机开发者选项，打开布局边界，只要存在布局边界的 都是原生开发，当然rn也有布局边界（所以他也属于原生开发，但有个小小的区别，前面说了android开发的view 的margin是粉红色的边距，因为reactNative底层做跨端的时候，margin边距采用了css的margin，故reactNative开发的应用margin是看不到，不属于原生margin，所以有点区别，能区分出android和rn的）.  
你会惊奇的发现，手机上的所有架构全部是android开发的，开头贴图部分提到 好多主流app使用到了flutter，rn,但都是嵌套模块使用，并不会整体架构用fluuter或者Rn ，故 android开发仍然很🐂，市场并不会小。**

HarmonyOS
------------------------------------------------------------------------

这个当下只有手表开发 和 tv开发 暂时没有移动开发， 华为吹的那么牛，也就是吹吹，并不看好。拭目以待!

**跨平台如何抉择:**

1.  特别小的公司，只讲究成本，一套即能用:uniApp
2.  性能有要求，功能较复杂，可能涉及较多跟原生挂钩的:flutter||reactNative

**结论**:

> 会原生，会跨端技术，须知，混合开发是王道，你手机上每一个app都是混合开发，纯android架构开发几乎没有，所以android需要学，跨平台跨端技术需要学，鸿蒙虽说不怎么看好，亦需要学！学吧，年轻人

**学无止境！**

