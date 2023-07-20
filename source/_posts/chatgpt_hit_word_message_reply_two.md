---
title: 对接ChatGPT3.5/4的API实现打字机效果
date: 2023-06-07 14:58:36
tags: [JavaScript, ChatGPT, AI, Nodejs]
categories: [Coding, JavaScript]
---

### 前言

对接ChatGPT3.5/4的API实现打字机效果

在本文中，我们将探讨如何使用 OpenAI 的 GPT-3.5 模型实现打字机效果，即用户输入一条消息后，模型逐步返回一个完整的对话文本。我们将介绍一个 Node.js 服务器和一个 HTML 页面的示例代码，这两个组件通过 HTTP 请求和 SSE（Server-Sent Events）协议连接，并实现了基于流式 API 的长时间运行的聊天功能。

对接ChatGPT3.5/4接口本身很简单，但是实现`stream`以打字机效果展示并且实现自动长回复，不少小伙伴遇到问题，特整理了一份3.5接口开放当天用于临时验证的示例代码供学习参考（千万不要用于生产环境）：

**node.js代码：**

```js
import dotenv from 'dotenv'
import http from 'node:http'
import { Readable } from 'node:stream'
import url from 'node:url'
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url || '/')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.end()
  } else if (req.method === 'POST' && pathname === '/chatgpt') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', async () => {
      const { messages } = JSON.parse(body)
      // Set the response headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8")
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("Connection", "keep-alive")

      const streamResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: messages
      }, { responseType: 'stream' })


      // Convert the response to a Readable stream (this is a temporary workaround)
      const stream = streamResponse.data as any as Readable
      stream.on('data', chunk => {
        res.write(chunk)
      })

      stream.on('end', () => {
        res.end()
      })
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(65532, '0.0.0.0', () => {
  console.log('Server listening on port 65532')
})

```

这段 Node.js 代码实现了一个 HTTP 服务器，接受 POST 请求并将请求体中的消息发送给 OpenAI 的 GPT-3.5 模型进行对话，返回模型对消息的回复。具体实现细节包括：

*   解析环境变量以获取 OpenAI API 凭证；
*   解析请求 URL 并根据请求方法和路径分别处理 OPTIONS 和 /chatgpt 请求；
*   处理 POST 请求时，将请求体解析为 JSON 并提取出消息内容；
*   使用 OpenAI 客户端库创建一个长时间运行的流式 API 请求，并将其响应头设置为 SSE 格式；
*   将请求的响应转换为可读流并将其写入到 HTTP 响应中返回给客户端。

需要注意的是，这段代码中的 `dotenv` 库用于从 `.env` 文件中加载环境变量，因此需要确保该文件位于正确的位置且包含正确的变量名和值。同时，该代码假定 OpenAI 的 GPT-3.5/GPT-4 模型已经创建并部署，并且已经获得了相应的 API 凭证。

**前端代码：**

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>ChatGPT Streaming Demo</title>
  <!-- 加载 marked.js 库 -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script type="module">
    window.onload = async () => {
      const url = "http://127.0.0.1:65532/chatgpt";
      const jsonBody = {
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ]
      };

      const outputDiv = document.getElementById("output");
      let result = "";

      const answer = async (isContinue) => {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json"
          }
        })
        // Create a reader for the response body
        const reader = res.body.getReader();
        // Create a decoder for UTF-8 encoded text
        const decoder = new TextDecoder("utf-8");
        let render = 0
        // Function to read chunks of the response body
        const readChunk = async () => {
          return reader.read().then(({ value, done }) => {
            if (!done) {
              const dataString = decoder.decode(value);
              console.log(dataString)
              dataString.toString().trim().split("data: ").forEach(async (line) => {
                if (line != '') {
                  const text = line.replace("data: ", "")
                  try {
                    // Parse the chunk as a JSON object
                    const data = JSON.parse(text)
                    console.log(data.choices[0])
                    if (data.choices[0].delta.content) {
                      result += data.choices[0].delta.content
                      if (render++ > 5) {
                        outputDiv.innerHTML += data.choices[0].delta.content
                        render = 0
                      } else {
                        outputDiv.innerHTML = marked.parse(result + data.choices[0].delta.content)
                      }
                    }
                    if (data.choices[0].finish_reason === 'length') { // 支持长回复
                      await answer(true)
                    } else if (data.choices[0].finish_reason === 'stop') {
                      outputDiv.innerHTML = marked.parse(result);
                      jsonBody.result = result
                      return
                    }
                    return readChunk();
                  } catch (error) {
                    // End the stream but do not send the error, as this is likely the DONE message from createCompletion
                    // console.error(error)
                    console.log(text)
                    if (text.trim() === '[DONE]') {
                      outputDiv.innerHTML = marked.parse(result);
                      jsonBody.result = result
                      return
                    }
                  }
                }
              })
            } else {
              console.log("done");
            }
          });
        };

        await readChunk();
      }

      await answer()
    }
  </script>
</head>

<body>
  <div id="output"></div>
</body>

</html>

```

这段前端代码实现了一个 HTML 页面，其中包含一个 `div` 元素用于显示与 ChatGPT3.5/4 模型的对话（EventSource API来实现SSE的接收和处理）。具体实现细节包括：

*   引入了 `marked.js` 库，用于将 Markdown 格式文本转换为 HTML 格式；
*   在页面加载后，通过 HTTP POST 请求向 Node.js 服务器发送一个包含用户第一条消息内容的 JSON 对象，并将 HTTP 响应的流数据解析为字符串并逐行处理；
*   在每次从流中读取到的新数据中，将 JSON 字符串解析为对象后提取出模型生成的回复文本，并使用 `marked.js` 将其转换为 HTML 文本；
*   将转换后的 HTML 文本添加到 `div` 元素中以在页面上显示出来；
*   当模型返回的 `finish_reason` 字段为 `"stop"` 时，停止递归调用 `answer()` 函数并将最终生成的所有文本存储在 JSON 对象 `result` 字段中。

需要注意的是，该代码假定 Node.js 服务器已经启动并正确响应 `/chatgpt` 路径的请求，并且浏览器能够正常访问该服务器。同时，在实际使用中需要替换 `url` 变量为实际的服务器地址。以上代码**没有考虑中止请求的情况**，如需中止请求并展示新内容，可参考《[Vue3对接ChatGPT4接口](https://www.wyr.me/post/748 "null")》。

以上示例代码支持长回复（`if (data.choices[0].finish_reason === 'length')`则持续请求API直到所有内容输出完成），关于`chatgpt-api`如何支持长回复：[https://github.com/transitive-bullshit/chatgpt-api/pull/459](https://github.com/transitive-bullshit/chatgpt-api/pull/459 "null")。

关于对接Stream方式的API，我看到一些开源项目或多或少存在问题，因精力有限无法一一分析也无力去一一修复开源项目的bug。大家遇到时参考我给的示例代码修改就好。

> Q: 前端没有打字机效果？
> 
> A: 一种可能原因是经过 Nginx 反向代理，开启了 buffer，则 Nginx 会尝试从后端缓冲一定大小的数据再发送给浏览器。请尝试在反代参数后添加 `proxy_buffering off;`，然后重载 Nginx。其他 web server 配置同理。


