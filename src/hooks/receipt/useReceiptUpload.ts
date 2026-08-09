import { useRef, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadReceiptThunk } from "../../store/receipt/receiptsThunks";
import { buildReceiptSummaryCardProps } from "../../modules/receipt/pages/ReceiptPage/helpers/buildReceiptSummaryCardProps";
import type { AppDispatch, RootState } from "../../store/receipt/receiptsSlice";

/*══════════════════════════════════════════════════════════════════════════╗
║ 🪝 useReceiptUpload                                                       ║
║                                                                          ║
║ Encapsula todo lo que ReceiptPage necesita: estado de Redux, ref del     ║
║ input file y los tres puntos de entrada de archivo (click, input        ║
║ nativo, drag&drop) unificados en un solo dispatch. La página no          ║
║ conoce el thunk ni el shape del slice, solo consume esto.                ║
╚══════════════════════════════════════════════════════════════════════════╝*/
export function useReceiptUpload() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, result, error } = useSelector((state: RootState) => state.receipt);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = status === "loading";

  const handleSelectFile = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (file: File): void => {
    dispatch(uploadReceiptThunk(file));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);
    e.target.value = ""; // permite volver a elegir el mismo archivo
  };

  const summaryCardProps = buildReceiptSummaryCardProps(status, result, error);

  return {
    fileInputRef,
    isUploading,
    summaryCardProps,
    handleSelectFile,
    handleFileChange,
    handleFileDrop: handleFileSelected,
  };
}