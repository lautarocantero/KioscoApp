import { Box, Typography } from "@mui/material";
import type { ProductBannerComponentProps } from "@typings/product/productComponentTypes";

const ProductBannerComponent = ({ currentStep, banner, banner_text }: ProductBannerComponentProps) => {

    if (currentStep !== 0) return null;
    if (!banner) return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                alignItems: "flex-start",
                p: "12px 14px",
                backgroundColor: "rgba(3,134,238,0.07)",
                border: "0.5px solid rgba(3,134,238,0.2)",
                borderRadius: "10px",
            }}
        >
            {banner_text && (
                <Box>
                    <Typography sx={{ fontSize: "0.81rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", mb: 0.5 }}>
                        {banner_text}
                    </Typography>
                </Box>
            )}
            {banner}
        </Box>
    );
};

export default ProductBannerComponent;