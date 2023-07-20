---
title: html使用html2canvas，jspdf转pdf
date: 2022-05-24 14:58:36
tags: [Html, html2canvas, jspdf, pdf]
categories: [Coding, JavaScript]
---

### 前言

前端使用`html2canvas`和`jspdf`进行html转pdf的,原理大致是先把html渲染出来，然后通过html2canvas进行页面切割，然后把切割好的页面用canvas的形式贴到pdf上，这样就会出现把正常数据切割了，形成不正常的页面，暂时对页眉页脚没有做相应的处理

引入html2canvas和jspdf

```javascript
npm i html2canvas --save
npm i jspdf --save

```

然后创建一个htmlToPdf.js

```javascript
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */

export function downloadPDF(ele, pdfName) {
  window.scrollTo(0, 0);
  let eleW = ele.offsetWidth; // 获得该容器的宽
  let eleH = ele.offsetHeight; // 获得该容器的高
  let eleOffsetTop = ele.offsetTop; // 获得该容器到文档顶部的距离
  let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离

  var canvas = document.createElement("canvas");
  var abs = 0;

  let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
    abs = (win_out - win_in) / 2; // 获得滚动条宽度的一半
    // console.log(a, '新abs');
  }
  canvas.width = eleW * 2; // 将画布宽&&高放大两倍
  canvas.height = eleH * 2;

  var context = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
  // translate 的时候，要把这个差值去掉

  html2canvas(ele, {
    dpi: 300,
    scale: 1,
    // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
    useCORS: true //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  }).then((canvas) => {
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = contentWidth / 595.28 * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28;
    var imgHeight = 595.28 / contentWidth * contentHeight;
    var pageData = canvas.toDataURL('image/jpeg', 1.0);
    var pdf = new JsPDF('', 'pt', 'a4');
    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    // console.log('处理完画布高度：' + contentHeight)
    // console.log('每页高度：' + pageHeight)
    // console.log(imgWidth, imgHeight);
    
    if (leftHeight < pageHeight) {
      //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else { // 分页
      while (leftHeight > 10) {
        // console.log(leftHeight)
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 871.89;
        //避免添加空白页
        if (leftHeight > 10) {
          pdf.addPage();
        }
      }
    }
    //可动态生成
    pdf.save(pdfName)
  })
}

```

在使用的页面里调用

```javascript
<template>
  <div>
    <div id="demo">
    pdf内容
    .
    .
    .
    </div>
    <el-button type="danger" @click="ExportSavePdf">导出PDF</el-button> 
  </div>
</template>
<script>
import { downloadPDF } from "@/utils/htmlToPdf"
export default {
  name: "detail",
  data() {
    return {
    };
  },
  methods: {
    ExportSavePdf() {
      downloadPDF(document.querySelector("#demo"), "test");
    }
  }
};
</script>
<style lang="scss">
</style>

```