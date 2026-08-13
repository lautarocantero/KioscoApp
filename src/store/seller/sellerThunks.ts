import type { Dispatch } from "@reduxjs/toolkit";
import { z } from "zod";
import { handleError } from "../shared/handlerStoreError";
import type { Seller, CreateSellerPayload, EditSellerPayload } from "../../typings/seller/sellerTypes";
import type { SellerRol } from "../../typings/seller/sellerEnums";
import {
    startLoadingSellers,
    setSellers,
    resetSellers,
    setSelectedSeller,
    clearSelectedSeller,
    addSellerToList,
    updateSellerInList,
    removeSellerFromList,
    setSellerError,
} from "./sellerSlice";
import {
    getSellersRequest,
    getSellerByIdRequest,
    getSellerByNameRequest,
    getSellerByEmailRequest,
    getSellerByRolRequest,
    createSellerRequest,
    editSellerRequest,
    deleteSellerRequest,
} from "../../modules/shop/api/sellerApi";

export const CreateSellerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    rol: z.string().min(1),
    created_at: z.string().min(1),
    user_status: z.string().min(1),
});

export const EditSellerSchema = CreateSellerSchema.extend({
    _id: z.string().min(1),
});

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchSellersThunk                                                   ║
║ ⚙️  Trae el listado completo de vendedores.                            ║
╚══════════════════════════════════════════════════════════════════════*/
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
    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        if (!_id) {
            dispatch(setSellerError({ errorMessage: "No se ha proporcionado un _id." }));
            return;
        }
        try {
            const sellers = await getSellerByIdRequest(_id);
            return sellers;
        } catch (error: unknown) {
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

export const fetchSellerByRolThunk = (rol: SellerRol) => {
    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        try {
            const sellers = await getSellerByRolRequest(rol);
            dispatch(setSellers({ sellers }));
            return sellers;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo buscar por rol" }));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 createSellerThunk                                                   ║
║ ⚙️  Valida con zod, crea en backend y agrega el nuevo vendedor          ║
║     a la lista local sin refetch completo.                             ║
╚══════════════════════════════════════════════════════════════════════*/
export const createSellerThunk = (payload: CreateSellerPayload) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = CreateSellerSchema.safeParse(payload);
        if (!parsed.success) {
            dispatch(setSellerError({ errorMessage: "Los datos del vendedor no son válidos." }));
            return false;
        }

        try {
            const { _id } = await createSellerRequest(payload);
            dispatch(addSellerToList({ seller: { ...payload, _id } as unknown as Seller }));
            return true;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo crear el vendedor" }));
            handleError(error);
            return false;
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

export const deleteSellerThunk = (_id: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        if (!_id) {
            dispatch(setSellerError({ errorMessage: "No se ha proporcionado un _id." }));
            return false;
        }

        try {
            await deleteSellerRequest(_id);
            dispatch(removeSellerFromList({ _id }));
            return true;
        } catch (error: unknown) {
            dispatch(setSellerError({ errorMessage: "No se pudo eliminar el vendedor" }));
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