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
  finished: string;
}

export interface WebCompareDetail {
  diff: string;
  shift: string;
  indicate: string;
}

export function createCompareTask(data: WebCompareParam) {
  return axios.post('/webcompare', data);
}

export function getCompareTaskList() {
  return axios.get<WebCompareTask[]>('/webcompare');
}

export function getCompareTaskDetail(id: string) {
  return axios.get<WebCompareDetail>(`/webcompare/${id}`);
}
