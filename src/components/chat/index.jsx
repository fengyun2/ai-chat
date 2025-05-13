// 目前 @chatui/core toast 组件不兼容 react 19 版本，暂时降低版本为 react 18
// 引入组件
import Chat, {
  Bubble,
  useMessages,
  Button,
  Form,
  FormItem,
  FormActions,
  Input,
  RadioGroup,
  MessageStatus,
} from "@chatui/core";
// 引入样式
import "@chatui/core/dist/index.css";
import { useState, useRef } from "react";
import { toast } from "./utils/toast";
import "./style.scss";

// 初始化消息列表，添加欢迎语和常见问题
const initialMessages = [
  {
    type: "text",
    content: {
      text: "您好，我是智能客服助手，很高兴为您服务！有什么可以帮助您的吗？",
    },
    position: "left",
  },
  {
    type: "text",
    content: { text: "以下是常见问题，您可以点击或直接提问：" },
    position: "left",
  },
  {
    type: "quick-replies",
    content: {
      items: [
        { name: "如何退换商品？", text: "如何退换商品？" },
        { name: "物流配送时间", text: "物流配送时间" },
        { name: "支付方式有哪些？", text: "支付方式有哪些？" },
        { name: "如何修改订单？", text: "如何修改订单？" },
      ],
    },
  },
];

