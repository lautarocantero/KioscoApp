import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { PresentationAnalyticsRaw } from "@typings/shared/types/useAnalytics.types";


const baseUrl = axios.create({
    baseURL: `${API_URL}/presentation`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
║                                                                          ║
║ Endpoints de lectura: listados completos, filtros por producto,          ║
║ marca, stock, precio, tamaño y presentación, búsqueda por término        ║
║ y analíticas de ventas.                                                  ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationsRequest                                                ║
║                                                                          ║
║ Obtiene todas las variantes.                                             ║
║ GET /get-product-presentations                                           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationsRequest = async (): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>("/get-product-presentations");
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationByIdRequest                                             ║
║                                                                          ║
║ Obtiene una variante por su ID.                                          ║
║ GET /get-presentation-by-id/:product_variant_id                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationByIdRequest = async (
    { product_variant_id }: { product_variant_id: string }
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        `/get-presentation-by-id/${product_variant_id}`
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationsByProductIdRequest                                     ║
║                                                                          ║
║ Obtiene todas las variantes de un producto por su ID.                    ║
║ GET /get-presentation-by-product-id/:product_id                          ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationsByProductIdRequest = async (
    { product_id }: { product_id: string }
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        `/get-presentation-by-product-id/${product_id}`
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationByBrandRequest                                          ║
║                                                                          ║
║ Filtra variantes por marca.                                              ║
║ GET /get-presentation-by-brand — body: { brand }                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationByBrandRequest = async (
    brand: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-presentation-by-brand",
        { data: { brand } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationByStockRequest                                          ║
║                                                                          ║
║ Filtra variantes por stock.                                              ║
║ GET /get-presentation-by-stock — body: { stock }                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationByStockRequest = async (
    stock: number
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-presentation-by-stock",
        { data: { stock } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationByPriceRequest                                          ║
║                                                                          ║
║ Filtra variantes por precio.                                             ║
║ GET /get-presentation-by-price — body: { price }                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationByPriceRequest = async (
    price: number
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-presentation-by-price",
        { data: { price } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationBySizeRequest                                           ║
║                                                                          ║
║ Filtra variantes por tamaño de modelo.                                   ║
║ GET /get-presentation-by-model-size — body: { model_size }               ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationBySizeRequest = async (
    model_size: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-presentation-by-model-size",
        { data: { model_size } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getPresentationByPresentationRequest                                   ║
║                                                                          ║
║ Filtra variantes por presentación (model_type).                          ║
║ GET /get-presentation-by-presentation — body: { model_type }             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationByPresentationRequest = async (
    model_type: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-presentation-by-presentation",
        { data: { model_type } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔎 searchPresentationsByProductIdRequest                                  ║
║                                                                          ║
║ Busca presentaciones de un producto por término                          ║
║ (name, sku, model_type, model_size).                                     ║
║ GET /get-presentation-by-product-id/:product_id/search — query: { term } ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const searchPresentationsByProductIdRequest = async (
    { product_id, term }: { product_id: string; term: string }
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        `/get-presentation-by-product-id/${product_id}/search`,
        { params: { term } }
    );
    return response.data;
};


/*══════════════════════════════════════════════════════════════════════════╗
║ 🏷️ getAvailableCategoriesRequest                                          ║
║                                                                          ║
║ Obtiene el listado de categorías disponibles para presentaciones          ║
║ (enum fijo del backend, no depende de datos en base).                    ║
║ GET /get-available-categories                                            ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getAvailableCategoriesRequest = async () => {
    const response = await baseUrl.get('/get-available-categories');
    return response.data;
}


/*══════════════════════════════════════════════════════════════════════════╗
║ 📊 getPresentationAnalyticsRequest                                        ║
║                                                                          ║
║ Obtiene las analíticas de ventas de una presentación puntual.            ║
║ GET /get-presentation-analytics/:presentation_id                         ║
║ query: { start_date?, end_date?, seller_id? }                            ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getPresentationAnalyticsRequest = async (
    { presentation_id, start_date, end_date, seller_id }:
    { presentation_id: string; start_date?: string; end_date?: string; seller_id?: string }
): Promise<PresentationAnalyticsRaw> => {
    const response = await baseUrl.get<PresentationAnalyticsRaw>(
        `/get-presentation-analytics/${presentation_id}`,
        { params: { start_date, end_date, seller_id } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoint de creación de variantes.                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ➕ createPresentationRequest                                              ║
║                                                                          ║
║ Crea una nueva variante.                                                 ║
║ POST /create-presentation — multipart/form-data (multer en el backend).  ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const createPresentationRequest = async (
    data: Omit<Presentation, "_id" | "created_at" | "updated_at">
): Promise<{ _id: string; message: string }> => {
    const { ...rest } = data;

    const formData = new FormData();

    // campos escalares
    (Object.entries(rest) as [string, unknown][]).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, String(item)));
            return;
        }

        formData.append(key, String(value));
    });

    const response = await baseUrl.post<{ _id: string; message: string }>(
        "/create-presentation",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
║                                                                          ║
║ Endpoint de edición de variantes.                                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ editPresentationRequest                                               ║
║                                                                          ║
║ Edita una variante existente.                                            ║
║ PUT /edit-presentation/:_id — body: { ...campos }                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const editPresentationRequest = async (
    variant: Partial<Presentation> & Pick<Presentation, "_id">
): Promise<{ _id: string; message: string }> => {
    const response = await baseUrl.put<{ _id: string; message: string }>(
        `/edit-presentation/${variant._id}`,
        variant
    );
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
║                                                                          ║
║ Endpoint de eliminación de variantes.                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ deletePresentationRequest                                             ║
║                                                                          ║
║ Elimina una variante por su ID.                                          ║
║ DELETE /delete-presentation — body: { _id }                              ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const deletePresentationRequest = async (_id: string): Promise<void> => {
    await baseUrl.delete("/delete-presentation", { data: { _id } });
};