---
title: JEB动态调试Smali-真机/模拟器
date: 2023-07-15 14:58:36
tags: [Android, Smali, JEB]
categories: [Coding, Python]
---

### 一、环境
1. 自行安装`adb`或者`SDK`（其实也用的里面的adb功能，SDK太大了，所以建议非安卓开发用户只安装adb就行了），adb安装教程网上很多，考验自己的自学能力！主要用adb将PC与真机/模拟器连接起来进行调试！
2. 自行安装配置`JAVA`环境

### 二、工具
1. 真机：一般安卓机即可（不关心`root`与否），这里我使用的是Redmi K40（Android 11）
2. 数据线1条
3. Win7及以上 PC机

### 三、软件
1. PC版模拟器：任意厂家安卓模拟器（这里我使用的是MuMu模拟器）
2. 安卓版模拟器：`VMOS`（会员版）
3. PC版安卓修改器：AndroidKiller_v1.3.1（这个主要用来修改软件AndroidManifest.xml里可调试权限android:debuggable="true"），下载地址
4. MT管理器（实现同第3条修改，但是需要会员）
5. NP管理器（无需会员实现第3条修改）
6. 主角：JEB   版本：jeb-demo-4.2.0
7. 待分析APP--debug.apk：<https://wwi.lanzoup.com/iGJzi012bscf>

### 四、JEB安装及激活
1. 下载地址：https://pan.baidu.com/s/168RjxkVL655ydz0Fwt2Kvw?pwd=vbup
2. 解压压缩包，再解压`jeb.zip`后，将`fix文件夹`下的`jeb.jar`复制并替换到jeb\bin\app文件夹下。

