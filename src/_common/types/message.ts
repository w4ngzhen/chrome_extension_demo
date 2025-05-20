export interface CommunicationMessage<T = unknown> {
  type: string;
  data?: T;
}

export type MessageClientId = string;
