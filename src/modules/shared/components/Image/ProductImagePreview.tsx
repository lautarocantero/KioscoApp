import { Box, Typography, type Theme } from "@mui/material";
import type { ProductImagePreviewProps } from "@typings/product/productComponentTypes";


const ProductImagePreview = ({ imageUrl }: ProductImagePreviewProps): React.ReactNode => (
    <Box sx={{
        border: "0.5px dashed", borderColor: "rgba(255,255,255,0.12)",
        borderRadius: "10px", p: 1.5,
        display: "flex", alignItems: "center", gap: 2,
        background: "rgba(255,255,255,0.02)",
    }}>
        <Box
            component="img"
            src={imageUrl}
            alt="Vista previa"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            sx={{
                width: 56, height: 56, borderRadius: "8px",
                objectFit: "cover", background: "rgba(255,255,255,0.06)", flexShrink: 0,
            }}
        />
        <Typography sx={(theme: Theme) => ({
            fontSize: "0.75rem",
            color: theme.custom?.translucidWhite,
            wordBreak: "break-all",
        })}>
            {imageUrl}
        </Typography>
    </Box>
);

export default ProductImagePreview;