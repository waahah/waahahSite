---
title: 测试九、如何生产兼容性强的自动化测试脚本
date: 2023-01-10 14:58:36
tags: [Python, Airtest, Poco, Test]
categories: [Coding, 测试]
---

九、如何生产兼容性强的自动化测试脚本[¶](about:blank#_1 "Permanent link")
======================================================

在阅读本教程前，请确保先阅读[Airtest+Poco快速上手教程](#)。

1\. 前言[¶](about:blank#1 "Permanent link")
-----------------------------------------

通过阅读本小节教程，你将了解以下内容：  
\- 如何选择Airtest/Poco  
\- 提高截图脚本的兼容性  
\- 提升脚本运行速度  
\- 如何快速验证脚本兼容性

2\. 如何选择Airtest/Poco[¶](about:blank#2-airtestpoco "Permanent link")
-------------------------------------------------------------------

在测试脚本中，我们可以同时使用图像脚本(Airtest)和UI脚本(Poco)。相比于图像脚本，UI脚本更加精确、运行速度更快、迭代成本更低。我们在撰写脚本时，应该如何使用这两种类型的脚本呢？

这与待测应用的类型有关：  
\- **原生app：**  
\- 建议直接使用Poco的UI脚本，在必要的界面判断时用Airtest的图像脚本。  
\- **游戏：**

```
 - 已集成[poco-SDK](https://poco.readthedocs.io/zh_CN/latest/source/README.html#sdk-integration)，使用Poco的UI脚本，必要界面使用图像脚本   
 - 暂时无法集成SDK，使用图像脚本。

```

3\. 如何提升截图脚本兼容性[¶](about:blank#3 "Permanent link")
--------------------------------------------------

#### 1）截图脚本常见的问题情景[¶](about:blank#1_1 "Permanent link")

在脚本测试的过程中，有时候我们会遇到下面这些情况：

##### ① 更换分辨率识别失败[¶](about:blank#1_2 "Permanent link")

之前写好的截图脚本在更换一台不同分辨率的手机/更换一个环境之后，就经常遇到执行失败的报错：  
![](https://s2.loli.net/2023/07/10/JadmqN2yxlOiezV.png)
报错的文字版本是：

```cmd
airtest.core.error.TargetNotFoundError: 'Picture Template(E:\\test\\pycli\\untitled7.air\\tpl1570692325989.png) not found in screen'

```

这是因为图像识别具有一定的误差，在不同分辨率的设备上，或是画面发生了一定变化的情况下，可能会造成图像识别效果不如预期的情况。我们可以尝试各种方法修改截图，来获得更高的截图识别成功率。

##### ② 运行通过但识别到错误的位置[¶](about:blank#2 "Permanent link")

运行后查看报告，发现识别出来的位置是一个错误的位置，但是airtest当做是正确的。这种情况下，就需要通过调整截图、调整阈值之类的手段来修改脚本。

##### ③ 点击了正确位置但无点击效果[¶](about:blank#3_1 "Permanent link")

运行后查看报告，报告里能看到识别到了正确的位置，也点击成功了，但是实际上没有成功点到。  
![](https://s2.loli.net/2023/07/10/q9h64r3FQaVyBXt.png)

这是因为在脚本编写过程中，如果有连续点击操作，屏幕内容可能会不断变化，有时候会导致脚本明明运行到了点击操作却发现没有生效的情况。这是因为屏幕内容切换速度过快，界面还未稳定的同时airtest就进行了元素识别和操作，导致没有成功点击到对应元素。  
因此我们通常建议，在一些操作步骤结束后，适当等待一个合适的时间再进行下一步操作，例如:

```python
from airtest.core.api import *
start_app("test_package")
sleep(5)
touch([500, 500])
sleep(1)
touch([600, 0])

```

#### 2）图像识别算法[¶](about:blank#2_1 "Permanent link")

##### ① Airtest所用的图像识别算法[¶](about:blank#1-airtest "Permanent link")

默认情况下，Airtest会尝试用 `SURFMatching` 、`TemplateMatching` 和 `BRISKMatching` 这三种算法来进行图像识别。

Airtest1.2.0及以上版本，新增了一个 `MultiScaleTemplateMatchingPre` 算法：

![](https://s2.loli.net/2023/07/10/GWvIORVxzoujhs7.png)

所以没有额外指定算法的情况下，超时之前Airtest都会轮流使用这几个图像识别算法来进行识别。

##### ② 程序如何判定图像识别成功[¶](about:blank#2_2 "Permanent link")

那么程序是如何判定图像识别成功/失败的呢？这里先介绍两个很重要的名词：**阙值**`threshold` 和 **可信度**`confidence` ，他们的取值范围都是\[0,1\]。在每一条图像识别的脚本中，都会有1个用于结果筛选的阙值，默认值为0.7。

![](https://s2.loli.net/2023/07/10/a9dvm5ioeFIHWOn.png)

可信度呢，就是上述几个图像识别算法识别结果的 `confidence`：

![confidence.png](https://s2.loli.net/2023/07/10/fdei6YvXBbCNqJP.png)

我们可以这样理解，在一定的超时时长之内，Airtest会按照一定的顺序，轮流使用上述4个算法来进行图像识别，如果算法识别到的结果可信度大于图像脚本设置的阙值，则图像识别成功，结束识别过程；要是在超时时长之内，4个算法一直没有找到可信度大于阙值的结果，那么程序则认定此次找图失败。

##### ③ 如何在log上查看图像识别结果[¶](about:blank#3-log "Permanent link")

通常情况下，图像识别失败，程序会报错 `airtest.core.error.TargetNotFoundError: 'Picture Template(D:\\test\\taikang_test.air\\tpl1629971466235.png) not found in screen'` ，那此时我们可以在log里面查看这张截图识别的具体结果如何，主要看阙值多少，各个算法找出来结果的可信度多少，可以帮助我们判断，是不是我们阙值设置太高了？还是图像没截好，可信度过低？

![match_result.png](https://s2.loli.net/2023/07/10/IS9LTGoyWNnVCDH.png)

#### 3）提升截图脚本兼容性的方法[¶](about:blank#3_2 "Permanent link")

##### ① 截图避免混入过多背景[¶](about:blank#1_3 "Permanent link")

截图时尽量保证截取的图像辨识度高、独立清晰 ，例如截取一个按钮图像时，尽量不要带上太多的嘈杂背景图案，避免在背景变化后难以成功识别的问题。  
这样干净的截图：![16.png](https://s2.loli.net/2023/07/10/YGWbPV4UShujwME.png)会比这样的截图好：![17.png](https://s2.loli.net/2023/07/10/dfJoR5cZs1T3Mpi.png)。

##### ② 减少纯文字的截图脚本[¶](about:blank#2_3 "Permanent link")

图像识别使用的算法更适合用来识别按钮类（带边框）、图标类的图像 ，仅仅单独截取几个文字的识别成功率很低，请尽量调整图片截取内容来达到较好的识别效果，避免截取识别效果较差的内容。

这样带边框的截图：![button.png](https://s2.loli.net/2023/07/10/vCxi98w6dJHbLNB.png)会比纯文字截图好：![word.png](https://s2.loli.net/2023/07/10/2DCyikURqBWlXut.png)。

##### ③ 巧妙扩大截图范围增加特征点[¶](about:blank#3_3 "Permanent link")

纯文字截图有可能识别效果不佳，在我们眼中也许每一个图标上面的文字是不一样的，然而在Airtest的眼中它们实在是太相似了。我们可以尝试修改截图，借助一些其他的背景样式，修改成辨识度更高的图片。

例如对于这样子的界面：  
![3_screenshot01.png](https://s2.loli.net/2023/07/10/4XQx6CDmIi3BObV.png)

我需要点击中间第二个【安装】按钮。如果直接截图![4_screenshot02.png](https://s2.loli.net/2023/07/10/KspmPXAbYZQazWL.png)可能根本点击不到，或者点击到错误的按钮。  
但是如果我们换一种方式，截取拥有更多特征的图片：  
![5_screenshot03.png](https://s2.loli.net/2023/07/10/zyNW87EM4KVGACn.png)，返回的结果则会是正确的。因为Airtest默认点击的是我们截图的中间位置，所以这样截图正好可以实现点击第二个【安装】按钮的效果。[下文](about:blank#7-traget_pos)我们还可以通过设置点击位置 `target_pos` ，来实现第一个或第三个【安装】按钮的点击。

##### ④ 不能完全依赖录制的截图脚本[¶](about:blank#4 "Permanent link")

尽管我们提供了便捷的自动录制功能，能够直接将当前所有操作一步一步转换成代码，但是这种情况下自动截取的图片往往不太理想，需要手工再对截图进行调整。下图是使用自动录制功能截出来的图片，可以看出截图的特征并不那么明显。  
![](https://s2.loli.net/2023/07/10/7r6xTCzdhPYoIjW.png)

如果录制出来的截图脚本不能很好满足我们的需求时，我们需要尝试自己手工截取特征更加明显的截图。

##### ⑤ 合理调整阙值[¶](about:blank#5 "Permanent link")

在每行图像识别脚本运行的时候，包含三个步骤：① 图像识别的初步识别结果；② 计算结果可信度；③ 通过脚本中的阈值筛选结果。  
![](https://s2.loli.net/2023/07/10/ngaGXhSuH4dtVAz.png)

脚本中的阈值`threshold`在这里起到结果筛选的作用，阈值的高低将直接影响到返回的识别结果：  
阈值过高：可能导致把低可信度的初始结果全部过滤掉，最终没有有效的图像识别结果。  
阈值过低：可能导致返回的是错误结果（没有正确识别结果的情况，因为阈值过低使得错误结果得以通过筛选）。  
我们在提升图像脚本兼容性的时候，最重要的一个部分就是设置合理的阈值。Airtest框架中的[默认识别阈值为0.7](https://github.com/AirtestProject/Airtest/blob/21583da2698a601cd632228228fc16d41f60a517/airtest/core/settings.py#L14)，我们可以进行适当调整。

**使用“图像编辑器”调整单行脚本阈值**

我们一般使用“图片编辑器”修改阈值。在脚本框中双击图片打开“图片编辑器”，我们可以实时调节右侧的 `threshold` 阈值数值，并点击Snapshot + Recognition按钮来实时验证识别结果。识别结果的可信度会直接呈现在下方状态栏上，可信度`confidence`大于阈值时才会返回识别结果：  
![](https://s2.loli.net/2023/07/10/fJp2TIGsnC6FBjK.png)
**注意：** 建议阈值设定在\[0.6, 0.9\]之间，避免阈值过低混入错误结果、或者阈值过高导致经常找不到结果。

**设置脚本的全局阈值**

如果我们想直接为整个测试脚本的图像脚本设置阈值，则可以在脚本开头时进行全局阈值的设置：

```python
# 全局阈值的范围为[0, 1]
from airtest.core.setting import Settings as ST
ST.THRESHOLD_STRICT = 0.7  # assert_exists语句的默认阈值，一般比THRESHOLD更高一些
ST.THRESHOLD = 0.7  # 其他语句的默认阈值

```

##### ⑥ 开启rgb彩色识别[¶](about:blank#6-rgb "Permanent link")

在识别图像时，Airtest会先将图像转为灰度图再进行识别。因此假如有两个按钮，形状内容相同，只有颜色不同的情况下，Airtest将认为它们都是相同内容。如下图，如果仅截图第二个红色的【删除】按钮，Airtest会把另外俩个灰黑色的【删除】按钮认为是相同的。
![](https://s2.loli.net/2023/07/10/3967P2MW8RUCpvl.png)
通过勾选rgb选项（双击图片打开图片管理器勾选)，或在代码中加入rgb=True，我们可以强制指定使用彩色图像进行识别。这样就能比较好地识别出那个红色的【删除】按钮了。

![rgb.png](https://s2.loli.net/2023/07/10/WF1jhY6POAm4fQt.png)

```python
touch(Template(r"tpl1629971466235.png", rgb=True, record_pos=(-0.254, -0.238), resolution=(1022, 673)))

```

##### ⑦ 设置点击位置traget\_pos来进行点击[¶](about:blank#7-traget_pos "Permanent link")

当识别出一张图像后，Airtest将会默认去点击图像的正中心位置，有时我们希望它识别出图片后点击其他位置，就可以通过修改 `target_pos` 属性来实现。  
例如：  
![18.png](https://s2.loli.net/2023/07/10/XM2CaQrScJmsHut.png)

在上图中，我们希望点击中间选项的“升级”按钮，不希望点到别的选项去，而只截出升级按钮不能满足我们的需求。

此时我们可以考虑将截图范围扩大到红色虚线框选的区域，截图后将这张方形图片视为一个九宫格，方框上的每一个暗色红点都代表一个数字，将希望被点击的位置设置为 `target_pos` 的值即可。在这个例子中，我们可以让截图区域的底部正好放在“升级”按钮上，然后设置 `target_pos=8` 即可正好点击到该按钮。

`target_pos` 取值范围是1~9，\[1, 9\]，且必须为整数，默认值是5（图像正中心）。同理，[上文](about:blank#3_3)的安装按钮的例子，也可以通过设置 `target_pos` 来识别第一个和第三个按钮：  
![](https://s2.loli.net/2023/07/10/6rONoJxs92FYc3q.png)

##### ⑧ 自定义语句提高图像脚本兼容性[¶](about:blank#8 "Permanent link")

对于设备长宽比不同、设备分辨率不同、多种字体的情况，我们可以通过语法来提高兼容性。这种方式需要连接上脚本兼容性有问题的设备，把对应截图纳入搜索列表。代码脚本如下：

```python
picList = [pic1,pic2,pic3]  # 截图的图片对象列表
for pic in picList:
     pos = exists(pic)
     if pos:
         touch(pos)
         break  # 只要找到图片列表中的任何一张图片，就执行touch

```

**注意**：如果`for`循环中没有`break`语句，会导致次逻辑运行时将所有的图片都找一遍(找到后执行`touch`)，而非找到合适结果立即返回。

##### ⑨ 指定游戏的分辨率适配规则[¶](about:blank#9 "Permanent link")

在使用不同分辨率的设备进行图像识别时，可能会导致识别成功率不佳，因此Airtest提供了默认的分辨率适配规则（使用的是[Cocos引擎的默认缩放规则](http://docs.cocos.com/creator/manual/zh/ui/multi-resolution.html)），[代码](https://github.com/AirtestProject/Airtest/blob/73618beb07acf5c6b9b9704575a6bd1561c7c2db/airtest/utils/resolution.py#L11)在这里。

想要提高2d游戏的识别精度，最好的办法就是明确指定你的游戏的分辨率适配规则，例如，直接在 `.air` 脚本文件的开头这样写：

```python
from airtest.core.api import *

def custom_resize_method(w, h, sch_resolution, src_resolution):
    return int(w), int(h)

# 替换默认的RESIZE_METHOD
ST.RESIZE_METHOD = custom_resize_method

```

上面的代码指定了一个自定义的缩放规则：直接return原来的值，不管屏幕分辨率，所有UI都不进行缩放（有的游戏就是这种策略）。

这里的`RESIZE_METHOD`，即我们定义的`custom_resize_method`使用的输入参数为：

*   w, h # 录制下来的UI图片的宽高
*   sch\_resolution # 录制时的屏幕分辨率
*   src\_resolution # 回放时的屏幕分辨率

输出为： - 回放时的UI图片宽高

若要自定义你的`RESIZE_METHOD`，只需要知道你测试的游戏的缩放规则，然后在`custom_resize_method`中用代码实现即可。这样做，能够大大提升不同分辨率设备下的图像识别成功率。

##### ⑩ 拓展阅读[¶](about:blank#10 "Permanent link")

Airtest采用的多种图像识别算法的效果比较，可以参考[这里](https://github.com/AirtestProject/Airtest/blob/master/benchmark/README_cn.md)。

4\. 部分场景下的便捷操作[¶](about:blank#4_1 "Permanent link")
---------------------------------------------------

在部分场景下，通过一些替代性操作（比如直接操作坐标、使用按钮指令、记忆元素位置等），可以省去对图像识别的兼容性调试，甚至可以加快脚本执行速度。

#### 1）操作坐标[¶](about:blank#1_4 "Permanent link")

##### ① 操作坐标案例一：过场动画[¶](about:blank#1_5 "Permanent link")

比如过场动画会很慢，我们可以选择跳过，这时就可以使用坐标进行设备操作。如下图的游戏过场动画：
![9_cutscene.png](https://s2.loli.net/2023/07/10/9rle8NZ4naJDBUX.png)

```python
# perform a simple click
touch([10, 10])

```

##### ② 操作坐标案例二：App介绍页[¶](about:blank#2-app "Permanent link")

在考拉app打开后，有4个介绍页滑动后才能进去。如果通过airtest/poco的UI测试语句，需要运行半天。而通过直接使用固定坐标位置滑动，执行四下即可。要注意的是，这里坐标脚本的连续运行操作得太快，设备甚至有可能会反应不过来，一般每行语句后面需要加一下`sleep(1.0)`,等待一下设备响应。
![10_aap_introduse.png](https://s2.loli.net/2023/07/10/jtE2DBwKRNGT4lY.png)

如果这种情形非常多的话，可以封装成通用的函数，用到的时候调用一下即可。 省代码+快速~

```python
# get the device width & height
width, height = device().get_current_resolution()
# cal swipe (start/end) point coordinate
start_pt = (width * 0.9, height / 2)
end_pt = (width * 0.1, height / 2)
# swipe for 5 times:
for i in range(5):
    swipe(start_pt, end_pt)
    sleep(1)  # wait for the device's response

```

#### 2）使用手机按键指令[¶](about:blank#2_4 "Permanent link")

![11_return_key.png](https://s2.loli.net/2023/07/10/Xj1Yy3vdWx9RLPm.png)

很多情况下，BACK按钮可以进行灵活使用。经常在点开一个页面，想返回上一个页面时，可以选择按UI按钮，但是一般`keyevent(“BACK”)`也可以达到目的，简单直接-兼容性又好。

#### 3）位置记忆[¶](about:blank#3_4 "Permanent link")

    还有一些特殊的情形，比如炉石中，敌我双方的英雄位置是固定的，每次攻击敌方英雄的时候都需要用到这个位置。 可以考虑全局保存位置，之后需要使用的时候直接调用对应位置就行了。 ![image](https://airtest.doc.io.netease.com/img_9/12_wait.png) 上图中需要注意的是，需要使用`wait`语句来等待获取到英雄位置，而不是`exists`。因为这里一定是需要拿到对应英雄的位置，需要等待其出现（不出现直接触发报错），而`exists`语句如果没有英雄出现不会报错。

![](https://s2.loli.net/2023/07/10/l8y3BVJcmCFDozk.png)

上图中，需要随时使用随从攻击对方英雄时，直接将随从图片`swipe`至地方英雄的位置就可以了。

#### 4）start\_app(包名)替换touch(应用图标)[¶](about:blank#4start_apptouch "Permanent link")

`start_app()` 支持Android和iOS设备，相对用截图脚本来启动应用，脚本会更加简洁，兼容性也会更好：

```python
# 打开网易云音乐
start_app("com.netease.cloudmusic")

```

#### 5）画面切换的时候，可以多使用wait或者sleep[¶](about:blank#5waitsleep "Permanent link")

很多新手同学都很容易犯1个错误，就是一不小心就写了很多连续点击操作；其实在每一个点击操作之后，应用画面也是在实时变化的。如果画面正在加载的时候，下一个点击操作就被执行了，就会很容易导致识别到错误位置或者识别超时。

举个例子，进入网易云音乐的app时，我们同意了服务条款之后，会有1个很长的启动动画，我们只有等待启动动画结束之后，才能够进行下一步的点击 “立即体验” 的操作，否则这个点击操作很可能因为在等待启动动画的过程中而识别超时：

![wait.png](https://s2.loli.net/2023/07/10/FtD7uhQw52lryXT.png)

#### 6）适当借助Poco脚本[¶](about:blank#6poco "Permanent link")

如果同学们测试的项目可以使用poco框架，建议大家在自动化脚本的时候，可以灵活混用Airtest和Poco脚本，以帮助同学们的脚本达成更好的兼容性：

举个例子，在网易云音乐的某个歌单中，想选择前10首歌曲，如果用截图脚本的话，需要编写10条截图脚本，但如果用poco框架的话，仅需要几行遍历节点的脚本（以选择前3首歌曲为例）：

![music.gif](https://s2.loli.net/2023/07/10/Q9J61I2bYNF3G4x.gif)

并且当歌曲名称变化时，脚本截图也需要跟着维护；这时候选择不变的节点作为操作对象，显然可以提升我们脚本的兼容性。

5\. 借助多设备运行验证脚本的兼容性[¶](about:blank#5_1 "Permanent link")
--------------------------------------------------------

#### 1）官方git上面的多设备并行运行[¶](about:blank#1git "Permanent link")

官方在AirtestProject的git仓库下，给大家提供了1个Android多设备运行并生成聚合报告的demo，大家可以[前往](https://github.com/AirtestProject/multi-device-runner)使用。

![multi_device.png](https://s2.loli.net/2023/07/10/KsDpiAmzbqHEcLa.png)

#### 2）企业版IDE的多设备测试功能[¶](about:blank#2ide "Permanent link")

官方面向企业的付费产品，私有云方案中有一款[企业版AirtestIDE](https://airtest.doc.io.netease.com/tutorial/9_Improved_compatibility/)，它包含设备批量运行功能，可以用来验证脚本的兼容性。通过同一个测试脚本同时在多台不同分辨率的设备上实际运行，以确保脚本的兼容性。 ![14_multidevice_test.png](https://s2.loli.net/2023/07/10/kpNaFh62jcLA7Yd.png)

欢迎到官方的[私有云官网](https://airlab.163.com/b2b)上了解企业版IDE的更多详细内容。
