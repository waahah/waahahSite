---
title: Spider-Appium的基本使用
date: 2022-02-12 14:58:36
tags: [Python, Appium, Spider]
categories: [Coding, Python]

---

Appium 的基本使用
=====================================
本文字数： 8.4k 阅读时长 ≈ 18 分钟
[](about:blank#Appium-%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8 "11.4 Appium 的基本使用") Appium 的基本使用
==============================================================================================================

`Appium` 是一个跨平台移动端自动化测试工具，可以非常便捷地为 iOS 和 Android 平台创建自动化测试用例。它可以模拟 App 内部的各种操作，如点击、滑动、文本输入等，只要我们手工操作的动作 Appium 都可以完成。在前面我们了解过 Selenium，它是一个网页端的自动化测试工具。Appium 实际上继承了 Selenium，Appium 也是利用 WebDriver 来实现 App 的自动化测试。对 iOS 设备来说，Appium 使用 UIAutomation 来实现驱动。对于 Android 来说，它使用 UiAutomator 和 Selendroid 来实现驱动。

Appium 相当于一个服务器，我们可以向 Appium 发送一些操作指令，Appium 就会根据不同的指令对移动设备进行驱动，完成不同的动作。

对于爬虫来说，我们用 Selenium 来抓取 JavaScript 渲染的页面，可见即可爬。Appium 同样也可以，用 Appium 来做 App 爬虫不失为一个好的选择。

下面我们来了解 Appium 的基本使用方法。

### [](about:blank#1-%E6%9C%AC%E8%8A%82%E7%9B%AE%E6%A0%87 "1. 本节目标")1\. 本节目标

我们以 Android 平台的微信为例来演示 Appium 启动和操作 App 的方法，主要目的是了解利用 Appium 进行自动化测试的流程以及相关 API 的用法。

### [](about:blank#2-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C "2. 准备工作")2\. 准备工作

请确保 PC 已经安装好 Appium、Android 开发环境和 Python 版本的 Appium API，安装方法可以参考第 1 章。另外，Android 手机安装好微信 App。

### [](about:blank#3-%E5%90%AF%E5%8A%A8-APP "3. 启动 APP")3\. 启动 APP

Appium 启动 App 的方式有两种：一种是用 Appium 内置的驱动器来打开 App，另一种是利用 Python 程序实现此操作。下面我们分别进行说明。

首先打开 Appium，启动界面如图 11-37 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033339.png)

图 11-37 Appium 启动界面

直接点击 Start Server 按钮即可启动 Appium 的服务，相当于开启了一个 Appium 服务器。我们可以通过 Appium 内置的驱动或 Python 代码向 Appium 的服务器发送一系列操作指令，Appium 就会根据不同的指令对移动设备进行驱动，完成不同的动作。启动后运行界面如图 11-38 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033346.jpg)

图 11-38 Server 运行界面

Appium 运行之后正在监听 4723 端口。我们可以向此端口对应的服务接口发送操作指令，此页面就会显示这个过程的操作日志。

将 Android 手机通过数据线和运行 Appium 的 PC 相连，同时打开 USB 调试功能，确保 PC 可以连接到手机。

可以输入 adb 命令来测试连接情况，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">adb devices -l</span></span><br></pre></td></tr></tbody></table>

如果出现类似如下结果，这就说明 PC 已经正确连接手机。

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="selector-tag">List</span> <span class="selector-tag">of</span> <span class="selector-tag">devices</span> <span class="selector-tag">attached</span></span><br><span class="line">2<span class="selector-tag">da42ac0</span> <span class="selector-tag">device</span> <span class="selector-tag">usb</span><span class="selector-pseudo">:336592896X</span> <span class="selector-tag">product</span><span class="selector-pseudo">:leo</span> <span class="selector-tag">model</span><span class="selector-pseudo">:MI_NOTE_Pro</span> <span class="selector-tag">device</span><span class="selector-pseudo">:leo</span></span><br></pre></td></tr></tbody></table>

