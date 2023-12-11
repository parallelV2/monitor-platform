import axios from 'axios';

export interface MessageRecord {
  id: string;
  type: 'notice' | 'error' | 'warning';
  content: string;
  read: boolean;
  title: string;
}
export type MessageListType = MessageRecord[];

export function queryMessageList() {
  return axios.get<MessageListType>('/messageList');
}

export function setMessageStatus(id: MessageRecord['id']) {
  return axios.put<MessageListType>(`/messageRead?id=${id}`);
}
