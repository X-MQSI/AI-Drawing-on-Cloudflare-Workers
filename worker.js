const html = `
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="This site is MQSI's AI Image Generator"/>
  <meta name="copyright" content="© 2024 MQSI.">
  <title>MQSI's AI Image Generator</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; background-color: #E3F2FD; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; }
    #container { min-width: 40%; max-width: 80%; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    #SetBtn {text-align: right;}
    footer { margin-top: 50px; padding: 0; text-align: left; color: rgb(110, 106, 145); }
    input[type="text"], select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 3px; margin-top: 20px; margin-bottom: 10px; }
    input[type="button"] { background-color: rgb(247, 224, 165); color: rgb(120, 153, 188); font-weight: bolder; border: none; padding: 10px 0; border-radius: 5px; cursor: pointer; transition: background-color 0.1s ease; width: 100%; }
    input[type="button"]:hover { background-color: #FFC0CB; }
    site-footer { display: block; height: 3px; width: 50px; background: #FFC0CB; margin-bottom: 20px; }
    footer a { text-decoration: none; color: rgb(243 169 219); font-weight: bolder; }
    pop {display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 80%; min-width: 40%; height: auto; background-color: rgba(247, 224, 165, 0.95); padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); z-index: 1000;}
    pop img { width: auto; max-width: 100%; max-height: 70vh; margin: 0 auto; }
    pop .close-btn { background-color: #FF4D4D; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; position: absolute; top: 10px; right: 10px; }
    @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(5px); } }
    @media (prefers-color-scheme: dark) { body { background-color: #333; } #container { background-color: #CDC1C5; } }
    @media (max-width: 550px) {pop {width: 80%;}}
  </style>
</head>
<body>
  <div id="container">
    <div id="SetBtn" onclick="Select()">
        <svg width="1em" height="1em"><path fill="#4CAF50" fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"/></svg>
    </div>
    <h1>MQSI's AI Image Generator</h1>
    <div class="form-group">
      <label for="inputText">请在此输入你的tag</label>
      <input type="text" id="inputText" name="inputText" placeholder="例：((Cirno)), (blue hair bow), azure hair ……" />
      <input type="button" id="generateButton" value="生成图像" onclick="generateImage()" />
    </div>
    <p id="errorMessage" style="color: red;"></p>
    <pop id="popContainer">
      <button class="close-btn" onclick="closePop()">关闭</button>
      <h2>图片预览</h2>
      <p id="Textinput"></p>
      <br>
      <img id="outputImage" src="#" alt="Generated Image"/>
      <p id="timingInfo"></p>
    </pop>
    <pop id="popSelect">
        <button class="close-btn" onclick="closePop()">确定</button>
        <h2>选择模型</h2>
        <select id="styleSelect" name="styleSelect">
          <option value="1">wd-1-5-beta3 (二次元)</option>
          <option value="2">littletinies (手绘卡通)</option>
          <option value="3">stable-diffusion-3-medium (通用模型)</option>
        </select>
    </pop>
    <footer>
      <site-footer></site-footer>
      <p>由<a href="https://mqsi.xyz/" target="_blank"> MQSI </a>建设<br>服务由<a href="https://cloudflare.com/" target="_blank"> Cloudflare </a>提供<br>模型由<a href="https://huggingface.co/" target="_blank"> Hugging Face </a>驱动<br>🥰来点免费的Star吧→<a href="https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/tree/main" target="_blank"> Github </a></p>
      Ver 0.0.3 Alpha4
    </footer>
  </div>
  <script>
    let imageUrl;

    async function generateImage() {
      const inputText = document.getElementById('inputText').value.trim();
      const styleSelect = document.getElementById('styleSelect').value;

      if (inputText) {
        document.getElementById('generateButton').disabled = true;
        document.getElementById('errorMessage').textContent = '';
        document.getElementById('generateButton').value = '正在生成，稍安勿躁';
        const startTime = performance.now(); // 记录开始时间

        try {
          const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText, style: styleSelect })
          });
          if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            const imgElement = new Image();
            imgElement.onload = function() {
              const endTime = performance.now(); // 记录结束时间
              const duration = endTime - startTime; // 计算时间差
              document.getElementById('timingInfo').textContent = '生成图片耗时：' + (duration / 1000).toFixed(2) + ' 秒';

              if (imgElement.naturalWidth === 0 || imgElement.naturalHeight === 0) {
                document.getElementById('outputImage').style.display = 'none';
                document.getElementById('errorMessage').textContent = 'Error: 图片加载失败，请稍后再试';
              } else {
                document.getElementById('outputImage').src = imageUrl;
                closePop();
                document.getElementById('outputImage').style.display = 'block';
                document.getElementById('popContainer').style.display = 'block';
                document.getElementById('Textinput').textContent = inputText;
                document.getElementById('errorMessage').textContent = '';
              }
            };
            imgElement.onerror = function() {
              document.getElementById('outputImage').style.display = 'none';
              document.getElementById('errorMessage').textContent = 'Error: Error: 哎呀，出错啦！';
              URL.revokeObjectURL(imageUrl);
            };
            imgElement.src = imageUrl;
          } else {
            document.getElementById('outputImage').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Error: 服务繁忙，稍后再试哦~';
          }
        } catch (error) {
          document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        } finally {
          document.getElementById('generateButton').disabled = false;
          document.getElementById('generateButton').value = '生成图像';
        }
      } else {
        document.getElementById('inputText').style.animation = 'shake 0.5s';
        setTimeout(() => { document.getElementById('inputText').style.animation = ''; }, 500);
      }
    }

    function Select() {
        document.getElementById('popSelect').style.display = 'block';
    }

    function closePop() {
      document.getElementById('popContainer').style.display = 'none';
      document.getElementById('popSelect').style.display = 'none';

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
        imageUrl = null;
      }
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        generateImage();
      }
    });
  </script>
</body>
</html>
`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event)); // 注册事件监听器，当有请求到达时调用 handleRequest 函数处理请求
});

