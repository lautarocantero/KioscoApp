import { useActiveKiosco } from "./useActiveKiosco";

// Reemplaza al viejo useIsAdmin (auth/useIsAdmin.ts): el rol ya no es
// global, es por-kiosco. Mismo shape de retorno para minimizar el diff
// en los call sites (form de vendedor, listado, botón "Agregar vendedor").
export const useIsActiveKioscoAdmin = (): boolean => {
    const { isAdmin } = useActiveKiosco();
    return isAdmin;
};

export default useIsActiveKioscoAdmin;
