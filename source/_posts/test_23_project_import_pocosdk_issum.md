---
title: 测试二十三、项目接入Poco-SDK的常见问题
date: 2023-02-08 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

很多新手同学想要使用我们的poco框架获取项目的控件树来进行自动化测试。但是他们经常会搞不清楚，哪些项目是需要接入Poco-SDK才能获取控件树，这个Poco-SDK是接入到哪里去的，所以今天我们就接入Poco-SDK这个问题，把同学们常问的一些问题给大家解答下。

**1**

**如何知道项目是否需要接入Poco-SDK**

很简单，大家只要记住，目前只有安卓原生和iOS原生应用，能够在不接入Poco-SDK的情况下，直接使用我们的poco框架，像其它的平台，Cocos、unity、Egret等等，都必须事先接入Poco-SDK才可正常使用。

**2**

**这个Poco-SDK是接到哪里的**


这个问题特别多新手同学犯错，他们有的会把下载下来的Poco-SDK放到设备目录下，有的会把它放到airtest脚本目录下，这些都是错误的做法。

实际上，我们应该 **把Poco-SDK嵌入到你的游戏项目源码里面** ，比如unity游戏项目的脚本、Cocos项目的脚本等，而不是放到设备目录下或者放到airtest脚本目录下。

所以，经常有同学问我们没有源码的项目能接入Poco-SDK吗？答案是不能。

**3**

**unity项目接入Poco-SDK的常见问题**


我们按接入步骤一个个来了解下。

##### **1）下载Poco-SDK包**

这个直接到我们的GitHub上面clone下来即可：https://github.com/AirtestProject/Poco-SDK 。

##### **2）把Unity3D文件夹放到项目脚本中**

把刚才clone下来的压缩包 `Poco-SDK-master.zip` 解压，然后将其中的Unity3D文件夹放到你Unity项目的Scripts的任意位置中：

