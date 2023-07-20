---
title:＜artifactId＞spring-boot-maven-plugin＜/artifactId＞报错问题
date: 2022-03-04 14:58:36
tags: [Java, Maven, springboot]
categories: [Coding, Java]
---

### 前言
`＜artifactId＞spring-boot-maven-plugin＜/artifactId＞`报错问题

我用的软件是IDEA，在pom.xml文件中，遇到<artifactId>spring-boot-maven-plugin</artifactId>这一行一直是红色，提示没有找到

`maven`中其他包没有问题，只有这个有问题

```xml
       <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
```

加上版本号就ok了

```xml
<version>2.2.1.RELEASE</version>
```
```xml
       <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.2.1.RELEASE</version>
            </plugin>
        </plugins>
```
