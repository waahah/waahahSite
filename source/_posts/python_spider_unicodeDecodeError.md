---
title: python爬虫-UnicodeDecodeError_'utf-8' codec can't decode byte 0x8b
date: 2022-12-10 14:58:36
tags: [Python, Urllib, Error]
categories: [Coding, Python]
---

### 前言
python爬虫-UnicodeDecodeError: 'utf-8' codec can't decode byte 0x8b in position 1: invalid start byte

错误如下：

```cmd
UnicodeDecodeError: 'utf-8' codec can't decode byte 0x8b in position 1: invalid start byte
```

抓取的网页检查：

Content-Encoding: gzip

需要做`gzip`的解压

```python
request = urllib.request.Request(url = url, headers = request_headers)
reponse = urllib.request.urlopen(request,timeout = timeout)
data = reponse.read()
buff = BytesIO(data)
f = gzip.GzipFile(fileobj=buff)
res = f.read().decode('utf-8')
print(res)
```

在请求的头部加入：`"Accept-Encoding":"gzip"`,

如果是下面：则每次返回有可能是gzip压缩，有可能不压缩，WEB 应用干脆为了迁就 IE 直接输出原始 `DEFLATE`

Accept-Encoding: gzip, deflate在请求的头部加入：
```json
"Accept-Encoding":"gzip",
```