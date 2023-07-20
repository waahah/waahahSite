---
title: JSONPath-简单入门
date: 2022-04-08 14:58:36
tags: [JavaScript, JSONPath, Python]
categories: [Coding, Python]
---

### 前言

JSONPath - 是xpath在json的应用。

`xml`最大的优点就有大量的工具可以分析，转换，和选择性的提取文档中的数据。XPath是这些最强大的工具之一。

如果可以使用xpath来解析json，以下的问题可以被解决：

1. 数据不使用特殊的脚本，可以在客户端交互的发现并取并获取。

2. 客户机请求的JSON数据可以减少到服务器上的相关部分，这样可以最大限度地减少服务器响应的带宽使用率。

如果我们愿意，这个可以解析json数据的工具会变得有意义。随之而来的问题是它如何工作，jsonpath的表达式看起来怎么样。


事实上，json是由c系统编程语言表示自然数据，有特定语言的特定语法来访问json数据。

xpath的表达式：

/store/book\[1\]/title

我们可以看作是：

x.store.book\[0\].title

或

`x\['store'\]\['book'\]\[0\]\['title'\]`

在`Javascript`, `Python` 和 `PHP` 中一个变量x表示`json`数据。经过观察，特定的语言里有内置`xpath`来解析数据。


### JSONPath工具的问题

\-依赖某种特定的语言

\- 需要依赖XPath 1.0

\- 减少代码量和内存的消耗

\- 在运行时


####  JSONPath 表达式

  

JSONPath 是参照，xpath表达式来解析xml文档的方式，json数据结构通常是匿名的并且不一定需要有根元素。JSONPaht 用一个抽象的名字$来表示最外层对象。

  

JOSNPath 表达式可以使用.  符号如下：

`$.store.book[0].title`

或者使用\[\] 符号

`$['store']['book'][0]['title']`


从输入路径来看。内部或者输出的路径都会转化成-符号。


JSONPath 允许使用通配符 \* 表示所以的子元素名和数组索引。还允许使用 '..' 从E4X参照过来的和数组切分语法 `[start:end:step]是从ECMASCRIPT 4 参照过来的。`


表达式在下面的脚本语言中可以使用显示的名称或者索引：

`$.store.book[(@.length-1)].title`


使用'@'符号表示当前的对象，?(<判断表达式>) 使用逻辑表达式来过滤。

`$.store.book[?(@.price < 10)].title`


这里有个表格，说明JSONPath语法元素和对应XPath元素的对比。

<table style="border:1px solid black; border-collapse:collapse; empty-cells:show; font-size:16px; overflow:auto; width:1411px"><tbody><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:4.961020552799433%"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif"><strong>XPath</strong></span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:10.630758327427356%"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif"><strong>JSONPath</strong></span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:84.33734939759037%"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif"><strong>Description</strong></span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">/</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">$</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">表示根元素</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">.</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">@</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">&nbsp;当前元素</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">/</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">. or []</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">子元素</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">..</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">n/a</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">父元素</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">//</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">..</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">递归下降，JSONPath是从E4X借鉴的。</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">*</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">*</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">通配符，表示所有的元素</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">@</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">n/a</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">&nbsp;属性访问字符</span></span></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">[]</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">[]</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div>子元素操作符</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">|</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">[,]</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><div><span style="color:rgb(34,0,34); font-family:verdana,lucida,arial,helvetica,sans-serif">连接操作符在XPath 结果合并其它结点集合。JSONP允许name或者数组索引。</span></div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">n/a</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">[start:end:step]</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div><span style="color:rgb(34,0,34); font-family:verdana,lucida,arial,helvetica,sans-serif">数组分割操作从ES4借鉴。</span></div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">[]</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">?()</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><div><span style="color:rgb(34,0,34); font-family:verdana,lucida,arial,helvetica,sans-serif">应用过滤表示式</span></div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">n/a</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221)"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">()</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div><span style="color:rgb(34,0,34); font-family:verdana,lucida,arial,helvetica,sans-serif">脚本表达式，使用在脚本引擎下面。</span></div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">()</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">n/a</span></span></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><span style="color:rgb(34,0,34)"><span style="font-family:verdana,lucida,arial,helvetica,sans-serif">Xpath分组</span></span></td></tr></tbody></table>

  

XPath还有很多的语法（本地路径，操作符，和函数）没有列在这里。只要知道xpath和jsonpath脚本之中的不同点就行了。

*   \[\]在xpath表达式总是从前面的路径来操作数组，索引是从1开始。  
    
*   使用JOSNPath的\[\]操作符操作一个对象或者数组，索引是从0开始。


### SONPath 例子

接下我们看jsonpath表示的例子。下面是一个简单的json数据结构代表一个书店（原始的xml文件是）

```json
{ _"store"_: {
    _"book"_: \[ 
      { _"category"_: _"reference"_,
        _"author"_: _"Nigel Rees"_,
        _"title"_: _"Sayings of the Century"_,
        _"price"_: 8.95
      },
      { _"category"_: _"fiction"_,
        _"author"_: _"Evelyn Waugh"_,
        _"title"_: _"Sword of Honour"_,
        _"price"_: 12.99
      },
      { _"category"_: _"fiction"_,
        _"author"_: _"Herman Melville"_,
        _"title"_: _"Moby Dick"_,
        _"isbn"_: _"0-553-21311-3"_,
        _"price"_: 8.99
      },
      { _"category"_: _"fiction"_,
        _"author"_: _"J. R. R. Tolkien"_,
        _"title"_: _"The Lord of the Rings"_,
        _"isbn"_: _"0-395-19395-8"_,
        _"price"_: 22.99
      }
    \],
    _"bicycle"_: {
      _"color"_: _"red"_,
      _"price"_: 19.95
    }
  }
}

```

<table style="border:1px solid black; border-collapse:collapse; empty-cells:show; font-size:16px; overflow:auto; width:989px"><tbody><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:21.941354903943378%"><strong>XPath</strong></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:23.96359959555106%"><strong>JSONPath</strong></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; text-align:center; background-color:rgb(221,221,221); width:53.99393326592518%"><strong>结果</strong></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">/store/book/author</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$.store.book[*].author</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><div>书点所有书的作者</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//author</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..author</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div>所有的作者</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">/store/*</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$.store.*</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><div>store的所有元素。所有的bookst和bicycle</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">/store//price</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$.store..price</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div>store里面所有东西的price</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//book[3]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[2]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><div>第三个书</div></td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//book[last()]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[(@.length-1)]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)">最后一本书</td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//book[position()&lt;3]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[0,1]</code><div><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[:2]</code></div></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em">前面的两本书。</td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//book[isbn]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[?(@.isbn)]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)">&nbsp;过滤出所有的包含isbn的书。</td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//book[price&lt;10]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..book[?(@.price&lt;10)]</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em">过滤出价格低于10的书。</td></tr><tr><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">//*</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><code style="font-family:&quot;Courier New&quot;,Courier,monospace">$..*</code></td><td style="border-left:1px solid black; border-right:1px solid black; padding:0.25em 0.5em; background-color:rgb(221,221,221)"><div><span style="color:rgb(34,0,34)">所有元素。</span></div></td></tr></tbody></table>

### 参考
- <http://goessner.net/articles/JsonPath/](http://goessner.net/articles/JsonPath/>