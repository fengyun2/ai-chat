import React from 'react';
import ReactDOM from 'react-dom';

// 创建一个全局变量来存储iframe的document对象
let iframeDocument = null;

// 设置iframe的document对象
export function setIframeDocument(doc) {
  iframeDocument = doc;
}

export function mountComponent(Comp, root) {
  // 如果没有提供root，则尝试在iframe中查找，如果iframe也没有，则使用主文档
  if (!root) {
    if (iframeDocument) {
      root = iframeDocument.querySelector('#ai-chat-root');
    } else {
      root = document.querySelector('#ai-chat-root');
    }
  }
  console.log(' mountComponent root ===> ', root);

  // 如果仍然找不到root，则使用document.body作为后备选项
  if (!root) {
    console.warn('找不到#ai-chat-root元素，将使用document.body作为挂载点');
    root = iframeDocument ? iframeDocument.body : document.body;
  }

  const div = document.createElement('div');
  root.appendChild(div);

  const Clone = React.cloneElement(Comp, {
    onUnmount() {
      if (div) {
        ReactDOM.unmountComponentAtNode(div);
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }
    },
  });

  ReactDOM.render(Clone, div);

  return div;
}