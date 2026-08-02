import type {
    CreateSellApiPayloadType,
    DeleteSellApiPayloadType,
    EditSellApiPayloadType,
    GetSellApiPayloadType
} from "@typings/sells/sellTypes";
import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/sell`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
║                                                                          ║
║ Endpoints de lectura: listado completo, búsqueda por ID/término y        ║
║ conteo de ventas del día.                                                ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellsRequest                                                        ║
║                                                                          ║
║ Obtiene el listado completo de ventas.                                   ║
║ GET /get-sells                                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellsRequest = async () => {
    const response = await baseUrl.get('/get-sells');
    return response.data.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellByIdRequest                                                     ║
║                                                                          ║
║ Obtiene una venta por su ID.                                             ║
║ GET /get-sell-by-id/:_id                                                 ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellByIdRequest = async (data: GetSellApiPayloadType) => {
    const { _id }: { _id: string } = data;

    const response = await baseUrl.get(`/get-sell-by-id/${_id}`);
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getTodaySellsCountRequest                                              ║
║                                                                          ║
║ Obtiene la cantidad de ventas del día y la fecha de la última venta.     ║
║ GET /get-today-sells-count                                               ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getTodaySellsCountRequest = async (): Promise<{ count: number, lastSaleAt: string | null }> => {
    const response = await baseUrl.get('/get-today-sells-count');
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔎 searchSellsRequest                                                     ║
║                                                                          ║
║ Busca ventas por término.                                                ║
║ GET /search-sells?term=<value>                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const searchSellsRequest = async (term: string) => {
    const response = await baseUrl.get('/search-sells', { params: { term } });
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoint de creación de ventas.                                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ➕ postSellRequest                                                        ║
║                                                                          ║
║ Crea una nueva venta.                                                    ║
║ POST /create-sell                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const postSellRequest = async (data: CreateSellApiPayloadType) => {
    const response = await baseUrl.post('/create-sell', data);
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
║                                                                          ║
║ Endpoint de edición de ventas.                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ putSellRequest                                                        ║
║                                                                          ║
║ Edita una venta existente.                                               ║
║ PUT /edit-sell                                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const putSellRequest = async (data: EditSellApiPayloadType) => {
    const response = await baseUrl.put('/edit-sell', data);
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
║                                                                          ║
║ Endpoint de eliminación de ventas.                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ deleteSellRequest                                                     ║
║                                                                          ║
║ Elimina una venta por su ID.                                             ║
║ DELETE /delete-sell/:_id                                                 ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const deleteSellRequest = async (data: DeleteSellApiPayloadType) => {
    const { _id }: { _id: string } = data;

    const response = await baseUrl.delete(`/delete-sell/${_id}`);
    return response.data;
};