import { useCallback, useEffect, useState } from "react";
import type { MembershipStatus, UseMembershipStatusReturn } from "@typings/membership/membershipTypes";
import { getMembershipStatusRequest } from "../../modules/membership/api/membershipApi";
import { useActiveKiosco } from "../kiosco/useActiveKiosco";
import { useErrorParser } from "../shared/useErrorParser";

// Plan/estado de suscripción del kiosco activo. refetch() se usa en la
// página de resultado del checkout para reflejar el plan apenas el webhook
// de Mercado Pago lo actualiza.
export const useMembershipStatus = (): UseMembershipStatusReturn => {
    const { activeKiosco } = useActiveKiosco();
    const [status, setStatus] = useState<MembershipStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const { message: error, parseError, clearError } = useErrorParser();

    const fetchStatus = useCallback((): void => {
        if (!activeKiosco) {
            setLoading(false);
            return;
        }

        setLoading(true);
        clearError();

        getMembershipStatusRequest()
            .then((result) => setStatus(result))
            .catch((err: unknown) => parseError(err, "No se pudo obtener el estado de tu membresía"))
            .finally(() => setLoading(false));
    }, [activeKiosco, parseError, clearError]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    return { status, loading, error, refetch: fetchStatus };
};

export default useMembershipStatus;
