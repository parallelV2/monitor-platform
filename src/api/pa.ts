import axios from 'axios';
import { getLocalID } from '@/utils/auth';
import { Restful } from '@/types/global';

export interface PAParam {
  url: string;
  errorDetect: boolean;
  optReport: boolean;
  timeout: number;
}

export interface PATask {
  id: string;
  taskID: string;
  created: string;
  user: number;
  url: string;
  status: 0 | 1 | 2;
  finished: string;
}

export interface PATaskDetail {
  puppeteer: Record<string, { label: string; value: number }>;
  lighthouse: Record<
    string,
    { title: string; value: string; description: string }
  >;
}

export function createAnalyzeTask(data: PAParam) {
  return axios.post('/api/pa', { ...data, user: getLocalID() });
}

export function getAnalyzeTaskList() {
  return axios.get<Restful<PATask[]>>(`/api/pa?user=${Number(getLocalID())}`);
}

export function getAnalyzeTaskDetail(id: string) {
  return axios.get<Restful<PATaskDetail>>(`/api/pa/${id}`);
}
