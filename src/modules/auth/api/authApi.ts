import axios from 'axios';

interface RegistroPayload {
  nombre: string;
  email: string;
  password: string;
  repeatPassword?: string; // opcional
}

const api = axios.create({
  baseURL: 'http://localhost:3000/auth',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export const registrarUsuario = async (data: RegistroPayload) => {
  const response = await api.post('/register', data);
  return response.data;
};