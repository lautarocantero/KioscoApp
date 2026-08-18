import type { SellerFormValues, UseSellerFormPermissionsReturn } from "@typings/seller/sellerTypes";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

// Resuelve quién puede editar qué en el form de vendedor: nombre es libre,
// email nunca se edita, rol es exclusivo de admin (del kiosco activo). Ver
// docs/features/sellerRoleAndAccountDeletion.md para el detalle completo.
export const useSellerFormPermissions = (isDetail: boolean): UseSellerFormPermissionsReturn => {
    const isAdmin = useIsActiveKioscoAdmin();

    const disabledFields: (keyof SellerFormValues)[] = isAdmin ? ["email"] : ["email", "rol"];

    return {
        isAdmin,
        disabledFields,
        showRoleBadge: !isDetail,
    };
};

export default useSellerFormPermissions;
