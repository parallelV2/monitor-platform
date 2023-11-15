import axios from 'axios';

export interface OptimizeParam {
  taskId: string;
  user: number;
}

export interface OptimizeTask {
  id: string;
  created: string;
  user: number;
  taskId: string;
  url: string;
  finished: string;
  status: 0 | 1 | 2;
}

export interface OptimizeTaskDetail {
  content: string;
}

export function createOptimizeTask(data: OptimizeParam) {
  return axios.post('/optimize', data);
}

export function getOptimizeTaskList() {
  return axios.get<OptimizeTask[]>('/optimize');
}

export function getOptimizeTaskDetail(id: string) {
  return axios.get<OptimizeTaskDetail>(`/optimize/${id}`);
}
