import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import type { SSOUserData } from '@/types/user';
import { ENV } from '@/config';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface SSOLoginRes {
  token: string;
  user: SSOUserData;
}

export function login(ticket: string) {
  // TODO: 后续替换为后端接口，签发长效token
  return axios.get<SSOUserData>(`/user/validate`, {
    headers: {
      Authorization: `Bearer ${ticket}`,
    },
    baseURL: ENV.SSO_API,
  });
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo(id: number) {
  // TODO: 后续替换为后端接口，获取用户信息
  return axios.get<SSOUserData>(`/user/${id}`, {
    baseURL: ENV.SSO_API,
  });
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
