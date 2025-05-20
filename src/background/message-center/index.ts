import { MessageClient } from "./client";
import { PORT_FOR_MSG_CENTER_KEY } from "../../_common/constants/message";
import { uuid } from "../../_common/utils/uuid";
import { MessageClientId } from "../../_common/types/message";

/**
 * 在background后台运行的消息中心
 * 用于作为 宿主页面、content_scripts 和 devtools、popup的消息中间桥梁
 */
class MessageCenter {
  /**
   * 存放所有链接至当前消息中心的长链接客户端
   * @private
   */
  private _clients: Record<MessageClientId, MessageClient> = {};

  start() {
    chrome.runtime.onConnect.addListener((port) => {
      if (!port.name?.startsWith(PORT_FOR_MSG_CENTER_KEY)) {
        return;
      }
      const clientId = this.generateClientId();
      const client = new MessageClient(clientId, port, () => {
        delete this._clients[clientId];
        console.log(`[${clientId}] disconnected`);
      });
      this._clients[clientId] = client;
      client.postMessage({ type: "connected" });
    });
  }

  shutdown() {
    Object.keys(this._clients).forEach((clientId) => {
      try {
        this._clients[clientId].disconnect();
      } catch (e) {}
      delete this._clients[clientId];
    });
  }

  generateClientId(): MessageClientId {
    return "client@" + uuid();
  }
}

export const messageCenterInstance: MessageCenter = new MessageCenter();
