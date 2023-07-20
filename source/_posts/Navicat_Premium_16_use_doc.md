---
title: Navicat Premium 16无限试用教程
date: 2023-08-02 14:58:36
tags: [Mysql, Navicat]
categories: [Coding, Databases]
---

1.前往官网下载【**Navicat Premium 16**】
================================

- <http://www.navicat.com.cn/products](http://www.navicat.com.cn/products>

2.创建清理试用信息bat
=============

**Navicat Premium 16Crack.bat**

```bat
@echo off

echo Delete HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium\Registration[version and language]
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium" /s | findstr /L Registration"') do (
    reg delete %%i /va /f
)
echo.

echo Delete Info folder under HKEY_CURRENT_USER\Software\Classes\CLSID
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\Classes\CLSID" /s | findstr /E Info"') do (
    reg delete %%i /va /f
)
echo.

echo Finish

pause
```

> 在每次试用到期时，执行清理，
> 
> 或者添加至定时程序中，每日自动清理
> 
> 相当于无限试用

**3.说明**
========

> 上述均为技术探索，请勿牟利！！！
> 
> 请支持正版！！！

