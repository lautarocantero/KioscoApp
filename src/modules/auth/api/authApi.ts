// # Módulo: Auth Requests  

// 🌐 Funciones 🌐
// - `authRegisterRequest`: envía los datos de registro de un nuevo usuario al endpoint `/register` y devuelve la respuesta.  
// - `authLoginRequest`: envía las credenciales de inicio de sesión al endpoint `/login` y devuelve la respuesta.  
// - `authLogoutRequest`: solicita el cierre de sesión del usuario actual al endpoint `/logout`.  
// - `authCheckStatusRequest`: verifica el estado de autenticación del usuario mediante el endpoint `/check-auth`.  

// 💽 Notas técnicas 💽
// - Base URL: `http://localhost:3000/auth`  
// - Cliente HTTP: `axios` con timeout de 5000ms  
// - Headers: `Content-Type: application/json`  
// - Usa `withCredentials: true` para manejar cookies/sesiones
//-----------------------------------------------------------------------------//

import axios from 'axios';
import type { AuthLoginApiPayload, AuthRegisterApiPayload } from '../../../typings/auth/authTypes';
import { API_URL } from '../../../config/api';

const baseUrl = axios.create({
  baseURL: `${API_URL}/auth`,
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
