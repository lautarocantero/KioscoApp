import { Box, Chip, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipCurrentPlanHeroProps } from "@typings/membership/membershipComponentTypes";
import { getNoisyBackgroundSx } from "../../shared/components/NoisyBackground/NoisyBackground";
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";
import { formatDate } from "../../../utils/formatter/formatDate";
import { formatMembershipPrice } from "../helpers/formatMembershipPrice";

const STATUS_COLOR: Record<KioscoPlanStatusEnum, "success" | "warning" | "default"> = {
    [KioscoPlanStatusEnum.Active]: "success",
    [KioscoPlanStatusEnum.PendingPayment]: "warning",
    [KioscoPlanStatusEnum.Cancelled]: "default",
};

const MembershipCurrentPlanHero = ({ status, currentPlanDefinition }: MembershipCurrentPlanHeroProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            component="section"
            aria-label={t("membership.currentPlan.heading")}
            sx={(theme: Theme) => ({
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: 3,
                borderRadius: "16px",
                padding: { xs: 2.5, sm: 3.5 },
                flexWrap: "wrap",
                ...getNoisyBackgroundSx({ theme, backgroundColor: theme.custom.darkMain }),
            })}
        >
            <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 1.75, maxWidth: 560 }}>
                <Typography
                    component="span"
                    sx={(theme: Theme) => ({
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: theme.custom.translucidWhite,
                    })}
                >
                    {t("membership.currentPlan.heading")}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                    <Typography component="h1" variant="h3" sx={(theme: Theme) => ({ color: theme.custom.white, m: 0 })}>
                        {t(`membership.plans.names.${status.plan}`)}
                    </Typography>
                    <Chip
                        size="small"
                        color={STATUS_COLOR[status.plan_status]}
                        label={t(`membership.currentPlan.status.${status.plan_status}`)}
                    />
                </Box>

                <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidWhite, textWrap: "pretty" })}>
                    {t("membership.currentPlan.hero.description")}
                </Typography>

                <Box sx={{ display: "flex", gap: 3.5, flexWrap: "wrap", mt: 0.5 }}>
                    {status.next_payment_date && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                            <Typography
                                component="span"
                                sx={(theme: Theme) => ({
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    color: theme.custom.translucidWhite,
                                })}
                            >
                                {t("membership.currentPlan.nextPaymentLabel")}
                            </Typography>
                            <Typography sx={(theme: Theme) => ({ color: theme.custom.white, fontWeight: 600 })}>
                                {formatDate(status.next_payment_date)}
                            </Typography>
                        </Box>
                    )}

                    {currentPlanDefinition && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                            <Typography
                                component="span"
                                sx={(theme: Theme) => ({
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    color: theme.custom.translucidWhite,
                                })}
                            >
                                {t("membership.currentPlan.hero.monthlyAmountLabel")}
                            </Typography>
                            <Typography sx={(theme: Theme) => ({ color: theme.custom.white, fontWeight: 600 })}>
                                {formatMembershipPrice(currentPlanDefinition.price, currentPlanDefinition.currency_id)}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                        <Typography
                            component="span"
                            sx={(theme: Theme) => ({
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                color: theme.custom.translucidWhite,
                            })}
                        >
                            {t("membership.currentPlan.hero.paymentMethodLabel")}
                        </Typography>
                        <Typography sx={(theme: Theme) => ({ color: theme.custom.white, fontWeight: 600 })}>
                            {t("membership.currentPlan.hero.paymentMethodValue")}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                component="img"
                src={getPublicAssetUrl("images/logo/stocko-mascot.png")}
                alt=""
                aria-hidden="true"
                sx={{
                    position: "relative",
                    zIndex: 1,
                    alignSelf: "flex-end",
                    width: { xs: 110, sm: 150 },
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 14px 22px rgba(17,24,39,0.28))",
                }}
            />
        </Box>
    );
};

export default MembershipCurrentPlanHero;
