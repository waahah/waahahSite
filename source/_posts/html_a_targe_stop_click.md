---
title: html a标签禁止点击，纯CSS实现
date: 2023-05-23 14:58:36
tags: [CSS, Html, Element]
categories: [Coding, CSS]
---

### 前言

html a标签怎么禁止点击

html a禁止点击的方法：首先创建一个HTML示例文件；然后输入一个a标签；最后给a标签添加属性为“pointer-events:none;”即可实现禁止点击。

本文操作环境：Windows7系统、HTML5&&CSS3版，DELL G3电脑

HTML a标签禁止点击：

在a标签的样式加上以下属性

```html
<a style="pointer-events: none;"/>
```

pointer-events 介绍：

pointer-events 属性定义元素是否对指针事件做出反应。

### 语法
```css
pointer-events: auto|none;
```
### 属性值

1. auto 默认值。元素对指针事件做出反应，比如 :hover 和 click。

2. none 元素不对指针事件做出反应。

3. initial 将此属性设置为其默认值。参阅 initial。

4. inherit 从其父元素继承此属性。参阅 inherit。

推荐学习：《HTML视频教程》

以上就是html a怎么禁止点击的详细内容！