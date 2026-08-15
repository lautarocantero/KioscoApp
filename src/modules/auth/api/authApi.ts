import axios from "axios";
import type { AuthDeleteAccountApiPayload, AuthEditRoleApiPayload, AuthGoogleApiPayload, AuthLoginApiPayload, AuthRegisterApiPayload, AuthRequestPasswordResetApiPayload, AuthRequestPasswordResetApiResponse, AuthResetPasswordApiPayload } from "../../../typings/auth/authTypes";
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
║ 🛠️ PUT                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🎭 authEditRoleRequest                                                    ║
║                                                                          ║
║ El rol vive en Auth, no en Seller (ver seller.controller). El back       ║
║ devuelve 403 si quien llama no es admin: acá solo pegamos, la protección ║
║ real es del servidor.                                                    ║
║ PUT /edit-auth                                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authEditRoleRequest = async (data: AuthEditRoleApiPayload) => {
  const response = await authenticatedUrl.put("/edit-auth", data);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ authDeleteAccountRequest                                              ║
║                                                                          ║
║ Elimina la identidad Y hace cascada a Seller en el back (transacción).   ║
║ Es el endpoint correcto para "eliminar un vendedor": DELETE /seller/     ║
║ delete-seller solo borra el perfil y deja el login huérfano. Solo admin  ║
║ (el back devuelve 403 si no).                                            ║
║ DELETE /delete-auth                                                      ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const authDeleteAccountRequest = async (data: AuthDeleteAccountApiPayload) => {
  const response = await authenticatedUrl.delete("/delete-auth", { data });
  return response.data;
};