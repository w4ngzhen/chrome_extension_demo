/**
 * 在宿主页面每段时间发送一次消息，该消息，能在content_scripts上下文中被监听消费
 */
setInterval(() => {
  const msg = {
    type: "inject_msg:hello",
    data: "hello, this a message from host page.",
  };
  console.log("=== inject scripts in host page ===", "发送消息：", msg);
  window.postMessage(msg);
}, 1000);
