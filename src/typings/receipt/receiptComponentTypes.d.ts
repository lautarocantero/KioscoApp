import type { ChangeEvent, RefObject } from "react";
import type { ReceiptPreviewResult, ReceiptSummaryCardViewProps } from "./receiptTypes";

export interface ReceiptUploadAreaProps {
    acceptedFormats: string[];
    maxSize: string;
    onSelectFile: () => void;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFileDrop: (file: File) => void;
    fileInputRef: RefObject<HTMLInputElement | null>;
    disabled?: boolean;
}

export interface ReceiptSummaryCardProps {
    status: string;
    description: string;
    progress?: number;
    showProgress?: boolean;
    isProcessing?: boolean;
    stats?: {
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