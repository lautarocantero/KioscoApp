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
║ POST /receipts (mount) -> "/" (ruta interna). Reporta progreso de        ║
║ subida real vía onUploadProgress de axios.                               ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const uploadReceiptRequest = async (
  file: File,
  onUploadProgress?: (percent: number) => void
): Promise<ReceiptImportResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await baseUrl.post<ReceiptImportResult>("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!onUploadProgress || !event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onUploadProgress(percent);
    },
  });
  return response.data;
};