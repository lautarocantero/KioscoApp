import { useEffect, useState } from "react";
import type { InviteInfo, UseKioscoInviteReturn } from "@typings/kiosco/kioscoTypes";
import { getInviteInfoRequest } from "../../modules/kiosco/api/kioscoApi";
import { useActiveKiosco } from "./useActiveKiosco";
import { useErrorParser } from "../shared/useErrorParser";

// Trae el código/link de invitación del kiosco activo (solo admin — el back
// devuelve 403 si no) y maneja el estado de "copiado" del botón.
export const useKioscoInvite = (open: boolean): UseKioscoInviteReturn => {
    const { activeKiosco } = useActiveKiosco();
    const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { message: error, parseError, clearError } = useErrorParser();

    useEffect(() => {
        if (!open || !activeKiosco) return;

        setLoading(true);
        clearError();
        setCopied(false);

        getInviteInfoRequest(activeKiosco._id)
            .then((info) => setInviteInfo(info))
            .catch((err: unknown) => parseError(err, "No se pudo obtener el código de invitación"))
            .finally(() => setLoading(false));
    }, [open, activeKiosco, parseError, clearError]);

    const handleCopy = (): void => {
        if (!inviteInfo) return;
        navigator.clipboard.writeText(inviteInfo.invite_link);
        setCopied(true);
    };

    return { inviteInfo, loading, error, copied, handleCopy };
};

export default useKioscoInvite;
