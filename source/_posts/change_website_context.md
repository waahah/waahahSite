---
title: 随意改动网站内容，设计网站
date: 2022-10-02 14:58:36
tags: [JavaScript, TamperMonkey]
categories: [Coding, JavaScript]
---

### 前言

`document.designMode='on'` 设计网页；随意改动网站内容

1. 打开一个需要更改的网站，按F12进入网页控制台界面,点击Console  
![20210204191419857.png](https://s2.loli.net/2023/07/09/BPXSplo1cFxJ7W5.png)

2. 在Console下的输入框输入：

```js
document.designMode='on'
```
再按回车键  
![](https://s2.loli.net/2023/07/09/zMNdiq2u3owr1KD.png)

3. 然后就可以随意修改页面了，可以像word种的文本一样，在浏览器里实现增删改查。  
![](https://s2.loli.net/2023/07/09/xu6FV7rZpPeABSX.png)