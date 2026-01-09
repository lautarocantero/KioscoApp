
//─────────────────── Thunk ✳️: getSells & createSell ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Conjunto de thunks de Redux para manejar la obtención y creación de ventas.  
// `getSells`: se encarga de traer todas las ventas desde la API y actualizar el estado global.  
// `createSell`: registra una nueva venta en el backend y devuelve el identificador del ticket generado.  

//──────────────────── Flujo ✴️ ─────────────────────//
// ➡️ Entrada:  
//   - `getSells`: no requiere parámetros, solo el `dispatch`.  
//   - `createSell`: recibe un objeto `CreateSellSanitizedPayload` con los datos de la venta.  
// ❌ Validación inicial:  
//   - `getSells`: si no se encuentran ventas → `setError`.  
//   - `createSell`: si no se genera `ticket_id` → lanza error.  
// ✅ Acción principal:  
//   - `getSells`: despacha `checkingSells` → realiza request → despacha `setSells`.  
//   - `createSell`: realiza request → limpia errores con `setError`.  
// ⬅️ Salida:  
//   - `getSells`: actualiza el estado con la lista de ventas.  
//   - `createSell`: devuelve el `ticket_id` de la venta creada.  
// ⚠️ Manejo de errores:  
//   - Ambos thunks usan `handleError` para centralizar la gestión de errores.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Errores: centralizados mediante `handleError` para consistencia en el store.  
// - Acciones usadas: `checkingSells`, `setSells`, `setError`.  
//-----------------------------------------------------------------------------


import type { Dispatch } from "@reduxjs/toolkit"
import type { CreateSellSanitizedPayload, Sell } from "../../typings/sells/types/sellsTypes"
import { checkingSells, setError, setSells, setSellSelected } from "./sellSlice";
import { handleError } from "../shared/handlerStoreError";
import { deleteSellRequest, getSellByIdRequest, getSellsRequest, postSellRequest } from "../../modules/sells/api/sellApi";

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const getSells = () => {

    return async (dispatch: Dispatch) : Promise<Sell[] | undefined> => {
        dispatch(checkingSells());

        try{
            const sells: Sell[] = await getSellsRequest();
            console.log(sells)

            if(!sells) {
                dispatch(setError({ errorMessage: "No se ha encontrado ninguna venta"}))
                throw new Error('No se encontraron ventas');
            }

            dispatch(setSells(sells.data));
            return sells.data as Sell[];
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const getSellById = (ticket_id: string) => {
    return async (dispatch: Dispatch) : Promise<Sell | undefined> => {
        dispatch(checkingSells());
        try {
            const sell: Sell[] = await getSellByIdRequest(ticket_id);

            if(!sell) {
                dispatch(setError({ errorMessage: "No se ha encontrado la venta"}))
                throw new Error('No se encontraron ventas que concuerden con este ticket');
            }

            dispatch(setSellSelected(sell[0]));
            return sell[0] as Sell;
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

//──────────────────────────────────────────── Post ───────────────────────────────────────────//

export const createSell = ({data}: CreateSellSanitizedPayload) => {
    const {purchase_date,seller_id,seller_name,payment_method,products,sub_total,iva,total_amount,currency} = data;
    
    return async (dispatch: Dispatch) : Promise<string | undefined> => {
        try{
            const ticket_id : string = await postSellRequest({
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

            if(!ticket_id) {
                throw new Error('Error durante el registro de la venta');
            }

            dispatch(setError({errorMessage: null}));
            return ticket_id as string;
        } catch (error: unknown) {
            handleError(error);
        }
    }
}
    
//──────────────────────────────────────────── Delete ───────────────────────────────────────────//

export const deleteSellThunk = (ticket_id: string) => {

    return async (dispatch: Dispatch) : Promise<void | string> => {
        try{
            const response = await deleteSellRequest(ticket_id);

            if(!response) {
                throw new Error('Error durante la eliminacion de la venta');
            }
            dispatch(setError({errorMessage: null}));
            return response;
        } catch (error: unknown) {
            handleError(error);
        }
    }
   
}
    