import type { AuthErrorMessageMap } from "@typings/auth/authTypes";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗺️ authErrorMessages                                                      ║
║                                                                          ║
║ Mapea mensajes crudos del server (en inglés, tal cual los tira AuthModel) ║
║ a mensajes en español para mostrar al usuario. Provisorio hasta que se   ║
║ sume i18n. Las keys deben matchear EXACTO el string que devuelve el      ║
║ backend en response.data.message (se normaliza a lowercase/trim antes    ║
║ de buscar, así que la key acá también va en minúsculas).                 ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const authErrorMessages: AuthErrorMessageMap = {
  // ─── login ───
  "email does not exist": "El email no está registrado",
  "password is incorrect. make sure caps lock is off and try again.": "Contraseña incorrecta",
  "please verify your email before logging in": "Tenés que verificar tu email antes de iniciar sesión",

  // ─── register ───
  "name already exists": "Ya existe una cuenta con ese nombre de usuario",
  "email already exists": "Ya existe una cuenta con ese email",

  // ─── verify email ───
  "invalid verification token": "El link de verificación no es válido",
  "email is already verified": "Ese email ya fue verificado",
  "verification token has expired": "El link de verificación expiró",

  // ─── reset password ───
  "invalid reset token": "El link para restablecer la contraseña no es válido",
  "reset token has expired": "El link para restablecer la contraseña expiró",
  "passwords do not match": "Las contraseñas no coinciden",
};

export const translateAuthError = (serverMessage: string | undefined): string | undefined => {
  if (!serverMessage) return serverMessage;

  const normalized = serverMessage.trim().toLowerCase();
  return authErrorMessages[normalized] ?? serverMessage;
};