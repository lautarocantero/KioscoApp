import type { AuthGoogleApiPayload, AuthLoginApiPayload, AuthRegisterApiPayload } from "../../../typings/auth/authTypes";
import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/auth`);

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