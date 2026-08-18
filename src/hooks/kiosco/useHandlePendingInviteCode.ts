import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus } from "@typings/auth/authEnums";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { fetchMyKioscosThunk, joinKioscoThunk } from "../../store/kiosco/kioscoThunks";
import { PENDING_INVITE_CODE_STORAGE_KEY } from "../../config/constants";

// Retoma el join que useJoinKioscoAccess dejó pendiente (código guardado en
// localStorage porque el usuario todavía no tenía cuenta). Corre una sola
// vez apenas la sesión pasa a Authenticated — éxito o error, el código se
// borra siempre para no reintentar en cada render.
export const useHandlePendingInviteCode = (): void => {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.auth.status);
    const handledRef = useRef(false);

    useEffect(() => {
        if (status !== AuthStatus.Authenticated || handledRef.current) return;

        const pendingCode = localStorage.getItem(PENDING_INVITE_CODE_STORAGE_KEY);
        if (!pendingCode) return;

        handledRef.current = true;
        localStorage.removeItem(PENDING_INVITE_CODE_STORAGE_KEY);

        dispatch(joinKioscoThunk({ invite_code: pendingCode })).then(() => {
            dispatch(fetchMyKioscosThunk());
        });
    }, [status, dispatch]);
};

export default useHandlePendingInviteCode;