![121114dvg6h267bw1z617k.png](https://s2.loli.net/2023/07/15/xN4GDAvpX3OrZlH.png)

3. 激活：移动好后双击jeb/jeb_wincon.bat打开jeb，此时会弹出激活注册界面，选择Manual Key Genaration，复制许可证数据。如果双击jeb_wincon.bat不能打开jeb，需要检查一下自己java环境是否配置好！

![121713oee79x1y61xymemr.jpg](https://s2.loli.net/2023/07/15/XfsNo6MyKUB8bPG.jpg)

![122036cgr51dlze0zewmzp.jpg](https://s2.loli.net/2023/07/15/2dTxZ4qrHJBi5XI.jpg)

**得到许可证数据后，复制下面Python代码到python编译器里，推荐到<https://tool.lu/coderunner/>  这个在线代码网站上运行，代码格式选择Python，把许可证数据粘贴到**

```python
licdata = ""
```

**的引号里，运行后即可得到KEY值。输入到上图的许可证密匙后即可激活JEB**

```python
#[url=https://bbs.pediy.com/]https://bbs.pediy.com/[/url]
#!/usr/bin/env python
import os, sys, struct, time, binascii, hashlib
 
RC4_Key2= 'Eg\xa2\x99_\x83\xf1\x10'
 
def rc4(Key, inData):
    Buf = ""
    S = range(256)
    K = (map(lambda x:ord(x), Key) * (256 / len(Key) + 1))[:256]
    j = 0
    for i in range(256):
        j = (S[i] + K[i] + j) % 256
        S[i], S[j] = S[j], S[i]
    i, j = 0, 0
    for x in range(len(inData)):
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        Buf += chr(S[(S[j] + S[i]) % 256] ^ ord(inData[x]))
    return Buf
 
def Long2Int(longdata):
    lo = longdata & 0xFFFFFFFF
    hi = (longdata >> 32) & 0x7FFFFFFF
    return hi, lo
 
def KeygenSN(LicenseSerial, MachineID):
    mhi, mlo = Long2Int(MachineID)
    lhi, llo = Long2Int(LicenseSerial)
    hi_Key = (mhi - lhi + 0x55667788) & 0x7FFFFFFF
    lo_Key = (mlo + llo + 0x11223344) & 0xFFFFFFFF
    Z0, = struct.unpack('<Q', struct.pack('<LL', lo_Key, hi_Key))
    Z1 = int(time.time()) ^ 0x56739ACD
    s = sum(map(lambda x:int(x, 16), "%x" % Z1)) % 10
    return "%dZ%d%d" % (Z0, Z1, s)
 
def ParsePost(buf):
    Info = struct.unpack('<3L2Q4LQ3L', buf[:0x40])
    flag, CRC, UserSerial, LicenseSerial, MachineID, build_type, \
          Ver_Major, Ver_Minor, Ver_Buildid, Ver_Timestamp, \
          TimeOffset, Kclass, Random2 = Info
    SysInfoData = buf[0x40:]
    assert CRC == binascii.crc32(buf[8:]) & 0xFFFFFFFF
    return Info, SysInfoData
 
def DecodeRc4Str(buf):
    buf = buf.decode('hex')
    i, s = ParsePost(rc4(buf[:8] + RC4_Key2, buf[8:]))
    return i, s
 
def GetJebLicenseKey():
    licdata = ""
    if licdata:
        i, MachineID = DecodeRc4Str(licdata)
        SN = KeygenSN(i[3], i[4])
        print "JEB License Key:", SN
        return SN
 
GetJebLicenseKey()
raw_input("Enter to Exit...")
```

![122915jy6emh2mll2lclx3.png](https://s2.loli.net/2023/07/15/dsRTaMx5nqkNteg.png)

4. 设置中文：在菜单栏里Edit->Language->中文（中文），关闭软件重新打开即可为中文界面。

### 五、导入调试APP
1. 在导入前，用第三步中的安卓修改器，修改一下`AndroidManifest.xml`里可调试权限`android:debuggable="true"`

![124226wcc4c33pnfn66o4k.jpg](https://s2.loli.net/2023/07/15/KbgR4JQDMSsNqcG.jpg)

**编译后签名APP，把APP导入到JEB中，直接默认配置，点确定**

![124434nr98yeoszssr3u9g.png](https://s2.loli.net/2023/07/15/OQ1oTC58mZyhrDe.png)

**当出现这个弹框时，选择“是”**

![124631wjudza3x2rxkzxur.png](https://s2.loli.net/2023/07/15/ISQZ8qKPhuTifjH.png)

**然后JEB就加载好了APP，主要用到了下面圈出来的一些功能！**

![125045qltt6r0h7rb7hwbg.png](https://s2.loli.net/2023/07/15/fSgBbJqN6zUtQPK.png)

### 实用技巧

![180311ghi5hn4pihopip5b.jpg](https://s2.loli.net/2023/07/15/VPeTc3EOkudZrIh.jpg)

![135742h6sfjxfzlpcxpexx.png](https://s2.loli.net/2023/07/15/hzv1TcdrfsEm3Vb.png)

如果要查看的代码太长，无法看到后面的代码，你会发现这个JEB竟然没有横向滑条？？怎么办？有办法，按住`shift键+鼠标滚轮`，即可代替横向滑条前后查看了，你试试，回来会感谢我的

调试时需要在一些代码处下断点，快捷键是Ctrl+B，如本次需要调试的APP下断点处为

![125452o4wzuuqpqkmmwpww.png](https://s2.loli.net/2023/07/15/jQEuUVXdN6lenWY.png)

### 六、实战调试
1. 真机调试

把debug.apk安装到安卓机上，这里我使用的是Redmi K40（Android 11），安装后打开APP，当输入正确的密码后下面标签2显示“破解成功”，当然，我这个APP有bug，即使输入正确密码123456也会显示“破解失败”哈哈

![125840cilplnnn2qm3gppw.jpg](https://s2.loli.net/2023/07/15/BoVbTy8tx7Aik4H.jpg)

**然后手机里面打开设置，对着安卓版本狂点几次打开“开发者模式”，然后在开发者模式里面打开“USB调试”**

![130319dr7kr47gz956kggu.jpg](https://s2.loli.net/2023/07/15/njCv4H3x5bKrOSy.jpg)

好了，现在用数据线把手机和电脑连接起来，当弹出**“是否允许电脑调试手机”之类的提示一定要选择允许！！**
此时手机打开debug.apk这个APP，然后在JEB中点那个绿色瓢虫开始调试，当出现下面这个弹框时说明已经连接好了，这个时候选择“附上”

![130738s6l4cubqu447e0er.png](https://s2.loli.net/2023/07/15/2lvCBbaVcIjSkK8.png)

![130954dejtteth3h3g77yl.png](https://s2.loli.net/2023/07/15/2stSEeQkw8OGnK6.png)

出现这些信息时说明已经开始调试了
但是有时候会出现下面这个情况

![131207snrblndb1gffnzpd.png](https://s2.loli.net/2023/07/15/IyzpngWmDcQdvZj.png)

这是因为没有打开APP的缘故，有两个办法解决，方法一是手动打开调试的安卓APP，方法二用adb shell am start -D -n 包名/主入口点Activity来启动调试APP

好了，接下来我们随便输入数据，让JEB能断下来！

![133032zqkz4yez3iyk4zv9.png](https://s2.loli.net/2023/07/15/yGr9wsilDALjgSB.png)

![175806bw6bo9vofipe8emv.jpg](https://s2.loli.net/2023/07/15/HqlGkhZdpwy94fO.jpg)

2. 模拟器调试

其实模拟器和真机调试过程一模一样，你会真机了就会模拟器了，无非就是JEB连接模拟器的问题。
如我用的MuMu模拟器，首先打开cmd命令框，输入adb connect 127.0.0.1:7555，即可连接成功。然后要打开模拟器的开发者模式下的USB调试权限！其他PC版模拟器类似！只是端口不一样，如这里端口为7555

![140638o777d5h57n7y00n2.png](https://s2.loli.net/2023/07/16/AL8IjRWXlYoQDeS.png)

这里总结了一些常用的PC版模拟器连接方法！其他的自行搜索！
MuMu模拟器：`adb connect 127.0.0.1:7555`
夜神模拟器：`adb connect 127.0.0.1:62001`
雷电模拟器：`adb connect 127.0.0.1:5555`
逍遥安卓模拟器：`adb connect 127.0.0.1:21503`
天天模拟器：`adb connect 127.0.0.1:6555`
海马玩模拟器：`adb connect 127.0.0.1:53001`

3. VMOS调试：它是手机上的安卓模拟器，创建好模拟器后打开虚拟机设置，选择“高玩设置”（睾wan??hh，没事没事，咱们继续），勾选上“网络ADB”即可用adb连接VMOS了，调试过程同真机调试部分。不过VMOS是需要收费的！

![142031f58n7o23nfo11m8m.jpg](https://s2.loli.net/2023/07/16/i5cJvClFWQxuHrp.jpg)

### 七、完结
   以上就是用JEB进行Smali动态调试的全部过程，相对于Android Studio动态Smali调试来说，我认为JEB更加方便，无需其他额外的插件，同时他的劣势也很明显，工程大了容易卡死，有时调试断点断不下来，还是比较轻量化的一个工具吧！同时他的smali转java代码优化方面也需要提高，有些代码参数看的一头雾水。总的来说JEB还是一个非常优秀的工具了，当然，他的价格也不菲啊！一个月好多刀呢