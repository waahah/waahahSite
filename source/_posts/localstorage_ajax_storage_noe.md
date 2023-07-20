---
title: localStorage 跨域存储方案
date: 2023-02-18 14:58:36
tags: [JavaScript, localStorage, Ajax]
categories: [Coding, JavaScript]
---

**实际开发需求**： A域名网页 --> B域名网页传值  

​    解决方案： `window.postMessage` 和 `iframe`相结合的方法  

**window.postMessage(message, targetOrigin)**  

​    message: 将要发送到其他 window的数据，在传递参数时需要使用`JSON.stringify()`方法对参数序列化  
​    `targetOrigin`：指定哪些窗口能接收到消息事件，其值可以是字符串"\*"（表示无限制）或者一个`URI`。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配`targetOrigin`提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口； 例如，当用`postMessage`传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的`origin`属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的`targetOrigin`，而不是\*。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。



**具体示例：**  
1、A域名页面 http://www.AAAA.com/a\_Page.html 【设置A域名下 localStorage值,并向B域名发送数据】

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>cross domain</title>
</head>
<body>
    <div>A域名页面存储localStorage值</div>
    <script>
        let Aval = {
	    name: 'Apage',
            size: 100
        };
        localStorage.setItem('setVal',JSON.stringify(Aval));
        window.parent.postMessage(localStorage.getItem('setVal'), 'http://www.BBBB.com');
    </script>
    <script src="https://cdn.bootcss.com/eruda/1.3.1/eruda.js"></script>
    <script>eruda.init();</script>
</body>
</html>
```

2、B域名页面 http://www.BBBB.com/b\_Page.html 【获取A域名下 localStorage值】

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>cross domain</title>
     <script>
        window.addEventListener('message', function(e) {
           if (e.data) 
              document.getElementById('app').innerHTML = e.data;
        });
    </script>
</head>
<body>
    <div>获取A域名页面存储下来的localStorage值</div>
    <div id="app"></div>
    <iframe src="http://www.AAAA.com/a_Page"></iframe>
</body>
</html>
```

备注：  

1. 不同浏览器无法共享`localStorage`和`sessionStorage`中的信息。同一浏览器的相同域名和端口的不同页面间可以共享相同的 localStorage，但是不同页面间无法共享sessionStorage的信息。  
       这里需要注意的是，页面仅指顶级窗口，如果一个页面包含多个iframe且他们属于同源页面，那么他们之间是可以共享sessionStorage的  

2. 客户端`APP`内不同的`webview`不能共享localStorage和sessionStorage中的信息(eg：App和内置的`SDK`之间环境隔离)