async function handleRequest(event) {
  const { request } = event; // 获取事件对象中的请求信息

  if (request.method === 'GET' && request.url.endsWith('/')) { // 如果是 GET 请求且 URL 以斜杠结尾
    return new Response(html, { // 返回 HTML 内容
      headers: {
        'Content-Type': 'text/html', // 设置响应头为 HTML 类型
      }
    });
  }

  if (request.method === 'OPTIONS') { // 如果是 OPTIONS 请求
    return new Response(null, { // 返回空响应
      headers: {
        'Access-Control-Allow-Origin': '*', // 允许跨域访问
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // 允许的请求方法
        'Access-Control-Allow-Headers': 'Content-Type', // 允许的请求头
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // 设置缓存控制
        'Pragma': 'no-cache', // 禁用缓存
        'Expires': '0' // 过期时间设置为 0
      }
    });
  } else if (request.method === 'POST' && request.url.endsWith('/api')) { // 如果是 POST 请求且 URL 以 /api 结尾
    const apiKey = '在这里输入你自己的API Key'; // API Key
    const data = await request.json(); // 解析请求中的 JSON 数据
    const inputText = data.text; // 获取输入文本
    const styleSelect = data.style; // 获取选择的样式
    let url; // 定义请求的 URL

    if (styleSelect === '1') { // 根据样式选择不同的 API
      url = 'https://api-inference.huggingface.co/models/waifu-diffusion/wd-1-5-beta3';
    } else if (styleSelect === '2') {
      url = 'https://api-inference.huggingface.co/models/alvdansen/littletinies';
    } else if (styleSelect === '3') {
      url = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
    } else { // 如果样式选择不合法
      return new Response('Requested range not satisfiable🤔', { status: 416 }); // 返回 416 状态码
    }

    url += `?timestamp=${new Date().getTime()}`; // 在 URL 中添加时间戳
    const randomId = Math.random().toString(36).substr(2, 9); // 生成一个长度为 9 的随机字符串作为请求 ID

    const bodyData = { // 构建请求体数据
      inputs: inputText,
      requestId: randomId,
      use_cache: true, // 不使用缓存
      wait_for_model: false // 等待模型准备好
    };

    try {
      console.log(`Selected style: ${styleSelect}, API URL: ${url}`); // 记录日志
      console.log(`Input text: ${inputText}`); // 记录日志
      const response = await fetch(url, { // 发起 API 请求
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`, // 设置授权头部
          'Content-Type': 'application/json', // 设置请求类型为 JSON
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // 缓存控制
          'Pragma': 'no-cache', // 禁用缓存
          'Expires': '0' // 过期时间设置为 0
        },
        body: JSON.stringify(bodyData) // 请求体为构建的请求体数据
      });

      if (!response.ok) { // 如果 API 请求失败
        console.error(`Error from API: ${response.status} ${response.statusText}`); // 记录错误日志
        return new Response('Error from API', { status: response.status }); // 返回 API 错误响应
      }

      const imageData = await response.blob(); // 获取 API 返回的图像数据

      console.log(`Received image blob of size: ${imageData.size} bytes`); // 记录日志
      const imageResponse = new Response(imageData, { // 构建图像响应
        headers: { 
          'Content-Type': 'image/jpeg', // 设置响应类型为 JPEG 图像
          'Access-Control-Allow-Origin': '*', // 允许跨域访问
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // 缓存控制
          'Pragma': 'no-cache', // 禁用缓存
          'Expires': '0' // 过期时间设置为 0
        }
      });

      return imageResponse; // 返回图像响应
    } catch (error) { // 捕获异常
      console.error('Error during fetch:', error); // 记录错误日志
      return new Response('Error during fetch', { status: 500 }); // 返回异常响应
    }
  }

  return new Response('404 Not Found😭', { status: 404 }); // 处理其他请求，返回 404 响应
}
