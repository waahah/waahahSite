---
title: IDEA配置自带的Maven
date: 2022-03-02 14:58:36
tags: [Java, Maven, IDEA]
categories: [Coding, Java]
---

### 如何在IDEA中配置自带的Maven

自带的`maven`会随着`IDEA`的升级而升级，可能会出现各种意料之外的问题，所以我这里建议新手还是不要用自带的Maven，因为自带的Maven会被IDEA屏蔽很多细节，导致新手对于Maven不够了解。

鼠标右键IDEA软件图标，点击打开所在文件夹，进入D:\\IntelliJ IDEA 2019.3.1\\plugins\\maven\\lib\\maven3\\conf目录，打开`settings.xml`文件并进行如下编辑。大家可以根据我的截图中的行数来配置。

1.  配置中央仓库为阿里云

```xml
     <mirror>  
      <id>alimaven</id> 
      <mirrorOf>central</mirrorOf> 
      <name>aliyun maven</name>  
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>;           
     </mirror>

```

效果：  
![](https://s2.loli.net/2023/07/07/1xrXT32OFAbGWdj.png)
设置为阿里云仓库，能加快jar包的下载速度。  
2\. 配置本地仓库

```xml
  <!--注释:配置Maven本地仓库 -->
  <localRepository>D:\Maven\respository\mvn_repo</localRepository>

```

效果：  
![](https://s2.loli.net/2023/07/07/IxJ5sl8rYenS47o.png)
**注意此处的绝对地址写法，用的是反斜杠。**

3.  绑定JDK（此处为1.8）

```xml
    <profile>
     <id>jdk-1.8</id>
     <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
     </activation>
     <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
     </properties>
    </profile>

```

效果：  
![](https://s2.loli.net/2023/07/07/fPJeRyGdnaUNQkV.png)
至此IDEA自带的Maven的settings.xml就配置完成了，接下来配置IEDA!

点击File–>选择settings按照如图配置，User settings files 选择按上面更改的那个文件就可以了。  
Local 选择上面配置的本地仓库的文件夹就可以了。  
![20200517162652512.png](https://s2.loli.net/2023/07/07/a5O6ZfEsldCFHrK.png)

