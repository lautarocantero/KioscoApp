import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Product, ProductWithPresentations } from "@typings/product/productTypes";

// # Módulo: Product Requests

// ## Descripción 📦
// Centraliza todas las llamadas HTTP al recurso `/product` del backend.
// Cada función mapea 1:1 con un endpoint definido en `ProductRouter`.

// ## Instancia Axios 🔧
// - `baseURL`: `{API_URL}/product`
// - `timeout`: 5000 ms
// - `headers`: `Content-Type: application/json`
// - `withCredentials`: true

// ## Endpoints cubiertos 📡
// - GET    /get-products              → getProductsRequest
// - GET    /get-product-by-id/:_id   → getProductByIdRequest
// - GET    /get-product-by-name      → getProductByNameRequest
// - GET    /get-product-by-brand     → getProductByBrandRequest
// - POST   /create-product           → createProductRequest
// - DELETE /delete-product           → deleteProductRequest
// - PUT    /edit-product             → editProductRequest

// ## Notas técnicas 💽
// - Todas las funciones retornan `response.data` tipado.
// - Los parámetros de query se pasan via `{ params }` para GET.
// - El body de POST/PUT se serializa automáticamente por Axios.
//-----------------------------------------------------------------------------//

const baseUrl = axios.create({
  baseURL: `${API_URL}/product`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

//──────────────────────────────────────────── GET ────────────────────────────────────────────//

/**
 * Obtiene el listado completo de productos.
 * `GET /get-products`
 */
export const getProductsRequest = async (): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-products");
  return response.data;
};

/**
 * Obtiene un producto por su ID.
 * `GET /get-product-by-id/:_id`
 */
export const getProductByIdRequest = async (_id: string): Promise<Product> => {
  const response = await baseUrl.get<Product>(`/get-product-by-id/${_id}`);
  return response.data;
};

/**
 * Busca productos por nombre (búsqueda parcial según implementación del backend).
 * `GET /get-product-by-name?name=<value>`
 */
export const getProductByNameRequest = async (
  name: string
): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-product-by-name", {
    params: { name },
  });
  return response.data;
};

/**
 * Filtra productos por marca.
 * `GET /get-product-by-brand?brand=<value>`
 */
export const getProductByBrandRequest = async (
  brand: string
): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-product-by-brand", {
    params: { brand },
  });
  return response.data;
};

/**
 * Obtiene todos los productos con sus presentaciones resumidas.
 * `GET /get-products-with-presentations`
 */
export const getProductsWithPresentationsRequest = async (): Promise<ProductWithPresentations[]> => {
  const response = await baseUrl.get<ProductWithPresentations[]>(
    "/get-products-with-presentations"
  );
  return response.data;
};

/**
 * Busca productos por nombre de producto O nombre de presentación.
 * `GET /search-products-with-presentations?term=<value>`
 */
export const searchProductsWithPresentationsRequest = async (
  term: string
): Promise<ProductWithPresentations[]> => {
  const response = await baseUrl.get<ProductWithPresentations[]>(
    "/search-products-with-presentations",
    { params: { term } }
  );
  return response.data;
};


//──────────────────────────────────────────── POST ───────────────────────────────────────────//

/**
 * Crea un nuevo producto.
 * `POST /create-product`
 */
export const createProductRequest = async (
  product: Omit<Product, "_id" | "created_at" | "updated_at">
): Promise<Product> => {
  const response = await baseUrl.post<Product>("/create-product", product);
  return response.data; 
};

//──────────────────────────────────────────── PUT ────────────────────────────────────────────//

/**
 * Edita un producto existente.
 * `PUT /edit-product`
 */
export const editProductRequest = async (
  product: Partial<Product> & Pick<Product, "_id">
): Promise<Product> => {
  const response = await baseUrl.put<Product>("/edit-product", product);
  return response.data;
};

//──────────────────────────────────────────── DELETE ─────────────────────────────────────────//

/**
 * Elimina un producto por su ID.
 * `DELETE /delete-product`
 *
 * Se envía el `_id` en el body ya que el router no define param en la URL.
 */
export const deleteProductRequest = async (_id: string): Promise<void> => {
  await baseUrl.delete("/delete-product", { data: { _id } });
};
