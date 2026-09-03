import type { ReactNode } from "react";
import { Box, Chip, List, ListItem, ListItemIcon, ListItemText, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StarIcon from "@mui/icons-material/Star";
import { useTranslation } from "react-i18next";
import { KioscoPlanEnum, MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanCardProps } from "@typings/membership/membershipComponentTypes";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";
import { formatMembershipPrice } from "../helpers/formatMembershipPrice";

const PLAN_ICONS: Record<KioscoPlanEnum, ReactNode> = {
    [KioscoPlanEnum.Standard]: <Inventory2OutlinedIcon fontSize="small" />,
    [KioscoPlanEnum.Deluxe]: <WorkspacePremiumIcon fontSize="small" />,
};

const MembershipPlanCard = ({ plan, pricing, billingPeriod, isCurrent, isSubmitting, onSelect }: MembershipPlanCardProps): React.ReactNode => {
    const { t } = useTranslation();
    const planName = t(`membership.plans.names.${plan.id}`);
    const isSemiannual = billingPeriod === MembershipBillingPeriodEnum.Semiannual;

    return (
        <Box
            component="article"
            aria-labelledby={`membership-plan-${plan.id}-heading`}
            sx={(theme: Theme) => ({
                position: "relative",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 260,
                border: "1px solid",
                borderColor: plan.isPopular ? theme.custom.darkMain : theme.custom.darkGray,
                borderRadius: "16px",
                backgroundColor: theme.custom.background,
                boxShadow: plan.isPopular
                    ? `0 0 0 3px ${alpha(theme.custom.darkMain, 0.14)}, 0 10px 26px ${alpha(theme.custom.darkMain, 0.12)}`
                    : "none",
            })}
        >
            {plan.isPopular && (
                <Chip
                    icon={<StarIcon sx={(theme: Theme) => ({ color: `${theme.custom.white} !important`, fontSize: "15px !important" })} />}
                    label={t("membership.plans.popularBadge")}
                    size="small"
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        top: -13,
                        right: 24,
                        backgroundColor: theme.custom.darkMain,
                        color: theme.custom.white,
                        fontWeight: 700,
                        zIndex: 1,
                    })}
                />
            )}

            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.75,
                    padding: "22px 24px",
                    borderRadius: "15px 15px 0 0",
                    backgroundColor: alpha(theme.custom.darkMain, plan.isPopular ? 0.16 : 0.08),
                    borderBottom: "1px solid",
                    borderColor: alpha(theme.custom.darkMain, plan.isPopular ? 0.28 : 0.18),
                })}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={(theme: Theme) => ({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            backgroundColor: plan.isPopular ? theme.custom.darkMain : theme.custom.background,
                            color: plan.isPopular ? theme.custom.white : theme.custom.darkMain,
                        })}
                    >
                        {PLAN_ICONS[plan.id]}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography id={`membership-plan-${plan.id}-heading`} component="h3" variant="h6" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                            {planName}
                        </Typography>
                        <Typography component="span" sx={(theme: Theme) => ({ fontSize: "0.78rem", color: theme.custom.translucidFontColor })}>
                            {t(`membership.plans.subtitles.${plan.id}`)}
                        </Typography>
                    </Box>
                </Box>

                <Typography component="p" sx={(theme: Theme) => ({ color: theme.custom.fontColor, m: 0 })}>
                    <Typography component="span" variant="h4" sx={{ fontWeight: 700 }}>
                        {formatMembershipPrice(pricing.monthlyEquivalent, plan.currency_id)}
                    </Typography>
                    <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                        {t("membership.plans.perMonth")}
                    </Typography>
                </Typography>

                {isSemiannual && pricing.totalForTerm !== null && pricing.savingsForTerm !== null && (
                    <Box
                        sx={(theme: Theme) => ({
                            display: "inline-flex",
                            alignItems: "center",
                            alignSelf: "flex-start",
                            padding: "7px 12px",
                            borderRadius: "9px",
                            background: `linear-gradient(135deg, ${theme.custom.adminBadge.gradientStart} 0%, ${theme.custom.adminBadge.gradientMid} 55%, ${theme.custom.adminBadge.gradientEnd} 100%)`,
                            color: theme.custom.adminBadge.textColor,
                            fontSize: "0.78rem",
                            fontWeight: 700,
                        })}
                    >
                        {t("membership.plans.termBadge", {
                            total: formatMembershipPrice(pricing.totalForTerm, plan.currency_id),
                            savings: formatMembershipPrice(pricing.savingsForTerm, plan.currency_id),
                        })}
                    </Box>
                )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25, flex: 1, padding: "20px 24px 24px" }}>
                <List dense disablePadding sx={{ flex: 1 }}>
                    {plan.featureKeys.map((featureKey) => (
                        <ListItem key={featureKey} disableGutters sx={{ alignItems: "flex-start", py: 0.5 }}>
                            <ListItemIcon sx={(theme: Theme) => ({ minWidth: 28, color: theme.custom.darkSecondary, mt: "2px" })}>
                                <CheckCircleOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={t(featureKey)}
                                slotProps={{ primary: { sx: (theme: Theme) => ({ color: theme.custom.fontColor, fontSize: "0.9rem" }) } }}
                            />
                        </ListItem>
                    ))}
                </List>

                <PrimaryButtonComponent
                    buttonText={isCurrent ? t("membership.plans.currentPlanButton") : t("membership.plans.selectButton", { planName })}
                    buttonOnClick={() => onSelect(plan.id)}
                    buttonWidth="100%"
                    disabled={isCurrent || isSubmitting}
                    dataTestId={`membership-select-${plan.id}`}
                />
            </Box>
        </Box>
    );
};

export default MembershipPlanCard;
