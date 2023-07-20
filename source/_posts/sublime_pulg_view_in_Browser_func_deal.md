---
title: Sublime中View in Browser功能不生效处理方法
date: 2021-08-16 14:58:36
tags: [IDE, Sublime Text]
categories: [IDE, Sublime Text]

---

### 前言

安装完`view in browser`插件后，在文档中点击右键的view in browser 不生效，解决方法如下：

#### 1、打开preferences-->package setting--> view in browser -->settings-default，复制文件内容到settings-users中；因为`settings-default`文件是只读的

#### 2、根据本地浏览器的所在地址，修改`settings-user`文件中的地址；

```json
{
	"posix": {
		"linux": {
			"firefox": "firefox -new-tab",
			"chrome": "google-chrome",
			"chrome64": "google-chrome",
			"chromium": "chromium"
		},
		"linux2": {
			"firefox": "firefox -new-tab",
			"chrome": "google-chrome",
			"chrome64": "google-chrome",
			"chromium": "chromium"
		},
		"darwin": {
			"firefox": "open -a \"/Applications/Firefox.app\"",
			"safari": "open -a \"/Applications/Safari.app\"",
			"chrome": "open -a \"/Applications/Google Chrome.app\"",
			"chrome64": "open -a \"/Applications/Google Chrome.app\"",
			"yandex": "open -a \"/Applications/Yandex.app\""
		}
	},
	"nt": {
		"win32": {
			"firefox": "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe -new-tab",
			"iexplore": "C:\\Program Files\\Internet Explorer\\iexplore.exe",
			"chrome": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
			"chrome64": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
			"yandex": "%Local AppData%\\Yandex\\YandexBrowser\\browser.exe"
		}
	},

	"browser": "chrome"
}

```

#### 3、修改文件最后的`browser`，比如以上代码就是设置了chrome浏览器的默认打开方式，这样就可以通过右键点击文档然后点击`view in browser`正常打开`chrome`进行预览了

#### 4、如果需要通过快捷键快速打开，可以通过`preference-->key bindings`中添加以下信息，根据自己需要修改快捷键组合

```json
[
    { "keys": [ "ctrl+alt+v" ], "command": "view_in_browser" },
    { "keys": [ "ctrl+alt+f" ], "command": "view_in_browser", "args": { "browser": "firefox" } },
    { "keys": [ "ctrl+alt+c" ], "command": "view_in_browser", "args": { "browser": "chrome" } },
    { "keys": [ "ctrl+alt+i" ], "command": "view_in_browser", "args": { "browser": "iexplore" } },
    { "keys": [ "ctrl+alt+s" ], "command": "view_in_browser", "args": { "browser": "safari" } }
]
```

#### 5、设置完成。

