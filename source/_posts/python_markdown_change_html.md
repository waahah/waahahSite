---
title: Python-Markdown将Markdown格式文本转为html
date: 2023-07-20 14:58:36
tags: [Python, Markdown]
categories: [Coding, Python]
---

Python-Markdown将Markdown格式文本转为html
==================================

**简介：** Python-Markdown将Markdown格式文本转为html


文档：[https://daringfireball.net/projects/markdown/](https://daringfireball.net/projects/markdown/)


Github: [https://github.com/Python-Markdown/markdown/](https://github.com/Python-Markdown/markdown/)


John Gruber’s Markdown： [https://python-markdown.github.io/reference/](https://python-markdown.github.io/reference/)

  

安装

```
pip install markdown
```

markdown转html示例

```python
import markdown
md = """
\# 标题
\- list-1
\- list-2  
"""
html = markdown.markdown(md)
print(html)
"""
输出：
<h1>标题</h1>
<ul>
<li>list-1</li>
<li>list-2  </li>
</ul>
"""

```
