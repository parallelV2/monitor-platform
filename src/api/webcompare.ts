import axios from 'axios';
import { getLocalID } from '@/utils/auth';

export interface WebCompareParam {
  beforeUrl: string;
  afterUrl: string;
  optReport: boolean;
  screenshotSpan: number;
}

export interface WebCompareTask {
  id: string;
  created: string;
  user: number;
  beforeUrl: string;
  afterUrl: string;
  status: 0 | 1 | 2;
  finished: string;
}

export interface WebCompareDetail {
  imgs: {
    diff: string;
    shift: string;
    indicate: string;
  };
  pass: {
    diff: boolean;
    shift: boolean;
  };
}

export function createCompareTask(data: WebCompareParam) {
  return axios.post('/api/compare', { ...data, user: getLocalID() });
}

export function getCompareTaskList() {
  return axios.get<WebCompareTask[]>('/api/compare');
}

export function getCompareTaskDetail(id: string) {
  return axios.get<WebCompareDetail>(`/api/compare/${id}`);
}
