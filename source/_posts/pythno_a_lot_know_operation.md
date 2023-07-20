---
title: 介绍Python一些鲜为人知的实用操作
date: 2023-04-22 14:58:36
tags: [ Pyshorteners, WiFi, GIF, FPDF, Qrcode, Translate, Win10toast]
categories: [Coding, Python]
---

### 前言

介绍Python一些鲜为人知的实用操作。

Python应该是投入回报比比较高的一种编程语言。

学习成本低，适用场景广。

即便你不从事编程开发工作，它同样能够给你工作带来极大的便利。

今天，给大家介绍Python一些鲜为人知的操作。

这些操作，并非是炫技，而是真的实用！

**1\. 显示WiFi密码**
----------------

我们经常忘记wifi的密码，可是每当家里来了亲戚朋友问起WiFi密码，却又无从下手。

这里有一个技巧，我们可以列出所有的设备和它们的密码。

```python
import subprocess #import required library
data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8').split('\n') #store profiles data in "data" variable
profiles = [i.split(":")[1][1:-1] for i in data if "All User Profile" in i] #store the profile by converting them to list
for i in profiles:
    # running the command to check passwords
    results = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', i, 'key=clear']).decode('utf-8').split('\n')
    # storing passwords after converting them to list
    results = [b.split(":")[1][1:-1] for b in results if "Key Content" in b]
​
    try:
        print ("{:<30}|  {:<}".format(i, results[0]))
    except IndexError:
        print ("{:<30}|  {:<}".format(i, ""))
```

**2\. 视频转GIF**
--------------

近年来，GIF出现了热潮。大多数流行的社交媒体平台，都为用户提供了各种GIF，以更有意义和更容易理解的方式表达他们的想法。

很多同学为了将视频转成GIF可谓是煞费苦心，而且在这个过程中踩了不少坑。

而使用Python，简短的几行代码即可解决！

**安装**

```bash
pip install moviepy
```

**代码**

```python
from moviepy.editor import VideoFileClip
clip = VideoFileClip("video_file.mp4") # Enter your video's path
clip.write_gif("gif_file.gif", fps = 10)
```

**3\. 桌面提醒**
------------

当我们在做项目或其他事情的时候，我们可能会忘记某些重要的事情，我们可以通过在系统上看到一个简单的通知来记住这些。

在python的帮助下，我们可以创建个性化的通知，并可以将其安排在特定的时间。

**安装**

```bash
pip install win10toast, schedule
```

**代码**

```python
import win10toast
toaster = win10toast.ToastNotifier()
import schedule
import time
def job():
    toaster.show_toast('提醒', "到吃饭时间了!", duration = 15)
​
schedule.every().hour.do(job)  #scheduling for every hour; you can even change the scheduled time with schedule library
while True:
    schedule.run_pending()
    time.sleep(1)
```

**4\. 自定义快捷键**
--------------

有时，我们在工作中需要频繁地输入一些单词。如果我们能使我们的键盘自动化，只用缩写就能写出这些经常使用的单词，这不是很有趣吗？

没错，我们可以用Python使之成为可能。

**安装**

```bash
pip install keyboard
```

**代码**

```python
import keyboard
#press sb and space immediately(otherwise the trick wont work)
keyboard.add_abbreviation('ex', '我是一条测试数据!') #provide abbreviation and the original word here
# Block forever, like `while True`.
keyboard.wait()
```

然后，在任何位置输入`ex`加`空格`就可以快速补全对应的语句！

**5\. 文本转PDF**
--------------

我们都知道，部分笔记和在线可用的书籍都是以pdf的形式存在。

这是因为pdf可以以同样的方式存储内容，而不用考虑平台或设备。

因此，如果我们有文本文件，我们可以在python库fpdf的帮助下将它们转换成PDF文件。

```python
pip install fpdf
from fpdf import FPDF 
pdf = FPDF()      
pdf.add_page()  # Add a page 
pdf.set_font("Arial", size = 15) # set style and size of font  
f = open("game_notes.txt", "r")  # open the text file in read mode 
# insert the texts in pdf 
for x in f: 
    pdf.cell(50,5, txt = x, ln = 1, align = 'C') 
#pdf.output("path where you want to store pdf file\\file_name.pdf")
pdf.output("game_notes.pdf")
```

**6\. 生成二维码**
-------------

我们在日常生活中经常看到二维码，QR码节省了很多用户的时间。

我们也可以用python库qrcode为网站或个人资料创建独特的QR码。

**安装**

```bash
pip install qrcode
```

**代码**

```python
#import the library
import qrcode
#link to the website
input_data = "https://car-price-prediction-project.herokuapp.com/"
#Creating object
#version: defines size of image from integer(1 to 40), box_size = size of each box in pixels, border = thickness of the border.
qr = qrcode.QRCode(version=1,box_size=10,border=5)
#add_date :  pass the input text
qr.add_data(input_data)
#converting into image
qr.make(fit=True)
#specify the foreground and background color for the img 
img = qr.make_image(fill='black', back_color='white')
#store the image
img.save('qrcode_img.png')
```

**7\. 翻译**
----------

我们生活在一个多语言的世界里。

因此，为了理解不同的语言，我们需要一个语言翻译器。

我们可以在python库Translator的帮助下创建我们自己的语言翻译器。

**安装**

```bash
pip install translate
```

**代码**

```python
#import the library 
from translate import Translator
#specifying the language 
translator = Translator(to_lang="Hindi")
#typing the message
translation = translator.translate('Hello!!! Welcome to my class')
#print the translated message
print(translation)
```

**8\. Google搜索**
----------------

有时候编程太忙碌，以至于我们觉得懒得打开浏览器来搜索我们想要的答案。

但是有了google这个神奇的python库，我们只需要写3行代码就可以搜索我们的查询，而不需要手动打开浏览器并在上面搜索我们的查询。

**安装**

```shell
pip install google
```

**代码**

```python
#import library 
from googlesearch import search
#write your query
query = "best course for python"
# displaying 10 results from the search
for i in search(query, tld="co.in", num=10, stop=10, pause=2):
    print(i)
#you will notice the 10 search results(website links) in the output.
```

**9\. 提取音频**
------------

在某些情况下，我们有mp4文件，但我们只需要其中的音频，比如用另一个视频的音频制作一个视频。

我们为获得相同的音频文件做了足够的努力，但我们失败了。

这个问题用python库moviepy可以轻而易举的解决。

**安装**

```
pip install moviepy
```

**代码**

```python
#import library 
import moviepy.editor as mp 
#specify the mp4 file here(mention the file path if it is in different directory)
clip = mp.VideoFileClip('video.mp4')
#specify the name for mp3 extracted
clip.audio.write_audiofile('Audio.mp3')
#you will notice mp3 file will be created at the specified location.
```

**10\. 生成短链接**
--------------

经常和各种各样的链接打交道，过长的URL让思绪混乱不堪！

于是，就有了各种各样的短链接生成工具。

不过，大多数使用都比较麻烦。

我们可以在python库pyshorteners的帮助下创建我们自己的短链接生成器。

**安装**

```
pip install pyshorteners
```

**代码**

```python
#import library 
import pyshorteners
#creating object
s=pyshorteners.Shortener()
#type the url
url = "type the youtube link here"
#print the shortend url
print(s.tinyurl.short(url))
```

读到这里，会发现，Python除了完成工作中涉及到的机器学习、数据分析等项目开发，还可以完成很多非常 有趣，且能够极大提高工作效率的操作。

本文就是抛砖引玉一下，希望大家能够寻找到更多有趣的Python玩法！