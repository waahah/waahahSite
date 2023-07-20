---
title: TamperMonkey教程+GM函数手册
date: 2022-04-14 14:58:36
tags: [JavaScript, TamperMonkey]
categories: [Coding, JavaScript]

---

### 前言

TamperMonkey脚本教程+GM函数手册

### 文章目录

*   [序](about:blank#_2)
*   [门头的代码](about:blank#_8)
*   [jQuery](about:blank#jQuery_60)
*   *   [选择器](about:blank#_62)
*   [操作html](about:blank#html_79)
*   *   [debugger的方法](about:blank#debugger_113)
*   [GM教程+GM函数手册](about:blank#GMGM_124)
*   *   [函数手册:](about:blank#_170)
    *   *   [GM\_addStyle](about:blank#GM_addStyle_171)
        *   [GM\_log](about:blank#GM_log_185)
        *   [GM\_listValues](about:blank#GM_listValues_202)
        *   [GM\_setValue](about:blank#GM_setValue_222)
        *   [GM\_deleteValue](about:blank#GM_deleteValue_246)
        *   [GM\_getValue](about:blank#GM_getValue_262)
        *   [GM\_getResourceText](about:blank#GM_getResourceText_286)
        *   [GM\_getResourceURL](about:blank#GM_getResourceURL_308)
        *   [GM\_openInTab](about:blank#GM_openInTab_333)
        *   [GM\_registerMenuCommand](about:blank#GM_registerMenuCommand_349)
        *   [GM\_setClipboard](about:blank#GM_setClipboard_373)
        *   [GM\_xmlhttpRequest](about:blank#GM_xmlhttpRequest_386)
        *   [其他](about:blank#_405)
        *   *   [headers 对象](about:blank#headers__406)
            *   [method 字符串](about:blank#method__409)
            *   [url 字符串](about:blank#url__412)
            *   [user 字符串](about:blank#user__415)
            *   [password 字符串](about:blank#password__417)
            *   [upload 对象](about:blank#upload__419)
            *   [overrideMimeType 字符串](about:blank#overrideMimeType__425)
            *   [timeout 数字](about:blank#timeout__429)
            *   [onabort](about:blank#onabort_433)
            *   [onerror](about:blank#onerror_437)
            *   [onload](about:blank#onload_441)
            *   [onprogress](about:blank#onprogress_444)
            *   [onreadystatechange](about:blank#onreadystatechange_448)
            *   [ontimeout](about:blank#ontimeout_451)
            *   [context 对象](about:blank#context__473)
            *   [finalUrl 对象](about:blank#finalUrl__475)
            *   [progress回调内容](about:blank#progress_477)

序
===============================================================

资料来源：  
[如何编写油猴脚本](https://blog.chaofan.io/archives/%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC)  
[油猴插件编写学习](https://blog.csdn.net/junmoxi/article/details/87372716)

jQuery脚本语言在油猴中的应用

门头的代码
===================================================================

```javascript
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();

```

上面那一堆就是这个脚本的属性了  
@name就是脚本名  
@namespace是脚本的主页  
@version是版本  
@description是介绍  
@author是作者  
@match是匹配到什么页面执行此脚本  
@grant是需求权限

```javascript
// @license      Lv3
// @include      *://community.com/profiles/*/cards/*
// @require      https://code.jquery.com/jquery-3.3.4.min.js
// @require      https://code.jquery.com/ui/1.13.1/jquery-ui.js

```

@license是代码许可  
@include和@match类似，表示匹配的网站  
@require表示要使用的js库，这里用了jquery和jquery-ui，从官网上找到下载链接，填写在这里。

功能对照表

| 键                                   | 示例                                                         | 备注                                                         |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @name                                | @name 脚本名称 脚本的名称。                                  | 该项将显示在页面的标题以及链接内容，必填项。                 |
| @description                         | @description 脚本功能描述                                    | 脚本功能的描述，显示在脚本标题下面，必填项。                 |
| @namespace                           |                                                              | @namespace 及 @name 这两个属性将帮助用户脚本管理器判断是否已安 装该脚本。 |
| @version                             | @version 0.0.1                                               | 脚本的版本标记将使用 Mozilla 版本格式 并显示于脚本的简介页面，必填 项。 |
| @include @exclude @match             | @match _: [//www.52pojie.cn/](https://www.52pojie.cn/)_      | 描述脚本将执行的页面。该列表会被分析并展示到脚本的简介页面，以及 用于脚本分类。 |
| @require                             | @require [http://cdn.bootcss.com/jquery.min.js](http://cdn.bootcss.com/jquery.min.js) | 引用外部脚本到您的脚本                                       |
| @updateURL @installURL, @downloadURL |                                                              | 告知用户脚本管理器应该在哪个地址获取脚本更新。               |
| @license                             |                                                              | 脚本所使用的许可协议名称或地址，该协议需包含用户是否允许二次分发 或修改 脚本的权利。不提供许可协议则表示用户仅允许个人使用且不得 二次分发；该协 议将在脚本的简介页面显示。 |
| @supportURL                          |                                                              | 用户可获得该脚本技术支持的链接地址 (如：错误反馈系统、论坛、电子 邮件)，该链接将显示在脚本的反馈页面。 |
| @contributionURL                     |                                                              | 用于捐赠脚本作者的链接，该链接将显示在脚本的反馈页面。       |
| @contributionAmount                  |                                                              | 建议捐赠金额，请配合 @contributionURL 使用。                 |
| @compatible                          |                                                              | 标记此脚本与某个浏览器兼容，兼容性信息将显示在脚本的简介页面上。 |
| @incompatible                        |                                                              | 标记此脚本与某个浏览器不兼容，兼容性信息将显示在脚本的简介页面 上。 |

jQuery
====================================================================

jQuery是建立在JS上的一种脚本语言，首先在这里记录一些元素参数，以便在油猴中方便应用和参考

选择器
-----------------------------------------------------------------

[选择器说明](https://www.runoob.com/jquery/jquery-ref-selectors.html)  
基本选择器

```javascript
$("#id")            //ID选择器
$("div")            //元素选择器
$(".classname")     //类选择器
$(".classname,.classname1,#id1")     //组合选择器

```

层次选择器

```javascript
$("#id>.classname ")    //子元素选择器
$("#id .classname ")    //后代元素选择器
$("#id + .classname ")    //紧邻下一个元素选择器
$("#id ~ .classname ")    //兄弟元素选择器

```

操作html
====================================================================

```javascript
(function() {
var html;
//与元数据块中的@grant值相对应，功能是生成一个style样式
GM_addStyle('#reader_box{background:#fff;color:#000;}')//编排css

  html = '<div id="reader_box">内容</div>'
  html += '<div id="floatDivBoxs">'
  ...
  html += '</div>'
  html += '</div>'
    $("body").append(html);
    // 定义按钮事件
    $("#myBtn").click(function(){
      alert("点击了新增按钮");});

console.log("test");
})();
// 监听每一个接口点击事件
$("a[name='vip']").on("click",function(){
    //获取当前网址
    var url = window.location;
    var api = $(this).attr("url");
    window.open(api+url,'','width=632,height=388, scrollbars=yes');
	return false;
})
//
$("strong.top_book").remove();//移除指定标签下的指定类
$("p.Text font").remove();
$(".book dd.newbook").remove();
$("p.Text").css("font-family","宋体").css("font-size","16px").css("font-style","normal");
//编辑指定css

```

debugger的方法
-------------------------------------------------------------------------

[如何开发一个油猴脚本](https://www.jianshu.com/p/cf3f8d20bbfc)  
使用jQuery和网页自带的debugger功能调试代码

```javascript
jQuery.noConflict();
(function( $ ) {
    debugger;
    var a,s=12, kk=45;
    a = s+kk;
})( jQuery );

```

GM教程+GM函数手册
=========================================================================

[转载–已删除的原文](http://cache.baiducontent.com/c?m=9f65cb4a8c8507ed4fece76310508c31490797634b87834e29938448e435061e5a24feba25251406d4cf7f630bb84828a8ab6065367527b591c38841d9bd9428299f2730314bd15615a747e7dc4753c234d507a9f916b2e5e733e3b9d5a7c855239905536d8180ca1c4b4a9d78f065&p=836fda0086cc42ad5ef7c7710f4f8d&newp=9b708b5680904ead1abd9b7d0f1098231610db2151d7d5146b82c825d7331b001c3bbfb423261a00d8c77c6407af4256eef1317433092ba3dda5c91d9fb4c57479ca&user=baidu&fm=sc&query=GM_addStyle%28%29&qid=b1becc9000095912&p1=7)  
GM_info是一个包含GM信息和当前脚本信息的对象，不需要特殊声明即可使用  
结构。  
注:以下带\*项目都是TamperMonkey特有项目，带+项目都是GreaseMonkey特有项目  
script 对象 包含脚本的信息

```javascript
{
name 字符串 脚本名称
description 字符串 脚本描述
namespace 字符串 脚本命名空间，可能为空
run-at 字符串 脚本开始执行的时间，可能为document-start或document-end
version 字符串 版本，可能为空
excludes 数组 脚本生效排除地址，可能为空数组
includes 数组 脚本生效包含地址，可能为空数组
matches 数组 脚本生效包含地址，可能为空数组（PS:在TamperMonkey中，此参数与includes完全相同）
resources 数组 脚本生效包含地址，可能为空数组

{
name 字符串 名称
loaded * 布尔 是否已经加载完成
resText * 字符串 与GM_getResourceText结果相同
resURL * 字符串 与GM_getResourceURL结果相同
url * 字符串 来源地址
mimetype + 字符串 资源类型
}

grant * 数组 申请的特殊权限
lastUpdated * 数字 上次升级的时间（Unix时间戳）
lastModified * 数字 上次修改的时间（Unix时间戳）
icon * 字符串 图标，可能为null
icon64 * 字符串 图标，可能为null
}
scriptHandler * 字符串 脚本运行环境（如Tampermonkey）
scriptMetaStr 字符串 脚本头信息
scriptWillUpdate 布尔 GM是否会自动更新该脚本
version 字符串 GM版本
示例：console.log(GM_info);

```

注意事项:  
关于沙箱环境导致的问题:  
GM运行脚本，实质上会把它在沙箱里运行，类似封装在一个匿名函数中。因此，这个脚本运行完毕后，就会被销毁。其他脚本（包括网页上的普通脚本和GM脚本）都无法访问某个GM脚本的任何内容，包括函数  
这也导致了一些问题，比如setTimeout无法像平常一样setTimeout(“showthis()”,1000)，不过，有两种解决办法  
通过匿名函数，例如setTimeout(function(){alert(‘a’);},1000);  
通过创建script元素，将函数插入到网页中。不过此方法可能会出现重名的情况

[](https://blog.csdn.net/qq_37338627/article/details/90214394)函数手册:
-------------------------------------------------------------------

### GM_addStyle

描述  
此函数添加的CSS到网页中。它会创建一个

```javascript
GM_addStyle('#floatDivBoxs{background:#fff;color:#000;}')

```

### GM_log

描述  
向JS控制台发送一条消息，通常用于调试  
语法  
GM\_log(消息)  
返回:无(undefined)  
许可:@grant  
泷涯注：此功能貌似和js自带的console.log一样。具体可以参照console相关函数  
参数

message 字符串/整数/布尔

使用方式:message = “ARGHHH!”;  
发送到JavaScript控制台的消息  
当参数不是一个字符串时，会被转化为一个字符串。在转化一个大数字时，可能会进行一些截取（用于显示）  
示例  
GM\_log(‘Hello, World!’);

### GM_listValues

描述  
此函数返回一个数组，内容为此脚本所有通过GM\_setValue保持的键（不包括值）  
语法  
GM\_listValues()  
返回:数组  
许可:@grant  
示例

```javascript
console.log(GM_listValues());
//上面代码结果类似["firefox8","chrome","windows"] 

var vals=[];
var lists=GM_listValues();
for (var val in lists) {
vals.push(GM_getValue(lists[val]));
}
//上句代码等价于:
var vals=GM_listValues().map(GM_getValue);

```

### GM_setValue

描述  
此函数用于向本地保存一些简单的值  
参数会被保持到一个位于脚本目录下的SQLite数据库中  
泷涯注:不同脚本使用不同的数据库。因此不同脚本直接的值不会互相覆盖，也不能互相读取  
语法  
GM\_setValue(键名,值)  
返回:无(undefined)  
许可:@grant  
参数

键名 字符串

使用方式:name=‘PropertyName’;  
在GM\_getValue和GM\_deleteValue中使用

值 字符串/数字/布尔

使用方法:value=5;  
示例  
GM\_setValue(‘firefox’,5);  
GM\_setValue(‘firefox’,3.14159);  
GM\_setValue(‘firefox’,‘text’);  
GM\_setValue(‘firefox’,true);

### GM_deleteValue

描述  
此函数用于删除由GM\_setValue保存的值  
语法  
GM\_deleteValue(键名)  
返回:无(undefined)  
许可:@grant  
参数

键名 字符串

使用方法:name=‘PropertyName’;  
在GM\_setValue中使用的键名  
示例  
GM\_deleteValue(‘firefox’);

### GM_getValue

描述  
用于获取通过GM\_setValue保存的内容  
如果值不存在，并且有默认值，则返回默认值，否则返回无(underfined)  
注意:不同脚本之间不能互相读取保持的值  
语法  
GM\_getValue(键,默认值)  
返回:字符串/整数/布尔/无(undefined)/空  
许可:@grant  
参数

键 字符串

使用方法:name=‘PropertyName’;  
键名（在GM\_setValue时使用的键名）

默认值 字符串/数字/布尔

使用方法:default=5;  
如果键不存在，会返回此参数。如果此参数被省略，会返回无(underfined)  
示例  
console.log(GM\_getValue(‘firefox’));  
console.log(GM\_getValue(‘firefox’,‘this value is underfined’));

### GM_getResourceText

描述  
此函数会返回某一个resource的内容  
注:如果resource非文本（包括图片、压缩文件等），TamperMonkey将会返回空，而GreaseMonkey将会返回乱码（实际为原始资源的数据）  
注:如果名称对应的resource不存在，会产生一个错误  
语法  
GM\_getResourceText(名称)  
返回:字符串  
许可:@grant  
参数  
名称字符串  
此名称是在头信息中，使用// @resource 时定义的名称。此名称建议遵循Javascript和XML/CSS命名规则  
示例

```javascript
// ==UserScript==
……
// @resource haha http://su.bdimg.com/static/nav/css/nav_min.css
……
// ==/UserScript==
var haha=GM_getResourceText("haha");
console.log(haha);

```

### GM_getResourceURL

描述  
在TamperMonkey下，此函数用于获取一个资源的内容（一个经过base64加密的字符串），如果是图片，则返回一个类似data:image/xxx的base64格式的图片，可以直接用于background-image  
在GreaseMonkey下，此函数用于获取一个资源的特殊URL（类似greasemonkey-script:……）  
语法  
GM\_getResourceURL(名称)  
返回:字符串  
许可:@grant  
参数  
名称字符串  
使用方法:name=“aaaaaa”;  
此名称是在头信息中，使用// @resource 时定义的名称。此名称建议遵循Javascript和XML/CSS命名规则  
示例

```javascript
// ==UserScript==
// @name Demo
// @namespace http://www.baidu.com
// @description Demo Script
// @include http://www.baidu.com/*
// @resource fooLogo http://www.example.com/logo.png
// @grant GM_getResourceURL
// ==/UserScript==
var fooLogo=GM_getResourceURL("fooLogo");
console.log(fooLogo);

```

### GM_openInTab

描述  
此函数会在新标签页打开一个URL，并立即切换到这个新标签页  
语法  
GM\_openInTab(url)  
许可:@grant  
返回:  
0.8.2以前:无（undefined）  
0.8.2及以后:新创建的window对象  
参数  
url 字符串  
要打开的地址  
示例

```javascript
GM_openInTab("http://www.baidu.com/");

```

### GM_registerMenuCommand

描述  
此函数向GM菜单添加一个子菜单项（兼容TamperMonkey）  
语法  
GM\_registerMenuCommand(名称,函数,快捷键)  
返回:无（undefined）  
许可:@grant  
参数  
名称字符串  
显示在GM菜单上的名称  
函数函数  
点击时调用的函数，实测支持匿名函数  
快捷键字符串  
点开GM菜单后，按指定快捷键可快速选择  
示例

```javascript
function helloSimple () { console.log('helloSimple'); }
function hello () { console.log('hello'); }
function hello2 () { console.log('hello2'); }
GM_registerMenuCommand("Hello, world (simple)",helloSimple)
GM_regi GM_registerMenuCommand("Hello, world!",hello,"h");
GM_registerMenuCommand("Hello, world! (again)",hello2,"e");
GM_registerMenuCommand("Hello, world (no name)",function(){console.log('no name');});

```

### GM_setClipboard

描述  
设置系统剪贴板的内容  
语法  
GM\_setClipboard(内容)  
许可:@grant  
参数  
内容字符串  
不解释  
示例

```javascript
GM_setClipboard('Text');

```

### GM_xmlhttpRequest

描述  
此函数提供一个特别的XMLHttpRequest对象，可用于跨域访问  
语法  
GM\_xmlhttpRequest(参数)  
许可:@grant  
返回:  
GreaseMonkey 1.8.0将返回无(underfind)  
GreaseMonkey 1.9.0将返回一个对象（可用于终止请求）  
参数  
binary 布尔  
使用方式:details.binary = true;  
以二进制方式发送数据。如果为true，使用.sendAsBinary()方法  
context 对象  
可选。会作为response对象的一部分  
data 字符串  
使用方式:details.data = null;  
可选。请求主体。通常用于POST请求  
注意：如果data中有from编码的数据。必须在headers中设置头信息Content-Type为application/x-www-form-urlencoded

### 其他

#### headers 对象

使用方式:details.headers = {“User-Agent”:“Mozilla/5.0”};  
用来代替浏览器生成的header信息。headers应该保证发送的 名称-值 成对存在

#### method 字符串

使用方式:detial.method = “GET”;  
定义请求方式，例如：GET，POST

#### url 字符串

使用方式:details.url = “[http://www.example.com/](http://www.example.com/)”;  
URL可以是相对路径（相对当前网页），但是强烈推荐使用绝对路径以避免请求错误域名的情况

#### user 字符串

使用方式:details.user = “johndoe”;

#### password 字符串

使用方式:details.password = “password”;

#### upload 对象

可选。通过回调函数监听上传情况。上传结果会包含在返回数据中  
synchronous 布尔  
默认值:false  
使用方式:details.synchronous = true;  
如果为true，则此请求为同步请求。注意：如果为同步请求，则浏览器界面会锁定，直到请求完毕。此模式下，返回数据中会有更多有效数据

#### overrideMimeType 字符串

使用方式:details.overrideMimeType = “text/html; charset=ISO-8859-1”;

指定请求的MIME类型

#### timeout 数字

使用方式:details.timeout = 60000;  
单位：毫秒。指定请求超时时间。如果超过指定时间则触发ontimeout事件。0代表无限制  
参数：回调函数

#### onabort

使用方式:details.onabort = function (response) { /\* some code \*/ };  
请求中止时调用  
泷涯注：测试的时候貌似一直没有调用到这个函数（包括使用abort方法终止请求），不知道到底有什么用

#### onerror

使用方式:details.onerror = function (response) { /\* some code \*/ };  
请求中出现错误时调用  
错误包括网络错误、服务器错误（如404未找到等），也可以用于容错

#### onload

使用方式:details.onload = function (response) { /\* some code \*/ };  
请求成功完成时调用

#### onprogress

使用方式:details.onprogress = function (response) { /\* some code \*/ };  
请求进度改变时调用  
泷涯注：测试的时候貌似一直没有调用到这个函数，不知道到底有什么用

#### onreadystatechange

使用方式:details.onreadystatechange = function (response) { /\* some code \*/ };  
请求进展中调用

#### ontimeout

使用方式:details.ontimeout = function (response) { /\* some code \*/ };  
请求超时时调用（时间由timeout设置）  
返回数据  
所有回调函数都定义了此对象。此对象包含各种细节。具体细节取决于回调类型  
标准内容  
部分内容为标准XMLHttpRequest对象：  
readyState 整数 请求状态（仅onreadystatechange回调可用）  
1 正在载入。请求已准备好  
2 已加载。请求准备发送到服务器，但是还什么都没发  
3 交互状态。请求已经发送，并且客户端等待服务器完成发送数据  
4 完成。请求已完成，并且其他域中的所有应答数据已可用  
responseHeaders 字符串 响应的HTTP头信息  
responseText 字符串 响应的内容  
status 整数 HTTP应答的状态代码。如200意为请求完成  
statusText 字符串 HTTP状态文字。依赖于服务器  
UNSENT 整数 待发送内容（仅ontimeout回调可用）  
OPENED 整数 是否已经打开连接，1未是（仅ontimeout回调可用）  
HEADERS\_RECEIVED 整数 收到的头信息数量（仅ontimeout回调可用）  
LOADING 整数 加载状态（？）（仅ontimeout回调可用）  
DONE 整数 同readyState（仅ontimeout回调可用）  
GM特有内容

#### context 对象

与原请求的context完全相同

#### finalUrl 对象

如果有跳转（header中的Location），则为最终请求的URL

#### progress回调内容

基于nsIDOMProgressEvent  
done 整数 未知  
lengthComputable 字符串 未知  
loaded 整数 未知  
total 整数 未知  
totalSize 整数 未知  
其他  
abort方法  
终止某一个请求

