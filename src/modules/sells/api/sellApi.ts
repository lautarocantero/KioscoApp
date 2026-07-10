import type {
    CreateSellApiPayloadType,
    DeleteSellApiPayloadType,
    GetSellApiPayloadType
} from "@typings/sells/types";
import axios from "axios";
import { API_URL } from "../../../config/api";

const baseUrl = axios.create({
    baseURL: `${API_URL}/sell`,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});
    
//──────────────────────────────────────────── 📥 GET 📥 ───────────────────────────────────────────//

export const getSellsRequest = async () => {

    const response = await baseUrl.get('/get-sells');
    return response.data;
}

export const getSellByIdRequest = async (data: GetSellApiPayloadType) => {
    
    const { ticket_id } : { ticket_id: string }  = data;

    const response = await baseUrl.get(`/get-sell-by-id/${ticket_id}`);
    return response.data;
}

export const getTodaySellsCountRequest = async (): Promise<{ count: number, lastSaleAt: string | null }> => {

    const response = await baseUrl.get('/get-today-sells-count');
    return response.data;
}

//──────────────────────────────────────────── 📤 POST 📤 ───────────────────────────────────────────//

export const postSellRequest = async (data: CreateSellApiPayloadType) => {

    const response = await baseUrl.post('/create-sell', data);
    return response.data;
}

//──────────────────────────────────────────── 🗑️ DELETE 🗑️ ───────────────────────────────────────────//

export const deleteSellRequest = async (data: DeleteSellApiPayloadType) => {
    const { ticket_id } : { ticket_id: string }  = data;

    const response = await baseUrl.delete(`/delete-sell/${ticket_id}`);
    return response.data;
}