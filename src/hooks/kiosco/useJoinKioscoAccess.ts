import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthStatus } from "@typings/auth/authEnums";
import type { RootState } from "../../store/auth/authSlice";
import { PENDING_INVITE_CODE_STORAGE_KEY } from "../../config/constants";

// Sin cuenta no hay forma de unirse a un kiosco: si alguien abre el link de
// invitación deslogueado, guardamos el código y lo mandamos a crear cuenta
// (o loguearse). useHandlePendingInviteCode retoma el join apenas autentica.
export const useJoinKioscoAccess = (): { isChecking: boolean } => {
    const status = useSelector((state: RootState) => state.auth.status);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (status !== AuthStatus.NotAuthenticated) return;

        const code = searchParams.get("code");
        if (code) localStorage.setItem(PENDING_INVITE_CODE_STORAGE_KEY, code);
        navigate("/register");
    }, [status, searchParams, navigate]);

    return { isChecking: status === AuthStatus.Checking };
};

export default useJoinKioscoAccess;
