// 引入组件
import Chat, { Bubble, useMessages, Button, toast } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';

const App = () => {
  const { messages, appendMsg } = useMessages([]);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      // 模拟服务器返回不同格式的消息
      setTimeout(() => {
        // HTML 格式消息
        appendMsg({
          type: 'html',
          content: {
            html: '<div style="color: blue;">这是一条<strong>HTML</strong>格式的消息</div>'
          }
        });

        // 延迟一秒后发送 JSON 格式消息
        setTimeout(() => {
          appendMsg({
            type: 'json',
            content: {
              json: {
                title: '商品信息',
                price: '¥99.9',
                description: '这是一个示例商品'
              }
            }
          });
        }, 1000);
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      
      case 'html':
        return (
          <Bubble>
            <div dangerouslySetInnerHTML={{ __html: content.html }} />
          </Bubble>
        );
      
      case 'json':
        return (
          <Bubble>
            <div style={{ padding: '8px' }}>
              <h4>{content.json.title}</h4>
              <p>价格：{content.json.price}</p>
              <p>{content.json.description}</p>
              <Button color='primary' onClick={() => {
                toast.success('购买成功');
              }}>立即购买</Button>
            </div>
          </Bubble>
        );
      
      default:
        return <Bubble content="不支持的消息类型" />;
    }
  }

  return (
    <Chat
      navbar={{ title: '智能助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
};

export default App;