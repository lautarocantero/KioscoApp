import type { Dispatch } from "@reduxjs/toolkit";
import { handleError } from "../shared/handlerStoreError";
import type { Seller, SellerWithRole, EditSellerPayload } from "../../typings/seller/sellerTypes";
import {
    startLoadingSellers,
    stopLoadingSellers,
    setSellers,
    resetSellers,
    setSelectedSeller,
    clearSelectedSeller,
    updateSellerInList,
    setSellerError,
    removeSellerFromList,
} from "./sellerSlice";
import {
    getSellersRequest,
    getSellerByIdRequest,
    getSellerByNameRequest,
    getSellerByEmailRequest,
    editSellerRequest,
} from "../../modules/sellers/api/sellerApi";
import { removeKioscoMemberRequest } from "../../modules/kiosco/api/kioscoApi";
import { EditSellerSchema } from "../../modules/sellers/schema/SellerSchema";
import { RemoveKioscoMemberSchema } from "../../modules/kiosco/schema/KioscoMemberSchema";


export const fetchSellersThunk = () => {
    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        dispatch(resetSellers());
        dispatch(startLoadingSellers());
        try {
            const sellers = await getSellersRequest();
            dispatch(setSellers({ sellers }));
            return sellers;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudieron obtener los vendedores" }));
            handleError(error);
        }
    };
};

export const fetchSellerByIdThunk = (_id: string) => {
    return async (dispatch: Dispatch): Promise<SellerWithRole[] | undefined> => {
        if (!_id) {
            dispatch(setSellerError({ errorMessage: "No se ha proporcionado un _id." }));
            return;
        }
        dispatch(startLoadingSellers());
        try {
            const sellers = await getSellerByIdRequest(_id);
            dispatch(stopLoadingSellers());
            return sellers;
        } catch (error: unknown) {
            dispatch(stopLoadingSellers());
            dispatch(setSellerError({ errorMessage: "No se pudo obtener el vendedor" }));
            handleError(error);
        }
    };
};

export const fetchSellerByNameThunk = (name: string) => {
    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        try {
            const sellers = await getSellerByNameRequest(name);
            dispatch(setSellers({ sellers }));
            return sellers;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo buscar por nombre" }));
            handleError(error);
        }
    };
};

export const fetchSellerByEmailThunk = (email: string) => {
    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        try {
            const sellers = await getSellerByEmailRequest(email);
            dispatch(setSellers({ sellers }));
            return sellers;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo buscar por email" }));
            handleError(error);
        }
    };
};

export const editSellerThunk = (payload: EditSellerPayload) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = EditSellerSchema.safeParse(payload);
        if (!parsed.success) {
            dispatch(setSellerError({ errorMessage: "Los datos del vendedor no son válidos." }));
            return false;
        }

        try {
            await editSellerRequest(payload);
            dispatch(updateSellerInList({ seller: payload as unknown as Seller }));
            return true;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo editar el vendedor" }));
            handleError(error);
            return false;
        }
    };
};

export const selectSellerThunk = (seller: Seller | null) => {
    return (dispatch: Dispatch): void => {
        dispatch(setSelectedSeller({ seller }));
    };
};

export const clearSelectedSellerThunk = () => {
    return (dispatch: Dispatch): void => {
        dispatch(clearSelectedSeller());
    };
};

// Saca al vendedor del kiosco activo (no borra su cuenta global: puede
// seguir perteneciendo a otros kioscos). Solo admin del kiosco activo.
export const deleteSellerThunk = (kioscoId: string, _id: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = RemoveKioscoMemberSchema.safeParse({ kioscoId, userId: _id });
        if (!parsed.success) {
            dispatch(setSellerError({ errorMessage: "No se ha proporcionado un _id." }));
            return false;
        }

        try {
            await removeKioscoMemberRequest(kioscoId, _id);
            dispatch(removeSellerFromList({ _id }));
            return true;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo eliminar el vendedor" }));
            handleError(error);
            return false;
        }
    };
};