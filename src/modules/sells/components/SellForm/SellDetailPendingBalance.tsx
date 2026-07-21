import { Box, Stack, Typography, type Theme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type {  SellDetailPendingBalanceProps } from "@typings/sells/SellComponentTypes";
import { formatAmount } from "../../helpers/ProductDialog/Formatter/formatDetail";


const SellDetailPendingBalance = ({
    pendingBalance,
}: SellDetailPendingBalanceProps): React.ReactNode => {

    if(pendingBalance < 0) {
        return null;
    }

    return (
        <Box
            component="section"
            role="status"
            aria-live="polite"
            aria-label="Saldo pendiente de la venta"
            sx={(theme: Theme) => ({
                mt: 1,
                p: 1.5,
                borderRadius: 2,
                bgcolor: `${theme.palette.warning.main}1A`,
                border: `1px solid ${theme.palette.warning.main}`,
            })}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <ErrorOutlineIcon
                        fontSize="small"
                        aria-hidden="true"
                        sx={(theme: Theme) => ({ color: theme.palette.warning.main })}
                    />
                    <Typography
                        component="h3"
                        variant="body2"
                        fontWeight={600}
                        sx={(theme: Theme) => ({ color: theme.palette.warning.main })}
                    >
                        Saldo pendiente
                    </Typography>
                </Stack>
                <Typography
                    component="p"
                    variant="body2"
                    fontWeight={700}
                    sx={(theme: Theme) => ({ color: theme.palette.warning.main })}
                    aria-label={`Monto pendiente: ${formatAmount(pendingBalance)}`}
                >
                    {formatAmount(pendingBalance)}
                </Typography>
            </Stack>
            <Typography
                component="p"
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
            >
                El cliente abonó parcialmente esta venta.
            </Typography>
        </Box>
    );
};

export default SellDetailPendingBalance;