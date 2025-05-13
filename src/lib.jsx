import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatComp from './components/chat/index.jsx';

// 导出初始化方法
function initialize(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`容器元素 #${containerId} 未找到`);
    return;
  }
  
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(ChatComp, options));
  
  return {
    unmount: () => root.unmount()
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