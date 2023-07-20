---
title: 测试二十一、利用正则表达式匹配Poco控件
date: 2023-02-04 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

你是不是经常遇到`poco`定位脚本太长而报错的情况？是不是经常为了那些复杂的控件层级关系而头疼？如果是的话，今天的推文你一定不能错过啦！

先来简单回顾下我们之前在[“poco的元素定位搞不定？速来看看这3个选择器”](#)这篇推文中，详细跟大家介绍过poco定位元素的3种选择器：

*   ① 基本选择器：根据节点的属性及预期的属性值来进行定位，eg：`poco(name="淘宝")`
    
*   ② 相对选择器：利用元素之间的渲染层级关系进行选择，eg：父子关系、兄弟关系等，`poco("plays").child("playBasic")`
    
*   ③ 空间选择器：根据元素索引顺序，逐个选中单个元素，eg：`poco("Content").child(type="Text")[0]`
    

其实除了上述3种常规一点的定位方式之外，还有一种同学们比较少见，但是非常好用的定位方式，那就是 **用正则表达式来匹配控件** ，如下述示例这样：

```python
# select the UI element(s) which text attribute matches the pattern '^close.*$'
poco = Poco(...)
arb_close_btn = poco(textMatches='^close.*$')
```

这种定位方式，用起来非常简单省事。下文我们将详细跟大家介绍下具体如何利用正则表达式来匹配目标的poco控件，以及文末我们还给大家 推荐了1个正则表达式的上手教程和检测正则表达式是否正确的工具 ，希望大家可以认真阅读哦！


**利用正则表达式匹配poco的控件**

我们从1个简单的例子来了解下正则表达式匹配poco控件的用法：

![640 _38_.png](https://s2.loli.net/2023/07/10/rWgtplUzyDZJS1Q.png)

这是淘宝APP的icon控件，利用基本选择器，我们可以使用类似 `poco(text="手机淘宝")` 这样的方式来定位到这个淘宝的icon控件。

换成正则表达式来匹配这个控件的话，我们可以使用如下方式来进行匹配：

`poco(`**`textMatches`**`="能匹配到手机淘宝的正则表达式")`

能匹配到“手机淘宝”的正则表达式有很多，例如 `.*淘宝` ，这个就是能匹配到“手机淘宝”的1个正则表达式，所以点击手机淘宝icon控件的语句我们可以写成如下的形式：

```python
poco(textMatches=".*淘宝").click()
```

除了使用 **`textMatches`** 以外，同理我们还可以使用 **`nameMatches`** 来匹配控件的name属性等：

![640 _39_.png](https://s2.loli.net/2023/07/10/lq37KAM9r5Rtjxs.png)

利用基本选择器定位图中控件，我们可以这么编写定位脚本：

```
![640 _39_.png](https://s2.loli.net/2023/07/10/lq37KAM9r5Rtjxs.png)
```

而换成正则表达式的匹配方式，则可以这么实现：

```
poco(nameMatches=".*portalTitle",textMatches=".*推荐")
```

另外在编写层次特别深的一些定位脚本时，使用正则表达式来匹配，会非常简洁高效：

![640 _40_.png](https://s2.loli.net/2023/07/10/ldyfINxgJumSptj.png)

如上图所示，我们希望获取当前页面所有歌曲的详细介绍信息，如果使用之前介绍的定位方式，脚本可能如下：

```
for i in poco("com.netease.cloudmusic:id/pagerListview").child("com.netease.cloudmusic:id/musicListItemContainer"):
    info = i.child("com.netease.cloudmusic:id/songNameAndInfoArea").offspring("com.netease.cloudmusic:id/songInfo")
    print(info.get_text())
```

![640 _41_.png](https://s2.loli.net/2023/07/10/N2zYXlAPtFOs3gU.png)

可以看到，利用基本选择器和相对选择器写出来的定位脚本，看起来非常繁琐，而且我们还需要非常 **精确地了解其中的层级关系** ，否则定位脚本就很容易出错。

那么我们试试换成正则表达式的定位方式：仔细观察UI树发现，这些歌曲信息的控件名都是一样的，所以只要我们写1个正则表达式，匹配到这一批相同的控件名，就相当于定位到了当前页面所有的歌曲信息控件，接下来就可以利用poco遍历，逐一获取控件的text属性了：

```
for i in poco(nameMatches="com.*?songInfo"):
    print(i.get_text())
```

![640 _42_.png](https://s2.loli.net/2023/07/10/iPs3DlpnCq8u4SO.png)

除了最常见的 **`textMatches`** 、 **`nameMatches`** 和 **`typeMatches`** ，其实大部分的属性都可以用这种方式来传递正则表达式，只要能够用 `poco(xx=预期属性值)` 来选择的控件，就可以用 `poco(xxMatches=预期属性值的正则表达式)` 来进行匹配定位。

**相关教程和工具推荐**

如果同学们需要正则表达式的上手教程，我们推荐大家阅读这篇比较经典的 **正则表达式30分钟入门文章** ：<https://deerchao.cn/tutorials/regex/regex.htm> 。

另外，当同学们撰写了1个正则表达式，想知道它是否能到匹配到预期目标时，我们还可以简单地在线测试下匹配结果，比如使用这个 **检测正则表达式是否匹配的网站** ：<https://tool.oschina.net/regex/> 。

![640 _43_.png](https://s2.loli.net/2023/07/10/Im1JGbeThPZ9UAQ.png)

**小结**

今天的教程就到这里啦！最后附上核心知识点的思维导图，同学们下次做控件定位的时候，不妨考虑使用正则表达式，说不定会有更惊喜的效果哦~

![640 _44_.png](https://s2.loli.net/2023/07/10/gXdPINHwOqyF6JL.png)

（都看到这里了，说明你一定是个认真学习的同学，评论一下再走呗~感谢感谢~）
