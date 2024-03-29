---
title: 测试十、在AirtestIDE实现批量运行 
date: 2023-01-12 14:58:36
tags: [Python, Airtest, Poco, Test]
categories: [Coding, 测试]
---

十、企业版AirtestIDE—批量运行功能[¶](about:blank#airtestide "Permanent link")
==================================================================

注意

目前官网上仅提供社区版的AirtestIDE供大家免费使用，本文提到的 “**企业版IDE**” ，仅面向使用私有云方案的企业用户开放。

[AirtestIDE](http://airtest.netease.com/)作为一款优秀的自动化测试集成开发工具，为广大app和游戏开发者们带来了一站式自动化测试解决方案。用户借助AirtestIDE可以直连手机，快速生成、调试、运行自动化测试脚本，并一键得到测试报告。自2018年3月在GDC发布以来，开发组一直在不断的努力提升工具的能力上限，为用户提供更多场景的使用可能性。

1\. 批量测试[¶](about:blank#1 "Permanent link")
-------------------------------------------

在日常实践中，很多同学生产大量的测试用例后，在本地运行这些用例时遇到了困难。比如：现成工具无法直接使用本地设备群批量运行测试脚本；批量运行脚本后不能一键生成汇总报告等。

有些同学 **通过独立开发，实现了脱离AirtestIDE的本地批量脚本运行方法** ，不过更多同学还是希望能有更便捷、更高效的批量脚本运行解决方案。

2\. 功能介绍[¶](about:blank#2 "Permanent link")
-------------------------------------------

开发组经过精心设计，在企业版AirtestIDE（**该版本目前只面向使用私有云方案的企业用户开放**）中集成了批量运行脚本的通用解决方案，使用者可以在工具中一键启动本地的批量自动化测试，并提供了集成化的测试报告。批量运行脚本功能的针对场景主要有2个：

*   **功能回归测试**：每个脚本均只需要运行一次，保证所有脚本都得到运行；
    
*   **本地兼容性测试**：每个测试脚本都需要在所有手机上运行一次，确保所有脚本都进行兼容性测试。
    

在使用批量运行功能时，选择测试脚本所在文件夹，选定本地电脑连接的设备（或者远程设备池，详见[私有化集群方案](https://airlab.163.com/b2b)），即可在AirtestIDE功能界面中一键启动对应的批量测试： ![](https://s2.loli.net/2023/07/10/XA2Uxut5oNbqS3R.png)

在运行期间，AirtestIDE会自动进行脚本任务的运行调度，并监控单个脚本的实时运行状态。 ![](https://s2.loli.net/2023/07/10/OhFcYRQvXS8NJla.png)

在运行完毕后，可以一键打开本次批量运行的测试报告： ![](https://s2.loli.net/2023/07/10/3NdHh9ezwyQBrnD.png)

如果没有全部成功，可以重新进入批量运行界面，选择“继续运行”对失败脚本重新测试： ![](https://s2.loli.net/2023/07/10/QlLFYtAg1nTfiya.png)

3\. 实际效果[¶](about:blank#3 "Permanent link")
-------------------------------------------

下图为使用本地的10台设备资源批量运行6个自动化测试脚本的情况： ![多机批量运行视频-运行部分](https://airtest.doc.io.netease.com/img_10/5_test_situation.gif)

运行完毕后，可以一键生成测试报告： ![多机批量运行视频-报告部分](https://airtest.doc.io.netease.com/img_10/6_create_report.gif)

4\. 扩展[¶](about:blank#4 "Permanent link")
-----------------------------------------

借助企业版AirtestIDE的批量运行功能，我们可以极低成本地进行本地兼容性测试和功能测试，也可以应用在更多领域（比如批量爬虫）。开发组后续将进一步扩展基于本地设备群的使用功能，比如小规模群控显示、手动批量控制等，为日常的自动化测试带来更多的便利。
