---
title: Python Proxies TypeError_Constructor parameter should be str
date: 2023-04-06 14:58:36
tags: [Python, Proxies, Error]
categories: [Coding, Python]
---

### 前言

Pyhton异步代理请求错误：
`TypeError: Constructor parameter should be str`

原因：在`asyncio`和`aiohttp`请求时用的代理的格式错误了。

在requests请求中，代理proxies需要是字典格式，例如{"http": "<http://14.67.8.20:2045>"}，但是在下面的里面需要proxy为字符串类型，例如：

```python
async with session.get(url, proxy="http://14.67.8.20:2045") as response:  
    return await response.text()
```
