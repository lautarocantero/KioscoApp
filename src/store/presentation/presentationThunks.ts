import type { Dispatch } from "@reduxjs/toolkit";
import type { CreatePresentationBody, Presentation } from "../../typings/presentation/presentationTypes";
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchPresentationsByProductId                                       ║
║ 📥 Entrada: product_id                                                 ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /presentations por product_id (via presentationsApi)          ║
║   2. Guarda el resultado en store con setPresentations                 ║
║      (tabla admin de presentaciones de un producto)                    ║
║ 📤 Salida: Presentation[] o undefined en caso de error                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 searchPresentationsByProductId                                      ║
║ 📥 Entrada: product_id, term (texto a buscar)                          ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /presentations/search por product_id + term                   ║
║   2. Guarda el resultado en store con setPresentations                 ║
║      (misma tabla admin, resultado filtrado)                           ║
║ 📤 Salida: Presentation[] o undefined en caso de error                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchPresentationById                                               ║
║ 📥 Entrada: product_variant_id                                         ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /presentations/:product_variant_id                            ║
║   2. La API puede devolver un array o el objeto solo; se normaliza     ║
║      tomando el primer elemento si vino como array                     ║
║   3. Si no hay presentación, despacha error y devuelve undefined       ║
║      sin lanzar excepción (se maneja como "no encontrado", no fallo)   ║
║   4. Si existe, la guarda en store con setSelectedPresentation         ║
║      (usado por el form de edición y por analytics)                    ║
║ 📤 Salida: Presentation o undefined en caso de error/no encontrado     ║
╚══════════════════════════════════════════════════════════════════════╝*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getPresentationsById                                                ║
║ ⚠️  Nota: se mantiene separado de fetchPresentationsByProductId porque ║
║     lo usa el flujo de venta / carrito (hook de seller), con su propio ║
║     manejo de "no encontrado" (throw en vez de solo error de store).   ║
║ 📥 Entrada: product_id                                                 ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /presentations por product_id (misma request que arriba)      ║
║   2. Si no hay resultado, despacha error y lanza excepción             ║
║      (a diferencia del resto, acá sí se relanza el error)              ║
║   3. Guarda el resultado en store con setPresentations                 ║
║ 📤 Salida: Presentation[] o undefined en caso de error                 ║
╚══════════════════════════════════════════════════════════════════════╝*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 createPresentation                                                  ║
║ 📥 Entrada: body con los campos de la presentación                     ║
║ ⚙️  Proceso:                                                            ║
║   1. POST /presentations/create (via presentationsApi)                 ║
║   2. El backend solo devuelve { _id, message }, no la entidad completa;║
║      no se inserta en la lista acá — el hook arma el "createdVariant"  ║
║      localmente con los datos que ya tiene en el form                  ║
║ 📤 Salida: { _id, message } o undefined en caso de error               ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const createPresentation = (data: CreatePresentationBody) => {
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 editPresentation                                                    ║
║ 📥 Entrada: presentación parcial con _id + los valores editados        ║
║ ⚙️  Proceso:                                                            ║
║   1. PATCH /presentations/:_id (via presentationsApi)                  ║
║   2. El backend solo devuelve { _id, message }, no la Presentation     ║
║      completa, así que reconstruimos el objeto con lo que ya          ║
║      teníamos en el store (selectedPresentation) + los campos nuevos  ║
║   3. Guarda el resultado en selectedPresentation                       ║
║ 📤 Salida: Presentation actualizada o undefined en caso de error       ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const editPresentation = (body: Partial<Presentation> & Pick<Presentation, "_id">) => {
    return async (
        dispatch: Dispatch,
        getState: () => { presentation: { selectedPresentation: Presentation | null } }
    ): Promise<Presentation | undefined> => {
        dispatch(startLoadingPresentations());

        try {
            const previous = getState().presentation.selectedPresentation;

            const fullBody = {
                ...previous,
                ...body,
                updated_at: new Date().toISOString(),
                created_at: previous?.created_at ?? body.created_at ?? new Date().toISOString(),
            };

            await editPresentationRequest(fullBody);

            const updated: Presentation = { ...(previous as Presentation), ...fullBody };
            dispatch(setSelectedPresentation(updated));
            return updated;

        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al actualizar la presentación" }));
            handleError(error);
            throw error; // mismo motivo que en editProduct
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 deletePresentation                                                  ║
║ 📥 Entrada: presentation_id                                            ║
║ ⚙️  Proceso:                                                            ║
║   1. DELETE /presentations/:presentation_id                            ║
║   2. Saca la presentación de la lista en store sin necesidad de refetch║
║ 📤 Salida: boolean (true si se eliminó correctamente)                  ║
╚══════════════════════════════════════════════════════════════════════╝*/
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

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchPresentationAnalytics                                          ║
║ ⚠️  Nota: no toca el slice — es data transitoria propia de la página   ║
║     de analytics, no pertenece al listado global de presentaciones.    ║
║     Igual pasa por el thunk para centralizar manejo de errores          ║
║     (handleError) y ser consistente con el resto de las acciones.      ║
║ 📥 Entrada: presentation_id, start_date?, end_date?, seller_id?        ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /presentations/analytics con los params dados                 ║
║ 📤 Salida: PresentationAnalyticsRaw o undefined en caso de error       ║
╚══════════════════════════════════════════════════════════════════════╝*/
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