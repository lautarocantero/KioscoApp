// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { ReceiptStatusEnum } from "./receiptEnums";

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

export interface ReceiptBulkInsertResult {
  inserted: string[];
  skippedDuplicates: string[];
  failed: { _id: string; error: string }[];
}

export interface ReceiptImportResult {
  stats: ReceiptStats;
  pendingReview: ReceiptPendingReview[];
  insertResult: {
    products: ReceiptBulkInsertResult;
    presentations: ReceiptBulkInsertResult;
  };
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
}

export interface ReceiptPreviewResult {
  stats: ReceiptStats;
  pendingReview: ReceiptPendingReview[];
  products: ReceiptPreviewProduct[];
  presentations: ReceiptPreviewPresentation[];
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


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 💱 CONTEXT  💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 UTILIDADES  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/