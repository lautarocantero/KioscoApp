import type { Dispatch } from "@reduxjs/toolkit"
import { handleError } from "../shared/handlerStoreError"
import type { AddToCartThunkInterface, SelectProductThunkInterface } from "../../typings/seller/sellerTypes";
import { addToCartAction, setError, setProductSelected } from "./sellerSlice";
import { z } from "zod";

export const ProductVariantEntitySchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  imageUrl: z.string(),
  galleryUrls: z.array(z.string()),
  brand: z.string(),
  productId: z.string(),
  sku: z.string(),
  modelType: z.string(),
  model_size: z.string(),
  min_stock: z.number(),
  stock: z.number(),
  price: z.number(),
  expirationDate: z.string(),
});

export type ProductVariantEntity = z.infer<typeof ProductVariantEntitySchema>;

export const selectProductThunk = ({ productData }: SelectProductThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        // console.log('productData', productData);

        // if( ! ProductVariantEntitySchema.safeParse(productData).success ) {
            // dispatch(setError({ errorMessage: "El producto no es valido."}));
            // return;
        // }

        try{
            dispatch(setProductSelected({ product: productData}));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const addToCartThunk = ({ productData }: AddToCartThunkInterface ) => {

    return async (dispatch:Dispatch): Promise<void> => {
        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }
        // si no es del mismo tipo que el squema
        if( ! ProductVariantEntitySchema.safeParse(productData).success ) {
            dispatch(setError({ errorMessage: "El producto no es valido."}));
            return;
        }

        try{
            dispatch(addToCartAction({ product: productData}));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}
