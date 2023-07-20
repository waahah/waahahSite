---
title: 使用 Cloudflare Pages 进行反向代理
date: 2023-08-16 14:58:36
tags: [VPS, V2ray, Cloudflare, Proxy, Pages]
categories: [Linux]
---

使用 Cloudflare Pages 进行反向代理
==========================

最近几位大佬为大家分享了好几个容器的使用方法，例如 [Replit](/2023/08/13/use_replit_creat_free_v2ray_node/) 、[Doprax](2023/08/14/use_doprax_creat_free_v2ray_node/) 、Deepnote 等。在使用过程中，要么平台分配的域名被墙，要么速度不稳定，需要配合 Clondflare CDN 使用。但是 Clondflare Workers 分配的域名已被污染，鉴于有些小伙伴没有域名，今天就为大家分享使用 Cloudflare Pages 进行反向代理的方法。
![202302091675923922290032.webp](https://s2.loli.net/2023/07/18/tRSoCKkfOzGWhE5.webp)
**一、使用条件**

需要有 Github 及 Clondfiare 的账号。

**二、在 Github 上建立仓库并添加代码**

1、登录 [Github](https://github.com) 后，如下图所示，建立一个名为 Cloudflare Pages 的私库。

![202302091675923922290032.webp](https://s2.loli.net/2023/07/18/tRSoCKkfOzGWhE5.webp)

2、点击 creating a new file 按钮，创建文件。

![202302091675923938666899.webp](https://s2.loli.net/2023/07/18/GEBJabm9ILAzNKw.webp)

3、创建一个名为 **\_worker.js** 的文件，然后保存。

![202302091675923954837769.webp](https://s2.loli.net/2023/07/18/KzeyjX2HtZuIRCG.webp)

用你需要反代的域名(平台分配被墙的域名)替换第5行中的 www.hicairo.com 。  
注意：域名中不要加https,http等字符。

```JavaScript
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      url.hostname = 'www.hicairo.com'
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};
```

**三、在 Cloudflare 中设置 Cloudflare Pages**   

1、登录 [Cloudflare](https://www.cloudflare.com) ，点击左侧菜单中的 Pages 按钮后，然后点击页面右侧的 Create a project 按钮。

![202302091675923973780042.webp](https://s2.loli.net/2023/07/18/tNDlshTeBOpuCQ6.webp)

2、点击页面右侧的 Connect to Git 按钮。

![202302091675923989305998.webp](https://s2.loli.net/2023/07/18/RHUjGxdcFeygSwb.webp)

3、选择 GitHub 后点击 Connect to GitHub 按钮。

![202302091675924003406797.webp](https://s2.loli.net/2023/07/18/tQVIDa8Yh6oqsZB.webp)

4、页面跳转至 Github ，点击 Install & Authorize 按钮。

![202302091675924016103924.webp](https://s2.loli.net/2023/07/18/C3oBxWAkKGZ2tgs.webp)

5、页面跳转回 Cloudflare ，选择你刚才创建名为 Cloudflare Pages 的仓库，然后点击 Begin setup 按钮继续。

![202302091675924030799170.webp](https://s2.loli.net/2023/07/18/nK7UclTJupLXvGV.webp)

6、Project name 可以使用默认，也可以随便填写，然后点击页面底部的 Save and Deploy 按钮。

![202302091675924043209975.webp](https://s2.loli.net/2023/07/18/X3jG9xeDrKukqHO.webp)

7、等待部署完成后，页面中会出现如图示内容，其中显示的域名就是 Cloudflare Pages 平台为你分配的域名，\*.pages.dev 域名目前还没有被污染，通过该域名可以正常打开您的站点。

![202302091675924054725802.webp](https://s2.loli.net/2023/07/18/vqG92RmzaeyBwNc.webp)

**四、添加自定义域名**

由于 pages.dev 域名在某些地区已被污染，添加自定义域名是必要的。前提是你已拥有一枚域名，并托管在 Cloudflare 。如何将域名托管在 Cloudflare ，请参考《[V2ray使用Cloudflare中转流量，拯救被墙的IP](/2023/08/12/v2ray_use_cloundflare_save_ip/)》第五章节，本文不再赘述。

1、点击页面左侧菜单中的 Pages ，然后在页面右侧点击刚才创建好的项目名称。

![202302141676342153674132.webp](https://s2.loli.net/2023/07/18/CSEBcm91bAZtzUp.webp)

2、点击 Custom domains ，然后点击 Set up a custom domain 按钮，添加自定义域名。

![202302141676342170603735.webp](https://s2.loli.net/2023/07/18/ziqNLTc3m9WuwM8.webp)

3、填入域名然后点 Continue 按钮。例如：我在 Cloudflare 上托管了的域名为  ifeng.ml,我添加的自定义二级域名 example.ifeng.ml 。

![202302141676342180205448.webp](https://s2.loli.net/2023/07/18/FS82JQylkGd7zxT.webp)

4、点击 Activate domain 按钮。

![202302141676342191706719.webp](https://s2.loli.net/2023/07/18/47YjUKpvI932BdN.webp)

5、等待 Initializing 完成，域名 Verifying 完成后，会出现 Active 字样。这时说明自定义域名已经设置成功了，你可以使用自定义域名访问你的站点。这一步正常情况下需要 1-2 分钟时间。

![202302141676342202295211.webp](https://s2.loli.net/2023/07/18/Sf28naQsvCMBJyE.webp)
