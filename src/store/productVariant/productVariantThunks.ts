import type { Dispatch } from "@reduxjs/toolkit"
import type { ProductVariant } from "../../typings/productVariant/productVariant"
import { checkingProductVariants, setError, setProductsVariants } from "./productVariantSlice"
import { handleError } from "../shared/handlerStoreError"
import { getProductVariantsByIdRequest } from "../../modules/productVariants/api/productVariantsApi"


export const getProductVariantsById = (product_id: string) => {

    return async (dispatch: Dispatch): Promise<ProductVariant[] | undefined> => {
        dispatch(checkingProductVariants());
        try{
            const productVariants: ProductVariant[] = await getProductVariantsByIdRequest({product_id});

            if(!productVariants) {
                dispatch(setError({errorMessage: "No se ha encontrado ninguna variante del producto" }));
                throw new Error('No se encontraron variantes del producto');
            }

            dispatch(setProductsVariants(productVariants));
            return productVariants as ProductVariant[];
        } catch(error: unknown) {
            handleError(error);
        }
    }
}