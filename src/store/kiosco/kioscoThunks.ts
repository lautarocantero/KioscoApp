import type { Dispatch } from "@reduxjs/toolkit";
import type { AuthRoleEnum } from "@typings/auth/authEnums";
import { handleError } from "../shared/handlerStoreError";
import type { CreateKioscoBody, JoinKioscoBody, Kiosco, KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import {
    createKioscoRequest,
    getMyKioscosRequest,
    joinKioscoRequest,
    selectKioscoRequest,
    updateKioscoMemberRoleRequest,
} from "../../modules/kiosco/api/kioscoApi";
import {
    clearKioscoError,
    setActiveKioscoId,
    setKioscoError,
    setMyKioscos,
    startLoadingKioscos,
} from "./kioscoSlice";
import { ACTIVE_KIOSCO_STORAGE_KEY } from "../../config/constants";
import { UpdateKioscoMemberRoleSchema } from "../../modules/kiosco/schema/KioscoMemberSchema";

export const fetchMyKioscosThunk = () => {
    return async (dispatch: Dispatch): Promise<KioscoWithStats[] | undefined> => {
        dispatch(startLoadingKioscos());
        try {
            const kioscos = await getMyKioscosRequest();
            dispatch(setMyKioscos({ kioscos }));
            return kioscos;
        } catch (error: unknown) {
            dispatch(setKioscoError({ errorMessage: "No se pudieron obtener tus kioscos" }));
            handleError(error);
        }
    };
};

export const createKioscoThunk = (payload: CreateKioscoBody) => {
    return async (dispatch: Dispatch): Promise<Kiosco | undefined> => {
        try {
            const { kiosco } = await createKioscoRequest(payload);
            dispatch(clearKioscoError());
            return kiosco;
        } catch (error: unknown) {
            dispatch(setKioscoError({ errorMessage: "No se pudo crear el kiosco" }));
            handleError(error);
        }
    };
};

export const joinKioscoThunk = (payload: JoinKioscoBody) => {
    return async (dispatch: Dispatch): Promise<Kiosco | undefined> => {
        try {
            const { kiosco } = await joinKioscoRequest(payload);
            dispatch(clearKioscoError());
            return kiosco;
        } catch (error: unknown) {
            dispatch(setKioscoError({ errorMessage: "Código de invitación inválido" }));
            handleError(error);
        }
    };
};

// Marca el kiosco como activo (state + localStorage) y avisa al back para
// que actualice "último acceso" — no bloquea la navegación si el back falla.
export const selectKioscoThunk = (kioscoId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(setActiveKioscoId({ kioscoId }));
        localStorage.setItem(ACTIVE_KIOSCO_STORAGE_KEY, kioscoId);
        try {
            await selectKioscoRequest(kioscoId);
        } catch (error: unknown) {
            handleError(error);
        }
    };
};

export const clearActiveKioscoThunk = () => {
    return (dispatch: Dispatch): void => {
        dispatch(setActiveKioscoId({ kioscoId: null }));
        localStorage.removeItem(ACTIVE_KIOSCO_STORAGE_KEY);
    };
};

// Nota: sacar a un vendedor del kiosco NO tiene su propio thunk acá — vive en
// deleteSellerThunk (store/seller/sellerThunks.ts), porque ese flujo también
// necesita actualizar sellerSlice (removeSellerFromList) además de kioscoSlice.

export const updateKioscoMemberRoleThunk = (kioscoId: string, userId: string, role: AuthRoleEnum) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = UpdateKioscoMemberRoleSchema.safeParse({ kioscoId, userId, role });
        if (!parsed.success) return false;

        try {
            await updateKioscoMemberRoleRequest(kioscoId, userId, { role });
            return true;
        } catch (error: unknown) {
            dispatch(setKioscoError({ errorMessage: "No se pudo actualizar el rol del vendedor" }));
            handleError(error);
            return false;
        }
    };
};
