---
title: 解决ModuleNotFoundError_No module named ‘pip‘问题
date: 2022-12-02 14:58:36
tags: [Python, Pip]
categories: [Coding, Python]
---

### 前言
解决ModuleNotFoundError: No module named ‘pip‘问题

Python学习遇到小问题：ModuleNotFoundError: No module named ‘pip’  
今天想要装一下wxPython第三方库来写一下Python的GUI的时候发现cmd窗口下无法执行pip命令，想了想昨晚好像是pip命令行提示了我有新版本可以更新使用，更新之后也不成功，但昨晚没有怎么理会，以为没事，但今早起来一看发现pip命令都用不了了，出现了ModuleNotFoundError: No module named 'pip’这个错误。  
查询了网上之后发现，这个错误可以通过两行简单的cmd命令行语句进行改正修复。

```bash
python -m ensurepip
python -m pip install --upgrade pip
```

![](https://s2.loli.net/2023/07/10/5PtC8mnzSGTAFpQ.png)

![](https://s2.loli.net/2023/07/10/Z2lhmS7LUEaWefF.png)
到此，pip被修复完成。

最近遇到新问题。更新PIP的时候看到  
所以对其进行降级，降级到8.0  

- [参考链接](https://blog.csdn.net/fhljzcs/article/details/116274444?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164482761116780261968227%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164482761116780261968227&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-116274444.pc_search_result_positive&utm_term=WARNING:%20Value%20for%20scheme.headers%20does%20not%20match.&spm=1018.2226.3001.4187)

```bash
python -m pip install pip==8.0.0
```

Cache entry deserialization failed, entry ignored问题：  
- [更换镜像](https://blog.csdn.net/qq_31910669/article/details/109609067?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164482777916780271967433%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=164482777916780271967433&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-6-109609067.pc_search_result_positive&utm_term=Cache%20entry%20deserialization%20failed,%20entry%20ignored&spm=1018.2226.3001.4187)

