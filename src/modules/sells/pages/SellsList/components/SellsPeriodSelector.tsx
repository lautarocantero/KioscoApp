import { Box, Tooltip as MuiTooltip, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { SellsPeriodSelectorProps } from "@typings/sells/props";

const SellsPeriodSelector = ({ ariaLabel, period, options, availability, onChange, rangeLabel }: SellsPeriodSelectorProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Box
                role="tablist"
                aria-label={ariaLabel}
                sx={(theme: Theme) => ({
                    display: "flex",
                    gap: 0.75,
                    p: 0.5,
                    bgcolor: theme.custom.lightBackground,
                    border: `1px solid ${theme.custom.darkGray}`,
                    borderRadius: "0.5em",
                })}
            >
                {options.map((option) => {
                    const isActive = option === period;
                    const { canSelect, disabledReason } = availability[option];
                    const tooltipTitle = canSelect
                        ? ""
                        : disabledReason === "admin"
                            ? t("permissions.adminOnly")
                            : t("stadistics.monthlyReport.header.planOnly");

                    return (
                        <MuiTooltip key={option} title={tooltipTitle}>
                            <span>
                                <Box
                                    component="button"
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    disabled={!canSelect}
                                    onClick={() => onChange(option)}
                                    sx={(theme: Theme) => ({
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                        padding: "6px 14px",
                                        border: 0,
                                        borderRadius: "0.35em",
                                        bgcolor: isActive ? theme.palette.primary.main : "transparent",
                                        color: isActive ? theme.custom.fontColor : theme.custom.darkWhite,
                                        cursor: canSelect ? "pointer" : "not-allowed",
                                        opacity: canSelect ? 1 : 0.5,
                                        "&:focus-visible": {
                                            outline: `2px solid ${theme.palette.primary.main}`,
                                            outlineOffset: "2px",
                                        },
                                    })}
                                >
                                    {t(`sells.contextBand.period.options.${option}`)}
                                </Box>
                            </span>
                        </MuiTooltip>
                    );
                })}
            </Box>

            <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                {rangeLabel}
            </Typography>
        </Box>
    );
};

export default SellsPeriodSelector;
