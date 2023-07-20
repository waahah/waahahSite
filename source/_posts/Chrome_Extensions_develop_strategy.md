---
title: Chrome Extensions 开发攻略
date: 2023-08-25 14:58:36
tags: [JavaScript, Extensions, Chrome]
categories: [Coding, JavaScript]
---

Chrome插件（Extensions）开发攻略
========================

本文将从个人经验出发，讲述为什么需要Chrome插件，如何开发，如何调试，到哪里找资料，会遇到怎样的问题以及如何解决等。OK，准备开始吧，我尽量把文章写得好看点，以免读者打瞌睡。

为什么需要
=====

简单地说，浏览器插件，可以大大的扩展你的浏览器的功能。包括但不仅限于这些功能：捕捉特定网页的内容，捕捉HTTP报文，捕捉用户浏览动作，改变浏览器地址栏/起始页/书签/Tab等界面元素的行为，与别的站点通信，修改网页内容……给你增加许多想象空间，试想想看，你可以用它来识别一些网站上的广告代码，并直接把这些代码删掉，这样你就不会受到广告的困扰了，没错，如你所愿，这样的插件别人已经开发好了，你可以直接用。不过，也要说浏览器插件的弊端，那就是：会带来一些安全隐患，也可能让你的浏览器变得缓慢甚至不稳定。

为什么是Chrome
==========

因为Chrome的插件开发起来最简单，总体上看没什么新的技术，开发语言就是javascript，web前端工程师能很快上手；而Firefox的插件开发则复杂许多，涉及到环境的搭建和一些WEB以外的技术；IE的插件开发就更复杂了，需要熟悉C++和COM技术，当然还要装微软的Visual Studio。

