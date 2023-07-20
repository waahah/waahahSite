---
title: Sublime Text 插件整理
date: 2021-05-01 14:58:36
tags: [IDE, Sublime Text]
categories: [IDE, Sublime Text]

---


### 前言

Sublime Text 插件整理


Package Control - 插件管理器
-----

1.在 Sublime 中打开 View –> Show Console，将以下代码复制到输入框中后按回车键 

```python
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) );open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen('http://sublime.wbond.net/' + pf.replace(' ','%20')).read()) 

```

2.验证是否安装成功 打开 Preferences –> Package Control，如果能看到此菜单，则表示安装成功

Emmet
-----

HTML/CSS代码快速编写插件 

1)打开控制台 在Sublime中打开Preferences –> Package Control，也可直接按快捷键ctrl+shift+p，选择或搜索 Install Package 

2)安装 Emmet 插件 在输入框中输入 emmet，点击出现的插件，下方状态栏会显示安装状态，安装完成会显示说明文档 

3)安装PyV8插件 正常情况下，当安装完Emmet插件后会自动下载并安装PyV8插件，直至状态栏不动为止 

4)验证是否安装成功 新建一个.html文件，在文件中键入字符!（注意是英文符号），然后按“Tab“键，如果出现html基础结构则表示安装成功

PyV8
----

Emmet插件依赖于PyV8插件，如果自动安装PyV8插件失败，则需要手动下载PyV8插件并安装 

1)下载PyV8插件 打开浏览器，输入：[https://github.com/emmetio/pyv8-binaries](https://github.com/emmetio/pyv8-binaries)，点击下图中的绿色按钮，再点击“Download ZIP“ 

2)拷贝到Sublime中 将下载文件解压缩，再找到pyv8-osx-p3.zip文件，同样解压缩，将其中的2个文件拷贝到PyV8/osx-p3目录下，如果该文件夹中有其它内容，可以先全部删除再粘贴 

3)安装 再次打开Sublime后需等待安装结束（查看状态栏，静止不变），再次尝试

HTML5
-----

在Sublime中安装 HTML5 插件

CSS3
----

在Sublime中安装 CSS3 插件

JavaScript Completions
----------------------

在Sublime中安装 JavaScript Completions 插件

jQuery
------

在Sublime中安装 jQuery 插件

JsFormat
--------

在Sublime中安装 JsFormat 插件

HTML-CSS-JS Prettify
--------------------

HTML/CSS/JS代码格式化插件 

1)在Sublime中安装 HTML-CSS-JS Prettify 插件 

2)其依赖于Node.js，所以需要安装Node.js 到Node.js官网下载对应的版本并安装 

3)确认Node.js安装路径 鼠标右键HTML/CSS/JS Prettify –> Set node Path，指定Node.js的安装路径 

4)格式化代码 鼠标右键HTML/CSS/JS Prettify –> Pretty Code

Pretty JSON
-----------

JSON代码格式化插件 

1)在Sublime中安装 Pretty JSON 插件 

2)自定义快捷键 打开Preference –> Key Bindings-User，添加格式化代码快捷键为ctrl+shift+f { “keys”: \[“ctrl+shift+f”\], “command”: “pretty\_json” }

Better Completion
-----------------

JavaScript、jQuery、Bootstrap等js库的自动补全插件，该插件的特点就是可以自定义配置需要自动补全的库。 

1)在Sublime中安装 Better Completion 插件 

2)配置需要自动补全的库

SideBarEnhancements
-------------------

侧边栏增强插件，可以指定预览时使用的浏览器并设置快捷键 

1)在Sublime中安装 SideBarEnhancements 侧边栏增强插件 

2)指定使用的浏览器 打开Preference –> Package Settings –> Side Bar –> Settings User，在打开的文件中添加如下内容 { “default\_browser”: “chrome” //one of this list: firefox, aurora, chrome, canary, chromium, opera, safari } 

3)为浏览器绑定快捷键 打开Preference –> Package Settings –> Side Bar –> key Bindings-User，在打开的文件中添加如下内容 { “keys”: \[“alt+f12”\], “command”: “side\_bar\_open\_in\_browser” }, 至此，所有设置已经完成，可以在页面中按相应的热键，直接在指定的浏览器中预览

LESS
----

LESS语法高度显示和代码提示 

1）在Sublime中安装 LESS 插件 

2）关闭并重新打开.less文件即可

Less2Css
--------

编译Less，保存.less文件时自动编译为.css文件 

1）在Sublime中安装 Less2Ccss 插件 

2）根据环境不同配置安装也有所不同，分为windows环境和MacOS环境，具体可参考：[https://fdream.net/blog/article/783.aspx](https://fdream.net/blog/article/783.aspx) 2.1在windows环境下，依赖less.js-windows 

2.1.1)下载less.js-windows-master.rar文件，解压到本地目录。 

2.1.2)将目录路径添加到环境变量PATH中，如D:\\open\\less.js-windows： 

2.1.3)验证是否成功 打开DOS命令行，输入lessc，如果有如下提示则表示设置成功 2.2在MacOS环境下，依赖nodejs和lessc 

2.2.1)安装npm：官网直接下载node-v6.9.5.pkg并安装，会自动安装npm 

2.2.2)安装lessc：在终端执行sudo npm install less -gd，安装完成后在终端执行命令lessc验证 

2.2.3)安装less-plugin-clean-css：在终端执行sudo npm install less-plugin-clean-css -g 

2.2.4)验证是否成功

SublimeServer
-------------

让Sublime成为静态WEB服务器，无需单独启动Tomcat或者Apache这样的重型服务器 

1）在Sublime中安装 SublimeServer 插件 

