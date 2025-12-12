
// # Thunk: getProducts  

// ## Descripción 📦  
// Thunk de Redux encargado de obtener la lista de **productos** desde la API.  
// Maneja el ciclo de carga, valida la respuesta y actualiza el estado global con los productos encontrados.  

// ## Flujo 🔧  
// 1. **Inicio de petición**:  
//    - Se despacha `checkingProducts()` para indicar que la aplicación está verificando productos.  
// 2. **Petición a la API**:  
//    - Llama a `getProductsRequest()` para obtener la lista de productos.  
// 3. **Validación de respuesta**:  
//    - Si no se encuentran productos (`!products`):  
//      - Se despacha `setError` con mensaje `"No se ha encontrado ningun producto"`.  
//      - Se lanza un `Error`.  
//    - Si se encuentran productos:  
//      - Se despacha `setProducts(products)` para actualizar el estado global.  
//      - Se retorna el array de productos.  
// 4. **Manejo de errores**:  
//    - Si ocurre una excepción, se delega a `handleError(error)` para centralizar la lógica de errores.  

// ## Acciones usadas 🎭  
// - `checkingProducts`: marca el inicio de la verificación.  
// - `setError`: guarda un mensaje de error en el estado.  
// - `setProducts`: actualiza el estado con los productos obtenidos.  

// ## Tipos 📑  
// - `Product`: tipo que representa la estructura de un producto.  
// - Retorno: `Promise<Product[] | undefined>` (array de productos o undefined en caso de error).  

// ## Notas técnicas 💽  
// - **Modularidad**: separa la lógica de API (`getProductsRequest`) del manejo de estado.  
// - **Escalabilidad**: se pueden añadir más validaciones (ej. categorías, stock, precios) antes de despachar.  
// - **Consistencia**: asegura que siempre se despache una acción (`checking`, `error` o `setProducts`) para mantener la UI sincronizada.  


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