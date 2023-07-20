---
title: Hexo友链朋友圈前端部署
date: 2023-04-26 14:58:36
tags: [ JavaScript, Python, Hexo, Blog, hexo_circle_of_friends]
categories: [Coding, Python]
---

Hexo友链朋友圈前端部署
======================================

|  | 管理面板？ | 更新情况 |
| --- | --- | --- |
| 方案：yyyz | ✔ | 保持最新 |
| 方案：林木木 | ❌ | 后端4.x及以下 |
| 方案：Akilar-SAO | ❌ | 后端3.x及以下 |
| 方案：Heo | ✔ | 后端5.0.6及以下 |
| 方案：安知鱼 | ✔ | 后端5.0.6及以下 |

方案：yyyz
--------------------------------------------------------------

推荐使用朋友圈5.x版本最新前端，基于林木木的方案进行优化，同时添加管理面板，方便进行配置管理。

部署方法：

新建一个页面，比如hexo在博客根目录使用命令

```bash
hexo new page fcircle
```

可以看到`source/fcircle/index.md` 文件，打开该文件，粘贴以下内容（注意修改api地址）：

```html
---
title: 朋友圈
date: 2022-10-09 00:38:16
---

<div id="hexo-circle-of-friends-root"></div>
<script>
    let UserConfig = {
        // 填写你的api地址
        private_api_url: 'http://127.0.0.1:8000/',
        // 初始加载几篇文章
        page_init_number: 20,
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 10,
        // 头像加载失败时，默认头像地址
        error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c',
        // 进入页面时第一次的排序规则
        sort_rule: 'created',
        // 本地文章缓存数据过期时间（天）
        expire_days: 1, 
    }
</script>
<script type="text/javascript" src="https://npm.elemecdn.com/fcircle-theme-yyyz@1.0.13/dist/fcircle.min.js"></script>
```

访问域名下的`/fcircle`即可看到效果。

如果觉得该cdn比较慢，可以手动将js文件放到你认为更快的cdn上。

新版前端在顶部右下角卡片新增管理面板：

![image-20221009101639407.png](https://s2.loli.net/2023/07/12/mhtEbcr4Pi5JsCv.png)

点击即可进入。第一次部署成功后，**输入第一个密码的同时设置密码。请设置一个安全可靠的密码，并防止泄露**。

> 对于github-vercel-sqlite部署，当保存设置时，会经历推送github、vercel重建的步骤，可能需要一段时间才能同步你的更改，因此在这种部署方式下，会有一定的延迟存在。

除了在管理面板配置之外，朋友圈同样支持修改配置文件进行配置，详见[配置项说明](#)。