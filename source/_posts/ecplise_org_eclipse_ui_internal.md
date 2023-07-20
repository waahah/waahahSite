---
title: org.eclipse.ui.internal.viewintroadapterpart不能转换为类org.eclipse.ui解决方法
date: 2022-09-16 14:58:36
tags: [Java, Eclipse]
categories: [IDE, Eclipse]
---

### 前言

安装`Spring`框架，不知怎么的就把Eclipse搞坏了 ，重装后也没解决问题，  
一打开就报下面这个:  
![](https://s2.loli.net/2023/07/09/3vr57Ubpy6usHCN.png)

```java
org.eclipse.ui.internal.viewintroadapterpart不能转换为类org.eclipse.ui
```

解决方法：  
eclipse  
帮助  
关于  
安装细节  
选中` Babel Language Pack for rt.rap in Chinese (Simplified) `
卸载  
完成  
重启eclipse

总之装语言包时不要安装`rt.rap`这个包（除非你使用rap插件），与这个问题类似的很多汉化出错问题

已经解决，没有图片抱歉，因为是新手不懂这是什么异常，无法详细解释，希望这个能帮到你。
