import type {
    CreateSellApiPayloadType,
    DeleteSellApiPayloadType,
    EditSellApiPayloadType,
    GetSellApiPayloadType
} from "@typings/sells/sellTypes";
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
    return response.data.data;
}

export const getSellByIdRequest = async (data: GetSellApiPayloadType) => {
    
    const { _id } : { _id: string }  = data;

    const response = await baseUrl.get(`/get-sell-by-id/${_id}`);
    return response.data;
}

export const getTodaySellsCountRequest = async (): Promise<{ count: number, lastSaleAt: string | null }> => {

    const response = await baseUrl.get('/get-today-sells-count');
    return response.data;
}

export const searchSellsRequest = async (term: string) => {

    const response = await baseUrl.get('/search-sells', { params: { term } });
    return response.data;
}

//──────────────────────────────────────────── 📤 POST 📤 ───────────────────────────────────────────//

export const postSellRequest = async (data: CreateSellApiPayloadType) => {

    const response = await baseUrl.post('/create-sell', data);
    return response.data;
}

//──────────────────────────────────────────── 📤 PUT 📤 ───────────────────────────────────────────//

export const putSellRequest = async (data: EditSellApiPayloadType) => {
    const response = await baseUrl.put('/edit-sell', data);
    return response.data;
}

//──────────────────────────────────────────── 🗑️ DELETE 🗑️ ───────────────────────────────────────────//

export const deleteSellRequest = async (data: DeleteSellApiPayloadType) => {
    const { _id } : { _id: string }  = data;

    const response = await baseUrl.delete(`/delete-sell/${_id}`);
    return response.data;
}