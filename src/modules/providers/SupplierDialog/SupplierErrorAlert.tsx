import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SupplierErrorAlertProps } from "@typings/providers/providerComponentTypes";


const SupplierErrorAlert = ({ message }: SupplierErrorAlertProps): React.ReactNode => {
    
    if (!message) return null;

    return (
    <Box sx={(theme: Theme) => ({
        mb: 2, p: 1.5,
        backgroundColor: theme.custom.errorLight,
        borderRadius: "8px",
        border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
    })}>
        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.palette.error.main })}>
            {message}
        </Typography>
    </Box>
);
}
export default SupplierErrorAlert;