---
title: H5项目如何打包成APP 
date: 2023-06-10 14:58:36
tags: [JavaScript, H5, APP, APK]
categories: [Coding, JavaScript]
---

一、下载HBuilderX打包工具，[HBuilderX下载地址](https://www.dcloud.io/hbuilderx.html)

二、打开HBuilderX工具

1、选择文件>新建>项目，新建5+APP项目，选择默认模板即可，填入项目名称和地址后，点击创建即可。

![27031912-cf90068b7fa6d5ac.png](https://s2.loli.net/2023/07/14/RfWEHCr7tiXFxpw.png)

2、创建成功后找到文件夹所在位置，删除manifest.json 外的所有文件

![27031912-cf90068b7fa6d5ac.png](https://s2.loli.net/2023/07/14/RfWEHCr7tiXFxpw.png)

3、将H5打包的文件拷贝到当前目录下

即 npm run build 将我们的[项目打包](https://so.csdn.net/so/search?q=%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85&spm=1001.2101.3001.7020)生成的dist文件下的所有文件拷贝过来。

![27031912-36ae63e2cb17af33.png](https://s2.loli.net/2023/07/14/6KAyzDMdhuTHnSI.png)

4、配置APP

点击 manifest.json 文件，这里我们可以配置应用标识、应用名称、图标配置等等，可以按自己的需求来一一配置。

![27031912-2bd02877ddd7454a.png](https://s2.loli.net/2023/07/14/mBkQKzAi8Vyg4OT.png)

![27031912-ce6824c8550c5603.png](https://s2.loli.net/2023/07/14/PfZjg7cKEvWGSM6.png)

5、发行-云打包

![27031912-2ff97483e0bb94f1.png](https://s2.loli.net/2023/07/14/RTnfsgUNqubmdvo.png)

由于是自己调试，可以选择公共测试证书，然后点击打包即可。注意，第一次打包还需要实名认证账号，在DCloud官网认证登陆认证下即可。

[认证地址](https://dev.dcloud.net.cn/pages/user/info)  [认证指导](
https://blog.csdn.net/ytfty24124/article/details/127568872)

![27031912-43e27adf43cfb1a6.png](https://s2.loli.net/2023/07/14/wRI7Bt9zWiaPyfp.png)

6、安装apk

打包预计2-5分钟，打开本地目录即可找到对应的apk（unpackage/release/apk/H58E48E7B\_\_20230417093646.apk），发送到手机上安装即可。

![27031912-1a24bfaf99e7da2b.png](https://s2.loli.net/2023/07/14/nXG4NuivboQkcPO.png)

7.1、在开发app的时候，会遇到`header`的状态栏颜色和系统手机自带的颜色（顶部手机状态条）不一致，在mainfest.json这个文件里的 plus里设置 statusbar即可

![27031912-503b7d64f4079eaf.png](https://s2.loli.net/2023/07/14/lHw9sNtfL8zpMxU.png)

7.2、在开发app的时候，需要启用 https 协议，在mainfest.json这个文件里添加如下代码即可

![27031912-3ee19abe4e85c6cb.png](https://s2.loli.net/2023/07/14/gGXL6cpKTHnxCYr.png)

8、h5移动端，监听手机返回键，两次退出app

**index.html文件中加入一下内容 [参考地址](
https://blog.csdn.net/Lycoris_Red/article/details/108076881)**

```js
<script>

    document.addEventListener('plusready', function () {

          var first = null;

          var webview = plus.webview.currentWebview();

          plus.key.addEventListener('backbutton', function () {

              webview.canBack(function (e) {

                  if (e.canBack) {

                    webview.back(); //这里不建议修改自己跳转的路径 

                  } else {

                    //首次按键，提示‘再按一次退出应用’ 

                    if (!first) {

                      first = new Date().getTime(); //获取第一次点击的时间戳 

                      plus.nativeUI.toast("再按一次退出应用", {

                        duration: 'short'

                      }); //通过H5+ API 调用Android 上的toast 提示框 

                      setTimeout(function () {

                        first = null;

                      }, 1000);

                    } else {

                        // 获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,

                      if (new Date().getTime() - first < 1000) { 

                        plus.runtime.quit(); //退出应用 

              }

            }

          }

        })

      });

    });

</script>
```

![27031912-1540f4cb8aeb5aaa.png](https://s2.loli.net/2023/07/14/nbcQEk7UpWV9BtP.png)

9、H5开发APP判断手机导航栏高度，该高度以px为单位

```js
            let immersed = 0;

            let ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);

            if(ms&&ms.length>=3) { // 当前环境为沉浸式状态栏模式

              immersed = parseFloat(ms[2]);// 获取状态栏的高度

            }
```

