import {
  CommunicationMessage,
  MessageClientId,
} from "../../_common/types/message";

type Port = chrome.runtime.Port;

export class MessageClient {
  private readonly _id: MessageClientId;
  private readonly _clientPort: Port;

  constructor(id: MessageClientId, port: Port, onDisconnect: () => void) {
    this._id = id;
    this._clientPort = port;
    this._clientPort.onMessage.addListener(this.onMessage);
    this._clientPort.onDisconnect.addListener(() => {
      this._clientPort.onMessage.removeListener(this.onMessage);
      onDisconnect();
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._clientPort.name;
  }

  postMessage(msg: CommunicationMessage) {
    this._clientPort.postMessage(msg);
  }

  onMessage(msg: CommunicationMessage) {
    console.log("Received message", msg);
  }

  disconnect() {
    this._clientPort.disconnect();
  }
}
