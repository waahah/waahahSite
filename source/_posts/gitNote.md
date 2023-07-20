---
title: Git简单使用
date: 2022-09-21 02:58:36
tags: [Git, Github]
categories: [Git]
---

## 前言
<div data-note-content>

<p>简单记录下Git的使用。整个过程是在windows下操作的。

## Git将本地项目push到Github

### 1.Git下载地址</strong>
<br>Git官网是需要翻墙才能高速下载的，这里给出Git-2.9.2-64-bit下载地址(我的是64位系统)： <a href="http://download.csdn.net/download/gaoshangwin/9578050" target="_blank">Git-2.9.2-64-bit</a>
<p>下载后安装步骤可以参考这里：<a href="http://blog.csdn.net/wudalang_gd/article/details/53860563" target="_blank">Windows下Git的安装</a></p>

### 2. 创建ssh key–安全传输
<p></p>
<li>
<em>方法1. 使用git gui 直接生成</em>
<pre>打开git gui<br>help  – show ssh key</pre>

<p></p>
</li>
<br/>
<li>
<em>方法2. 使用git bash/git cmd 创建(git bash 为例 )</em>
<blockquote><p>设置git的user.name和user.email</p></blockquote>
<pre>$ git config --global user.name "waahah"<br>$ git config --global user.email "your email"</pre>

<br/>
<blockquote><p>查看是否已经存在ssh key是否存在</p></blockquote>
<pre>$ cd ~/.ssh</pre>

<br><pre><strong>如果没有则提示： No such file or directory<br>如果有则进入~.ssh路径下（ls查看当前路径文件，rm * 删除所有文件）生成新的ssh key</strong></pre>

<br/>
<blockquote><p>生成ssh key</p></blockquote>
<pre>cd ~ //保持在"~"目录下<br>$ ssh-keygen -t rsa -C "xxxxxx@qq.com"//填写真实的邮箱</pre>

<pre>Generating public/private rsa key pair.<br>Enter file in which to save the key (/c/Users/xxxx/.ssh/id_rsa): #不填直接回车<br>Enter passphrase (empty for no passphrase): #输入密码（可以为空）<br>Enter same passphrase again: #再次确认密码（可以为空）<br>Your identification has been saved in /c/Users/xxxx/.ssh/id_rsa. #生成的密钥<br>Your public key has been saved in /c/Users/xxxx/.ssh/id_rsa.pub. #生成的公钥</pre>

<br/>
<blockquote><p>添加ssh key到Github</p></blockquote>
<pre>1.打开github→Settings→SSH kyes→Add SSH key<br>2.进入c:/Users/xxxx/.ssh/目录下，打开id_rsa.pub文件，全选复制公钥内容<br>3.Title自定义，将公钥粘贴到GitHub中Add an SSH key的key输入框，最后”Add Key”</pre>
<br/>
<blockquote><p>测试ssh key是否设置成功</p></blockquote>
<pre>$ ssh -T git@github.com</pre>
<br><pre>The authenticity of host 'github.com (192.30.253.113)' can't be established.<br>RSA key fingerprint is 16:27:xx:xx:xx:xx:xx:4d:eb:df:a6:48.<br>Are you sure you want to continue connecting (yes/no)? yes #确认你是否继续联系，输入yes<br>Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.<br>Enter passphrase for key '/c/Users/xxxx/.ssh/id_rsa':  #生成ssh kye是密码为空则无此项，若设置有密码则有此项且，输入生成ssh key时设置的密码即可。<br>Hi xxx! You've successfully authenticated, but GitHub does not provide shell access. #出现词句话，说明设置成功。</pre>


### 3.将本地项目push到Github(Git cmd为例)</strong></p>
</br>
<blockquote><p>打开git cmd 将路径设置到项目路径</p></blockquote>
</br>

> 初始化项目<br><pre>git init</pre>

<br/>

> 添加远程仓库<br><pre>git remote add origin "你自己仓库的地址"</pre>

<br/>

> push本地项目到远程仓库<br><pre>git add . //添加所有本地代码到缓冲区<br>git commit -m "first commit"//描述信息<br>git push -u origin master//origin也可以自己命名远程仓库名称</pre>

<br/><strong><em>ps:我试了两次没有push成功，可能是网速的原因，第三次push成功，大家要有耐心哦</em></strong>
<p></p>
<blockquote><p>在Github查看自己的项目是否传上去 </p></blockquote>