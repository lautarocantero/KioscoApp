
// # Módulo: ProductVariant Requests  

// ## Descripción 📦
// Configuración de cliente Axios para interactuar con el backend de variantes de producto.  
// Incluye una función para obtener variantes de producto por su ID.  

// ## Funciones 🔧
// - `baseUrl`: instancia de Axios configurada con:  
//   - `baseURL`: `http://localhost:3000/product-variant`  
//   - `timeout`: 5000 ms  
//   - `headers`: `Content-Type: application/json`  
//   - `withCredentials`: true (envía cookies/credenciales en las requests).  
// - `getProductVariantsByIdRequest`: función asíncrona que:  
//   - Recibe un objeto con `product_id: string`.  
//   - Realiza un `GET` a `/get-product-variant-by-product-id/{product_id}`.  
//   - Devuelve `response.data` con las variantes del producto.  

// ## Notas técnicas 💽
// - Centraliza la configuración de Axios para reutilización en otros requests.  
// - Ideal para mantener consistencia en headers, timeout y credenciales.  
// - Facilita la obtención de variantes asociadas a un producto específico.  
//-----------------------------------------------------------------------------//

import axios from "axios";

const baseUrl = axios.create({
    baseURL: 'http://localhost:3000/product-variant',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const getProductVariantsByIdRequest = async ({product_id} : {product_id: string}) => {
    const response = await baseUrl.get(`/get-product-variant-by-product-id/${product_id}`);
    return response.data;
}

export const getProductVariantByIdRequest = async ({product_variant_id}: {product_variant_id : string}) => {
    const response = await baseUrl.get(`/get-product-variant-by-id/${product_variant_id}`);
    return response.data;
}