---
title: JavaScript文档碎片
date: 2023-05-29 14:58:36
tags: [JavaScript, Document]
categories: [Coding, JavaScript]
---

JavaScript文档碎片
====

   文档碎片是一个轻量级的`document`对象，可以更新和移动节点。他的语法特征是当你附加一个碎片到节点中时，实际上被添加的是该碎片的子结点（碎片内容），而不是碎片本身。

​    以往当需要大量添加节点时，我们通常通过遍历数组，逐个创建元素节点的方式 `document.createElement()` ，这样会导致效率低下。每循环添加一个节点时，会引起大量的回流和重绘。所以我们需要使用创建文档碎片。`createElementFragment()` 先将节点添加在文档碎片里，暂存起来，最后一次性的添加到 `HTML` 文档中。使用文档碎片可以减少回流重绘，提高性能。

循环添加节点

```html
<body>
    <div id="box"></div>
    <script>
        let arr = ["A", "B", "C"];
         arr.forEach(item => {
            box.innerHTML += `<span>${item}</span>`;
            });
    </script>
</body>
```

  使用文档碎片一次性添加节点

```html
<script>
    let cdf = document.createDocumentFragment();
        arr.forEach(item => {
            let spanEle = document.createElement("span");
            let content = document.createTextNode(item);
            spanEle.appendChild(content);
            cdf.appendChild(spanEle);
        });
        box.appendChild(cdf);
</script>     
```

