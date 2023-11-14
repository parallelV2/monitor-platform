import axios from 'axios';

export interface WebCompareParam {
  beforeUrl: string;
  afterUrl: string;
  optReport: boolean;
  screenshotSpan: number;
  user: number;
}

export interface WebCompareTask {
  id: string;
  created: string;
  user: number;
  beforeUrl: string;
  afterUrl: string;
  status: 0 | 1 | 2;
}

export function createCompareTask(data: WebCompareParam) {
  return axios.post('/webcompare', data);
}

export function getCompareTaskList() {
  return axios.get<WebCompareTask[]>('/webcompare');
}
