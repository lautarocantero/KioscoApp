import axios from "axios";
import { API_URL } from "../../../config/api";
import type { Seller, EditSellerPayload, SellerWithRole } from "../../../typings/seller/sellerTypes";

const baseUrl = axios.create({
    baseURL: `${API_URL}/seller`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getSellersRequest = async (): Promise<SellerWithRole[]> => {
  const response = await baseUrl.get<SellerWithRole[]>("/get-sellers");
  return response.data;
};

export const getSellerByIdRequest = async (_id: string): Promise<Seller[]> => {
  const response = await baseUrl.get<Seller[]>("/get-seller-by-id", { params: { _id } });
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

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ DELETE                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const deleteSellerRequest = async (
  _id: string
): Promise<{ _id: string; message: string }> => {
  const response = await baseUrl.delete<{ _id: string; message: string }>("/delete-seller", { data: { _id } });
  return response.data;
};