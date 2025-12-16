//─────────────────── Thunk ✳️: sellerThunks ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Conjunto de thunks para seleccionar productos y agregarlos al carrito.
// Usan Redux para despachar acciones y zod para validar datos.  

//──────────────────── Esquema de validación 🔧 ─────────────────────//
// - ProductVariantEntitySchema: define la forma esperada de un producto variante.
// - ProductTicketSchema: define la forma esperada de un producto en el carrito.
// - ProductVariantEntity: tipo inferido a partir del esquema.  

//──────────────────── Thunks ✳️ ─────────────────────//

//──────────────────── selectProductThunk ✴️ ─────────────────────//
// ➡️ Entrada: productData
// ❌ Si no existe → despacha setError
// 📝 Validación con zod pendiente
// ✅ Si es válido → despacha setProductSelected
// ⬅️ Salida: producto seleccionado en el estado
// ⚠️ Maneja errores con handleError
//────────────────────────────────────────────────────────────────//

//──────────────────── addToCartThunk ✴️ ─────────────────────//
// ➡️ Entrada: productData
// ❌ Si no existe → despacha setError
// 🛡️ Valida contra ProductTicketSchema
//   ❌ Si falla → despacha setError
// ✅ Si es válido → despacha addToCartAction
// ⬅️ Salida: producto agregado al carrito
// ⚠️ Maneja errores con handleError
//────────────────────────────────────────────────────────────────//


//─────────────────── Notas técnicas 💽 ───────────────────//
// - Validación: zod asegura estructura correcta antes de procesar.
// - Errores: handleError centraliza manejo de excepciones.

//─────────────────── 📝 To do: Agregar validacion de squema en selectProductThunk ───────────────────//

//-----------------------------------------------------------------------------//

import type { Dispatch } from "@reduxjs/toolkit";
import { z } from "zod";
import type { AddToCartThunkInterface, SelectProductThunkInterface } from "../../typings/seller/sellerTypes";
import { handleError } from "../shared/handlerStoreError";
import { addToCartAction, setError, setProductSelected } from "./sellerSlice";

export const ProductVariantEntitySchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  image_url: z.string(),
  gallery_urls: z.array(z.string()),
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
  product_id: z.string(),
  sku: z.string(),
  model_type: z.string(),
  model_size: z.string(),
  price: z.number(),
  expiration_date: z.string(),
  stock_required: z.string(),
});

export type ProductVariantEntity = z.infer<typeof ProductVariantEntitySchema>;

export const selectProductThunk = ({ productData }: SelectProductThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

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
        {/*─────────────────── 🔎 si no es del mismo tipo que el squema 🔎 ───────────────────*/}
        if( ! ProductTicketSchema.safeParse(productData).success ) {
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
