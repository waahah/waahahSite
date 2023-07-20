---
title: Maven安装教程详解
date: 2022-02-28 14:58:36
tags: [Java, Maven, Web]
categories: [Coding, Java]
---

**一、准备工作**

```powershell
           1、确定电脑上已经成功安装jdk7.0以上版本

           2、win10操作系统

           3、maven安装包            下载地址：http://maven.apache.org/download.cgi
```

**二、解压Maven安装包**

```powershell
            在上述地址中下载最新的Maven版本，解压到指定目录（此处根据自己的需要），本人解压到了D:\\install\\maven\\apache-maven-3.5.0目录下，里面有bin、lib  
             
            conf等文件夹。
```

**三、配置Maven环境变量**

```cmd
          在我的电脑-------属性-------高级系统设置---------环境变量---------系统变量--------新建

            变量名：M2\_HOME

            变量值：D:\\install\\maven\\apache-maven-3.5.0

      找到Path在环境变量值尾部加入：;%M2\_HOME%\\bin;  //前面注意分号
```

****四、检查`jdk`和`maven`的环境变量是否配置成功****

      打开dos窗口运行命令mvn -v,出现如下图所示的信息说明安装成功；

![](https://s2.loli.net/2023/07/07/QNKISxkmcHnF5PX.png)

**五、修改本地仓库位置（如果不想修改本地仓库位置则这一步骤省略即可）**

```powershell
  Maven会将下载的类库（jar包）放置到本地的一个目录下（一般默认情况下maven在本机的仓库位于C:\\我的文档中\\.m2.\\repository），如果想重新定义这个目录的位置就需要修改Maven本地仓库的配置：

         1、在自己喜欢的位置创建文件夹，此处本人创建的位置是（F:\\Maven\\repo）

         2、在安装Maven的目录下找到conf文件夹，在文件夹中找到settings.xml文件，复制settings.xml文件放于F:\\Maven，如下图所示：
```


![](https://s2.loli.net/2023/07/07/SzKXnJ9CYpF5hR3.png)

             3、修改settings.xml文件，如下图所示：


![](https://s2.loli.net/2023/07/07/rJYDvQxgahlOfcp.png)

```powershell
         4、在安装Maven的目录下找到conf文件夹，在文件夹中找到settings.xml文件，更改默认的仓库位置如下图所示：（注意两个地方的settings.xml都要修改）
```


![](https://s2.loli.net/2023/07/07/rJYDvQxgahlOfcp.png)

```powershell
依据该配置，Maven就会将下载的类库保存到F:/Maven/repo中。

5、实验一下我们刚才做的事情产生作用没有，控制台输入：mvn help:system
```

![](https://s2.loli.net/2023/07/07/mkE9LaXC7GzSuMl.png)

```powershell
 执行完该命令之后，在F:/Maven/repo下面会出现很多文件，这些文件就maven从中央仓库下载到本地仓库的文件。
```

---

参考资料:
- <http://www.cnblogs.com/leefreeman/archive/2013/03/05/2944519.html>
