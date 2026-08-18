import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";
import type { Seller, EditSellerPayload, SellerWithRole } from "../../../typings/seller/sellerTypes";

// Todos los endpoints de /seller ahora requieren pertenencia al kiosco
// activo (ver requireKioscoContext en el back) — createHttpClient adjunta el
// header x-kiosco-id automáticamente en cada request.
const baseUrl = createHttpClient(`${API_URL}/seller`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getSellersRequest = async (): Promise<SellerWithRole[]> => {
  const response = await baseUrl.get<SellerWithRole[]>("/get-sellers");
  return response.data;
};

// El back resuelve role+email contra Auth acá también (mismo join que get-sellers).
export const getSellerByIdRequest = async (_id: string): Promise<SellerWithRole[]> => {
  const response = await baseUrl.get<SellerWithRole[]>("/get-seller-by-id", { params: { _id } });
  return response.data;
};

export const getSellerByNameRequest = async (
  name: string
): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-name", {
    data: { name },
  });
  return response.data;
};

export const getSellerByEmailRequest = async (
  email: string
): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-email", {
    data: { email },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const editSellerRequest = async (
  seller: EditSellerPayload
): Promise<{ _id: string; message: string }> => {
  const response = await baseUrl.put<{ _id: string; message: string }>("/edit-seller", seller);
  return response.data;
};

// No hay DELETE acá: eliminar un vendedor borra la cuenta completa
// (Auth + Seller en cascada), eso vive en authApi.authDeleteAccountRequest.