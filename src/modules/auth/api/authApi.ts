import axios from "axios";
import type { AuthGoogleApiPayload, AuthLoginApiPayload, AuthRegisterApiPayload } from "../../../typings/auth/authTypes";
import { API_URL } from "../../../config/api";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔓 CLIENTE SIN INTERCEPTOR DE REFRESH                                     ║
║                                                                          ║
║ Estos endpoints (login, register, google, logout, check-auth,           ║
║ verify-email) nunca dependen de un access_token vigente, así que no      ║
║ tiene sentido reintentarlos vía /refresh. Si se usa createHttpClient acá,║
║ un 401 de credenciales inválidas en /login dispara el interceptor de     ║
║ refresh, ese refresh también falla (no hay sesión), y el error que       ║
║ termina llegando al thunk es el del refresh fallido, no el del login.    ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const baseUrl = axios.create({
  baseURL: `${API_URL}/auth`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoints de registro, login, logout y validación de sesión activa.      ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ➕ authRegisterRequest                                                    ║
║                                                                          ║
║ Registra un nuevo usuario.                                               ║
║ POST /register                                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authRegisterRequest = async (data: AuthRegisterApiPayload) => {
  const response = await baseUrl.post("/register", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔓 authGoogleRequest                                                      ║
║                                                                          ║
║ Inicia sesión con Google usando el access_token del popup OAuth.         ║
║ POST /google                                                             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authGoogleRequest = async (data: AuthGoogleApiPayload) => {
  const response = await baseUrl.post("/google", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔑 authLoginRequest                                                       ║
║                                                                          ║
║ Inicia sesión con email y contraseña.                                    ║
║ POST /login                                                              ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authLoginRequest = async (data: AuthLoginApiPayload) => {
  const response = await baseUrl.post("/login", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🚪 authLogoutRequest                                                      ║
║                                                                          ║
║ Cierra la sesión activa.                                                 ║
║ POST /logout                                                             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authLogoutRequest = async () => {
  const response = await baseUrl.post("/logout");
  return response;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✅ authCheckStatusRequest                                                 ║
║                                                                          ║
║ Valida si hay una sesión activa a partir del refresh_token.              ║
║ POST /check-auth                                                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authCheckStatusRequest = async () => {
  const response = await baseUrl.post("/check-auth");
  return response;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📧 authVerifyEmailRequest                                                 ║
║                                                                          ║
║ Confirma el email de un usuario a partir del token recibido por mail.    ║
║ POST /verify-email                                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authVerifyEmailRequest = async (data: { token: string }) => {
  const response = await baseUrl.post("/verify-email", data);
  return response.data;
};