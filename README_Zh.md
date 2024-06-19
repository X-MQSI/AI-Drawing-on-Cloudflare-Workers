# 基于 Cloudflare Workers 的 AI 绘图

此脚本基于 Cloudflare Workers，通过 Cloudflare Workers 服务实现了一个简单的 AI 图像生成器。它提供了一个简单的 Web 界面，用户可以输入描述，脚本将其发送到 Hugging Face 模型，生成并展示对应的图像。  
[英文文档在这里](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/blob/main/README.md)

![image](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/assets/118874898/4974f241-1673-41c5-83b0-08b6fb9c7a21)


## 绘图模型

![image](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/assets/118874898/de5444d2-60ce-4e09-902b-2079fef74fe1)
预设了三个模型：  
- [wd-1-5-beta3](https://huggingface.co/waifu-diffusion/wd-1-5-beta3)
- [littletinies](https://huggingface.co/alvdansen/littletinies)
- [stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0?text=Cirno+wandering+through+the+forest)

这些模型都运行在 Hugging Face 的推理服务器上。  
您也可以添加其他 Hugging Face 绘图模型并对代码进行相应修改。

## 部署方法

1. 注册 [Cloudflare](https://www.cloudflare.com/) 账户。 
2. 创建 Workers 脚本：登录到 Cloudflare 账户后，进入 "Workers" 部分，创建一个新的 Workers 脚本。  
3. 复制 [worker.js](worker.js)：将此脚本粘贴到 Workers 编辑器中。  
4. 注册 [Hugging Face](https://huggingface.co/) 账户并配置账户 API 密钥。   
5. 将您的 Hugging Face API 密钥粘贴到脚本相应的位置。   

## 注意事项及免责声明

1. 确保部署的 Workers 脚本在部署时是有效的，并且有足够的资源来处理请求。  
2. 请注意不要滥用该服务，确保只将它用于合法和合适的用途。  
3. **责任限制**：使用此脚本需自行承担风险，作者不对脚本可能导致的任何事项负责。  
4. **合法使用**：请确保遵守所有适用的法律、法规和政策。   
5. **AI 创作**：本说明文档及部分代码由 AI 创作，请相关使用者注意。  

## 许可证

本项目根据 GPL-3.0 许可证授权-有关详细信息，请参阅 [LICENSE.md](LICENSE.md) 文件。  
保留署名权。  

## 鸣谢

- [Cloudflare-Workers-Proxy](https://github.com/ymyuuu/Cloudflare-Workers-Proxy/) 为本项目的 Web 界面设计提供了参考。  
- [Cloudflare Workers](https://cloudflare.com/) 提供了服务逻辑。  
- [Hugging Face](https://huggingface.co/) 驱动了绘图模型。

**********
MQSI  
2024/06/17
