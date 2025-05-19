window.addEventListener("message", (event) => {
  const msgType = event.data?.type;
  // 本模块下编译出的content_scripts.js运行在一个独立的上下文中，但是可以接受来自宿主页面的postMessage消息
  // 本示例，下方注入到宿主页面的content_scripts_inject.js中的脚本会在宿主页面上调用window.postMessage，
  if (msgType === "inject_msg:hello") {
    console.log(
      "=== content_scripts ===",
      'a message from "content_scripts_inject.js": ',
      event.data,
    );
  }
});

/**
 * content_scripts 虽然是独立的上下文，但是可以访问宿主页面的document
 * 因此，我们通过相关脚本，将另一个"content_scripts_inject"模块编译出的js脚本，通过appendChild方式“注入”到宿主页面
 */
const injectScripts = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  // 注意1：调用 chrome.runtime.getURL 来获取 放在插件中的相对位置的注入脚本路径
  // 注意2：确保 manifest.json 中关于 web_accessible_resources 字段的正确性
  script.src = chrome.runtime.getURL("content_scripts_inject.js");
  document.head.appendChild(script);
};

injectScripts();
