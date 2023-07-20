---
title: Spider-ProxyPool代理池的维护
date: 2022-02-16 14:58:36
tags: [Python, Proxy, Spider]
categories: [Coding, Python]

---

代理池的维护
==============================

本文字数： 15k 阅读时长 ≈ 23 分钟

我们在上一节了解了代理的设置方法，利用代理我们可以解决目标网站封 IP 的问题，而在网上又有大量公开的免费代理，其中有一部分可以拿来使用，或者我们也可以购买付费的代理 IP，价格也不贵。但是不论是免费的还是付费的，都不能保证它们每一个都是可用的，毕竟可能其他人也可能在用此 IP 爬取同样的目标站点而被封禁，或者代理服务器突然出故障或网络繁忙。一旦我们选用了一个不可用的代理，势必会影响我们爬虫的工作效率。 所以说，在用代理时，我们需要提前做一下筛选，将不可用的代理剔除掉，保留下可用代理，接下来在获取代理时从可用代理里面取出直接使用就好了。 所以本节我们来搭建一个高效易用的代理池。

### [](about:blank#1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C "1. 准备工作")1\. 准备工作

要实现代理池我们首先需要成功安装好了 Redis 数据库并启动服务，另外还需要安装 Aiohttp、Requests、RedisPy、PyQuery、Flask 库，如果没有安装可以参考第一章的安装说明。

### [](about:blank#2-%E4%BB%A3%E7%90%86%E6%B1%A0%E7%9A%84%E7%9B%AE%E6%A0%87 "2. 代理池的目标")2\. 代理池的目标

代理池要做到易用、高效，我们一般需要做到下面的几个目标：

*   基本模块分为四块，获取模块、存储模块、检查模块、接口模块。
*   获取模块需要定时去各大代理网站抓取代理，代理可以是免费公开代理也可以是付费代理，代理的形式都是 IP 加端口，尽量从不同来源获取，尽量抓取高匿代理，抓取完之后将可用代理保存到数据库中。
*   存储模块负责存储抓取下来的代理。首先我们需要保证代理不重复，另外我们还需要标识代理的可用情况，而且需要动态实时处理每个代理，所以说，一种比较高效和方便的存储方式就是使用 Redis 的 Sorted Set，也就是有序集合。
*   检测模块需要定时将数据库中的代理进行检测，在这里我们需要设置一个检测链接，最好是爬取哪个网站就检测哪个网站，这样更加有针对性，如果要做一个通用型的代理，那可以设置百度等链接来检测。另外我们需要标识每一个代理的状态，如设置分数标识，100 分代表可用，分数越少代表越不可用，检测一次如果可用，我们可以将其立即设置为100 满分，也可以在原基础上加 1 分，当不可用，可以将其减 1 分，当减到一定阈值后就直接从数据库移除。通过这样的标识分数，我们就可以区分出代理的可用情况，选用的时候会更有针对性。
*   接口模块需要用 API 来提供对外服务的接口，其实我们可以直接连数据库来取，但是这样就需要知道数据库的连接信息，不太安全，而且需要配置连接，所以一个比较安全和方便的方式就是提供一个 Web API 接口，通过访问接口即可拿到可用代理。另外由于可用代理可能有多个，我们可以提供随机返回一个可用代理的接口，这样保证每个可用代理都可以取到，实现负载均衡。

以上便是设计代理的一些基本思路，那么接下来我们就设计一下整体的架构，然后用代码该实现代理池。

### [](about:blank#3-%E4%BB%A3%E7%90%86%E6%B1%A0%E7%9A%84%E6%9E%B6%E6%9E%84 "3. 代理池的架构")3\. 代理池的架构