model 是设备的名称，就是后文需要用到的 deviceName 变量。我使用的是小米 Note 顶配版，所以此处名称为 MI\_NOTE\_Pro。

如果提示找不到 adb 命令，请检查 Android 开发环境和环境变量是否配置成功。如果可以成功调用 adb 命令但不显示设备信息，请检查手机和 PC 的连接情况。

接下来用 Appium 内置的驱动器打开 App，点击 Appium 中的 Start New Session 按钮，如图 11-39 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033354.jpg)

图 11-39 操作示例

这时会出现一个配置页面，如图 11-40 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033359.jpg)

图 11-40 配置页面

需要配置启动 App 时的 Desired Capabilities 参数，它们分别是 platformName、deviceName、appPackage、appActivity。

*   platformName，平台名称，需要区分是 Android 还是 iOS，此处填写 Android。
*   deviceName，设备名称，是手机的具体类型。
*   appPackage，APP 程序包名。
*   appActivity，入口 Activity 名，这里通常需要以。开头。

在当前配置页面的左下角也有配置参数的相关说明，链接是 [https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md)

我们在 Appium 中加入上面 4 个配置，如图 11-41 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033406.jpg)

图 11-41 配置信息

点击保存按钮，保存下来，我们以后可以继续使用这个配置。

点击右下角的 Start Session 按钮，即可启动 Android 手机上的微信 App 并进入到启动页面。同时 PC 上会弹出一个调试窗口，从这个窗口我们可以预览当前手机页面，并可以查看页面的源码，如图 11-42 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033409.jpg)

图 11-42 调试窗口

点击左栏中屏幕的某个元素，如选中登录按钮，它就会高亮显示。这时中间栏就显示了当前选中的按钮对应的源代码，右栏则显示了该元素的基本信息，如元素的 id、class、text 等，以及可以执行的操作，如 Tap、Send Keys、Clear，如图 11-43 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033414.jpg)

图 11-43 操作选项

点击中间栏最上方的第三个录制按钮，Appium 会开始录制操作动作，这时我们在窗口中操作 App 的行为都会被记录下来，Recorder 处可以自动生成对应语言的代码。例如，我们点击录制按钮，然后选中 App 中的登录按钮，点击 Tap 操作，即模拟了按钮点击功能，这时手机和窗口的 App 都会跳转到登录页面，同时中间栏会显示此动作对应的代码，如图 11-44 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033421.jpg)

图 11-44 录制动作

接下来选中左侧的手机号文本框，点击 Send Keys，对话框就会弹出。输入手机号，点击 Send Keys，即可完成文本的输入，如图 11-45 所示。

