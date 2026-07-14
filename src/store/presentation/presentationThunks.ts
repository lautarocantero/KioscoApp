// store/presentation/presentationThunks.ts
import type { Dispatch } from "@reduxjs/toolkit";
import type { CreatePresentationPayload, Presentation, PresentationFormValues } from "../../typings/presentation/presentationTypes";
import type { PresentationAnalyticsRaw } from "@typings/shared/types/useAnalytics.types";
import {
    startLoadingPresentations,
    setPresentations,
    setSelectedPresentation,
    removePresentationFromList,
    setError,
} from "./presentationSlice";
import { handleError } from "../shared/handlerStoreError";
import {
    getPresentationsByProductIdRequest,
    searchPresentationsByProductIdRequest,
    getPresentationByIdRequest,
    deletePresentationRequest,
    createPresentationRequest,
    editPresentationRequest,
    getPresentationAnalyticsRequest,
} from "../../modules/presentations/api/presentationsApi";

// ── listar por producto (tabla admin) ───────────────────────────────
export const fetchPresentationsByProductId = (product_id: string) => {
    return async (dispatch: Dispatch): Promise<Presentation[] | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            const presentations = await getPresentationsByProductIdRequest({ product_id });
            dispatch(setPresentations(presentations));
            return presentations;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron cargar las presentaciones" }));
            handleError(error);
        }
    };
};

// ── búsqueda por producto (tabla admin) ─────────────────────────────
export const searchPresentationsByProductId = (product_id: string, term: string) => {
    return async (dispatch: Dispatch): Promise<Presentation[] | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            const presentations = await searchPresentationsByProductIdRequest({ product_id, term });
            dispatch(setPresentations(presentations));
            return presentations;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo completar la búsqueda" }));
            handleError(error);
        }
    };
};

// ── traer una presentación puntual (form de edición, stock de analytics) ──
export const fetchPresentationById = (product_variant_id: string) => {
    return async (dispatch: Dispatch): Promise<Presentation | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            const result = await getPresentationByIdRequest({ product_variant_id });
            const presentation = Array.isArray(result) ? result[0] : result;
            if (!presentation) {
                dispatch(setError({ errorMessage: "No se ha encontrado la presentación" }));
                return undefined;
            }
            dispatch(setSelectedPresentation(presentation));
            return presentation;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo cargar la presentación" }));
            handleError(error);
        }
    };
};

// ── presentaciones de un producto (flujo de venta / carrito) — se mantiene igual, lo usa el hook de seller ──
export const getPresentationsById = (product_id: string) => {
    return async (dispatch: Dispatch): Promise<Presentation[] | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            const presentations = await getPresentationsByProductIdRequest({ product_id });
            if (!presentations) {
                dispatch(setError({ errorMessage: "No se ha encontrado ninguna variante del producto" }));
                throw new Error("No se encontraron productos que coincidan con el id " + product_id);
            }
            dispatch(setPresentations(presentations));
            return presentations;
        } catch (error: unknown) {
            handleError(error);
        }
    };
};

// ── crear ────────────────────────────────────────────────────────
// Nota: el backend solo devuelve { _id, message }, no la entidad completa,
// así que no la insertamos en la lista acá — el hook arma el "createdVariant"
// localmente, igual que hacía antes.
export const createPresentation = (data: CreatePresentationPayload) => {
    return async (dispatch: Dispatch): Promise<{ _id: string; message: string } | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            return await createPresentationRequest(data);
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al crear la presentación" }));
            handleError(error);
        }
    };
};

// ── editar ───────────────────────────────────────────────────────
export const editPresentation = (
    _id: string,
    values: Partial<PresentationFormValues>
) => {
    return async (dispatch: Dispatch): Promise<{ _id: string; message: string } | undefined> => {
        dispatch(startLoadingPresentations());
        try {
            return await editPresentationRequest({ _id, ...values });
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al actualizar la presentación" }));
            handleError(error);
        }
    };
};

// ── eliminar ─────────────────────────────────────────────────────
export const deletePresentation = (presentation_id: string) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        try {
            await deletePresentationRequest(presentation_id);
            dispatch(removePresentationFromList(presentation_id));
            return true;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al eliminar la presentación" }));
            handleError(error);
            return false;
        }
    };
};

// ── analíticas ───────────────────────────────────────────────────
// No toca el slice: es data transitoria propia de la página de analytics,
// no pertenece al listado global de presentaciones. Igual pasa por el thunk
// para centralizar manejo de errores (handleError) y ser consistente con el resto.
export const fetchPresentationAnalytics = (params: {
    presentation_id: string;
    start_date?: string;
    end_date?: string;
    seller_id?: string;
}) => {
    return async (_dispatch: Dispatch): Promise<PresentationAnalyticsRaw | undefined> => {
        try {
            return await getPresentationAnalyticsRequest(params);
        } catch (error: unknown) {
            handleError(error);
        }
    };
};