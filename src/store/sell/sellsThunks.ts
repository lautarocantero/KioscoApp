import type { Dispatch } from "@reduxjs/toolkit";
import type { CreateSellApiPayloadType, CreateSellResponse, CreateSellSanitizedPayloadInterface, DeleteSellByIdThunkInterface, EditSellRequestPayloadType, EditSellSanitizedPayloadInterface, GetSellByIdThunkInterface, Sell, SellTicketType, SettleSellDebtThunkInterface } from "@typings/sells/sellTypes";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import { deleteSellRequest, getSellByIdRequest, getSellsRequest, getTodaySellsCountRequest, postSellRequest, putSellRequest, searchSellsRequest } from "../../modules/sells/api/sellApi";
import { handleError } from "../shared/handlerStoreError";
import { checkingSells, removeSell, setError, setSells, setCurrentSell, checkingTodaySells, setTodaySellsCount, setTodaySellsError, setCurrentSellError, checkingCurrentSell } from "./sellSlice";

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const getSellsThunk = () => {
    return async (dispatch: Dispatch): Promise<Sell[] | undefined> => {
        dispatch(checkingSells());
        try {
            const sells: SellTicketType[] = await getSellsRequest();

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
    return async (dispatch: Dispatch): Promise<Sell | undefined> => {
        dispatch(checkingCurrentSell());

        try {
            const sell: SellTicketType[] = await getSellByIdRequest({_id});

            if (!sell) {
                dispatch(setCurrentSellError("No se ha encontrado la venta"));  // 👈 también corregir esto
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
            const sells: SellTicketType[] = await searchSellsRequest(term);
            dispatch(setSells(sells));
            return sells;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron buscar ventas" }));
            handleError(error);
        }
    };
};

export const getTodaySellsCountThunk = () => {
    return async (dispatch: Dispatch): Promise<{ count: number; lastSaleAt: string | null; totalAmount: number } | undefined> => {
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
        purchase_date, seller_id, seller_name,
        payment_method, products, sub_total,
        iva, total_amount, currency,
        status, amount_paid, debtor_name
    } = data;
    
    return async (dispatch: Dispatch): Promise<CreateSellResponse | undefined> => {
        try {
            const response: CreateSellResponse = await postSellRequest({
                purchase_date,
                seller_id,
                seller_name,
                payment_method,
                products,
                sub_total,
                iva,
                total_amount,
                currency,
                status,
                amount_paid,
                debtor_name
            });

            if (!response?._id) {
                throw new Error('Error durante el registro de la venta');
            }

            dispatch(setError({errorMessage: null}));
            return response;

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

            dispatch(setCurrentSell(data as unknown as SellTicketType));
            dispatch(setError({ errorMessage: null }));
            return response._id as string;
        } catch (error: unknown) {
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 💰 settleSellDebtThunk                                                    ║
║                                                                            ║
║ Salda una venta parcial en dos pasos:                                    ║
║   1. Crea una segunda venta por el saldo pendiente, con los mismos       ║
║      productos, marcada `skip_stock: true` para que el back no la        ║
║      valide ni descuente contra stock existente. Se hace primero porque  ║
║      necesitamos su _id para enlazarla desde la venta original.          ║
║   2. Edita la venta original a status Completada (sin tocar productos/   ║
║      montos/fecha/vendedor — se reenvían tal cual) y la enlaza con la    ║
║      venta de saldo recién creada (`settled_by_sell_id`).                ║
║ No es atómico (son 2 llamadas HTTP separadas): si el paso 2 falla luego  ║
║ del 1, queda la venta de saldo creada pero la original sigue Parcial y   ║
║ sin el link — habría que reintentar "saldar deuda" a mano en ese caso.   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const settleSellDebtThunk = ({ sell, pendingBalance }: SettleSellDebtThunkInterface) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        try {
            const settlementPayload: CreateSellApiPayloadType = {
                purchase_date: new Date().toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                seller_id: sell.seller_id,
                seller_name: sell.seller_name,
                payment_method: sell.payment_method,
                products: sell.products,
                sub_total: pendingBalance,
                iva: 0,
                total_amount: pendingBalance,
                currency: sell.currency,
                status: SellStatusEnum.Completada,
                amount_paid: pendingBalance,
                debtor_name: null,
                skip_stock: true,
                settles_sell_id: sell._id,
            };

            const createResponse: CreateSellResponse = await postSellRequest(settlementPayload);
            if (!createResponse?._id) {
                throw new Error('No se pudo registrar la venta del saldo abonado');
            }

            const editPayload: EditSellRequestPayloadType = {
                _id: sell._id,
                currency: sell.currency,
                iva: sell.iva,
                modification_date: new Date().toISOString(),
                payment_method: sell.payment_method,
                products: sell.products,
                purchase_date: sell.purchase_date,
                seller_id: sell.seller_id,
                seller_name: sell.seller_name,
                sub_total: sell.sub_total,
                total_amount: sell.total_amount,
                status: SellStatusEnum.Completada,
                amount_paid: sell.total_amount,
                debtor_name: null,
                settled_by_sell_id: createResponse._id,
            };

            const editResponse = await putSellRequest(editPayload);
            if (!editResponse?._id) {
                throw new Error('No se pudo saldar la deuda de la venta');
            }

            dispatch(setError({ errorMessage: null }));
            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
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
    