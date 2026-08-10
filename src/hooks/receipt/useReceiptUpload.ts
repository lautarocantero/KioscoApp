import { useRef, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previewReceiptThunk, confirmReceiptThunk } from "../../store/receipt/receiptsThunks";
import { resetReceiptState } from "../../store/receipt/receiptsSlice";
import { buildReceiptSummaryCardProps } from "../../modules/receipt/pages/ReceiptPage/helpers/buildReceiptSummaryCardProps";
import type { AppDispatch, RootState } from "../../store/receipt/receiptsSlice";

export function useReceiptUpload() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, preview, result, errorMessage, uploadProgress } = useSelector((state: RootState) => state.receipt);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = status === "loading";
  const isConfirming = status === "confirming";
  const isModalOpen = status === "awaitingConfirmation";

  const handleSelectFile = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (file: File): void => {
    dispatch(previewReceiptThunk(file));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);
    e.target.value = "";
  };

  const handleConfirmImport = (): void => {
    if (preview) dispatch(confirmReceiptThunk(preview));
  };

  const handleCancelPreview = (): void => {
    dispatch(resetReceiptState());
  };

  const summaryCardProps = buildReceiptSummaryCardProps(status, result, errorMessage, uploadProgress);

  return {
    fileInputRef,
    isUploading,
    isConfirming,
    isModalOpen,
    preview,
    summaryCardProps,
    handleSelectFile,
    handleFileChange,
    handleFileDrop: handleFileSelected,
    handleConfirmImport,
    handleCancelPreview,
  };
}