根据上文的描述，代理池的架构可以是这样的，如图 9-1 所示：
![](https://s2.loli.net/2023/07/05/sOtAIdncZYgzCRy.jpg)
图 9-1 代理池架构 代理池分为四个部分，获取模块、存储模块、检测模块、接口模块。

*   存储模块使用Redis的有序集合，用以代理的去重和状态标识，同时它也是中心模块和基础模块，将其他模块串联起来。
*   获取模块定时从代理网站获取代理，将获取的代理传递给存储模块，保存到数据库。
*   检测模块定时通过存储模块获取所有代理，并对其进行检测，根据不同的检测结果对代理设置不同的标识。
*   接口模块通过 Web API 提供服务接口，其内部还是连接存储模块，获取可用的代理。

### [](about:blank#4-%E4%BB%A3%E7%90%86%E6%B1%A0%E7%9A%84%E5%AE%9E%E7%8E%B0 "4. 代理池的实现")4\. 代理池的实现

接下来我们分别用代码来实现一下这四个模块。

#### [](about:blank#%E5%AD%98%E5%82%A8%E6%A8%A1%E5%9D%97 "存储模块")存储模块

存储在这里我们使用 Redis 的有序集合，集合的每一个元素都是不重复的，对于代理代理池来说，集合的元素就变成了一个个代理，也就是 IP 加端口的形式，如 60.207.237.111:8888，这样的一个代理就是集合的一个元素。另外有序集合的每一个元素还都有一个分数字段，分数是可以重复的，是一个浮点数类型，也可以是整数类型。该集合会根据每一个元素的分数对集合进行排序，数值小的排在前面，数值大的排在后面，这样就可以实现集合元素的排序了。 对于代理池来说，这个分数可以作为我们判断一个代理可用不可用的标志，我们将 100 设为最高分，代表可用，0 设为最低分，代表不可用。从代理池中获取代理的时候会随机获取分数最高的代理，注意这里是随机，这样可以保证每个可用代理都会被调用到。 分数是我们判断代理稳定性的重要标准，在这里我们设置分数规则如下：

*   分数 100 为可用，检测器会定时循环检测每个代理可用情况，一旦检测到有可用的代理就立即置为 100，检测到不可用就将分数减 1，减至 0 后移除。
*   新获取的代理添加时将分数置为 10，当测试可行立即置 100，不可行分数减 1，减至 0 后移除。

这是一种解决方案，当然可能还有更合理的方案。此方案的设置有一定的原因，在此总结如下：

*   当检测到代理可用时立即置为 100，这样可以保证所有可用代理有更大的机会被获取到。你可能会说为什么不直接将分数加 1 而是直接设为最高 100 呢？设想一下，我们有的代理是从各大免费公开代理网站获取的，如果一个代理并没有那么稳定，平均五次请求有两次成功，三次失败，如果按照这种方式来设置分数，那么这个代理几乎不可能达到一个高的分数，也就是说它有时是可用的，但是我们筛选是筛选的分数最高的，所以这样的代理就几乎不可能被取到，当然如果想追求代理稳定性的化可以用这种方法，这样可确保分数最高的一定是最稳定可用的。但是在这里我们采取可用即设置 100 的方法，确保只要可用的代理都可以被使用到。
*   当检测到代理不可用时，将分数减 1，减至 0 后移除，一共 100 次机会，也就是说当一个可用代理接下来如果尝试了 100 次都失败了，就一直减分直到移除，一旦成功就重新置回 100，尝试机会越多代表将这个代理拯救回来的机会越多，这样不容易将曾经的一个可用代理丢弃，因为代理不可用的原因可能是网络繁忙或者其他人用此代理请求太过频繁，所以在这里设置为 100 级。
*   新获取的代理分数设置为 10，检测如果不可用就减 1，减到 0 就移除，如果可用就置 100。由于我们很多代理是从免费网站获取的，所以新获取的代理无效的可能性是非常高的，可能不足 10%，所以在这里我们将其设置为 10，检测的机会没有可用代理 100 次那么多，这也可以适当减少开销。

以上便是代理分数的一个设置思路，不一定是最优思路，但个人实测实用性还是比较强的。 所以我们就需要定义一个类来操作数据库的有序集合，定义一些方法来实现分数的设置，代理的获取等等。 实现如下：

```python
MAX_SCORE = 100
MIN_SCORE = 0
INITIAL_SCORE = 10
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_PASSWORD = None
REDIS_KEY = 'proxies'

import redis
from random import choice

class RedisClient(object):
    def __init__(self, host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD):
        """
        初始化
        :param host: Redis 地址
        :param port: Redis 端口
        :param password: Redis密码
        """
        self.db = redis.StrictRedis(host=host, port=port, password=password, decode_responses=True)

    def add(self, proxy, score=INITIAL_SCORE):
        """
        添加代理，设置分数为最高
        :param proxy: 代理
        :param score: 分数
        :return: 添加结果
        """
        if not self.db.zscore(REDIS_KEY, proxy):
            return self.db.zadd(REDIS_KEY, score, proxy)

    def random(self):
        """
        随机获取有效代理，首先尝试获取最高分数代理，如果不存在，按照排名获取，否则异常
        :return: 随机代理
        """
        result = self.db.zrangebyscore(REDIS_KEY, MAX_SCORE, MAX_SCORE)
        if len(result):
            return choice(result)
        else:
            result = self.db.zrevrange(REDIS_KEY, 0, 100)
            if len(result):
                return choice(result)
            else:
                raise PoolEmptyError

    def decrease(self, proxy):
        """
        代理值减一分，小于最小值则删除
        :param proxy: 代理
        :return: 修改后的代理分数
        """
        score = self.db.zscore(REDIS_KEY, proxy)
        if score and score > MIN_SCORE:
            print('代理', proxy, '当前分数', score, '减1')
            return self.db.zincrby(REDIS_KEY, proxy, -1)
        else:
            print('代理', proxy, '当前分数', score, '移除')
            return self.db.zrem(REDIS_KEY, proxy)

    def exists(self, proxy):
        """
        判断是否存在
        :param proxy: 代理
        :return: 是否存在
        """
        return not self.db.zscore(REDIS_KEY, proxy) == None

    def max(self, proxy):
        """
        将代理设置为MAX_SCORE
        :param proxy: 代理
        :return: 设置结果
        """
        print('代理', proxy, '可用，设置为', MAX_SCORE)
        return self.db.zadd(REDIS_KEY, MAX_SCORE, proxy)

    def count(self):
        """
        获取数量
        :return: 数量
        """
        return self.db.zcard(REDIS_KEY)

    def all(self):
        """
        获取全部代理
        :return: 全部代理列表
        """
        return self.db.zrangebyscore(REDIS_KEY, MIN_SCORE, MAX_SCORE)

```

首先定义了一些常量，如 MAX\_SCORE、MIN\_SCORE、INITIAL\_SCORE 分别代表最大分数、最小分数、初始分数。REDIS\_HOST、REDIS\_PORT、REDIS\_PASSWORD 分别代表了 Redis 的连接信息，即地址、端口、密码。REDIS\_KEY 是有序集合的键名，可以通过它来获取代理存储所使用的有序集合。 接下来定义了一个 RedisClient 类，用以操作 Redis 的有序集合，其中定义了一些方法来对集合中的元素进行处理，主要功能如下：

*   **init**() 方法是初始化的方法，参数是Redis的连接信息，默认的连接信息已经定义为常量，在 **init**() 方法中初始化了一个 StrictRedis 的类，建立 Redis 连接。这样当 RedisClient 类初始化的时候就建立了Redis的连接。
*   add() 方法向数据库添加代理并设置分数，默认的分数是 INITIAL\_SCORE 也就是 10，返回结果是添加的结果。
*   random() 方法是随机获取代理的方法，首先获取 100 分的代理，然后随机选择一个返回，如果不存在 100 分的代理，则按照排名来获取，选取前 100 名，然后随机选择一个返回，否则抛出异常。
*   decrease() 方法是在代理检测无效的时候设置分数减 1 的方法，传入代理，然后将此代理的分数减 1，如果达到最低值，那么就删除。
*   exists() 方法判断代理是否存在集合中
*   max() 方法是将代理的分数设置为 MAX\_SCORE，即 100，也就是当代理有效时的设置。
*   count() 方法返回当前集合的元素个数。
*   all() 方法返回所有的代理列表，供检测使用。

定义好了这些方法，我们可以在后续的模块中调用此类来连接和操作数据库，非常方便。如我们想要获取随机可用的代理，只需要调用 random() 方法即可，得到的就是随机的可用代理。

#### [](about:blank#%E8%8E%B7%E5%8F%96%E6%A8%A1%E5%9D%97 "获取模块")获取模块

获取模块的逻辑相对简单，首先需要定义一个 Crawler 来从各大网站抓取代理，示例如下：

```python
import json
from .utils import get_page
from pyquery import PyQuery as pq

class ProxyMetaclass(type):
    def __new__(cls, name, bases, attrs):
        count = 0
        attrs['__CrawlFunc__'] = []
        for k, v in attrs.items():
            if 'crawl_' in k:
                attrs['__CrawlFunc__'].append(k)
                count += 1
        attrs['__CrawlFuncCount__'] = count
        return type.__new__(cls, name, bases, attrs)

class Crawler(object, metaclass=ProxyMetaclass):
    def get_proxies(self, callback):
        proxies = []
        for proxy in eval("self.{}()".format(callback)):
            print('成功获取到代理', proxy)
            proxies.append(proxy)
        return proxies

    def crawl_daili66(self, page_count=4):
        """
        获取代理66
        :param page_count: 页码
        :return: 代理
        """
        start_url = 'http://www.66ip.cn/{}.html'
        urls = [start_url.format(page) for page in range(1, page_count + 1)]
        for url in urls:
            print('Crawling', url)
            html = get_page(url)
            if html:
                doc = pq(html)
                trs = doc('.containerbox table tr:gt(0)').items()
                for tr in trs:
                    ip = tr.find('td:nth-child(1)').text()
                    port = tr.find('td:nth-child(2)').text()
                    yield ':'.join([ip, port])

    def crawl_proxy360(self):
        """
        获取Proxy360
        :return: 代理
        """
        start_url = 'http://www.proxy360.cn/Region/China'
        print('Crawling', start_url)
        html = get_page(start_url)
        if html:
            doc = pq(html)
            lines = doc('div[name="list_proxy_ip"]').items()
            for line in lines:
                ip = line.find('.tbBottomLine:nth-child(1)').text()
                port = line.find('.tbBottomLine:nth-child(2)').text()
                yield ':'.join([ip, port])

    def crawl_goubanjia(self):
        """
        获取Goubanjia
        :return: 代理
        """
        start_url = 'http://www.goubanjia.com/free/gngn/index.shtml'
        html = get_page(start_url)
        if html:
            doc = pq(html)
            tds = doc('td.ip').items()
            for td in tds:
                td.find('p').remove()
                yield td.text().replace(' ', '')

```

为了实现灵活，在这里我们将获取代理的一个个方法统一定义一个规范，如统一定义以 crawl 开头，这样扩展的时候只需要添加 crawl 开头的方法即可。 在这里实现了几个示例，如抓取代理 66、Proxy360、Goubanjia 三个免费代理网站，这些方法都定义成了生成器，通过 yield 返回一个个代理。首先将网页获取，然后用PyQuery 解析，解析出IP加端口的形式的代理然后返回。 然后定义了一个 get\_proxies() 方法，将所有以 crawl 开头的方法调用一遍，获取每个方法返回的代理并组合成列表形式返回。 你可能会想知道是怎样获取了所有以 crawl 开头的方法名称的。其实这里借助于元类来实现，定义了一个 ProxyMetaclass，Crawl 类将它设置为元类，元类中实现了 **new**() 方法，这个方法有固定的几个参数，其中第四个参数 attrs 中包含了类的一些属性，这其中就包含了类中方法的一些信息，我们可以遍历 attrs 这个变量即可获取类的所有方法信息。所以在这里我们在 **new**() 方法中遍历了 attrs 的这个属性，就像遍历一个字典一样，键名对应的就是方法的名称，接下来判断其开头是否是 crawl，如果是，则将其加入到 **CrawlFunc** 属性中，这样我们就成功将所有以 crawl 开头的方法定义成了一个属性，就成功动态地获取到所有以 crawl 开头的方法列表了。 所以说，如果要做扩展的话，我们只需要添加一个以 crawl开头的方法，例如抓取快代理，我们只需要在 Crawler 类中增加 crawl\_kuaidaili() 方法，仿照其他的几个方法将其定义成生成器，抓取其网站的代理，然后通过 yield 返回代理即可，所以这样我们可以非常方便地扩展，而不用关心类其他部分的实现逻辑。 代理网站的添加非常灵活，不仅可以添加免费代理，也可以添加付费代理，一些付费代理的提取方式其实也类似，也是通过 Web 的形式获取，然后进行解析，解析方式可能更加简单，如解析纯文本或 Json，解析之后以同样的方式返回即可，在此不再添加，可以自行扩展。 既然定义了这个 Crawler 类，我们就要调用啊，所以在这里再定义一个 Getter 类，动态地调用所有以 crawl 开头的方法，然后获取抓取到的代理，将其加入到数据库存储起来。

```python
from db import RedisClient
from crawler import Crawler

POOL_UPPER_THRESHOLD = 10000

class Getter():
    def __init__(self):
        self.redis = RedisClient()
        self.crawler = Crawler()

    def is_over_threshold(self):
        """
        判断是否达到了代理池限制
        """
        if self.redis.count() >= POOL_UPPER_THRESHOLD:
            return True
        else:
            return False

    def run(self):
        print('获取器开始执行')
        if not self.is_over_threshold():
            for callback_label in range(self.crawler.__CrawlFuncCount__):
                callback = self.crawler.__CrawlFunc__[callback_label]
                proxies = self.crawler.get_proxies(callback)
                for proxy in proxies:
                    self.redis.add(proxy)
```

Getter 类就是获取器类，这其中定义了一个变量 POOL\_UPPER\_THRESHOLD 表示代理池的最大数量，这个数量可以灵活配置，然后定义了 is\_over\_threshold() 方法判断代理池是否已经达到了容量阈值，它就是调用了 RedisClient 的 count() 方法获取代理的数量，然后加以判断，如果数量达到阈值则返回 True，否则 False。如果不想加这个限制可以将此方法永久返回 True。 接下来定义了 run() 方法，首先判断了代理池是否达到阈值，然后在这里就调用了 Crawler 类的 **CrawlFunc** 属性，获取到所有以 crawl 开头的方法列表，依次通过 get\_proxies() 方法调用，得到各个方法抓取到的代理，然后再利用 RedisClient 的 add() 方法加入数据库，这样获取模块的工作就完成了。

#### [](about:blank#%E6%A3%80%E6%B5%8B%E6%A8%A1%E5%9D%97 "检测模块")检测模块

在获取模块中，我们已经成功将各个网站的代理获取下来了，然后就需要一个检测模块来对所有的代理进行一轮轮的检测，检测可用就设置为 100，不可用就分数减 1，这样就可以实时改变每个代理的可用情况，在获取有效代理的时候只需要获取分数高的代理即可。 由于代理的数量非常多，为了提高代理的检测效率，我们在这里使用异步请求库 Aiohttp 来进行检测。 Requests 作为一个同步请求库，我们在发出一个请求之后需要等待网页加载完成之后才能继续执行程序。也就是这个过程会阻塞在等待响应这个过程，如果服务器响应非常慢，比如一个请求等待十几秒，那么我们使用 Requests 完成一个请求就会需要十几秒的时间，中间其实就是一个等待响应的过程，程序也不会继续往下执行，而这十几秒的时间其实完全可以去做其他的事情，比如调度其他的请求或者进行网页解析等等。 异步请求库就解决了这个问题，它类似 JavaScript 中的回调，意思是说在请求发出之后，程序可以继续接下去执行去做其他的事情，当响应到达时，会通知程序再去处理这个响应，这样程序就没有被阻塞，充分把时间和资源利用起来，大大提高效率。 对于响应速度比较快的网站，可能 Requests 同步请求和 Aiohttp 异步请求的效果差距没那么大，可对于检测代理这种事情，一般是需要十多秒甚至几十秒的时间，这时候使用 Aiohttp 异步请求库的优势就大大体现出来了，效率可能会提高几十倍不止。 所以在这里我们的代理检测使用异步请求库 Aiohttp，实现示例如下：

```python
VALID_STATUS_CODES = [200]
TEST_URL = 'http://www.baidu.com'
BATCH_TEST_SIZE = 100

class Tester(object):
    def __init__(self):
        self.redis = RedisClient()

    async def test_single_proxy(self, proxy):
        """
        测试单个代理
        :param proxy: 单个代理
        :return: None
        """
        conn = aiohttp.TCPConnector(verify_ssl=False)
        async with aiohttp.ClientSession(connector=conn) as session:
            try:
                if isinstance(proxy, bytes):
                    proxy = proxy.decode('utf-8')
                real_proxy = 'http://' + proxy
                print('正在测试', proxy)
                async with session.get(TEST_URL, proxy=real_proxy, timeout=15) as response:
                    if response.status in VALID_STATUS_CODES:
                        self.redis.max(proxy)
                        print('代理可用', proxy)
                    else:
                        self.redis.decrease(proxy)
                        print('请求响应码不合法', proxy)
            except (ClientError, ClientConnectorError, TimeoutError, AttributeError):
                self.redis.decrease(proxy)
                print('代理请求失败', proxy)

    def run(self):
        """
        测试主函数
        :return: None
        """
        print('测试器开始运行')
        try:
            proxies = self.redis.all()
            loop = asyncio.get_event_loop()
            # 批量测试
            for i in range(0, len(proxies), BATCH_TEST_SIZE):
                test_proxies = proxies[i:i + BATCH_TEST_SIZE]
                tasks = [self.test_single_proxy(proxy) for proxy in test_proxies]
                loop.run_until_complete(asyncio.wait(tasks))
                time.sleep(5)
        except Exception as e:
            print('测试器发生错误', e.args)
```

在这里定义了一个类 Tester，**init**() 方法中建立了一个 RedisClient 对象，供类中其他方法使用。接下来定义了一个 test\_single\_proxy() 方法，用来检测单个代理的可用情况，其参数就是被检测的代理，注意这个方法前面加了 async 关键词，代表这个方法是异步的，方法内部首先创建了 Aiohttp 的 ClientSession 对象，此对象类似于 Requests 的 Session 对象，可以直接调用该对象的 get() 方法来访问页面，在这里代理的设置方式是通过 proxy 参数传递给 get() 方法，请求方法前面也需要加上 async 关键词标明是异步请求，这也是 Aiohttp 使用时的常见写法。 测试的链接在这里定义常量为 TEST\_URL，如果针对某个网站有抓取需求，建议将 TEST\_URL 设置为目标网站的地址，因为在抓取的过程中，可能代理本身是可用的，但是该代理的 IP 已经被目标网站封掉了。例如，如要抓取知乎，可能其中某些代理是可以正常使用，比如访问百度等页面是完全没有问题的，但是可能对知乎来说可能就被封了，所以可以将 TEST\_URL 设置为知乎的某个页面的链接，当请求失败时，当代理被封时，分数自然会减下来，就不会被取到了。 如果想做一个通用的代理池，则不需要专门设置 TEST\_URL，可以设置为一个不会封 IP 的网站，也可以设置为百度这类响应稳定的网站。 另外我们还定义了 VALID\_STATUS\_CODES 变量，是一个列表形式，包含了正常的状态码，如可以定义成 \[200\]，当然对于某些检测目标网站可能会出现其他的状态码也是正常的，可以自行配置。 获取 Response 后需要判断响应的状态，如果状态码在 VALID\_STATUS\_CODES 这个列表里，则代表代理可用，调用 RedisClient 的 max() 方法将代理分数设为 100，否则调用 decrease() 方法将代理分数减 1，如果出现异常也同样将代理分数减 1。 另外在测试的时候设置了批量测试的最大值 BATCH\_TEST\_SIZE 为 100，也就是一批测试最多测试 100个，这可以避免当代理池过大时全部测试导致内存开销过大的问题。 随后在 run() 方法里面获取了所有的代理列表，使用 Aiohttp 分配任务，启动运行，这样就可以进行异步检测了，写法可以参考 Aiohttp 的官方示例：http://aiohttp.readthedocs.io/。 这样测试模块的逻辑就完成了。

#### [](about:blank#%E6%8E%A5%E5%8F%A3%E6%A8%A1%E5%9D%97 "接口模块")接口模块

通过上述三个模块我们已经可以做到代理的获取、检测和更新了，数据库中就会以有序集合的形式存储各个代理还有对应的分数，分数 100 代表可用，分数越小代表越不可用。 但是我们怎样来方便地获取可用代理呢？用 RedisClient 类来直接连接 Redis 然后调用 random() 方法获取当然没问题，这样做效率很高，但是有这么几个弊端：

*   需要知道 Redis 的用户名和密码，如果这个代理池是给其他人使用的就需要告诉他连接的用户名和密码信息，这样是很不安全的。
*   代理池如果想持续运行需要部署在远程服务器上运行，如果远程服务器的 Redis 是只允许本地连接的，那么就没有办法远程直连 Redis 获取代理了。
*   如果爬虫所在的主机没有连接 Redis 的模块，或者爬虫不是由 Python 语言编写的，那么就无法使用 RedisClient 来获取代理了。
*   如果 RedisClient 类或者数据库结构有更新，那么在爬虫端还需要去同步这些更新。

综上考虑，为了使得代理池可以作为一个独立服务运行，我们最好增加一个接口模块，以 Web API 的形式暴露可用代理。 这样获取代理只需要请求一下接口即可，以上的几个缺点弊端可以解决。 我们在这里使用一个比较轻量级的库 Flask 来实现这个接口模块，实现示例如下：

```python
from flask import Flask, g
from db import RedisClient

__all__ = ['app']
app = Flask(__name__)

def get_conn():
    if not hasattr(g, 'redis'):
        g.redis = RedisClient()
    return g.redis

@app.route('/')
def index():
    return '<h2>Welcome to Proxy Pool System</h2>'

@app.route('/random')
def get_proxy():
    """
    获取随机可用代理
    :return: 随机代理
    """
    conn = get_conn()
    return conn.random()

@app.route('/count')
def get_counts():
    """
    获取代理池总量
    :return: 代理池总量
    """
    conn = get_conn()
    return str(conn.count())

if __name__ == '__main__':
    app.run()
```

在这里我们声明了一个 Flask 对象，定义了三个接口，分别是首页、随机代理页、获取数量页。 运行之后 Flask 会启动一个 Web 服务，我们只需要访问对应的接口即可获取到可用代理。

#### [](about:blank#%E8%B0%83%E5%BA%A6%E6%A8%A1%E5%9D%97 "调度模块")调度模块

这个模块其实就是调用以上所定义的三个模块，将以上三个模块通过多进程的形式运行起来，示例如下：

```python
TESTER_CYCLE = 20
GETTER_CYCLE = 20
TESTER_ENABLED = True
GETTER_ENABLED = True
API_ENABLED = True

from multiprocessing import Process
from api import app
from getter import Getter
from tester import Tester

class Scheduler():
    def schedule_tester(self, cycle=TESTER_CYCLE):
        """
        定时测试代理
        """
        tester = Tester()
        while True:
            print('测试器开始运行')
            tester.run()
            time.sleep(cycle)

    def schedule_getter(self, cycle=GETTER_CYCLE):
        """
        定时获取代理
        """
        getter = Getter()
        while True:
            print('开始抓取代理')
            getter.run()
            time.sleep(cycle)

    def schedule_api(self):
        """
        开启API
        """
        app.run(API_HOST, API_PORT)

    def run(self):
        print('代理池开始运行')
        if TESTER_ENABLED:
            tester_process = Process(target=self.schedule_tester)
            tester_process.start()

        if GETTER_ENABLED:
            getter_process = Process(target=self.schedule_getter)
            getter_process.start()

        if API_ENABLED:
            api_process = Process(target=self.schedule_api)
            api_process.start()
```

在这里还有三个常量，TESTER\_ENABLED、GETTER\_ENABLED、API\_ENABLED 都是布尔类型，True 或者 False。标明了测试模块、获取模块、接口模块的开关，如果为 True，则代表模块开启。 启动入口是 run() 方法，其分别判断了三个模块的开关，如果开启的话，就新建一个 Process 进程，设置好启动目标，然后调用 start() 方法运行，这样三个进程就可以并行执行，互不干扰。 三个调度方法结构也非常清晰，比如 schedule\_tester() 方法，这是用来调度测试模块的方法，首先声明一个 Tester 对象，然后进入死循环不断循环调用其 run() 方法，执行完一轮之后就休眠一段时间，休眠结束之后重新再执行。在这里休眠时间也定义为一个常量，如 20 秒，这样就会每隔 20 秒进行一次代理检测。 最后整个代理池的运行只需要调用 Scheduler 的 run() 方法即可启动。 以上便是整个代理池的架构和相应实现逻辑。

### [](about:blank#5-%E8%BF%90%E8%A1%8C "5. 运行")5\. 运行

接下来我们将代码整合一下，将代理运行起来，运行之后的输出结果如图 9-2 所示： 
![](https://s2.loli.net/2023/07/05/C3cJgdnqjfO7XwN.png)
图 9-2 运行结果 以上是代理池的控制台输出，可以看到可用代理设置为 100，不可用代理分数减 1。 接下来我们再打开浏览器，当前配置了运行在 5555 端口，所以打开：<http://127.0.0.1:5555>，即可看到其首页，如图 9-3 所示： 
![2019-08-02-060403.jpg](https://s2.loli.net/2023/07/05/pP9XrxTDJRACyQv.jpg)
图 9-3 首页页面 再访问：<http://127.0.0.1:5555/random>，即可获取随机可用代理，如图 9-4 所示：
![2019-08-02-060410.jpg](https://s2.loli.net/2023/07/05/dvVl2ojIcCbr7eU.jpg)
图 9-4 获取代理页面 所以后面我们只需要访问此接口即可获取一个随机可用代理，非常方便。 获取代理的代码如下：
```python
import requests

PROXY_POOL_URL = 'http://localhost:5555/random'

def get_proxy():
    try:
        response = requests.get(PROXY_POOL_URL)
        if response.status_code == 200:
            return response.text
    except ConnectionError:
        return None
```
获取下来之后便是一个字符串类型的代理，可以按照上一节所示的方法设置代理，如 Requests 的使用方法如下：

```python
import requests

proxy = get_proxy()
proxies = {
    'http': 'http://' + proxy,
    'https': 'https://' + proxy,
}
try:
    response = requests.get('http://httpbin.org/get', proxies=proxies)
    print(response.text)
except requests.exceptions.ConnectionError as e:
    print('Error', e.args)
```

有了代理池之后，我们再取出代理即可有效防止IP被封禁的情况。

### [](about:blank#6-%E7%BB%93%E8%AF%AD "6. 结语")6\. 结语

本节我们实现了一个比较高效的代理池来获取随机可用的代理，整个内容比较多，需要好好理解一下。 
