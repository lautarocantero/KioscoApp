import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { SellerFormValues, UseSellerFormPermissionsReturn } from "@typings/seller/sellerTypes";
import type { RootState } from "../../store/auth/authSlice";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

// Resuelve quién puede editar qué en el form de vendedor: nombre lo edita
// el propio vendedor o un admin (no cualquiera sobre cualquiera), email
// nunca se edita, rol es exclusivo de admin (del kiosco activo). Ver
// docs/features/sellerRoleAndAccountDeletion.md para el detalle completo.
export const useSellerFormPermissions = (isDetail: boolean, sellerId?: string): UseSellerFormPermissionsReturn => {
    const isAdmin = useIsActiveKioscoAdmin();
    const currentUserId = useSelector((state: RootState) => state.auth._id);
    const { t } = useTranslation();

    const isSelf = !!sellerId && sellerId === currentUserId;
    const canEditName = isAdmin || isSelf;

    const disabledFields: (keyof SellerFormValues)[] = [
        "email",
        ...(isAdmin ? [] : (["rol"] as const)),
        ...(canEditName ? [] : (["name"] as const)),
    ];

    const disabledFieldsTooltip: Partial<Record<keyof SellerFormValues, string>> = canEditName
        ? {}
        : { name: t("permissions.adminOnly") };

    return {
        isAdmin,
        disabledFields,
        disabledFieldsTooltip,
        showRoleBadge: !isDetail,
    };
};

export default useSellerFormPermissions;
