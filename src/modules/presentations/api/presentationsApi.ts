import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Presentation } from "@typings/presentation/presentationTypes";

// # Módulo: Presentation Requests

// ## Descripción 📦
// Centraliza todas las llamadas HTTP al recurso `/product-variant` del backend.
// Cada función mapea 1:1 con un endpoint definido en `PresentationRouter`.

// ## Instancia Axios 🔧
// - `baseURL`: `{API_URL}/product-variant`
// - `timeout`: 5000 ms
// - `headers`: `Content-Type: application/json`
// - `withCredentials`: true

// ## Endpoints cubiertos 📡
// - GET    /get-product-variants                          → getPresentationsRequest
// - GET    /get-product-variant-by-id/:id                → getPresentationByIdRequest
// - GET    /get-product-variant-by-product-id/:productId → getPresentationsByProductIdRequest
// - GET    /get-product-variant-by-brand                 → getPresentationByBrandRequest
// - GET    /get-product-variant-by-stock                 → getPresentationByStockRequest
// - GET    /get-product-variant-by-price                 → getPresentationByPriceRequest
// - GET    /get-product-variant-by-size                  → getPresentationBySizeRequest
// - GET    /get-product-variant-by-presentation          → getPresentationByPresentationRequest
// - POST   /create-product-variant                       → createPresentationRequest
// - PUT    /edit-product-variant                         → editPresentationRequest
// - DELETE /delete-product-variant                       → deletePresentationRequest

// ## Notas técnicas 💽
// - `createPresentationRequest` usa `FormData` + `multipart/form-data`
//   ya que el backend procesa una imagen con `multer`.
// - DELETE y los GET que usan body envían el payload via `{ data }` / `{ params }`.
// - `resolveErrorMessage` centraliza la extracción del mensaje de error de Axios.
//-----------------------------------------------------------------------------//

const baseUrl = axios.create({
    baseURL: `${API_URL}/product-variant`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

//──────────────────────────────────────────── GET ────────────────────────────────────────────//

/**
 * Obtiene todas las variantes.
 * `GET /get-product-variants`
 */
export const getPresentationsRequest = async (): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>("/get-product-variants");
    return response.data;
};

/**
 * Obtiene una variante por su ID.
 * `GET /get-product-variant-by-id/:product_variant_id`
 */
export const getPresentationByIdRequest = async (
    { product_variant_id }: { product_variant_id: string }
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        `/get-product-variant-by-id/${product_variant_id}`
    );
    return response.data;
};

/**
 * Obtiene todas las variantes de un producto por su ID.
 * `GET /get-product-variant-by-product-id/:product_id`
 */
export const getPresentationsByProductIdRequest = async (
    { product_id }: { product_id: string }
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        `/get-product-variant-by-product-id/${product_id}`
    );
    return response.data;
};

/**
 * Filtra variantes por marca.
 * `GET /get-product-variant-by-brand` — body: { brand }
 */
export const getPresentationByBrandRequest = async (
    brand: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-product-variant-by-brand",
        { data: { brand } }
    );
    return response.data;
};

/**
 * Filtra variantes por stock.
 * `GET /get-product-variant-by-stock` — body: { stock }
 */
export const getPresentationByStockRequest = async (
    stock: number
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-product-variant-by-stock",
        { data: { stock } }
    );
    return response.data;
};

/**
 * Filtra variantes por precio.
 * `GET /get-product-variant-by-price` — body: { price }
 */
export const getPresentationByPriceRequest = async (
    price: number
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-product-variant-by-price",
        { data: { price } }
    );
    return response.data;
};

/**
 * Filtra variantes por tamaño de modelo.
 * `GET /get-product-variant-by-size` — body: { model_size }
 */
export const getPresentationBySizeRequest = async (
    model_size: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-product-variant-by-size",
        { data: { model_size } }
    );
    return response.data;
};

/**
 * Filtra variantes por presentación (model_type).
 * `GET /get-product-variant-by-presentation` — body: { model_type }
 */
export const getPresentationByPresentationRequest = async (
    model_type: string
): Promise<Presentation[]> => {
    const response = await baseUrl.get<Presentation[]>(
        "/get-product-variant-by-presentation",
        { data: { model_type } }
    );
    return response.data;
};

//──────────────────────────────────────────── POST ───────────────────────────────────────────//

/**
 * Crea una nueva variante.
 * `POST /create-product-variant` — multipart/form-data (multer en el backend).
 *
 * Si se provee `image_file`, se sube como archivo; de lo contrario se envía `image_url` como string.
 */
export const createPresentationRequest = async (
    data: Omit<Presentation, "_id" | "created_at" | "updated_at"> & {
        image_file?: File | null;
    }
): Promise<{ _id: string; message: string }> => {
    const { image_file, gallery_urls, ...rest } = data;

    const formData = new FormData();

    // campos escalares
    (Object.entries(rest) as [string, unknown][]).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    // galería como JSON string (el backend la parsea con JSON.parse)
    formData.append("gallery_urls", JSON.stringify(gallery_urls ?? []));

    // imagen como archivo o URL
    if (image_file) {
        formData.append("image", image_file);
    }

    const response = await baseUrl.post<{ _id: string; message: string }>(
        "/create-product-variant",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
};

//──────────────────────────────────────────── PUT ────────────────────────────────────────────//

/**
 * Edita una variante existente.
 * `PUT /edit-product-variant` — body: { ...campos }
 */
export const editPresentationRequest = async (
    variant: Partial<Presentation> & Pick<Presentation, "_id">
): Promise<{ _id: string; message: string }> => {
    const response = await baseUrl.put<{ _id: string; message: string }>(
        "/edit-product-variant",
        variant
    );
    return response.data;
};

//──────────────────────────────────────────── DELETE ─────────────────────────────────────────//

/**
 * Elimina una variante por su ID.
 * `DELETE /delete-product-variant` — body: { _id }
 */
export const deletePresentationRequest = async (_id: string): Promise<void> => {
    await baseUrl.delete("/delete-product-variant", { data: { _id } });
};