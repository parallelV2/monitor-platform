import axios from 'axios';
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

export function getGPTAnser(content: string, model: string) {
  return axios.post(
    `/v1/chat/completions`,
    {
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a Website performance analyst.',
        },
        {
          role: 'user',
          content,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${ENV.GPT_KEY}`,
        ContentType: 'application/json',
      },
      baseURL: ENV.GPT_API,
    }
  );
}
