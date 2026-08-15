import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { RootState } from "../../store/auth/authSlice";

// Único punto de verdad para "¿el usuario logueado es admin?". Lo consumen
// el form de edición de vendedor, el listado (gating del botón Eliminar) y
// el submit del form (si hay que pegarle también a /auth/edit-auth).
export const useIsAdmin = (): boolean => {
    const currentUserRole = useSelector((state: RootState) => state.auth.role);
    return currentUserRole === AuthRoleEnum.Admin;
};

export default useIsAdmin;
