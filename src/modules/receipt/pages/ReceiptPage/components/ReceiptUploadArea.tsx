import { useState, type DragEvent } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import type { ReceiptUploadAreaProps } from "@typings/receipt/receiptComponentTypes";

const ReceiptUploadArea = ({
    acceptedFormats,
    maxSize,
    onSelectFile,
    onFileChange,
    onFileDrop,
    fileInputRef,
    disabled = false,
}: ReceiptUploadAreaProps): React.ReactNode => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        const file = e.dataTransfer.files?.[0];
        if (file) onFileDrop(file);
    };

    return (
        <NoisyCard
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "24px",
                minHeight: { xs: 520, md: 560 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: { xs: 3, md: 4 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: "100%",
                }}
            >
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        width: "100%",
                        minHeight: 260,
                        border: "1px dashed",
                        borderColor: (theme) =>
                            isDragging ? theme.palette.primary.main : theme.custom?.translucidWhite,
                        borderRadius: "24px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: { xs: 3, md: 4 },
                        py: { xs: 4, md: 5 },
                        gap: 1,
                        transition: "border-color 0.15s ease, background-color 0.15s ease",
                        backgroundColor: (theme) =>
                            isDragging ? theme.custom?.translucidWhite : "transparent",
                        opacity: disabled ? 0.6 : 1,
                        pointerEvents: disabled ? "none" : "auto",
                    }}
                >
                    <UploadFileOutlinedIcon sx={{ fontSize: 52, color: "primary.main" }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, maxWidth: 520 }}>
                        Arrastrá y soltá tu archivo Excel aquí
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                        o seleccioná un archivo desde tu computadora
                    </Typography>
                </Box>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFormats.join(",")}
                    hidden
                    onChange={onFileChange}
                    disabled={disabled}
                />

                <PrimaryButtonComponent
                    buttonText="Seleccionar archivo"
                    buttonOnClick={onSelectFile}
                    buttonWidth="200px"
                    disabled={disabled}
                    marginTop="0"
                />

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Formatos permitidos: {acceptedFormats.join(" • ")} • Tamaño máximo: {maxSize}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    borderTop: "1px solid",
                    borderColor: (theme) => theme.custom?.darkGray,
                    pt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    ¿Cómo debe ser tu archivo?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Descargá nuestra plantilla de ejemplo para asegurarte de que tus datos estén en el
                    formato correcto.
                </Typography>
                <PrimaryButtonComponent
                    buttonText="Descargar plantilla"
                    buttonOnClick={() => {
                        const link = document.createElement("a");
                        link.href = "/files/receiptTemplate.xls";
                        link.download = "plantilla-boletas.xls";
                        link.click();
                    }}
                    buttonWidth="220px"
                    marginTop="0"
                />
            </Box>
        </NoisyCard>
    );
};

export default ReceiptUploadArea;