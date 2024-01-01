import axios from 'axios';
import { getLocalID } from '@/utils/auth';

export interface OptimizeParam {
  taskId: string;
  gptVersion: string;
  url: string;
}

export interface OptimizeTask {
  id: string;
  created: string;
  user: number;
  taskId: string;
  url: string;
  finished: string;
  gptVersion: string;
  status: 0 | 1 | 2;
}

export interface OptimizeTaskDetail {
  content: string;
}

export function createOptimizeTask(data: OptimizeParam) {
  return axios.post('/api/optimize', { ...data, user: Number(getLocalID()) });
}

export function getOptimizeTaskList() {
  return axios.get<OptimizeTask[]>(
    `/api/optimize?user=${Number(getLocalID())}`
  );
}

export function getOptimizeTaskDetail(id: string) {
  return axios.get<OptimizeTaskDetail>(`/api/optimize/${id}`);
}
