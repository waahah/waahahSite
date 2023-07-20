---
title: 测试二十六、Airtest-Selenium快速上手实战
date: 2023-02-14 14:58:36
tags: [Python, Airtest, Poco, Test, Selenium]
categories: [Coding, 测试]
---

### 前言

`Selenium`是一个用于Web应用程序的自动化测试工具。它直接运行在浏览器中，可以模拟用户在浏览器上面的行为操作。

在AirtestIDE中，开发者也给我们提供了使用Selenium的窗口。不过使用的框架是`Airtest-Selenium`框架。Airtest-Selenium是对selenium的python库做的一层封装，它添加了部分图像识别的接口，也可以生成网页版测试报告。

本文将借助IDE上的Selenium窗口，来给大家讲解在浏览器上进行自动化测试的实战。

IDE中的Selenium窗口

##### **在AirtestIDE中调出Selenium的窗口**

默认情况下，IDE没有并显示Selenium的窗口，所以我们需要在IDE顶部的`窗口`菜单下，把`Selenium Window`勾选上，勾选之后Selenium的窗口才会显示在IDE界面的左侧。

![](https://s2.loli.net/2023/07/10/4wb5LtFGl7QMOWJ.png)

![](https://s2.loli.net/2023/07/10/kSA5Fu3lWqfyREc.png)

##### **插入初始代码的快捷按钮**

Selenium Window给我们提供了一些常用的按钮，比如点击窗口下类似地球的按钮，会自动帮我们在脚本编辑窗口插入一些初始化代码：

![](https://s2.loli.net/2023/07/10/NEtBaOC4q2sei5n.png)

插入代码之前，我们需要在脚本窗口弹出的黄色提供框中，选择Yes允许插入代码：

![640 _73_.png](https://s2.loli.net/2023/07/10/XBMfk1jEbK5zIQY.png)

这样，脚本编辑窗就会自动插入如下代码：

```python
# 引入selenium的webdriver模块
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from airtest_selenium.proxy import WebChrome

#创建一个实例，代码运行到这里，会打开一个chrome浏览器
driver = WebChrome()
driver.implicitly_wait(20)

```

需要注意的是，如果是首次使用这个按钮，IDE会弹窗提示需要设置谷歌浏览器的路径：

![](https://s2.loli.net/2023/07/10/HzmDkeXwfu8BqZx.png)

这时我们就需要先到`选项--设置`中，找到Selenium那部分内容，然后把chrome的路径设置好，才能正常插入上述代码。

![](https://s2.loli.net/2023/07/10/It3TSb7lPrpvCfh.png)


### Selenium的常用方法


##### **打开指定网址**

我们以打开百度首页为例子：

```python
driver.get("https://www.baidu.com/")  

```

`driver.get()` 方法会在浏览器中打开一个指定的网址，给它传入网址地址即可。

##### **最大化窗口**

```python
driver.maximize_window()  

```

##### **关闭窗口/浏览器**

```python
# 关闭当前窗口，如果浏览器此时只有1个窗口，浏览器也会被关闭  
driver.close()  
  
# 退出驱动关闭所有窗口  
driver.quit()  

```

###   Airtest-Selenium简介

上文我们提到Airtest-Selenium是基于Selenium语法的，但是Airtest的开发者们还另外封装了如下方法：

##### **图像识别接口**

Airtest-Selenium对图像识别的封装有两个接口，图像识别点击和图像识别断言：

①点击Selenium Window下方的**airtest\_touch**按钮

![](https://s2.loli.net/2023/07/10/M4ECeRKbXfkBJD8.png)

在浏览器页面上截取你想要点击位置的图片，双击完成截图，脚本编辑窗口会自动生成1条图像识别点击的脚本

![640 _77_.png](https://s2.loli.net/2023/07/10/7WbPTF1KUQhxdnX.png)

```python
driver.airtest_touch(Template(r"tpl1582031994893.png", record_pos=(8.99, 5.23), resolution=(100, 100)))  

```

②点击Selenium Window下方的**assert\_template**按钮

![](https://s2.loli.net/2023/07/10/8xF2ujHRTbiNXSr.png)

在浏览器页面上截取你想要进行断言的图片，双击完成截图，脚本编辑窗口会自动生成1条图像识别断言脚本

![640 _79_.png](https://s2.loli.net/2023/07/10/RaHqWbrPgMxFvkl.png)

```python
driver.assert_template(Template(r"tpl1582032716811.png", record_pos=(0.51, 1.315), resolution=(100, 100)), "成功打开airlab官网")  

```

关于Selenium更多的断言实例，详看官方之前的推文“[测试同学都应该知道的断言知识...](http://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484318&idx=1&sn=4f7dcb1ad6bd0f057225db7cd0481466&chksm=f97ce39dce0b6a8bc59d180117259827291b6a9a8fbc06c3111ed4515702c883cce2aa2ec1bd&scene=21#wechat_redirect)” 。

值得注意的是，这两个接口是基于Airtest框架的图像识别封装，如果图像脚本运行时在网页中找不到对应图像，会抛出`Target not found on screen`的异常。

##### **多标签页录制**

selenium提供了切换标签页的接口。

```python
driver.switch_to.window(driver.window_handles[number])  

```

这个语句执行后，可以切换到第number个打开的标签页。但是对于用户来说，这个接口不是那么好理解与调用，因为这样需要记住标签打开的顺序。

而大部分时候，切换标签页的操作一般都出现在：打开新窗口、关闭标签页这两种情况下。因此，Airtset-Selenium封装了两个接口：

```python
driver.switch_to_new_tab()  
driver.switch_to_previous_tab()  

```

在这个接口内部，Airtest-Selenium维护了标签页的组织结构。用户只需在打开新标签页时，调用`switch_to_new_tab`。

另外在结束当前标签页时，回到上一个标签页时，调用`switch_to_previous_tab()`即可，不再需要去考虑当前是第几个这样之类的问题。

##### **生成报告**

被Airtest-Selenium封装的接口，运行过后都会生成对应的报告，在AirtestIDE中可以直接点击生成报告按钮，即可查看对应的报告内容。

![640.jpg](https://s2.loli.net/2023/07/10/RDspCg31kSX5Gru.jpg)


### 小结

我们以1个小的实战案例来总结今天讲述的内容：

```python
# -*- encoding=utf8 -*-  
__author__ = "19617"  
  
from airtest.core.api import *  
  
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from airtest_selenium.proxy import WebChrome  
driver = WebChrome()  
driver.implicitly_wait(20)  
  
driver.get("https://airlab-gl.163.com/b2b")  
  
driver.maximize_window()  
  
driver.assert_template(Template(r"tpl1582032716811.png", record_pos=(0.51, 1.315), resolution=(100, 100)), "成功打开airlab官网")  
  
driver.airtest_touch(Template(r"tpl1582034527805.png", record_pos=(8.975, 5.765), resolution=(100, 100)))  
  
  
driver.switch_to_new_tab()  
  
driver.switch_to_previous_tab()  
  
driver.quit()  

```

![640 _1_.jpg](https://s2.loli.net/2023/07/10/XduwEJKyDkg7rAa.jpg)

  
