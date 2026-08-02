import { setLogoutHandler } from "../../modules/shared/api/httpClient";
import { logout, type AppDispatch } from "../../store/auth/authSlice";
/*══════════════════════════════════════════════════════════════════════════╗
║ 🌉 authHttpBridge                                                         ║
║                                                                          ║
║ httpClient.ts vive fuera de Redux (en shared/api) para evitar            ║
║ dependencia circular (store → thunks → api → httpClient → store).        ║
║ Este puente es el ÚNICO lugar donde ambos mundos se conocen: recibe el   ║
║ dispatch del store ya creado y lo inyecta en httpClient mediante         ║
║ setLogoutHandler, para que un refresh fallido pueda limpiar el estado    ║
║ global sin que httpClient necesite importar Redux directamente.          ║
║                                                                          ║
║ Se llama UNA sola vez, apenas se crea el store.                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/



export const initAuthHttpBridge = (dispatch: AppDispatch): void => {
  setLogoutHandler(() => {
    dispatch(logout({ errorMessage: null }));
  });
};