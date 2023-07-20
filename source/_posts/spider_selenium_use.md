---
title: Spider-Selenium的使用
date: 2022-01-28 14:58:36
tags: [Python, Selenium, Spider]
categories: [Coding, Python]

---


Selenium的使用
===================================

本文字数： 17k 阅读时长 ≈ 15 分钟

Selenium是一个自动化测试工具，利用它可以驱动浏览器执行特定的动作，如点击、下拉等操作，同时还可以获取浏览器当前呈现的页面的源代码，做到可见即可爬。对于一些JavaScript动态渲染的页面来说，此种抓取方式非常有效。本节中，就让我们来感受一下它的强大之处吧。

[](about:blank#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C "1. 准备工作")1\. 准备工作
------------------------------------------------------------------------

本节以Chrome为例来讲解Selenium的用法。在开始之前，请确保已经正确安装好了Chrome浏览器并配置好了ChromeDriver。另外，还需要正确安装好Python的Selenium库，详细的安装和配置过程可以参考第1章。

[](about:blank#2-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8 "2. 基本使用")2\. 基本使用
------------------------------------------------------------------------

准备工作做好之后，首先来大体看一下Selenium有一些怎样的功能。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br><span class="line">16</span><br><span class="line">17</span><br><span class="line">18</span><br><span class="line">19</span><br></pre></td><td class="code"><pre><span class="line"><span class="meta">from</span> selenium import webdriver</span><br><span class="line"><span class="meta">from</span> selenium.webdriver.common.<span class="meta">by</span> import <span class="meta">By</span></span><br><span class="line"><span class="meta">from</span> selenium.webdriver.common.keys import Keys</span><br><span class="line"><span class="meta">from</span> selenium.webdriver.support import expected_conditions <span class="meta">as</span> EC</span><br><span class="line"><span class="meta">from</span> selenium.webdriver.support.wait import WebDriverWait</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">try:</span><br><span class="line">    browser.get(<span class="string">'https://www.baidu.com'</span>)</span><br><span class="line">    <span class="meta">input</span> = browser.find_element_by_id(<span class="string">'kw'</span>)</span><br><span class="line">    <span class="meta">input</span>.send_keys(<span class="string">'Python'</span>)</span><br><span class="line">    <span class="meta">input</span>.send_keys(Keys.ENTER)</span><br><span class="line">    wait = WebDriverWait(browser, 10)</span><br><span class="line">    wait.<span class="meta">until</span>(EC.presence_of_element_located((<span class="meta">By</span>.ID, <span class="string">'content_left'</span>)))</span><br><span class="line">    p<span class="meta">rint(</span>browser.current_url)</span><br><span class="line">    p<span class="meta">rint(</span>browser.get_cookies())</span><br><span class="line">    p<span class="meta">rint(</span>browser.page_source)</span><br><span class="line">finally:</span><br><span class="line">    browser<span class="meta">.close(</span>)</span><br></pre></td></tr></tbody></table>

运行代码后发现，会自动弹出一个Chrome浏览器。浏览器首先会跳转到百度，然后在搜索框中输入Python，接着跳转到搜索结果页，如图7-1所示。

![](https://s2.loli.net/2023/07/05/15MlAFhLUfPrvQH.png)图7-1 运行结果

搜索结果加载出来后，控制台分别会输出当前的URL、当前的Cookies和网页源代码：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">https://www.baidu.com/s?ie=utf-8<span class="variable">&amp;f</span>=8<span class="variable">&amp;rsv_bp</span>=0<span class="variable">&amp;rsv_idx</span>=1<span class="variable">&amp;tn</span>=baidu<span class="variable">&amp;wd</span>=Python<span class="variable">&amp;rsv_pq</span>=c94d0df9000a72d0<span class="variable">&amp;rsv_t</span>=07099xvun1ZmC0bf6eQvygJ43IUTTUOl5FCJVPgwG2YREs70GplJjH2F%2BCQ<span class="variable">&amp;rqlang</span>=cn<span class="variable">&amp;rsv_enter</span>=1<span class="variable">&amp;rsv_sug3</span>=6<span class="variable">&amp;rsv_sug2</span>=0<span class="variable">&amp;inputT</span>=87<span class="variable">&amp;rsv_sug4</span>=87</span><br><span class="line">[{<span class="string">'secure'</span>: False, <span class="string">'value'</span>: <span class="string">'B490B5EBF6F3CD402E515D22BCDA1598'</span>, <span class="string">'domain'</span>: <span class="string">'.baidu.com'</span>, <span class="string">'path'</span>: <span class="string">'/'</span>, <span class="string">'httpOnly'</span>: False, <span class="string">'name'</span>: <span class="string">'BDORZ'</span>, <span class="string">'expiry'</span>: 1491688071.707553}, {<span class="string">'secure'</span>: False, <span class="string">'value'</span>: <span class="string">'22473_1441_21084_17001'</span>, <span class="string">'domain'</span>: <span class="string">'.baidu.com'</span>, <span class="string">'path'</span>: <span class="string">'/'</span>, <span class="string">'httpOnly'</span>: False, <span class="string">'name'</span>: <span class="string">'H_PS_PSSID'</span>}, {<span class="string">'secure'</span>: False, <span class="string">'value'</span>: <span class="string">'12883875381399993259_00_0_I_R_2_0303_C02F_N_I_I_0'</span>, <span class="string">'domain'</span>: <span class="string">'.www.baidu.com'</span>, <span class="string">'path'</span>: <span class="string">'/'</span>, <span class="string">'httpOnly'</span>: False, <span class="string">'name'</span>: <span class="string">'__bsi'</span>, <span class="string">'expiry'</span>: 1491601676.69722}]</span><br><span class="line">&lt;!DOCTYPE html&gt;&lt;!--STATUS OK--&gt;...&lt;/html&gt;</span><br></pre></td></tr></tbody></table>

源代码过长，在此省略。可以看到，我们得到的当前URL、Cookies和源代码都是浏览器中的真实内容。

所以说，如果用Selenium来驱动浏览器加载网页的话，就可以直接拿到JavaScript渲染的结果了，不用担心使用的是什么加密系统。

下面来详细了解一下Selenium的用法。

[](about:blank#3-%E5%A3%B0%E6%98%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AF%B9%E8%B1%A1 "3. 声明浏览器对象")3\. 声明浏览器对象
---------------------------------------------------------------------------------------------------------

Selenium支持非常多的浏览器，如Chrome、Firefox、Edge等，还有Android、BlackBerry等手机端的浏览器。另外，也支持无界面浏览器PhantomJS。

此外，我们可以用如下方式初始化：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">from</span> <span class="keyword">selenium </span><span class="meta">import</span> webdriver</span><br><span class="line"></span><br><span class="line"><span class="keyword">browser </span>= webdriver.Chrome()</span><br><span class="line"><span class="keyword">browser </span>= webdriver.Firefox()</span><br><span class="line"><span class="keyword">browser </span>= webdriver.Edge()</span><br><span class="line"><span class="keyword">browser </span>= webdriver.PhantomJS()</span><br><span class="line"><span class="keyword">browser </span>= webdriver.Safari()</span><br></pre></td></tr></tbody></table>

这样就完成了浏览器对象的初始化并将其赋值为`browser`对象。接下来，我们要做的就是调用`browser`对象，让其执行各个动作以模拟浏览器操作。

[](about:blank#4-%E8%AE%BF%E9%97%AE%E9%A1%B5%E9%9D%A2 "4. 访问页面")4\. 访问页面
------------------------------------------------------------------------

我们可以用`get()`方法来请求网页，参数传入链接URL即可。比如，这里用`get()`方法访问淘宝，然后打印出源代码，代码如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="builtin-name">get</span>(<span class="string">'https://www.taobao.com'</span>)</span><br><span class="line"><span class="builtin-name">print</span>(browser.page_source)</span><br><span class="line">browser.close()</span><br></pre></td></tr></tbody></table>

运行后发现，弹出了Chrome浏览器并且自动访问了淘宝，然后控制台输出了淘宝页面的源代码，随后浏览器关闭。

通过这几行简单的代码，我们可以实现浏览器的驱动并获取网页源码，非常便捷。

[](about:blank#5-%E6%9F%A5%E6%89%BE%E8%8A%82%E7%82%B9 "5. 查找节点")5\. 查找节点
------------------------------------------------------------------------

Selenium可以驱动浏览器完成各种操作，比如填充表单、模拟点击等。比如，我们想要完成向某个输入框输入文字的操作，总需要知道这个输入框在哪里吧？而Selenium提供了一系列查找节点的方法，我们可以用这些方法来获取想要的节点，以便下一步执行一些动作或者提取信息。

### [](about:blank#%E5%8D%95%E4%B8%AA%E8%8A%82%E7%82%B9 "单个节点")单个节点

比如，想要从淘宝页面中提取搜索框这个节点，首先要观察它的源代码，如图7-2所示。

![](https://s2.loli.net/2023/07/05/dG4HMJyjnYSZNF1.png)图7-2 源代码

可以发现，它的`id`是`q`，`name`也是`q`。此外，还有许多其他属性，此时我们就可以用多种方式获取它了。比如，`find_element_by_name()`是根据`name`值获取，`find_element_by_id()`是根据`id`获取。另外，还有根据XPath、CSS选择器等获取的方式。

我们用代码实现一下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line">from selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.<span class="constructor">Chrome()</span></span><br><span class="line">browser.get('https:<span class="comment">//www.taobao.com')</span></span><br><span class="line">input_first = browser.find<span class="constructor">_element_by_id('<span class="params">q</span>')</span></span><br><span class="line">input_second = browser.find<span class="constructor">_element_by_css_selector('#<span class="params">q</span>')</span></span><br><span class="line">input_third = browser.find<span class="constructor">_element_by_xpath('<span class="operator">/</span><span class="operator">/</span><span class="operator">*</span>[@<span class="params">id</span>=<span class="string">"q"</span>]')</span></span><br><span class="line">print(input_first, input_second, input_third)</span><br><span class="line">browser.close<span class="literal">()</span></span><br></pre></td></tr></tbody></table>

这里我们使用3种方式获取输入框，分别是根据ID、CSS选择器和XPath获取，它们返回的结果完全一致。运行结果如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"5e53d9e1c8646e44c14c1c2880d424af"</span>, <span class="attribute">element</span>=<span class="string">"0.5649563096161541-1"</span>)&gt; </span><br><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"5e53d9e1c8646e44c14c1c2880d424af"</span>, <span class="attribute">element</span>=<span class="string">"0.5649563096161541-1"</span>)&gt; </span><br><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"5e53d9e1c8646e44c14c1c2880d424af"</span>, <span class="attribute">element</span>=<span class="string">"0.5649563096161541-1"</span>)&gt;</span><br></pre></td></tr></tbody></table>

可以看到，这3个节点都是`WebElement`类型，是完全一致的。

这里列出所有获取单个节点的方法：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br></pre></td><td class="code"><pre><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>id</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>xpath</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>link<span class="number">_</span>text</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_p</span>artial<span class="number">_</span>link<span class="number">_</span>text</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>tag<span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span><span class="keyword">class</span><span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>element<span class="number">_</span><span class="meta">by</span><span class="number">_</span>css<span class="number">_</span>selector</span><br></pre></td></tr></tbody></table>

另外，Selenium还提供了通用方法`find_element()`，它需要传入两个参数：查找方式`By`和值。实际上，它就是`find_element_by_id()`这种方法的通用函数版本，比如`find_element_by_id(id)`就等价于`find_element(By.ID, id)`，二者得到的结果完全一致。我们用代码实现一下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.common.<span class="keyword">by</span> <span class="keyword">import</span> <span class="keyword">By</span></span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.taobao.com'</span>)</span><br><span class="line">input_first = browser.find_element(<span class="keyword">By</span>.ID, <span class="string">'q'</span>)</span><br><span class="line">print(input_first)</span><br><span class="line">browser.<span class="keyword">close</span>()</span><br></pre></td></tr></tbody></table>

实际上，这种查找方式的功能和上面列举的查找函数完全一致，不过参数更加灵活。

### [](about:blank#%E5%A4%9A%E4%B8%AA%E8%8A%82%E7%82%B9 "多个节点")多个节点

如果查找的目标在网页中只有一个，那么完全可以用`find_element()`方法。但如果有多个节点，再用`find_element()`方法查找，就只能得到第一个节点了。如果要查找所有满足条件的节点，需要用`find_elements()`这样的方法。注意，在这个方法的名称中，element多了一个s，注意区分。

比如，要查找淘宝左侧导航条的所有条目，如图7-3所示。

![](https://s2.loli.net/2023/07/05/eLfPuKhdgvO5isU.jpg)图7-3 导航栏

就可以这样来实现：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="builtin-name">get</span>(<span class="string">'https://www.taobao.com'</span>)</span><br><span class="line">lis = browser.find_elements_by_css_selector(<span class="string">'.service-bd li'</span>)</span><br><span class="line"><span class="builtin-name">print</span>(lis)</span><br><span class="line">browser.close()</span><br></pre></td></tr></tbody></table>

运行结果如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">[&lt;selenium<span class="selector-class">.webdriver</span><span class="selector-class">.remote</span><span class="selector-class">.webelement</span><span class="selector-class">.WebElement</span> (session=<span class="string">"c26290835d4457ebf7d96bfab3740d19"</span>, element=<span class="string">"0.09221044033125603-1"</span>)&gt;, &lt;selenium<span class="selector-class">.webdriver</span><span class="selector-class">.remote</span><span class="selector-class">.webelement</span><span class="selector-class">.WebElement</span> (session=<span class="string">"c26290835d4457ebf7d96bfab3740d19"</span>, element=<span class="string">"0.09221044033125603-2"</span>)&gt;, &lt;selenium<span class="selector-class">.webdriver</span><span class="selector-class">.remote</span><span class="selector-class">.webelement</span><span class="selector-class">.WebElement</span> (session=<span class="string">"c26290835d4457ebf7d96bfab3740d19"</span>, element=<span class="string">"0.09221044033125603-3"</span>)&gt;...&lt;selenium<span class="selector-class">.webdriver</span><span class="selector-class">.remote</span><span class="selector-class">.webelement</span><span class="selector-class">.WebElement</span> (session=<span class="string">"c26290835d4457ebf7d96bfab3740d19"</span>, element=<span class="string">"0.09221044033125603-16"</span>)&gt;]</span><br></pre></td></tr></tbody></table>

这里简化了输出结果，中间部分省略。

可以看到，得到的内容变成了列表类型，列表中的每个节点都是`WebElement`类型。

也就是说，如果我们用`find_element()`方法，只能获取匹配的第一个节点，结果是`WebElement`类型。如果用`find_elements()`方法，则结果是列表类型，列表中的每个节点是`WebElement`类型。

这里列出所有获取多个节点的方法：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br></pre></td><td class="code"><pre><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>id</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>xpath</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>link<span class="number">_</span>text</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_p</span>artial<span class="number">_</span>link<span class="number">_</span>text</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>tag<span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span><span class="keyword">class</span><span class="number">_n</span>ame</span><br><span class="line">find<span class="number">_</span>elements<span class="number">_</span><span class="meta">by</span><span class="number">_</span>css<span class="number">_</span>selector</span><br></pre></td></tr></tbody></table>

当然，我们也可以直接用`find_elements()`方法来选择，这时可以这样写：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">lis = browser.find<span class="constructor">_elements(By.CSS_SELECTOR, '.<span class="params">service</span>-<span class="params">bd</span> <span class="params">li</span>')</span></span><br></pre></td></tr></tbody></table>

结果是完全一致的。

[](about:blank#6-%E8%8A%82%E7%82%B9%E4%BA%A4%E4%BA%92 "6. 节点交互")6\. 节点交互
------------------------------------------------------------------------

Selenium可以驱动浏览器来执行一些操作，也就是说可以让浏览器模拟执行一些动作。比较常见的用法有：输入文字时用`send_keys()`方法，清空文字时用`clear()`方法，点击按钮时用`click()`方法。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">import</span> <span class="type">time</span></span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.taobao.com'</span>)</span><br><span class="line">input = browser.find_element_by_id(<span class="string">'q'</span>)</span><br><span class="line"><span class="keyword">input</span>.send_keys(<span class="string">'iPhone'</span>)</span><br><span class="line"><span class="type">time</span>.sleep(<span class="number">1</span>)</span><br><span class="line"><span class="keyword">input</span>.clear()</span><br><span class="line"><span class="keyword">input</span>.send_keys(<span class="string">'iPad'</span>)</span><br><span class="line">button = browser.find_element_by_class_name(<span class="string">'btn-search'</span>)</span><br><span class="line">button.click()</span><br></pre></td></tr></tbody></table>

这里首先驱动浏览器打开淘宝，然后用`find_element_by_id()`方法获取输入框，然后用`send_keys()`方法输入iPhone文字，等待一秒后用`clear()`方法清空输入框，再次调用`send_keys()`方法输入iPad文字，之后再用`find_element_by_class_name()`方法获取搜索按钮，最后调用`click()`方法完成搜索动作。

通过上面的方法，我们就完成了一些常见节点的动作操作，更多的操作可以参见官方文档的交互动作介绍：http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.remote.webelement。

[](about:blank#7-%E5%8A%A8%E4%BD%9C%E9%93%BE "7. 动作链")7\. 动作链
-------------------------------------------------------------

在上面的实例中，一些交互动作都是针对某个节点执行的。比如，对于输入框，我们就调用它的输入文字和清空文字方法；对于按钮，就调用它的点击方法。其实，还有另外一些操作，它们没有特定的执行对象，比如鼠标拖曳、键盘按键等，这些动作用另一种方式来执行，那就是动作链。

比如，现在实现一个节点的拖曳操作，将某个节点从一处拖曳到另外一处，可以这样实现：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver <span class="keyword">import</span> ActionChains</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">url = <span class="string">'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'</span></span><br><span class="line">browser.<span class="keyword">get</span>(url)</span><br><span class="line">browser.switch_to.frame(<span class="string">'iframeResult'</span>)</span><br><span class="line">source = browser.find_element_by_css_selector(<span class="string">'#draggable'</span>)</span><br><span class="line">target = browser.find_element_by_css_selector(<span class="string">'#droppable'</span>)</span><br><span class="line">actions = ActionChains(browser)</span><br><span class="line">actions.drag_and_drop(source, target)</span><br><span class="line">actions.<span class="keyword">perform</span>()</span><br></pre></td></tr></tbody></table>

首先，打开网页中的一个拖曳实例，然后依次选中要拖曳的节点和拖曳到的目标节点，接着声明`ActionChains`对象并将其赋值为`actions`变量，然后通过调用`actions`变量的`drag_and_drop()`方法，再调用`perform()`方法执行动作，此时就完成了拖曳操作，如图7-4和图7-5所示。

![](https://s2.loli.net/2023/07/05/n6zAf4Lu8UktRSG.jpg)图7-4 拖曳前的页面

![](https://s2.loli.net/2023/07/05/CJ1KwMeUPRFdfBl.jpg)图7-5 拖曳后的页面

更多的动作链操作可以参考官方文档：http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.common.action\_chains。

[](about:blank#8-%E6%89%A7%E8%A1%8CJavaScript "8. 执行JavaScript")8\. 执行JavaScript
--------------------------------------------------------------------------------

对于某些操作，Selenium API并没有提供。比如，下拉进度条，它可以直接模拟运行JavaScript，此时使用`execute_script()`方法即可实现，代码如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line">from selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.<span class="constructor">Chrome()</span></span><br><span class="line">browser.get('https:<span class="comment">//www.zhihu.com/explore')</span></span><br><span class="line">browser.execute<span class="constructor">_script('<span class="params">window</span>.<span class="params">scrollTo</span>(0, <span class="params">document</span>.<span class="params">body</span>.<span class="params">scrollHeight</span>)</span>')</span><br><span class="line">browser.execute<span class="constructor">_script('<span class="params">alert</span>(<span class="string">"To Bottom"</span>)</span>')</span><br></pre></td></tr></tbody></table>

这里就利用`execute_script()`方法将进度条下拉到最底部，然后弹出alert提示框。

所以说有了这个方法，基本上API没有提供的所有功能都可以用执行JavaScript的方式来实现了。

[](about:blank#9-%E8%8E%B7%E5%8F%96%E8%8A%82%E7%82%B9%E4%BF%A1%E6%81%AF "9. 获取节点信息")9\. 获取节点信息
----------------------------------------------------------------------------------------------

前面说过，通过`page_source`属性可以获取网页的源代码，接着就可以使用解析库（如正则表达式、Beautiful Soup、pyquery等）来提取信息了。

不过，既然Selenium已经提供了选择节点的方法，返回的是`WebElement`类型，那么它也有相关的方法和属性来直接提取节点信息，如属性、文本等。这样的话，我们就可以不用通过解析源代码来提取信息了，非常方便。

接下来，就看看通过怎样的方式来获取节点信息吧。

### [](about:blank#%E8%8E%B7%E5%8F%96%E5%B1%9E%E6%80%A7 "获取属性")获取属性

我们可以使用`get_attribute()`方法来获取节点的属性，但是其前提是先选中这个节点，示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium import webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver import ActionChains</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">url = <span class="string">'https://www.zhihu.com/explore'</span></span><br><span class="line">browser.<span class="builtin-name">get</span>(url)</span><br><span class="line">logo = browser.find_element_by_id(<span class="string">'zh-top-link-logo'</span>)</span><br><span class="line"><span class="builtin-name">print</span>(logo)</span><br><span class="line"><span class="builtin-name">print</span>(logo.get_attribute(<span class="string">'class'</span>))</span><br></pre></td></tr></tbody></table>

运行之后，程序便会驱动浏览器打开知乎页面，然后获取知乎的logo节点，最后打印出它的`class`。

控制台的输出结果如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">&lt;selenium<span class="selector-class">.webdriver</span><span class="selector-class">.remote</span><span class="selector-class">.webelement</span><span class="selector-class">.WebElement</span> (session=<span class="string">"e08c0f28d7f44d75ccd50df6bb676104"</span>, element=<span class="string">"0.7236390660048155-1"</span>)&gt;</span><br><span class="line">zu-<span class="attribute">top</span>-link-logo</span><br></pre></td></tr></tbody></table>

通过`get_attribute()`方法，然后传入想要获取的属性名，就可以得到它的值了。

### [](about:blank#%E8%8E%B7%E5%8F%96%E6%96%87%E6%9C%AC%E5%80%BC "获取文本值")获取文本值

每个`WebElement`节点都有`text`属性，直接调用这个属性就可以得到节点内部的文本信息，这相当于Beautiful Soup的`get_text()`方法、pyquery的`text()`方法，示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">url = <span class="string">'https://www.zhihu.com/explore'</span></span><br><span class="line">browser.<span class="keyword">get</span>(url)</span><br><span class="line">input = browser.find_element_by_class_name(<span class="string">'zu-top-add-question'</span>)</span><br><span class="line">print(<span class="keyword">input</span>.text)</span><br></pre></td></tr></tbody></table>

这里依然先打开知乎页面，然后获取“提问”按钮这个节点，再将其文本值打印出来。

控制台的输出结果如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">提问</span><br></pre></td></tr></tbody></table>

### [](about:blank#%E8%8E%B7%E5%8F%96id%E3%80%81%E4%BD%8D%E7%BD%AE%E3%80%81%E6%A0%87%E7%AD%BE%E5%90%8D%E5%92%8C%E5%A4%A7%E5%B0%8F "获取id、位置、标签名和大小")获取id、位置、标签名和大小

另外，`WebElement`节点还有一些其他属性，比如`id`属性可以获取节点`id`，`location`属性可以获取该节点在页面中的相对位置，`tag_name`属性可以获取标签名称，`size`属性可以获取节点的大小，也就是宽高，这些属性有时候还是很有用的。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br></pre></td><td class="code"><pre><span class="line"> from selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">url = <span class="string">'https://www.zhihu.com/explore'</span></span><br><span class="line">browser.get(url)</span><br><span class="line"><span class="selector-tag">input</span> = browser.find_element_by_class_name(<span class="string">'zu-top-add-question'</span>)</span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(input.id)</span></span></span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(input.location)</span></span></span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(input.tag_name)</span></span></span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(input.size)</span></span></span><br></pre></td></tr></tbody></table>

这里首先获得“提问”按钮这个节点，然后调用其`id`、`location`、`tag_name`、`size`属性来获取对应的属性值。

[](about:blank#10-%E5%88%87%E6%8D%A2Frame "10. 切换Frame")10\. 切换Frame
--------------------------------------------------------------------

我们知道网页中有一种节点叫作iframe，也就是子Frame，相当于页面的子页面，它的结构和外部网页的结构完全一致。Selenium打开页面后，它默认是在父级Frame里面操作，而此时如果页面中还有子Frame，它是不能获取到子Frame里面的节点的。这时就需要使用`switch_to.frame()`方法来切换Frame。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br><span class="line">16</span><br></pre></td><td class="code"><pre><span class="line">import time</span><br><span class="line">from selenium import webdriver</span><br><span class="line">from selenium<span class="selector-class">.common</span><span class="selector-class">.exceptions</span> import NoSuchElementException</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">url = <span class="string">'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'</span></span><br><span class="line">browser.get(url)</span><br><span class="line">browser<span class="selector-class">.switch_to</span>.frame(<span class="string">'iframeResult'</span>)</span><br><span class="line">try:</span><br><span class="line">    logo = browser.find_element_by_class_name(<span class="string">'logo'</span>)</span><br><span class="line">except NoSuchElementException:</span><br><span class="line">    print(<span class="string">'NO LOGO'</span>)</span><br><span class="line">browser<span class="selector-class">.switch_to</span>.parent_frame()</span><br><span class="line">logo = browser.find_element_by_class_name(<span class="string">'logo'</span>)</span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(logo)</span></span></span><br><span class="line"><span class="function"><span class="title">print</span><span class="params">(logo.text)</span></span></span><br></pre></td></tr></tbody></table>

控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line"><span class="literal">NO</span> LOGO</span><br><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"4bb8ac03ced4ecbdefef03ffdc0e4ccd"</span>, <span class="attribute">element</span>=<span class="string">"0.13792611320464965-2"</span>)&gt;</span><br><span class="line">RUNOOB.COM</span><br></pre></td></tr></tbody></table>

这里还是以前面演示动作链操作的网页为实例，首先通过`switch_to.frame()`方法切换到子Frame里面，然后尝试获取父级Frame里的logo节点（这是不能找到的），如果找不到的话，就会抛出`NoSuchElementException`异常，异常被捕捉之后，就会输出`NO LOGO`。接下来，重新切换回父级Frame，然后再次重新获取节点，发现此时可以成功获取了。

所以，当页面中包含子Frame时，如果想获取子Frame中的节点，需要先调用`switch_to.frame()`方法切换到对应的Frame，然后再进行操作。

[](about:blank#11-%E5%BB%B6%E6%97%B6%E7%AD%89%E5%BE%85 "11. 延时等待")11\. 延时等待
---------------------------------------------------------------------------

在Selenium中，`get()`方法会在网页框架加载结束后结束执行，此时如果获取`page_source`，可能并不是浏览器完全加载完成的页面，如果某些页面有额外的Ajax请求，我们在网页源代码中也不一定能成功获取到。所以，这里需要延时等待一定时间，确保节点已经加载出来。

这里等待的方式有两种：一种是隐式等待，一种是显式等待。

### [](about:blank#%E9%9A%90%E5%BC%8F%E7%AD%89%E5%BE%85 "隐式等待")隐式等待

当使用隐式等待执行测试的时候，如果Selenium没有在DOM中找到节点，将继续等待，超出设定时间后，则抛出找不到节点的异常。换句话说，当查找节点而节点并没有立即出现的时候，隐式等待将等待一段时间再查找DOM，默认的时间是0。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line">from selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.<span class="constructor">Chrome()</span></span><br><span class="line">browser.implicitly<span class="constructor">_wait(10)</span></span><br><span class="line">browser.get('https:<span class="comment">//www.zhihu.com/explore')</span></span><br><span class="line">input = browser.find<span class="constructor">_element_by_class_name('<span class="params">zu</span>-<span class="params">top</span>-<span class="params">add</span>-<span class="params">question</span>')</span></span><br><span class="line">print(input)</span><br></pre></td></tr></tbody></table>

这里我们用`implicitly_wait()`方法实现了隐式等待。

### [](about:blank#%E6%98%BE%E5%BC%8F%E7%AD%89%E5%BE%85 "显式等待")显式等待

隐式等待的效果其实并没有那么好，因为我们只规定了一个固定时间，而页面的加载时间会受到网络条件的影响。

这里还有一种更合适的显式等待方法，它指定要查找的节点，然后指定一个最长等待时间。如果在规定时间内加载出来了这个节点，就返回查找的节点；如果到了规定时间依然没有加载出该节点，则抛出超时异常。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.common.<span class="keyword">by</span> <span class="keyword">import</span> <span class="keyword">By</span></span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.support.ui <span class="keyword">import</span> WebDriverWait</span><br><span class="line"><span class="keyword">from</span> selenium.webdriver.support <span class="keyword">import</span> expected_conditions <span class="keyword">as</span> EC</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.taobao.com/'</span>)</span><br><span class="line">wait = WebDriverWait(browser, <span class="number">10</span>)</span><br><span class="line">input = wait.<span class="keyword">until</span>(EC.presence_of_element_located((<span class="keyword">By</span>.ID, <span class="string">'q'</span>)))</span><br><span class="line">button = wait.<span class="keyword">until</span>(EC.element_to_be_clickable((<span class="keyword">By</span>.CSS_SELECTOR, <span class="string">'.btn-search'</span>)))</span><br><span class="line">print(<span class="keyword">input</span>, button)</span><br></pre></td></tr></tbody></table>

这里首先引入`WebDriverWait`这个对象，指定最长等待时间，然后调用它的`until()`方法，传入要等待条件`expected_conditions`。比如，这里传入了`presence_of_element_located`这个条件，代表节点出现的意思，其参数是节点的定位元组，也就是`ID`为`q`的节点搜索框。

这样可以做到的效果就是，在10秒内如果`ID`为`q`的节点（即搜索框）成功加载出来，就返回该节点；如果超过10秒还没有加载出来，就抛出异常。

对于按钮，可以更改一下等待条件，比如改为`element_to_be_clickable`，也就是可点击，所以查找按钮时查找CSS选择器为.btn-search的按钮，如果10秒内它是可点击的，也就是成功加载出来了，就返回这个按钮节点；如果超过10秒还不可点击，也就是没有加载出来，就抛出异常。

运行代码，在网速较佳的情况下是可以成功加载出来的。

控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"07dd2fbc2d5b1ce40e82b9754aba8fa8"</span>, <span class="attribute">element</span>=<span class="string">"0.5642646294074107-1"</span>)&gt;</span><br><span class="line">&lt;selenium.webdriver.remote.webelement.WebElement (<span class="attribute">session</span>=<span class="string">"07dd2fbc2d5b1ce40e82b9754aba8fa8"</span>, <span class="attribute">element</span>=<span class="string">"0.5642646294074107-2"</span>)&gt;</span><br></pre></td></tr></tbody></table>

可以看到，控制台成功输出了两个节点，它们都是`WebElement`类型。

如果网络有问题，10秒内没有成功加载，那就抛出`TimeoutException`异常，此时控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line">TimeoutException Traceback (most recent call last)</span><br><span class="line">&lt;ipython-input-<span class="number">4</span>-f3d73973b223&gt; <span class="keyword">in</span> &lt;<span class="keyword">module</span>&gt;<span class="literal">()</span></span><br><span class="line">      <span class="number">7</span> browser.get('https:<span class="comment">//www.taobao.com/')</span></span><br><span class="line">      <span class="number">8</span> wait = <span class="constructor">WebDriverWait(<span class="params">browser</span>, 10)</span></span><br><span class="line">----&gt; <span class="number">9</span> input = wait.until(<span class="module-access"><span class="module"><span class="identifier">EC</span>.</span></span>presence<span class="constructor">_of_element_located((By.ID, '<span class="params">q</span>')</span>))</span><br></pre></td></tr></tbody></table>

关于等待条件，其实还有很多，比如判断标题内容，判断某个节点内是否出现了某文字等。表7-1列出了所有的等待条件。

表7-1 等待条件及其含义

等待条件

含义

`title_is`

标题是某内容

`title_contains`

标题包含某内容

`presence_of_element_located`

节点加载出来，传入定位元组，如`(By.ID, 'p')`

`visibility_of_element_located`

节点可见，传入定位元组

`visibility_of`

可见，传入节点对象

`presence_of_all_elements_located`

所有节点加载出来

`text_to_be_present_in_element`

某个节点文本包含某文字

`text_to_be_present_in_element_value`

某个节点值包含某文字

`frame_to_be_available_and_switch_to_it`

加载并切换

`invisibility_of_element_located`

节点不可见

`element_to_be_clickable`

节点可点击

`staleness_of`

判断一个节点是否仍在DOM，可判断页面是否已经刷新

`element_to_be_selected`

节点可选择，传节点对象

`element_located_to_be_selected`

节点可选择，传入定位元组

`element_selection_state_to_be`

传入节点对象以及状态，相等返回`True`，否则返回`False`

`element_located_selection_state_to_be`

传入定位元组以及状态，相等返回`True`，否则返回`False`

`alert_is_present`

是否出现警告

关于更多等待条件的参数及用法，可以参考官方文档：http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.support.expected\_conditions。

[](about:blank#12-%E5%89%8D%E8%BF%9B%E5%92%8C%E5%90%8E%E9%80%80 "12. 前进和后退")12\. 前进和后退
--------------------------------------------------------------------------------------

平常使用浏览器时都有前进和后退功能，Selenium也可以完成这个操作，它使用`back()`方法后退，使用`forward()`方法前进。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">import</span> <span class="type">time</span></span><br><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.baidu.com/'</span>)</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.taobao.com/'</span>)</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.python.org/'</span>)</span><br><span class="line">browser.back()</span><br><span class="line"><span class="type">time</span>.sleep(<span class="number">1</span>)</span><br><span class="line">browser.forward()</span><br><span class="line">browser.<span class="keyword">close</span>()</span><br></pre></td></tr></tbody></table>

这里我们连续访问3个页面，然后调用`back()`方法回到第二个页面，接下来再调用`forward()`方法又可以前进到第三个页面。

[](about:blank#13-Cookies "13. Cookies")13\. Cookies
----------------------------------------------------

使用Selenium，还可以方便地对Cookies进行操作，例如获取、添加、删除Cookies等。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="builtin-name">get</span>(<span class="string">'https://www.zhihu.com/explore'</span>)</span><br><span class="line"><span class="builtin-name">print</span>(browser.get_cookies())</span><br><span class="line">browser.add_cookie({<span class="string">'name'</span>: <span class="string">'name'</span>, <span class="string">'domain'</span>: <span class="string">'www.zhihu.com'</span>, <span class="string">'value'</span>: <span class="string">'germey'</span>})</span><br><span class="line"><span class="builtin-name">print</span>(browser.get_cookies())</span><br><span class="line">browser.delete_all_cookies()</span><br><span class="line"><span class="builtin-name">print</span>(browser.get_cookies())</span><br></pre></td></tr></tbody></table>

首先，我们访问了知乎。加载完成后，浏览器实际上已经生成Cookies了。接着，调用`get_cookies()`方法获取所有的Cookies。然后，我们添加一个Cookie，这里传入一个字典，有`name`、`domain`和`value`等内容。接下来，再次获取所有的Cookies。可以发现，结果就多了这一项新加的Cookie。最后，调用`delete_all_cookies()`方法删除所有的Cookies。再重新获取，发现结果就为空了。

控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">[{<span class="symbol">'secure</span><span class="symbol">':</span> False, <span class="symbol">'value</span><span class="symbol">':</span> '<span class="string">"NGM0ZTM5NDAwMWEyNDQwNDk5ODlkZWY3OTkxY2I0NDY=|1491604091|236e34290a6f407bfbb517888849ea509ac366d0"</span>', <span class="symbol">'domain</span><span class="symbol">':</span> <span class="symbol">'.zhihu.com</span>', <span class="symbol">'path</span><span class="symbol">':</span> <span class="symbol">'/</span>', <span class="symbol">'httpOnly</span><span class="symbol">':</span> False, <span class="symbol">'name</span><span class="symbol">':</span> <span class="symbol">'l_cap_id</span>', <span class="symbol">'expiry</span><span class="symbol">':</span> <span class="number">1494196091.403418</span>}]</span><br><span class="line">[{<span class="symbol">'secure</span><span class="symbol">':</span> False, <span class="symbol">'value</span><span class="symbol">':</span> <span class="symbol">'germey</span>', <span class="symbol">'domain</span><span class="symbol">':</span> <span class="symbol">'.www.zhihu.com</span>', <span class="symbol">'path</span><span class="symbol">':</span> <span class="symbol">'/</span>', <span class="symbol">'httpOnly</span><span class="symbol">':</span> False, <span class="symbol">'name</span><span class="symbol">':</span> <span class="symbol">'name</span>'}, {<span class="symbol">'secure</span><span class="symbol">':</span> False, <span class="symbol">'value</span><span class="symbol">':</span> '<span class="string">"NGM0ZTM5NDAwMWEyNDQwNDk5ODlkZWY3OTkxY2I0NDY=|1491604091|236e34290a6f407bfbb517888849ea509ac366d0"</span>', <span class="symbol">'domain</span><span class="symbol">':</span> <span class="symbol">'.zhihu.com</span>', <span class="symbol">'path</span><span class="symbol">':</span> <span class="symbol">'/</span>', <span class="symbol">'httpOnly</span><span class="symbol">':</span> False, <span class="symbol">'name</span><span class="symbol">':</span> <span class="symbol">'l_cap_id</span>', <span class="symbol">'expiry</span><span class="symbol">':</span> <span class="number">1494196091.403418</span>}]</span><br><span class="line">[]</span><br></pre></td></tr></tbody></table>

[](about:blank#14-%E9%80%89%E9%A1%B9%E5%8D%A1%E7%AE%A1%E7%90%86 "14. 选项卡管理")14\. 选项卡管理
--------------------------------------------------------------------------------------

在访问网页的时候，会开启一个个选项卡。在Selenium中，我们也可以对选项卡进行操作。示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br></pre></td><td class="code"><pre><span class="line">import time</span><br><span class="line">from selenium import webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.<span class="constructor">Chrome()</span></span><br><span class="line">browser.get('https:<span class="comment">//www.baidu.com')</span></span><br><span class="line">browser.execute<span class="constructor">_script('<span class="params">window</span>.<span class="params">open</span>()</span>')</span><br><span class="line">print(browser.window_handles)</span><br><span class="line">browser.switch<span class="constructor">_to_window(<span class="params">browser</span>.<span class="params">window_handles</span>[1])</span></span><br><span class="line">browser.get('https:<span class="comment">//www.taobao.com')</span></span><br><span class="line">time.sleep(<span class="number">1</span>)</span><br><span class="line">browser.switch<span class="constructor">_to_window(<span class="params">browser</span>.<span class="params">window_handles</span>[0])</span></span><br><span class="line">browser.get('https:<span class="comment">//python.org')</span></span><br></pre></td></tr></tbody></table>

控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">['CDwindow<span class="number">-4</span>f58e3a7<span class="number">-7167</span><span class="number">-4587</span>-bedf<span class="number">-9</span>cd8c867f435', 'CDwindow<span class="number">-6e05</span>f076<span class="number">-6</span>d77<span class="number">-453</span>a-a36c<span class="number">-32</span>baacc447df']</span><br></pre></td></tr></tbody></table>

首先访问了百度，然后调用了`execute_script()`方法，这里传入`window.open()`这个JavaScript语句新开启一个选项卡。接下来，我们想切换到该选项卡。这里调用`window_handles`属性获取当前开启的所有选项卡，返回的是选项卡的代号列表。要想切换选项卡，只需要调用`switch_to_window()`方法即可，其中参数是选项卡的代号。这里我们将第二个选项卡代号传入，即跳转到第二个选项卡，接下来在第二个选项卡下打开一个新页面，然后切换回第一个选项卡重新调用switch\_to\_window()方法，再执行其他操作即可。

[](about:blank#15-%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86 "15. 异常处理")15\. 异常处理
---------------------------------------------------------------------------

在使用Selenium的过程中，难免会遇到一些异常，例如超时、节点未找到等错误，一旦出现此类错误，程序便不会继续运行了。这里我们可以使用`try except`语句来捕获各种异常。

首先，演示一下节点未找到的异常，示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line">browser.<span class="keyword">get</span>(<span class="string">'https://www.baidu.com'</span>)</span><br><span class="line">browser.find_element_by_id(<span class="string">'hello'</span>)</span><br></pre></td></tr></tbody></table>

这里首先打开百度页面，然后尝试选择一个并不存在的节点，此时就会遇到异常。

运行之后控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line">NoSuchElementException Traceback (most recent <span class="keyword">call</span> <span class="keyword">last</span>)</span><br><span class="line"><span class="symbol">&lt;ipython-input-23-978945848a1b&gt;</span> in <span class="symbol">&lt;module&gt;</span>()</span><br><span class="line">      <span class="number">3</span> browser = webdriver.Chrome()</span><br><span class="line">      <span class="number">4</span> browser.<span class="built_in">get</span>(<span class="string">'https://www.baidu.com'</span>)</span><br><span class="line">----&gt; <span class="number">5</span> browser.find_element_by_id(<span class="string">'hello'</span>)</span><br></pre></td></tr></tbody></table>

可以看到，这里抛出了`NoSuchElementException`异常，这通常是节点未找到的异常。为了防止程序遇到异常而中断，我们需要捕获这些异常，示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver</span><br><span class="line"><span class="keyword">from</span> selenium.common.exceptions <span class="keyword">import</span> TimeoutException, NoSuchElementException</span><br><span class="line"></span><br><span class="line">browser = webdriver.Chrome()</span><br><span class="line"><span class="keyword">try</span>:</span><br><span class="line">    browser.get(<span class="string">'https://www.baidu.com'</span>)</span><br><span class="line"><span class="keyword">except</span> TimeoutException:</span><br><span class="line">    print(<span class="string">'Time Out'</span>)</span><br><span class="line"><span class="keyword">try</span>:</span><br><span class="line">    browser.find_element_by_id(<span class="string">'hello'</span>)</span><br><span class="line"><span class="keyword">except</span> NoSuchElementException:</span><br><span class="line">    print(<span class="string">'No Element'</span>)</span><br><span class="line"><span class="keyword">finally</span>:</span><br><span class="line">    browser.close()</span><br></pre></td></tr></tbody></table>

这里我们使用`try except`来捕获各类异常。比如，我们对`find_element_by_id()`查找节点的方法捕获`NoSuchElementException`异常，这样一旦出现这样的错误，就进行异常处理，程序也不会中断了。

控制台的输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="literal">No</span> <span class="string">Element</span></span><br></pre></td></tr></tbody></table>

关于更多的异常类，可以参考官方文档：http://selenium-python.readthedocs.io/api.html#module-selenium.common.exceptions。

现在，我们基本对Selenium的常规用法有了大体的了解。使用Selenium，处理JavaScript不再是难事。
