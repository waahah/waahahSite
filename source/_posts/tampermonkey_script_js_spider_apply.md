---
title: TamperMonkey脚本以及JavaScript爬虫应用 
date: 2022-03-28 14:58:36
tags: [JavaScript, Web, TamperMonkey, CORS]
categories: [Coding, JavaScript]
---

### 前言

在以往的`XmlHttprequest`对象中想要跨域请求基本上就是靠`jsonp`，油猴脚本可以实现自定义网页脚本，但是他同样无法避免的要被`CORS`阻止。

#### 如何使用 @grant注解 实现使用油猴自带的GM\_xmlhttpRequest发送跨域请求?

通常新建一个脚本之后是这样的:  
符号 // 不是代表注释

```javascript
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        url
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

```

@grant可以使用一些加强函数这些函数都是以GM\_开头的。  
如果@grant是none的话就只能使用GM\_info这个函数了。

之后我们的代码中就可以使用GM\_xmlhttpRequest函数了

```javascript
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.uuuuuu.com/mdeditor
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// ==/UserScript==
/* jshint -W097 */
'use strict';
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.qq.com/",
  onload: function(response) {
     //这里写处理函数
  }
});

```

处理这些属性之外还有一些其他的属性：

url - the URL from where the data should be downloaded  
name - thefilename - for security reasons the file extension needs to bewhitelisted at the Tampermonkey options page  
headers - seeGM\_xmlhttpRequest for more details saveAs - boolean value, show asaveAs dialog  
onload - function() {} - callback function that iscalled when the download has finished  
onerror - function(download) {}  
callback function that is called when there was an error

> 下面给出一个通过js爬取某个网站信息的例子：

jquery 中 ![('div','li')表示的是](https://math.jianshu.com/math?formula=(%27div%27%2C%27li%27)%E8%A1%A8%E7%A4%BA%E7%9A%84%E6%98%AF)(子，父)，即从父节点里寻找子节点，是选择[li标签](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dli%25E6%25A0%2587%25E7%25AD%25BE%26tn%3DSE_PcZhidaonwhc_ngpagmjz%26rsv_dl%3Dgh_pc_zhidao)里面所有div标签，而不是找[li标签](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dli%25E6%25A0%2587%25E7%25AD%25BE%26tn%3DSE_PcZhidaonwhc_ngpagmjz%26rsv_dl%3Dgh_pc_zhidao)外面的div标签。  
比如：

```javascript
var el = $( '<div></div>' );
el.html(data);
var tda= $("div.content div.header a.name em", el)  ;
var detailUrl = $("div.content div.header a.name ", el)  ;                          

```

完整例子，只是demo

```javascript
// ==UserScript==
// @name         爬取
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  爬取
// @author       bob
// @match        https://www.txxxxxx.com/search*
// @requir       https://code.jquery.com/jquery-latest.js
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

 (function () {
      'use strict';
     var $ = $ || window.$;
     function sleep(numberMillis) {
         var now = new Date();
         var exitTime = now.getTime() + numberMillis;
         while (true) {
             now = new Date();
             if (now.getTime() > exitTime)
                 return;
         }
     }
     var enterpriseList = [ ];
     var dataList = [];
     var errorListIds = [];
     //获取企业列表
     GM_xmlhttpRequest({
        method: 'GET',
        url: "http://xxx.xxxxxx.com/yyyyyy/queryEnterpriseList?startID=44633&endID=45000",
        headers: {
                 "Content-Type": "application/json"
             },
        onload: function(response) {
            enterpriseList =  $.parseJSON( response.responseText );
            getData();
        },
    });

     //saveData(data);
     var count = 0;
     function saveData(data){
         GM_xmlhttpRequest({
             method: 'POST',
             data:JSON.stringify(data),
             url: "http://xxx.xxxxx.com/yyyyyy/saveDataList",
             dataType: "json",
             headers: {
                 "Content-Type": "application/json"
             },
             onload: function(response) {
                 
             },
         });
     }

   
     function getData(){
         for(var i=0;i<enterpriseList.length;i++){//
             var one = {};
             var url =  'https://www.uuuuuuuuu.com/search?key='+enterpriseList[i].enterpriseName.replace("（","(").replace("）",')');
             try{
                 var num=Math.floor(Math.random()*10+5);//随机等待几秒
                  sleep(num*1000);
                 $.ajax({url:url,
                         async:false,
                         // timeout:5000,
                         success:function(data){
                             var str = "index_verify?type=companysearch"
                             if(data.indexOf(str) != -1){
                                 i = enterpriseList.length;
                                 console.log('****************************************操作需要验证');
                             }

                             var el = $( '<div></div>' );
                             el.html(data);
                             var tda= $("div.content div.header a.name em", el)  ;
                             var detailUrl = $("div.content div.header a.name ", el)  ;

                             if(tda.length >0 && tda[0].innerText == enterpriseList[i].enterpriseName){
                                 $.ajax({url:detailUrl[0].href,
                                         async:false,
                                         // timeout:5000,
                                         success:function(data){
                                             var el = $( '<div></div>' );
                                             el.html(data);

                                             one.enterpriseName = enterpriseList[i].enterpriseName  ;//公司名称

                                             var tr = $("#_container_baseInfo table.table.-striped-col.-border-top-none tr", el);
                                             if(businessTerm.length>8){
                                                     if(businessTerm.substring(0,3) != '***'){
                                                         one.startTime = businessTerm.substring(0,9)  ;
                                                         if(businessTerm.substr(11) == '无固定期限'){
                                                             one.endTime = '2099-12-31';
                                                         }else{
                                                             one.endTime = businessTerm.substr(11);
                                                         }
                                             }else{
                                                         one.startTime = td[12].innerText.replace(/\s+/g,"").replace(/[\n\r]/g,'')  ;
                                                         if(businessTerm.substr(4) == '无固定期限'){
                                                             one.endTime = '2099-12-31';
                                                         }else{
                                                             one.endTime = businessTerm.substr(4);
                                                         }
                                                     }
                                             }
                                        }, error:function(data){}});
                             }else{
                one.qualificationNo = '--';
                 }
                 dataList.push(one);
                             if(dataList.length == 10){
                                   saveData(dataList);//保存数据
                                   dataList = [];
                                   count += 10;
                                   console.log('已保存数据:'+count);
                              }
                         }, error:function(data){ }});
             }catch(e){
             }
         }
     }
 })();

```
