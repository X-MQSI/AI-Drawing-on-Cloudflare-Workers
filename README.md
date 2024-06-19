# AI Drawing on Cloudflare Workers

This script is based on Cloudflare Workers and implements a simple AI image generator via the Cloudflare Workers service. It provides a simple web interface where users can input descriptions, which the script then sends to a Hugging Face model to generate and display the corresponding image.  
[中文文档在这里](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/blob/main/README_Zh.md)

![image](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/assets/118874898/4974f241-1673-41c5-83b0-08b6fb9c7a21)


## Drawing Model

![image](https://github.com/X-MQSI/AI-Drawing-on-Cloudflare-Workers/assets/118874898/de5444d2-60ce-4e09-902b-2079fef74fe1)
Three models are preset:  
- [wd-1-5-beta3](https://huggingface.co/waifu-diffusion/wd-1-5-beta3)
- [littletinies](https://huggingface.co/alvdansen/littletinies)
- [stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0?text=Cirno+wandering+through+the+forest)

This model is all runs on the Hugging Face Inference Server.  
You can also add other drawing models from Hugging Face and modify the code accordingly.

## Deployment Instructions

1. Register for a [Cloudflare](https://www.cloudflare.com/) account. 
2. Create a Workers script: After logging into your Cloudflare account, go to the "Workers" section and create a new Workers script.  
3. Copy [worker.js](worker.js): Paste this script into the Workers editor.  
4. Register for a [Hugging Face](https://huggingface.co/) account and configure your account API key.   
5. Paste your Hugging Face API key into the appropriate place in the script.   

## Notes and Disclaimer

1. Ensure that the deployed Workers script is valid at the time of deployment and has sufficient resources to handle requests.  
2. Be careful not to abuse the service and ensure it is used only for legitimate and appropriate purposes.  
3. **Liability Limitation**: Use of this script is at your own risk, and the author is not responsible for any issues that may arise from its use.  
4. **Legal Use**: Ensure compliance with all applicable laws, regulations, and policies.   
5. **AI Creation**: This documentation and parts of the code were created by AI; please be aware of this when using it.  

## License

This project is licensed under the GPL-3.0 License - for more details, see the [LICENSE.md](LICENSE.md) file.  
Attribution rights reserved.  

## Acknowledgments

- [Cloudflare-Workers-Proxy](https://github.com/ymyuuu/Cloudflare-Workers-Proxy/) for providing a reference for the web interface design of this project.  
- [Cloudflare Workers](https://cloudflare.com/) for providing the service logic.  
- [Hugging Face](https://huggingface.co/) for powering the drawing model.

**********
MQSI  
2024/06/17
