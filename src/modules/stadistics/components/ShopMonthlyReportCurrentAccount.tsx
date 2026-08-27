import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SellFilterEnum } from "@typings/sells/sellsEnum";
import type { ShopMonthlyReportCurrentAccountProps } from "@typings/stadistics/stadisticsComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import OutlinedButtonComponent from "../../shared/components/Buttons/OutlinedButtonComponent";

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
    height: "100%",
});

const ROW_SX = (theme: Theme, isLast: boolean) => ({
    display: "flex",
    gap: 1.5,
    py: "10px",
    borderBottom: isLast ? "none" : "1px solid",
    borderColor: theme.custom.darkGray,
});

const ShopMonthlyReportCurrentAccount = ({ currentAccount, isLoading, error }: ShopMonthlyReportCurrentAccountProps): React.ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box sx={CARD_SX}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {t("stadistics.monthlyReport.currentAccount.title")}
            </Typography>
            <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mb: 1.75 })}>
                {t("stadistics.monthlyReport.currentAccount.subtitle")}
            </Typography>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            {isLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[0, 1, 2, 3].map((key) => (
                        <Skeleton key={key} variant="rounded" height={52} />
                    ))}
                </Box>
            )}

            {!isLoading && currentAccount && (
                <>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.currentAccount.debtorsCount")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.fontColor })}>
                            {currentAccount.debtorsCount}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.currentAccount.totalDebt")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.accents.gold })}>
                            {formatCurrency(currentAccount.totalDebt)}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, false)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.currentAccount.collectedThisMonth")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.palette.secondary.main })}>
                            {formatCurrency(currentAccount.collectedThisMonth)}
                        </Typography>
                    </Box>
                    <Box sx={(theme: Theme) => ROW_SX(theme, true)}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{t("stadistics.monthlyReport.currentAccount.newDebtThisMonth")}</Typography>
                        <Typography sx={(theme: Theme) => ({ fontSize: "1.25rem", fontWeight: 700, color: theme.custom.fontColor })}>
                            {formatCurrency(currentAccount.newDebtThisMonth)}
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, my: 1.75 })}>
                        {t("stadistics.monthlyReport.currentAccount.note", { count: currentAccount.paymentsCount })}
                    </Typography>

                    <OutlinedButtonComponent
                        buttonText={t("stadistics.monthlyReport.currentAccount.viewDebtorsButton")}
                        buttonOnClick={() => navigate(`/sells?filter=${SellFilterEnum.Parcial}`)}
                        buttonWidth="100%"
                    />
                </>
            )}
        </Box>
    );
};

export default ShopMonthlyReportCurrentAccount;
