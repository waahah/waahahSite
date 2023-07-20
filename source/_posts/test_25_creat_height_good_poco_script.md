---
title: 测试二十五、如何生成高效、兼容性好的Poco定位脚本
date: 2023-02-12 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

### **1\. 前言**

很多新手同学在学习Poco测试框架的时候，会经常遇到一些关于控件定位脚本的问题。比如， **上一秒还能正常运行的控件定位脚本，下一秒就报错找不到控件了** ；再比如，明明不同手机上装的都是同一款应用，但就是有些手机报找不到控件......

这一种种“诡异”的情况，都让我们百思不得其解。所以今天的推文内容，我们将详细地跟大家分享下在编写Poco定位脚本时，我们可以用到的一些实用技巧，超长干货，同学们一定要mark住哦！

  

### **2\. 生成Poco定位脚本的多种方式**

在了解Poco定位脚本的编写技巧之前，我们先来细细回顾一下，我们可以通过哪些方式来“生成”1条Poco定位脚本。

##### **1）单步录制-双击节点**

在AirtestIDE连接上设备之后，打开待测应用，随后在IDE的Poco辅助窗中选择对应的Poco模式，等待UI树刷新出来：

![640 _64_.png](https://s2.loli.net/2023/07/10/59suEyTWDmpjzXl.png)

利用检索按钮检索到目标控件之后，**双击** UI树上的该节点，IDE即可帮助我们自动在脚本编辑窗里面自动生成1条控件定位脚本：

![640 _17_.gif](https://s2.loli.net/2023/07/10/uzIY5cRHByKZpoX.gif)

##### **2）单步录制-右键选择UI path code**

同上，在IDE的Poco辅助窗刷新出控件树之后，单击选中我们的目标节点，然后单击鼠标右键，选择 `UI path code`，IDE的脚本编写窗口就会自动帮我们生成1条控件定位脚本：

![640 _18_.gif](https://s2.loli.net/2023/07/10/cBsG8Pxkpo1qwf2.gif)

##### **3）自动录制**

另外，IDE还提供像录制Airtest脚本一样的，自动录制Poco脚本的功能：

![640 _19_.gif](https://s2.loli.net/2023/07/10/yfChjJPekwQLvg7.gif)

单击Poco辅助窗的录制功能，然后随着我们对设备画面的操作，IDE会自动在脚本编写窗口录制下来我们的Poco操作脚本。

##### **4）手动编写-根据3种定位选择器**

除了使用IDE给我们提供的各种录制方式之外，我们还可以根据各种控件定位规则，手动编写Poco定位脚本。

Poco给我们提供了3种定位选择器，分别是：

*   **基本选择器** ：根据控件的属性和属性值来进行定位，常见的比如name属性、text属性等
    
*   **相对选择器** ：根据控件之间的渲染层级关系来进行定位，常见的关系比如父子关系、兄弟关系等
    
*   **空间顺序选择器** ：按照控件的空间排布顺序，从左到右，从上到下，添加索引值来进行控件定位
    

我们在定位脚本时，可以仅仅使用其中一种定位选择器，也可以混合使用多种定位选择器来编写控件的定位脚本，详细的介绍可以查看官方的往期推文 [poco的元素定位搞不定？速来看看这3个选择器](#) 。

下面我们提供一些利用这3种选择器进行示例脚本：

```python
# 使用基本选择器的poco定位脚本
poco(text="每日推荐")

# 使用相对选择器的poco定位脚本
poco("android.widget.LinearLayout").offspring("com.netease.cloudmusic:id/swipeToRefreshView").child("com.netease.cloudmusic:id/recyclerView")

# 使用控件顺序选择器的poco定位脚本
poco("android.widget.LinearLayout").offspring("com.netease.cloudmusic:id/swipeToRefreshView").child("com.netease.cloudmusic:id/recyclerView")[0]
```

##### **5）手动编写-根据正则匹配表达式**

除了上述3种定位选择器之外，我们还支持使用正则匹配表达式来匹配我们的Poco控件。

在部分情况下，使用正则匹配表达式来匹配Poco控件，会使得我们的定位脚本更加简洁省事。

这里简单列举几个使用正则表达式匹配控件的脚本：

```
# 匹配控件的name属性
poco(nameMatches="com.*?songInfo")

# 匹配控件的text属性
poco(textMatches=".*淘宝")
```

关于利用正则匹配表达式来匹配控件的详细内容，也可以参考官方的往期推文 [真香系列！用正则表达式匹配poco控件，学会了秒杀各种定位选择器](#) 。

其中我们需要记住的最重要的一点是：**只要能够用** **`poco(xx=预期属性值)` 来选择的控件，就可以用 `poco(xxMatches=预期属性值的正则表达式)` 来进行匹配定位。**常见的如常 `textMatches` 、 `nameMatches` 和 `typeMatches`等等。

  

### **3\. 生成高效、兼容性好的Poco脚本技巧**

那简单了解完“生产”Poco定位脚本的各种方式之后，我们再来聊一聊其中的一些技巧。

##### **1）尽量不要完全依赖自动录制**

尽管我们的IDE提供了自动录制Poco脚本的功能，但是我们还是希望同学们不要过于依赖自动录制出来的Poco脚本。

我们更建议大家在学习Poco脚本的初期使用这个功能，来更好的熟悉我们的Poco脚本长什么样子，把录制的脚本作为参考。

这是因为自动录制的Poco脚本，并不完全是正确的、或者是优秀的Poco脚本，有时候我们录制下来的Poco脚本并不能成功回放出来我们期望的效果，或者因为层级过于复杂导致运行效率很低。

举个例子：

```python
poco(text="每日推荐").click()
poco("android.widget.LinearLayout").offspring("com.netease.cloudmusic:id/daily_rv").child("com.netease.cloudmusic:id/musicListItemContainer")[0].child("com.netease.cloudmusic:id/songItemVideoBtn").click()
poco("转到上一层级").click()
```

这3条是自动录制出来的Poco脚本，我们可以对每一条简单分析下：

① 第一条就是很标准的利用text属性进行定位的脚本，没什么疑问，只要text属性在当前页面是唯一的，那就没有很大的问题；

② 第二条就是非常典型的，录制出来的层级过于复杂的脚本，这里涉及了三四层的相对关系，还带有空间索引，很容易出现运行效率差，或者因为索引值变化而导致出现找不到控件的问题；这种定位脚本我们使用过程就需要慎重考虑了，最好更换成别的更加简洁清爽的定位方式；

③ 第三条是录制出来的一个返回上一个页面的Poco定位脚本，这种情况更好的方式是不使用Poco定位脚本，替换成 `keyevent("BACK")` ,更加简单而且稳定。

我们列举这个例子，就是为了说明，**录制功能虽然很“小白”，但是我们还可以将录制出来的Poco脚本优化成更加优秀的脚本**，所以同学们不要过去依赖这个录制功能。

##### **2）减少使用UI path code方式单步录制的脚本（效率低、易出错）**

上文我们介绍了如何在IDE中右键单击UI树的控件，然后选择 UI path code 来生成1条控件定位脚本，但其实，我们并不是非常建议这种方式生成的定位脚本。

举个例子，我们以点击桌面上的网易云音乐图标为例，分别用右键UI path code的方式和双击节点的方式生成定位脚本，并分别单独运行查看效果：

![640 _20_.gif](https://s2.loli.net/2023/07/10/ghfi1RrX6mN78JM.gif)

```python
poco("com.mumu.launcher:id/workspace").child("android.view.ViewGroup").child("android.view.ViewGroup").child("android.widget.TextView")[8].click()

poco(text="网易云音乐").click()
```

可以看到，UI path code方式生成的脚本是以复杂的层级关系来定位的，并且包含空间索引，不如直接使用text属性来进行定位的脚本那么简洁，还更容易出错，所以非必要情况下，我们不那么建议使用这种方式生成定位脚本。

当然，右键UI path code方式生成的脚本并不一定都是会出错的脚本，这里仅列举了1个容易出错的例子，方便说明。

##### **3）多使用控件的text之类的属性提高效率**

我们刚才讲了很多次不建议使用复杂的层次关系（族谱）来进行定位，那么更加建议的方式是什么呢？其实就是使用元素的属性值来定位脚本。

举个例子，假设我们想要点击网易云音乐首页的“每日推荐”控件，利用文本属性编写定位脚本的话，将非常简洁，效率也会更高，不用管它复杂的层级关系以及空间索引顺序：

![640 _65_.png](https://s2.loli.net/2023/07/10/M7XBT23KeRxCUkj.png)

触类旁通，使用1个节点的某个属性值，不仅仅指text属性，还可以是name属性或者其它属性，只要它在当前页面是唯一的，那么我们就可以利用这个属性来定位到我们的控件；甚至 **借助节点的多个属性值来进行精准定位控件，都是可以的** 。我们非常建议大家多使用这种方式来编写我们的Poco定位脚本。

##### **4）推荐使用正则表达式匹配控件**

我们非常推荐同学们多使用正则表达式来匹配控件，特别是对于一些层次关系非常复杂的控件，使用正则表达式来匹配，会非常简洁高效。

举个例子，假设我们希望获取当前页面所有歌曲的详细介绍信息，如果使用之前介绍的定位方式，脚本可能如下：

![640 _66_.png](https://s2.loli.net/2023/07/10/SqkFpnMNc5zeC9a.png)

![640 _67_.png](https://s2.loli.net/2023/07/10/Zphsmbt2YAKGlxF.png)

可以看到，利用基本选择器和相对选择器写出来的定位脚本，看起来非常繁琐，而且我们还需要非常 **精确地了解其中的层级关系** ，否则定位脚本就很容易出错。

那么我们试试换成正则表达式的定位方式：仔细观察UI树发现，这些歌曲信息的控件名都是一样的，所以只要我们写1个正则表达式，匹配到这一批相同的控件名，就相当于定位到了当前页面所有的歌曲信息控件，接下来就可以利用poco遍历，逐一获取控件的text属性了：

![640 _68_.png](https://s2.loli.net/2023/07/10/ydIlCXRonvEcm7K.png)

是不是非常简洁高效呢！

  

### **4.小结**

那今天的教程内容到这里就结束了，我们总共介绍了5种生产脚本的方式，以及4种编写Poco脚本的小技巧，通过下述的思维导图，可以帮我们快速了解整个文章的大致内容：

![640 _69_.png](https://s2.loli.net/2023/07/10/62h4iGjNTVvIuYc.png)

后续有更多的关于Poco脚本的编写技巧，我们还会持续跟大家进行分享