const App = () => {
  const { messages, appendMsg, updateMsg } = useMessages(initialMessages);
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const typingMsgId = useRef("");
  const [forceUpdate, setForceUpdate] = useState(0);

  function handleSend(type, val) {
    // 生成唯一ID用于标识消息
    if (type === "text" && val.trim()) {
      // 发送消息，初始状态为"发送中"
      typingMsgId.current = appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        status: "pending", // 设置状态为发送中
      });

      // 模拟服务器返回不同格式的消息
      setTimeout(() => {
        // 随机模拟成功或失败 (80%成功率)
        const isSuccess = false;
        if (isSuccess) {
          if (typingMsgId.current) {
            // 更新消息状态为成功
            updateMsg(typingMsgId.current, {
              type: "text",
              content: { text: val },
              position: "right",
              status: "sent", // 更新状态为发送成功
            });
          }
        } else {
          if (typingMsgId.current) {
            // 更新消息状态为失败
            updateMsg(typingMsgId.current, {
              type: "text",
              content: { text: val },
              position: "right",
              status: "fail", // 更新状态为发送失败
            });
          }
        }

        // 模拟回答结束
        typingMsgId.current = '';
        // 强制组件重新渲染
        setForceUpdate(prev => prev + 1);

        // HTML 格式消息
        // appendMsg({
        //   type: 'html',
        //   content: {
        //     html: '<div style="color: blue;">这是一条<strong>HTML</strong>格式的消息</div>'
        //   }
        // });

        // 延迟一秒后发送 JSON 格式消息
        // setTimeout(() => {
        //   appendMsg({
        //     type: 'json',
        //     content: {
        //       json: {
        //         title: '商品信息',
        //         price: '¥99.9',
        //         description: '这是一个示例商品'
        //       }
        //     }
        //   });
        // }, 1000);

        // Form 表单消息
        // setTimeout(() => {
        //   appendMsg({
        //     type: 'form',
        //     content: {
        //       form: {
        //         title: '用户信息',
        //         fields: [
        //           {
        //             name: 'username',
        //             label: '姓名',
        //             type: 'text',
        //             required: true
        //           },
        //           {
        //             name: 'sex',
        //             label: '性别',
        //             type: 'radio-group',
        //             options: [
        //               { label: '男', value: 'male' },
        //               { label: '女', value: 'female' }
        //             ],
        //           }
        //         ]
        //       }
        //     }
        //   })
        // }, 1000)
      }, 1000);
    }
  }

  // 处理消息重发
  function handleResend(msg) {
    if (msg.status === "failed") {
      // 删除失败消息
      // 注意：ChatUI没有直接提供删除消息的方法，这里我们通过重新发送来模拟
      handleSend("text", msg.content.text);

      // 提示用户
      toast.info("正在重新发送消息...");
    }
  }

  function buyNow() {
    toast.success("购买成功");
  }

  // 添加表单提交处理函数
  function handleFormSubmit(e) {
    if (e) e.preventDefault();
    if (!username) {
      toast.error("请输入姓名");
      return;
    }
    toast.success("提交成功");
    // 这里可以添加表单提交后的处理逻辑
    appendMsg({
      type: "text",
      content: { text: `表单提交成功！姓名：${username}，性别：${sex}` },
      position: "left",
    });

    // 清空表单
    setUsername("");
    setSex("");
  }

  // 添加表单取消处理函数
  function handleFormCancel() {
    setUsername("");
    setSex("");
    toast.info("已取消");
  }

  // 处理快速回复点击
  function handleQuickReplyClick(item) {
    handleSend("text", item.text);
  }

  function renderMessageContent(msg) {
    const { type, content, status } = msg;

    // 创建一个包装组件，用于显示消息状态
    const MessageWrapper = ({ children }) => {
      return (
        <div className="message-wrapper">
          {children}
          {status && status !== "sent" && (<p>xxxxx</p>)}
          {status && status !== "sent" && (
            <MessageStatus status={status} onClick={() => handleResend(msg)} />
          )}
        </div>
      );
    };

    switch (type) {
      case "text":
        return (
          <MessageWrapper>
            <Bubble content={content.text} />
          </MessageWrapper>
        );

      case "html":
        return (
          <MessageWrapper>
            <Bubble>
              <div dangerouslySetInnerHTML={{ __html: content.html }} />
            </Bubble>
          </MessageWrapper>
        );

      case "json":
        return (
          <MessageWrapper>
            <Bubble>
              <div style={{ padding: "8px" }}>
                <h4>{content.json.title}</h4>
                <p>价格：{content.json.price}</p>
                <p>{content.json.description}</p>
                <Button color="primary" onClick={buyNow}>
                  立即购买
                </Button>
              </div>
            </Bubble>
          </MessageWrapper>
        );

      case "form":
        return (
          <MessageWrapper>
            <Bubble>
              <div style={{ padding: "8px" }}>
                {content.form.title && <h4>{content.form.title}</h4>}
                <Form onSubmit={handleFormSubmit}>
                  {content.form.fields.map((field) => (
                    <FormItem
                      key={field.name}
                      label={field.label}
                      required={field.required}
                    >
                      {field.type === "text" && (
                        <Input
                          value={
                            field.name === "username"
                              ? username
                              : field.name === "sex"
                              ? sex
                              : ""
                          }
                          placeholder={`请输入${field.label}`}
                          onChange={
                            field.name === "username"
                              ? setUsername
                              : field.name === "sex"
                              ? setSex
                              : () => {}
                          }
                        />
                      )}
                      {field.type === "radio-group" && (
                        <RadioGroup
                          value={field.name === "sex" ? sex : ""}
                          onChange={field.name === "sex" ? setSex : () => {}}
                          options={field.options || []}
                        />
                      )}
                    </FormItem>
                  ))}
                  <FormActions>
                    <Button type="submit" color="primary">
                      提交
                    </Button>
                    <Button onClick={handleFormCancel}>取消</Button>
                  </FormActions>
                </Form>
              </div>
            </Bubble>
          </MessageWrapper>
        );
      case "quick-replies":
        return (
          <div className="quick-replies">
            {content.items.map((item, i) => (
              <Button
                key={i}
                onClick={() => handleQuickReplyClick(item)}
                className="quick-reply-btn"
                color="primary"
                size="sm"
              >
                {item.text}
              </Button>
            ))}
          </div>
        );

      default:
        return <Bubble content="不支持的消息类型" />;
    }
  }

  return (
    <>
      <Chat
        isX
        navbar={{
          title: "XPPEN智能客服",
          leftContent: {
            icon: "close",
            onClick: () => {
              console.log("点击了关闭按钮");
            },
          },
        }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </>
  );
};

export default App;
