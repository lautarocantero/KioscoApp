import { Box, Typography, type Theme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslation } from "react-i18next";
import AppLayout from "../../shared/layout/AppLayout";
import { useMembershipPlansPage } from "../../../hooks/membership/useMembershipPlansPage";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { combineLoadingFlags } from "../../shared/helpers/combineLoadingFlags";
import LoadingScreen from "../../shared/components/LoadingScreen/LoadingScreen";
import MembershipCurrentPlanHero from "../components/MembershipCurrentPlanHero";
import BillingPeriodToggle from "../components/BillingPeriodToggle";
import MembershipPlanCard from "../components/MembershipPlanCard";
import MembershipPlanCardSkeleton from "../components/MembershipPlanCardSkeleton";

const MembershipPlansPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const {
        status,
        statusLoading,
        statusError,
        plans,
        plansLoading,
        plansError,
        selectPlan,
        isPlanCurrent,
        currentPlanDefinition,
        billingPeriod,
        setBillingPeriod,
        getPlanPricing,
    } = useMembershipPlansPage();
    const isPageLoading = useInitialPageLoading(combineLoadingFlags(statusLoading, plansLoading));

    if (isPageLoading) return <LoadingScreen label="Cargando planes..." />;

    return (
        <AppLayout fullWidth>
            <Box
                component="section"
                aria-labelledby="membership-plans-heading"
                sx={{ width: { xs: "100%", md: "60%" }, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}
            >
                {statusError && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                        {statusError}
                    </Typography>
                )}
                {status && !statusLoading && (
                    <MembershipCurrentPlanHero status={status} currentPlanDefinition={currentPlanDefinition} />
                )}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Typography id="membership-plans-heading" component="h1" variant="h4" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                        {t("membership.plans.heading")}
                    </Typography>
                    <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                        {t("membership.plans.description")}
                    </Typography>
                </Box>

                <BillingPeriodToggle value={billingPeriod} onChange={setBillingPeriod} />

                {plansError && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                        {plansError}
                    </Typography>
                )}

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, alignItems: "stretch" }}>
                    {plansLoading
                        ? Array.from({ length: 2 }).map((_, index) => <MembershipPlanCardSkeleton key={index} />)
                        : plans.map((plan) => (
                              <MembershipPlanCard
                                  key={plan.id}
                                  plan={plan}
                                  pricing={getPlanPricing(plan)}
                                  billingPeriod={billingPeriod}
                                  isCurrent={isPlanCurrent(plan.id)}
                                  isSubmitting={false}
                                  onSelect={selectPlan}
                              />
                          ))}
                </Box>

                <Box
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderTop: "1px solid",
                        borderColor: theme.custom.darkGray,
                        pt: 2,
                        fontSize: "0.8rem",
                        color: theme.custom.translucidFontColor,
                    })}
                >
                    <LockOutlinedIcon sx={(theme: Theme) => ({ fontSize: 18, color: theme.custom.darkMain })} />
                    {t("membership.plans.footerNote")}
                </Box>
            </Box>
        </AppLayout>
    );
};

export default MembershipPlansPage;
