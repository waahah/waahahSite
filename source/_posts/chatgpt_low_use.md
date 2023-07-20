---
title: ChatGPT 低成本体验与实践
date: 2023-04-04 14:58:36
tags: [TypeScript, ChatGPT, Server]
categories: [Coding, JavaScript]
---

> 本文没有什么含金量，纯粹为了蹭热度（但或许也有用呢?）…

### 文章目录

*   需要准备什么
    
*   账号注册步骤
    
*   接入QQ机器人 (NodeJs)
    
*     
    

*   最终效果
    
*   新手向，实现GPT的QQ机器人不上云行吗?
    

*   常见问题
    

  

需要准备什么
------

1.  科学上网
    
2.  支付宝余额150元左右
    

openai很多国家注册不了，免费的虚拟手机号也基本用不了…

账号注册步骤
------

1.  **科学上网**
    
2.  充值余额，  
    

  
  
3\. **访问 <https://openai.com/api/>**

这里正常注册即可，对邮箱没有限制的，选择上面申请到的手机号即可(注意国家区号对应上)

注: 有时候科学上网的但是还是限制国区，可能是科学上网代理的国家刚好也是被限制的，尝试切换代理，还有一个玄学的方式，从google搜索OpenAPI，点进去再注册  
5\. **至此，注册成功!**  
![fde31e38c2164d7eb39d8b69514dcc48.png](https://s2.loli.net/2023/07/12/i3s9UZz5eXLMEVq.png)

**访问 https://chat.openai.com/chat即可体验网传的聊天功能**  
![08329366d36540df9f26c6b0d90dc758.png](https://s2.loli.net/2023/07/12/hIFSlrAZ7ecMtp3.png)

接入QQ机器人 (NodeJs)
----------------

完整实现另见 Github

**环境配置**

*   Node.js  版本>= 16.8
    

**核心依赖**

*   ChatGPT 非官方 ChatGPT API 的 Node.js 客户端。
    
*   OICQ QQ(安卓)协议基于Node.js的实现，
    

**token获取**

  
访问 https://chat.openai.com/chat  

![](https://s2.loli.net/2023/07/12/as1UBM9drhC8PGu.png)
  

**主要代码实现**

**ChatGPT的API接入**

```js
import { ChatGPTAPI } from 'chatgpt'const api = new ChatGPTAPI({ sessionToken: process.env.token as string })await api.ensureAuth() // 校验token// 使用的话就是调用 sendMessageconst response = await api.sendMessage(message, {
   timeoutMs: 2 \* 60 \* 1000})
```

**OICQ部分**_文章地址https://www.yii666.com/blog/14284.html_

```js
import { createClient } from "oicq"const client = createClient(Number(process.env.qq as string))// 处理消息事件client.on("message", async e => {})// 登录client.on("system.login.qrcode", function (e) {
    //扫码后按回车登录
  process.stdin.once("data", () =>  this.login() )}).login()
```

最终效果
----

![a8872acb8d2249d8a79d8fdbe4248694.png](https://s2.loli.net/2023/07/12/gnVUA3Kk4ScY2j1.png)

* * *

![4887377cfde246869e9e95e015e53a7a.png](https://s2.loli.net/2023/07/12/NhkP5jrHwnqVDvI.png)

* * *

![2ba387563d4345eb9f3df0dcf8961eb7.png](https://s2.loli.net/2023/07/12/9OQLHrKynt7Pzjh.png)

新手向，实现GPT的QQ机器人不上云行吗?
---------------------

可以的，只需一台能联网运行 Node.js 的机器即可  
**以手机为例**

1.  安装 termux ，需要配置后台启动，避免被杀后台就行
    
2.  执行以下命令
    

```bash
termux-change-repo 
# 设国内软件源，提高国内安装各种东西的速度，先选择 Single mirror，再选择 mirrors.ustc.edu.cn 即可， 另见: http://mirrors.ustc.edu.cn/help/termux.htmlapt update 
# 更新软件列表
apt install nodejs 
#安装nodejs
node -v 
# 成功显示版本号即成功
```

3.安装git，用来下载相关文件

```bash
apt install git # 安装gitgit clone https://github.com/easydu2002/chat\_gpt\_oicq # 下载项目
```

1.  进入项目目录 **cd chat\_gpt\_oicq**
    
2.  创建文件，直接 **vi .env**  
    esc i 输入以下内容， qq为你的机器人qq，token按照 这里的 输入即可(注意换行)， 最后:wq 保存退出
    

```ini
qq=1307053737
token=eyJxxxxxxxx
```

1.  执行以下命令
    

```bash
npm installnpm run dev # 提示安装tsx什么的直接确认即可
```

1.  扫码登录即可看到最终效果
![dce82a2bbf174fe192834662c527bc0f.jpeg](https://s2.loli.net/2023/07/12/dhoe2M3pgkuGiQC.jpg) 

![980ed8f1e1284e80bc2ffd74fc284b95.jpeg](https://s2.loli.net/2023/07/12/OcBpRxaGfj4SE2z.jpg)
    

* * *

常见问题
----

**Q:** `Not available OpenAI's services are not available in your country.`  
**A:** 没有科学上网，或者科学上网的代理仍是被限制的区域，可以尝试切换代理节点，一般不会立即生效，可尝试从google搜索OpenAI，点进去再注册…

* * *

**Q:** 扫码登录不上  
**A:** 1. 切换移动数据尝试 2.切换TIM扫码 3… 实际原因很多，这里先不赘述了，QQ登录不上都是OICQ的问题，另见 https://github.com/takayama-lily/oicq/issues

* * *
