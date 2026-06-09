
// # Thunk: getProductVariantsById  

// ## Descripción 📦  
// Thunk de Redux que obtiene las variantes de un producto específico desde la API.  
// Se encarga de manejar el ciclo de carga, validar la respuesta y actualizar el estado global con las variantes encontradas.  

// ## Flujo 🔧  
// 1. **Inicio de petición**:  
//    - Se despacha `checkingProductVariants()` para indicar que la aplicación está en proceso de verificación.  
// 2. **Petición a la API**:  
//    - Llama a `getProductVariantsByIdRequest({ product_id })` para obtener las variantes del producto.  
// 3. **Validación de respuesta**:  
//    - Si no se encuentran variantes (`!productVariants`):  
//      - Se despacha `setError` con mensaje `"No se ha encontrado ninguna variante del producto"`.  
//      - Se lanza un `Error`.  
//    - Si se encuentran variantes:  
//      - Se despacha `setProductsVariants(productVariants)` para actualizar el estado global.  
//      - Se retorna el array de variantes.  
// 4. **Manejo de errores**:  
//    - Si ocurre una excepción, se delega a `handleError(error)` para centralizar la lógica de errores.  

// ## Acciones usadas 🎭  
// - `checkingProductVariants`: marca el inicio de la verificación.  
// - `setError`: guarda un mensaje de error en el estado.  
// - `setProductsVariants`: actualiza el estado con las variantes obtenidas.  

// ## Tipos 📑  
// - `ProductVariant`: tipo que representa la estructura de una variante de producto.  
// - Retorno: `Promise<ProductVariant[] | undefined>` (array de variantes o undefined en caso de error).  

// ## Notas técnicas 💽  
// - **Modularidad**: separa la lógica de API (`getProductVariantsByIdRequest`) del manejo de estado.  
// - **Escalabilidad**: se pueden añadir más validaciones (ej. stock mínimo, precios) antes de despachar.  
// - **Consistencia**: asegura que siempre se despache una acción (`checking`, `error` o `setProductsVariants`) para mantener la UI sincronizada.  


import type { Dispatch } from "@reduxjs/toolkit"
import type { ProductVariant } from "../../typings/productVariant/productVariantTypes"
import { checkingProductVariants, setError, setProductsVariants, startLoadingProductVariants } from "./productVariantSlice"
import { handleError } from "../shared/handlerStoreError"
import { getProductVariantByIdRequest, getProductVariantsByProductIdRequest } from "../../modules/presentations/api/productVariantsApi"


export const getProductVariantsById = (product_id: string) => {

    return async (dispatch: Dispatch): Promise<ProductVariant[] | undefined> => {
        dispatch(startLoadingProductVariants());
        try{
            const productVariants: ProductVariant[] = await getProductVariantsByProductIdRequest({product_id});

            if(!productVariants) {
                dispatch(setError({errorMessage: "No se ha encontrado ninguna variante del producto" }));
                throw new Error('No se encontraron productos que coincidan con el id ' + product_id);
            }

            dispatch(setProductsVariants(productVariants));
            return productVariants as ProductVariant[];
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const getProductVariantById = (product_variant_id: string) => {
    return async (dispatch: Dispatch): Promise<ProductVariant[] | undefined> => {
        dispatch(checkingProductVariants());

        try{
            {/*─────────────────── 🔎 Se usa un array, pero solo se tendra un elemento en el mismo 🔎 ───────────────────*/}
            const productVariant: ProductVariant[] = await getProductVariantByIdRequest({product_variant_id});

            if(!productVariant) {
                dispatch(setError({errorMessage: "No se ha encontrado el producto en la base de datos" }));
                throw new Error('No se encontraron variantes del producto');
            }

            dispatch(setProductsVariants(productVariant));
            return productVariant as ProductVariant[];
        } catch (error: unknown) {
            handleError(error);
        }
    }
}