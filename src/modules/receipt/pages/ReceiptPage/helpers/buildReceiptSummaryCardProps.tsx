import type { ReceiptImportResult } from "@typings/receipt/receiptComponentTypes";

export type ReceiptUploadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ReceiptSummaryCardViewProps {
  status: string;
  description: string;
}

/*══════════════════════════════════════════════════════════════════════════╗
║ 🧮 buildReceiptSummaryCardProps                                           ║
║                                                                          ║
║ Traduce el estado del thunk de subida (idle/loading/succeeded/failed)    ║
║ a las props de texto que consume ReceiptSummaryCard. Aislado del         ║
║ componente para poder testear el mapeo sin renderizar nada.              ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export function buildReceiptSummaryCardProps(
  status: ReceiptUploadStatus,
  result: ReceiptImportResult | null,
  error: string | null
): ReceiptSummaryCardViewProps {
  if (status === "loading") {
    return { status: "Procesando…", description: "Estamos analizando tu archivo" };
  }

  if (status === "failed") {
    return { status: "Error", description: error ?? "Ocurrió un error inesperado" };
  }

  if (status === "succeeded" && result) {
    const { products, presentations } = result.insertResult;
    return {
      status: "Carga completada",
      description: `${products.inserted.length} productos y ${presentations.inserted.length} presentaciones importadas`,
    };
  }

  return { status: "Aún no has cargado", description: "Ningún archivo procesado" };
}