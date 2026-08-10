export interface ReceiptUploadAreaProps {
    acceptedFormats: string[];
    maxSize: string;
    onSelectFile: () => void;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFileDrop: (file: File) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    disabled?: boolean;
}

export interface ReceiptSummaryCardProps {
    status: string;
    description: string;
    progress?: number;
    isProcessing?: boolean;
    stats?: {
        productsInserted: number;
        productsSkipped: number;
        productsFailed: number;
        presentationsInserted: number;
        presentationsSkipped: number;
        presentationsFailed: number;
        pendingReviewCount: number;
        totalRows: number;
    };
}

export interface ReceiptAdviceCardProps {
    adviceItems: string[];
}

export interface ReceiptHelpCardProps {
    helpDescription: string;
    buttonLabel: string;
    onSupportClick: () => void;
}

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

export interface BulkInsertResult {
  inserted: string[];
  skippedDuplicates: string[];
  failed: { _id: string; error: string }[];
}

export interface ReceiptImportResult {
  stats: ReceiptStats;
  pendingReview: ReceiptPendingReview[];
  insertResult: {
    products: BulkInsertResult;
    presentations: BulkInsertResult;
  };
}