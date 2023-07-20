---
title: Urllib请求404问题处理
date: 2022-12-06 14:58:36
tags: [Python, Urllib, 404]
categories: [Coding, Python]
---

### 前言
urllib请求404问题处理，Python处理默认输出内容乱码的问题

### Jenkins哈希密码：123456

```
<passwordHash>#jbcrypt:$2a$10$ltzg1Kwtef0ymmNAqR8JR.961lHdnrsoFsE.huZ.G4r1AiIaENRC6</passwordHash>
```

### 禅道选择指派、bug类型、系统、浏览器、操送、主干自动化python脚本：

```python
from selenium import webdriver
from time import sleep


def input_text(assign, bugType, system, browser, oad, openedBuild="主干", time_out=0.3):
    elementList = {
        'assignedTo_chosen': assign,
        'type_chosen': bugType,
        'os_chosen': system,
        'browser_chosen': browser
    }    # 需要点击的元素列表

    sleep(time_out)
    # 点击影响版本下拉框
    driver.find_element('css selector', '[id="openedBuild_chosen"] input').send_keys(openedBuild, '\ue007')

    for key, value in elementList.items():
        sleep(time_out)
        driver.find_element('css selector', '[id="'+key+'"]>a>span').click()  # 点击展开相应模块下拉框
        driver.find_element('css selector', '[id="'+key+'"] input').send_keys(value, '\ue007')

    sleep(time_out)
    driver.find_element('css selector', '[id="contactListGroup"]').click()  # 点击展开抄送人员下拉框

    for value in oad:       # 循环输入操送人员
        sleep(time_out)
        driver.find_element('css selector', '[id="contactListGroup"] input').send_keys(value, '\ue007')

# 使用实例       
driver = webdriver.Chrome()
driver.get('http://www.gzqylc.com:9999/zentao/my/')			# 登录禅道并打开bug创建页面
input_text('张三', '代码错误', 'windows', 'chrome', "['张三', '王五', '李四']")  
```

### rullib中使用request.Request()请求404的问题处理

原因：没有配置accept，导致服务器无法识别，加上User-Agent和Accept头部信息即可，如果还有该问题，再加上其他请求头或者检查地址是否错误

```python
HEADER = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

urllib.request.Request(url='http://10.8.1.190:9001/', headers=HEADER)
```

### Python处理默认输出内容乱码的问题

```python
import sys,io,importlib
# 可处理在Jenkins中输出中文时，中文乱码的问题
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')         
sys.getdefaultencoding()        # 获取当前编码方式
importlib.reload(sys)    # 重载sys模块，试设置生效
```

###  Jenkins插件国内下载地址

[https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json)

![](https://s2.loli.net/2023/07/10/pW2KeFAQLPE7kHI.jpg)

 存在什么不足的地方，欢迎随时联系我，回的慢不要打我，谢谢咯
