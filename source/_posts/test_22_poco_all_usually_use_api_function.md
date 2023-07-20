---
title: 测试二十二、Poco的所有常用API基本功能
date: 2023-02-06 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

本文将以官网上的安卓演示游戏为例，下载地址：<https://poco.readthedocs.io/en/latest/source/doc/poco-example/index.html> 。下载完对应的 “**demo game android**” 以后，安装在待测的安卓手机上；再使用IDE连接上待测手机，并在poco辅助窗选择 `unity` 模式，刷出UI树后即可开始测试。

![640 _45_.png](https://s2.loli.net/2023/07/10/Q2JBprfEm7F69Zq.png)

阅读本文，你将了解poco的以下功能：

*   点击操作
    
*   读取和设置控件的属性
    
*   判断元素是否存在
    
*   拖动与滑动
    
*   内部偏移和外部偏移（focus）
    
*   遍历元素
    
*   等待事件
    
*   各种平台接入SDK的教程汇总

**点击操作**

poco支持各种点击操作：选中控件点击、坐标点击、长按等等。

需要注意的是，poco使用的坐标系是 **相对坐标系** ，所以使用poco的坐标点击时，X、Y的坐标值的范围都在0~1之内，否则会报 `Click position out of screen` 的错误。

关于poco坐标系的详细内容，我们可以参考往期推文 [如何让你的“坐标”一步到位](http://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484041&idx=1&sn=d5f1b0e6d4637220d362135ed5d36146&chksm=f97ce28ace0b6b9c1f02269bf498ba5b8aa640f9b5d1307e913784af2de4c2d139a29d41919f&scene=21#wechat_redirect)。

```python
# 控件点击
poco("btn_start").click()
# 坐标点击
poco.click([0.14,0.2])

# 普通点击、长按
poco("star_single").click()
poco('star_single').long_click()
```

![640 _8_.gif](https://s2.loli.net/2023/07/10/EsWIGwXCyBHciPO.gif)

`click()` 和 `long_click()` 的API详情可以参看此链接：<https://poco.readthedocs.io/zh\_CN/latest/source/poco.drivers.std.inputs.html?highlight=click#poco.drivers.std.inputs.StdInput.click>


**读取和设置控件的属性**


##### **获取属性**

以节点名为 “star\_single” 这个控件的属性为例，我们可以用 `get_name()` 方法来获取这个节点的name属性，还可以用 `attr('name')` 方法来获取：

![](https://s2.loli.net/2023/07/10/3zT8SqxirsUahVv.png)

```
# 获取属性

name1 = poco("star_single").get_name()
name2 = poco("star_single").attr('name')
text = poco("star_single").get_text()

print ("name1:",name1)
print ("name2:",name2)
print("text:",text)
```

![](https://s2.loli.net/2023/07/10/AGC8V3FB2EjoqSv.png)

除了 `get_name()` 方法以外，poco还提供了 `get_text()` 、 `get_position()` 、 `get_size()` 和 `get_bounds()` 这4个方法，帮助我们获取元素对应属性。这几个方法的详细API可以参考此链接：https://poco.readthedocs.io/zh\_CN/latest/source/poco.proxy.html?highlight=get\_#poco.proxy.UIObjectProxy.get\_

而 `attr()` 可以获取的属性则更多：

![](https://s2.loli.net/2023/07/10/lErk9byXCDoRqtA.png)

另外从上图中我们还可以看出，如果我们获取控件不存在的属性，结果会返回none：

![](https://s2.loli.net/2023/07/10/MsJ28rg1DERhXoq.png)

##### **设置属性**

通常我们需要设置元素属性的情况，就是设置文本框的文本属性，可以用 `set_text()` 方法或者 `setattr()` 方法：

```python
# 设置属性

poco("pos_input").set_text("123")

poco("pos_input").setattr('text',"456")

# 错误示范
poco("pos_input").setattr('type',"456")

```

![](https://s2.loli.net/2023/07/10/Z5iOMv1R3xAqJbn.gif)

这两方法的API详情可以参看此链接：<https://poco.readthedocs.io/zh\_CN/latest/source/poco.proxy.html?highlight=set#poco.proxy.UIObjectProxy.set\_text>

另外，如果我们强行设置不可修改的元素属性，就像上文所示范的那样，我们无法设置 “star\_single” 的type属性，就会报 `InvalidOperationException` 的错误。

**判断元素是否存在**


写测试脚本时，我们经常会遇到这种情况：如果A元素存在，那么再执行B操作。判断A是否存在，我们可以使用 `poco(XXX).exists()` ：

![](https://s2.loli.net/2023/07/10/ImcnhLrVEN4KMQz.png)

**拖动与滑动**


##### **拖动 drag\_to**

`drag_to()` 方法的终点可以是一个元素控件，也可以是一个固定的相对坐标：

```
# 拖动
for star in poco("playDragAndDrop").child("star"):
    star.drag_to(poco("shell"))

for star in poco("playDragAndDrop").child("star"):
    star.drag_to([0.5,0.6])
```

![](https://s2.loli.net/2023/07/10/piQDvSfHJZPVtsC.gif)

##### **滑动 swipe**

poco的 `swipe` 接口官方在之前的推文 [“你的swipe接口用不好，是因为...”](http://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484117&idx=1&sn=5217a06f1b60fa1cda24da9ef3cf1ffe&chksm=f97ce2d6ce0b6bc08389f6ae7abb9eb424f3331a6a1a797a09e02e93d44d4253dfff42cdde8c&scene=21#wechat_redirect) 中有详细的介绍，大家可以前往查看~


**内部偏移和外部偏移(focus)**


在上文我们就提到过，poco使用的坐标系是 **相对坐标系** 。举个例子，我们选中下图的pearl图片控件，此时的坐标系就是相对这个控件的坐标系，并且是从0到1进行归一化的。

对这个控件进行点击操作，实际上点击的坐标是控件上(0.5,0.5)的位置：

```
poco(texture="icon").click()
```

![](https://s2.loli.net/2023/07/10/69wLf81WUOoun4y.png)

##### **内部偏移**

如果选中控件之后，你并不想点击控件的中心位置，而是想点击控件内部的其它位置，我们可以使用 `focus()` 方法来指定内部偏移量：

```python
# 内部偏移
pearl = poco(texture="icon")
pearl.focus('center').long_click()
sleep(1.0)
pearl.focus([0.1,0.1]).long_click()
sleep(1.0)
pearl.focus([0.9,0.9]).long_click()
```

![](https://s2.loli.net/2023/07/10/51DlnHgc9tG43Tz.gif)

##### **外部偏移**

选中1个控件以后，如果我们想点击控件之外的位置，也可以使用 `focus()` 方法来指定外部偏移量；并且会出现 **点击坐标的值小于0或者大于1** 的情况：

![](https://s2.loli.net/2023/07/10/fUAYx2w1JiWSCXc.png)

如上图所示，我们选中了 pearl 这个文本控件，但是我们想要去点击文本控件上方的图标，此时focus里面的Y坐标就是负数；因为相对于这个文本控件来说，上方图标的Y坐标已经小于0了：

```python
# 外部偏移
pearl_text = poco(text="pearl")
pearl_text.focus([0.5,-3]).long_click()
```

同理，如果点击该文本控件正下方比较远的位置，Y坐标就有可能大于1；当Y坐标大到超出当前屏幕时，就会报错： `InvalidOperationException('Click position out of screen.` 。

`focus()` 方法的API详情可以参看此链接：https://poco-chinese.readthedocs.io/en/latest/source/poco.proxy.html?highlight=focus#poco.proxy.UIObjectProxy.focus


**遍历元素**

上文讲拖动的时候，我们就给大家演示过遍历元素的例子，通过python的for循环，我们可以 **遍历任何序列的项目** ，如一个列表或者字符串。

例子中，`poco("playDragAndDrop").child("star")` 得到的就是1个控件序列（包含了5个星星元素）， `star` 代表控件序列中的1个元素。因此通过这个循环，我们就遍历了5个星星元素的序列，并把每个星星元素依次拖动到贝壳上：

```python
for star in poco("playDragAndDrop").child("star"):
    star.drag_to(poco("shell"))
```

在自动化测试实践中，我们可以利用遍历元素做很多事情，比如我们可以用元素遍历依次获取下图几个图标正下方的名称：

```python
for name in poco("playLocalPositioning").child("fish").offspring("name"):
    print(name.get_text())
```

![](https://s2.loli.net/2023/07/10/iqOPcrhaS9KXEHj.png)

![640 _54_.png](https://s2.loli.net/2023/07/10/uwbkc1UIpZ8XaTs.png)


**等待事件**

##### **wait\_for\_appearance()和wait\_for\_disappearance()**

依旧以demo中的小游戏为例，我们想要实现以下操作：

1.  等待蓝色鱼出现
    
2.  点击蓝色鱼
    
3.  等待炸弹出现
    
4.  等待炸弹消失
    
5.  点击返回按钮
    

```python
poco("blue").wait_for_appearance()
poco("blue").click()
poco("bomb").wait_for_appearance()
poco("bomb").wait_for_disappearance()
poco("btn_back").click()
```

![640 _12_.gif](https://s2.loli.net/2023/07/10/RB2oODydQsexFvt.gif)

可以看到，`wait_for_appearance()` 和 `wait_for_disappearance()` 可以帮助我们等待页面上 某1个UI 出现或者消失，等待的超时时间 `timeout` 默认为120秒，如果在超时时长之内元素没有出现或者消失的话，会报 `PocoTargetTimeout` 的错误。

两个方法的API详情参考链接：https://poco-chinese.readthedocs.io/en/latest/source/poco.proxy.html?highlight=wait\_for\_appearance#poco.proxy.UIObjectProxy.wait\_for\_appearance

##### **wait\_for\_any()和wait\_for\_all()**

与上述等待事件不同的是，`wait_for_any()` 和 `wait_for_all()` 可以给定多个UI对象让其等待。

`wait_for_all()` 是在超时时长结束之前，需要 **等待所有给定的UI对象都显示出来** ，即一次轮询所有UI，例如等待三个图标都显示之后，再点击返回按钮：

```python
poco("wait_ui2").click()
yellow = poco("yellow")
blue = poco("blue")
black = poco("black")

poco.wait_for_all([yellow,blue,black])
poco("btn_back").click()
```

![640 _13_.gif](https://s2.loli.net/2023/07/10/uDQplZzYTyvJ5wF.gif)

`wait_for_any()` 则是在超时时长结束之前，**等待任意一个UI显示出来**，即一次轮询任何一个给定的UI，例如：

```python
bomb = poco("bomb")
yellow = poco("yellow")
blue = poco("blue")

while True:
    fish = poco.wait_for_any([bomb,yellow,blue])
    print(fish.get_name())
```

![640 _14_.gif](https://s2.loli.net/2023/07/10/xn7qdLBDuEZNh9v.gif)

可以看到，只要页面出出现了等待的任一UI，`wait_for_any()` 方法都会返回第一个等待到的UI。

俩方法的API详情参考链接：<https://poco-chinese.readthedocs.io/en/latest/source/poco.pocofw.html?highlight=wait\_for#poco.pocofw.Poco.wait\_for\_any>

### 各种平台接入SDK的教程汇总

1. **unity3d**接入教程 ：https://poco-chinese.readthedocs.io/zh\_CN/latest/source/doc/integration.html#unity3d

2. **cocos2dx-lua**接入教程：https://poco-chinese.readthedocs.io/zh\_CN/latest/source/doc/integration.html#cocos2dx-lua

3. **cocos2dx-js**接入教程：https://poco-chinese.readthedocs.io/zh\_CN/latest/source/doc/integration.html#cocos2dx-js-beta

4. **cocos-creator**接入教程：https://poco-chinese.readthedocs.io/zh\_CN/latest/source/doc/integration.html#cocos-creator

5. **Egret**接入教程：https://github.com/AirtestProject/Poco-SDK/tree/master/Egret

6. UE4接入教程：[https://mp.weixin.qq.com/s?\_\_biz=MzUxMDc4NTkwMA==&mid=2247484258&idx=1&sn=0fec4461bc870077af4e096b494d646a&chksm=f97ce361ce0b6a77c885193a900d2be08d22c3cf86a0e90a5fb0e83758aaffc65a9d00ec3927&token=1860040772&lang=zh\_CN#rd](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484258&idx=1&sn=0fec4461bc870077af4e096b494d646a&chksm=f97ce361ce0b6a77c885193a900d2be08d22c3cf86a0e90a5fb0e83758aaffc65a9d00ec3927&token=1860040772&lang=zh_CN&scene=21#wechat_redirect)

7. **自行接入**其它引擎的教程：https://poco-chinese.readthedocs.io/zh\_CN/latest/source/doc/implementation\_guide.html

8. **WebView检视**：https://airtest.doc.io.netease.com/IDEdocs/poco\_framework/poco\_webview/

其它  
无需接入`pocoSDK`的平台：`Android`原生、`iOS`原生  
暂不支持的平台：`Windows`、`MacOS`等
