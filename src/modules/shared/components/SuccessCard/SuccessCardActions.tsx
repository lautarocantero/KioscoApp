import { Box, Button, type Theme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { SuccessCardAction } from "./SuccessCard";

interface SuccessCardActionsProps {
    actions: SuccessCardAction[];
}

const SuccessCardActions = ({ actions }: SuccessCardActionsProps): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, px: 3, pb: 4, pt: 1 }}>
        {actions.map(({ label, onClick, variant }) =>
            variant === "contained" ? (
                <Button
                    key={label}
                    onClick={onClick}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        px: 4,
                        py: 1.3,
                        borderRadius: "12px",
                        fontSize: "1rem",
                        color: "#fff",
                        background: "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
                        boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
                        "&:hover": {
                            background: "linear-gradient(90deg, #6D28D9 0%, #7C3AED 100%)",
                        },
                    }}
                >
                    {label}
                </Button>
            ) : (
                <Button
                    key={label}
                    onClick={onClick}
                    startIcon={<ArrowBackIcon sx={(theme: Theme) => ({ fontSize: "1rem", color: theme.palette?.secondary?.main })} />}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: theme.custom?.white,
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