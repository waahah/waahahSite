---
title: 限定项目的 Node.js 版本
date: 2023-07-10 14:58:36
tags: [Version, Vercel, Nodejs]
categories: [Coding, Nodejs]
---

### 前言

限定项目运行所需的 Node.js 版本可保证项目在一个稳定可预期的环境中运行，减少不必要的故障。甚至有些依赖库只能工作于某些版本下。同时，不加以限制的话，在多人合作的项目中恐怕会引起环境不一致带来的兼容性问题，部署上也会存在相同的问题。

为项目指定 Node.js 的版本可通过版本管理器，或者通过 package.json 中添加相应属性来实现。

### nvm

管理 Node.js 的版本最好可通过相应的版本管理器来完成，比如 nvm。用法在 nvm --help 中描述得很详尽。

通过在项目根目录创建一个 .nvmrc，其中写上需要的 Node.js 版本号。这个版本号不一定是数字，可以是 nvm 能够理解的其他别称，详见 nvm --help 中对 <version> 的描述。

<blockquote>
<p>Note: &lt;version&gt; refers to any version-like string nvm understands. This includes:</p>
<ul>
<li>full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)</li>
<li>default (built-in) aliases: node, stable, unstable, iojs, system</li>
<li>custom aliases you define with <code>nvm alias foo</code></li>
</ul>
<p class="emphasis_block">-- <em>nvm 帮助信息中对  版本号的描述</em></p>
</blockquote>

示例：

```shell
# 将当前版本写入
$ node -v > .nvmrc
# 使用 5.9 的版本
$ echo "5.9" > .nvmrc


# 使用最新的 LTS （Long-term Support） 版本
$ echo "lts/*" > .nvmrc


# 使用最新的 Node.js 版本
$ echo "node" > .nvmrc
```
在执行如下这些命令时，会自动读取 `.nvmrc` 中版本号以应用上，

- `nvm use`
- `nvm install`
- `nvm exec`
- `nvm run`
- `nvm which`

这样协作者将项目 `clone` 下来后直接 `nvm use` 就直接切换到相应版本，如果本地没有安装，`nvm install 则会安装相应版本。

### engines

根据 [npm-package](https://docs.npmjs.com/files/package.json#engines) 文档的描述，可以在 `package.json` 中通过 `engines` 属性指定 Node.js 的版本。

```json
{
    "engines": { "node": ">=0.10.3 <0.12" }
}
```

甚至可以限定 npm 的版本：

```json
{
    "engines": { "npm": "~1.0.20" }
}
```

有趣的是，在执行 `npm install` 安装项目依赖时，这个设置并不生效，相反，非官方的 yarn 是有效（respect）的，它会检查这里的设置，如果当前环境与所需不匹配，直接报错，这是我们期望的结果：

![55612524-fe178a80-57ba-11e9-9193-a76d17719003.png](https://s2.loli.net/2023/07/15/o2XzDNKx1lHRJAF.png)

所以推荐使用 yarn。

如果使用的 npm 怎么办呢。只能手动写脚本来做这个事情了。

```bash
$ npm i -D semver
$ touch checkver.js
```

实现我们检查版本的逻辑：

_checkver.js_

```js
const semver = require("semver");
const { engines } = require("./package");
const version = engines.node;
if (!semver.satisfies(process.version, version)) {
console.error(</span>Required node version <span class="pl-s1"><span class="pl-pse">${</span>version<span class="pl-pse">}</span></span>, got: <span class="pl-s1"><span class="pl-pse">${</span><span class="pl-c1">process</span>.<span class="pl-c1">version</span><span class="pl-pse">}</span></span>.<span class="pl-pds">);
process.exit(1);
}
```

添加 `postinstall` 命令到 package.json:

```json
{
  "scripts": {
    "postinstall": "node ./checkver.js"
  }
}
```

为什么使用 `postinstall` 呢，如果使用 `preinstall` 岂不是更好，这样在执行安装前就能检查。但这里我们依赖了 `semver` 这个 `npm` 包，所以需要让安装先执行。

### 相关资源
- [creationix/nvm](https://github.com/creationix/nvm#toc16)
- [How to Lock down Your Project’s Node Version Using .Nvmrc Or engines.](https://medium.com/@faith__ngetich/locking-down-a-project-to-a-specific-node-version-using-nvmrc-and-or-engines-e5fd19144245)
- [npm-package.json](https://docs.npmjs.com/files/package.json#engines)