import type { Dispatch } from "@reduxjs/toolkit";
import { handleError } from "../shared/handlerStoreError";
import { getSellersRequest } from "../../modules/sellers/api/sellerApi";
import type { Seller } from "@typings/seller/sellerPersonTypes";
import { checkingSellers, setSellers, setSellersError } from "./sellerPersonSlice";

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getSellers                                                         ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getSellers = () => {

    return async (dispatch: Dispatch): Promise<Seller[] | undefined> => {
        dispatch(checkingSellers());
        try {
            const sellers: Seller[] = await getSellersRequest();

            if (!sellers) {
                dispatch(setSellersError("No se ha encontrado ningún vendedor"));
                throw new Error("No se encontraron vendedores");
            }

            dispatch(setSellers(sellers));
            return sellers;

        } catch (error: unknown) {
            dispatch(setSellersError("No se pudieron obtener los vendedores"));
            handleError(error);
        }
    };
};