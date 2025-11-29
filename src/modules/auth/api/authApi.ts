import axios from 'axios';
import type { AuthLoginPayload, AuthRegisterPayload } from '../../../typings/auth/authTypes';


const baseUrl = axios.create({
  baseURL: 'http://localhost:3000/auth',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const registerUserRequest = async (data: AuthRegisterPayload) => {
  const response = await baseUrl.post('/register', data);
  return response.data;
};


export const authLoginRequest = async (data: AuthLoginPayload) => {
  const response = await baseUrl.post('/login', data);
  return response.data;
};

export const authLogoutRequest = async () => {
  const response = await baseUrl.post('/logout');
  return response;
}

export const authCheckStatusRequest = async () => {
  const response = await baseUrl.post('/check-auth');
  return response;
}