import { Box, Button, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ReceiptUploadAreaProps } from "@typings/receipt/receiptComponentTypes";

const ReceiptUploadArea = ({
    acceptedFormats,
    maxSize,
    onSelectFile,
}: ReceiptUploadAreaProps): React.ReactNode => (
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
                sx={{
                    width: "100%",
                    minHeight: 260,
                    border: "1px dashed",
                    borderColor: (theme) => theme.custom?.translucidWhite,
                    borderRadius: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: { xs: 3, md: 4 },
                    py: { xs: 4, md: 5 },
                    gap: 1,
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

            <Button
                variant="contained"
                size="large"
                onClick={onSelectFile}
                sx={{ textTransform: "none", minWidth: 200 }}
            >
                Seleccionar archivo
            </Button>

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
            <Button
                variant="outlined"
                color="primary"
                size="medium"
                sx={{ mt: 2, textTransform: "none" }}
            >
                Descargar plantilla
            </Button>
        </Box>
    </NoisyCard>
);

export default ReceiptUploadArea;
