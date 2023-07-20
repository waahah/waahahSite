---
title: PowerShell中调用 curl 的正确方法 
date: 2022-11-12 14:58:36
tags: [Curl, PowerShell]
categories: [Coding, Curl]
---

powershell中调用 curl 的正确方法
========================
    
    学习node.js高级编程一书时，需要用到curl
    
    下载curl并添加到环境变量后，在ps(powershell)中调用curl并输入参数时，始终 提示不对
    
    使用get-help 查询，结果如下：
    
    ```cmd
    PS C:Userssx00x> Get-Help curl
    
    名称
        Invoke\-WebRequest
    
    语法
        Invoke\-WebRequest \[-Uri\] <uri>  \[<CommonParameters>\]
    
    
    别名
        iwr
        wget
        curl
```

原来，curl为 ps 原生命令 Invoke-WebRequest的别名。
    
想要 调用 curl，应在ps中输入：curl.exe及参数，问题解决
    
```bash
    PS C:Userssx00x> curl.exe -X POST --data-urlencode a=b --data-urlencode c=d http://localhost:8080
```

