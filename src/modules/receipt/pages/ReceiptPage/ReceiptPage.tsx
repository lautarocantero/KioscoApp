import { Box } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import { useReceiptUpload } from "@hooks/receipt/useReceiptUpload";
import ReceiptConfirmModal from "./components/ReceiptConfirmModal";
import ReceiptPageTitle from "./components/ReceiptTitle";
import ReceiptContent from "./components/ReceiptContent";
import type { ReactNode } from "react";

const ReceiptPage = (): ReactNode => {
  const {
    fileInputRef,
    isUploading,
    isConfirming,
    isModalOpen,
    preview,
    summaryCardProps,
    handleSelectFile,
    handleFileChange,
    handleFileDrop,
    handleConfirmImport,
    handleCancelPreview,
  } = useReceiptUpload();

  return (
    <AppLayout fullWidth>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
        <ReceiptPageTitle />

        <ReceiptContent 
          handleSelectFile={handleSelectFile}
          handleFileChange={handleFileChange}
          handleFileDrop={handleFileDrop}
          fileInputRef={fileInputRef}
          isUploading={isUploading}
          isConfirming={isConfirming}
          isModalOpen={isModalOpen}
          summaryCardProps={summaryCardProps}
        />
      </Box>

      <ReceiptConfirmModal
        open={isModalOpen}
        preview={preview}
        loading={isConfirming}
        onConfirm={handleConfirmImport}
        onCancel={handleCancelPreview}
      />
    </AppLayout>
  );
};

export default ReceiptPage;