import axios from "axios";
import type { AuthGoogleApiPayload, AuthLoginApiPayload, AuthRegisterApiPayload, AuthRequestPasswordResetApiPayload, AuthResetPasswordApiPayload } from "../../../typings/auth/authTypes";
import { API_URL } from "../../../config/api";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔓 CLIENTE SIN INTERCEPTOR DE REFRESH                                     ║
║                                                                          ║
║ Estos endpoints nunca dependen de un access_token vigente, así que no    ║
║ tiene sentido reintentarlos vía /refresh (ver fix del bug de login).     ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const baseUrl = axios.create({
  baseURL: `${API_URL}/auth`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const authRegisterRequest = async (data: AuthRegisterApiPayload) => {
  const response = await baseUrl.post("/register", data);
  return response.data;
};

export const authGoogleRequest = async (data: AuthGoogleApiPayload) => {
  const response = await baseUrl.post("/google", data);
  return response.data;
};

export const authLoginRequest = async (data: AuthLoginApiPayload) => {
  const response = await baseUrl.post("/login", data);
  return response.data;
};

export const authLogoutRequest = async () => {
  const response = await baseUrl.post("/logout");
  return response;
};

export const authCheckStatusRequest = async () => {
  const response = await baseUrl.post("/check-auth");
  return response;
};

export const authVerifyEmailRequest = async (data: { token: string }) => {
  const response = await baseUrl.post("/verify-email", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔁 authRequestPasswordResetRequest                                        ║
║                                                                          ║
║ Pide el link de reset por email.                                        ║
║ POST /request-password-reset                                             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authRequestPasswordResetRequest = async (data: AuthRequestPasswordResetApiPayload) => {
  const response = await baseUrl.post("/request-password-reset", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔁 authResetPasswordRequest                                               ║
║                                                                          ║
║ Aplica la nueva contraseña a partir del token recibido por mail.         ║
║ POST /reset-password                                                      ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authResetPasswordRequest = async (data: AuthResetPasswordApiPayload) => {
  const response = await baseUrl.post("/reset-password", data);
  return response.data;
};