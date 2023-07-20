---
title: 使用Canvas进行验证码识别
date: 2021-12-16 14:58:36
tags: [Canvas, JavaScript]
categories: [Coding, JavaScript]

---

 ### 前言

使用Canvas进行验证码识别

前两天首页上[有篇文章](http://www.cnblogs.com/liushuijinger/archive/2012/09/26/2703558.html),讲用C#生成验证码.今天又看到[一篇文章](http://jovesky.com/2012/10/02/identify-entry-verification-code-2/),讲用python识别验证码.于是我就写了这篇文章,讲用Canvas识别验证码

我们今天要识别的是那种最最简单的验证码,只有随机颜色和随机背景,而没有随机变形,随机噪点.

为了方便试验,我从谷歌中随便搜了一个[使用了这种验证码的网站](http://www.gsao.fudan.edu.cn/addon/achieve/achievementdoc/achivecxMain.jsp?siteId=3&pageId=0),这种验证码的确很常见 ![](https://gsas.fudan.edu.cn/captcha/imageCode)(点击可更换).

分析
--

首先,我们需要分析验证码的生成规律,多次刷新页面就能看出,该验证码由四个数字组成,且每个数字除了颜色随机改变,形状和位置是固定不变的.

打开`Photoshop`,把网页中的验证码图片拖进来,然后再拖出几根参考线,让每两根参考线包围一个数字,一开始肯定有偏差,再次刷新页面,按住shift键把验证码图片拖到`photoshop`中,微调参考线的位置,经过多次操作,最终会成为下面这样

![](https://s2.loli.net/2023/07/03/847Cp3AryFojlYU.jpg)

上图中,从横向上来看,验证码图片中的第一个数字是从7px开始的,然后每个数字占了9px,中间间隔是4px.于是我们可以得出一个公式,x=13\*i+7,i表示数字的索引\[0,1,2,3\],x表示横坐标

纵向上比较简单,y坐标的范围是恒定的,3px到16px.

图像处理
----

首先,我并没有专业的图像处理知识,所以下面说的专业词汇肯定是有问题的,以理解为主.由于数字和背景都是随机颜色的,那么我们生成的模板字符串岂不是每次都会变吗.的确是这样的,由于canvas在获取某个像素点的像素值时,返回的是rgba值.也就是一共有四个值.我们需要使用一个公式,把rgba颜色转换成灰度值:gray = r＊0.3 ＋ g＊0.59 ＋ b＊0.11,灰度值的范围是0~255,我这里把128看成临界点,也就是把0~128看成是暗,用0表示,128~255看成是明,用1表示,我把明暗简写为ld(Light and Dark).也就是公式,ld = gray>128?1:0.为什么通过明暗值能把数字和背景色区分开来呢,因为这种验证码在进行灰度化以后,背景明显是属于亮的,偏白色,而数字是属于暗的,偏黑色.所以能够区分.

下面是在photoshop中演示的过程.

原图,RGB颜色:

![2012100516033594.png](https://s2.loli.net/2023/07/03/Ws3aoUmJ7zZ2Rpk.png)

灰度化:

![](https://s2.loli.net/2023/07/03/9RbKzL7NQEogM1J.png)

二值化,在photoshop里叫位图颜色模式.有多种转换的算法.我们用的应该是50%阈值

![](https://s2.loli.net/2023/07/03/JdMG6SqwF1jrus8.png)

转换后就是

![](https://s2.loli.net/2023/07/03/s59ohmb6we1IrDc.png)

生成模板
----

既然每个数字的形状和位置都是一定的,那我们就能把0-9这10个数字的像素信息存储下来作为模板,在识别验证码时,取出验证码图片中的数字依次对比.如果相等说明就是这个数字.下面是我写的生成模板的代码.

```javascript
var image = document.querySelector(".greyfont2 img");                 //获取到验证码图片
var canvas = document.createElement('canvas');                        //新建一个canvas
var ctx = canvas.getContext("2d");                                    //获取2D上下文
var numbers = \[\];                                                     //存储数字模板的数组
canvas.width = image.width;                                           //设置canvas的宽度
canvas.height = image.height;                                         //设置canvas的高度
document.body.appendChild(canvas);                                    //将canvas添加进文档
ctx.drawImage(image, 0, 0);                                           //将验证码绘制到canvas上
for (var i = 0; i < 4; i++) {                                         //循环四次,识别四个数字
    var pixels = ctx.getImageData(13 \* i + 7, 3, 9, 16).data;         //按照公式获取到每个数字上的像素点
    var ldString = "";                                                //用来存储明暗值的字符串
    for (var j = 0, length = pixels.length; j < length; j += 4) {                 //每次循环取四个值,分别是一个像素点的r,g,b,a值
        ldString = ldString + (+(pixels\[j\] \* 0.3 + pixels\[j + 1\] \* 0.59 + pixels\[j + 2\] \* 0.11 >= 128));     //灰度化+二值化,但我们并没有真正的处理图像
    }                 
    console.log(ldString);                 //输出存储着明暗值的字符串
}          
```

在控制台中执行上面的脚本.

![](https://s2.loli.net/2023/07/03/xEmjugOSQ9yofqt.png)

我们就知道了,5,9,0的模板字符串各是什么,然后刷新页面,继续执行脚本,一直到到收集齐0-9的模板字符串.把这些模版字符串组成数组赋值给numbers变量.

然后接着写识别程序.识别程序和输出模板程序差别不大,就多了一个对比的过程.

识别验证码
-----

控制台中执行下面的代码,就会自动填写好验证码.

```javascript
var image = document.querySelector(".greyfont2 img");       //如果要用在greasemonkey脚本里,可以把下面的代码放在image的onload事件里          
var canvas = document.createElement('canvas');                 
var ctx = canvas.getContext("2d");                 
var numbers = \[                           //模板,依次是0-9十个数字对应的明暗值字符串
"111000111100000001100111001001111100001111100001111100001111100001111100001111100001111100100111001100000001111000111111111111111111111111111111",
"111000111100000111100000111111100111111100111111100111111100111111100111111100111111100111111100111100000000100000000111111111111111111111111111",
"100000111000000011011111001111111001111111001111110011111100111111001111110011111100111111001111111000000001000000001111111111111111111111111111",
"100000111000000001011111001111111001111110011100000111100000011111110001111111001111111001011110001000000011100000111111111111111111111111111111",
"111110011111100011111100011111000011110010011110010011100110011100110011000000000000000000111110011111110011111110011111111111111111111111111111",
"000000001000000001001111111001111111001111111000001111000000011111110001111111001111111001011110001000000011100000111111111111111111111111111111",
"111000011110000001100111101100111111001111111001000011000000001000111000001111100001111100100111000100000001111000011111111111111111111111111111",
"100000000100000000111111100111111101111111001111110011111110111111100111111101111111001111111001111110011111110011111111111111111111111111111111",
"110000011100000001100111001100111001100011011110000011110000011100110001001111100001111100000111000100000001110000011111111111111111111111111111",
"110000111100000001000111001001111100001111100000111000100000000110000100111111100111111001101111001100000011110000111111111111111111111111111111"\];
var captcha = "";                         //存放识别后的验证码
canvas.width = image.width;
canvas.height \= image.height;
document.body.appendChild(canvas);
ctx.drawImage(image, 0, 0);
for (var i = 0; i < 4; i++) {
    var pixels = ctx.getImageData(13 \* i + 7, 3, 9, 16).data;
    var ldString = "";
    for (var j = 0,length = pixels.length; j < length; j += 4) {
        ldString \= ldString + (+(pixels\[j\] \* 0.3 + pixels\[j + 1\] \* 0.59 + pixels\[j + 2\] \* 0.11 >= 140));
    }
    var comms = numbers.map(function (value) {                      //为了100%识别率,这里不能直接判断是否和模板字符串相等,因为可能有个别0被计算成1,或者相反
        return ldString.split("").filter(function (v, index) {
            return value\[index\] === v
        }).length
    });
    captcha += comms.indexOf(Math.max.apply(null, comms));          //添加到识别好的验证码中
}
document.querySelector("input\[name=validateCode\]").value = captcha; //写入目标文本框
```

![2012100516224576.png](https://s2.loli.net/2023/07/03/gkAfonRu6tBw7Ix.png)

总结
--

你可以看到,这种级别的验证码,用js识别才用了几行代码.如果是更强劲的perl,python写的话,更没什么困难.所以验证码除了在逻辑上要防止绕过以外,本身还要有一定的复杂程度.否则一点意义也么有,只有浪费用户的时间.