const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:title" content="MQSI's AI Image Generator"/>
  <meta property="og:url" content="https://ai-draw.mqsi.xyz/"/>
  <meta property="og:image" content="https://mqsi.xyz/AI-Draw.jpg"/>
  <meta property="og:site_name" content="MQSI's Blog"/>
  <meta property="og:description" content="This site is MQSI's AI Image Generator"/>
  <meta name="copyright" content="© 2024 MQSI.">
  <title>MQSI's AI Image Generator</title>
  <link rel="icon" type="image/png" href="https://mqsi.xyz/img/avatar_huc38da640de171352ba7e18cefeb9be41_397833_300x0_resize_box_3.png">
  <style>
    body { font-family: Arial, sans-serif; text-align: center; background-color: #E3F2FD; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; }
    #container { min-width: 40%; max-width: 80%; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    footer { margin-top: 50px; padding: 0; text-align: left; color: rgb(110, 106, 145); }
    input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 3px; margin-top: 20px; margin-bottom: 10px; }
    input[type="button"] { background-color: rgb(247, 224, 165); color: rgb(120, 153, 188); font-weight: bolder; border: none; padding: 10px 0; border-radius: 5px; cursor: pointer; transition: background-color 0.1s ease; width: 100%; }
    input[type="button"]:hover { background-color: #FFC0CB; }
    site-footer { content: ""; display: block; height: 3px; width: 50px; background: #FFC0CB; margin-bottom: 20px; }
    footer a { text-decoration: none; color: rgb(243 169 219); font-weight: bolder; }
    pop { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: auto; background-color: rgba(247, 224, 165, 0.95); padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); z-index: 1000; }
    pop img { width: auto; max-width: 100%; max-height: 70vh; margin: 0 auto; }
    pop .close-btn { background-color: #FF4D4D; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; position: absolute; top: 10px; right: 10px; }
    @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(5px); } }
    @media (prefers-color-scheme: dark) { body { background-color: #333; } #container { background-color: #CDC1C5; } }
  </style>
</head>
<body>
  <div id="container">
    <h1>MQSI's AI Image Generator</h1>
    <div class="form-group">
      <label for="inputText">请在此输入你的描述（英文）</label>
      <input type="text" id="inputText" name="inputText" placeholder="例：Cirno playing by the Lake of Mist" />
      <input type="button" id="generateButton" value="生成图像" onclick="generateImage()" />
    </div>
    <p id="errorMessage" style="color: red;"></p>
    <pop id="popContainer">
      <button class="close-btn" onclick="closePop()">关闭</button>
      <p>图片预览</p>
      <p id="Textinput"></p>
      <br>
      <img id="outputImage" src="#" alt="Generated Image"/>
    </pop>
    <footer>
      <site-footer></site-footer>
      <p>©<a href="https://github.com/X-MQSI/" target="_blank"> MQSI </a>版权所有<br>服务由<a href="https://cloudflare.com/" target="_blank"> Cloudflare </a>提供<br>模型由<a href="https://huggingface.co/" target="_blank"> Hugging Face </a>驱动</p>
      Ver 0.0.2
    </footer>
  </div>
  <script>
    async function generateImage() {
      const inputText = document.getElementById('inputText').value.trim();
      if (inputText) {
        document.getElementById('generateButton').disabled = true;
        document.getElementById('generateButton').value = '正在生成，请稍后';
        try {
          const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
          });

          if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById('outputImage').src = imageUrl;
            document.getElementById('outputImage').style.display = 'block';
            document.getElementById('popContainer').style.display = 'block';
            document.getElementById('Textinput').textContent = inputText;
            document.getElementById('errorMessage').textContent = '';
          } else {
            document.getElementById('outputImage').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Error: Unable to generate image';
          }
        } catch (error) {
          document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        }
        document.getElementById('generateButton').disabled = false;
        document.getElementById('generateButton').value = '生成图像';
      } else {
        document.getElementById('inputText').style.animation = 'shake 0.5s';
        setTimeout(() => { document.getElementById('inputText').style.animation = ''; }, 500);
      }
    }

    function closePop() {
      document.getElementById('popContainer').style.display = 'none';
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
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const { request } = event;

  if (request.method === 'GET' && request.url.endsWith('/')) {
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      }
    });
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } else if (request.method === 'POST' && request.url.endsWith('/api')) {
    const apiKey = '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';
    const url = 'https://api-inference.huggingface.co/models/alvdansen/littletinies';

    const data = await request.json();
    const inputText = data.text;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: inputText })
    });

    const imageData = await response.blob();
    const imageResponse = new Response(imageData, {
      headers: { 'Content-Type': 'image/jpeg', 'Access-Control-Allow-Origin': '*' }
    });

    return imageResponse;
  }

  return new Response('Not Found', { status: 404 });
}
