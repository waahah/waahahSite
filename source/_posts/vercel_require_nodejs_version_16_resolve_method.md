---
title: Vercel 要求 Node.js 版本16.x 的解决方案 
date: 2023-07-08 14:58:36
tags: [Version, Vercel, Nodejs]
categories: [Coding, Nodejs]
---

### 前言

> 2022年8月起，Vercel 要求 Node.js 项目版本在 16.x 以上，旧版本 Node.js 项目不再部署，本文记录解决方案。

### 问题复现

*   Vercel 部署失败，错误信息：
    
```shell
Looking up build cache...
Build cache downloaded [30.81 MB]: 2006.794ms
Running "vercel build"
Vercel CLI 27.3.7
Error! Node.js Version "12.x" is discontinued and must be upgraded. Please set Node.js Version to 16.x in your Project Settings to use Node.js 16.
Learn More: http://vercel.link/node-version
```
    
*   事实上当前本机 Node.js 版本确实是16.15
    

### 解决方案

*   需要通过 package.json 告诉 Vercel 我们的项目 Node.js 版本
    
*   修改 package.json ，加入：
    
```json
"engines": {
  "node": ">=16"
}
```

*   更新包，修正当前的问题
    
```bash
npm install
npm audit fix --force
```
    
*   再次 push 到 Vercel 即可正常部署
    

### 参考资料

*   [https://www.cnblogs.com/Wayou/p/restrict\_node\_version.html](https://www.cnblogs.com/Wayou/p/restrict_node_version.html)

