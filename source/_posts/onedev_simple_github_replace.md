---
title: OneDev - 简单易用的GitLab替代品
date: 2023-05-10 14:58:36
tags: [OneDev, Git, Gitlab]
categories: [Git]
---

### 前言 

`OneDev`是一个开源的一体化的`DevOps`平台，目前项目在GitHub上有3K星：<https://github.com/theonedev/onedev>。

做这个项目的初衷其实是想解决Build，Issue和Code之间的信息割裂问题的。比如说在一个测试版本发布后，这个版本里包含那些需要测试的Issue，或者某个`Issue`最早在那个版本里被解决，又或者比较任意两个发行版本，得到所有源代码的改动等等。要方便的整合这些信息，使用一体化的平台很有必要。当初也研究了`GitLab`，但是觉得这家公司太过于利润导向，特别热衷于加新功能，而对已经存在的呼声很高的问题却经常视而不见，比如说代码的多行注释一直不支持，`.gitlab-ci.yml`难以维护，`runner`经常莫名其妙失败等。而GitHub企业版又太贵，消费不起。况且它们在Build，Issue和Code的整合方面也不像想象中那么顺畅。

因为一直做`Git`相关的开发工作，觉得做个简化版的GitHub/GitLab的Copy Cat应该不是很难，而且公司内部使用，大家低头不见抬头见，不需要那些骚气的社交功能如邀请，关注之类的，而是把精力放在直接提高生产力的功能上，比如代码智能导航，Build定义的图形界面和智能提示，Pull Request增量审查，对`Docker`和`Kubernetes`原生支持等等。随着用户的持续反馈和迭代，OneDev目前已经相当成熟和稳定，可以在很大程度上取代`GitLab`，而且安装维护简单，资源占用少，性能出色。具体文档参见项目主页。

好了，说了这么多废话，还是看看我们做了哪些特色功能吧。

* * *

**原生支持Docker和Kubernetes**
