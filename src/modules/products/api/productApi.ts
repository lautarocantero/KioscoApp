
import axios from "axios";
import { API_URL } from "../../../config/api";

// # Módulo: Product Requests  

// ## Descripción 📦
// Configuración de cliente Axios para interactuar con el backend de productos.  
// Incluye una función para obtener la lista de productos desde la API.  

// ## Funciones 🔧
// - `baseUrl`: instancia de Axios configurada con:  
//   - `baseURL`: `http://localhost:3000/product`  
//   - `timeout`: 5000 ms  
//   - `headers`: `Content-Type: application/json`  
//   - `withCredentials`: true (envía cookies/credenciales en las requests).  
// - `getProductsRequest`: función asíncrona que:  
//   - Realiza un `GET` a `/get-products`.  
//   - Devuelve `response.data` con la lista de productos.  

// ## Notas técnicas 💽
// - Centraliza la configuración de Axios para reutilización en otros requests.  
// - Ideal para mantener consistencia en headers, timeout y credenciales.  
//-----------------------------------------------------------------------------//


const baseUrl = axios.create({
  baseURL: `${API_URL}/product`,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const getProductsRequest = async () => {
    const response = await baseUrl.get('/get-products');
    return response.data;
}

//──────────────────────────────────────────── Post ───────────────────────────────────────────//