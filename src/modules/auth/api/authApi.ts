import axios from "axios";
import type { AuthGoogleApiPayload, AuthLoginApiPayload, AuthRegisterApiPayload, AuthRequestPasswordResetApiPayload, AuthRequestPasswordResetApiResponse, AuthResetPasswordApiPayload } from "../../../typings/auth/authTypes";
import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";

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
║ 🔐 CLIENTE CON REFRESH (endpoints detrás de authMiddleware)               ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const authenticatedUrl = createHttpClient(`${API_URL}/auth`);

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
║ 🚧 BYPASS TEMPORAL (sin Resend pago): el backend devuelve el token       ║
║ directo en la respuesta en vez de mandarlo por mail. Cuando se           ║
║ reactive Resend, esta función vuelve a tipar la respuesta como un        ║
║ mensaje genérico sin token.                                              ║
║ POST /request-password-reset                                             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authRequestPasswordResetRequest = async (
  data: AuthRequestPasswordResetApiPayload
): Promise<AuthRequestPasswordResetApiResponse> => {
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

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ authDeleteAccountRequest                                              ║
║                                                                          ║
║ Self-service: borra la cuenta propia (Auth + Seller + membresías de      ║
║ kiosco en cascada, transacción en el back). El back deriva el _id de la  ║
║ sesión — ya no acepta uno en el body. Para "sacar a un vendedor de MI    ║
║ kiosco" (sin borrar su cuenta) usar removeKioscoMemberRequest en su      ║
║ lugar (@modules/kiosco/api/kioscoApi).                                   ║
║ DELETE /delete-auth                                                      ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authDeleteAccountRequest = async () => {
  const response = await authenticatedUrl.delete("/delete-auth");
  return response.data;
};