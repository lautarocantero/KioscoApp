import type { ReceiptPreviewProduct, ReceiptPreviewResult } from "@typings/receipt/receiptTypes";
import { MAX_VISIBLE_ITEMS } from "../../../../../config/constants";

export interface ReceiptConfirmModalView {
  stats: ReceiptPreviewResult["stats"];
  pendingReview: ReceiptPreviewResult["pendingReview"];
  pendingReviewCount: number;
  productsCount: number;
  presentationsCount: number;
  visibleProducts: ReceiptPreviewProduct[];
  remainingProductsCount: number;
  hasPendingReview: boolean;
}

export function buildReceiptConfirmModalView(preview: ReceiptPreviewResult): ReceiptConfirmModalView {
  const { stats, pendingReview, products, presentations } = preview;
  const visibleProducts = products.slice(0, MAX_VISIBLE_ITEMS);

  return {
    stats,
    pendingReview,
    pendingReviewCount: pendingReview.length,
    productsCount: products.length,
    presentationsCount: presentations.length,
    visibleProducts,
    remainingProductsCount: products.length - visibleProducts.length,
    hasPendingReview: pendingReview.length > 0,
  };
}