import { request } from './request';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function register(payload: RegisterPayload) {
  return await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function login(payload: LoginPayload) {
  return await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
