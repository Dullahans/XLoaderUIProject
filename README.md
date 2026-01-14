# XLoader Standalone Frontend

这是一个独立的前端工程，提取自 `client/public` 目录。它采用了 Vue 2 + Element UI 的单 HTML 文件架构，通过 CDN 加载依赖，非常适合轻量级部署和调试。

## 快速开始

### 1. 环境准备
确保您的电脑上安装了 [Node.js](https://nodejs.org/)。

### 2. 安装依赖
在当前目录下运行：
```bash
npm install
```

### 3. 开发运行
启动一个带有热更新功能的本地开发服务器：
```bash
npm run dev
```
启动后，浏览器会自动打开 `http://localhost:8080`。

### 4. 构建打包
如果您需要对代码进行压缩混淆，可以运行：
```bash
npm run build
```
构建后的文件将存放在 `dist` 目录下。

## 项目结构说明
- `index.html`: 主页面文件，包含所有 HTML、CSS 和 Vue 逻辑。
- `assets/`: 存放 SVG 图标。
- `img/`: 存放图片资源。
- `device_specs.json`: 设备规格定义。
- `model_dictionary.json`: 模型字典配置。
- `register_definitions.json`: 寄存器定义配置。

## 后端接口说明
本前端工程默认通过 `/api/*` 路径与后端进行通信。在开发模式下（`npm run dev`），如果需要连接到实际的调试后端（如 Python Bridge），您可以修改 `package.json` 中的 `dev` 脚本，添加代理配置。
