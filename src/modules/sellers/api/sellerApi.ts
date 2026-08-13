import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Seller, CreateSellerPayload, EditSellerPayload } from "../../../typings/seller/sellerTypes";
import type { SellerRol } from "../../../typings/seller/sellerEnums";

const baseUrl = axios.create({
    baseURL: `${API_URL}/seller`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
║                                                                          ║
║ Endpoints de lectura: listado completo y búsqueda por ID/nombre/email/   ║
║ rol de vendedores.                                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellersRequest                                                      ║
║                                                                          ║
║ Obtiene el listado completo de vendedores.                               ║
║ GET /get-sellers                                                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellersRequest = async (): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-sellers");
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellerByIdRequest                                                   ║
║                                                                          ║
║ Obtiene un vendedor por su ID.                                           ║
║ GET /get-seller-by-id                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellerByIdRequest = async (_id: string): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-id", { data: { _id } });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔎 getSellerByNameRequest                                                 ║
║                                                                          ║
║ Busca vendedores por nombre (búsqueda parcial según                      ║
║ implementación del backend).                                             ║
║ GET /get-seller-by-name                                                  ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellerByNameRequest = async (
  name: string
): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-name", {
    data: { name },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellerByEmailRequest                                                ║
║                                                                          ║
║ Filtra vendedores por email.                                             ║
║ GET /get-seller-by-email                                                 ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellerByEmailRequest = async (
  email: string
): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-email", {
    data: { email },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🔍 getSellerByRolRequest                                                  ║
║                                                                          ║
║ Filtra vendedores por rol.                                               ║
║ GET /get-seller-by-rol                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const getSellerByRolRequest = async (
  rol: SellerRol
): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-rol", {
    data: { rol },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoint de creación de vendedores.                                      ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ➕ createSellerRequest                                                    ║
║                                                                          ║
║ Crea un nuevo vendedor.                                                  ║
║ POST /create-seller                                                      ║
║                                                                          ║
║ El backend no devuelve el Seller completo, solo { _id, message }.        ║
║ La reconstrucción del objeto completo queda a cargo del thunk.           ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const createSellerRequest = async (
  seller: CreateSellerPayload
): Promise<{ _id: string; message: string }> => {
  const response = await baseUrl.post<{ _id: string; message: string }>("/create-seller", seller);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
║                                                                          ║
║ Endpoint de edición de vendedores.                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ editSellerRequest                                                     ║
║                                                                          ║
║ Edita un vendedor existente.                                             ║
║ PUT /edit-seller                                                         ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const editSellerRequest = async (
  seller: EditSellerPayload
): Promise<{ _id: string; message: string }> => {
  const response = await baseUrl.put<{ _id: string; message: string }>("/edit-seller", seller);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
║                                                                          ║
║ Endpoint de eliminación de vendedores.                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ deleteSellerRequest                                                   ║
║                                                                          ║
║ Elimina un vendedor por su ID.                                           ║
║ DELETE /delete-seller                                                    ║
║                                                                          ║
║ Se envía el _id en el body ya que el router no define param en la URL.   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const deleteSellerRequest = async (
  _id: string
): Promise<{ _id: string; message: string }> => {
  const response = await baseUrl.delete<{ _id: string; message: string }>("/delete-seller", { data: { _id } });
  return response.data;
};