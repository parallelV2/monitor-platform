import { getLocalID } from '@/utils/auth';
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
  return axios.get<MessageListType>(`/api/msg/list?id=${getLocalID()}`);
}

export function setMessageStatus(id: MessageRecord['id']) {
  return axios.put<MessageListType>(`/api/msg?id=${id}`);
}
