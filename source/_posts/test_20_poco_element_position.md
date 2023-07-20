---
title: 测试二十、Poco的元素定位(3种选择器)
date: 2023-02-02 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

关于 **元素定位** 的问题，比如:有哪些属性可以拿来定位元素？利用节点属性无法定位元素时应该怎么处理？为什么明明存在的节点还会报找不到？...

所以我们特意整理了这篇文章，向大家详细讲述几种poco元素定位的方式，希望能方便大家在实际项目中灵活运用。

**借助IDE的poco辅助窗生成元素定位脚本**

AirtestIDE的 poco辅助窗 给我们提供了很多种方式来生成元素定位的脚本。最简单的方法是，点击poco辅助窗里面的 录制按钮 ，然后再点击下目标元素：

![640 _5_.gif](https://s2.loli.net/2023/07/10/WP9GOlNMuvYeXKn.gif)

这样脚本编辑窗就会自动生成一条点击控件的脚本，除去脚本中点击操作的代码，剩下的 `poco("star_single")` ，就是定位到黄色星星图片元素的代码了。

当然，我们还可以使用录制按钮旁边的俩个 **检视器** 按钮来帮助我们定位元素。这两个检视器按钮的区别在于，是否锁定当前页面：

![640 _6_.gif](https://s2.loli.net/2023/07/10/7nUOZeAjomVvftS.gif)

我们可以看到，随着检视器定位到某个元素，辅助窗里面的UI树也会随着定位到相应的元素上，这时我们可以 **双击** UI树对应的位置，即可在脚本编辑窗自动生成定位元素的脚本：

![640 _7_.gif](https://s2.loli.net/2023/07/10/upRi5PoOGKC2Wsv.gif)

**利用基本选择器进行元素定位**


从上文中我们可以看到，IDE自动帮我们生成的元素定位脚本，都是 `poco("xxx")` 这种形式的。

其实在poco实例后加一对括号，我们就可以进行元素选择了。选择器会遍历所有元素，将满足给定条件的元素都选出来并返回。

括号里的参数就是所给定的条件，用属性名值对表示，其中第一个参数表示 节点名 ，就像 `poco("star_single")` 。后面还可以跟着一些可选参数，均表示 节点的属性及预期的属性值 ：

```python
poco("star_single",type="Image")
```

![640 _34_.png](https://s2.loli.net/2023/07/10/S5beTVNY6GK1Onw.png)


**利用相对选择器进行元素定位**
  
如果直接用节点属性（或者说仅仅使用基本选择器）没法选出你所想要的元素时，你还可以通过元素之间的渲染层级关系进行选择，例如父子关系、兄弟关系、祖先后代关系等等：

```
poco("plays").child("playBasic").offspring("star_single")
```

![640 _35_.png](https://s2.loli.net/2023/07/10/dHXIj7lbPKwDV1Y.png)

更多关于父子关系、兄弟关系的方法API可以到这个页面上查看：<https://poco.readthedocs.io/zh\_CN/latest/source/poco.proxy.html?highlight=offspring#poco.proxy.UIObjectProxy.offspring>


**利用空间顺序选择器进行元素定位**


按照序号(顺序)进行选择总是按照空间排布顺序，先从左往右，再像之前那样一行一行从上到下。如下图所示，我们利用选择器选中了很多个 `type="Text"` 的元素，然后再利用索引顺序逐个选中单个元素：

```python
name0 = poco("Content").child(type="Text")[0].get_name()
name1 = poco("Content").child(type="Text")[1].get_name()
name2 = poco("Content").child(type="Text")[2].get_name()

print(name0+" "+name1+" "+name2)
```

![640 _36_.png](https://s2.loli.net/2023/07/10/GCdcZi85TlvU3bs.png)

索引选择有个特例，一旦进行选择后，如果元素的位置发生了变化，那么下标序号仍然是按照选择的那一瞬间所确定的值。即，如果选择时①号元素现在去到了③号的位置，那么还是要用 `poco(...)[0]` 来访问，而不是 `poco(...)[2]` 。

如果选择了之后，某个元素消失了(从界面中移除或者隐藏了)，那么如果再访问那个元素则可能会发生异常，其余的元素仍可继续访问。



**小结**
  

在实操过程中，我们并不需要拘泥于使用某一种选择器来进行元素定位，相反我们可以结合实际情况，**使用多种选择器** 来帮我们准确定位到某个元素。

另外，有时候poco的录制功能帮助我们生成的定位脚本非常长，定位层级关系过于复杂，就很容易产生以下报错：

![640 _37_.png](https://s2.loli.net/2023/07/10/R7o5aEezUrBLQw1.png)

这时我们可以根据UI树的结构，自己换一种没那么复杂的元素定位方式。

