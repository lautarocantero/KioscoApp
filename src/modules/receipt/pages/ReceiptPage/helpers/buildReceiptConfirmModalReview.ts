import { ReceiptDocAction } from "@typings/receipt/receiptEnums";
import type { ReceiptConfirmModalView, ReceiptPreviewProduct, ReceiptPreviewResult } from "@typings/receipt/receiptTypes";
import { MAX_VISIBLE_ITEMS } from "../../../../../config/constants";

export function buildReceiptConfirmModalView(preview: ReceiptPreviewResult): ReceiptConfirmModalView {
  const { stats, pendingReview, products, presentations } = preview;

  const visibleProducts = products.slice(0, MAX_VISIBLE_ITEMS);

  return {
    stats,
    pendingReviewCount: pendingReview.length,
    hasPendingReview: pendingReview.length > 0,
    productsCount: products.length,
    presentationsToCreateCount: presentations.filter((p) => p.action === ReceiptDocAction.Create).length,
    presentationsToUpdateCount: presentations.filter((p) => p.action === ReceiptDocAction.Update).length,
    presentationsCount: presentations.length,
    visibleProducts,
    remainingProductsCount: products.length - visibleProducts.length,
  };
}