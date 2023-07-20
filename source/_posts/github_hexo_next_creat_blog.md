---
title: 利用 GitHub + Hexo + Next 从零搭建一个博客
date: 2022-10-08 14:58:36
tags: [Nodejs, JavaScript]
categories: [Coding, Nodejs]
---

利用 GitHub + Hexo + Next 从零搭建一个博客
---------------------------------------------------------------------

本文字数： 14k 阅读时长 ≈ 23 分钟

趁着国庆，搭建了一下个人博客，耗时数个小时，两个站点终于完工了。现在两个站点都已经稳定运行一个在 GitHub Pages 上，一个在 Vercel 上面，大家如果感兴趣可以去看一下。

*   Github HomePage：<https://waahah.tk/>
*   waahah Blog: <https://blog.nightteam.cn/>

博客相对复杂一点，使用了 Hexo 框架，采用了 Next 主题，在搭建的过程中我就顺手把搭建的流程大致记录下来了，在这里扩充一下形成一篇记录，毕竟好记性不如烂笔头。 

![](https://s2.loli.net/2023/07/09/D6CUJWSfE9Xo8Mt.png)

于是，这篇《利用 GitHub 从零开始搭建一个博客》的文章就诞生了。

准备条件
---------------------------------------------------------------

在这里先跟大家说一些准备条件，有些同学可能一听到搭建博客就望而却步。弄个博客网站，不得有台服务器吗？不得搞数据库吗？不得注册域名吗？没事，如果都没有，那照样是能搭建一个博客的。 GitHub 是个好东西啊，它提供了 GitHub Pages 帮助我们来架设一个静态网站，这就解决了服务器的问题。 Hexo 这个博客框架没有那么重量级，它是 MarkDown 直接写文章的，然后 Hexo 可以直接将文章编译成静态网页文件并发布，所以这样文章的内容、标题、标签等信息就没必要存数据库里面了，是直接纯静态页面了，这就解决了数据库的问题。 GitHub Pages 允许每个账户创建一个名为 {username}.github.io 的仓库，另外它还会自动为这个仓库分配一个 github.io 的二级域名，这就解决了域名的问题，当然如果想要自定义域名的话，也可以支持。 所以说，基本上，先注册个 GitHub 账号就能搞了，下面我们来正式开始吧。

新建项目
---------------------------------------------------------------

首先在 GitHub 新建一个仓库（Repository），名称为 {username}.github.io，注意这个名比较特殊，必须要是 github.io 为后缀结尾的。比如 NightTeam 的 GitHub 用户名就叫 NightTeam，那我就新建一个 nightteam.github.io，新建完成之后就可以进行后续操作了。 另外如果 GitHub 没有配置 SSH 连接的建议配置一下，这样后面在部署博客的时候会更方便。

安装环境
---------------------------------------------------------------

### 安装 Node.js

首先在自己的电脑上安装 Node.js，下载地址：https://nodejs.org/zh-cn/download/，可以安装 Stable 版本。 安装完毕之后，确保环境变量配置好，能正常使用 `npm` 命令。

### 安装 Hexo

接下来就需要安装 Hexo 了，这是一个博客框架，Hexo 官方还提供了一个命令行工具，用于快速创建项目、页面、编译、部署 Hexo 博客，所以在这之前我们需要先安装 Hexo 的命令行工具。 命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">npm install -g hexo-<span class="keyword">cli</span></span><br></pre></td></tr></tbody></table>

安装完毕之后，确保环境变量配置好，能正常使用 `hexo` 命令。

初始化项目
--------------------------------------------------------------------------

接下来我们使用 Hexo 的命令行创建一个项目，并将其在本地跑起来，整体跑通看看。 首先使用如下命令创建项目：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo init {<span class="built_in">name</span>}</span><br></pre></td></tr></tbody></table>

这里的 name 就是项目名，我这里要创建 NightTeam 的博客，我就把项目取名为 nightteam 了，用了纯小写，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">hexo init nightteam</span></span><br></pre></td></tr></tbody></table>

这样 nightteam 文件夹下就会出现 Hexo 的初始化文件，包括 themes、scaffolds、source 等文件夹，这些内容暂且先不用管是做什么的，我们先知道有什么，然后一步步走下去看看都发生了什么变化。 接下来我们首先进入新生成的文件夹里面，然后调用 Hexo 的 generate 命令，将 Hexo 编译生成 HTML 代码，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo <span class="keyword">generate</span></span><br></pre></td></tr></tbody></table>

可以看到输出结果里面包含了 js、css、font 等内容，并发现他们都处在了项目根目录下的 public 文件夹下面了。 然后我们利用 Hexo 提供的 server 命令把博客在本地运行起来，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo <span class="keyword">server</span></span><br></pre></td></tr></tbody></table>

运行之后命令行输出如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">INFO</span>  <span class="keyword">Start</span> processing</span><br><span class="line"><span class="keyword">INFO</span>  Hexo <span class="keyword">is</span> running at http://localhost:<span class="number">4000</span> . Press Ctrl+C <span class="keyword">to</span> stop.</span><br></pre></td></tr></tbody></table>

它告诉我们在本地 4000 端口上就可以查看博客站点了，如图所示： 
![](https://s2.loli.net/2023/07/09/6x8zIrsJZGPK2aS.png)
这样一个博客的架子就出来了，我们只用了三个命令就完成了。

部署
-----------------------------------------

接下来我们来将这个初始化的博客进行一下部署，放到 GitHub Pages 上面验证一下其可用性。成功之后我们可以再进行后续的修改，比如修改主题、修改页面配置等等。 那么怎么把这个页面部署到 GitHub Pages 上面呢，其实 Hexo 已经给我们提供一个命令，利用它我们可以直接将博客一键部署，不需要手动去配置服务器或进行其他的各项配置。 部署命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">hexo deploy</span></span><br></pre></td></tr></tbody></table>

在部署之前，我们需要先知道博客的部署地址，它需要对应 GitHub 的一个 Repository 的地址，这个信息需要我们来配置一下。 打开根目录下的 \_config.yml 文件，找到 Deployment 这个地方，把刚才新建的 Repository 的地址贴过来，然后指定分支为 master 分支，最终修改为如下内容：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="meta"># Deployment</span></span><br><span class="line"><span class="meta">## Docs: https:<span class="comment">//hexo.io/docs/deployment.html</span></span></span><br><span class="line"><span class="symbol">deploy:</span></span><br><span class="line"><span class="symbol">  type:</span> git</span><br><span class="line"><span class="symbol">  repo:</span> {git repo ssh address}</span><br><span class="line"><span class="symbol">  branch:</span> master</span><br></pre></td></tr></tbody></table>

我的就修改为如下内容：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="meta"># Deployment</span></span><br><span class="line"><span class="meta">## Docs: https:<span class="comment">//hexo.io/docs/deployment.html</span></span></span><br><span class="line"><span class="symbol">deploy:</span></span><br><span class="line"><span class="symbol">  type:</span> git</span><br><span class="line"><span class="symbol">  repo:</span> git@github.com:NightTeam/nightteam.github.io.git</span><br><span class="line"><span class="symbol">  branch:</span> master</span><br></pre></td></tr></tbody></table>

另外我们还需要额外安装一个支持 Git 的部署插件，名字叫做 hexo-deployer-git，有了它我们才可以顺利将其部署到 GitHub 上面，如果不安装的话，在执行部署命令时会报如下错误：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">Deployer not <span class="string">found:</span> git</span><br></pre></td></tr></tbody></table>

好，那就让我们安装下这个插件，在项目目录下执行安装命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">npm <span class="keyword">install</span> hexo-deployer-git <span class="comment">--save</span></span><br></pre></td></tr></tbody></table>

安装成功之后，执行部署命令：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attribute">hexo deploy</span></span><br></pre></td></tr></tbody></table>

运行结果类似如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br><span class="line">16</span><br></pre></td><td class="code"><pre><span class="line">INFO  Deploying: git</span><br><span class="line">INFO  Clearing .deploy_git folder...</span><br><span class="line">INFO  Copying files <span class="keyword">from</span> <span class="keyword">public</span> folder...</span><br><span class="line">INFO  Copying files <span class="keyword">from</span> extend dirs...</span><br><span class="line">On branch master</span><br><span class="line">nothing to commit, working directory clean</span><br><span class="line">Counting objects: <span class="number">46</span>, done.</span><br><span class="line">Delta compression using up to <span class="number">8</span> threads.</span><br><span class="line">Compressing objects: <span class="number">100</span>% (<span class="number">36</span>/<span class="number">36</span>), done.</span><br><span class="line">Writing objects: <span class="number">100</span>% (<span class="number">46</span>/<span class="number">46</span>), <span class="number">507.66</span> KiB | <span class="number">0</span> bytes/s, done.</span><br><span class="line">Total <span class="number">46</span> (delta <span class="number">3</span>), reused <span class="number">0</span> (delta <span class="number">0</span>)</span><br><span class="line">remote: Resolving deltas: <span class="number">100</span>% (<span class="number">3</span>/<span class="number">3</span>), done.</span><br><span class="line">To <span class="symbol">git@</span>github.com:NightTeam/nightteam.github.io.git</span><br><span class="line"> * [new branch]      HEAD -&gt; master</span><br><span class="line">Branch master <span class="keyword">set</span> up to track remote branch master <span class="keyword">from</span> <span class="symbol">git@</span>github.com:NightTeam/nightteam.github.io.git.</span><br><span class="line">INFO  Deploy done: git</span><br></pre></td></tr></tbody></table>

如果出现类似上面的内容，就证明我们的博客已经成功部署到 GitHub Pages 上面了，这时候我们访问一下 GitHub Repository 同名的链接，比如我的 NightTeam 博客的 Repository 名称取的是 nightteam.github.io，那我就访问 <http://waahah.github.io>，这时候我们就可以看到跟本地一模一样的博客内容了。
![](https://s2.loli.net/2023/07/09/6x8zIrsJZGPK2aS.png)
这时候我们去 GitHub 上面看看 Hexo 上传了什么内容，打开之后可以看到 master 分支有了这样的内容： 
![](https://s2.loli.net/2023/07/09/H3RaMWYoZwym8S4.png)
仔细看看，这实际上是博客文件夹下面的 public 文件夹下的所有内容，Hexo 把编译之后的静态页面内容上传到 GitHub 的 master 分支上面去了。 这时候可能就有人有疑问了，那我博客的源码也想放到 GitHub 上面怎么办呢？其实很简单，新建一个其他的分支就好了，比如我这边就新建了一个 source 分支，代表博客源码的意思。 具体的添加过程就很简单了，参加如下命令：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">git</span> <span class="string">init</span></span><br><span class="line"><span class="attr">git</span> <span class="string">checkout -b source</span></span><br><span class="line"><span class="attr">git</span> <span class="string">add -A</span></span><br><span class="line"><span class="attr">git</span> <span class="string">commit -m "init blog"</span></span><br><span class="line"><span class="attr">git</span> <span class="string">remote add origin git@github.com:{username}/{username}.github.io.git</span></span><br><span class="line"><span class="attr">git</span> <span class="string">push origin source</span></span><br></pre></td></tr></tbody></table>

成功之后，可以到 GitHub 上再切换下默认分支，比如我就把默认的分支设置为了 source，当然不换也可以。

配置站点信息
-------------------------------------------------------------------------------------

完成如上内容之后，实际上我们只完成了博客搭建的一小步，因为我们仅仅是把初始化的页面部署成功了，博客里面还没有设置任何有效的信息。下面就让我们来进行一下博客的基本配置，另外换一个好看的主题，配置一些其他的内容，让博客真正变成属于我们自己的博客吧。 下面我就以自己的站点 NightTeam 为例，修改一些基本的配置，比如站点名、站点描述等等。 修改根目录下的 \_config.yml 文件，找到 Site 区域，这里面可以配置站点标题 title、副标题 subtitle 等内容、关键字 keywords 等内容，比如我的就修改为如下内容：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="meta"># Site</span></span><br><span class="line"><span class="symbol">title:</span> NightTeam</span><br><span class="line"><span class="symbol">subtitle:</span> 一个专注技术的组织</span><br><span class="line"><span class="symbol">description:</span> 涉猎的主要编程语言为 Python、Rust、C++、Go，领域涵盖爬虫、深度学习、服务研发和对象存储等。</span><br><span class="line"><span class="symbol">keywords:</span> <span class="string">"Python, Rust, C++, Go, 爬虫, 深度学习, 服务研发, 对象存储"</span></span><br><span class="line"><span class="symbol">author:</span> NightTeam</span><br></pre></td></tr></tbody></table>

这里大家可以参照格式把内容改成自己的。 另外还可以设置一下语言，如果要设置为汉语的话可以将 language 的字段设置为 zh-CN，修改如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">language:</span> <span class="built_in">zh</span>-CN</span><br></pre></td></tr></tbody></table>

这样就完成了站点基本信息的配置，完成之后可以看到一些基本信息就修改过来了，页面效果如下： 
![](https://s2.loli.net/2023/07/09/b9ciVF36ABWMl8z.png)

修改主题
---------------------------------------------------------------

目前来看，整个页面的样式个人感觉并不是那么好看，想换一个风格，这就涉及到主题的配置了。目前 Hexo 里面应用最多的主题基本就是 Next 主题了，个人感觉这个主题还是挺好看的，另外它支持的插件和功能也极为丰富，配置了这个主题，我们的博客可以支持更多的扩展功能，比如阅览进度条、中英文空格排版、图片懒加载等等。 那么首先就让我们来安装下 Next 这个主题吧，目前 Next 主题已经更新到 7.x 版本了，我们可以直接到 Next 主题的 GitHub Repository 上把这个主题下载下来。 主题的 GitHub 地址是：<https://github.com/theme-next/hexo-theme-next>，我们可以直接把 master 分支 Clone 下来。 首先命令行进入到项目的根目录，执行如下命令即可：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">git clone http<span class="variable">s:</span>//github.<span class="keyword">com</span>/theme-<span class="keyword">next</span>/hexo-theme-<span class="keyword">next</span> themes/<span class="keyword">next</span></span><br></pre></td></tr></tbody></table>

执行完毕之后 Next 主题的源码就会出现在项目的 themes/next 文件夹下。 然后我们需要修改下博客所用的主题名称，修改项目根目录下的 \_config.yml 文件，找到 theme 字段，修改为 next 即可，修改如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">theme: <span class="keyword">next</span></span><br></pre></td></tr></tbody></table>

然后本地重新开启服务，访问刷新下页面，就可以看到 next 主题就切换成功了，预览效果如下： 
![2019-09-26-034504.png](https://s2.loli.net/2023/07/09/34CJ6EqsNPKpBSr.png)

主题配置
---------------------------------------------------------------

现在我们已经成功切换到 next 主题上面了，接下来我们就对主题进行进一步地详细配置吧，比如修改样式、增加其他各项功能的支持，下面逐项道来。 Next 主题内部也提供了一个配置文件，名字同样叫做 \_config.yml，只不过位置不一样，它在 themes/next 文件夹下，Next 主题里面所有的功能都可以通过这个配置文件来控制，下文所述的内容都是修改的 themes/next/\_config.yml 文件。

### 样式

Next 主题还提供了多种样式，风格都是类似黑白的搭配，但整个布局位置不太一样，通过修改配置文件的 scheme 字段即可，我选了 Pisces 样式，修改 \_config.yml （注意是 themes/next/\_config.yml 文件）如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">scheme:</span> Pisces</span><br></pre></td></tr></tbody></table>

刷新页面之后就会变成这种样式，如图所示： 
![](https://s2.loli.net/2023/07/09/mXldz1quZTniky5.png)
另外还有几个可选项，比如：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br></pre></td><td class="code"><pre><span class="line"><span class="meta"># scheme: Muse</span></span><br><span class="line"><span class="meta">#scheme: Mist</span></span><br><span class="line">scheme: Pisces</span><br><span class="line"><span class="meta">#scheme: Gemini</span></span><br></pre></td></tr></tbody></table>

大家可以自行根据喜好选择。

### favicon

favicon 就是站点标签栏的小图标，默认是用的 Hexo 的小图标，如果我们有站点 Logo 的图片的话，我们可以自己定制小图标。 但这并不意味着我们需要自己用 PS 自己来设计，已经有一个网站可以直接将图片转化为站点小图标，站点链接为：<https://realfavicongenerator.net>，到这里上传一张图，便可以直接打包下载各种尺寸和适配不同设备的小图标。 图标下载下来之后把它放在 themes/next/source/images 目录下面。 然后在配置文件里面找到 favicon 配置项，把一些相关路径配置进去即可，示例如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">favicon:</span></span><br><span class="line"><span class="symbol">  small:</span> <span class="meta-keyword">/images/</span>favicon<span class="number">-16</span>x16.png</span><br><span class="line"><span class="symbol">  medium:</span> <span class="meta-keyword">/images/</span>favicon<span class="number">-32</span>x32.png</span><br><span class="line"><span class="symbol">  apple_touch_icon:</span> <span class="meta-keyword">/images/</span>apple-touch-icon.png</span><br><span class="line"><span class="symbol">  safari_pinned_tab:</span> <span class="meta-keyword">/images/</span>safari-pinned-tab.svg</span><br></pre></td></tr></tbody></table>

配置完成之后刷新页面，整个页面的标签图标就被更新了。

### avatar

avatar 这个就类似站点的头像，如果设置了这个，会在站点的作者信息旁边额外显示一个头像，比如我这边有一张 avatar.png 图片： 
![2019-09-26-035351.png](https://s2.loli.net/2023/07/09/rwWjlSF5p7bKCZP.png)
将其放置到 themes/next/source/images/avatar.png 路径，然后在主题 \_config.yml 文件下编辑 avatar 的配置，修改为正确的路径即可。

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment"># Sidebar Avatar</span></span><br><span class="line"><span class="attr">avatar:</span></span><br><span class="line">  <span class="comment"># In theme directory (source/images): /images/avatar.gif</span></span><br><span class="line">  <span class="comment"># In site directory (source/uploads): /uploads/avatar.gif</span></span><br><span class="line">  <span class="comment"># You can also use other linking images.</span></span><br><span class="line">  <span class="attr">url:</span> <span class="string">/images/avatar.png</span></span><br><span class="line">  <span class="comment"># If true, the avatar would be dispalyed in circle.</span></span><br><span class="line">  <span class="attr">rounded:</span> <span class="literal">true</span></span><br><span class="line">  <span class="comment"># If true, the avatar would be rotated with the cursor.</span></span><br><span class="line">  <span class="attr">rotated:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>

这里有 rounded 选项是是否显示圆形，rotated 是是否带有旋转效果，大家可以根据喜好选择是否开启。 效果如下： 
![2019-09-26-035817.png](https://s2.loli.net/2023/07/09/UzioaCE74ID9AYQ.png)
配置完成之后就会显示头像。

### rss

博客一般是需要 RSS 订阅的，如果要开启 RSS 订阅，这里需要安装一个插件，叫做 hexo-generator-feed，安装完成之后，站点会自动生成 RSS Feed 文件，安装命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">npm <span class="keyword">install</span> hexo-generator-feed <span class="comment">--save</span></span><br></pre></td></tr></tbody></table>

在项目根目录下运行这个命令，安装完成之后不需要其他的配置，以后每次编译生成站点的时候就会自动生成 RSS Feed 文件了。

### code

作为程序猿，代码块的显示还是需要很讲究的，默认的代码块我个人不是特别喜欢，因此我把代码的颜色修改为黑色，并把复制按钮的样式修改为类似 Mac 的样式，修改 \_config.yml 文件的 codeblock 区块如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">codeblock:</span></span><br><span class="line">  <span class="comment"># Code Highlight theme</span></span><br><span class="line">  <span class="comment"># Available values: normal | night | night eighties | night blue | night bright</span></span><br><span class="line">  <span class="comment"># See: https://github.com/chriskempson/tomorrow-theme</span></span><br><span class="line">  <span class="attr">highlight_theme:</span> <span class="string">night</span> <span class="string">bright</span></span><br><span class="line">  <span class="comment"># Add copy button on codeblock</span></span><br><span class="line">  <span class="attr">copy_button:</span></span><br><span class="line">    <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">    <span class="comment"># Show text copy result.</span></span><br><span class="line">    <span class="attr">show_result:</span> <span class="literal">true</span></span><br><span class="line">    <span class="comment"># Available values: default | flat | mac</span></span><br><span class="line">    <span class="attr">style:</span> <span class="string">mac</span></span><br></pre></td></tr></tbody></table>

修改前的代码样式：
![2019-09-26-040437.png](https://s2.loli.net/2023/07/09/4kDLc5sHiIKom7P.png)
修改后的代码样式： 
![2019-09-26-040510.png](https://s2.loli.net/2023/07/09/MaqBrnNFjo2LxgE.png)
嗯，个人觉得整体看起来逼格高了不少。

### top

我们在浏览网页的时候，如果已经看完了想快速返回到网站的上端，一般都是有一个按钮来辅助的，这里也支持它的配置，修改 \_config.yml 的 back2top 字段即可，我的设置如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">back2top:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">  <span class="comment"># Back to top in sidebar.</span></span><br><span class="line">  <span class="attr">sidebar:</span> <span class="literal">false</span></span><br><span class="line">  <span class="comment"># Scroll percent label in b2t button.</span></span><br><span class="line">  <span class="attr">scrollpercent:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>

enable 默认为 true，即默认显示。sidebar 如果设置为 true，按钮会出现在侧栏下方，个人觉得并不是很好看，就取消了，scrollpercent 就是显示阅读百分比，个人觉得还不错，就将其设置为 true。 具体的效果大家可以设置后根据喜好选择。

### reading_process

reading\_process，阅读进度。大家可能注意到有些站点的最上侧会出现一个细细的进度条，代表页面加载进度和阅读进度，如果大家想设置的话也可以试试，我将其打开了，修改 \_config.yml 如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">reading_progress:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">  <span class="comment"># Available values: top | bottom</span></span><br><span class="line">  <span class="attr">position:</span> <span class="string">top</span></span><br><span class="line">  <span class="attr">color:</span> <span class="string">"#222"</span></span><br><span class="line">  <span class="attr">height:</span> <span class="string">2px</span></span><br></pre></td></tr></tbody></table>

设置之后显示效果如下：
![](https://s2.loli.net/2023/07/09/NVv5SgUExaRhcLm.png)

### bookmark

书签，可以根据阅读历史记录，在下次打开页面的时候快速帮助我们定位到上次的位置，大家可以根据喜好开启和关闭，我的配置如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">bookmark:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">false</span></span><br><span class="line">  <span class="comment"># Customize the color of the bookmark.</span></span><br><span class="line">  <span class="attr">color:</span> <span class="string">"#222"</span></span><br><span class="line">  <span class="comment"># If auto, save the reading progress when closing the page or clicking the bookmark-icon.</span></span><br><span class="line">  <span class="comment"># If manual, only save it by clicking the bookmark-icon.</span></span><br><span class="line">  <span class="attr">save:</span> <span class="string">auto</span></span><br></pre></td></tr></tbody></table>

### github_banner

在一些技术博客上，大家可能注意到在页面的右上角有个 GitHub 图标，点击之后可以跳转到其源码页面，可以为 GitHub Repository 引流，大家如果想显示的话可以自行选择打开，我的配置如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment"># `Follow me on GitHub` banner in the top-right corner.</span></span><br><span class="line"><span class="attr">github_banner:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">  <span class="attr">permalink:</span> <span class="string">https://github.com/NightTeam/nightteam.github.io</span></span><br><span class="line">  <span class="attr">title:</span> <span class="string">NightTeam</span> <span class="string">GitHub</span></span><br></pre></td></tr></tbody></table>

记得修改下链接 permalink 和标题 title，显示效果如下： 
![](https://s2.loli.net/2023/07/09/xcWMpTLiyJIrg35.png)
可以看到在页面右上角显示了 GitHub 的图标，点击可以进去到 Repository 页面。

### gitalk

由于 Hexo 的博客是静态博客，而且也没有连接数据库的功能，所以它的评论功能是不能自行集成的，但可以集成第三方的服务。 Next 主题里面提供了多种评论插件的集成，有 changyan | disqus | disqusjs | facebook\_comments\_plugin | gitalk | livere | valine | vkontakte 这些。 作为一名程序员，我个人比较喜欢 gitalk，它是利用 GitHub 的 Issue 来当评论，样式也比较不错。 首先需要在 GitHub 上面注册一个 OAuth Application，链接为：https://github.com/settings/applications/new，注册完毕之后拿到 Client ID、Client Secret 就可以了。 首先需要在 \_config.yml 文件的 comments 区域配置使用 gitalk：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment"># Multiple Comment System Support</span></span><br><span class="line">comments:</span><br><span class="line">  # Available values: tabs | buttons</span><br><span class="line">  style: tabs</span><br><span class="line">  # Choose a comment<span class="built_in"> system </span><span class="keyword">to</span> be displayed by default.</span><br><span class="line">  # Available values: changyan | disqus | disqusjs | facebook_comments_plugin | gitalk | livere | valine | vkontakte</span><br><span class="line">  active: gitalk</span><br></pre></td></tr></tbody></table>

主要是 comments.active 字段选择对应的名称即可。 然后找打 gitalk 配置，添加它的各项配置：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br><span class="line">14</span><br><span class="line">15</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment"># Gitalk</span></span><br><span class="line"><span class="comment"># Demo: https://gitalk.github.io</span></span><br><span class="line"><span class="comment"># For more information: https://github.com/gitalk/gitalk</span></span><br><span class="line">gitalk:</span><br><span class="line">  enable: <span class="literal">true</span></span><br><span class="line">  github_id: NightTeam</span><br><span class="line">  repo: nightteam.github.io # Repository name <span class="keyword">to</span> store issues</span><br><span class="line">  client_id: {your<span class="built_in"> client </span>id} # GitHub Application<span class="built_in"> Client </span>ID</span><br><span class="line">  client_secret: {your<span class="built_in"> client </span>secret} # GitHub Application<span class="built_in"> Client </span>Secret</span><br><span class="line">  admin_user: germey # GitHub repo owner <span class="keyword">and</span> collaborators, only these guys can initialize gitHub issues</span><br><span class="line">  distraction_free_mode: <span class="literal">true</span> # Facebook-like distraction free mode</span><br><span class="line">  # Gitalk<span class="string">'s display language depends on user'</span>s browser <span class="keyword">or</span><span class="built_in"> system </span>environment</span><br><span class="line">  # <span class="keyword">If</span> you want everyone visiting your site <span class="keyword">to</span> see a uniform language, you can <span class="builtin-name">set</span> a force language value</span><br><span class="line">  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW</span><br><span class="line">  language: zh-CN</span><br></pre></td></tr></tbody></table>

配置完成之后 gitalk 就可以使用了，点击进入文章页面，就会出现如下页面： 
![](https://s2.loli.net/2023/07/09/dwXnEyLRGZpvfzO.png)
GitHub 授权登录之后就可以使用了，评论的内容会自动出现在 Issue 里面。

### pangu

我个人有个强迫症，那就是写中文和英文的时候中间必须要留有间距，一个简单直接的方法就是中间加个空格，但某些情况下可能习惯性不加或者忘记加了，这就导致中英文混排并不是那么美观。 pangu 就是来解决这个问题的，我们只需要在主题里面开启这个选项，在编译生成页面的时候，中英文之间就会自动添加空格，看起来更加美观。 具体的修改如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">pangu:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>

### math

可能在一些情况下我们需要写一个公式，比如演示一个算法推导过程，MarkDown 是支持公式显示的，Hexo 的 Next 主题同样是支持的。 Next 主题提供了两个渲染引擎，分别是 mathjax 和 katex，后者相对前者来说渲染速度更快，而且不需要 JavaScript 的额外支持，但后者支持的功能现在还不如前者丰富，具体的对比可以看官方文档：<https://theme-next.org/docs/third-party-services/math-equations>。 所以我这里选择了 mathjax，通过修改配置即可启用：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">math:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line"></span><br><span class="line">  <span class="comment"># Default (true) will load mathjax / katex script on demand.</span></span><br><span class="line">  <span class="comment"># That is it only render those page which has `mathjax: true` in Front-matter.</span></span><br><span class="line">  <span class="comment"># If you set it to false, it will load mathjax / katex srcipt EVERY PAGE.</span></span><br><span class="line">  <span class="attr">per_page:</span> <span class="literal">true</span></span><br><span class="line"></span><br><span class="line">  <span class="comment"># hexo-renderer-pandoc (or hexo-renderer-kramed) required for full MathJax support.</span></span><br><span class="line">  <span class="attr">mathjax:</span></span><br><span class="line">    <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">    <span class="comment"># See: https://mhchem.github.io/MathJax-mhchem/</span></span><br><span class="line">    <span class="attr">mhchem:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>

mathjax 的使用需要我们额外安装一个插件，叫做 hexo-renderer-kramed，另外也可以安装 hexo-renderer-pandoc，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">npm un hexo-renderer-marked <span class="comment">--save</span></span><br><span class="line">npm i hexo-renderer-kramed <span class="comment">--save</span></span><br></pre></td></tr></tbody></table>

另外还有其他的插件支持，大家可以到官方文档查看。

### pjax

可能大家听说过 Ajax，没听说过 pjax，这个技术实际上就是利用 Ajax 技术实现了局部页面刷新，既可以实现 URL 的更换，有可以做到无刷新加载。 要开启这个功能需要先将 pjax 功能开启，然后安装对应的 pjax 依赖库，首先修改 \_config.yml 修改如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">pjax:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>

然后安装依赖库，切换到 next 主题下，然后安装依赖库：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line">$ cd themes/<span class="keyword">next</span></span><br><span class="line">$ git clone <span class="symbol">https:</span>/<span class="regexp">/github.com/theme</span>-<span class="keyword">next</span>/theme-<span class="keyword">next</span>-pjax source/<span class="class"><span class="keyword">lib</span>/<span class="title">pjax</span></span></span><br></pre></td></tr></tbody></table>

这样 pjax 就开启了，页面就可以实现无刷新加载了。 另外关于 Next 主题的设置还有挺多的，这里就介绍到这里了，更多的主题设置大家可以参考官方文档：<https://theme-next.org/docs/>。

文章
-----------------------------------------

现在整个站点只有一篇文章，那么我们怎样来增加其他的文章呢？ 这个很简单，只需要调用 Hexo 提供的命令即可，比如我们要新建一篇「HelloWorld」的文章，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo <span class="keyword">new</span> <span class="type">hello</span>-world</span><br></pre></td></tr></tbody></table>

创建的文章会出现在 `source/_posts` 文件夹下，是 MarkDown 格式。 在文章开头通过如下格式添加必要信息：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br></pre></td><td class="code"><pre><span class="line"><span class="string">\---</span></span><br><span class="line"><span class="attr">title:</span> <span class="string">标题</span> <span class="comment"># 自动创建，如 hello-world</span></span><br><span class="line"><span class="attr">date:</span> <span class="string">日期</span> <span class="comment"># 自动创建，如 2019-09-22 01:47:21</span></span><br><span class="line"><span class="attr">tags:</span> </span><br><span class="line"><span class="bullet">-</span> <span class="string">标签1</span></span><br><span class="line"><span class="bullet">-</span> <span class="string">标签2</span></span><br><span class="line"><span class="bullet">-</span> <span class="string">标签3</span></span><br><span class="line"><span class="attr">categories:</span></span><br><span class="line"><span class="bullet">-</span> <span class="string">分类1</span></span><br><span class="line"><span class="bullet">-</span> <span class="string">分类2</span></span><br><span class="line"><span class="meta">---</span></span><br></pre></td></tr></tbody></table>

开头下方撰写正文，MarkDown 格式书写即可。 这样在下次编译的时候就会自动识别标题、时间、类别等等，另外还有其他的一些参数设置，可以参考文档：<https://hexo.io/zh-cn/docs/writing.html>。

标签页
----------------------------------------------------

现在我们的博客只有首页、文章页，如果我们想要增加标签页，可以自行添加，这里 Hexo 也给我们提供了这个功能，在根目录执行命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo new<span class="built_in"> page </span>tags</span><br></pre></td></tr></tbody></table>

执行这个命令之后会自动帮我们生成一个 source/tags/index.md 文件，内容就只有这样子的：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br></pre></td><td class="code"><pre><span class="line"><span class="string">\---</span></span><br><span class="line"><span class="attr">title:</span> <span class="string">tags</span></span><br><span class="line"><span class="attr">date:</span> <span class="number">2019</span><span class="number">-09</span><span class="number">-26</span> <span class="number">16</span><span class="string">:44:17</span></span><br><span class="line"><span class="meta">---</span></span><br></pre></td></tr></tbody></table>

我们可以自行添加一个 type 字段来指定页面的类型：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">type:</span> <span class="string">tags</span></span><br><span class="line"><span class="attr">comments:</span> <span class="literal">false</span></span><br></pre></td></tr></tbody></table>

然后再在主题的 \_config.yml 文件将这个页面的链接添加到主菜单里面，修改 menu 字段如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">menu:</span></span><br><span class="line"><span class="symbol">  home:</span> / || home</span><br><span class="line">  <span class="meta">#about: /about/ || user</span></span><br><span class="line"><span class="symbol">  tags:</span> <span class="meta-keyword">/tags/</span> || tags</span><br><span class="line">  <span class="meta">#categories: /categories/ || th</span></span><br><span class="line"><span class="symbol">  archives:</span> <span class="meta-keyword">/archives/</span> || archive</span><br><span class="line">  <span class="meta">#schedule: /schedule/ || calendar</span></span><br><span class="line">  <span class="meta">#sitemap: /sitemap.xml || sitemap</span></span><br><span class="line">  <span class="meta">#commonweal: /404/ || heartbeat</span></span><br></pre></td></tr></tbody></table>

这样重新本地启动看下页面状态，效果如下：
![](https://s2.loli.net/2023/07/09/1gDpzEVeQmNHM8y.png)
可以看到左侧导航也出现了标签，点击之后右侧会显示标签的列表。

### 分类页

分类功能和标签类似，一个文章可以对应某个分类，如果要增加分类页面可以使用如下命令创建：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">hexo new<span class="built_in"> page </span>categories</span><br></pre></td></tr></tbody></table>

然后同样地，会生成一个 source/categories/index.md 文件。 我们可以自行添加一个 type 字段来指定页面的类型：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">type:</span> <span class="string">categories</span></span><br><span class="line"><span class="attr">comments:</span> <span class="literal">false</span></span><br></pre></td></tr></tbody></table>

然后再在主题的 \_config.yml 文件将这个页面的链接添加到主菜单里面，修改 menu 字段如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br></pre></td><td class="code"><pre><span class="line"><span class="symbol">menu:</span></span><br><span class="line"><span class="symbol">  home:</span> / || home</span><br><span class="line">  <span class="meta">#about: /about/ || user</span></span><br><span class="line"><span class="symbol">  tags:</span> <span class="meta-keyword">/tags/</span> || tags</span><br><span class="line"><span class="symbol">  categories:</span> <span class="meta-keyword">/categories/</span> || th</span><br><span class="line"><span class="symbol">  archives:</span> <span class="meta-keyword">/archives/</span> || archive</span><br><span class="line">  <span class="meta">#schedule: /schedule/ || calendar</span></span><br><span class="line">  <span class="meta">#sitemap: /sitemap.xml || sitemap</span></span><br><span class="line">  <span class="meta">#commonweal: /404/ || heartbeat</span></span><br></pre></td></tr></tbody></table>

这样页面就会增加分类的支持，效果如下： 
![2019-09-26-085755.png](https://s2.loli.net/2023/07/09/odX9g3DtqTUM8uI.png)

搜索页
----------------------------------------------------

很多情况下我们需要搜索全站的内容，所以一个搜索功能的支持也是很有必要的。 如果要添加搜索的支持，需要先安装一个插件，叫做 hexo-generator-searchdb，命令如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">npm <span class="keyword">install</span> hexo-generator-searchdb <span class="comment">--save</span></span><br></pre></td></tr></tbody></table>

然后在项目的 \_config.yml 里面添加搜索设置如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br></pre></td><td class="code"><pre><span class="line"><span class="attr">search:</span></span><br><span class="line">  <span class="attr">path:</span> <span class="string">search.xml</span></span><br><span class="line">  <span class="attr">field:</span> <span class="string">post</span></span><br><span class="line">  <span class="attr">format:</span> <span class="string">html</span></span><br><span class="line">  <span class="attr">limit:</span> <span class="number">10000</span></span><br></pre></td></tr></tbody></table>

然后在主题的 \_config.yml 里面修改如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br></pre></td><td class="code"><pre><span class="line"><span class="comment"># Local search</span></span><br><span class="line"><span class="comment"># Dependencies: https://github.com/wzpan/hexo-generator-search</span></span><br><span class="line"><span class="attr">local_search:</span></span><br><span class="line">  <span class="attr">enable:</span> <span class="literal">true</span></span><br><span class="line">  <span class="comment"># If auto, trigger search by changing input.</span></span><br><span class="line">  <span class="comment"># If manual, trigger search by pressing enter key or search button.</span></span><br><span class="line">  <span class="attr">trigger:</span> <span class="string">auto</span></span><br><span class="line">  <span class="comment"># Show top n results per article, show all results by setting to -1</span></span><br><span class="line">  <span class="attr">top_n_per_article:</span> <span class="number">5</span></span><br><span class="line">  <span class="comment"># Unescape html strings to the readable one.</span></span><br><span class="line">  <span class="attr">unescape:</span> <span class="literal">false</span></span><br><span class="line">  <span class="comment"># Preload the search data when the page loads.</span></span><br><span class="line">  <span class="attr">preload:</span> <span class="literal">false</span></span><br></pre></td></tr></tbody></table>

这里用的是 Local Search，如果想启用其他是 Search Service 的话可以参考官方文档：<https://theme-next.org/docs/third-party-services/search-services>。

404 页面
-----------------------------------------------------

另外还需要添加一个 404 页面，直接在根目录 source 文件夹新建一个 404.md 文件即可，内容可以仿照如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br><span class="line">4</span><br><span class="line">5</span><br><span class="line">6</span><br><span class="line">7</span><br><span class="line">8</span><br><span class="line">9</span><br><span class="line">10</span><br><span class="line">11</span><br><span class="line">12</span><br><span class="line">13</span><br></pre></td><td class="code"><pre><span class="line"><span class="string">\---</span></span><br><span class="line"><span class="attr">title:</span> <span class="number">404</span> <span class="string">Not</span> <span class="string">Found</span></span><br><span class="line"><span class="attr">date:</span> <span class="number">2019</span><span class="number">-09</span><span class="number">-22</span> <span class="number">10</span><span class="string">:41:27</span></span><br><span class="line"><span class="meta">---</span></span><br><span class="line"></span><br><span class="line"><span class="string">&lt;center&gt;</span></span><br><span class="line"><span class="string">对不起，您所访问的页面不存在或者已删除。</span></span><br><span class="line"><span class="string">您可以&lt;a</span> <span class="string">href="https://blog.nightteam.cn&gt;"&gt;点击此处&lt;/a&gt;返回首页。</span></span><br><span class="line"><span class="string">&lt;/center&gt;</span></span><br><span class="line"></span><br><span class="line"><span class="string">&lt;blockquote</span> <span class="string">class="blockquote-center"&gt;</span></span><br><span class="line">    <span class="string">NightTeam</span></span><br><span class="line"><span class="string">&lt;/blockquote&gt;</span></span><br></pre></td></tr></tbody></table>

这里面的一些相关信息和链接可以替换成自己的。 增加了这个 404 页面之后就可以 完成了上面的配置基本就完成了大半了，其实 Hexo 还有很多很多功能，这里就介绍不过来了，大家可以直接参考官方文档：https://hexo.io/zh-cn/docs/ 查看更多的配置。

部署脚本
---------------------------------------------------------------

最后我这边还增加了一个简易版的部署脚本，其实就是重新 gererate 下文件，然后重新部署。在根目录下新建一个 deploy.sh 的脚本文件，内容如下：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br><span class="line">2</span><br><span class="line">3</span><br></pre></td><td class="code"><pre><span class="line">hexo clean</span><br><span class="line">hexo <span class="keyword">generate</span></span><br><span class="line">hexo deploy</span><br></pre></td></tr></tbody></table>

这样我们在部署发布的时候只需要执行：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="keyword">sh</span> deploy.<span class="keyword">sh</span></span><br></pre></td></tr></tbody></table>

就可以完成博客的更新了，非常简单。

自定义域名
--------------------------------------------------------------------------

将页面修改之后可以用上面的脚本重新部署下博客，其内容便会跟着更新。 另外我们也可以在 GitHub 的 Repository 里面设置域名，找到 Settings，拉到下面，可以看到有个 GitHub Pages 的配置项，如图所示：
![2019-09-26-112622.png](https://s2.loli.net/2023/07/09/shWjdHYrAzg6uJq.png)
下面有个 custom domain 的选项，输入你想自定义的域名地址，然后添加 CNAME 解析就好了。 另外下面还有一个 Enforce HTTPS 的选项，GitHub Pages 会在我们配置自定义域名之后自动帮我们配置 HTTPS 服务。刚配置完自定义域名的时候可能这个选项是不可用的，一段时间后等到其可以勾选了，直接勾选即可，这样整个博客就会变成 HTTPS 的协议的了。 另外有一个值得注意的地方，如果配置了自定义域名，在目前的情况下，每次部署的时候这个自定义域名的设置是会被自动清除的。所以为了避免这个情况，我们需要在项目目录下面新建一个 CNAME 文件，路径为 source/CNAME，内容就是自定义域名。 比如我就在 source 目录下新建了一个 CNAME 文件，内容为：

<table><tbody><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line"><span class="selector-tag">blog</span><span class="selector-class">.nightteam</span><span class="selector-class">.cn</span></span><br></pre></td></tr></tbody></table>

这样避免了每次部署的时候自定义域名被清除的情况了。 以上就是从零搭建一个 Hexo 博客的流程，希望对大家有帮助。
