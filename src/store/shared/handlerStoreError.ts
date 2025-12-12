
// # Utilidades: Manejo de Errores (UI/Redux)  

// ## Descripción 📦  
// Conjunto de funciones para manejar errores en la aplicación.  
// Permiten capturar excepciones, generar mensajes claros y despachar acciones a Redux para actualizar el estado de error.  

// ## Funciones 🔧  

// ### handleError(error: unknown)  
// - Recibe un error genérico.  
// - Si no es instancia de `Error`, lanza un mensaje estándar:  
//   `"Something went wrong while login, retry please."`  
// - Si es un `Error`, relanza el mismo mensaje (`error.message`).  
// - Uso: casos simples donde no se requiere interacción con Redux.  

// ### handleErrorWithAction({ error, dispatch, action }: HandleErrorWithActionProps)  
// - Recibe un error, el `dispatch` de Redux y una acción para actualizar el estado.  
// - Flujo:  
//   1. **Error de Axios**:  
//      - Extrae `message` del servidor (`error.response?.data`).  
//      - Despacha la acción con `errorMessage`.  
//      - Lanza un nuevo `Error` con el mensaje del servidor o genérico.  
//   2. **Error estándar (instanceof Error)**:  
//      - Despacha la acción con `error.message`.  
//      - Relanza el mismo error.  
//   3. **Otro tipo de error**:  
//      - Despacha acción con mensaje genérico `"Something went wrong, retry please."`.  
//      - Lanza un nuevo `Error` con el mismo mensaje.  

// ## Notas técnicas 💽  
// - Centraliza la lógica de manejo de errores para evitar duplicación en componentes y thunks.  
// - Garantiza que siempre se despache un `errorMessage` al store, manteniendo consistencia en la UI.  
// - Escalabilidad: se pueden extender para manejar códigos de estado HTTP específicos o categorizar errores.  


import type { HandleErrorWithActionProps } from "../../typings/ui/uiErrors";
import axios from "axios";

export const handleError = (error: unknown ) => {

    if(!(error instanceof Error)) throw new Error('Something went wrong while login, retry please.');

    throw new Error(error.message);
      
}

export const handleErrorWithAction = ({error, dispatch,action} : HandleErrorWithActionProps ): void => {
  
    if (axios.isAxiosError(error)) {
      const serverMessage = (error.response?.data as { message?: string })?.message;
      dispatch(action({ errorMessage: serverMessage || "Error inesperado en el servidor" }));
      throw new Error(serverMessage || error.message || "Error desconocido en la petición");
    }

    if (error instanceof Error) {
      dispatch(action({ errorMessage: error.message }));
      throw new Error(error.message);
    }
    
    dispatch(action({ errorMessage: "Something went wrong, retry please." }));
    throw new Error("Something went wrong, retry please.");
  
};
