import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { UseMembershipCheckoutResultReturn } from "@typings/membership/membershipTypes";
import { useMembershipStatus } from "./useMembershipStatus";
import { useIsActiveKioscoAdmin } from "../kiosco/useIsActiveKioscoAdmin";

// Toda la orquestación de /membership/checkout/result: el nombre del plan ya
// traducido y a qué mensaje/estado corresponde el status actual, resueltos
// acá para que el .tsx solo elija qué bloque de texto mostrar. `isAdmin`
// bloquea la página para un seller que entre por URL directa.
export const useMembershipCheckoutResult = (): UseMembershipCheckoutResultReturn => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAdmin = useIsActiveKioscoAdmin();
    const { status, loading, error, refetch } = useMembershipStatus();

    const planName = status ? t(`membership.plans.names.${status.plan}`) : "";
    const isActive = status?.plan_status === KioscoPlanStatusEnum.Active;
    const isCancelled = status?.plan_status === KioscoPlanStatusEnum.Cancelled;
    const goToShop = (): void => { navigate("/shop"); };

    return { status, loading, error, refetch, planName, isActive, isCancelled, goToShop, isAdmin };
};

export default useMembershipCheckoutResult;
