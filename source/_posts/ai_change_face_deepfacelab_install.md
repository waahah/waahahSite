---
title: AI 换脸——Deepfacelab 安装与部署，敲详细新手教程
date: 2023-08-19 14:58:36
tags: [Python, Windows, Deepfacelab, AI]
categories: [Coding, Python]
---

### 前言

AI 换脸越来越火，换脸的视频到处都是，那种还是那种的都有。换脸软件也有好几个，而我用的 `Deepfacelab` 就是一种基于深度学习的软件，它可以把视频中的脸替换成你想要的脸。想想就很爽吧，但是这种对电脑的硬件依赖比较大，如显卡。而最近显卡价格的波动比较大，主要买不起，所以就拿游戏笔记本（GTX1060）做一个简单的样例。

AI 换脸就是采用生成式对抗网络（GAN, Generative Adversarial Networks ）的人工智能算法，第一次接触是冯·诺依曼研究的博弈论，在这里不再深入探究，大家有兴趣可以去了解。

下载
--

1.  作者GITHUB：[https://github.com/iperov/DeepFaceLab](https://github.com/iperov/DeepFaceLab "https://github.com/iperov/DeepFaceLab")

现今版本
----

![1b74f5e9276244fcb2b05bd9508a008f~tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.webp](https://s2.loli.net/2023/07/18/A1Qp7K3CyeF4xbZ.webp)

*   DirectX12、AMD：支持 DirectX12 和 A 卡
*   GTX10、20：支持 10系、20系 N卡
*   RTX30：支持 3000 系列 N卡

安装
--

1.  下载对应的版本（测试电脑为 GTX 1060 显卡）
    
    ![](https://s2.loli.net/2023/07/18/vGpq7yJ5o9WAnQR.webp)
    
2.  下载好的压缩包进行解压
    
    ![](https://s2.loli.net/2023/07/18/qAEBtfHF8PrCbRu.webp)
    

目录文件
----

1.  \==\_internal== 存放源代码相关的内容
    
2.  \==workspace== 工作目录
    
    ![](https://s2.loli.net/2023/07/18/PzJgYx4LcW1Nbsw.webp)
    
3.  \==.bat== 脚本批处理文件
    
    ![](https://s2.loli.net/2023/07/18/rSOv4DuteMzaY5U.webp)
    

AI 换脸样例
-------

> 注：视频采用自带的视频

**大概执行步骤：**

1.  源视频转成图片（源图片）
2.  目标视频转成图片（目标图片）
3.  从源图片中提取源脸部信息
4.  从目标图片中提取目标脸部信息
5.  使用脸部信息头像训练模型（Model）
6.  使用模型进行图片换脸
7.  将换完脸的图片合成视频导出

### Step1源视频转成图片

1.  【双击运行批处理文件 ==extract images from video data\_src.bat==】
    
    ![](https://s2.loli.net/2023/07/18/rWp2KUMjDF57YZv.webp)
    
    > 1.  \[0\] 一秒钟切几张图（?:help）：10
    >     *   代表一秒钟取几张。也就是每秒传输帧数（FPS【Frames Per Second】），视频的帧率，常见视频的帧率有24、30、60等，即1秒钟有几张图片。
    >     *   输入10指一秒钟提取10张图片；不输入直接回车，默认为30，即一秒钟提取30张图片
    > 2.  \[png\] 输出图片格式 ( png/jpg ?:help ) : jpg
    >     *   提取的图片格式（Format），主要格式为png、jpg。
    >     *   png 是一种采用无损压缩算法的位图格式，体积大。
    >     *   jpg 采用有损压缩的方式去除图像的冗余数据，存在着一定可接受范围内的失真。
    
2.  程序处理完成之后，在 ==workspace\\data\_src== 目录下会出现从源视频中提取出来的图片。
    
    ![](https://s2.loli.net/2023/07/18/CPq8WBOSeuF1IY5.webp)
    

### Step2：目标视频转成图片

1.  【双击运行批处理文件 ==extract images from video data\_dst FULL FPS.bat==】
    
    ![](https://s2.loli.net/2023/07/18/X8JeNF7q4i61ljM.webp)
    
    > 和Step1 步骤一样，但是目标视频（data\_dst）必须一帧不落，只设置图片格式即可
    
2.  程序处理完成之后，在 ==workspace\\data\_dst== 目录下会出现从源视频中提取出来的图片。
    
    ![](https://s2.loli.net/2023/07/18/z4uv8ByN3lgK1wx.webp)
    

### Step3：从源图片中提取源脸部信息

1.  【双击运行批处理文件 ==data\_src faceset extract.bat==】
    
    ![](https://s2.loli.net/2023/07/18/iI5D1ZkPEfJ9t2w.webp)
    
    6个参数，一般直接回车默认即可，前两步相对较快，这步需要等一等，具体速度视电脑配置。开始提取后底部会出现进度条，当进度条达到100%即提取完成 ，会显示图片数量和提取到的人脸数量。
    
    ![](https://s2.loli.net/2023/07/18/7vekrKyMmwjs1gH.webp)
    
2.  程序处理完成之后，在 ==workspace\\data\_src\\aligned== 目录下会出现从源图片中提取出来的脸部图片。
    
    ![](https://s2.loli.net/2023/07/18/5Gx97MmdlovOsRC.webp)
    

### Step4：从目标图片中提取目标脸部信息

1.  【双击运行批处理文件 ==data\_dst faceset extract.bat==】
    
    ![](https://s2.loli.net/2023/07/18/yZXY4QFMmN2BcqR.webp)
    
    和 Step4 一样，一路默认即可。开始提取后底部会出现进度条，当进度条达到100%即提取完成 。
    
2.  程序处理完成之后，在 ==workspace\\data\_dst== 目录下除了从目标视频提出出来的照片，还有个文件夹【aligned】【aligned\_debug】
    
    ![](https://s2.loli.net/2023/07/18/BF7fOT6ZegXA5MD.webp)
    
    1.  在==workspace\\data\_dst\\aligned==目录下存放的是从目标图片中提取出来的脸部图片。
        
        ![](https://s2.loli.net/2023/07/18/5tiypdH3US4VKcv.webp)
        
        提取完之后，我们需要对其进行筛选。有时一帧的图像里出现了多个人，那为了精确性，我们需要将多余的人脸或人脸比较模糊的删除掉。
        
    2.  在==workspace\\data\_dst\\aligned\_debug==目录下存放的是标有识别的图片
        
        ![](https://s2.loli.net/2023/07/18/e4SRNsOJgmkKpZD.webp)
        
        ![](https://s2.loli.net/2023/07/18/mM7zyx5qk2BR1Ag.webp)
        
        *   红色表示头像截取的区域
        *   蓝色表示面部区域
        *   绿色则是人脸的五官轮廓（主要特征）

### Step5：使用脸部信息头像训练模型（Model）

1.  【双击运行批处理文件 ==train Quick96.bat==】
    
    ![](https://s2.loli.net/2023/07/18/LlzIk4ymWcBuqXp.webp)
    
    输入模型名字，选择设备，一般选择显卡。选择完成之后，程序会自动初始化模型、加载样本，并显示模型参数。
    
    等待启动，启动之后，会自动弹出预览窗口和在命令行显示如下参数
    
    ![](https://s2.loli.net/2023/07/18/kWmBUuOXKrLMG69.webp)
    
    只需要重点关注迭代次数、SRC损失和DST损失
    
    *   迭代次数越多越好
    *   SRC、DST损失越低越好
    
    预览窗口包含操作提示、损失曲线、人脸区域。
    
    人脸区域分为五列。【源脸 | 算法生成 | 目标脸 | 算法生成 | 算法生成 | 算法生成】
    
    ![](https://s2.loli.net/2023/07/18/wDo4dNlxL6HahrV.webp)
    
    随着训练迭代的次数增多，算法会慢慢生成出人脸轮廓、五官，然后慢慢变的清晰。
    
2.  在预览窗口，我们可以用键盘（切换英文输入法）进行操作： P 进行刷新， Enter 进行停止，S 保存。
    
    ![](https://s2.loli.net/2023/07/18/xuBlHE6zW1y2Sc4.webp)
    
    我们只需要观察第二列是否与第一列无限相似，第四列与第三列无限相似，第五列的表情与第四列无限相似。
    
    当所有列的图片足够清晰，那么就可以停止。
    

### Step6：使用模型进行图片换脸

1.  【双击运行批处理文件 ==merge Quick96.bat==】
    
    ![](https://s2.loli.net/2023/07/18/cltDnTM3fSPBm24.webp)
    
    选择模型、设备，启动交互式合成、CPU线程数量（一般小于等于8）之后，回车即可。
    
    稍等一会儿，弹出帮助界面。
    
    ![](https://s2.loli.net/2023/07/18/Re6XFbwG8pc4tyH.webp)
    
    帮助界面显示了我们可以进行操作的快捷键和作用。
    
2.  按 Tab 键，弹出合成预览界面
    
    ![](https://s2.loli.net/2023/07/18/bAzYBD6N2EdLupG.webp)
    
3.  通过快捷键进行调节
    
    ![](https://s2.loli.net/2023/07/18/BiyL5pZqD1JMYUS.webp)
    
    *   按 E 键增大羽化程度，按 D 键减小羽化程度
        
    *   《 键切换上一帧，》键切换下一帧
        
    *   调节完成之后，按 shift+？将参数应用到所有帧
        
    *   按 shift+> 开始自动合成
    
4.  等待合成进度到达100%，即合成完成，手动关闭窗口即可
    
    ![](https://s2.loli.net/2023/07/18/uR7GTnQrtYS4zjB.webp)
    
5.  在==workspace\\data\_dst==目录下出现了两个文件夹【merged | merged\_mask】
    
    ![](https://s2.loli.net/2023/07/18/8JaT6YOSl5pHjkB.webp)
    
    在merged 目录下保存的是已经换完脸的图片
    
    ![](https://s2.loli.net/2023/07/18/V3gEYnmXApyojdL.webp)
    
    ![](https://s2.loli.net/2023/07/18/E7fe3vOZSQkY5lC.webp)
    

### Step7：将换完脸的图片合成视频导出

1.  【双击运行批处理文件 ==merged to mp4.bat==】
    
    ![](https://s2.loli.net/2023/07/18/jfKoJ2YczVxwu5d.webp)
    
    软件会自动读取源视频的配置信息，如帧率、音轨，我们只需要设置一下输出码率即可，码率一般设置为3即可。
    
2.  等待合成完成
    
    ![](https://s2.loli.net/2023/07/18/HAvMz4PyuD8cGaq.webp)
    
3.  在==workspace==目录下出现最终合成的视频（result.mp4），（result\_mask.mp4 是遮罩视频，供后期使用）
    
    ![](https://s2.loli.net/2023/07/18/GWLF7dXQjKeiaTk.webp)
    
4.  对比视频
    
    ![](https://s2.loli.net/2023/07/18/afj7eWwPBJvT5gM.webp)
    

* * *

**技术本身没有好坏，关键在于如何使用！！！**

