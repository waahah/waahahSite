---
title: V2ray多用户配置
date: 2023-08-11 14:58:36
tags: [VPS, V2ray]
categories: [Linux]
---

v2ray多用户配置
==========

![v2ray-430x218-19.jpeg](https://s2.loli.net/2023/07/18/FdW53yLPli6et8U.jpg)

> 如有问题，欢迎到 [网络跳越论坛](https://hijk.club/) 或 TG群组 [https://t.me/hijkclub](https://t.me/hijkclub) 交流

部分网友自行搭建好v2ray科学上网环境后，不好意思拒绝朋友的分享请求，所以想设置一个不同的端口或者id再分享。类似的需求v2ray都是支持的，配置起来也不算麻烦。本文就v2ray普通版、伪装版分别介绍v2ray多用户配置。

注意：自行更改配置文件需要用到 vi/vim/nano 等编辑器，或者把配置文件下载到本地修改，修改完再上传到服务端。下载和上传教程请参考：[Bitvise连接Linux服务器教程](https://vpsgongyi.com/p/2117/)(Windows用户)、[Mac电脑连接Linux教程](https://vpsgongyi.com/p/2219/)(Mac用户)。

普通版多用户配置
--------

[v2ray一键脚本](https://vpsgongyi.com/p/2210/) 运行完后，会输出配置文件路径，默认是 `/etc/v2ray/config.json`，其内容类似这样：

```json
{
  "log": {
    "loglevel": "info",
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [{
    "port": 12345,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "6be0aa25-09c1-4d8b-a96f-75cd3485021f",
          "level": 1,
          "alterId": 53
        }
      ]
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  },{
    "protocol": "blackhole",
    "settings": {},
    "tag": "blocked"
  }],
  "routing": {
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "blocked"
      }
    ]
  }
}
```

下文教程的修改都是参考这个文件，如果出现问题，请注意与原来文件的差异。

v2ray多用户分成两种：同端口不同id，不同端口不同id。v2ray两种类型都支持，接下来分别做介绍。

### 同端口不同id

这是最简单的配置多用户方式。方法是编辑 `/etc/v2ray/config.json` 文件，在”**clients**“一节中增加新增用户配置。例如在上面配置基础上增加一个用户：

```json
{
  "log": {
    "loglevel": "info",
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [{
    "port": 12345,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "6be0aa25-09c1-4d8b-a96f-75cd3485021f",
          "level": 1,
          "alterId": 53
        }, # 逗号不能少
        # 下面是新增的内容
        {
          "id": "2a1292fd-07be-37e7-af20-57668b4a546a",  # id可以用 /usr/bin/v2ray/v2ctl uuid生成
          "level": 1, # 这个不用改
          "alterId": 63 # 建议50-150之间的一个整数
        }
        # 新增内容结束
      ]
    }
  }],
  # 下面的内容保持不变
```

**注意：**“#”和后面的东西都不能出现在配置文件中，上面只是为了解释说明。

编辑好文件后，重启 v2ray：`systemctl restart v2ray`。如果命令失败，或者 `netstat -nltp | grep v2ray` 输出为空，说明配置文件有错误，请仔细检查，改好后再重启。

接下来就可以用新的id和alterId配置客户端，其余信息保持不变。

### 不同端口不同id

如果希望端口也不一样，请按照如下步骤做：

1\. 首先编辑 `/etc/v2ray/config.json` 文件，按照”**inbounds**“格式新增入口和用户。例如新增一个端口和用户后，配置文件变成：

```json
{
  "log": {
    "loglevel": "info",
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [{
    "port": 12345,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "6be0aa25-09c1-4d8b-a96f-75cd3485021f",
          "level": 1,
          "alterId": 53
        }
      ]
    }
  }, # 逗号不能省，原来这里是"}],"
  # 以下是新增的配置
  {
    "port": 54321, # 端口是1000-65535之间的一个整数
    "protocol": "vmess", # 也可以改成其他协议，如果你知道怎么配置的话
    "settings": {
      "clients": [
        {
          "id": "24813255-228d-b0e0-c3fa-e5d4c9defda1", # id可以用 /usr/bin/v2ray/v2ctl uuid生成
          "level": 1, # 0或1都可以
          "alterId": 57 # 建议50-150之间的一个整数
        }
      ]
    }
  }],
  # 新增内容结束
  # 下面的内容保持不变
```

**注意：**“#”和后面的东西都不能出现在配置文件中，上面只是为了解释说明。

编辑好文件后，重启 v2ray：`systemctl restart v2ray`。如果命令失败，或者 `netstat -nltp | grep v2ray` 输出为空，说明配置文件有错误，请仔细检查，改好后再重启。

2\. 设置防火墙放行新增的端口。CentOS系统命令是：

```bash
firewall-cmd --permanent --add-port=54321/tcp # 注意：54321要改成你的端口号
firewall-cmd --permanent --add-port=54321/udp # 注意：54321要改成你的端口号
firewall-cmd --reload
```

Ubuntu系统命令是：

```bash
ufw allow 54321/tcp # 注意：54321要改成你的端口
ufw allow 54321/udp # 注意：54321要改成你的端口
```

接下来用新的端口、id和alterId配置客户端，其余信息保持不变。

带伪装多用户配置
--------

**同端口不同id的配置和普通版操作方法一样**，配置好后重启v2ray就行了，这里不再重复。

接下来说说不同端口不同id的情形。伪装有了Nginx的介入，所以有多种情况，这里只介绍最简单的一种实现方式。

1\. 编辑 `/etc/v2ray/config.json` 文件，按照 [普通版同端口不同id](about:blank#single_port) 中的方法添加用户；

2\. 编辑 `/etc/nginx/conf.d/你的域名.conf` 文件，找到 “**listen 443 ssl http2;**” 这一行，在这行下面添加“listen 新的端口号 ssl http2;”一行（新的端口号要改成整数，例如8443，不能是443）。然后保存文件， `nginx -t` 检查配置有没有错误，没有错误的话重启Nginx：`systemctl restart nginx`；

3\. 设置防火墙放行端口，请参考 [普通版设置防火墙](about:blank#set_firewall) 中的命令。

接下来用新的端口、id和alterId配置客户端，其余信息保持不变。

如果你想添加多个端口或多个用户，重复上面的过程就可以了。

