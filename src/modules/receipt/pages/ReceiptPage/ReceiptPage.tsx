import { Box, Typography } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import ReceiptUploadArea from "./components/ReceiptUploadArea";
import ReceiptSummaryCard from "./components/ReceiptSummaryCard";
import ReceiptAdviceCard from "./components/ReceiptAdviceCard";
import { RECEIPT_ACCEPTED_FORMATS, RECEIPT_ADVICE_ITEMS, RECEIPT_MAX_SIZE } from "../constants/receiptStaticContent";
import { useReceiptUpload } from "@hooks/receipt/useReceiptUpload";
import ReceiptConfirmModal from "./components/ReceiptConfirmModal";

const ReceiptPage = (): React.ReactNode => {
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Carga de boletas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Importa tus boletas desde un archivo Excel y actualizá tu inventario.
          </Typography>
        </Box>

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

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ReceiptSummaryCard {...summaryCardProps} />
            <ReceiptAdviceCard adviceItems={RECEIPT_ADVICE_ITEMS} />
          </Box>
        </Box>
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