import { Box, Button, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMembershipSection } from "../../../../../hooks/membership/useMembershipSection";

const MembershipSection = (): React.ReactNode => {
    const { t } = useTranslation();
    const { status, loading, error, goToPlans } = useMembershipSection();

    return (
        <Box component="section" aria-labelledby="settings-membership-heading">
            <Typography
                id="settings-membership-heading"
                component="h3"
                variant="h6"
                sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 2 })}
            >
                {t("settings.sections.membershipPlan")}
            </Typography>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 2 })}>
                    {error}
                </Typography>
            )}

            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    py: 1.5,
                    borderBottom: `1px solid ${theme.custom.darkGray}`,
                })}
            >
                {loading || !status ? (
                    <Skeleton variant="text" width={120} sx={{ fontSize: "0.9rem" }} />
                ) : (
                    <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600, fontSize: "0.9rem" })}>
                        {t(`membership.plans.names.${status.plan}`)}
                    </Typography>
                )}

                <Button
                    onClick={goToPlans}
                    variant="outlined"
                    disabled={loading}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        borderColor: theme.custom.darkGray,
                        color: theme.custom.fontColor,
                    })}
                >
                    {t("membership.currentPlan.changePlanButton")}
                </Button>
            </Box>
        </Box>
    );
};

export default MembershipSection;