这里有篇老外写的文章，对比Chrome、Opera和Firefox的插件开发的：[http://blog.nparashuram.com/2011/10/writing-browser-extensions-comparing.html](http://blog.nparashuram.com/2011/10/writing-browser-extensions-comparing.html)。

应该说Chrome和Opera的插件的开发都不难，但Firefox的则比较棘手，也许你要问，那为什么Firefox的插件是最丰富的？我想这有些历史原因，Chrome出来毕竟比较晚，另外几种浏览器提供的插件的功能也是不尽相同的，OK，我们还是言归正传吧。

需要准备什么
======

几乎是零需求。Chrome浏览器和一个文本编辑器即可，文本编辑器最好是带语法高亮的那种。谷歌对我们做技术的人来说真是太大度了。

如何开始
====

强烈建议看看官方的说明：[https://developer.chrome.com/extensions/getstarted.html](https://developer.chrome.com/extensions/getstarted.html)

文章不长，照着文章去做，完成后，你就成功开发了第一个Chrome插件，这个插件会弹出一个小窗口，上面显示些阿猫阿狗的小图片。

插件构成
----

注意：chrome 插件机制本身也在更新，本文讲述的是目前普遍使用的 V2 插件的开发。

chrome 插件通常由以下几部分组成：

1.  [manifest.json](https://developer.chrome.com/docs/extensions/mv2/getstarted/ "https://developer.chrome.com/docs/extensions/mv2/getstarted/")：相当于插件的 meta 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。
2.  [background script](https://developer.chrome.com/docs/extensions/mv2/background_pages/ "https://developer.chrome.com/docs/extensions/mv2/background_pages/")：可以调用全部的 chrome 插件 API，实现跨域请求、网页截屏、弹出 chrome 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。
3.  功能页面：包括点击插件图标弹出的页面（简称 popup）、插件的配置页面（简称 options）。
4.  [content script](https://developer.chrome.com/docs/extensions/mv2/content_scripts/ "https://developer.chrome.com/docs/extensions/mv2/content_scripts/")：早期也被称为 `injected script`，是插件注入到页面的脚本，但是不会体现在页面 DOM 结构里。`content script` 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。content script 可以调用有限的 chrome 插件 API，网络请求收到同源策略限制。

插件的架构可以参考[官方文档](https://developer.chrome.com/docs/extensions/mv2/architecture-overview/ "https://developer.chrome.com/docs/extensions/mv2/architecture-overview/")。

重点说明以下几点：

1.  browser action 和 page action：这俩我们可以理解为插件的按钮。browser action 会固定在 chrome 的工具栏。而 page action 可以设置特定的网页才显示图标，在地址栏的右端，如下图：

![](https://s2.loli.net/2023/07/19/E2R8THuL7odhPQg.webp)

大部分插件点击之后会显示 UI，也就是上文描述的插件功能页面部分，一般称为 popup 页面，如下图：

!](https://s2.loli.net/2023/07/19/UCcOEoxfmtFXuHY.webp)

**popup 无法通过程序打开，只能由用户点击打开。点击 popup 之外的区域会导致 popup 收起。**

page action 和 browser action 分别由 manifest.json 的 [page_action](https://developer.chrome.com/docs/extensions/reference/pageAction/ "https://developer.chrome.com/docs/extensions/reference/pageAction/") 和 [browser_action](https://developer.chrome.com/docs/extensions/reference/browserAction/ "https://developer.chrome.com/docs/extensions/reference/browserAction/") 字段配置。

2.  由于 content script 受到同源策略的限制，所以一般网络请求都交给 background script 处理。
3.  content script、插件功能页面、background script 之间的通信架构如下图：

![](https://s2.loli.net/2023/07/19/cbtxXedFYCj2uWZ.webp)

4.  chrome 可以打开多个浏览器窗口，而一个窗口会有多个 tab，所以插件的结构大致如下：

![](https://s2.loli.net/2023/07/19/UfF3xAHnqPl2RbN.webp)

如上图，功能页面是每个 window 一份，但是每个 tab 都会注入 content script。

manifest.json
-------------

下文简称 `manifest` ，其中有这么几个字段可以重点说明：

### content_scripts

`content_scripts` 可以使用以下两种方式注入页面，这两种方式并不冲突，可以结合使用。

#### 声明式注入

举例如下：

```json
{
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "run_at": "document_idle",
      "js": ["content.js"]
    }
  ]
}

```

在 manifest 中声明要加载的脚本，各个字段都比较直观。其中：

1.  matches 表示页面 url 匹配时才加载
2.  `run_at` 表示在什么时机加载，一般是 `document_idle`，避免 content_scripts 影响页面加载性能。

需要注意的是，如果用户已经打开了 N 个页面，然后再安装插件，这 N 个页面除非重新刷新，否则是不会加载 manifest 声明的 content_scripts。安装插件之后新打开的页面是可以加载 content_scripts 的。

所以需要在用户点击插件图标时，探测页面中的 content_scripts 是否存在（发送消息是否有响应/出错），再提示用户刷新页面。

#### 程序注入

还可以使用程序动态注入脚本，代码如下：

```js
chrome.tabs.executeScript({
  file: "content.js",
});

```

比如用户点击插件图标时执行注入脚本，则无需刷新页面，代码如下：

```js
// 监听插件图标点击事件
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: 'content.js',
  });
});

```

值得注意的是，采用以上方式，用户每次点击插件图标时，`content.js` 都会被执行，可能会引起错误。

```js
// content.js
let loaded = false;

if (!loaded) {
    // do something
    loaded = true;
}

console.log(loaded);

```

第一次执行 content.js 会打印 false，而第二次执行 content.js 则会报错，提示 loaded 变量已经声明了。

由此可见 content.js 的执行会影响其所在的沙盒。

我们可以这么做：

```js
// content.js

if (!window.contentLoaded) {
    // do something
    window.contentLoaded = true;
}

console.log(window.contentLoaded);

```

使用沙盒内的全局变量则可以避免 content.js 重复执行带来的问题。

综上所述：声明式只会注入一次，缺点是可能需要刷新页面。程序式不需要刷新页面，缺点是可能会注入多次。

### permissions

该字段是一个字符串数组，用来声明插件需要的权限，这样才能调用某些 chrome API，常见的有：

1.  tabs
2.  activeTab
3.  contextMenus：网页右键菜单，browser_action 右键菜单
4.  cookies：操作 cookie，和用户登录态相关的功能可能会用到该权限
5.  storage：插件存储，不是 localStorage
6.  web_accessible_resources：网页能访问的插件内部资源，比如插件提供 SDK 给页面使用，如 ethereum 的 metamask 钱包插件。或者是修改 DOM 结构用到了插件的样式、图片、字体等资源。

permissions 中还可以声明多个 url patterns，表示插件需要访问这些 url，比如和 API 通信。

background script
-----------------

下文简称 background，可以理解它是在一个隐藏的 tab 中执行，所在的页面域名为空，这会影响对 document.cookie 的使用。

比如 background 需要和 a.com 通信。首先应该把 `*://*.a.com/*` 加入到 manifest 的 permissions 数组中。

当发送网络请求时，浏览器会自动带上 a.com 的 cookie，服务器的 set-cookie 也会对浏览器生效。这是符合预期的。

但是读取 document.cookie 时，由于 background 所在的域名为空，a.com 被认为是第三方 cookie，会读取不到。所以需要使用 [chrome.cookies](https://developer.chrome.com/docs/extensions/reference/cookies/ "https://developer.chrome.com/docs/extensions/reference/cookies/") API 来读取 cookie。

background 设置 document.cookie 时，**不能指定域名**，否则会设置失败。比如：

```js
// 会失败，因为指定的域名和 background 所在的域名不符
document.cookie = `session=xxxxxxx; domain=a.com; max-age=9999999999; path=/`;

// 正确的做法，不要指定域名
document.cookie = `session=xxxxxxx; max-age=9999999999`;

```

一般不需要这么操作 cookie，但是可能依赖的 npm 包会操作 document.cookie，所以这里说明一下。

background 使用 tabs 接口操作浏览器的 tab 窗口，比如：

```js
// 打开新 tab
async function open(url: string): Promise<number> {
  return new Promise((resolve) => {
    chrome.tabs.create(
      {
        url,
      },
      (tab) => resolve(tab.id!)
    );
  });
}

// 获取活跃的 tab，通常是用户正在浏览的页面
async function getActiveTab(): Promise<chrome.tabs.Tab | null> {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
}

// 将指定的 tab 变成活跃的
async function activate(
  tabId?: number,
  url?: string
): Promise<number | undefined> {
  if (typeof tabId === "undefined") {
    return tabId;
  }

  // firefox 不支持 selected 参数
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update#parameters
  const options: chrome.tabs.UpdateProperties = IS_FIREFOX
    ? { active: true }
    : { selected: true };
  if (url) {
    options.url = url;
  }

  return new Promise((resolve) => {
    chrome.tabs.update(tabId, options, () => resolve(tabId));
  });
}

// 打开新窗口，或者是激活窗口
async function openOrActivate(url: string): Promise<number> {
  const pattern = getUrlPattern(url);
  return new Promise<number>((resolve) => {
    chrome.tabs.query(
      {
        url: pattern,
      },
      (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          return Tabs.activate(tabs[0].id);
        } else {
          this.open(url).then((id) => resolve(id));
        }
      }
    );
  });
}

```

content scripts
---------------

下文简称 [content](https://developer.chrome.com/docs/extensions/mv2/content_scripts/ "https://developer.chrome.com/docs/extensions/mv2/content_scripts/")，它只能使用有限的 chrome API。

由于 content 可以访问 DOM，可以用它来选择、修改、删除、增加网页元素。

但是 content 是运行在隔离的空间（类似沙盒），所以如果需要和页面的其他脚本通信，需要采用 `window.postMessage` 的方式。

比如页面内容如下：

```html
<!-- index.html -->
<html>
  <body>
    <div id="app"></div>
    <button id="btn" type="button">submit</button>
  </body>
  <script>
    window.globalData = {
      userId: 12345,
    };
  </script>
</html>

```

content 内容如下：

```js
// 成功
document.getElementById("app").innerHTML = "hello chrome";

// window.globalData 是 undefined
console.log(window.globalData);

```

### 资源注入

content 可以向页面中注入 `<script>`，由此给页面提供 SDK 等功能，注入的脚本和页面自己的脚本一样，都无法和 content 直接通信。

注意：注入的资源要先在 menifest 的 `web_accessible_resources` 字段中声明。

```js
// content 内容
const script = document.createElement("script");
script.src = chrome.runtime.getURL("sdk.js");
document.body.appendChild(script);

```
```js
// sdk.js
window.jsbridge = {
  version: "1.0.1",
  // ...
};

```

content 执行之后，可以看到页面结构多了个 `<script src="chrome-extension://xxxxxxxxxxxxx/sdk.js"></script>`，xxxxxxxx 表示插件的 id，由 chrome 生成。

注意，注入的 sdk.js 脚本是可以被页面内其他脚本访问到的（可以看作是页面自己的脚本，只是 origin 是 chrome-extensions://xxxxxxxxxxxxx），如下：

```js
document.getElementById("btn").addEventListener(
  "click",
  () => {
    console.log(window.jsbridge.version);
  },
  false
);

```

### 通信

content 可以和 background、popup、options 使用 chrome API 通信，参考官方文档：[developer.chrome.com/docs/extens…](https://developer.chrome.com/docs/extensions/mv2/background_pages/ "https://developer.chrome.com/docs/extensions/mv2/background_pages/")

常用的通信 API 是 `chrome.runtime.sendMessage`。

### UI

content 可以向页面中注入 UI，比如 evernote 的剪辑插件。

![](https://s2.loli.net/2023/07/19/Uwpi59Jn6kLS2Mm.webp)

前面提到过，点击 popup 之外的区域会导致 popup 收起，操作 DOM 会导致 popup 隐藏，而 **popup 无法用代码主动打开**，所以 evernote 的剪辑插件的 UI 就无法用 popup 来实现了。

这时候可以把 UI 作为 iframe 插入页面，比如：

```js
// content
const app = document.createElement("iframe");
app.src = chrome.runtime.getURL("app.html");
document.body.appendChild(app);

```

神奇的是 iframe 里的 javascript 是可以像 content 一样和 background 通信的。

background 给 iframe 发送消息时，不仅需要指定所在 tab 的 id，还需要指定 iframe 的 id。这里说的 iframe id 类似 tab id，是 chrome 分配的，而不是 iframe 标签的 id 属性。

功能页面
----

popup/options 和 background 的关系很亲密，它们甚至可以通过 `chrome.extension.getBackgroundPage()` 获取到 background 的全局变量。所以它们直接的通信花样很多，不过一般也是用 `chrome.runtime` 通信。

popup/options 和 content 之间的通信方式，可以 background -> content 通信类似。

options 用来设置插件，所以一般需要调用 `chrome.storage` 存储配置。

适配其他浏览器
-------

目前 chrome 插件适配工作量是比较小的，因为 edge、opera 都已经切换到 chromium 内核，firefox 也支持 chrome API。

不过需要查看用到的 API 是否支持，以及 API 的入参、出参是否一致。 比如前文提到 firefox `chrome.tabs.update` 方法第一个参数不支持 selected 属性。

firefox 还支持 [browser](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions") API，和 chrome API 不同的是 browser API 不使用回调函数，而是返回 promise。比如：

```js
browser.tabs.query({ currentWindow: true }).then((res) => console.log(res));

chrome.tabs.query({ currentWindow: true }, (res) => {
  console.log(res);
});

```

可以参考各浏览器的开发文档：

*   firefox: [developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension")
*   edge: [docs.microsoft.com/zh-cn/micro…](https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/developer-guide/port-chrome-extension "https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/developer-guide/port-chrome-extension")
*   360: [open.se.360.cn/open/extens…](http://open.se.360.cn/open/extension_dev/overview.html "http://open.se.360.cn/open/extension_dev/overview.html")
*   搜狗: [ie.sogou.com/open/doc/](http://ie.sogou.com/open/doc/ "http://ie.sogou.com/open/doc/")

发布
--

- chrome 发布插件需要花费 5 美元开通账号：[developer.chrome.com/docs/websto…](https://developer.chrome.com/docs/webstore/register/ "https://developer.chrome.com/docs/webstore/register/")

- firefox 发布文档：[addons.mozilla.org/en-US/devel…](https://addons.mozilla.org/en-US/developers/ "https://addons.mozilla.org/en-US/developers/")

- edge：[docs.microsoft.com/zh-cn/micro…](https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/publish/create-dev-account "https://docs.microsoft.com/zh-cn/microsoft-edge/extensions-chromium/publish/create-dev-account")


学习资料
====

理解了Chrome插件结构之后，我相信你完全有能力开发一款自己的插件了，当然了，你得自己去google一些资料，这里我就分享下我的方法。

首先，官方的资料一定得看看，[https://developer.chrome.com/extensions/index.html](https://developer.chrome.com/extensions/index.html)  这个上面的资料得大致浏览一下（不需要全部仔细看），这样你能够明白一些术语，知道如何去寻找你的解决方案。

再则，官方提供的例子，可以看看，[https://developer.chrome.com/extensions/samples.html](https://developer.chrome.com/extensions/samples.html) ，我发现上面的例子有些已经不能用于新版的Chrome了，但没关系，你只要找你想要的就行了，也不用一个个尝试，就根据你的需要，挑选几个你感兴趣的看看即可。

遇到问题，怎么办？当然是用google去查找问题，但这里我最最最强烈推荐[stackoverflow.com](http://stackoverflow.com/) ，这简直是解决问题的神器！不多解释了，用过便知。

学习过程基本上就是：看个大概，写点代码，调试调试。就可以了。哦，大前提当然是你得有javascript的基础。（你：呵呵，你在逗我吧！）

总结
==

我还是想说，我觉得Google对我们程序员来说是个很大度的公司，在Chrome这个产品上面就可见一斑。利用Chrome插件技术，我们可以做许多有用的东西，通过本文，相信你已经知道如何去开发一款Chrome插件了，当然了，Chrome插件的功能是很强大的，我用到的仅是冰山一小角。要深入，当然还需要更加充分地利用google和stackoverflow.com了。


更多参考：
--------

英文教程：[Getting Started: Building a Chrome Extension](https://developer.chrome.com/extensions/getstarted)

实例下载：[Sample Extensions](https://developer.chrome.com/extensions/samples) (英文) [扩展样例](http://crxdoczh.readthedocs.io/en/latest/4-samples/index.html#chapter4index) (中文)

开发指南：[http://crxdoczh.readthedocs.io/en/latest/1-guide/index.html#chapter1index](http://crxdoczh.readthedocs.io/en/latest/1-guide/index.html#chapter1index)

