# Chrome Extension Demo

## Project structure 项目架构

- src/background ([background service worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers?hl=zh-cn#manifest) Scripts)
    - background.js
- src/content_scripts ([content_scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts?hl=zh-cn) Scripts)
    - content_scripts.js
- src/content_scripts_inject (Scripts injected into the host page)
    - content_scripts_inject.js
- src/devtools ([devtools UI](https://developer.chrome.google.cn/docs/extensions/reference/api/devtools/panels?hl=zh-cn))
    - devtools_portal.html + devtools_portal.js
    - devtools_panel.html + devtools_panel.js/css
    - devtools_sidebar.html + devtools_sidebar.js/css
- src/popup  ([action popup UI](https://developer.chrome.com/docs/extensions/develop/ui?hl=zh-cn#popups))
    - popup.html + popup.js/css