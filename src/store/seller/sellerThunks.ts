import type { Dispatch } from "@reduxjs/toolkit";
import { z } from "zod";
import type { addOneUnitThunkInterface, AddToCartThunkInterface, removeFromCartInterface, SelectPresentationThunkInterface, SelectProductThunkInterface } from "../../typings/seller/sellerTypes";
import { handleError } from "../shared/handlerStoreError";
import { addToCartAction, addUnitAction, cleanCart, removeFromCart, setError, setPresentationSelected, setProductSelected } from "./sellerSlice";

export const PresentationEntitySchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  image_url: z.string(),
  brand: z.string(),
  product_id: z.string(),
  sku: z.string(),
  model_type: z.string(),
  model_size: z.string(),
  min_stock: z.number(),
  stock: z.number(),
  price: z.number(),
  expiration_date: z.string(),
});

export const ProductTicketSchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  brand: z.string(),
  sku: z.string(),
  model_type: z.string(),
  model_size: z.string(),
  price: z.number(),
  expiration_date: z.string(),
  stock_required: z.number(),
});

export type PresentationEntity = z.infer<typeof PresentationEntitySchema>;

export const selectPresentationThunk = ({ presentationData }: SelectPresentationThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!presentationData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado una presentación."}));
            return;
        }

        try{
            dispatch(setPresentationSelected({ presentation: presentationData }));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const selectProductThunk = ({ productData }: SelectProductThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        // if( ! PresentationEntitySchema.safeParse(productData).success ) {
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
    return async (dispatch: Dispatch): Promise<boolean> => {
        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return false;
        }

        const parsed = ProductTicketSchema.safeParse(productData);
        if (!parsed.success) {
            dispatch(setError({ errorMessage: "El producto no es valido."}));
            console.error('ProductTicketSchema validation failed:', parsed.error.flatten()); // 🔎 sacar en prod
            return false;
        }

        try {
            dispatch(addToCartAction({ product: productData }));
            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
        }
    }
}

export const addOneUnitThunk = ({_id}: addOneUnitThunkInterface ) => {

    return async (dispatch:Dispatch): Promise<void> => {
        if(!_id) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        try{
            dispatch(addUnitAction({ _id: _id}));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

export const removeFromCartThunk = ({_id, amount}: removeFromCartInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try{
            dispatch(removeFromCart({_id, amount}));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const cleanCartThunk = () => {

    return async (dispatch: Dispatch): Promise<void> => {
        try{
            dispatch(cleanCart());
        } catch(error: unknown) {
            handleError(error);
        }
    }

}
