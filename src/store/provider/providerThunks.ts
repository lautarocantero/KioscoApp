import type { Dispatch } from "@reduxjs/toolkit";
import { handleError } from "../shared/handlerStoreError";
import type { CreateProviderBody, EditProviderBody, Provider, ProviderStats } from "../../typings/provider/providerTypes";
import {
    checkingProviders,
    setProviders,
    resetProviders,
    checkingCurrentProvider,
    setCurrentProviderError,
    setError,
    removeProvider,
    checkingStats,
    setStats,
    setStatsError,
} from "./providerSlice";
import {
    getProvidersRequest,
    getProviderByIdRequest,
    getProviderByNameRequest,
    getProviderStatsRequest,
    createProviderRequest,
    editProviderRequest,
    deleteProviderRequest,
} from "../../modules/providers/api/providerApi";
import { CreateProviderSchema, EditProviderSchema, DeleteProviderSchema } from "../../modules/providers/schema/ProviderSchema";

export const fetchProvidersThunk = () => {
    return async (dispatch: Dispatch): Promise<Provider[] | undefined> => {
        dispatch(resetProviders());
        dispatch(checkingProviders());
        try {
            const providers = await getProvidersRequest();
            dispatch(setProviders(providers));
            return providers;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron obtener los proveedores" }));
            handleError(error);
        }
    };
};

export const searchProvidersByNameThunk = (name: string) => {
    return async (dispatch: Dispatch): Promise<Provider[] | undefined> => {
        dispatch(checkingProviders());
        try {
            const providers = await getProviderByNameRequest(name);
            dispatch(setProviders(providers));
            return providers;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo buscar proveedores" }));
            handleError(error);
        }
    };
};

export const fetchProviderByIdThunk = (_id: string) => {
    return async (dispatch: Dispatch): Promise<Provider[] | undefined> => {
        if (!_id) {
            dispatch(setCurrentProviderError("No se ha proporcionado un _id."));
            return;
        }
        dispatch(checkingCurrentProvider());
        try {
            const providers = await getProviderByIdRequest(_id);
            return providers;
        } catch (error: unknown) {
            dispatch(setCurrentProviderError("No se pudo obtener el proveedor"));
            handleError(error);
        }
    };
};

export const fetchProviderStatsThunk = () => {
    return async (dispatch: Dispatch): Promise<ProviderStats | undefined> => {
        dispatch(checkingStats());
        try {
            const stats = await getProviderStatsRequest();
            dispatch(setStats(stats));
            return stats;
        } catch (error: unknown) {
            dispatch(setStatsError("No se pudo obtener los datos de proveedores"));
            handleError(error);
        }
    };
};

export const createProviderThunk = (body: CreateProviderBody) => {
    return async (dispatch: Dispatch): Promise<string | undefined> => {
        const parsed = CreateProviderSchema.safeParse(body);
        if (!parsed.success) {
            dispatch(setError({ errorMessage: "Los datos del proveedor no son válidos." }));
            return undefined;
        }

        try {
            const data = await createProviderRequest(body);
            return data._id;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo crear el proveedor" }));
            handleError(error);
            return undefined;
        }
    };
};

export const editProviderThunk = (body: EditProviderBody) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = EditProviderSchema.safeParse(body);
        if (!parsed.success) {
            dispatch(setCurrentProviderError("Los datos del proveedor no son válidos."));
            return false;
        }

        try {
            await editProviderRequest(body);
            return true;
        } catch (error: unknown) {
            dispatch(setCurrentProviderError("Error al actualizar el proveedor"));
            handleError(error);
            return false;
        }
    };
};

export const deleteProviderThunk = (_id: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        const parsed = DeleteProviderSchema.safeParse({ _id });
        if (!parsed.success) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un _id." }));
            return false;
        }

        try {
            await deleteProviderRequest(_id);
            dispatch(removeProvider(_id));
            return true;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo eliminar el proveedor" }));
            handleError(error);
            return false;
        }
    };
};
