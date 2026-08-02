import axios, { type AxiosInstance } from "axios";
import { API_URL } from "../../../config/api";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔁 REFRESH CLIENT                                                         ║
║                                                                          ║
║ Instancia dedicada solo para llamar a /auth/refresh. Vive separada de    ║
║ cualquier módulo de negocio para que el baseURL de refresh sea siempre   ║
║ /auth, sin importar qué instancia (product, sell, presentation...)       ║
║ haya disparado el 401 original.                                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const refreshClient = axios.create({
  baseURL: `${API_URL}/auth`,
  timeout: 5000,
  withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔁 ESTADO DE REFRESH COMPARTIDO                                           ║
║                                                                          ║
║ Vive a nivel de módulo, no por instancia: si product y sell reciben 401  ║
║ al mismo tiempo, ambas esperan al mismo refresh en curso en vez de       ║
║ disparar dos llamados a /refresh en paralelo.                            ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const refreshState = { isRefreshing: false };
const refreshQueue: Array<() => void> = [];

const processQueue = (): void => {
  while (refreshQueue.length > 0) {
    const resolve = refreshQueue.shift();
    resolve?.();
  }
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔁 attachRefreshInterceptor                                               ║
║                                                                          ║
║ Si una request falla con 401, intenta renovar el access_token vía        ║
║ /auth/refresh y reintenta la request original UNA sola vez. Si el        ║
║ refresh también falla, deja pasar el error (sesión terminada de verdad). ║
╚══════════════════════════════════════════════════════════════════════════╝*/
const attachRefreshInterceptor = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Evitamos loop infinito: si el que falló YA ES /refresh, o si esta
      // request ya fue reintentada una vez, no reintentamos de nuevo.
      const isRefreshCall = originalRequest?.url?.includes("/refresh");

      if (error.response?.status === 401 && !isRefreshCall && !originalRequest._retry) {
        originalRequest._retry = true;

        if (refreshState.isRefreshing) {
          // Ya hay un refresh en curso: esperamos a que termine y reintentamos.
          return new Promise((resolve) => {
            refreshQueue.push(() => resolve(instance(originalRequest)));
          });
        }

        refreshState.isRefreshing = true;

        try {
          await refreshClient.post("/refresh");
          refreshState.isRefreshing = false;
          processQueue();
          return instance(originalRequest);
        } catch (refreshError) {
          refreshState.isRefreshing = false;
          refreshQueue.length = 0;
          // refresh_token también venció/fue revocado: sesión terminada
          // de verdad. El error sube para que el thunk correspondiente
          // dispare logout().
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🏭 createHttpClient                                                       ║
║                                                                          ║
║ Crea una instancia de axios con el mismo shape que usaban los módulos    ║
║ (timeout, headers, withCredentials) más el interceptor de refresh        ║
║ enganchado automáticamente.                                              ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const createHttpClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return attachRefreshInterceptor(instance);
};