import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateSellSanitizedPayloadInterface, DeleteSellByIdThunkInterface, EditSellSanitizedPayloadInterface, GetSellByIdThunkInterface, Sell } from "@typings/sells/sellTypes";
import { deleteSellRequest, getSellByIdRequest, getSellsRequest, getTodaySellsCountRequest, postSellRequest, putSellRequest, searchSellsRequest } from "../../modules/sells/api/sellApi";
import { handleError } from "../shared/handlerStoreError";
import { checkingSells, removeSell, setError, setSells, setCurrentSell, checkingTodaySells, setTodaySellsCount, setTodaySellsError } from "./sellSlice";

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const getSellsThunk = () => {
    return async (dispatch: Dispatch): Promise<Sell[] | undefined> => {
        dispatch(checkingSells());
        try {
            const sells: Sell[] = await getSellsRequest();

            if (!sells) {
                dispatch(setError({ errorMessage: "No se ha encontrado ninguna venta" }));
                throw new Error('No se encontraron ventas');
            }

            dispatch(setSells(sells));
            return sells;
        } catch (error: unknown) {
            handleError(error);
        }
    };
};

export const getSellByIdThunk = ({_id}: GetSellByIdThunkInterface) => {

    return async (dispatch: Dispatch) : Promise<Sell | undefined> => {
        dispatch(checkingSells());

        try {
            const sell: Sell[] = await getSellByIdRequest({_id});

            if(!sell) {
                dispatch(setError({ errorMessage: "No se ha encontrado la venta"}))
                throw new Error('No se encontraron ventas que concuerden con este ticket');
            }

            dispatch(setCurrentSell(sell[0]));
            return sell[0] as Sell;

        } catch (error: unknown) {
            handleError(error);
        }
    }
}

export const searchSellsThunk = (term: string) => {
    return async (dispatch: Dispatch): Promise<Sell[] | undefined> => {
        dispatch(checkingSells());
        try {
            const sells: Sell[] = await searchSellsRequest(term);
            dispatch(setSells(sells));
            return sells;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron buscar ventas" }));
            handleError(error);
        }
    };
};

export const getTodaySellsCountThunk = () => {
    return async (dispatch: Dispatch): Promise<{ count: number; lastSaleAt: string | null } | undefined> => {
        dispatch(checkingTodaySells());
        try {
            const stats = await getTodaySellsCountRequest();

            dispatch(setTodaySellsCount(stats));
            return stats;
        } catch (error: unknown) {
            dispatch(setTodaySellsError("No se pudo obtener los datos de ventas"));
            handleError(error);
        }
    };
};

//──────────────────────────────────────────── Post ───────────────────────────────────────────//

export const createSellThunk = ({data}: CreateSellSanitizedPayloadInterface) => {

    const {
        purchase_date,seller_id,seller_name,
        payment_method,products,sub_total,
        iva,total_amount,currency
    } = data;
    
    return async (dispatch: Dispatch) : Promise<string | undefined> => {
        try{
            const _id : string = await postSellRequest({
                purchase_date,
                seller_id,
                seller_name,
                payment_method,
                products,
                sub_total,
                iva,
                total_amount,
                currency
            })

            if(!_id) {
                throw new Error('Error durante el registro de la venta');
            }

            dispatch(setError({errorMessage: null}));
            return _id as string;

        } catch (error: unknown) {
            handleError(error);
        }
    }
}

//──────────────────────────────────────────── Put ───────────────────────────────────────────//

export const editSellThunk = ({ data }: EditSellSanitizedPayloadInterface) => {
    return async (dispatch: Dispatch): Promise<string | undefined> => {
        try {
            const response = await putSellRequest(data);

            if (!response?._id) {
                throw new Error('Error durante la edición de la venta');
            }

            dispatch(setCurrentSell(data as unknown as Sell));
            dispatch(setError({ errorMessage: null }));
            return response._id as string;
        } catch (error: unknown) {
            handleError(error);
        }
    };
};
    
//──────────────────────────────────────────── Delete ───────────────────────────────────────────//

export const deleteSellThunk = ({ _id }: DeleteSellByIdThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void | string> => {
        try {
            const response = await deleteSellRequest({ _id });
            if (!response) throw new Error('Error durante la eliminacion de la venta');

            dispatch(removeSell(_id));
            dispatch(setError({ errorMessage: null }));
            return response;
        } catch (error: unknown) {
            handleError(error);
        }
    };
};
    