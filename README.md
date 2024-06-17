# AI-Drawing-on-Cloudflare-Workers  

这是一个基于 Cloudflare Workers 的脚本，通过 Cloudflare Workers 服务简单实现了一个AI图像生成器，并提供了简单的Web界面，用户可以输入描述，脚本将其发送到Hugging Face模型，生成对应图像并展示给用户。  

![image](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/assets/118874898/0bc352f5-9381-4583-aad4-b8eeb5e77a01)  

## 绘图模型  

- 默认模型：[littletinies](https://huggingface.co/alvdansen/littletinies)  

该模型由[Minta K](https://huggingface.co/alvdansen/activity/likes)提供，运行于[Hugging Face](https://huggingface.co/)的Inference API之上。  
您也可以在Hugging Face选择其他绘图模型并对代码进行修改。  

## 部署方法  

1. 注册 [Cloudflare](https://www.cloudflare.com/) 账户。 
2. 创建 Workers 脚本：登录到 Cloudflare 账户后，进入 "Workers" 部分，创建一个新的 Workers 脚本。  
3. 复制 [worker.js](worker.js) ：将本脚本粘贴到 Workers 编辑器中。  
4. 注册 [Hugging Face](https://huggingface.co/) 账户并配置账户API密钥。   
5. 将您所得的Hugging Face API密钥粘贴到脚本相应的位置。  

## 鸣谢  

- [Cloudflare-Workers-Proxy](https://github.com/ymyuuu/Cloudflare-Workers-Proxy/) 为本项目的Web界面设计提供了参考。  
- [Cloudflare Workers](https://cloudflare.com/) 提供了服务逻辑。  
- [Hugging Face](https://huggingface.co/) 驱动了绘图模型。  

## 注意事项及免责声明  

1. 请确保部署的 Workers 脚本在部署时是有效的，并且有足够的资源来处理请求。  
2. 请注意不要滥用该服务，确保只将它用于合法和合适的用途。  
3. **责任限制**：使用此脚本需自行承担风险，作者不对脚本可能导致的任何事项负责。  
4. **合法使用**：请确保遵守所有适用的法律、法规和政策。   
5. **AI创作**：本说明文档及部分代码由AI创作，请相关使用者注意。  

## 许可证

本项目根据GPL-3.0许可证授权-有关详细信息，请参阅[LICENSE.md](LICENSE.md)文件。  
保留署名权。  

MQSI
2024/06/17
