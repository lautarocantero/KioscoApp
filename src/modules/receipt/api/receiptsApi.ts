import type { ReceiptImportResult, ReceiptPreviewResult } from "@typings/receipt/receiptTypes";
import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/receipts`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 previewReceiptRequest                                                  ║
║ Sube el archivo para analizarlo. NO inserta nada en la BD.               ║
║ POST /receipts/preview                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const previewReceiptRequest = async (
  file: File,
  onUploadProgress?: (percent: number) => void
): Promise<ReceiptPreviewResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await baseUrl.post<ReceiptPreviewResult>("/preview", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!onUploadProgress || !event.total) return;
      onUploadProgress(Math.round((event.loaded * 100) / event.total));
    },
  });
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 confirmReceiptRequest                                                  ║
║ Envía el preview confirmado por el usuario para insertarlo.              ║
║ POST /receipts/confirm                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export const confirmReceiptRequest = async (
  preview: ReceiptPreviewResult
): Promise<ReceiptImportResult> => {
  const response = await baseUrl.post<ReceiptImportResult>("/confirm", preview);
  return response.data;
};