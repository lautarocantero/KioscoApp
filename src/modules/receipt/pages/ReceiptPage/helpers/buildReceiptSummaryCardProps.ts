import { ReceiptStatusEnum } from "@typings/receipt/receiptEnums";
import type { ReceiptImportResult, ReceiptSummaryCardViewProps, ReceiptSummaryStats } from "@typings/receipt/receiptTypes";




export function buildReceiptSummaryCardProps(
  status: ReceiptStatusEnum,
  result: ReceiptImportResult | null,
  errorMessage: string | null,
  progress: number
): ReceiptSummaryCardViewProps {
  if (status === ReceiptStatusEnum.Loading) {
    const isProcessing = progress >= 100;
    return {
      status: isProcessing ? "Analizando…" : "Subiendo archivo…",
      description: isProcessing ? "Revisando el contenido del archivo" : `${progress}% subido`,
      progress,
      showProgress: true,
      isProcessing,
    };
  }

  if (status === ReceiptStatusEnum.AwaitingConfirmation) {
    return { status: "Esperando confirmación", description: "Revisá el detalle antes de aplicar los cambios" };
  }

  if (status === ReceiptStatusEnum.Confirming) {
    return {
      status: "Aplicando cambios…",
      description: "Insertando productos y presentaciones",
      showProgress: true,
      isProcessing: true,
    };
  }

  if (status === ReceiptStatusEnum.Failed) {
    return { status: "Error", description: errorMessage ?? "Ocurrió un error inesperado" };
  }

  if (status === ReceiptStatusEnum.Succeeded && result) {
    const productsInserted = result.insertResult?.products?.inserted?.length ?? 0;
    const productsSkipped = result.insertResult?.products?.skippedDuplicates?.length ?? 0;
    const productsFailed = result.insertResult?.products?.failed?.length ?? 0;
    const presentationsInserted = result.insertResult?.presentations?.inserted?.length ?? 0;
    const presentationsSkipped = result.insertResult?.presentations?.skippedDuplicates?.length ?? 0;
    const presentationsFailed = result.insertResult?.presentations?.failed?.length ?? 0;
    const pendingReviewCount = result.pendingReview?.length ?? 0;
    const totalRows = result.stats?.totalRows ?? 0;

    const stats: ReceiptSummaryStats = {
      productsInserted,
      productsSkipped,
      productsFailed,
      presentationsInserted,
      presentationsSkipped,
      presentationsFailed,
      pendingReviewCount,
      totalRows,
    };

    const hasIssues = productsFailed > 0 || presentationsFailed > 0 || pendingReviewCount > 0;

    return {
      status: hasIssues ? "Carga completada con observaciones" : "Carga completada",
      description: `${productsInserted} productos y ${presentationsInserted} presentaciones procesadas de ${totalRows} filas`,
      stats,
    };
}

  return { status: "Aún no has cargado", description: "Ningún archivo procesado" };
}