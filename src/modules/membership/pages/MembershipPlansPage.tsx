import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import AppLayout from "../../shared/layout/AppLayout";
import BackButton from "../../shared/components/Buttons/BackButton";
import { useMembershipStatus } from "../../../hooks/membership/useMembershipStatus";
import { useMembershipPlans } from "../../../hooks/membership/useMembershipPlans";
import { isCurrentActivePlan } from "../helpers/isCurrentActivePlan";
import MembershipCurrentPlanSummary from "../components/MembershipCurrentPlanSummary";
import MembershipPlanCard from "../components/MembershipPlanCard";
import MembershipPlanCardSkeleton from "../components/MembershipPlanCardSkeleton";

const MembershipPlansPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { status, loading: statusLoading, error: statusError } = useMembershipStatus();
    const { plans, loading: plansLoading, error: plansError } = useMembershipPlans();

    const handleSelectPlan = (plan: KioscoPlanEnum): void => {
        navigate(`/membership/checkout/${plan}`);
    };

    return (
        <AppLayout fullWidth>
            <Box component="section" aria-labelledby="membership-plans-heading" sx={{ width: "100%" }}>
                <BackButton />

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
                        ? Array.from({ length: 3 }).map((_, index) => <MembershipPlanCardSkeleton key={index} />)
                        : plans.map((plan) => (
                              <MembershipPlanCard
                                  key={plan.id}
                                  plan={plan}
                                  isCurrent={isCurrentActivePlan(status, plan.id)}
                                  isSubmitting={false}
                                  onSelect={handleSelectPlan}
                              />
                          ))}
                </Box>
            </Box>
        </AppLayout>
    );
};

export default MembershipPlansPage;
