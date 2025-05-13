import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatComp from './components/chat/index.jsx';
// 导入setIframeDocument函数
import { setIframeDocument } from './components/chat/utils/mountComponent';

// 创建iframe并初始化聊天组件
function initialize(containerId, options = {}) {
  const { width = '300px', height = '520px' } = options;
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`容器元素 #${containerId} 未找到`);
    return;
  }
  
  // 创建iframe元素
  const iframe = document.createElement('iframe');
  
  // 添加所有需要的样式
  iframe.setAttribute('style', `
    outline: none !important;
    visibility: visible !important;
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
  `);
  
  // 移除旧的样式设置
  // iframe.style.frameborder = '0'; // 这个属性已经过时，使用border代替
  iframe.style.scrolling = 'no';
  
  // 将iframe添加到容器中
  container.appendChild(iframe);
  
  // 获取iframe的document
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // 设置iframe的document对象，以便mountComponent可以使用
  setIframeDocument(iframeDoc);
  
  // 写入基本HTML结构
  iframeDoc.open();
  iframeDoc.write(`
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
  iframeDoc.close();
  
  // 创建样式链接
  const linkElement = iframeDoc.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = options.cssPath || '../dist/ai-chat.css';
  iframeDoc.head.appendChild(linkElement);
  
  // 添加图标库
  const iconScript = iframeDoc.createElement('script');
  iconScript.src = '//g.alicdn.com/chatui/icons/2.6.2/index.js';
  iframeDoc.head.appendChild(iconScript);
  
  // 在iframe中渲染React组件
  const rootDiv = iframeDoc.getElementById('ai-chat-root');
  
  // 确保DOM已经准备好
  setTimeout(() => {
    try {
      const root = ReactDOM.createRoot(rootDiv);
      root.render(React.createElement(ChatComp, options));
      console.log('聊天组件在iframe中渲染成功');
    } catch (error) {
      console.error('在iframe中渲染组件时出错:', error);
    }
  }, 100);
  
  // 返回控制对象
  return {
    unmount: () => {
      try {
        ReactDOM.unmountComponentAtNode(rootDiv);
      } catch (error) {
        console.error('卸载组件时出错:', error);
      }
      container.removeChild(iframe);
    },
    getIframe: () => iframe
  };
}

// 确保在UMD模式下正确挂载到window对象
const AiChat = {
  initialize,
  ChatComp
};

// 如果是通过script标签加载，则挂载到window对象上
if (typeof window !== 'undefined') {
  window.AiChat = AiChat;
}

// 导出组件和初始化方法
export { ChatComp, initialize };

// 导出默认对象
export default AiChat;