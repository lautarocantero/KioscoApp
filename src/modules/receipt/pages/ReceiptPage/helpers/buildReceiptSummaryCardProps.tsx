import type { ReceiptStatusEnum } from "@typings/receipt/receiptEnums";
import type { ReceiptImportResult } from "@typings/receipt/receiptTypes";

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
  showProgress?: boolean;
  isProcessing?: boolean;
  stats?: ReceiptSummaryStats;
}

export function buildReceiptSummaryCardProps(
  status: ReceiptStatusEnum,
  result: ReceiptImportResult | null,
  errorMessage: string | null,
  progress: number
): ReceiptSummaryCardViewProps {
  if (status === "loading") {
    const isProcessing = progress >= 100;
    return {
      status: isProcessing ? "Analizando…" : "Subiendo archivo…",
      description: isProcessing ? "Revisando el contenido del archivo" : `${progress}% subido`,
      progress,
      showProgress: true,
      isProcessing,
    };
  }

  if (status === "awaitingConfirmation") {
    return { status: "Esperando confirmación", description: "Revisá el detalle antes de aplicar los cambios" };
  }

  if (status === "confirming") {
    return {
      status: "Aplicando cambios…",
      description: "Insertando productos y presentaciones",
      showProgress: true,
      isProcessing: true,
    };
  }

  if (status === "failed") {
    return { status: "Error", description: errorMessage ?? "Ocurrió un error inesperado" };
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