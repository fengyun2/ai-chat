import React from "react";
import ReactDOM from "react-dom/client";
import ChatComp from "./components/chat/index.jsx";
// 导入setIframeDocument函数
import {
  setIframeDocument,
  setIconFrameDocument,
  setIconIframe
} from "./components/chat/utils/mountComponent";

import iconService from './assets/img/icon-service.png';

/**
 * 创建iframe并初始化聊天组件
 * @param {*} containerId
 * @param {*} options
 * @param {string} options.iconSrc 图标地址
 * @param {string} options.cssPath 样式地址
 * @param {string} options.width 宽度
 * @param {string} options.height 高度
 * @param {string} options.iconSize icon大小
 * @param {string} options.iconContainerSize icon容器大小
 * @param {string} options.title 标题
 * @param {string} options.avatar 头像
 * @param {string} options.welcomeMessage 欢迎语
 * @returns
 */
function initialize(containerId, options = {}) {
  const {
    width = "300px",
    height = "520px",
    iconSize = "24px",
    iconContainerSize = "48px",
  } = options;
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`容器元素 #${containerId} 未找到`);
    return;
  }

  // 创建图标iframe
  const iconIframe = document.createElement("iframe");
  iconIframe.className = "ai-chat-icon-frame";
  iconIframe.setAttribute(
    "style",
    `
    outline: none !important;
    resize: none !important;
    overflow: visible !important;
    background: none transparent !important;
    opacity: 1 !important;
    position: fixed !important;
    bottom: 20px;
    right: 20px;
    border: 0px !important;
    min-height: ${iconContainerSize} !important;
    min-width: ${iconContainerSize} !important;
    max-height: ${iconContainerSize} !important;
    max-width: ${iconContainerSize} !important;
    padding: 0px !important;
    margin: 0px !important;
    transition-property: none !important;
    transform: none !important;
    width: ${iconContainerSize} !important;
    height: ${iconContainerSize} !important;
    display: block !important;
    z-index: 999 !important;
    cursor: pointer !important;
    float: none !important;
    border-radius: 50% !important;
    pointer-events: auto !important;
    clip: auto !important;
    color-scheme: light !important;
  `
  );

  // 将图标iframe添加到容器中
  container.appendChild(iconIframe);
  setIconIframe(iconIframe);

  // 获取图标iframe的document
  const iconDoc =
    iconIframe.contentDocument || iconIframe.contentWindow.document;

  setIconFrameDocument(iconDoc);

  // 写入图标HTML结构
  iconDoc.open();
  iconDoc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI Chat Icon</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        
        .ai-chat-icon-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .ai-chat-icon-inner img {
          width: ${iconContainerSize} !important;
          height: ${iconContainerSize} !important;
          object-fit: contain !important;
        }
      </style>
    </head>
    <body>
      <div class="ai-chat-icon-inner">
        <img src="${options.iconSrc || iconService}" alt="AI Chat Icon" />
      </div>
    </body>
    </html>
  `);
  iconDoc.close();
  // 创建样式链接
  const linkElement = iconDoc.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = options.cssPath || "../dist/ai-chat.css";
  iconDoc.head.appendChild(linkElement);

  // 创建聊天iframe元素
  const chatIframe = document.createElement("iframe");

  // 添加所有需要的样式
  chatIframe.setAttribute(
    "style",
    `
    outline: none !important;
    visibility: hidden !important; /* 默认隐藏 */
    resize: none !important;
    box-shadow: rgba(0, 0, 0, 0.08) 10px 10px 40px 0px, rgba(26, 26, 26, 0.12) 5px 14px 80px 0px !important;
    overflow: visible !important;
    background: none transparent !important;
    opacity: 1 !important;
    inset: auto 20px 98px auto !important;
    position: fixed !important;
    border: 0px !important;
    min-height: ${height} !important;
    min-width: ${width} !important;
    max-height: ${height} !important;
    max-width: ${width} !important;
    padding: 0px !important;
    margin: 0px !important;
    transition-property: none !important;
    transform: none !important;
    width: ${width} !important;
    height: ${height} !important;
    display: block !important;
    z-index: 999 !important;
    cursor: auto !important;
    float: none !important;
    border-radius: 18px !important;
    pointer-events: auto !important;
    clip: auto !important;
    color-scheme: light !important;
  `
  );

  chatIframe.style.scrolling = "no";

  // 将聊天iframe添加到容器中
  container.appendChild(chatIframe);

  // 获取聊天iframe的document
  const chatDoc =
    chatIframe.contentDocument || chatIframe.contentWindow.document;

  // 设置iframe的document对象，以便mountComponent可以使用
  setIframeDocument(chatDoc);

  // 写入基本HTML结构
  chatDoc.open();
  chatDoc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI Chat</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        #ai-chat-root {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        /* 添加动画效果 */
        @keyframes tawkMaxOpen {
          0% {
            opacity: 0;
            transform: translate(0, 30px);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0px);
          }
        }
        
        .open {
          animation: tawkMaxOpen .25s ease !important;
        }
        
        /* 媒体元素样式 */
        audio, canvas, embed, iframe, img, object, svg, video {
          display: block;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      <div id="ai-chat-root" class="open"></div>
    </body>
    </html>
  `);
  chatDoc.close();

  // 创建样式链接
  const chatDocLinkElement = chatDoc.createElement("link");
  chatDocLinkElement.rel = "stylesheet";
  chatDocLinkElement.href = options.cssPath || "../dist/ai-chat.css";
  chatDoc.head.appendChild(chatDocLinkElement);

  // 添加图标库
  const iconScript = chatDoc.createElement("script");
  iconScript.src = "//g.alicdn.com/chatui/icons/2.6.2/index.js";
  chatDoc.head.appendChild(iconScript);

  // 在iframe中渲染React组件
  const rootDiv = chatDoc.getElementById("ai-chat-root");

  // 确保DOM已经准备好
  setTimeout(() => {
    try {
      const root = ReactDOM.createRoot(rootDiv);
      root.render(React.createElement(ChatComp, options));
      console.log("聊天组件在iframe中渲染成功");
    } catch (error) {
      console.error("在iframe中渲染组件时出错:", error);
    }
  }, 100);

  // 添加图标点击事件
  let isOpen = false;
  iconIframe.contentWindow.document.body.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatIframe.style.visibility = "visible";
      // 添加打开动画
      rootDiv.classList.add("open");
      // 更改图标样式（可选）
      // iconIframe.contentWindow.document.body.style.transform = "scale(0.9)";
    } else {
      chatIframe.style.visibility = "hidden";
      rootDiv.classList.remove("open");
      // iconIframe.contentWindow.document.body.style.transform = "scale(1)";
    }
  });

  // 返回控制对象
  return {
    unmount: () => {
      try {
        ReactDOM.unmountComponentAtNode(rootDiv);
      } catch (error) {
        console.error("卸载组件时出错:", error);
      }
      container.removeChild(chatIframe);
      container.removeChild(iconIframe);
    },
    getIframe: () => chatIframe,
    toggle: () => {
      iconIframe.contentWindow.document.body.click(); // 触发点击事件来切换显示/隐藏
    },
    open: () => {
      if (!isOpen) {
        iconIframe.contentWindow.document.body.click();
      }
    },
    close: () => {
      if (isOpen) {
        iconIframe.contentWindow.document.body.click();
      }
    },
  };
}

// 确保在UMD模式下正确挂载到window对象
const AiChat = {
  initialize,
  ChatComp,
};

// 如果是通过script标签加载，则挂载到window对象上
if (typeof window !== "undefined") {
  window.AiChat = AiChat;
}

// 导出组件和初始化方法
export { ChatComp, initialize };

// 导出默认对象
export default AiChat;
