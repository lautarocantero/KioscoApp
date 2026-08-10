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
    const productsAlreadyExistingCount = result.productsAlreadyExisting?.length ?? 0;
    const productsTotal = productsInserted + productsAlreadyExistingCount;
    const presentationsCreated = result.insertResult?.presentations?.created?.length ?? 0;
    const presentationsUpdated = result.insertResult?.presentations?.updated?.length ?? 0;
    const presentationsUnchanged = result.insertResult?.presentations?.unchanged?.length ?? 0;
    const presentationsFailed = result.insertResult?.presentations?.failed?.length ?? 0;
    const pendingReviewCount = result.pendingReview?.length ?? 0;
    const totalRows = result.stats?.totalRows ?? 0;

    const stats: ReceiptSummaryStats = {
      productsTotal,
      productsInserted,
      productsSkipped,
      productsFailed,
      presentationsCreated,
      presentationsUpdated,
      presentationsUnchanged,
      presentationsFailed,
      pendingReviewCount,
      totalRows,
    };

    const presentationsProcessed = presentationsCreated + presentationsUpdated + presentationsUnchanged;

    return {
      status: "Carga completada",
      description: `${productsTotal} productos y ${presentationsProcessed} presentaciones procesadas de ${totalRows} filas`,
      stats,
    };
}

  return { status: "Aún no has cargado", description: "Ningún archivo procesado" };
}