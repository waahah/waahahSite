---
title: 测试十五、使用命令行终端运行脚本
date: 2023-01-22 14:58:36
tags: [Python, Airtest, Poco, Test, PowerShell]
categories: [Coding, 测试]
---

十五、使用命令行运行脚本[¶](about:blank#_1 "Permanent link")
===============================================

我们的脚本在编写完成后，除了使用 `AirtestIDE` 运行之外，也支持脱离IDE，直接使用命令行运行脚本。

1\. 使用AirtestIDE命令行运行[¶](about:blank#1-airtestide "Permanent link")
-------------------------------------------------------------------

即使本地没有安装`python`环境，或是没有安装 `airtest` 与 `poco` ，我们也一样能够使用命令行来运行脚本，诀窍就是复制在 `AirtestIDE` 里运行脚本时log窗口里显示出来的命令行：

![](https://s2.loli.net/2023/07/10/bzu8DQtPT9IvA3o.png)

将运行脚本时 `AirtestIDE` 生成的这段命令行代码复制到你的命令行终端里，回车运行就可以了。

请 **注意** ， 这种使用AirtestIDE命令行来运行脚本的方式，是一个简单快速的方式，假如想要批量执行、同时执行的话，可能会遇到效率不佳的问题。若有长时间或批量执行脚本的需求，请尽量在本地Python环境安装airtest和poco来执行脚本，详情下文。

2\. 在本地环境使用命令行运行脚本[¶](about:blank#2 "Permanent link")
-----------------------------------------------------

方法1中介绍的使用AirtestIDE命令行来运行脚本，虽然很方便，但是不适合更复杂的操作（例如想同时用多个命令行运行多台手机、多个脚本等情况），以及对于一些Python开发者来说，可能需要在脚本中使用其他功能强大的Python第三方库。因此我们更加推荐在本地python环境中安装airtest和pocoui，然后用命令行运行脚本。

关于 [如何部署python环境](https://airtest.doc.io.netease.com/3.4run_script/0_run_script/#4) ，我们已经在上2节的内容详细介绍过，这里不再赘述。

本地python环境部署完成后，我们就能够脱离AirtestIDE，在该python环境上运行我们的自动化脚本了。

#### 1）命令行运行脚本的示例[¶](about:blank#1 "Permanent link")

我们可以使用 `airtest run + 脚本路径` 这样的命令来运行我们的airtest脚本，以下是使用命令行运行的例子:

```shell
>airtest run untitled.air --device Android:///手机设备号 --log log/
>python -m airtest run untitled.air --device Android:///手机设备号 --log log/

```

这两个命令行的效果是相同的，我们用airtest运行了一个叫做 `untitled.air` 的脚本，传入了 `--device` 和 `--log` 两个参数，分别是我们的手机设备和log输出目录。

#### 2）airtest run 命令的参数介绍[¶](about:blank#2airtest-run "Permanent link")

`airtest run` 命令必须传入的参数是指定脚本的路径，其他可选参数有：

*   `--device`：指定设备字符串
*   `--log`：指定log输出目录
*   `--compress`：指定截图精度，取值范围\[1,99\]，精度越高截图越清晰
*   `--recording`：设置运行脚本过程录屏（airtest1.1.6之后可以在该参数后设置录屏文件名）
*   `--no-image`：设置运行脚本过程不截图（airtest1.1.7新增）

我们还可以查阅 [Airtest-running-air-from-cli](http://airtest.readthedocs.io/zh_CN/latest/README_MORE.html#running-air-from-cli) 文档来了解这几个参数的详细信息。

更多运行脚本的命令示例：

```shell
# 设置脚本运行过程中不再截图
> airtest run test.air --device Android:/// --log logs/ --no-image 
# 设置脚本运行过程的截图精度为90
> airtest run test.air --device Android:/// --log logs/ --compress 90
# 设置脚本运行过程录屏，录屏文件保存为123.mp4
> airtest run test.air --device Android:/// --log logs/ --recording 123.mp4

```

#### 3）设备字符串介绍[¶](about:blank#3 "Permanent link")

在刚才的命令行中使用的 `--device` 参数，传入的是一个设备字符串，以安卓设备为例，字串完整定义如下:

```shell
Android://<adbhost[localhost]>:<adbport[5037]>/<serialno>

```

其中，adbhost是adb server所在主机的ip，默认是本机127.0.0.1，adb port默认是5037，**serialno是android手机的序列号**。更多adb的方面的内容请参考文档 [ADB](https://developer.android.com/studio/command-line/adb?hl=zh-cn) 。这里的设备字符串，可以是安卓设备、iOS设备，或者是Windows窗口等：

##### ① 安卓设备字符串[¶](about:blank#1_1 "Permanent link")

```shell
# 什么都不填写，会默认取当前连接中的第一台手机
Android:///
# 连接本机默认端口连的一台设备号为79d03fa的手机
Android://127.0.0.1:5037/79d03fa
# 用本机的adb连接一台adb connect过的远程设备，注意10.254.60.1:5555其实是serialno
Android://127.0.0.1:5037/10.254.60.1:5555

```

在 [Android连接常见问题](https://airtest.doc.io.netease.com/3.2device_connection/3_android_faq/) 中，我们提到了部分设备由于较为特殊，需要在连接时勾选 `use ADB orientation` 或是 `use javacap` 等特殊连接选项后才能连接手机，这些设备在使用命令行运行脚本时，也同样需要将这些参数附加在设备字符串后面：

```shell
# 连接了模拟器，勾选了`Use javacap`模式
Android://127.0.0.1:5037/127.0.0.1:7555?cap_method=JAVACAP
# 所有的选项都勾选上之后连接的设备，用&&来连接多个参数字符串
Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP&&ori_method=ADBORI&&touch_method=ADBTOUCH

```

注意：命令行中如果有出现 `^ < > | &` 这些字符，可能都需要转义才能生效，因此如果连接字符串中需要写 `&&` 时，在windows下需要改写成 `^&^&` ，添加一个 `^` 符号进行转义，即:

```shell
# --device Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP&&ori_method=ADBORI 在windows下不可用
--device Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP^&^&ori_method=ADBORI  # windows命令行添加^转义后效果
--device Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP\&\&ori_method=ADBORI  # mac命令行添加\转义

```

未对特殊字符进行转义最常见的错误就是导致命令行被截断，举个例子，同学们在命令行运行脚本时，非常容易使用下述类型的命令：

```shell
airtest run test.air --device Android://127.0.0.1:5037/79d03fa?cap_method=JAVACAP&&ori_method=ADBORI --log logs/

```

直接在Windows终端运行该命令，会提示 `do not save log` ，这很奇怪是把，明明我这条命令里面已经使用 `--log` 参数，指定了log保存路径了，为何还提示我没有保存log呢？！这其实就是因为这条命令里面包含 `&` 这个特殊字符，但是我们又没有转义，导致命令被截断了，所以同学们一定不能忘记特殊字符需要转义的问题。

##### ② iOS设备字符串[¶](about:blank#2-ios "Permanent link")

```shell
# 连接iOS手机
iOS:///127.0.0.1:8100

```

##### ③ Windows窗口字符串[¶](about:blank#3-windows "Permanent link")

```shell
# 连接一个Windows窗口，窗口句柄为123456
Windows:///123456
# 连接一个Windows窗口，窗口名称匹配某个正则表达式
Windows:///?title_re=Unity.*
# 连接windows桌面，不指定任何窗口
Windows:///

```

值得一提的是，windows窗口的连接使用了 [pywinauto](https://github.com/pywinauto/pywinauto) 库，在AirtestIDE中默认是使用当前已连接到IDE里的窗口句柄来连接的。可以预想到，假如窗口关闭了，下一次再开启时，句柄就可能发生变化。因此我们的连接字符串支持了 `pywinauto` 的 `connect` 接口去连接窗口，查阅 [参考文档](https://pywinauto.readthedocs.io/en/latest/HowTo.html?highlight=connect#how-to-specify-a-usable-application-instance) 里的几种参数填写方式来写连接字符串的参数部分：`Windows:///?name=value` 。

注意

如果自己拼写的设备字符串无法正确连接设备，但是在AirtestIDE中可以正常连接的话，可以考虑先在AirtestIDE中运行一次脚本，然后将运行时自动生成的命令行里 `--device Android:///` 参数复制出来，即可在代码中使用了，这种做法可以极大程度避免设备字符串编写错误的问题。

#### 4）对脚本运行过程进行录屏[¶](about:blank#4 "Permanent link")

在 **Android设备** 上运行脚本时，我们可以在运行脚本的命令行中，通过添加一个 `--recording` 参数，让airtest自动对脚本执行过程中的手机屏幕进行录制操作。（运行结束后，录屏文件会默认保存在log文件夹里面，使用 `recording_手机序列号` 来命名录屏文件）

```shell
airtest run "D:\test\Airtest_example.air"  --device android://127.0.0.1:5037/emulator-5554?cap_method=MINICAP_STREAM^&^&ori_method=MINICAPORI^&^&touch_method=MINITOUCH --log "D:/test\41f68fdf265d8c13998d0a1a7b992889" --recording

```

![](https://s2.loli.net/2023/07/10/hDUH4wz5gI8lj1R.png)

并且airtest1.1.6支持 **在 `--recording` 参数后面加上一个文件名来命名录屏文件** ，例如 `--recording test.mp4` ，如果有不止一台手机在运行，会把文件命名为 `手机名_test.mp4` 。下述示例使用 `--recording 123.mp4` 指定录屏文件名为 `123.mp4` ：

```shell
airtest run "D:\test\untitled.air"  --device android://127.0.0.1:5037/emulator-5554 --log "D:/test\6fe87b11ca1fc75ebe670439f20fabfc" --recording 123.mp4

```

![](https://s2.loli.net/2023/07/10/OT5jqocmMFvWVIR.png)

另外我们需要注意下，传入的录屏文件名必须以 `.mp4` 作为结尾！

