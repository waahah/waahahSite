---
title: 测试十九、Airtest接口介绍和示例汇总（下）
date: 2023-01-30 14:58:36
tags: [Python, Airtest, Poco, Test, API]
categories: [Coding, 测试]
---

**前言**

在上一期的 [Airtest接口功能介绍和示例总结](#) 的推文中，我们给大家汇总了以下4个方面的API功能与示例：

*   1.脚本初始化接口
    
*   2.设备连接与使用相关的接口
    
*   3.操作应用相关的接口
    
*   4.常用的模拟操作
    

这周，我们把Airtest剩余的API和设置讲解完：

*   5.断言相关的接口
    
*   6.log记录和报告生成相关的接口
    
*   7.Airtest的一些全局设置
    

  
**5**

  

**断言相关的接口**

##### **1）断言存在：assert\_exists()**

设备屏幕上存在断言目标，需要传入1个断言目标（截图）和在报告上显示的断言步骤信息，示例：

```python
assert_exists(Template(r"tpl1607324047907.png", record_pos=(-0.382, 0.359), resolution=(1080, 1920)), "找到首页的天猫入口")
```

![](https://s2.loli.net/2023/07/10/cl95buLZktDyAro.png)

运行完脚本之后，Airtest报告的 断言步骤会显示我们自定义的信息 ：

![](https://s2.loli.net/2023/07/10/jt9q641d2xs3JNB.png)

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.api.html#airtest.core.api.assert\_exists>

##### **2）断言不存在：assert\_not\_exists()**

设备屏幕上不存在断言目标，与 `assert_exists()` 一样，需要传入1个断言目标（截图）和在报告上显示的断言步骤信息，示例：

```python
assert_not_exists(Template(r"tpl1607325103087.png", record_pos=(-0.005, 0.356), resolution=(1080, 1920)), "当前页不存在天猫国际的icon")
```

![](https://s2.loli.net/2023/07/10/oxLleWZwYjdEiac.png)

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.api.html#airtest.core.api.assert\_not\_exists>

##### **3）断言相等：assert\_equal()**

断言两个值相等，需要传入2个断言的值，还有将被记录在报告中的断言的简短描述：

```python
assert_equal("实际值", "预测值", "请填写断言的简短描述")
```

常与poco获取属性的脚本一起做断言，示例如下：

```python
assert_equal(poco("com.taobao.taobao:id/dx_root").get_text(), "天猫新品", "控件的text属性值为天猫新品")

assert_equal(str(poco(text="天猫新品").attr("enabled")), "True", "控件的enabled属性值为True")
```

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.api.html#airtest.core.api.assert\_equal>

##### **4）断言不相等：assert\_not\_equal()**

断言两个值不相等，与 `assert_equal()` 一样，需要传入2个断言的值，还有将被记录在报告中的断言的简短描述：

```python
assert_not_equal("实际值", "预测值", "请填写断言的简短描述")

assert_not_equal("1", "2", "断言1和2不相等")
```

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.api.html#airtest.core.api.assert\_not\_equal>

PS：如果断言失败，会引起 `AssertionError` ，并且导致脚本停止运行，如需断言失败还继续运行脚本，同学们 可以使用 `try-except` 等语句捕捉 `AssertionError` 。

更多断言的教程推荐查看我们的往期推文：[测试同学都应该知道的断言知识...](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484318&idx=1&sn=4f7dcb1ad6bd0f057225db7cd0481466&scene=21#wechat_redirect)

  

**6**

  

**log记录和报告生成相关的接口**

  

##### **1）log记录：log()**

`log()` 接口方便插入用户自定义的一些log信息，将会被显示在Airtest报告中。在1.1.6版本的Airtest中，log接口支持传入4个参数：

*   `args` ，可以是字符串、非字符串或者 `traceback` 对象；
    
*   `timestamp` ，用于自定义当前log的时间戳；
    
*   `desc` ，用于自定义log的标题；
    
*   `snapshot` ，表示 是否需要截取一张当前的屏幕图像并显示到报告中 
    

示例如下：

```python
# 传入字符串
log("123",desc="这是标题01")

# 传入非字符串
data = {"test": 123, "time": 123456}
log(data,desc="这是标题02")

# 传入traceback
try:
    1/0
except Exception as e:
    log(e, desc="这是标题03")
```

![640 _26_.png](https://s2.loli.net/2023/07/10/AqaYPwGEf16jhFi.png)

![640 _27_.png](https://s2.loli.net/2023/07/10/GY2f8uAHbrzdja9.png)

![640 _28_.png](https://s2.loli.net/2023/07/10/AFdN5xa2KzMZWPr.png)

注意，如果不传入 `timestamp` 的话，默认记录当前时间：

```python
# 记录timestamp，并且对当前画面截图
log("123", timestamp=time.time(), desc="这是标题04", snapshot=True)
```

![](https://s2.loli.net/2023/07/10/MWnj7UHkbdq2Epo.png)

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.helper.html?highlight=log#airtest.core.helper.log>

##### **2）报告生成：simple\_report()**

生成报告的简单接口，用户只需要在脚本中调用这个接口，然后传入几个必要的报告参数，就能够在脚本运行完毕之后，按照要求自动生成Airtest报告：

```python
simple_report(filepath, logpath=True, logfile='log.txt', output='log.html')
```

其中可传入的4个参数分别表示：

*   `filepath`，脚本文件的路径，可以直接传入变量 `__file__`
    
*   `logpath` ，log内容所在路径，如为 `True` ，则默认去当前脚本所在路径找log内容
    
*   `logfile` ，log.txt的文件路径
    
*   `output` ，报告的到处路径，必须以 `.html` 结尾
    

示例如下：

```python
from airtest.report.report import simple_report
auto_setup(__file__, logdir=True)

# 此处省略N条用例脚本

simple_report(__file__,logpath=True,logfile=r"D:\test\1234.air\log\log.txt",output=r"D:\test\1234.air\log\log1234.html")
```

![](https://s2.loli.net/2023/07/10/Ze8GlM3Scdr2qXF.png)

另外需要注意的是，我们 要在用例脚本之后调用这个生成报告的接口 ，如在脚本开头调用，则意味着还没有运行后面的用例步骤，就已经生成了一份报告，最终不论我们脚本运行情况如何，我们都只能拿到一份空的测试报告。

接口的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.report.report.html#airtest.report.report.simple\_report>

##### **3）报告生成：logtohtml()**

报告的基类，实际上我们刚才介绍的 `simple_report` 也是用这个类实现的，只不过 `simple_report`的参数更少，用法更加简单：

```python
class LogToHtml(script_root, log_root='', static_root='', export_dir=None, script_name='', logfile='log.txt', lang='en', plugins=None)
```

可以看到， `logtohtml` 类可以传入的参数非常多，用法相对复杂一些：

*   `script_root` ，脚本路径
    
*   `log_root` ，log文件的路径
    
*   `static_root` ，部署静态资源的服务器路径
    
*   `export_dir` ，导出报告的存放路径
    
*   `script_name` ，脚本名称
    
*   `logfile` ，log文件log.txt的路径
    
*   `lang` ，报告的语言（中文：zh；英文：en）
    
*   `plugins` ，插件，使用了poco或者airtest-selenium会用到
    

使用 `logtohtml` 生成测试报告时，我们一般先实例化一个 `logtohtml` 对象，然后用这个对象调用类方法 `report()` 生成报告，示例如下：

```python
from airtest.report.report import LogToHtml

# 此处省略N条用例脚本

h1 = LogToHtml(script_root=r'D:\test\1234.air', log_root=r"D:\test\1234.air\log", export_dir=r"D:\test\1234.air" ,logfile=r'D:\test\1234.air\log\log.txt', lang='en', plugins=["poco.utils.airtest.report"])
h1.report()
```

![](https://s2.loli.net/2023/07/10/jvweOqRmHQphBZW.png)

`LogToHtml` 类的API文档链接：<https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.report.report.html#airtest.report.report.LogToHtml>

PS：如需查看命令行生成报告和使用脚本生成报告的详细教程，推荐阅读文章 [Airtest报告“全攻略”，看完直接用脚本生成、导出报告，真香！](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247485113&idx=1&sn=b065e6bb83fef6be517c92d044c5ca16&chksm=f97ce6bace0b6fac58da0994393ce73c2bcad9fd8b7bba1ad606c22efa77326c2aaa3f190744&token=914082035&lang=zh_CN&scene=21#wechat_redirect)

  

**7**


**Airtest的一些全局设置**


Airtest的设置模块详见文档：https://airtest.readthedocs.io/zh\_CN/latest/all\_module/airtest.core.settings.html?highlight=settings#airtest.core.settings.Settings

##### **1）log内容的设置：LOGFILE、LOGDIR**

`LOGFILE` 用于自定义记录log内容的txt文档的名称；`LOGDIR` 用于自定义log内容的保存路径，示例如下：

```python
from airtest.core.settings import Settings as ST
from airtest.core.helper import set_logdir

ST.LOG_FILE = "log123.txt"
set_logdir(r'D:\test\1234.air\logs')

auto_setup(__file__)

# 此处省略N条用例脚本
```

![](https://s2.loli.net/2023/07/10/DtnfXhTxuVHp3IQ.png)

##### **2）图像识别算法的设置：CVSTRATEGY**

`CVSTRATEGY` 用于 设置Airtest的图像识别算法，默认情况下 `CVSTRATEGY = ["surf", "tpl", "brisk"]` ，每次查找图片的时候，airtest就会按照这个设置好的算法顺序去执行，直到找出一个符合设定阈值的识别结果，或者是一直按照这个算法顺序循环查找，直到超时。

我们可以自定义Airtest的图像识别算法，示例如下：

```python
from airtest.core.settings import Settings as ST

ST.CVSTRATEGY = ["tpl", "sift","brisk"]
```

PS：关于Airtest各个图像识别算法的介绍，推荐阅读文章[3分钟教会你选择合适的图像识别算法](https://mp.weixin.qq.com/s?__biz=MzUxMDc4NTkwMA==&mid=2247484068&idx=1&sn=8037c1ddec46ec26f2a8eff8b2252d2d&chksm=f97ce2a7ce0b6bb1512451367dceb85eca1073050fb9c3ce06503ebc9db8f10c2f8efc0d1506&token=914082035&lang=zh_CN&scene=21#wechat_redirect)

##### **3）图像阙值：THRESHOLD、THRESHOLD\_STRICT**

`THRESHOLD` 和 `THRESHOLD_STRICT` 都是图像识别的阙值，Airtest1.1.6版本之后，所有用到了图像识别的接口，都是用 `THRESHOLD` 作为阙值。它的默认值为0.7，取值范围\[0,1\]。

在进行图像匹配时，只有 当识别结果的可信度大于阙值时，才认为找到了匹配的结果：

![](https://s2.loli.net/2023/07/10/quYnhjDAfcVgGOJ.png)

除了可以修改全局的图像识别阙值，我们还支持修改单张图片的阙值，需要注意的是，如我们没有单独设置图像的阙值，将默认使用全局阙值 `THRESHOLD` ，示例如下：

```python
from airtest.core.settings import Settings as ST

# 设置全局阙值为0.8
ST.THRESHOLD = 0.8

# 设置单张图片的阙值为0.9
touch(Template(r"tpl1607424190850.png", threshold=0.9, record_pos=(-0.394, -0.176), resolution=(1080, 1920)))
```

在Airtest1.1.6之前， `assert_exists` 使用的图像阙值 是 `THRESHOLD_STRICT` 。所以使用1.1.6之前版本的同学，想要修改 `assert_exists` 的图像阙值，需要设置 `THRESHOLD_STRICT` 的值。

##### **4）查询的超时时长：FIND\_TIMEOUT、FIND\_TIMEOUT\_TMP**

上面我们提到，在进行图像匹配时，会循环用几个算法去识别，但是循环识别并不是无限的，这里有一个查询的超时时长设置，一旦查询时间大于超时时长，还是未找到可信度大于阙值的结果，那就认定此次匹配失败，默认的超时时长如下：

```ini
FIND_TIMEOUT = 20
FIND_TIMEOUT_TMP = 3
```

使用 `FIND_TIMEOUT` 作为超时时长的接口有很多，比如：`assert_exists()`、`touch()`、`wait()`、`swipe()` 等。

而使用 `FIND_TIMEOUT_TMP` 作为超时时长的接口则比较少，比如：`assert_not_exists()`、`exists()` 等。

与阙值类似，我们既可以修改全局的超时时长，也可以设置单条语句的超时时长，示例如下：

```python
from airtest.core.settings import Settings as ST

# 设置全局的超时时长为60s
ST.FIND_TIMEOUT = 60
ST.FIND_TIMEOUT_TMP = 60

# 设置单条wait语句的超时时长
wait(Template(r"tpl1607425650104.png", record_pos=(-0.044, -0.177), resolution=(1080, 1920)),timeout=120)
```

##### **5）项目根目录：PROJECT\_ROOT**

项目根目录常用于调用其它 `.air` 脚本时，示例如下：

```python
from airtest.core.settings import Settings as ST

# PROJECT_ROOT需要填写绝对路径
ST.PROJECT_ROOT = "D:/test/user/project"
using("test1.air")
using("test2.air")

# 如不设置项目根目录，我们可能要这么调用test1.air、test2.air
using("D:/test/user/project/test1.air")
using("D:/test/user/project/test2.air")
```

另外，上节课我们介绍的 `auto_setup()` 接口也可以传入项目根目录：

```python
auto_setup(__file__, project_root="D:/test/user/project")
```

##### **6）截图压缩精度：SNAPSHOT\_QUALITY**

`SNAPSHOT_QUALITY` 用于设置全局的截图压缩精度，需要注意的是，设置的是Airtest报告里面显示的截图精度，而不是我们的截图脚本截取的那张图片的精度。默认值为10，取值范围\[1,100\]，数值越高，截图的精度越高，越清晰。示例如下：

```python
from airtest.core.settings import Settings as ST

# 设置全局的截图精度为90
ST.SNAPSHOT_QUALITY = 90
```

另外我们还可以定义单张截图的压缩精度，示例：

```python
# 设置单张截图的压缩精度为90，其余未设置的将按照全局压缩精度来
snapshot(quality=90)
```

##### **7）截图尺寸大小：IMAGE\_MAXSIZE**

在Airtest1.1.6中，新增了一个用于指定截图最大尺寸的设置：`ST.IMAGE_MAXSIZE` 。假如设置为1200，则最后保存的截图长宽都不会超过1200，有利于进一步缩小截图的图片尺寸。示例：

```python
from airtest.core.settings import Settings as ST

# 设置全局截图尺寸不超过600*600，如果不设置，默认为原图尺寸
ST.IMAGE_MAXSIZE = 600

# 不单独设置的情况下，默认采用ST中的全局变量的数值，即600*600
snapshot(msg="test12")
# 设置单张截图的最大尺寸不超过1200*1200
snapshot(filename="test2.png", msg="test02", quality=90, max_size=1200)
```

（呀！这么认真都看到这里啦，评论一下呗~灰常感谢~）
