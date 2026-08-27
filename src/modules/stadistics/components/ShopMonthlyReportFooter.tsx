import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportFooterProps } from "@typings/stadistics/stadisticsComponentTypes";

const ShopMonthlyReportFooter = ({ kioscoName, generatedAt }: ShopMonthlyReportFooterProps): React.ReactNode => {
    const { t } = useTranslation();

    if (!generatedAt) return null;

    return (
        <Box component="footer" sx={{ pt: 0.75 }}>
            <Typography sx={(theme: Theme) => ({ fontSize: "0.72rem", color: theme.custom.translucidFontColor })}>
                {t("stadistics.monthlyReport.footer.generated", {
                    kioscoName,
                    date: new Date(generatedAt).toLocaleString("es-AR"),
                })}
            </Typography>
        </Box>
    );
};

export default ShopMonthlyReportFooter;
