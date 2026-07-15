import { alpha, Box, Button, type Theme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { SuccessCardActionsProps } from "@typings/ui/successCard.types";


const SuccessCardActions = ({ actions }: SuccessCardActionsProps): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, px: 3, pb: 4, pt: 1 }}>
        {actions.map(({ label, onClick, variant }) =>
            variant === "contained" ? (
                <Button
                    key={label}
                    onClick={onClick}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        fontWeight: 700,
                        px: 4,
                        py: 1.3,
                        borderRadius: "12px",
                        fontSize: "1rem",
                        color: theme.custom.white,
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                        "&:hover": {
                            background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
                        },
                    })}
                >
                    {label}
                </Button>
            ) : (
                <Button
                    key={label}
                    onClick={onClick}
                    startIcon={<ArrowBackIcon sx={(theme: Theme) => ({ fontSize: "1rem", color: theme.palette.secondary.main })} />}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: theme.custom.translucidFontColor,
                        "&:hover": { backgroundColor: "transparent", opacity: 0.8 },
                    })}
                >
                    {label}
                </Button>
            )
        )}
    </Box>
);

export default SuccessCardActions;