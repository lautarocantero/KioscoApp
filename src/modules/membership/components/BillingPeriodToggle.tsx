import { Box, ToggleButton, ToggleButtonGroup, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import type { BillingPeriodToggleProps } from "@typings/membership/membershipComponentTypes";

const BillingPeriodToggle = ({ value, onChange }: BillingPeriodToggleProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <ToggleButtonGroup
                exclusive
                value={value}
                onChange={(_event, next: MembershipBillingPeriodEnum | null) => next && onChange(next)}
                aria-label={t("membership.plans.billingPeriod.groupLabel")}
                sx={(theme: Theme) => ({
                    padding: "5px",
                    borderRadius: "12px",
                    backgroundColor: theme.custom.lightBackground,
                    border: "1px solid",
                    borderColor: theme.custom.darkGray,
                    gap: 0.5,
                    "& .MuiToggleButtonGroup-grouped": {
                        border: 0,
                        borderRadius: "9px !important",
                        textTransform: "none",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: theme.custom.translucidFontColor,
                        gap: "7px",
                        padding: "9px 18px",
                        "&.Mui-selected": {
                            backgroundColor: theme.custom.background,
                            color: theme.custom.fontColor,
                            boxShadow: `0 1px 3px ${theme.custom.blackTranslucid}`,
                        },
                    },
                })}
            >
                <ToggleButton value={MembershipBillingPeriodEnum.Monthly} data-testid="membership-billing-period-monthly">
                    {t("membership.plans.billingPeriod.monthly")}
                </ToggleButton>
                <ToggleButton value={MembershipBillingPeriodEnum.Semiannual} data-testid="membership-billing-period-semiannual">
                    {t("membership.plans.billingPeriod.semiannual")}
                    <Box
                        component="span"
                        sx={(theme: Theme) => ({
                            display: "inline-flex",
                            alignItems: "center",
                            height: 20,
                            padding: "0 8px",
                            borderRadius: "999px",
                            background: `linear-gradient(135deg, ${theme.custom.adminBadge.gradientStart} 0%, ${theme.custom.adminBadge.gradientMid} 55%, ${theme.custom.adminBadge.gradientEnd} 100%)`,
                            color: theme.custom.adminBadge.textColor,
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                        })}
                    >
                        {t("membership.plans.billingPeriod.discountBadge")}
                    </Box>
                </ToggleButton>
            </ToggleButtonGroup>

            <Typography sx={(theme: Theme) => ({ fontSize: "0.82rem", color: theme.custom.translucidFontColor })}>
                {t("membership.plans.billingPeriod.helperText")}
            </Typography>
        </Box>
    );
};

export default BillingPeriodToggle;
