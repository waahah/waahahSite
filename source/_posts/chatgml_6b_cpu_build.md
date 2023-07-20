---
title: ChatGLM-6B本地cpu部署
date: 2023-07-25 14:58:36
tags: [Python, ChatGLM, CPU]
categories: [Windows]
---

### 前言

    ChatGLM-6B是清华团队研发的机器人对话系统，类似ChatGPT，但是实际相差很多，可以当作一个简单的ChatGPT。
    
    ChatGLM部署默认是支持GPU加速，内存需要32G以上。普通的机器无法运行。但是可以部署本地cpu版本。
    
    本地部署，需要的环境：

*        python3.9及以上
*        gcc 

    这个框架本身就是python编写的，所以需要python环境。另外，运行的时候，需要加载cpu内核，所以需要编译本地内核，gcc环境就是用来编译quantization\_kernels.c和quantization\_kernels\_parallel.c文件的。

     gcc环境在windows上，可以通过mingw来安装，也可以通过[tdm-gcc](https://objects.githubusercontent.com/github-production-release-asset-2e65be/239225998/a6fe1680-bd82-11eb-9006-36655c09626a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230508T132239Z&X-Amz-Expires=300&X-Amz-Signature=89f1b1981814b64ba6b1a7ffedf07ce421b54f505a2ad986e884e11764b64261&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=239225998&response-content-disposition=attachment%3B%20filename%3Dtdm64-gcc-10.3.0-2.exe&response-content-type=application%2Foctet-stream "tdm-gcc")来安装。

    我本地的相关环境：

![56ce9f780b014af99ba862443438e0c7.png](https://s2.loli.net/2023/07/17/ka8HNJl6ZxeIMPw.png)

    1、克隆源码

```bash
git clone https://github.com/THUDM/ChatGLM-6B
```

    2、安装依赖

```shell
cd ChatGLM-6B
pip install -r requirements.txt
```

    3、改变源码web\_demo.py支持cpu
    
    默认代码：

![a08b150f47454dba82acf6b70307612f.png](https://s2.loli.net/2023/07/17/Dn4sApyXrLEPaOG.png)

    修改支持cpu:

```python
tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm-6b-int4", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/chatglm-6b-int4", trust_remote_code=True).float()
model = model.eval()
```

    模型的名字由THUDM/chatglm-6b改为THUDM/chatglm-6b-int4 
    
    gpu模型源码中.half().cuda()替换为.float() 
    
    4、运行python web\_demo.py

```
python web_demo.py
```

    模型第一次加载会去[https://huggingface.co/THUDM/chatglm-6b-int4](https://huggingface.co/THUDM/chatglm-6b-int4 "https://huggingface.co/THUDM/chatglm-6b-int4")下载pytorch\_model.bin模型文件。
    
     还会使用安装的gcc编译quantization\_kernels.c和quantization\_kernels\_parallel.c文件，生成动态库quantization\_kernels.so和quantization\_kernels\_parallel.so。
    
     5、运行成功，会打开浏览器，并直接显示对话框，可以输入问题，不过这个回答很慢：

![d56a83962dbc4d2dbf794593c63b9fae.png](https://s2.loli.net/2023/07/17/h2GOARH3qNuxvom.png)

    提出问题，并不是秒回，很慢，感觉还是内存的问题，我的机器16G内存，效果好像也不是很好。 

   /

   几个抽风的问题：

    1、我昨天在电脑上运行好好的，结果今天来测试，直接运行python web\_demo.py就报了这样的错误：504 Server Error: Gateway Time-out for url: https://huggingface.co/api/models/THUDM/chatglm-6b
    
     这个错误有点蛋疼，貌似是去下载模型文件，但是远程地址不知道为什么就504了，好在这些模型可以通过加载本地缓存的模型，解决办法就是手动下载这些模型文件到一个指定目录。 
    
    [https://huggingface.co/THUDM/chatglm-6b-int4/tree/main](https://huggingface.co/THUDM/chatglm-6b-int4/tree/main "https://huggingface.co/THUDM/chatglm-6b-int4/tree/main") ，把这里的文件，包括json文件全部下载到项目路径下的models目录中：

![de89f5e413544a5bae2201d09456c8d7.png](https://s2.loli.net/2023/07/17/Jtv8IxA6UjS93lm.png)

    改动web\_demo.py文件内容：

```python
tokenizer = AutoTokenizer.from_pretrained("./models", trust_remote_code=True)
model = AutoModel.from_pretrained("./models", trust_remote_code=True).float()
model = model.eval()
```

  2、找不到模块transformers\_modules，如下所示：

![4a92f78ca1ca45d7bb7803a085ad48e2.png](https://s2.loli.net/2023/07/17/hKTGgIZuiPfEObC.png)

    我昨天运行好好的，也就是说这个模块肯定是有的，不知道今天抽什么风，竟然没有，解决办法就是把当前transformers=4.27.1版本降级到4.26.1：

![f68c39e733d04e609cb6a17247590c94.png](https://s2.loli.net/2023/07/17/zTURCvjcZeJqsYu.png)

    最后再来感受一下chatglm对话： 
![13c39bdbf2d34318b79b486c1907a828.png](https://s2.loli.net/2023/07/17/kzNb8tnmLEI6QX3.png)
    
    这个结果全部显示完，用了差不多10分钟，哈哈，挤牙膏似的。 
    
    完。 