![](https://qiniu.cuiqingcai.com/2019-11-27-033426.jpg)

图 11-45 文本输入

我们可以在此页面点击不同的动作按钮，即可实现对 App 的控制，同时 Recorder 部分也可以生成对应的 Python 代码。

下面我们看看使用 Python 代码驱动 App 的方法。首先需要在代码中指定一个 Appium Server，而这个 Server 在刚才打开 Appium 的时候就已经开启了，是在 4723 端口上运行的，配置如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">server</span> = <span class="string">'http://localhost:4723/wd/hub'</span></span><br></pre></td></tr></tbody></table>

用字典来配置 Desired Capabilities 参数，代码如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">desired_caps</span> = {</span><br><span class="line">    <span class="string">'platformName'</span>: <span class="string">'Android'</span>,</span><br><span class="line">    <span class="string">'deviceName'</span>: <span class="string">'MI_NOTE_Pro'</span>,</span><br><span class="line">    <span class="string">'appPackage'</span>: <span class="string">'com.tencent.mm'</span>,</span><br><span class="line">    <span class="string">'appActivity'</span>: <span class="string">'.ui.LauncherUI'</span></span><br><span class="line">}</span><br></pre></td></tr></tbody></table>

新建一个 Session，这类似点击 Appium 内置驱动的 Start Session 按钮相同的功能，代码实现如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> appium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.support.ui <span class="keyword">import</span> WebDriverWait</span><br><span class="line"></span><br><span class="line">driver = webdriver.Remote(<span class="keyword">server</span>, desired_caps)</span><br></pre></td></tr></tbody></table>

配置完成后运行，就可以启动微信 App 了。但是现在仅仅是可以启动 App，还没有做任何动作。

再用代码来模拟刚才演示的两个动作：一个是点击 “登录” 按钮，一个是输入手机号。

看看刚才 Appium 内置驱动器内的 Recorder 录制生成的 Python 代码，自动生成的代码非常累赘，例如点击 “登录” 按钮的代码如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">el1</span> = driver.find_element_by_xpath(<span class="string">"/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.Button[1]"</span>)</span><br><span class="line">el1.click()</span><br></pre></td></tr></tbody></table>

这段代码的 XPath 选择器路径太长，选择方式没有那么科学，获取元素时也没有设置等待，很可能会有超时异常。所以我们修改一下，将其修改为通过 ID 查找元素，设置延时等待，两次操作的代码改写如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line">wait = <span class="constructor">WebDriverWait(<span class="params">driver</span>, 30)</span></span><br><span class="line">login = wait.until(<span class="module-access"><span class="module"><span class="identifier">EC</span>.</span></span>presence<span class="constructor">_of_element_located((By.ID, '<span class="params">com</span>.<span class="params">tencent</span>.<span class="params">mm</span>:<span class="params">id</span><span class="operator">/</span><span class="params">cjk</span>')</span>))</span><br><span class="line">login.click<span class="literal">()</span></span><br><span class="line">phone = wait.until(<span class="module-access"><span class="module"><span class="identifier">EC</span>.</span></span>presence<span class="constructor">_of_element_located((By.ID, '<span class="params">com</span>.<span class="params">tencent</span>.<span class="params">mm</span>:<span class="params">id</span><span class="operator">/</span><span class="params">h2</span>')</span>))</span><br><span class="line">phone.set<span class="constructor">_text('18888888888')</span></span><br></pre></td></tr></tbody></table>

综上所述，完整的代码如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br><span class="line">16</span><br><span class="line">17</span><br><span class="line">18</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> appium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.common.<span class="keyword">by</span> <span class="keyword">import</span> <span class="keyword">By</span></span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.support.ui <span class="keyword">import</span> WebDriverWait</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.support <span class="keyword">import</span> expected_conditions <span class="keyword">as</span> EC</span><br><span class="line"></span><br><span class="line"><span class="keyword">server</span> = <span class="string">'http://localhost:4723/wd/hub'</span></span><br><span class="line">desired_caps = {</span><br><span class="line">    <span class="string">'platformName'</span>: <span class="string">'Android'</span>,</span><br><span class="line">    <span class="string">'deviceName'</span>: <span class="string">'MI_NOTE_Pro'</span>,</span><br><span class="line">    <span class="string">'appPackage'</span>: <span class="string">'com.tencent.mm'</span>,</span><br><span class="line">    <span class="string">'appActivity'</span>: <span class="string">'.ui.LauncherUI'</span></span><br><span class="line">}</span><br><span class="line">driver = webdriver.Remote(<span class="keyword">server</span>, desired_caps)</span><br><span class="line">wait = WebDriverWait(driver, <span class="number">30</span>)</span><br><span class="line"><span class="keyword">login</span> = wait.<span class="keyword">until</span>(EC.presence_of_element_located((<span class="keyword">By</span>.ID, <span class="string">'com.tencent.mm:id/cjk'</span>)))</span><br><span class="line"><span class="keyword">login</span>.click()</span><br><span class="line">phone = wait.<span class="keyword">until</span>(EC.presence_of_element_located((<span class="keyword">By</span>.ID, <span class="string">'com.tencent.mm:id/h2'</span>)))</span><br><span class="line">phone.set_text(<span class="string">'18888888888'</span>)</span><br></pre></td></tr></tbody></table>

一定要重新连接手机，再运行此代码，这时即可观察到手机上首先弹出了微信欢迎页面，然后模拟点击登录按钮、输入手机号，操作完成。这样我们就成功使用 Python 代码实现了 App 的操作。

### [](about:blank#4-API "4. API")4\. API

接下来看看使用代码如何操作 App、总结相关 API 的用法。这里使用的 Python 库为 AppiumPythonClient，其 GitHub 地址为 https://github.com/appium/python-client，此库继承自 Selenium，使用方法与 Selenium 有很多共同之处。

#### [](about:blank#%E5%88%9D%E5%A7%8B%E5%8C%96 "初始化")初始化

需要配置 Desired Capabilities 参数，完整的配置说明可以参考 [https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md) 一般来说我们我们配置几个基本参数即可：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> appium import webdriver</span><br><span class="line"></span><br><span class="line">server = <span class="string">'http://localhost:4723/wd/hub'</span></span><br><span class="line">desired_caps = {</span><br><span class="line">    <span class="string">'platformName'</span>: <span class="string">'Android'</span>,</span><br><span class="line">    <span class="string">'deviceName'</span>: <span class="string">'MI_NOTE_Pro'</span>,</span><br><span class="line">    <span class="string">'appPackage'</span>: <span class="string">'com.tencent.mm'</span>,</span><br><span class="line">    <span class="string">'appActivity'</span>: <span class="string">'.ui.LauncherUI'</span></span><br><span class="line">}</span><br><span class="line">driver = webdriver.Remote(server, desired_caps)</span><br></pre></td></tr></tbody></table>

这里配置了启动微信 App 的 Desired Capabilities，这样 Appnium 就会自动查找手机上的包名和入口类，然后将其启动。包名和入口类的名称可以在安装包中的 AndroidManifest.xml 文件获取。

如果要打开的 App 没有事先在手机上安装，我们可以直接指定 App 参数为安装包所在路径，这样程序启动时就会自动向手机安装并启动 App，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> appium import webdriver</span><br><span class="line"></span><br><span class="line">server = <span class="string">'http://localhost:4723/wd/hub'</span></span><br><span class="line">desired_caps = {</span><br><span class="line">    <span class="string">'platformName'</span>: <span class="string">'Android'</span>,</span><br><span class="line">    <span class="string">'deviceName'</span>: <span class="string">'MI_NOTE_Pro'</span>,</span><br><span class="line">    <span class="string">'app'</span>: <span class="string">'./weixin.apk'</span></span><br><span class="line">}</span><br><span class="line">driver = webdriver.Remote(server, desired_caps)</span><br></pre></td></tr></tbody></table>

程序启动的时候就会寻找 PC 当前路径下的 APK 安装包，然后将其安装到手机中并启动。

#### [](about:blank#%E6%9F%A5%E6%89%BE%E5%85%83%E7%B4%A0 "查找元素")查找元素

我们可以使用 Selenium 中通用的查找方法来实现元素的查找，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">el = driver.find<span class="constructor">_element_by_id('<span class="params">com</span>.<span class="params">tencent</span>.<span class="params">mm</span>:<span class="params">id</span><span class="operator">/</span><span class="params">cjk</span>')</span></span><br></pre></td></tr></tbody></table>

在 Selenium 中，其他查找元素的方法同样适用，在此不再赘述。

在 Android 平台上，我们还可以使用 UIAutomator 来进行元素选择，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">el</span> = self.driver.find_element_by_android_uiautomator(<span class="string">'new UiSelector().description("Animation")'</span>)</span><br><span class="line"><span class="attr">els</span> = self.driver.find_elements_by_android_uiautomator(<span class="string">'new UiSelector().clickable(true)'</span>)</span><br></pre></td></tr></tbody></table>

在 iOS 平台上，我们可以使用 UIAutomation 来进行元素选择，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">el</span> = self.driver.find_element_by_ios_uiautomation(<span class="string">'.elements()[0]'</span>)</span><br><span class="line"><span class="attr">els</span> = self.driver.find_elements_by_ios_uiautomation(<span class="string">'.elements()'</span>)</span><br></pre></td></tr></tbody></table>

还可以使用 iOS Predicates 来进行元素选择，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">el</span> = self.driver.find_element_by_ios_predicate('<span class="attr">wdName</span> == <span class="string">"Buttons"</span>')</span><br><span class="line"><span class="attr">els</span> = self.driver.find_elements_by_ios_predicate('<span class="attr">wdValue</span> == <span class="string">"SearchBar"</span> AND <span class="attr">isWDDivisible</span> == <span class="number">1</span>')</span><br></pre></td></tr></tbody></table>

也可以使用 iOS Class Chain 来进行选择，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">el = self.driver.find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>ios<span class="number">_</span><span class="keyword">class</span><span class="number">_</span>chain(<span class="string">'XCUIElementTypeWindow/XCUIElementTypeButton[3]'</span>)</span><br><span class="line">els = self.driver.find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>ios<span class="number">_</span><span class="keyword">class</span><span class="number">_</span>chain(<span class="string">'XCUIElementTypeWindow/XCUIElementTypeButton'</span>)</span><br></pre></td></tr></tbody></table>

但是此种方法只适用于 XCUITest 驱动，具体可以参考：<https://github.com/appium/appium-xcuitest\->
driver。

#### [](about:blank#%E7%82%B9%E5%87%BB "点击")点击

点击可以使用 tap() 方法，该方法可以模拟手指点击（最多五个手指），可设置按时长短（毫秒），代码如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">tap(<span class="built_in">self</span>, positions, <span class="built_in">duration</span>=<span class="literal">None</span>)</span><br></pre></td></tr></tbody></table>

参数：

*   positions，点击的位置组成的列表。
*   duration，点击持续时间。

实例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">driver.tap([(<span class="number">100</span>, <span class="number">20</span>), (<span class="number">100</span>, <span class="number">60</span>), (<span class="number">100</span>, <span class="number">100</span>)], <span class="number">500</span>)</span><br></pre></td></tr></tbody></table>

这样就可以模拟点击屏幕的某几个点。

另外对于某个元素如按钮来说，我们可以直接调用 cilck() 方法实现模拟点击，实例如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">button = find<span class="constructor">_element_by_id('<span class="params">com</span>.<span class="params">tencent</span>.<span class="params">mm</span>:<span class="params">id</span><span class="operator">/</span><span class="params">btn</span>')</span></span><br><span class="line">button.click<span class="literal">()</span></span><br></pre></td></tr></tbody></table>

这样获取元素之后，然后调用 click() 方法即可实现该元素的模拟点击。

#### [](about:blank#%E5%B1%8F%E5%B9%95%E6%8B%96%E5%8A%A8 "屏幕拖动")屏幕拖动

可以使用 scroll() 方法模拟屏幕滚动，用法如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="function"><span class="title">scroll</span><span class="params">(self, origin_el, destination_el)</span></span></span><br></pre></td></tr></tbody></table>

可以实现从元素 origin\_el 滚动至元素 destination\_el。

参数：

*   original\_el，被操作的元素
*   destination\_el，目标元素

实例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="selector-tag">driver</span><span class="selector-class">.scroll</span>(<span class="selector-tag">el1</span>,<span class="selector-tag">el2</span>)</span><br></pre></td></tr></tbody></table>

我们还可以使用 swipe() 模拟从 A 点滑动到 B 点，用法如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">swipe(<span class="built_in">self</span>, start_x, start_y, end_x, end_y, <span class="built_in">duration</span>=<span class="literal">None</span>)</span><br></pre></td></tr></tbody></table>

参数：

*   start\_x，开始位置的横坐标
*   start\_y，开始位置的纵坐标
*   end\_x，终止位置的横坐标
*   end\_y，终止位置的纵坐标
*   duration，持续时间，毫秒

实例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">driver.swipe(<span class="number">100</span>, <span class="number">100</span>, <span class="number">100</span>, <span class="number">400</span>, <span class="number">5000</span>)</span><br></pre></td></tr></tbody></table>

这样可以实现在 5s 由 (100, 100) 滑动到 (100, 400)。

另外可以使用 flick() 方法模拟从 A 点快速滑动到 B 点，用法如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="function"><span class="title">flick</span><span class="params">(self, start_x, start_y, end_x, end_y)</span></span></span><br></pre></td></tr></tbody></table>

参数：

*   start\_x，开始位置的横坐标
*   start\_y，开始位置的纵坐标
*   end\_x，终止位置的横坐标
*   end\_y，终止位置的纵坐标

实例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">driver.flick(<span class="number">100</span>, <span class="number">100</span>, <span class="number">100</span>, <span class="number">400</span>)</span><br></pre></td></tr></tbody></table>

#### [](about:blank#%E6%8B%96%E6%8B%BD "拖拽")拖拽

可以使用 drag\_and\_drop() 实现某个元素拖动到另一个目标元素上。

用法如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">drag<span class="constructor">_and_drop(<span class="params">self</span>, <span class="params">origin_el</span>, <span class="params">destination_el</span>)</span></span><br></pre></td></tr></tbody></table>

可以实现元素 origin\_el 拖拽至元素 destination\_el。

参数：

*   original\_el，被拖拽的元素
*   destination\_el，目标元素

实例如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">driver.drag<span class="constructor">_and_drop(<span class="params">el1</span>, <span class="params">el2</span>)</span></span><br></pre></td></tr></tbody></table>

#### [](about:blank#%E6%96%87%E6%9C%AC%E8%BE%93%E5%85%A5 "文本输入")文本输入

可以使用 set\_text() 方法实现文本输入，如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">el = find<span class="constructor">_element_by_id('<span class="params">com</span>.<span class="params">tencent</span>.<span class="params">mm</span>:<span class="params">id</span><span class="operator">/</span><span class="params">cjk</span>')</span></span><br><span class="line">el.set<span class="constructor">_text('Hello')</span></span><br></pre></td></tr></tbody></table>

我们选中一个文本框元素之后，然后调用 set\_text() 方法即可实现文本输入。

#### [](about:blank#%E5%8A%A8%E4%BD%9C%E9%93%BE "动作链")动作链

与 Selenium 中的 ActionChains 类似，Appium 中的 TouchAction 可支持的方法有 tap()、press()、long\_press()、release()、move\_to()、wait()、cancel() 等，实例如下所示：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">el = self.driver.find_element_by_accessibility_id(<span class="string">'Animation'</span>)</span><br><span class="line">action = TouchAction(self.driver)</span><br><span class="line">action.tap(el).<span class="keyword">perform</span>()</span><br></pre></td></tr></tbody></table>

首先选中一个元素，然后利用 TouchAction 实现点击操作。

如果想要实现拖动操作，可以用如下方式：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line">els = self.driver.find<span class="constructor">_elements_by_class_name('<span class="params">listView</span>')</span></span><br><span class="line">a1 = <span class="constructor">TouchAction()</span></span><br><span class="line">a1.press(els<span class="literal">[<span class="number">0</span>]</span>).move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=0)</span>.move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=-75)</span>.move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=-600)</span>.release<span class="literal">()</span></span><br><span class="line">a2 = <span class="constructor">TouchAction()</span></span><br><span class="line">a2.press(els<span class="literal">[<span class="number">1</span>]</span>).move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=10)</span>.move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=-300)</span>.move<span class="constructor">_to(<span class="params">x</span>=10, <span class="params">y</span>=-600)</span>.release<span class="literal">()</span></span><br></pre></td></tr></tbody></table>

利用以上 API，我们就可以完成绝大部分操作。更多的 API 操作可以参考 <https://testerhome.com/topics/3711)https://testerhome.com/topics/3711>。

### [](about:blank#5-%E7%BB%93%E8%AF%AD "5. 结语")5\. 结语

本节中，我们主要了解了 Appium 的操作 App 的基本用法，以及常用 API 的用法。
