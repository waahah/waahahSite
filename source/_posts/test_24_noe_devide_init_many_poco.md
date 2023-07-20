---
title: 测试二十四、单设备初始化多个poco与多设备初始化poco示例
date: 2023-02-10 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

Poco初始化这一块的内容，一直以来都是同学们非常容易出现问题的地方，所以今天我们单独把这部分的内容拎出来跟大家讲解一下，希望能减少大家对这块内容的疑惑。

### **1\. 如何初始化不同的poco**

首先我们都知道，Poco的类型分为很多种，那我们在实际测试过程中，该如何区分我们究竟要使用哪种Poco模式呢？

![](https://s2.loli.net/2023/07/10/wUAbmZfgcxEKDyO.png)

#### **1）unity poco：Unity3D游戏专用**

游戏都是由各种引擎开发的，unity引擎开发出来的游戏，我们测试时就要使用unity poco。不论是这个unity游戏被打成了ios包还是Android包，又或者Windows端的unity游戏，嵌入Poco-SDK后，都应该选择unity poco来测试该游戏应用：

```python
# unity3D游戏的poco初始化脚本
from poco.drivers.unity3d import UnityPoco
poco = UnityPoco()
```

特别注意，游戏应用的Poco初始化，都应该放在游戏启动之后才能进行！！！ （游戏启动之后，之前嵌入到游戏里面的poco服务才会启动，此时才能够初始化我们的游戏poco，获取游戏控件信息）

#### **2）UE4 poco：UE4游戏专用**

同unity游戏，UE4引擎开发的产品，我们可以使用 UE4 poco来进行初始化：

```python
# UE4游戏的poco初始化脚本
from poco.drivers.ue4 import UE4Poco
poco = UE4Poco()
```

#### **3）Cocos-lua poco：Cocos2dx-lua游戏专用**

```python
# UE4游戏的poco初始化脚本
from poco.drivers.ue4 import UE4Poco
poco = UE4Poco()
```

#### **4）Cocos-js poco：Cocos2dx-js和Cocos-Creator游戏使用**

```python
# Cocos2dx-js和Cocos-Creator游戏的poco初始化脚本
from poco.drivers.cocosjs import CocosJsPoco
poco = CocosJsPoco()
```

#### **5）Android poco：Android原生应用专用**

```python
# Android原生应用的初始化脚本
from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)
```

特别注意，Android原生应用的初始化，应该放在Android设备连接之后！！！（并且该设备已经完成开机启动，即Android系统正常运行状态下）

#### **6）iOS poco：iOS原生应用专用**

```python
# iOS原生应用的初始化脚本
from poco.drivers.ios import iosPoco
poco = iosPoco()
```

同Android设备，iOS原生应用的初始化，应该放在ios设备连接之后！！！（且设备的iOS系统是在正常运行的状态下）

#### **7）QT poco**

暂未启用，后续会更新~

#### **8）Std-broker poco：白鹭（Egret）引擎专用**

```python
# 白鹭引擎的poco初始化脚本
from poco.drivers.std import StdPoco
from poco.utils.device import VirtualDevice
poco = StdPoco(15004, VirtualDevice('localhost'))
```

### **2\. 单设备初始化多个poco**

相信大家经常遇到这种情况，我们需要测试1台Android设备上面的应用，这上面既有Android的原生应用，也有各种游戏应用，当我们从原生应用的操作，切换到游戏应用的操作时，就涉及在这一台设备上，进行多个poco的初始化操作，示例如下：

![](https://s2.loli.net/2023/07/10/lZ79A2L3s1hDUQu.gif)

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *
auto_setup(__file__)

# 初始化Android poco
from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)

poco(text="poco").click()

sleep(5.0)

# 初始化unity poco
from poco.drivers.unity3d import UnityPoco
poco = UnityPoco()

poco("btn_start").click()

sleep(2.0)

keyevent("HOME")
```

当然，为了区分不同的poco，我们也可以在初始化的时候给poco设置不一样的变量名，比如：

```python
from poco.drivers.unity3d import UnityPoco
unity_poco = UnityPoco()

unity_poco("btn_start").click()
```

另外，我们在测试游戏的时候，也会经常遇到某些输入框并不是游戏控件，而是Android原生控件的情况，常见于游戏的账号登录，或者其它输入框等；这时候也需要实时切换我们所使用的poco模式：

![640 _16_.gif](https://s2.loli.net/2023/07/10/gLTbAKQslri5M7z.gif)

```
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *
auto_setup(__file__)

from poco.drivers.unity3d import UnityPoco
unity_poco = UnityPoco()

unity_poco("Placeholder").click()

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
android_poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)

android_poco("android.widget.EditText").set_text("hei输入输入")

android_poco("android.widget.Button").click()

sleep(1.0)

unity_poco("star_single").long_click()
```

### **3\. 多设备初始化poco**

如在1个脚本中，涉及多台设备切换，则我们需要在切换设备之后，给新的设备也初始化对应的poco，然后再进行该设备的poco操作：

![](https://s2.loli.net/2023/07/10/4zFGBqcJ9tODN38.png)

### **4\. 进行poco初始化的时机**

#### **1）Android和iOS原生应用的poco**

Android和iOS的原生poco，初始化脚本都应放置在设备连接脚本之后，即 `auto_setup` 接口、或者是其它设备连接接口之后：

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *

# auto_setup为脚本初始化接口，不填入设备参数则默认取本地连接的第一台设备
auto_setup(__file__)

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)
```

#### **2）游戏对应的poco**

游戏poco的初始化脚本应放置在游戏应用启动之后，且游戏启动之前需要先连接上我们的待测设备，所以整体顺序如下：

```python
# -*- encoding=utf8 -*-
__author__ = "AirtestProject"

from airtest.core.api import *

# auto_setup为脚本初始化接口，不填入设备参数则默认取本地连接的第一台设备
auto_setup(__file__)

from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(use_airtest_input=True, screenshot_each_action=False)
```

### **5\. pocoservice频繁重启的解决办法**

#### **1）关闭各种网络代理**

如果开了网络代理的话，需要先 关闭各种代理和VPN ，否则可能会影响到poco通讯。

#### **2）部分Android手机的设置问题**

检查手机助手内是否对 `pocoservice.apk` 做了限制，例如在某版本的华为手机中需要开启 **允许自启动** 和 **允许后台活动** ,部分一加手机要把 `pocoservice.apk` 的 **电池优化** 关掉，详情可以参考 “Android连接常见问题” 的文档 （https://airtest.doc.io.netease.com/IDEdocs/device\_connection/2\_android\_faq/#2）。

#### **3）不能和uiautomator同时启动**

不能和uiautomator同时启动，否则会相互冲突。

#### **4）可以尝试重启**

可以尝试 重启手机 看看是否会恢复。

  

**小结**

关于Poco的初始化内容就讲到这里啦

