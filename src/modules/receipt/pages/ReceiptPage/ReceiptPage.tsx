import { Box, Typography } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import ReceiptUploadArea from "./components/ReceiptUploadArea";
import ReceiptSummaryCard from "./components/ReceiptSummaryCard";
import ReceiptAdviceCard from "./components/ReceiptAdviceCard";
import ReceiptHelpCard from "./components/ReceiptHelpCard";
import type {
    ReceiptUploadAreaProps,
    ReceiptSummaryCardProps,
    ReceiptAdviceCardProps,
    ReceiptHelpCardProps,
} from "@typings/receipt/receiptComponentTypes";

const uploadAreaProps: ReceiptUploadAreaProps = {
    acceptedFormats: [".xlsx", ".xls"],
    maxSize: "10 MB",
    onSelectFile: () => {
        console.log("Seleccionar archivo");
    },
};

const summaryCardProps: ReceiptSummaryCardProps = {
    status: "Aún no has cargado",
    description: "Ningún archivo procesado",
};

const adviceCardProps: ReceiptAdviceCardProps = {
    adviceItems: [
        "Asegurate de que el archivo tenga los encabezados correctos.",
        "No modifiqués el orden de las columnas.",
        "Verificá que los códigos de producto existan en el catálogo.",
    ],
};

const helpCardProps: ReceiptHelpCardProps = {
    helpDescription: "Contactá al soporte si tenés dudas sobre el formato o la carga de archivos.",
    buttonLabel: "Ir a soporte",
    onSupportClick: () => {
        console.log("Ir a soporte");
    },
};

const ReceiptPage = (): React.ReactNode => (
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

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
                    gap: 3,
                }}
            >
                <ReceiptUploadArea {...uploadAreaProps} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <ReceiptSummaryCard {...summaryCardProps} />
                    <ReceiptAdviceCard {...adviceCardProps} />
                    <ReceiptHelpCard {...helpCardProps} />
                </Box>
            </Box>
        </Box>
    </AppLayout>
);

export default ReceiptPage;