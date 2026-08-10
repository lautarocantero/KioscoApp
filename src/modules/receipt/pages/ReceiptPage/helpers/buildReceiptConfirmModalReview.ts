import { ReceiptDocAction } from "@typings/receipt/receiptEnums";
import type { ReceiptConfirmModalView, ReceiptPreviewResult } from "@typings/receipt/receiptTypes";

export function buildReceiptConfirmModalView(preview: ReceiptPreviewResult): ReceiptConfirmModalView {
  const { stats, pendingReview, products, presentations } = preview;


  return {
    stats,
    pendingReviewCount: pendingReview.length,
    hasPendingReview: pendingReview.length > 0,
    productsCount: products.length,
    presentationsToCreateCount: presentations.filter((p) => p.action === ReceiptDocAction.Create).length,
    presentationsToUpdateCount: presentations.filter((p) => p.action === ReceiptDocAction.Update).length,
    presentationsCount: presentations.length,
  };
}