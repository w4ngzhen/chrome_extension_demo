/**
 * Devtools panel
 * 该panel出现在 开发者工具 - 与网络（network）所在同级tabs
 */
chrome.devtools.panels.create(
  "My Devtools Panel",
  "",
  "devtools_panel.html",
  (panel) => {
    // 示例：在面板顶部创建按钮（这个按钮不太好用，通常是在面板html中创建按钮UI）
    const btn = panel.createStatusBarButton(
      // 图片使用 56x24，其中左边28x24用于常规展示，右边28x24用于点击时
      // PS: 该API文档说是需要64x24，但在实际使用中发现28宽度才会居中
      "images/devtools/love_56x24.png",
      "example button",
      false,
    );
    btn.onClicked.addListener(() => {
      alert("你点击了按钮");
    });
  },
);

/**
 * Sidebar
 * 该Sidebar出现在 开发者工具 - 元素（elements）选择区域 - 样式所在面板的右侧
 */
chrome.devtools.panels.elements.createSidebarPane(
  "My Devtools Elements Sidebar",
  function (sidebar) {
    // 与下方的 sources Sidebar 共用一个devtools_sidebar.html，但通过query参数区分
    sidebar.setPage("devtools_sidebar.html?panel=elements");
  },
);

/**
 * 该Sidebar 出现在 开发者工具 - 源代码（sources） - 右侧折叠面板
 */
chrome.devtools.panels.sources.createSidebarPane(
  "My Devtools Sources Sidebar",
  function (sidebar) {
    // 与上方的 elements Sidebar 共用一个devtools_sidebar.html，但通过query参数区分
    sidebar.setPage("devtools_sidebar.html?type=sources");
  },
);
