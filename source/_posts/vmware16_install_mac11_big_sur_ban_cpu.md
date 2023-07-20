---
title: VMware16安装Mac11.1Big Sur遇到“客户机操作系统已禁用 CPU。请关闭或重置虚拟机
date: 2022-06-01 14:58:36
tags: [VMware, macOS, Unlocker]
categories: [IDE, VMware]
---

### 前言 

VMware16安装Mac11.1Big Sur遇到“客户机操作系统已禁用 CPU。请关闭或重置虚拟机。解决方案

> AMD安装Mac虚拟机可谓是困难重重，本文结合了许多种解决方案，因此我称之为究极融合怪，如有性能或功能问题，请在评论区中指出。以下是参考文章的链接:  
> 1.[在 VMware 上安装 macOS 11 Big Sur Beta](https://www.bilibili.com/read/cv7038972)  
> 2.[How to Fix The CPU has been disabled by the guest OS](https://www.geekrar.com/how-to-fix-the-cpu-has-been-disabled-by-the-guest-os/)

解决方案：
------------------------------------------------------------------------

**1\. 在虚拟机的目录中找到.vmx后缀的文件，我的虚拟机命名为"mac 11"，因此该文件名为mac 11.vmx，右键编辑。**  
![](https://s2.loli.net/2023/07/08/uNMxAHJEjFQqrtG.png)

**2\. 在该文件末尾追加下列语句。**

```ini
smc.version = "0"
cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"
cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"
cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"
cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"
cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"
cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"
cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"
cpuid.1.edx = "0000:0111:1000:1011:1111:1011:1111:1111"
featureCompat.enable = "TRUE"

```

**3\. 启动虚拟机，报错解除。**

* * *

解释说明：
------------------------------------------------------------------------

虽然与很多解决方案一样，加的都是这几行，但是这里是有更改的。其中，featureCompat.enable从"FALSE"改成了"TRUE"，cpuid.1.edx也做了更改。这些更改参考自**参考链接2**的这一段。

![](https://s2.loli.net/2023/07/08/iOIS4tQNbGzk3KM.png)
翻译成中文则是:  
![](https://s2.loli.net/2023/07/08/vUicLHCPd4qSeJR.png)


