import { Box, Typography } from "@mui/material";
import type { SupplierErrorAlertProps } from "@typings/providers/providerComponentTypes";


const SupplierErrorAlert = ({ message }: SupplierErrorAlertProps): React.ReactNode => {
    
    if (!message) return null;

    return (
    <Box sx={{
        mb: 2, p: 1.5,
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        borderRadius: "8px",
        border: "1px solid rgba(244, 67, 54, 0.3)",
    }}>
        <Typography variant="body2" sx={{ color: "#F44336" }}>
            {message}
        </Typography>
    </Box>
);
}
export default SupplierErrorAlert;