---
title: Spider-Selenium
date: 2022-02-20 14:58:36
tags: [Python, Selenium, Spider]
categories: [Coding, Python]

---

# Selenium

## 1.Selenium

```
1.什么是selenium？
（ 1 ）Selenium是一个用于Web应用程序测试的工具。
（ 2 ）Selenium 测试直接运行在浏览器中，就像真正的用户在操作一样。
（ 3 ）支持通过各种driver（FirfoxDriver，IternetExplorerDriver，OperaDriver，ChromeDriver）驱动
真实浏览器完成测试。
（ 4 ）selenium也是支持无界面浏览器操作的。
```
```
2.为什么使用selenium？
模拟浏览器功能，自动执行网页中的js代码，实现动态加载
```
```
3.如何安装selenium？
（ 1 ）操作谷歌浏览器驱动下载地址
<http://chromedriver.storage.googleapis.com/index.html>
（ 2 ）谷歌驱动和谷歌浏览器版本之间的映射表
<http://blog.csdn.net/huilan_same/article/details/51896672>
（ 3 ）查看谷歌浏览器版本
谷歌浏览器右上角‐‐>帮助‐‐>关于
（ 4 ）pip install selenium
```
```python
4.selenium的使用步骤？
（ 1 ）导入：from selenium import webdriver
（ 2 ）创建谷歌浏览器操作对象：
path = 谷歌浏览器驱动文件路径
browser = webdriver.Chrome(path)
（ 3 ）访问网址
url = 要访问的网址
browser.get(url)
```
```python
4 ‐ 1 ：selenium的元素定位？
元素定位：自动化要做的就是模拟鼠标和键盘来操作来操作这些元素，点击、输入等等。操作这些元素前首先
要找到它们，WebDriver提供很多定位元素的方法
方法：
1.find_element_by_id
eg:button = browser.find_element_by_id('su')
2.find_elements_by_name
eg:name = browser.find_element_by_name('wd')
3.find_elements_by_xpath
eg:xpath1 = browser.find_elements_by_xpath('//input[@id="su"]')
4.find_elements_by_tag_name
eg:names = browser.find_elements_by_tag_name('input')
5.find_elements_by_css_selector
eg:my_input = browser.find_elements_by_css_selector('#kw')[ 0 ]
6.find_elements_by_link_text
eg:browser.find_element_by_link_text("新闻")
```

```
4‐2:访问元素信息
获取元素属性    
.get_attribute('class')        
获取元素文本    
.text        
获取标签名    
.tag_name 
```

```python
4‐3:交互
点击:click()    
输入:send_keys()    
后退操作:browser.back()    
前进操作:browser.forword()    
模拟JS滚动:    
js='document.documentElement.scrollTop=100000'        
browser.execute_script(js) 执行js代码        
获取网页代码：page_source     
退出：browser.quit()
```

## 2.Phantomjs
```
1.什么是Phantomjs？
（1）是一个无界面的浏览器    
（2）支持页面元素查找，js的执行等    
（3）由于不进行css和gui渲染，运行效率要比真实的浏览器要快很多
```

```python
2.如何使用Phantomjs？
（1）获取PhantomJS.exe文件路径path    
（2）browser = webdriver.PhantomJS(path)    
（3）browser.get(url)    
 扩展：保存屏幕快照:browser.save_screenshot('baidu.png')
```

## 3.Chrome handless

### Chrome-headless 模式， Google 针对 Chrome 浏览器 59 版 新增加的一种模式，可以让你不打开UI界面的情况下

### 使用 Chrome 浏览器，所以运行效果与 Chrome 保持完美一致。

```
1.系统要求：
Chrome
Unix\Linux 系统需要 chrome >=  59 
Windows 系统需要 chrome >=  60
Python3.
Selenium==3.4.*
ChromeDriver==2.
```

```python
2.配置：
from selenium import webdriver    
from selenium.webdriver.chrome.options import Options   
    chrome_options = Options()
    chrome_options.add_argument('‐‐headless')
    chrome_options.add_argument('‐‐disable‐gpu')
    path = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
    chrome_options.binary_location = path
browser = webdriver.Chrome(chrome_options=chrome_options)    
browser.get('http://www.baidu.com/') 
```

```python
3.配置封装：
          from selenium import webdriver
          #这个是浏览器自带的  不需要我们再做额外的操作
          from selenium.webdriver.chrome.options import Options
          def share_browser():
              #初始化
              chrome_options = Options()
              chrome_options.add_argument('‐‐headless')
              chrome_options.add_argument('‐‐disable‐gpu')
              #浏览器的安装路径    打开文件位置
              #这个路径是你谷歌浏览器的路径
              path = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
              chrome_options.binary_location = path
              browser = webdriver.Chrome(chrome_options=chrome_options)
              return  browser
  封装调用：
          from handless import share_browser
          browser = share_browser()
          browser.get('http://www.baidu.com/')
          browser.save_screenshot('handless1.png')
```

#### 4 ‐ 2 :访问元素信息

#### 获取元素属性

```
.get_attribute('class')
获取元素文本
.text
获取标签名
.tag_name
```
#### 4 ‐ 3 :交互

```python
点击:click()
输入:send_keys()
后退操作:browser.back()
前进操作:browser.forword()
模拟JS滚动:
js='document.documentElement.scrollTop=100000'
browser.execute_script(js) 执行js代码
获取网页代码：page_source
退出：browser.quit()
```
```
1.什么是Phantomjs？
（ 1 ）是一个无界面的浏览器
（ 2 ）支持页面元素查找，js的执行等
（ 3 ）由于不进行css和gui渲染，运行效率要比真实的浏览器要快很多
```
```python
2.如何使用Phantomjs？
（ 1 ）获取PhantomJS.exe文件路径path
（ 2 ）browser = webdriver.PhantomJS(path)
（ 3 ）browser.get(url)
扩展：保存屏幕快照:browser.save_screenshot('baidu.png')
```
实战：京东

