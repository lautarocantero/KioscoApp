import { Box } from "@mui/material";
import type { ReactNode } from "react";
import ReceiptUploadArea from "./ReceiptUploadArea";
import ReceiptSideCards from "./ReceiptSideCards";
import type { ReceiptContentProps } from "@typings/receipt/receiptComponentTypes";
import { RECEIPT_ACCEPTED_FORMATS, RECEIPT_MAX_SIZE } from "../../../../../config/constants";

const ReceiptContent = ({
        handleSelectFile,
        handleFileChange,
        handleFileDrop,
        fileInputRef,
        isUploading,
        isConfirming,
        isModalOpen,
        summaryCardProps,
}: ReceiptContentProps ): ReactNode => {

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3 }}>
        <ReceiptUploadArea
          acceptedFormats={RECEIPT_ACCEPTED_FORMATS}
          maxSize={RECEIPT_MAX_SIZE}
          onSelectFile={handleSelectFile}
          onFileChange={handleFileChange}
          onFileDrop={handleFileDrop}
          fileInputRef={fileInputRef}
          disabled={isUploading || isConfirming || isModalOpen}
        />

        <ReceiptSideCards summaryCardProps={summaryCardProps} />
    </Box>
  );
};

export default ReceiptContent;