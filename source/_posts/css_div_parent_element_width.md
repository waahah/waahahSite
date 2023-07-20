---
title: Div继承父元素宽度
date: 2023-05-12 14:58:36
tags: [DIV, CSS, Html]
categories: [Coding, CSS]
---

### 前言 

CSS3 div继承父元素宽度

### 父子元素的宽度

1.正常情况

```html
<style>
    .parent{
      width: 200px;
      height: 300px;
      background-color: aquamarine;
    }
    .child{
      width: 100%;
      background-color: red;
    }
</style>
 
<div class="parent">
    <div class="child">
      hello world
    </div>
</div>

```

![](https://s2.loli.net/2023/07/12/5whgi7EcyvVS4ZR.png)

此时,子元素宽度等于父元素宽度,正是我们要的效果。

2.有定位的情况

```html
<style>
    .parent{
      width: 200px;
      height: 300px;
      background-color: aquamarine;
      position:relative;
    }
    .child{
      width: 100%;
      background-color: red;
      position:absolute;
    }
</style>
 
<div class="parent">
    <div class="child">
      hello world
    </div>
</div>

```

此时，子元素宽度也是正常的，等于父元素宽度。

3.父元素无定位，子元素是绝对定位

```html
<style>
    .parent{
      width: 200px;
      height: 300px;
      background-color: aquamarine;
    }
    .child{
      width: 100%;
      background-color: red;
      position:absolute;
    }
</style>
 
<div class="parent">
    <div class="child">
      hello world
    </div>
</div>

```

此时，子元素的宽度发生了变化，宽度等于`body`的宽度了。这是因为子元素设置了绝对定位，它脱离了父元素文档流，所以宽度直接和`body`一样了。  
![](https://s2.loli.net/2023/07/12/s6Z7zItWYicNLgp.png)

解决方法：

1.给父元素加上相对定位；

2.将子元素的`width:100%;`改成`width:inherit;`，表示继承父元素的宽度。注意：`IE8`不支持`inherit`属性

```html
<style>
    .parent{
      width: 200px;
      height: 300px;
      background-color: aquamarine;
    }
    .child{
      width: inherit;
      background-color: red;
      position:absolute;
    }
</style>
 
<div class="parent">
    <div class="child">
      hello world
    </div>
</div>

```