![](https://s2.loli.net/2023/07/10/PsyHmXTJKd9QjCV.png)

注意，这里所说的Scripts指的就是unity游戏项目的源码。

##### **3）根据UI类型选择**

询问程序使用的是哪种UI方式，SDK中有三个文件夹 `ugui` 、 `ngui` 、 `fairygui` ，保留其中一种删除另外两种，比如上图选择的就是 `ugui` 。其余两种请务必删除，不然unity会报错。

##### **4）在unity载入脚本**

创建一个空的 `GameObject` (右键-Create Empty)，添加脚本(Add Component)：

![640 _56_.png](https://s2.loli.net/2023/07/10/3gajKQAoVmlkYJb.png)

其他参数默认即可，`GameObject` 名字随意。

或者，同学们也可以在 root 或者 主camera 这些 `GameObject` 上添加脚本（Add Component） `Unity3D/PocoManager.cs` 。

有同学可能会问，为什么要新建空的 `GameObject` 或者是选择 root 、 主camera 这些 `GameObject`来添加脚本呢？

其实这都是为了将脚本挂载到1个 **不会在游戏的生命周期中被销毁的节点** 上去，并且在游戏开始时，尽快开启poco服务。


**4**

**Cocos-Creator项目接入Poco-SDK的常见问题**

跟上面一样，我们依旧是按步骤来看。

##### **1）下载Poco-SDK包**

同上。

##### **2）把cocos-creator/Poco文件夹放项目脚本中**

复制Poco-SDK包里面的 `cocos-creator/Poco` 文件夹到你的cocos-creator项目的脚本目录下，任意路径都可以。

![640 _57_.png](https://s2.loli.net/2023/07/10/xcD5NXuEzHqiRrs.png)

这里所说的cocos-creator项目指的就是cocos-creator游戏项目的源码。

##### **3）编辑cocos-creator项目的配置文件**

在引擎目录中找到 `ccConfig.h` 文件。文件路径在 `your/path/to/CocosCreator_2.2.1/resources/cocos2d-x/cocos/base/ccConfig.h`：

![640 _58_.png](https://s2.loli.net/2023/07/10/yjnklJzZEVPeSIi.png)

编辑第62行。把 `#define USE_WEBSOCKET_SERVER 0` 改为 `#define USE_WEBSOCKET_SERVER 1` ：

![640 _59_.png](https://s2.loli.net/2023/07/10/v3JM45QAkVNZU6a.png)

这样做的目的是为了开启开启 `WebSocketServer` 模块。

##### **4）添加脚本到一个永远不会消失的节点上**

添加脚本需要我们 手动添加 ，例如：

![640 _60_.png](https://s2.loli.net/2023/07/10/MZz97y8QW3bLJa4.png)

在该脚本的 `onLoad` 函数中，添加如下脚本：

```js
onLoad:function(){
    var poco = require("Poco") //此处添加你自己的Poco.js文件的路径
    window.poco = new poco();
    cc.log(window.poco);
    
},
```

然后永不消失的UI节点，即在你 切换任意场景时，此节点都会常驻，并且永不销毁 。这种永不消失的节点可大致分为两种，一种是强制赋予一个永不消失的属性；另一种是常驻内存的根节点/特殊节点，例如主相机节点。

所以我们一般建议把脚本添加到根节点或者主相机节点上，就是如此。

![640 _61_.png](https://s2.loli.net/2023/07/10/YEf8bKyiaNsFG7u.png)

**5**

**目前Poco的支持情况**

<table interlaced="enabled" align="center"><tbody><tr class="ue-table-interlace-color-single"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;">平台</span></strong></span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;">Poco</span></strong></span></td><td width="193" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(0, 0, 0);"><strong><span style="font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;">接入文档</span></strong></span></td></tr><tr class="ue-table-interlace-color-double"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">Android原生应用</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">直接使用</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;">无需接入Poco-SDK</span></td></tr><tr class="ue-table-interlace-color-single"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="font-size: 14px;">Android微信小程序</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">直接使用安卓poco</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;"><a href="https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&amp;mid=2247484464&amp;idx=1&amp;sn=ce3c483a38641034bc601d513d01c36f&amp;scene=21#wechat_redirect" target="_blank" data-linktype="2" style="color: rgb(3, 102, 214);box-sizing: border-box;font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;white-space: normal;">https://mp.weixin.qq.com/s/R02Ac3ZC1B_ND7QVik_Z8Q</a></td></tr><tr class="ue-table-interlace-color-double"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">iOS原生应用</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">直接使用</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;">无需接入Poco-SDK</span></td></tr><tr class="ue-table-interlace-color-single"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">unity3D</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;">https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#unity3d</td></tr><tr class="ue-table-interlace-color-double"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">Cocos2dx-js</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;">https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos2dx-js-beta</td></tr><tr class="ue-table-interlace-color-single"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">Cocos2dx-lua</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;">https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos2dx-lua</td></tr><tr class="ue-table-interlace-color-double"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">Cocos-Creator</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;">https://poco-chinese.readthedocs.io/zh_CN/latest/source/doc/integration.html#cocos-creator</td></tr><tr class="ue-table-interlace-color-single"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">UE4</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;"><a href="https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&amp;mid=2247484258&amp;idx=1&amp;sn=0fec4461bc870077af4e096b494d646a&amp;scene=21#wechat_redirect" target="_blank" data-linktype="2" style="color: rgb(3, 102, 214);box-sizing: border-box;font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;white-space: normal;">https://mp.weixin.qq.com/s/_3TmmFGkgdyIU-JVUFkDWw</a></td></tr><tr class="ue-table-interlace-color-double"><td width="164" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">Egret</span></td><td width="156" valign="middle" align="center" style="word-break: break-all;"><span style="color: rgb(36, 41, 46);font-family: -apple-system, BlinkMacSystemFont, 微软雅黑, &quot;PingFang SC&quot;, Helvetica, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, SimSun, 宋体, Heiti, 黑体, sans-serif;font-size: 14px;text-align: start;">需接入Poco-SDK</span></td><td width="193" valign="middle" align="left" style="word-break: break-all;">https://github.com/AirtestProject/Poco-SDK/tree/master/Egret</td></tr></tbody></table>

  

（呀！这么认真都看到这里啦，评论鼓励一下呗~灰常感谢~）

