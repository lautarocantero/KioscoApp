import { Box, MenuItem, Select, Tooltip as MuiTooltip, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { ShopMonthlyReportHeaderProps } from "@typings/stadistics/stadisticsComponentTypes";
import { REPORT_COMPARE_WITH_VALUES } from "@typings/stadistics/stadisticsEnums";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";

const SELECT_SX = (theme: Theme, minWidth: number) => ({
    bgcolor: theme.custom.background,
    borderRadius: "0.4em",
    fontSize: theme.typography.body2.fontSize,
    minWidth,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.custom.darkGray },
});

const ShopMonthlyReportHeader = ({
    kioscoName,
    monthLabel,
    comparisonLabel,
    daysInMonth,
    monthOptions,
    selectedMonth,
    onMonthChange,
    canChangeMonth,
    compareWith,
    onCompareChange,
    canCompare,
    compareDisabledReason,
    onDownloadPdf,
    isDownloadDisabled,
    isLoading,
}: ShopMonthlyReportHeaderProps): React.ReactNode => {
    const { t } = useTranslation();
    const compareTooltip = compareDisabledReason === "admin" ? t("permissions.adminOnly") : t("stadistics.monthlyReport.header.planOnly");

    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "flex-end" },
                justifyContent: "space-between",
                gap: 3,
            }}
        >
            <Box>
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("stadistics.monthlyReport.header.kioscoLine", { kioscoName })}
                </Typography>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={(theme: Theme) => ({ fontWeight: 500, color: theme.custom.fontColor, mt: 0.75, mb: 0.5 })}
                >
                    {t("stadistics.monthlyReport.header.title", { month: monthLabel })}
                </Typography>
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                    {t("stadistics.monthlyReport.header.daysLabel", { count: daysInMonth ?? 0 })}
                    {comparisonLabel ? ` · ${t("stadistics.monthlyReport.header.comparedWith", { month: comparisonLabel })}` : ""}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
                <MuiTooltip title={canChangeMonth ? "" : t("stadistics.monthlyReport.header.planOnly")}>
                    <span>
                        <Select
                            value={selectedMonth}
                            onChange={onMonthChange}
                            size="small"
                            disabled={!canChangeMonth}
                            aria-label={t("stadistics.monthlyReport.header.monthAriaLabel")}
                            sx={(theme: Theme) => SELECT_SX(theme, 150)}
                        >
                            {monthOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </span>
                </MuiTooltip>

                <MuiTooltip title={canCompare ? "" : compareTooltip}>
                    <span>
                        <Select
                            value={compareWith}
                            onChange={onCompareChange}
                            size="small"
                            disabled={!canCompare}
                            aria-label={t("stadistics.monthlyReport.header.compareAriaLabel")}
                            sx={(theme: Theme) => SELECT_SX(theme, 170)}
                        >
                            {REPORT_COMPARE_WITH_VALUES.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {t(`stadistics.monthlyReport.header.compareOptions.${option}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </span>
                </MuiTooltip>

                <PrimaryButtonComponent
                    buttonText={t("stadistics.monthlyReport.header.downloadPdf")}
                    buttonOnClick={onDownloadPdf}
                    buttonWidth="auto"
                    padding={0.75}
                    disabled={isDownloadDisabled || isLoading}
                    icon={<FileDownloadOutlinedIcon fontSize="small" sx={{ mr: 0.75 }} />}
                />
            </Box>
        </Box>
    );
};

export default ShopMonthlyReportHeader;
