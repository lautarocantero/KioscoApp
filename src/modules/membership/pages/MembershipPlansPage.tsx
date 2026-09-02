import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppLayout from "../../shared/layout/AppLayout";
import BackButton from "../../shared/components/Buttons/BackButton";
import { useMembershipPlansPage } from "../../../hooks/membership/useMembershipPlansPage";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { combineLoadingFlags } from "../../shared/helpers/combineLoadingFlags";
import LoadingScreen from "../../shared/components/LoadingScreen/LoadingScreen";
import MembershipCurrentPlanSummary from "../components/MembershipCurrentPlanSummary";
import MembershipPlanCard from "../components/MembershipPlanCard";
import MembershipPlanCardSkeleton from "../components/MembershipPlanCardSkeleton";

const MembershipPlansPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const { status, statusLoading, statusError, plans, plansLoading, plansError, selectPlan, isPlanCurrent } = useMembershipPlansPage();
    const isPageLoading = useInitialPageLoading(combineLoadingFlags(statusLoading, plansLoading));

    if (isPageLoading) return <LoadingScreen label="Cargando planes..." />;

    return (
        <AppLayout fullWidth>
            <Box component="section" aria-labelledby="membership-plans-heading" sx={{ width: "100%" }}>
                {statusError && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 2 })}>
                        {statusError}
                    </Typography>
                )}
                {status && !statusLoading && <MembershipCurrentPlanSummary status={status} />}

                <Typography id="membership-plans-heading" component="h1" variant="h4" sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 1 })}>
                    {t("membership.plans.heading")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, mb: 3 })}>
                    {t("membership.plans.description")}
                </Typography>

                {plansError && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 2 })}>
                        {plansError}
                    </Typography>
                )}

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "stretch" }}>
                    {plansLoading
                        ? Array.from({ length: 2 }).map((_, index) => <MembershipPlanCardSkeleton key={index} />)
                        : plans.map((plan) => (
                              <MembershipPlanCard
                                  key={plan.id}
                                  plan={plan}
                                  isCurrent={isPlanCurrent(plan.id)}
                                  isSubmitting={false}
                                  onSelect={selectPlan}
                              />
                          ))}
                </Box>

                <BackButton align="left" />
            </Box>
        </AppLayout>
    );
};

export default MembershipPlansPage;
