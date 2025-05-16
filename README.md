# 智能客服聊天应用

## 项目简介

这是一个基于 React 和 @chatui/core 开发的智能客服聊天应用。该应用提供了一个直观的聊天界面，支持多种消息类型的展示，包括文本、HTML 和 JSON 格式的消息。

## 技术栈

- React 18.2.0
- @chatui/core 3.0.0
- Vite 6.3.5
- ESLint

## 功能特点

1. 聊天界面

   - 支持发送文本消息
   - 支持接收多种格式的消息（文本、HTML、JSON）
   - 响应式设计，适配移动端

2. 消息类型

   - 文本消息：基础的文本对话
   - HTML 消息：支持富文本格式展示
   - JSON 消息：支持商品卡片等结构化数据展示

3. 交互功能
   - 实时消息发送和接收
   - 商品卡片的购买按钮交互
   - 操作反馈提示

## 快速开始

### 环境要求

- Node.js
- pnpm（推荐）或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 项目结构

```
ai-chat/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── chat/        # 聊天组件
│   ├── App.jsx         # 应用入口组件
│   ├── main.jsx        # 应用主入口
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置文件
```

## 注意事项

1. 当前项目使用 React 18.2.0 版本，这是为了确保与 @chatui/core 组件库的最佳兼容性
2. 项目中的消息响应目前使用 setTimeout 模拟，实际使用时应替换为真实的 API 调用
3. 确保正确配置了移动端视口以获得最佳的移动端体验

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交代码
4. 创建 Pull Request

## 许可证

MIT
