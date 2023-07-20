---
title: 解决Ajax跨域问题
date: 2023-06-08 14:58:36
tags: [JavaScript, Ajax, JSON, JSONP]
categories: [Coding, JavaScript]
---

如何解决ajax跨域问题
===============

由 于此前很少写跨域的代码，最近项目中用到json作为系统间交互的手段，自然就伴随着众多ajax请求，随之而来的就是要解决 ajax的跨域问题。本篇将讲述一个小白从遇到跨域不知道是跨域问题，到知道是跨域问题不知道如何解决，再到解决跨域问题，最后找到两种方法解决ajax 跨域问题的全过程。

**不知是跨域问题**

起 因是这样的，为了复用，减少重复开发，单独开发了一个用户权限管理系统，共其他系统获取认证与授权信息，暂且称之为A系统；调用A系统以B为例。在B系统 中用ajax调用A系统系统的接口(数据格式为json)，当时特别困惑，在A系统中访问相应的url可正常回返json数据，但是在B系统中使用 ajax请求同样的url则一点儿反应都没有，好像什么都没有发生一样。这样反反复复改来改去好久都没能解决，于是求救同事，提醒可能是ajax跨域问 题，于是就将这个问题当做跨域问题来解决了。

**知跨域而不知如何解决**

知道问题的确切原因，剩下的就是找到解决问题的方法了。google了好久，再次在同事的指点下知道jQuery的ajax有jsonp这样的属性可以用来解决跨域的问题。

**找到一种解决方式**

现在也知道了怎样来解决跨域问题，余下的就是实现的细节了。实现的过程中错误还是避免不了的。由于不了解json和[jsonp](http://zh.wikipedia.org/wiki/JSONP)两种格式的区别，也犯了错误，google了好久才解决。

首先来看看在页面中如何使用jQuery的ajax解决跨域问题的简单版：

```js
$(document).ready(function(){  
  
   var url='http://localhost:8080/WorkGroupManagment/open/getGroupById"  
  
       +"?id=1&callback=?';  
  
  $.ajax({  
  
    url:url,  
  
     dataType:'jsonp',  
  
    processData: false,  
  
    type:'get',  
  
    success:function(data){  
  
      alert(data.name);  
  
     },  
  
    error:function(XMLHttpRequest, textStatus, errorThrown) {  
  
      alert(XMLHttpRequest.status);  
  
      alert(XMLHttpRequest.readyState);  
  
      alert(textStatus);  
  
    }});  
  
   });
```

  

  

这样写是完全没有问题的，起先error的处理函数中仅仅是alert(“error”)，为了进一步弄清楚是什么原因造成了错误，故将处理函数变为上面的实现方式。最后一行alert使用为；parsererror。百思不得其解，继续google，最终还是在万能的stackoverflow找 到了答案，链接在​[​这里​](http://stackoverflow.com/questions/4683114/sending-jsonp-vs-json-data)​。原因是jsonp的格式与json格式有着细微的差别，所以在server端的代码上稍稍有所不同。

比较一下json与jsonp格式的区别：

**json格式：**
```json
{

    "message":"获取成功",

    "state":"1",

    "result":{"name":"工作组1","id":1,"description":"11"}

}
```
**jsonp格式：**
```js
callback({

    "message":"获取成功",

    "state":"1",

    "result":{"name":"工作组1","id":1,"description":"11"}

})
```
看出来区别了吧，在url中callback传到后台的参数是神马callback就是神马，jsonp比json外面有多了一层，callback()。这样就知道怎么处理它了。于是修改后台代码。

后台java代码最终如下：

```java
@RequestMapping(value = "/getGroupById")  
  
  public String getGroupById(@RequestParam("id") Long id,  
  
     HttpServletRequest request, HttpServletResponse response)  
  
     throws IOException {  
  
   String callback =request.getParameter("callback");  
  
   ReturnObject result = null;  
  
   Group group = null;  
  
    try {  
  
     group = groupService.getGroupById(id);  
  
     result = newReturnObject(group, "获取成功", Constants.RESULT\_SUCCESS);  
  
    } catch (BusinessException e) {  
  
     e.printStackTrace();  
  
     result = newReturnObject(group, "获取失败", Constants.RESULT\_FAILED);  
  
    }  
  
   String json =JsonConverter.bean2Json(result);  
  
   response.setContentType("text/html");  
  
   response.setCharacterEncoding("utf-8");  
  
   PrintWriter out = response.getWriter();  
  
    out.print(callback+ "(" + json + ")");  
  
    return null;  
  
  }
```

  

  

注意这里需要先将查询结果转换我json格式，然后用参数callback在json外面再套一层，就变成了jsonp。指定数据类型为jsonp的ajax就可以做进一步处理了。

虽然这样解决了跨域问题，还是回顾下造成parsererror的原因。原因在于盲目的把json格式的数据当做jsonp格式的数据让ajax处理，造成了这个错误，此时server端代码是这样的：

```java
@RequestMapping(value = "/getGroupById")  
  
 @ResponseBody  
  
  public ReturnObject getGroupById(@RequestParam("id") Long id,  
  
     HttpServletRequest request, HttpServletResponse response){  
  
   String callback =request.getParameter("callback");  
  
   ReturnObject result = null;  
  
   Group group = null;  
  
    try {  
  
     group = groupService.getGroupById(id);  
  
     result = newReturnObject(group, "获取成功", Constants.RESULT\_SUCCESS);  
  
    } catch (BusinessException e) {  
  
     e.printStackTrace();  
  
     result = newReturnObject(group, "获取失败", Constants.RESULT\_FAILED);  
  
    }  
  
    return result;  
  
  }
```

  

  

至此解决ajax跨域问题的第一种方式就告一段落。

**追加一种解决方式**

追求永无止境，在google的过程中，无意中发现了一个专门用来解决跨域问题的jQuery插件-​[​jquery-jsonp​](https://github.com/congmo/jquery-jsonp)​。

有第一种方式的基础，使用jsonp插件也就比较简单了，server端代码无需任何改动。

来看一下如何使用jquery-jsonp插件解决跨域问题吧。

```js
var url="http://localhost:8080/WorkGroupManagment/open/getGroupById"  
  
    +"?id=1&callback=?";  
  
$.jsonp({  
  
  "url": url,  
  
  "success": function(data) {  
  
    $("#current-group").text("当前工作组:"+data.result.name);  
  
  },  
  
  "error": function(d,msg) {  
  
   alert("Could not finduser "+msg);  
  
  }  
  
});
```


至此两种解决跨域问题的方式就全部介绍完毕。
