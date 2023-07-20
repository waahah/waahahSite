---
title: JavaScript中把函数作为另一函数的参数传递方法(总结)
date: 2023-05-31 14:58:36
tags: [JavaScript, Function]
categories: [Coding, JavaScript]
---

JS中把函数作为另一函数的参数传递方法(总结)
=======================

下面小编就为大家带来一篇JS中把函数作为另一函数的参数传递方法(总结)。小编觉得挺不错的，现在就分享给大家，也给大家做个参考。一起跟随小编过来看看吧

今天在给元素注册事件的时候，使用`addEventListener`遇到了一个问题，这个好像之前也遇到过，觉得有必要总结一下，就是js函数作为参数引发的问题。首先看以下代码，觉得下面代码有问题吗？是否能达到点击id3对应的元素后，弹出id3呢？  

**例1**

```js
var obj3=document.getElementById('id3'); 
obj3.addEventListener('click',curClick('id1'),true); 
function curClick(id){ 
    alert(id); 
} 
```

答案是否定，不能达到我想要的效果，因为这行代码在页面加载完成时候，就会弹出id3。当我单击id3对应的元素时候，页面没有任何反应。

于是我将代码改为如下两种情况：

**例2**

```js
var obj3=document.getElementById('id3'); 
  obj3.addEventListener('click',function(e){curClick('id3');stopPropagation(e)},true); 
 
  function curClick(id){ 
    alert(id); 
  } 


```

**例3**

```js
var obj1=document.getElementById('id1');  
obj1.addEventListener('click',curClick1,true); 
function curClick1(){ 
 alert('okey'); 
} 
```

**这次执行正常了，这是为什么呢？**

因为在JS世界里curClick('id3')就是直接调用curClick('id3')，而非将其作为一个参数来传递，如果要将其作为一个参数来传递，如果不需要传递参数，直接传递`函数名`就可，如果需要传递参数，有两种解决办法

**方法一：**借助匿名函数，将要传递的函数，放在匿名函数中，将匿名函数作为参数如例2

eg：将`function(){myfunction(val1,val2,......);}`作为参数传递。

**第二：**改写需要传递函数  

```js
function curClick1(val){ 
<span style="white-space:pre">  </span>return function(){ 
    alert(val); 
  }; 
} 
```

以上这篇JS中把函数作为另一函数的参数传递方法(总结)就是小编分享给大家的全部内容了，希望能给大家一个参考，也希望大家多多支持无名小站。

