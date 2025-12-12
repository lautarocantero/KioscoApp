
// # Thunks: selectProductThunk & addToCartThunk  

// ## Descripción 📦  
// Conjunto de **thunks** relacionados con la selección y agregado de productos al carrito.  
// Utilizan Redux para despachar acciones y `zod` para validar la estructura de los datos de producto.  

// ## Esquema de validación 🔧  
// - `ProductVariantEntitySchema`: define la forma esperada de un producto variante.  
//   - Campos: `_id`, `name`, `description`, `created_at`, `updated_at`, `image_url`, `gallery_urls`, `brand`, `product_id`, `sku`, `model_type`, `model_size`, `min_stock`, `stock`, `price`, `expiration_date`.  
// - `ProductVariantEntity`: tipo inferido a partir del esquema.  

// ## Thunks 🎭  

// ### selectProductThunk  
// - **Entrada**: `productData` (producto seleccionado).  
// - **Flujo**:  
//   1. Si no se proporciona `productData`, despacha `setError`.  
//   2. (Validación con `zod` comentada, pendiente de uso futuro).  
//   3. Si todo es correcto, despacha `setProductSelected` con el producto.  
//   4. Maneja errores con `handleError`.  

// ### addToCartThunk  
// - **Entrada**: `productData` (producto a agregar al carrito).  
// - **Flujo**:  
//   1. Si no se proporciona `productData`, despacha `setError`.  
//   2. Valida `productData` contra `ProductVariantEntitySchema`.  
//      - Si falla, despacha `setError`.  
//   3. Si es válido, despacha `addToCartAction` con el producto.  
//   4. Maneja errores con `handleError`.  

// ## Notas técnicas 💽  
// - **Validación**: `zod` asegura que los datos cumplen con la estructura esperada antes de ser procesados.  
// - **Errores**: `handleError` centraliza el manejo de excepciones.  
// - **Acciones usadas**:  
//   - `setError`: guarda mensajes de error en el estado.  
//   - `setProductSelected`: marca un producto como seleccionado.  
//   - `addToCartAction`: agrega un producto válido al carrito.  
// - **Escalabilidad**: se pueden añadir más thunks para manejar operaciones como eliminar del carrito, actualizar cantidades o validar stock.  


import type { Dispatch } from "@reduxjs/toolkit"
import { handleError } from "../shared/handlerStoreError"
import type { AddToCartThunkInterface, SelectProductThunkInterface } from "../../typings/seller/sellerTypes";
import { addToCartAction, setError, setProductSelected } from "./sellerSlice";
import { z } from "zod";

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
