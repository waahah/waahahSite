---
title: 通讯运营商dns劫持了GitHub io的域名？
date: 2022-05-12 14:58:36
tags: [Host, DNS, Github]
categories: [Coding, JavaScript]
---

前言
--

前些天装atilo时用到了它的GitHub第三方库，那时候就发现它的github.io域名被解析为127.0.0.1。

那时还没多想，以为是它的域名设置出了问题，（虽然当时换dns成功装上去了就是）

结果今天再次访问别的github.io域名直接就是网络错误了，nslookup一看吓一跳嗷

![2122896-20210116120945376-777417062.png](https://s2.loli.net/2023/07/08/MP4jQzq3OZhBN7e.png)

另一个dns更恶心

![2122896-20210116121046848-1897682877.png](https://s2.loli.net/2023/07/08/jcpn9hitXM7kY16.png)

 爬爬爬 辣鸡dns，👴就不直说了，懂的都懂。

当初要不是嫌4.4.4.4和8.8.8.8进个百度都慢得一批，👴才不会找你呢。

* * *

但是，国内只有最近的dns才最快啊，算了👴直接改hosts好吧，你劫持一个👴改一个，惹不起👴躲得起！

![2122896-20210116121309920-788390176.png](https://s2.loli.net/2023/07/08/ANX7nT5ohJwDElg.png)

 可以使用其它dns解析出正确结果，然后将其放入hosts文件中，Windows的路径是：

```powershell
C:\\Windows\\System32\\drivers\\etc
```

或者有火绒也可以方便的打开hosts文件 ：

![2122896-20210116121631048-1082656223.png](https://s2.loli.net/2023/07/08/fTXOh7MzK6Pan9R.png)

找到hosts文件，用记事本打开，填入ip和域名

这里虽然解析出了这么多ip，但只要填一个就行。

![2122896-20210116121845868-1585832839.png](https://s2.loli.net/2023/07/08/mNk4nWG1cUxFP8z.png)

 像这样将ip dns填进去然后保存就ok

![2122896-20210116121819651-2035886282.png](https://s2.loli.net/2023/07/08/mQV2O3P6sHCN4Rj.png)

填完后刷新以下浏览器就行了。

![2122896-20210116121759125-964083212.png](https://s2.loli.net/2023/07/08/8ZE9eroQNuCP2i3.png)

文章结束了，下面的可以不用看了。

* * *

这里还可以改路由器的hosts

![2122896-20210116122257017-1917327608.png](https://s2.loli.net/2023/07/08/F8wkZ6z2Jlopby1.png)

 我的路由器是第三方固件，本质上就是个Linux系统，因此它的hosts文件放在 

```cmd
/etc/hosts

```

  直接在网页终端里 echo "185.199.108.153   github.io" >> /etc/hosts 是不行的，咱也不知道为啥。

  那就ssh或者telnet 进入路由器后台再echo

![2122896-20210116122925401-537929204.png](https://s2.loli.net/2023/07/08/3VenKHdXGCUp9zs.png)

 成功写入hosts，但后续操作发现并没有生效，并且，重启路由器后甚至又消失了。

![2122896-20210116123405461-400316144.png](https://s2.loli.net/2023/07/08/hp73iZ5sNY8yvrt.png)

 这就是逆天而行的代价🐎？

 后边又发现原来它自带自定义hosts的功能
![2122896-20210116123522965-582586473.png](https://s2.loli.net/2023/07/08/BYl8sM4myRa1jgf.png)

 修改，重启后没啥用，放弃了，都是虚的。

![2122896-20210116124240617-483481566.png](https://s2.loli.net/2023/07/08/t8Y1zugwVMhpfsy.png)

![2122896-20210116124244347-413360315.png](https://s2.loli.net/2023/07/08/9aQDY5IJRT4e1CH.png)

 还是老老实实的改本机hosts算了嗷。

