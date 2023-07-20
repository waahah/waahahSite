---
title: CSS3关键字unset
date: 2022-03-30 14:58:36
tags: [CSS3, Web]
categories: [Coding, CSS]
---

### 前言

今天遇到了一个css属性

```css
display：unset
```

以为是新增的`display`的属性值，查了好久，发现并没有这个属性值，

后来发现了`unset`是`css`的关键字，将一个属性的属性值设置为unset，目的是将一个属性重新重新设置为其从父母那继承的属性值，如果没有继承则是重置成初始值。

它可以应用到所有的css属性上，包括css简写。

注意：亲自测试IE10不兼容

例如：color

```css
.foo {
  color: blue;
}
.bar {
  color: green;
}

p {
  color: red;
}
.bar p {
  color: unset;
}
```

```html
<p\>This text is red.</p\>
<div class\="foo"\>
  <p\>This text is also red.</p\>
</div\>
<div class\="bar"\>
  <p\>This text is green (default inherited value).</p\>
</div\>
```

结果：

![931692-20170907174721819-67819955.png](https://s2.loli.net/2023/07/08/wnAtrx4oRTLN6sF.png)

最后的this text is green就是重置成了继承自父元素的color属性值green。
