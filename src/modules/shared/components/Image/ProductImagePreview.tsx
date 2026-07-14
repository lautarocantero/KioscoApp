import { Box, Typography, type Theme } from "@mui/material";
import type { ProductImagePreviewProps } from "@typings/product/productComponentTypes";


const ProductImagePreview = ({ imageUrl }: ProductImagePreviewProps): React.ReactNode => (
    <Box sx={(theme: Theme) => ({
        border: `0.5px dashed", borderColor: ${theme.custom.darkGray}`,
        borderRadius: "10px", p: 1.5,
        display: "flex", alignItems: "center", gap: 2,
        background: `${theme.custom.darkGray}`,
    })}> 
        <Box
            component="img"
            src={imageUrl}
            alt="Vista previa"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            sx={(theme: Theme) => ({
                width: 56, height: 56, borderRadius: "8px",
                objectFit: "cover", background: `${theme.custom.darkGray}`, flexShrink: 0,
            })}
        />
        <Typography sx={(theme: Theme) => ({
            fontSize: "0.75rem",
            color: theme.custom?.translucidFontColor,
            wordBreak: "break-all",
        })}>
            {imageUrl}
        </Typography>
    </Box>
);

export default ProductImagePreview;