import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportPaymentMethodsProps } from "@typings/stadistics/stadisticsComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
    height: "100%",
});

const ShopMonthlyReportPaymentMethods = ({ paymentMethods, isLoading, error }: ShopMonthlyReportPaymentMethodsProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    const colorByMethod = (method: string, index: number): string => {
        const palette = [theme.palette.primary.main, theme.custom.accents.blue, theme.palette.secondary.main, theme.custom.accents.orange];
        const knownIndex = ["cash", "debit", "transfer", "credit"].indexOf(method);
        return palette[knownIndex >= 0 ? knownIndex : index % palette.length];
    };

    return (
        <Box sx={CARD_SX}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.75 }}>
                {t("stadistics.monthlyReport.paymentMethods.title")}
            </Typography>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                    <Skeleton variant="rounded" height={10} />
                    {[0, 1, 2, 3].map((key) => (
                        <Skeleton key={key} variant="text" height={20} />
                    ))}
                </Box>
            )}

            {!isLoading && paymentMethods.length === 0 && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("stadistics.monthlyReport.paymentMethods.empty")}
                </Typography>
            )}

            {!isLoading && paymentMethods.length > 0 && (
                <>
                    <Box sx={{ display: "flex", height: 10, borderRadius: "5px", overflow: "hidden", mb: 2 }}>
                        {paymentMethods.map((method, index) => (
                            <Box
                                key={method.method}
                                sx={{ width: `${method.percentage}%`, bgcolor: colorByMethod(method.method, index) }}
                            />
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                        {paymentMethods.map((method, index) => (
                            <Box key={method.method} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: colorByMethod(method.method, index), flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                    {t(`stadistics.monthlyReport.paymentMethods.methods.${method.method}`, method.method)}
                                </Typography>
                                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                    {formatCurrency(method.amount)}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700, width: 40, textAlign: "right" }}>
                                    {`${Math.round(method.percentage)}%`}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ShopMonthlyReportPaymentMethods;
