// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { ChangeEvent, RefObject } from "react";
import type { ReceiptDocAction, ReceiptStatusEnum } from "./receiptEnums";

export interface ReceiptStats {
  totalRows: number;
  totalProducts: number;
  multiPresentation: number;
  rubroFallback: number;
  noSize: number;
  noModelType: number;
  noBarcode: number;
}

export interface ReceiptPendingReview {
  product: string;
  presentation: string;
  reasons: string[];
}

export interface ReceiptSummaryStats {
  productsTotal: number;
  productsInserted: number;
  productsSkipped: number;
  productsFailed: number;
  presentationsCreated: number;
  presentationsUpdated: number;
  presentationsUnchanged: number;
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

export interface ReceiptBulkInsertResult {
  inserted: string[];
  skippedDuplicates: string[];
  failed: { _id: string; error: string }[];
}

export interface ReceiptBulkWriteResult {
  created: string[];
  updated: string[];
  unchanged: string[];
  failed: { _id: string; error: string }[];
}

export interface ReceiptImportResult {
  stats: ReceiptStats;
  pendingReview: ReceiptPendingReview[];
  insertResult: {
    products: ReceiptBulkInsertResult;
    presentations: ReceiptBulkWriteResult;
  };
  // Ids de productos que ya existían en la BD y por lo tanto no se
  // insertaron de nuevo (resueltos en el preview, pasados sin cambios
  // por el front al confirmar). Sirve para calcular el total real de
  // productos del archivo (nuevos + existentes) en el resumen.
  productsAlreadyExisting: string[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 PREVIEW (paso previo a confirmar la importación) 📋                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ReceiptPreviewProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  presentations: string[];
}

export interface ReceiptPreviewPresentation {
  _id: string;
  product_id: string;
  sku: string;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  min_stock: number;
  model_type: string;
  model_size: number;
  model_unit: string;
  category: string[];
  status: string;
  created_at: string;
  updated_at: string;
  action: ReceiptDocAction;
  existingId: string | null;
  existingProductId: string | null;
}

export interface ReceiptPreviewResult {
  stats: ReceiptStats;
  pendingReview: ReceiptPendingReview[];
  products: ReceiptPreviewProduct[];
  presentations: ReceiptPreviewPresentation[];
  productsAlreadyExisting: string[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


export interface ReceiptState {
  status: ReceiptStatusEnum;
  preview: ReceiptPreviewResult | null;
  result: ReceiptImportResult | null;
  isLoading: boolean;
  errorMessage: string | null;
  uploadProgress: number;
}

export interface ReceiptStateError {
  errorMessage: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseReceiptUploadReturn {
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  isConfirming: boolean;
  isModalOpen: boolean;
  preview: ReceiptPreviewResult | null;
  summaryCardProps: ReceiptSummaryCardViewProps;
  handleSelectFile: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (file: File) => void;
  handleConfirmImport: () => void;
  handleCancelPreview: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 💱 CONTEXT  💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 UTILIDADES  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/