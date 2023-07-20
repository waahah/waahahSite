---
title: 在浏览器中使用 OCR Tesseract.js离线版使用
date: 2021-12-20 14:58:36
tags: [Canvas, JavaScript, OCR]
categories: [Coding, JavaScript]

---

 ### 前言

使用 Tesseract.js 在浏览器中使用 OCR_tesseract.js离线版使用


光学字符识别或光学字符阅读器 (OCR) 是将文本图像转换为机器编码文本的过程。例如，您可以拍摄书页的图片，然后通过 OCR 软件运行它以提取文本。

在这篇博文中，我们将使用[Tesseract OCR 库](https://github.com/tesseract-ocr/tesseract "Tesseract OCR 库")。Tesseract 是用 C/C++ 编写的，最初是在 1985 年到 1994 年间由惠普公司开发的。惠普在 2005 年开源了该软件。从那时起，谷歌一直在开发和维护它。

2018 年 10 月发布的最新版本 4 包含一个新的 OCR 引擎，该引擎使用基于 LSTM 的神经网络系统，这应该会显着提高准确性。版本 4 支持 123 种开箱即用的语言。源代码托管在 GitHub 上：[https](https://github.com/tesseract-ocr/tesseract "https") : [//github.com/tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract "//github.com/tesseract-ocr/tesseract")

如前所述，Tesseract 引擎是用 C++ 编写的，不能在浏览器中运行。使用 C++ 引擎的唯一方法是将图片从 Web 应用程序发送到服务器，通过引擎运行它并将文本发回。

但是几年来，存在 Tesseract C++ 引擎的 JavaScript 端口，它在浏览器中运行并且不依赖于任何服务器端代码。该库名为 Tesseract.js，您可以在 GitHub 上找到源代码：[https](https://github.com/naptha/tesseract.js "https") : [//github.com/naptha/tesseract.js](https://github.com/naptha/tesseract.js "//github.com/naptha/tesseract.js")  
该引擎最初是用[ASM.js](http://asmjs.org/ "ASM.js")编写的，最近已移植到 WebAssembly。

我们将使用库的第 2 版。版本 2 是 Tesseract 4.1 的 WebAssembly 端口。当浏览器不支持 WebAssembly 时，库会回[退到 ASM.js。](http://asmjs.org/ "退到 ASM.js。")

[安装](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#installation "安装")
-------------------------------------------------------------------------------

您可以通过从 CDN 加载 Tesseract.js 将其添加到您的项目中

```
<script src='https://unpkg.com/tesseract.js@2.1.4/dist/tesseract.min.js'></script>
```

或通过安装它`npm`。

```
npm install tesseract.js
```

[基本用法](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#basic-usage "基本用法")
----------------------------------------------------------------------------------

该库提供了`recognize`将图像作为输入并返回带有识别文本的对象的方法。这里有一个简单的例子

```javascript
const exampleImage = "https://tesseract.projectnaptha.com/img/eng_bw.png";
const worker = Tesseract.createWorker({ logger: (m) => console.log(m) });
Tesseract.setLogging(true);
work();
async function work() {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    let result = await worker.detect(exampleImage);
    console.log(result.data);
    result = await worker.recognize(exampleImage);
    console.log(result.data);
    await worker.terminate();
}
```

[基本.html](https://github.com/ralscha/blog2019/blob/master/webocr/basic.html#L14-L34 "基本.html")

[参数](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#arguments "参数")

该`recognize`方法需要一个图像作为第一个参数。该库支持 bmp、jpg、png 和 pbm 格式的图像。

图像可以提供给方法作为

*   `img`, `video`, 或`canvas`元素
*   文件对象（来自文件`<input>`）
*   Blob 对象
*   图像的路径或 URL
*   base64 编码的图像

更多信息参见官方文档：[https](https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md "https") :  
[//github.com/naptha/tesseract.js/blob/master/docs/image-format.md](https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md "//github.com/naptha/tesseract.js/blob/master/docs/image-format.md")

在调用`recognize`方法之前，您必须使用 来创建工作`createWorker()`线程，使用 加载 tesseract.js 核心脚本`load()`，使用 加载一种或多种语言的机器学习模型`loadLanguage(...)`，最后使用 初始化 Tesseract API `initialize(...)`。您指定为`initialize`调用参数的语言可以是您加载的语言的子集`loadLanguage()`。

下一个示例预先加载英语和西班牙语模型，但随后仅在下一次 API 调用中使用英语。

```javascript
await worker.loadLanguage('eng+spa'); 
await worker.initialize('eng');
```

稍后在应用程序中，您只需通过另一个`initialize(...)`调用切换到另一种语言。

[进步](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#progress "进步")

OCR 进程运行几秒钟，如果要向用户显示进度信息，则配置一个进度侦听器。您可以通过将对象作为参数传递给`createWorker()`调用来做到这一点。该`logger`属性需要在识别过程中多次调用的函数。

```javascript
    const worker = Tesseract.createWorker({
      logger: m => console.log(m)
    });
```

您在 logger 函数中作为参数获得的对象包含工作人员和作业 ID 以及属性`status`和`progress`。`status`是描述当前操作的字符串，`progress`是一个介于 0 和 1 之间的数字，表示当前进度的百分比。

进度示例：

```json
{
    "workerId": "Worker-0-4d98d",
    "jobId": "Job-0-a37f4",
    "status": "recognizing text",
    "progress": 0.8285714285714286
}
```

如果您需要更多内部信息，请将日志记录标志设置为 true。该库然后将更多信息打印到开发人员控制台中：`setLogging(true)`

[结果](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#result "结果")

该`recognize()`方法返回一个 Promise。您从成功调用中获得的对象包含`data`保存有关已识别文本的信息的属性。你要么访问文本与`text`属性，它包含了识别的文本作为一个字符串，或者你通过访问`lines`，`paragraphs`，`words`，或`symbols`性质。每个组元素都包含一个`confidence`分数，告诉您引擎的信心程度。分数是一个介于 0 到 100 之间的数字；较高的值表示较高的置信度。

```js
{
    text: "Mild Splendour of the various-vested Nig ..."
    hocr: "<div class='ocr_page' id= ..."
    tsv: "1 1 0 0 0 0 0 0 1486 ..."
    box: null
    unlv: null
    osd: null
    confidence: 90
    blocks: [{...}]
    psm: "SINGLE_BLOCK"
    oem: "DEFAULT"
    version: "4.0.0-825-g887c"
    paragraphs: [{...}]
    lines: (8) [{...}, ...]
    words: (58) [{...}, {...}, ...]
    symbols: (295) [{...}, {...}, ...]
  }
```

当您使用属性`lines`和访问文本时`paragraphs`，您将获得按行和段落分组的文本。该`words`包含每个识别的词的数组，`symbols`让你访问的每个字符。

这些属性的每个元素都包含`bbox`表示边界框 x/y 坐标的属性。在演示应用程序中，我使用此信息在所选文本周围绘制一个矩形。

这是`words`数组中元素的示例。该`text`属性包含单词，并`confidence`告诉我们置信度分数。`line`，并`paragraph`引用该单词所在的行和段落对象。`symbols`是一个单独保存每个字符的数组 ( `M`, `i`, `l`, `d`)。

```javascript
{
  symbols: Array(4)
    0: {choices: Array(1), image: null, text: "M", confidence: 99.03752899169922, baseline: {...}, ...}
    1: {choices: Array(1), image: null, text: "i", confidence: 98.83988952636719, baseline: {...}, ...}
    2: {choices: Array(1), image: null, text: "l", confidence: 99.01886749267578, baseline: {...}, ...}
    3: {choices: Array(1), image: null, text: "d", confidence: 99.0378646850586, baseline: {...}, ...}
  choices: [{...}]
  text: "Mild"
  confidence: 91.87923431396484
  baseline: {x0: 38, y0: 84, x1: 167, y1: 85, has_baseline: true}
  bbox: {x0: 38, y0: 34, x1: 167, y1: 85}
  is_numeric: false
  in_dictionary: false
  direction: "LEFT_TO_RIGHT"
  language: "eng"
  is_bold: false
  is_italic: false
  is_underlined: false
  is_monospace: false
  is_serif: false
  is_smallcaps: false
  font_size: 17
  font_id: -1
  font_name: ""
  page: ...
  block: ...
  paragraph: {lines: Array(8), text: "Mild Splendour ...", confidence: 91.35659790039062, ...}
  line: {words: Array(6), text: "Mild Splendour ...", confidence: 92.46450805664062, ...}
}
```

如果要查看完整的结果对象，请访问 URL [Basic Usage](https://omed.hplar.ch/webocr/basic.html "Basic Usage")并打开开发人员控制台。

[探测](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#detect "探测")

Tesseract.js 库提供的另一种方法是`detect()`. 此方法尝试检测方向和脚本。像`recognize()`这个方法需要一个图像作为第一个参数并返回一个 Promise。

```javascript
  const result = await worker.detect(image);

```

结果对象包含属性`data`，该属性保存有关检测到的脚本和方向以及相应的置信度分数的信息。

```
{
    tesseract_script_id: 1
    script: "Latin"
    script_confidence: 39.58333969116211
    orientation_degrees: 0
    orientation_confidence: 29.793731689453125
}
```

更多信息参见官方文档：[https](https://github.com/naptha/tesseract.js/blob/master/docs/api.md#worker-detect "https") :  
[//github.com/naptha/tesseract.js/blob/master/docs/api.md#worker-detect](https://github.com/naptha/tesseract.js/blob/master/docs/api.md#worker-detect "//github.com/naptha/tesseract.js/blob/master/docs/api.md#worker-detect")

[清理](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#cleanup "清理")

该库在 Web Worker 中运行 OCR 引擎。如果您的应用程序不再需要该工作线程，您应该使用`worker.terminate()`.

[更多例子](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#more-examples "更多例子")

查看文档页面以获取更多代码示例：[https](https://github.com/naptha/tesseract.js/blob/master/docs/examples.md "https") :  
[//github.com/naptha/tesseract.js/blob/master/docs/examples.md](https://github.com/naptha/tesseract.js/blob/master/docs/examples.md "//github.com/naptha/tesseract.js/blob/master/docs/examples.md")

[演示应用程序](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#demo-application "演示应用程序")
-------------------------------------------------------------------------------------------

在本节中，我将展示如何将 Tesseract.js 库合并到 Angular/Ionic 应用程序中。

您可以在 GitHub 上找到完整应用程序的源代码：[https](https://github.com/ralscha/blog2019/blob/master/webocr "https") :  
[//github.com/ralscha/blog2019/blob/master/webocr](https://github.com/ralscha/blog2019/blob/master/webocr "//github.com/ralscha/blog2019/blob/master/webocr")

演示应用程序托管在我的服务器上，您可以通过以下 URL 访问它：[https](https://omed.hplar.ch/webocr/ "https") :  
[//omed.hplar.ch/webocr/](https://omed.hplar.ch/webocr/ "//omed.hplar.ch/webocr/")

演示应用程序不依赖于任何服务器端代码，OCR 在 Web 浏览器本地运行，不向服务器发送任何数据。

该应用程序基于 Ionic 空白入门模板。首先，我将最新版本的 Tesseract.js 添加`npm install tesseract.js`到项目中。

在 TypeScript 代码中，我导入了库

```javascript
import {createWorker, RecognizeResult} from 'tesseract.js';
```

作为输入，应用程序使用类型为 file ( `type="file"`)的输入标记。每次用户选择一个文件时，`onFileChange`都会调用该方法，该方法从输入标记中提取 File 对象并将其传递给该`recognize()`方法。

```
  <input #fileSelector (change)="onFileChange($event)" accept="image/*" style="display: none;"          type="file">
```

[主页.html](https://github.com/ralscha/blog2019/blob/master/webocr/src/app/home/home.page.html#L131-L132 "主页.html")

然后，所选图片也被加载到 Image 对象中。应用程序不使用`img`标签来显示图片。相反，它将图片绘制到画布中。我在这里使用画布是因为每当用户单击文本时，应用程序都会在文本周围绘制矩形。

```javascript
  async onFileChange(event: Event): Promise<void> {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
 
    this.progressStatus = '';
    this.progress = null;
 
    this.result = null;
    this.words = null;
    this.symbols = null;
    this.selectedLine = null;
    this.selectedWord = null;
    this.selectedSymbol = null;
 
    this.image = new Image();
    this.image.onload = () => this.drawImageScaled(this.image);
    this.image.src = URL.createObjectURL(this.selectedFile);
 
    /*
    const worker = createWorker({
      logger: progress => {
        this.progressStatus = progress.status;
        this.progress = progress.progress;
        this.progressBar.set(progress.progress * 100);
        this.changeDetectionRef.markForCheck();
      }
    });
     */
    const worker = createWorker({
      workerPath: 'tesseract-202/worker.min.js',
      corePath: 'tesseract-202/tesseract-core.wasm.js',
      logger: progress => {
        this.progressStatus = progress.status;
        this.progress = progress.progress;
        this.progressBar.set(progress.progress * 100);
        this.changeDetectionRef.markForCheck();
      }
    });
 
    await worker.load();
    await worker.loadLanguage(this.language);
    await worker.initialize(this.language);
 
    this.progressBar.set(0);
 
    try {
      if (this.selectedFile) {
        const recognizeResult = await worker.recognize(this.selectedFile);
        if (recognizeResult) {
          this.result = recognizeResult.data;
        } else {
          this.result = null;
        }
        await worker.terminate();
      }
    } catch (e) {
      this.progressStatus = e;
      this.progress = null;
    } finally {
      this.progressBar.complete();
      this.progressStatus = null;
      this.progress = null;
    }
 
    // reset file input
    // @ts-ignore
    event.target.value = null;
  }
```

[主页.ts](https://github.com/ralscha/blog2019/blob/master/webocr/src/app/home/home.page.ts#L44-L111 "主页.ts")

为了显示结果，我使用了[Angular Material 项目中](https://material.angular.io/ "Angular Material 项目中")的[列表元素](https://material.angular.io/components/list/overview "列表元素")。您可以使用命令将 Angular Material 添加到任何 Angular 项目。`ng add @angular/material`

这里是单词列表的模板：

```
  <div *ngIf="words" class="table-container mat-elevation-z1 ion-margin-top">
    <table [dataSource]="words" mat-table>
 
      <ng-container matColumnDef="text">
        <th *matHeaderCellDef mat-header-cell>Word</th>
        <td *matCellDef="let word" mat-cell> {{word.text}} </td>
      </ng-container>
 
      <ng-container matColumnDef="confidence">
        <th *matHeaderCellDef mat-header-cell>Confidence</th>
        <td *matCellDef="let word" mat-cell> {{word.confidence | number:'1.2-2'}} %</td>
      </ng-container>
 
      <tr *matHeaderRowDef="elementColumns; sticky: true" mat-header-row></tr>
      <tr (click)="onWordClick(word)" *matRowDef="let word; columns: elementColumns;"
          [ngClass]="{'highlight': selectedWord === word}"
          mat-row></tr>
    </table>
  </div>
```

[主页.html](https://github.com/ralscha/blog2019/blob/master/webocr/src/app/home/home.page.html#L165-L183 "主页.html")

当用户单击列表项时，应用程序会在所选文本周围绘制一个矩形

```javascript
  drawBBox(bbox: { x0: number, x1: number, y0: number, y1: number }): void {
    if (bbox) {
      this.redrawImage();
 
      if (this.ratio === null) {
        throw new Error('ratio not set');
      }
 
      this.ctx.beginPath();
      this.ctx.moveTo(bbox.x0 * this.ratio, bbox.y0 * this.ratio);
      this.ctx.lineTo(bbox.x1 * this.ratio, bbox.y0 * this.ratio);
      this.ctx.lineTo(bbox.x1 * this.ratio, bbox.y1 * this.ratio);
      this.ctx.lineTo(bbox.x0 * this.ratio, bbox.y1 * this.ratio);
      this.ctx.closePath();
      this.ctx.strokeStyle = '#bada55';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }
 
  onLineClick(line: Line): void {
    this.words = line.words;
 
    this.drawBBox(line.bbox);
 
    this.symbols = null;
    this.selectedLine = line;
    this.selectedWord = null;
    this.selectedSymbol = null;
  }
```

[主页.ts](https://github.com/ralscha/blog2019/blob/master/webocr/src/app/home/home.page.ts#L119-L148 "主页.ts")

[自托管](https://golb.hplar.ch/2019/07/ocr-with-tesseractjs.html#self-host "自托管")
------------------------------------------------------------------------------

当您的应用程序创建并初始化 TesseractWorker 时，该库将下载多个文件。

```javascript
const worker = createWorker({...});
await worker.load();
await worker.loadLanguage(this.language);
await worker.initialize(this.language);
```

默认情况下，这些文件不是打包应用程序的一部分，Tesseract.js 将从 3rd 方服务器下载这些文件。最新版本将下载这些文件：

*   [https://unpkg.com/tesseract.js@2.1.4/dist/worker.min.js](https://unpkg.com/tesseract.js@2.1.4/dist/worker.min.js "https://unpkg.com/tesseract.js@2.1.4/dist/worker.min.js") (56 KB)
*   [https://unpkg.com/tesseract.js-core@2.1.0/tesseract-core.wasm.js](https://unpkg.com/tesseract.js-core@2.1.0/tesseract-core.wasm.js "https://unpkg.com/tesseract.js-core@2.1.0/tesseract-core.wasm.js") (1.0 MB)
*   [https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz](https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz "https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz") (10.4 MB)

如果应用程序调用该`detect()`方法，则会下载一个附加文件。

*   [https://tessdata.projectnaptha.com/4.0.0/osd.traineddata.gz](https://tessdata.projectnaptha.com/4.0.0/osd.traineddata.gz "https://tessdata.projectnaptha.com/4.0.0/osd.traineddata.gz") (4.1 MB)

当您编写从本地服务器下载文件要快得多的内部应用程序时，这不是最佳解决方案。或者您希望完全控制所有应用程序资源，而不必担心这些 3rd 方服务器的可用性。如果其中一台服务器不工作，您的应用程序将不再工作。

无论是什么原因，您都可以轻松自托管这些文件。Web Worker JavaScript 和 Web Assembly 文件是 Tesseract.js npm 包的一部分，因此我们可以将这两个文件从 node\_modules 目录复制到 build 文件夹。在 Angular 应用程序中，您可以通过将以下两个条目添加到 build->options->assets 数组来实现。

```
                "glob": "worker.min.js",
                "input": "node_modules/tesseract.js/dist/",
                "output": "./tesseract-202"
              },
              {
                "glob": "tesseract-core.wasm.js",
                "input": "node_modules/tesseract.js-core/",
                "output": "./tesseract-202"
              }
            ],
```

[angular.json](https://github.com/ralscha/blog2019/blob/master/webocr/angular.json#L29-L38 "angular.json")

Angular CLI 负责将这两个文件复制到 build 文件夹。在应用程序中，我们需要告诉 Tesseract.js 它必须从本地目录加载这两个文件，而不是从 unpkg.com 获取它们。

```javascript
const worker = createWorker({
  workerPath: 'tesseract-202/worker.min.js',
  corePath: 'tesseract-202/tesseract-core.wasm.js',
  ...
});
```

该库从 tessdata.projectnaptha.com 下载的机器学习模型不能作为 npm 包使用。有不同的方式来自我托管它们。如果您只需要支持几种语言，您可以从 Git 存储库（[GitHub - naptha/tessdata: Tesseract Language Trained Data](https://github.com/naptha/tessdata.git "GitHub - naptha/tessdata: Tesseract Language Trained Data")）下载文件，并在构建过程中使用 npm 脚本将它们放入构建文件夹。

请注意，这些文件非常大，每次构建应用程序时下载它们可能需要一些时间。

您可以下载所需的文件并将它们复制到您控制的 HTTP 服务器上，而不是将它们添加到项目中。如果您需要支持多种语言，您可以克隆整个存储库。

```
git clone https://github.com/naptha/tessdata.git
```

下载所有文件需要 4.8 GB 的磁盘空间！

每种语言都有三种不同的版本：普通、快速和最佳。最好的版本为您提供更高的 OCR 准确性，但缺点是您的应用程序必须下载更大的机器学习模型文件。对于英语语言，最佳文件大小为 12.2 MB，正常为 10.4 MB，快速为 1.89 MB。

与 Web Worker 文件一样，您需要在作为参数传递给`createWorker`.

```javascript
const worker = createWorker({
  workerPath: 'tesseract-202/worker.min.js',
  corePath: 'tesseract-202/tesseract-core.wasm.js',
  langPath: 'https://myserver/4.0.0',
  ...
});
```

该库通过组合`langPath`\+ 语言代码 + '.traineddata.gz'创建 URL

更多信息[请](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md "请")访问官方文档页面：[https](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md "https") :  
[//github.com/naptha/tesseract.js/blob/master/docs/local-installation.md](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md "//github.com/naptha/tesseract.js/blob/master/docs/local-installation.md")

