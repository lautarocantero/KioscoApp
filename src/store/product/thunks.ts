import type { Dispatch } from "@reduxjs/toolkit"
import { checkingProducts, setError, setProducts } from "./productSlice";
import { handleError } from "../shared/handlerStoreError";
import type { Product } from "../../typings/product/productTypes";
import { getProductsRequest } from "../../modules/products/api/productApi";


export const getProducts = () => {

    return async (dispatch: Dispatch): Promise<Product[] | undefined> => {
        dispatch(checkingProducts());
        try{
            const products : Product[] = await getProductsRequest();
            console.log('products', products);
            if(!products) {
                dispatch(setError({ errorMessage: "No se ha encontrado ningun producto"}))
                throw new Error('No se encontraron productos');
            }
            
            dispatch(setProducts(products));
            return products as Product[];
        } catch (error: unknown) {
            handleError(error);
        }
    }
}