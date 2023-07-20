---
title: 解决npm ERR! operation not permitted
date: 2021-10-16 14:58:36
tags: [Nodejs, JavaScript, Npm, Error]
categories: [Coding, Nodejs]

---

### 前言

`npm ERR! { Error: EPERM: operation not permitted, mkdir 'D:\Program Files\nodejs\node_cache\_cacache'`

**1、错误场景**

*   `win10`安装`node`之后，使用命令`node -v`，`npm -v`都正常，node是安装成功的，但是运行`npm i`时，报错：  
    ```
    npm ERR! Error: EPERM: operation not permitted, mkdir 'D:\Program Files\nodejs\node_cache\_cacache'
    ```

    ![](https://s2.loli.net/2023/07/02/IKfwD3g8rnGp2OZ.png)

**2、错误原因**

*   权限不够

**3、解决办法**

1.  找到node安装目录，右键属性，点击安全，设置users用户完全控制权限  
    ![](https://s2.loli.net/2023/07/02/tmTCh5qInBiDlUc.png)
2.  用管理员模式运行cmd  
    ![](https://s2.loli.net/2023/07/02/inEcIts2NTuj5Fd.png)
    ![](https://s2.loli.net/2023/07/02/n4Vu5bqZmcOLe9h.png)

  