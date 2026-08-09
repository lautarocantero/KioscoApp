import type { ReceiptImportResult } from "@typings/receipt/receiptComponentTypes";
import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/receipts`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
║                                                                          ║
║ Endpoint de importación de boletas (xls/xlsx -> productos + presentations)║
╚══════════════════════════════════════════════════════════════════════════╝*/

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 uploadReceiptRequest                                                   ║
║                                                                          ║
║ Sube un archivo xls/xlsx para analizarlo, agruparlo e insertarlo.        ║
║ POST /receipts (mount) -> "/" (ruta interna)                             ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const uploadReceiptRequest = async (
  file: File
): Promise<ReceiptImportResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await baseUrl.post<ReceiptImportResult>("/", formData);
  return response.data;
};