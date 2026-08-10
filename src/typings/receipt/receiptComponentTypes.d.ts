import type { ReceiptSummaryCardViewProps } from "../../modules/receipt/pages/ReceiptPage/helpers/buildReceiptSummaryCardProps";
import type { ReceiptPreviewResult } from "./receiptTypes";

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
    showProgress?: boolean;
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

export interface ReceiptConfirmModalProps {
  open: boolean;
  preview: ReceiptPreviewResult | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ReceiptSideCardsProps {
  summaryCardProps: ReceiptSummaryCardViewProps;
}

export interface ReceiptContentProps {
  handleSelectFile: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (file: File) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  isConfirming: boolean;
  isModalOpen: boolean;
  summaryCardProps: ReceiptSummaryCardViewProps;
}