---
title: john破解zip密码
date: 2022-11-9 18:59:28
tags: [zip, zip2john]
categories: [Windows]

---

### 前言
**zip2john爆破zip文件**

> John the Ripper 目前可用于 Unix、macOS、Windows、DOS、BeOS和 OpenVMS 的许多发行版。它的主要目的是检测弱密码。除了在各种 Unix 风格中最常见的几种 crypt(3) 密码散列类型外，还支持 Kerberos/AFS 和 Windows LM 散列。

#### 1. 解压john-1.9.0-jumbo-1-win64.rar到一个路径：

```shell
$ D:\Temp\test
```

</br>

#### 2. 打开powershell进入解压后的run文件夹

```sh
$ cd D:\Temp\test\john-1.9.0-jumbo-1-win64\run
```
<br/>

#### 3. 在powershell中输入以下命令以输出 zip 文件 hash，并按回车：

```sh
$ .\zip2john.exe 要解压zip文件的路径 >> 保存生成hash值的路径

例：.\zip2john.exe D:\Temp\test\edgedriver_win642.zip >> D:\Temp\test\password.txt
```

![](https://s2.loli.net/2022/11/09/VKuGNdgnq49zr5A.jpg)



#### 4.将生成password.txt另存为UTF-8格式

![](https://s2.loli.net/2022/11/09/XAl5FdfxjpbcQTo.jpg)



#### 5.在powershell中输入命令以进行 zip 文件爆破：

```sh
$ .\john D:\Temp\test\password2.txt
```

![](https://s2.loli.net/2022/11/09/JX8FldwES5gpLHs.jpg)



#### 6.查看爆破的密码  

```sh
$ .\john D:\Temp\test\password2.txt --show
```

![](https://s2.loli.net/2022/11/09/PyRcxMqJiY82HBm.jpg)

<p></p>

#### 更多

- 下载地址：[https://download.openwall.net/pub/projects/john/contrib/windows/](https://download.openwall.net/pub/projects/john/contrib/windows/)
