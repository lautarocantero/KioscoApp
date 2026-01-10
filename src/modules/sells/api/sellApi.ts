
// # Módulo: SellType Requests  

// ## Descripción 📦
// Configuración de cliente Axios para interactuar con el backend de ventas.  
// Incluye funciones para obtener y crear ventas en la API.  

// ## Funciones 🔧
// - `baseUrl`: instancia de Axios configurada con:  
//   - `baseURL`: `${API_URL}/SELL`  
//   - `timeout`: 5000 ms  
//   - `headers`: `Content-Type: application/json`  
//   - `withCredentials`: true (envía cookies/credenciales en las requests).  
// - `getSellsRequest`: función asíncrona que:  
//   - Realiza un `GET` a `/get-sells`.  
//   - Devuelve `response.data` con la lista de ventas.  
// - `postSellRequest`: función asíncrona que:  
//   - Realiza un `POST` a `/create-sell` con el payload `CreateSellApiPayloadType`.  
//   - Devuelve `response.data` con la venta creada.  

// ## Notas técnicas 💽
// - Centraliza la configuración de Axios para reutilización en otros requests.  
// - Ideal para mantener consistencia en headers, timeout y credenciales.  
// - Facilita la extensión futura para otros endpoints relacionados con ventas.  
//-----------------------------------------------------------------------------


import axios from "axios";
import { API_URL } from "../../../config/api";
import type { CreateSellApiPayloadType } from "@typings/sells/types";

const baseUrl = axios.create({
    baseURL: `${API_URL}/sell`,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});

//──────────────────────────────────────────── Get ───────────────────────────────────────────//

export const getSellsRequest = async () => {
    const response = await baseUrl.get('/get-sells');
    return response.data;
}

export const getSellByIdRequest = async (ticket_id: string) => {
    const response = await baseUrl.get(`/get-sell-by-id/${ticket_id}`);
    return response.data;
}

//──────────────────────────────────────────── Post ───────────────────────────────────────────//

export const postSellRequest = async (data: CreateSellApiPayloadType) => {
    const response = await baseUrl.post('/create-sell', data);
    return response.data;
}

//──────────────────────────────────────────── Delete ───────────────────────────────────────────//

export const deleteSellRequest = async (ticket_id: string) => {
    const response = await baseUrl.delete(`/delete-sell/${ticket_id}`);
    return response.data;
}