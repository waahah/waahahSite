---
title: textarea文本域如何实现高度自适应
date: 2023-06-02 14:58:36
tags: [Html, CSS, textarea]
categories: [Coding, CSS]
---

### 前言

今天需要些一个回复评论的页面，设计师给的初始界面就是一个只有一行的框。然后当时就想这个交互该怎么实现比较好，然后想起了新浪微博的做法：点击评论，默认显示一行，当输入的文字超过一行或者输入Enter时，输入框的高度会随着改变，直到输入完毕。顿时觉得这个细节做得挺不错的，可以效仿下。下面分享2种实现textarea高度自适应的做法，一种是用div来模拟textarea来实现的，用CSS控制样式，不用JS；另一种是利用JS控制的（因为存在浏览器兼容问题，所以写起来比较麻烦）；

方法0:textarea高度自适应，随着内容增加高度增加
----------------------------

```
$(function(){
        $.fn.autoHeight \= function(){    
        function autoHeight(elem){
            elem.style.height \= 'auto';
            elem.scrollTop \= 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
        }
        this.each(function(){
            autoHeight(this);
            $(this).on('keyup', function(){
                autoHeight(this);
            });
        });     
    }                
    $('textarea\[autoHeight\]').autoHeight();    
})
```

页面中的textarea直接加属性就行
```html
<textarea  autoHeight="true" readonly="readonly" > </textarea>
```
pc   移动端都经过测试，没问题 放心用吧！出自：<https://www.cnblogs.com/purple04551/p/8075366.html>

方法一：div模拟textarea文本域轻松实现高度自适应
-----------------------------------------------------------------------------

demo演示地址：[http://www.xuanfengge.com/demo/201308/textarea/demo1.html](http://www.xuanfengge.com/demo/201308/textarea/demo1.html)

因为textarea不支持自适应高度，就是定好高度或者是行数之后，超出部分就会显示滚动条，看起来不美观。

而用DIV来模拟时，首先遇到的问题是：div怎么实现输入功能？

可能我们还是第一次见到这个属性contenteditable，如一个普通的block元素上加个`contenteditable="true"`就实现编辑，出现光标了。如

```html
<div contenteditable="true"></div>
```

contenteditable属性虽是[HTML5](http://lib.csdn.net/base/html5 "HTML5知识库")里面的内容，但是IE似乎老早就支持此标签属性了。所以，兼容性方面还是不用太担心的。

CSS代码

```css
.textarea{
    width: 400px;
    min-height: 20px;
    max-height: 300px;
    _height: 120px;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    outline: 0;
    border: 1px solid #a0b3d6;
    font-size: 12px;
    line-height: 24px;
    padding: 2px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
 
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}
```

 HTML代码

 ```html
 <div class="textarea" contenteditable="true"><br /></div>
 ```
CSS代码中，因为IE6不支持min/max，所以做了hack，其他的也好理解。

方法二：文本框textarea根据输入内容自适应高度
-----------------------------------------------------------------------------
demo演示地址:http://www.xuanfengge.com/demo/201308/textarea/demo2.html

这个写法是用原生JS写的，考虑了很多兼容性问题，完全和新浪微博的回复效果一样的功能。有兴趣的童鞋可以仔细分析下代码。

CSS代码

```css
#textarea {
    display: block;
    margin:0 auto;
    overflow: hidden;
    width: 550px;
    font-size: 14px;
    height: 18px;
    line-height: 24px;
    padding:2px;
}
textarea {
    outline: 0 none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}
```

[JavaScript](http://lib.csdn.net/base/javascript)代码

```js
/**
* 文本框根据输入内容自适应高度
* @param                {HTMLElement}        输入框元素
* @param                {Number}                设置光标与输入框保持的距离(默认0)
* @param                {Number}                设置最大高度(可选)
*/
var autoTextarea = function (elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                        elem.addEventListener ?
                                elem.addEventListener(type, callback, false) :
                                elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                        var val = elem.currentStyle[name];
 
                        if (name === 'height' && val.search(/px/i) !== 1) {
                                var rect = elem.getBoundingClientRect();
                                return rect.bottom - rect.top -
                                        parseFloat(getStyle('paddingTop')) -
                                        parseFloat(getStyle('paddingBottom')) + 'px';        
                        };
 
                        return val;
                } : function (name) {
                                return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
 
        elem.style.resize = 'none';
 
        var change = function () {
                var scrollTop, height,
                        padding = 0,
                        style = elem.style;
 
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
 
                if (!isFirefox && !isOpera) {
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
 
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                        if (maxHeight && elem.scrollHeight > maxHeight) {
                                height = maxHeight - padding;
                                style.overflowY = 'auto';
                        } else {
                                height = elem.scrollHeight - padding;
                                style.overflowY = 'hidden';
                        };
                        style.height = height + extra + 'px';
                        scrollTop += parseInt(style.height) - elem.currHeight;
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        elem.currHeight = parseInt(style.height);
                };
        };
 
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
};
```

HTML代码（写在body里面的）

```html
<textarea id="textarea" placeholder="回复内容"></textarea>
    <script>
        var text = document.getElementById("textarea");
        autoTextarea(text);// 调用
    </script>
```

其他方法
----

- [A different approach to elastic textareas](http://leaverou.me/2009/11/a-different-approach-to-elastic-textareas/)
- [Build an Elastic Textarea with Ext JS](http://sixrevisions.com/javascript/build-an-elastic-textarea-with-ext-js/)
- [Smart TextArea: scrollHeight in IE, Firefox, Opera and Safari](http://yottaworks.net/smart-textarea-scrollheight-ie-firefox-opera-safari/)