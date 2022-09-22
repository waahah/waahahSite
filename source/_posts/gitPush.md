---
title: push本地代码到Github出错
date: 2022-09-21 03:49:28
tags: [Git, Github]
categories: [Git, Github]

---


![](https://s2.loli.net/2022/09/22/xSaAzl2WKsdvFfQ.png)
### 前言
**有时候往GitHub上提交东西的时候会因为remote repository上有东西更新了但是local repository 没有更新而造成提交失败**


有如下几种解决方法：

#### 1. 使用强制push的方法：

```
$ git push -u origin master -f 
```

> 这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

</br>

#### 2. push前先将远程repository修改pull下来

```
$ git pull origin master
```
<p></p>
```
$ git push -u origin master
```

<br/>

#### 3. 若不想merge远程和本地修改，可以先创建新的分支：

```
$ git branch [name]
```

然后push

```
$ git push -u origin [name]
```
<p></p>

### 更多

> 关于Git的更多用法，请看[这里](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
