import type { ReceiptImportResult } from "@typings/receipt/receiptComponentTypes";

export type ReceiptUploadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ReceiptSummaryStats {
  productsInserted: number;
  productsSkipped: number;
  productsFailed: number;
  presentationsInserted: number;
  presentationsSkipped: number;
  presentationsFailed: number;
  pendingReviewCount: number;
  totalRows: number;
}

export interface ReceiptSummaryCardViewProps {
  status: string;
  description: string;
  progress?: number;
  isProcessing?: boolean; // 100% subido pero backend aún procesando
  stats?: ReceiptSummaryStats;
}

/*══════════════════════════════════════════════════════════════════════════╗
║ 🧮 buildReceiptSummaryCardProps                                           ║
║                                                                          ║
║ Traduce el estado del thunk de subida (idle/loading/succeeded/failed)    ║
║ + el progreso real de subida a las props que consume                    ║
║ ReceiptSummaryCard. Aislado del componente para poder testear el         ║
║ mapeo sin renderizar nada.                                               ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export function buildReceiptSummaryCardProps(
  status: ReceiptUploadStatus,
  result: ReceiptImportResult | null,
  error: string | null,
  progress: number
): ReceiptSummaryCardViewProps {
  if (status === "loading") {
    const isProcessing = progress >= 100;
    return {
      status: isProcessing ? "Procesando…" : "Subiendo archivo…",
      description: isProcessing
        ? "Analizando e importando los datos del archivo"
        : `${progress}% subido`,
      progress,
      isProcessing,
    };
  }

  if (status === "failed") {
    return { status: "Error", description: error ?? "Ocurrió un error inesperado" };
  }

  if (status === "succeeded" && result) {
    const { products, presentations } = result.insertResult;
    const stats: ReceiptSummaryStats = {
      productsInserted: products.inserted.length,
      productsSkipped: products.skippedDuplicates.length,
      productsFailed: products.failed.length,
      presentationsInserted: presentations.inserted.length,
      presentationsSkipped: presentations.skippedDuplicates.length,
      presentationsFailed: presentations.failed.length,
      pendingReviewCount: result.pendingReview.length,
      totalRows: result.stats.totalRows,
    };

    const hasIssues = stats.productsFailed > 0 || stats.presentationsFailed > 0 || stats.pendingReviewCount > 0;

    return {
      status: hasIssues ? "Carga completada con observaciones" : "Carga completada",
      description: `${stats.productsInserted} productos y ${stats.presentationsInserted} presentaciones importadas de ${stats.totalRows} filas`,
      stats,
    };
  }

  return { status: "Aún no has cargado", description: "Ningún archivo procesado" };
}