import type { HandleErrorWithActionProps } from "../../typings/ui/uiErrors";
import axios from "axios";
import { translateAuthError } from "./authErrorMessages";

export const handleError = (error: unknown ) => {

    if(!(error instanceof Error)) throw new Error('Something went wrong while login, retry please.');

    throw new Error(error.message);
      
}

export const handleErrorWithAction = ({error, dispatch,action} : HandleErrorWithActionProps ): void => {

    if (axios.isAxiosError(error)) {
      const serverMessage = (error.response?.data as { message?: string })?.message;
      const translatedMessage = translateAuthError(serverMessage);
      dispatch(action({ errorMessage: translatedMessage || "Error inesperado en el servidor" }));
      throw new Error(translatedMessage || error.message || "Error desconocido en la petición");
    }

    if (error instanceof Error) {
      dispatch(action({ errorMessage: error.message }));
      throw new Error(error.message);
    }
    
    dispatch(action({ errorMessage: "Something went wrong, retry please." }));
    throw new Error("Something went wrong, retry please.");
  
};