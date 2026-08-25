import { useNavigate } from "react-router-dom";
import type { UseMembershipSectionReturn } from "@typings/membership/membershipTypes";
import { useMembershipStatus } from "./useMembershipStatus";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

// Toda la orquestación de la fila "plan actual + Cambiar plan" en
// Settings > Membresía: el .tsx solo recibe status/loading/error/goToPlans.
// Membresía es 100% admin-only — es la base de la facturación del kiosco —
// así que `isAdmin` deja al .tsx reemplazar todo el contenido por un aviso
// para un seller, en vez de solo deshabilitar el botón de cambiar plan.
export const useMembershipSection = (): UseMembershipSectionReturn => {
    const navigate = useNavigate();
    const isAdmin = useIsActiveKioscoAdmin();
    const { status, loading, error } = useMembershipStatus();

    const goToPlans = (): void => { navigate("/membership/plans"); };

    return { status, loading, error, goToPlans, isAdmin };
};

export default useMembershipSection;
