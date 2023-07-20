---
title: Git命令替换项目最新的main分支
date: 2023-07-06 14:58:36
tags: [Git, main, Github]
categories: [Git]
---

### 前言

git命令替换项目最新的main分支

切换新的main分支的代码: 创建一个xx分支，切换到xx分支上，删掉原来的main，拉取最新的main，切换分支到main分支后，删除xx分支，就完成了。  
1. 创建叫xx的新分支  
```bash
git branch -m xx  
```
2. 基于已有分支重新创建一个新的分支  
```bash
git branch -b + 分支名称  
```
3. 切换新的分支 
```bash
git checkout xx- 
```
4. 将最后一笔commit提交变成未add的模式  
```bash
git reset head^  
```
5. 删除原来的main分支  
```bash
git branch -D main  
```
6. 切换main分支进行更新  
```bash
git checkout main  
git pull  
```
7. 删除创建的xx分支  
```bash
git branch -D xx 
```
8. 查看当前的分支  
```bash
git branch  
```
9. 更新flutter依赖  
```bash
flutter pub upgrade  
```
10. 运行flutter项目  
```bash
flutter run -v
```


