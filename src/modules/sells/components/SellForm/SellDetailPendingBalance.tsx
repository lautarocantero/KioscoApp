import { Box, Stack, Typography, type Theme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "react-i18next";
import type { SellDetailPendingBalanceProps } from "@typings/sells/SellComponentTypes";
import { formatAmount } from "../../../cart/helpers/ProductDialog/Formatter/formatDetail";
import type { ReactNode } from "react";


const SellDetailPendingBalance = ({
    pendingBalance,
    debtorName,
}: SellDetailPendingBalanceProps): ReactNode => {
    const { t } = useTranslation();

    if (pendingBalance === null) return null;
    if (pendingBalance <= 0) return null;


    return (
        <Box
            component="section"
            role="status"
            aria-live="polite"
            aria-label={t("sells.detail.pendingBalance.ariaLabel")}
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
                        {t("sells.settleDebtDialog.pendingBalanceLabel")}
                    </Typography>
                </Stack>
                <Typography
                    component="p"
                    variant="body2"
                    fontWeight={700}
                    sx={(theme: Theme) => ({ color: theme.palette.warning.main })}
                    aria-label={t("sells.detail.pendingBalance.amountAriaLabel", { amount: formatAmount(pendingBalance) })}
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
                {debtorName
                    ? t("sells.detail.pendingBalance.descriptionWithDebtor", { debtorName })
                    : t("sells.detail.pendingBalance.descriptionWithoutDebtor")}
            </Typography>
        </Box>
    );
};

export default SellDetailPendingBalance;