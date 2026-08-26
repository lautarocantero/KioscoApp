import { useCallback, useEffect, useState } from "react";
import type { MembershipStatus, UseMembershipStatusReturn } from "@typings/membership/membershipTypes";
import { getMembershipStatusRequest } from "../../modules/membership/api/membershipApi";
import { useErrorParser } from "../shared/useErrorParser";

// Plan/estado de suscripción de la CUENTA autenticada (no del kiosco activo:
// un usuario paga un único plan que aplica a todos los kioscos donde
// participa). refetch() se usa en la página de resultado del checkout para
// reflejar el plan apenas el webhook de Mercado Pago lo actualiza.
export const useMembershipStatus = (): UseMembershipStatusReturn => {
    const [status, setStatus] = useState<MembershipStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const { message: error, parseError, clearError } = useErrorParser();

    const fetchStatus = useCallback((): void => {
        setLoading(true);
        clearError();

        getMembershipStatusRequest()
            .then((result) => setStatus(result))
            .catch((err: unknown) => parseError(err, "No se pudo obtener el estado de tu membresía"))
            .finally(() => setLoading(false));
    }, [parseError, clearError]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    return { status, loading, error, refetch: fetchStatus };
};

export default useMembershipStatus;
