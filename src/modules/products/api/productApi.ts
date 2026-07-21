import axios from "axios";
import { API_URL } from "../../../config/api";
import type {
  CreateProductBody,
  CreateProductResponse,
  EditProductBody,
  Product,
  ProductWithPresentations,
} from "@typings/product/productTypes";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";

const baseUrl = axios.create({
  baseURL: `${API_URL}/product`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
║                                                                          ║
║ Endpoints de lectura: listado completo, búsqueda por ID/nombre/marca     ║
║ y consultas combinadas de productos con sus presentaciones.              ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getProductsRequest                                                     ║
║                                                                          ║
║ Obtiene el listado completo de productos.                                ║
║ GET /get-products                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getProductsRequest = async (): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-products");
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getProductByIdRequest                                                  ║
║                                                                          ║
║ Obtiene un producto por su ID.                                           ║
║ GET /get-product-by-id/:_id                                              ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getProductByIdRequest = async (_id: string): Promise<Product> => {
  const response = await baseUrl.get<Product>(`/get-product-by-id/${_id}`);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔎 getProductByNameRequest                                                ║
║                                                                          ║
║ Busca productos por nombre (búsqueda parcial según                       ║
║ implementación del backend).                                             ║
║ GET /get-product-by-name?name=<value>                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getProductByNameRequest = async (
  name: string
): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-product-by-name", {
    params: { name },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getProductByBrandRequest                                               ║
║                                                                          ║
║ Filtra productos por marca.                                              ║
║ GET /get-product-by-brand?brand=<value>                                  ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getProductByBrandRequest = async (
  brand: string
): Promise<Product[]> => {
  const response = await baseUrl.get<Product[]>("/get-product-by-brand", {
    params: { brand },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getProductsWithPresentationsRequest                                    ║
║                                                                          ║
║ Obtiene todos los productos con sus presentaciones resumidas.            ║
║ GET /get-products-with-presentations                                     ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getProductsWithPresentationsRequest = async (): Promise<ProductWithPresentations[]> => {
  const response = await baseUrl.get<ProductWithPresentations[]>(
    "/get-products-with-presentations"
  );
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔎 searchProductsWithPresentationsRequest                                 ║
║                                                                          ║
║ Busca productos por nombre de producto O nombre de presentación.         ║
║ GET /search-products-with-presentations?term=<value>                     ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const searchProductsWithPresentationsRequest = async (
  term: string,
  category?: PresentationCategory
): Promise<ProductWithPresentations[]> => {
  const response = await baseUrl.get<ProductWithPresentations[]>(
    "/search-products-with-presentations",
    { params: { term, category } }
  );
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoint de creación de productos.                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ➕ createProductRequest                                                   ║
║                                                                          ║
║ Crea un nuevo producto.                                                  ║
║ POST /create-product                                                     ║
║                                                                          ║
║ El backend no devuelve el Product completo, solo { _id, message }.       ║
║ La reconstrucción del objeto completo queda a cargo del thunk.           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const createProductRequest = async (
  product: CreateProductBody
): Promise<CreateProductResponse> => {
  const response = await baseUrl.post<CreateProductResponse>("/create-product", product);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
║                                                                          ║
║ Endpoint de edición de productos.                                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ editProductRequest                                                    ║
║                                                                          ║
║ Edita un producto existente.                                             ║
║ PUT /edit-product                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const editProductRequest = async (
  product: EditProductBody
): Promise<Product> => {
  const response = await baseUrl.put<Product>("/edit-product", product);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
║                                                                          ║
║ Endpoint de eliminación de productos.                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ deleteProductRequest                                                  ║
║                                                                          ║
║ Elimina un producto por su ID.                                           ║
║ DELETE /delete-product                                                   ║
║                                                                          ║
║ Se envía el _id en el body ya que el router no define param en la URL.   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const deleteProductRequest = async (_id: string): Promise<void> => {
  await baseUrl.delete("/delete-product", { data: { _id } });
};