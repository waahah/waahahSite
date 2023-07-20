---
title: npm install ERROR_Failed to download Chromium r686378!解决
date: 2023-02-24 14:58:36
tags: [Javascript, Nvm, Nodejs]
categories: [Coding, Nodejs]
---
### 前言

`npm install` 进行安装时，报如下错误

`ERROR: Failed to download Chromium r686378! Set "PUPPETEER\_SKIP\_CHROMIUM\_DOWNLOAD" env variable to skip download.`

使用如下命令即可

```bash
npm i puppeteer --ignore-scripts
```
