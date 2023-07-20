---
title: 测试二十七、Selenium常用API介绍
date: 2023-02-16 14:58:36
tags: [Python, Airtest, Poco, Test, Selenium]
categories: [Coding, 测试]
---

**前言**

在之前，我们简单地讲述了如何在`AirtestIDE`上使用`Airtest-Selenium`。而今天的推文，我们将讲述更多用`Selenium`进行自动化测试更深层次的内容。

**PS：完整的实操代码都会在下文中展示。**


**调试工具实战**

在UI自动化测试中，最重要的就是对页面元素进行定位。我们可以利用调试工具来查看元素的属性，从而更好地实现元素定位。

以chrome浏览器为例，在打开的浏览器空白处点击鼠标右键，然后选择快捷菜单中的“检查”选项。浏览器就会弹出如下的调试信息窗口：

![](https://s2.loli.net/2023/07/10/XRzp9w5vaYoHZC4.jpg)

接下来我们只要点击调试信息窗口左上角带有箭头的图标按钮，然后再将鼠标移动到需要进行定位的元素上，窗口中就会显示出该元素的属性：

![](https://s2.loli.net/2023/07/10/Q56ZytMHeEkKdFz.png)

在上图可以看出，“百度一下”按钮的ID为"su"，CLASS\_NAME为 "bg s\_btn"。

比较特别的是，如果我们想知道元素的XPATH或者CSS\_SELECTOR这些属性值时，我们可能不能直接在元素代码查看。

这时我们可以在定位到属性的代码位置，点击鼠标右键，然后在快捷菜单中选择“Copy”选项，之后再选择“Copy XPath”或者“Copy seletor”即可得到元素的XPATH或者CSS\_SELECTOR属性。

![](https://s2.loli.net/2023/07/10/sqr9S7eQDLHfVvX.jpg)


**Selenium元素定位**

##### **元素属性**

首先我们需要明白，在Selenium自动化测试中，**元素定位都是根据元素属性来进行的**。

元素属性有：`ID、NAME、CLASS_NAME、TAG_NAME、CSS_SELECTOR、XPATH、LINK_TEXT、PARTIAL_LINK_TEXT`等。

##### **元素定位**

Selenium给我们提供了很多根据元素属性来定位元素的方法：

```python
find_element_by_id()
find_element_by_name()
find_element_by_class_name()
find_element_by_xpath()
find_element_by_link_text()
find_element_by_partial_link_text()
find_element_by_css_selector()
```

以上方法需要填写的参数均是元素对应的属性值。

我们来实操1个小例子，要求启动chrome浏览器后，最大化浏览器，之后再打开百度首页，定位到首页的搜索框，输入搜索关键词“Airtest”。

利用调试工具，我们可以得到百度首页搜索框这个元素的属性：

![](https://s2.loli.net/2023/07/10/yZszf5oTD7GMqXA.png)

```python
# -*- encoding=utf8 -*-
__author__ = "19617"

from airtest.core.api import *

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from airtest_selenium.proxy import WebChrome

driver = WebChrome()
driver.maximize_window()
driver.implicitly_wait(20)

driver.get("https://www.baidu.com/")

driver.find_element_by_id('kw').send_keys('Airtest')
```

上述代码根据搜索框的ID属性来定位，之后再发送搜索的关键词“Airtest”，最终的页面结果如下：

![640 _82_.png](https://s2.loli.net/2023/07/10/RLlyXEfMzC3VH6t.png)

**Selenium与页面的交互**

##### **对浏览器的操作**

常见的对浏览器的操作有获取页面代码、获取页面title、页面前进后退和刷新关闭等等。

这些操作都可以由**WebDriver**的属性来支持。

```python
from selenium import webdriver

driver = WebChrome()

# 获取当前页面代码
driver.page_source

# 获取页面title
driver.title

# 获取浏览器名称
driver.name

# 获取当前窗口句柄
driver.current_window_handle

# 获取所有窗口句柄
driver.window_handles

# 页面前进
driver.forward()

# 页面后退
driver.back()

# 刷新页面
driver.refresh()
```

##### **对元素的操作**

**WebElement**类提供了很多方法来对元素进行操作，例如清空、检查是否可编辑、是否被选中等。

我们还是以百度搜索框为例，定位搜索框，输入关键词“Airtest”,清空输入的关键词，检查搜索框是否可见、可编辑，以及搜索框是否被选中。

```python
from airtest.core.api import *

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from airtest_selenium.proxy import WebChrome

driver = WebChrome()
driver.maximize_window()
driver.implicitly_wait(20)

driver.get("https://www.baidu.com/")
# 定位百度首页的搜索框
ss = driver.find_element_by_id('kw')
# 输入关键词
ss.send_keys('Airtest')
driver.implicitly_wait(20)
# 清空关键词
ss.clear()
# 检查是否可见、可编辑、是否被选中
print(ss.is_displayed())
print(ss.is_enabled())
print(ss.is_selected())
```

![](https://s2.loli.net/2023/07/10/QZwl3jzI7mvCHLK.png)

##### **下拉框定位**

在Web应用的自动化测试中，我们经常会遇到需要处理下拉框的情况。

下拉框选项定位需要用到**Select类**，定位的基本步骤为：  
①定位到下拉框这个元素  
②实例化Select类  
③调用Select类里面的方法来实现下拉框选项定位

Select类用来定位选项的方法有：

```python
# 利用索引进行定位（注意索引是从0开始的）
select_by_index('索引值')

# 利用选项的value进行定位
select_by_value('value值')

# 利用选项的文本进行定位
select_by_visible_text('文本值')
```

下面我们来看1个实操的小例子，我们选取了百度设置中1个输入法设置的下拉框来进行实操，用调试工具查看到这个下拉框的详情如下：

![](https://s2.loli.net/2023/07/10/t5iVkXnuTvO9olA.png)

```python
from airtest.core.api import *
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from airtest_selenium.proxy import WebChrome
# Select类需要引入
from selenium.webdriver.support.select import Select

driver = WebChrome()
driver.maximize_window()
driver.implicitly_wait(20)
driver.get("https://www.baidu.com/gaoji/preferences.html")
# 定位下拉框元素
ime_select = driver.find_element_by_id('ime')
# 实例下拉框
select = Select(ime_select)

select.select_by_index(0)
print('1.此时下拉框选中选项的值为：',ime_select.get_attribute('value'))

select.select_by_value('2')
print('2.此时下拉框选中选项的值为：',ime_select.get_attribute('value'))

select.select_by_visible_text('关闭')
print('3.此时下拉框选中选项的值为：',ime_select.get_attribute('value'))
```

![](https://s2.loli.net/2023/07/10/EDjgG7P5nCmwYps.png)

##### **弹出框定位**

在Selenium中，**Alert类**专门用来处理各种弹出框。在使用时，这个类同样需要引入。

我们依旧以上述页面作为例子，点击“恢复默认”的按钮，会弹出一个警告框。

![640 _86_.png](https://s2.loli.net/2023/07/10/EzwFOlx9Rua1kXi.png)

下面的实例可以实现点击“恢复默认”按钮，打印按钮的文本信息，再点击弹窗的确认按钮。

```python
from airtest.core.api import *

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from airtest_selenium.proxy import WebChrome
# 引入Alert类
from selenium.webdriver.common.alert import Alert
import time as t

driver = WebChrome()
driver.maximize_window()
driver.implicitly_wait(20)

driver.get("https://www.baidu.com/gaoji/preferences.html")
# 用xpath属性来定位按钮
driver.find_element_by_xpath('//*[@id="restore"]').click()

t.sleep(5)
print('alert弹出框的文本信息为：',driver.switch_to_alert().text)
# 点击弹框的确认按钮
driver.switch_to_alert().accept()
```

![640 _87_.png](https://s2.loli.net/2023/07/10/zyrCvFh4HglV8we.png)


**小结**

关于Selenium的操作就本期就先讲到这里了，上述所有实操都是在AirtestIDE中实现的。