2）安装完成后点击菜单栏中的”工具”——”SublimeServer”——”Settings”，可以查看并修改SublimeServer的服务器端口、文件扩展名等 

3）点击Start SublimeServer可以启动服务器 

4）在打开的.html文件中右击，选择”View in SublimeServer”会自动打开浏览器并通过Web服务器进行访问 注：SublimeServer要求你的代码文件夹，要添加到Sublime Text的项目里面才能访问，步骤：点击菜单栏中的”项目”——”添加文件夹到项目”。

Color Highlighter
-----------------

展示颜色代码的真正颜色。同时还提供一个颜色选择器可以方便地更改颜色。 

1）在Sublime中安装 Color Highlighter 插件 

2）修改颜色显示方式，默认为下划线显示，修改为填充显示 打开Preference –> Package Settings –> Color Highlighter –> Settings User，在打开的文件中添加如下内容 { “ha\_style”: “filled”, } 

3）此时会看到颜色代码会直接显示相应的颜色，同时可以右击选择”Choose color”打开颜色选择器，自己选择更改颜色

CSS Extended Completions
------------------------

智能提示.css文件中的类名，需要关联添加CSS文件 

1）在Sublime中安装 CSS Extended Completions 插件 

2）将提示文件添加到Cache缓存中 在侧边栏中右击文件，选择”CSS Extended Completions”——”Add CSS Files To Cache”等 

3）在.html文件中引入.css样式文件，这时在html页面中编写样式时会自动提示前面添加的css文件中的样式

AutoFileName
------------

提示文件路径，快速输入文件名 

1）在Sublime中安装 AutoFileName 插件 

2）在输入文件路径时会自动提示，如路径名、图片选取等

Doc​Blockr
----------

生成优美注释 

1）在Sublime中安装 Doc​Blockr 插件 

2）输入/\*或/，然后按回车，会自动生成优美注释，如果在函数上面写/，还会包括参数、返回值等

GitGutter
---------

本地Git变化提示，可以在行首显示当前行的Git状态，是增加的、修改的还是删除的 

1）在Sublime中安装 GitGutter 插件 

2）在当前Git状态与本地仓库中的状态有改变时会显示

AngularJS
---------

AngularJS提示插件 在Sublime中安装 AngularJS 插件即可

MarkdownEditing
---------------

编辑markdown时高亮显示 

1）在Sublime中安装 MarkdownEditing 插件 

2）设置显示样式外观等 打开Preference –> Package Settings –> Markdown Editing –> Markdown GFM Settings-User，在打开的文件中添加如下内容 { // “color\_scheme”: “Packages/MarkdownEditing/MarkdownEditor-Dark.tmTheme”, “color\_scheme”: “Packages/MarkdownEditing/MarkdownEditor-Yellow.tmTheme”, “draw\_centered”: false, //默认为true，居中对齐，设置为false，左对齐 “wrap\_width”: 120, //每行字符数上限 “highlight\_line”: true, //当前行高亮显示 } 注：更多配置可以参考Markdown GFM Settings-Default

Markdown Preview
----------------

在浏览器中预览生成的HTML文件 

1）在Sublime中安装 Markdown Preview 插件 

2）为浏览器绑定快捷键 打开Preference –> Key Bindings-User，在打开的文件中添加如下内容 {“keys”: \[“alt+f11”\], “command”: “markdown\_preview”, “args”: { “target”: “browser”}} 至此，所有设置已经完成，编辑md文件后按相应的热键，直接在指定的浏览器中预览

Terminal
--------

在当前位置打开终端 

1）在Sublime中安装 Terminal 插件 

2）使用方法 在左侧的边栏中右击文件，选择Open Terminal Here即可

SublimeText-Nodejs
------------------

在Sublime中直接运行调试（此插件的安装方式比较特殊，无法直接通过Package Console安装） 

1）git clone [https://github.com/tanepiper/SublimeText-Nodejs.git](https://github.com/tanepiper/SublimeText-Nodejs.git) ~/Library/Application\\ Support/Sublime\\ Text\\ 3/Packages/Nodejs 

2）配置 当安装好nodejs后,接着进入Perferences -> Browse Packages -> Nodejs 打开Nodejs.sublime-build文件，将osx中内容改为 “cmd”: \[“killall node; /usr/local/bin/node $file”\] 打开Nodejs.sublime-settings文件，将node\_command内容改为/usr/local/bin/node，npm\_command内容改为/usr/local/bin/npm 

3）运行node.js 通过快捷键command + b直接运行，显示调试结果（此插件的安装方式比较特殊，无法直接通过Package ）

ConvertToUTF8
-------------

解决Sublime不支持GBK、GB2312编码的问题，支持打开GBK编码的文件 在Sublime中安装 ConvertToUTF8 插件

cssrem
------

自动将CSS的px值转换为rem值（此插件的安装方式比较特殊，无法直接通过Package Console安装） 

1）git clone [https://github.com/hyb628/cssrem.git](https://github.com/hyb628/cssrem.git) 

2）进入packages目录：Sublime Text -> Preferences -> Browse Packages 

3）将克隆下载的cssrem-master目录复制到上一步打开的Packges目录里 

4）修改默认配置 打开cssrem-master目录下的cssrem.sublime-settings文件，进行修改 { “px\_to\_rem”: 40, //px转rem的单位比例，默认为40，一般修改为100 “max\_rem\_fraction\_length”: 6, //px转rem的小数部分的最大长度。默认为6。 “available\_file\_types”: \[“.css”, “.less”, “.sass”,”.html”\] //启用此插件的文件类型。默认为：\[“.css”, “.less”, “.sass”\] } 

5）重启Sublime Text