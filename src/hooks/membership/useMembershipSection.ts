import { useNavigate } from "react-router-dom";
import type { UseMembershipSectionReturn } from "@typings/membership/membershipTypes";
import { useMembershipStatus } from "./useMembershipStatus";

// Toda la orquestación de la fila "plan actual + Cambiar plan" en
// Settings > Membresía: el .tsx solo recibe status/loading/error/goToPlans.
export const useMembershipSection = (): UseMembershipSectionReturn => {
    const navigate = useNavigate();
    const { status, loading, error } = useMembershipStatus();

    const goToPlans = (): void => { navigate("/membership/plans"); };

    return { status, loading, error, goToPlans };
};

export default useMembershipSection;
