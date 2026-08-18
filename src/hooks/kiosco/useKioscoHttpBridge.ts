import { setActiveKioscoIdGetter } from "../../modules/shared/api/httpClient";
import type { RootState } from "../../store/auth/authSlice";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🌉 kioscoHttpBridge                                                       ║
║                                                                          ║
║ Mismo patrón que authHttpBridge (useLogoutHandler.ts): httpClient.ts vive ║
║ fuera de Redux, así que este puente le inyecta un getter de solo lectura  ║
║ sobre el store ya creado. Cada request de un cliente creado con           ║
║ createHttpClient adjunta el header x-kiosco-id leyendo el kiosco activo   ║
║ en el momento de la request (no un valor cacheado al armar el cliente).  ║
║                                                                          ║
║ Se llama UNA sola vez, apenas se crea el store.                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const initKioscoHttpBridge = (getState: () => RootState): void => {
  setActiveKioscoIdGetter(() => getState().kiosco.activeKioscoId);
};
