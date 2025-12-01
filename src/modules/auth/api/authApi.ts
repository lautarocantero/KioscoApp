import axios from 'axios';
import type { AuthLoginApiPayload, AuthRegisterApiPayload } from '../../../typings/auth/authTypes';


const baseUrl = axios.create({
  baseURL: 'http://localhost:3000/auth',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const authRegisterRequest = async (data: AuthRegisterApiPayload) => {
  const response = await baseUrl.post('/register', data);
  return response.data;
};


export const authLoginRequest = async (data: AuthLoginApiPayload) => {
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