import type { HandleErrorWithActionProps } from "../../typings/ui/uiErrors";
import axios from "axios";
import { translateAuthError } from "./authErrorMessages";

export const handleError = (error: unknown ) => {

    if(!(error instanceof Error)) throw new Error('Something went wrong while login, retry please.');
    console.log(error)
    throw new Error(error?.message);

}

/*══════════ 🎮 extractAuthErrorMessage ══════════╗
║ 📥 Entrada: unknown (error capturado en un catch) ║
║ ⚙️ Proceso: si es AxiosError, saca el message del  ║
║    body y lo traduce con translateAuthError; si no, ║
║    usa error.message o un fallback genérico          ║
║ 📤 Salida: string                                    ║
╚═══════════════════════════════════════════════════════╝*/
export const extractAuthErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const serverMessage = (error.response?.data as { message?: string })?.message;
    return translateAuthError(serverMessage) || "Error inesperado en el servidor";
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong, retry please.";
};

export const handleErrorWithAction = ({error, dispatch, action} : HandleErrorWithActionProps ): void => {
  const message = extractAuthErrorMessage(error);
  dispatch(action({ errorMessage: message }));
  throw new Error(message);
};