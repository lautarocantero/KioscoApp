import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Seller } from "@typings/seller/sellerPersonTypes";

const baseUrl = axios.create({
    baseURL: `${API_URL}/seller`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

//──────────────────────────────────────────── GET ────────────────────────────────────────────//

/**
 * Obtiene el listado completo de vendedores.
 * `GET /get-sellers`
 */
export const getSellersRequest = async (): Promise<Seller[]> => {
    const response = await baseUrl.get<Seller[]>("/get-sellers");
    return response.data;
};