import { API_URL } from "../../../config/api";
import type {
  CreateProviderBody,
  CreateProviderResponse,
  EditProviderBody,
  Provider,
  ProviderStats,
} from "@typings/provider/providerTypes";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/provider`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getProvidersRequest = async (): Promise<Provider[]> => {
  const response = await baseUrl.get<Provider[]>("/get-providers");
  return response.data;
};

// El back lee estos filtros de req.query — un GET real de navegador nunca
// manda body (a diferencia de curl/Postman, que sí dejan armar uno a mano).
export const getProviderByIdRequest = async (_id: string): Promise<Provider[]> => {
  const response = await baseUrl.get<Provider[]>("/get-provider-by-id", { params: { _id } });
  return response.data;
};

export const getProviderByNameRequest = async (name: string): Promise<Provider[]> => {
  const response = await baseUrl.get<Provider[]>("/get-provider-by-name", { params: { name } });
  return response.data;
};

export const getProvidersByContactRequest = async (contact: string): Promise<Provider[]> => {
  const response = await baseUrl.get<Provider[]>("/get-providers-by-contact", { params: { contact } });
  return response.data;
};

export const getProviderStatsRequest = async (): Promise<ProviderStats> => {
  const response = await baseUrl.get<ProviderStats>("/get-providers-stats");
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const createProviderRequest = async (body: CreateProviderBody): Promise<CreateProviderResponse> => {
  const response = await baseUrl.post<CreateProviderResponse>("/create-provider", body);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const editProviderRequest = async (body: EditProviderBody): Promise<{ message: string }> => {
  const response = await baseUrl.put<{ message: string }>("/edit-provider", body);
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const deleteProviderRequest = async (_id: string): Promise<{ message: string }> => {
  const response = await baseUrl.delete<{ message: string }>("/delete-provider", { data: { _id } });
  return response.data;
};
