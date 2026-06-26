import { Box, Typography } from "@mui/material";

export interface FormBannerProps {
    banner:       React.ReactNode;
    banner_text?: string;
    /** Si se pasa, solo muestra el banner en ese step (default: siempre visible) */
    visibleOnStep?: number;
    currentStep?:   number;
}

const FormBanner = ({ banner, banner_text, visibleOnStep, currentStep }: FormBannerProps): React.ReactNode => {
    if (!banner) return null;
    if (visibleOnStep !== undefined && currentStep !== visibleOnStep) return null;

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
                <Typography sx={{ fontSize: "0.81rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", mb: 0.5 }}>
                    {banner_text}
                </Typography>
            )}
            {banner}
        </Box>
    );
};

export default FormBanner;
