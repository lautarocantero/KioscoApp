import { Box, Skeleton, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppLayout from "../../shared/layout/AppLayout";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";
import NotEntityLoaded from "../../shared/components/NoContent/NotEntityLoaded";
import { useMembershipCheckoutResult } from "../../../hooks/membership/useMembershipCheckoutResult";

const MembershipCheckoutResultPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const { status, loading, error, refetch, planName, isActive, isCancelled, goToShop, isAdmin } = useMembershipCheckoutResult();

    if (!isAdmin) {
        return (
            <AppLayout>
                <NotEntityLoaded fallbackText={t("permissions.adminOnly")} />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Box component="section" aria-labelledby="membership-checkout-result-heading" sx={{ width: "100%" }}>
                <Typography id="membership-checkout-result-heading" component="h1" variant="h4" sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 3 })}>
                    {t("membership.checkoutResult.title")}
                </Typography>

                {loading && (
                    <Stack spacing={2}>
                        <Skeleton variant="rounded" height={60} />
                        <Skeleton variant="rounded" height={48} />
                    </Stack>
                )}

                {!loading && error && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 2 })}>
                        {error}
                    </Typography>
                )}

                {!loading && status && (
                    <Typography sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 3 })}>
                        {isActive && t("membership.checkoutResult.activeMessage", { planName })}
                        {isCancelled && t("membership.checkoutResult.cancelledMessage")}
                        {!isActive && !isCancelled && t("membership.checkoutResult.pendingMessage")}
                    </Typography>
                )}

                <Stack direction="row" spacing={2}>
                    {!loading && status && !isActive && !isCancelled && (
                        <PrimaryButtonComponent buttonText={t("membership.checkoutResult.refreshButton")} buttonOnClick={refetch} />
                    )}
                    <PrimaryButtonComponent
                        buttonText={t("membership.checkoutResult.backToSettings")}
                        buttonOnClick={goToShop}
                        buttonColor="default"
                    />
                </Stack>
            </Box>
        </AppLayout>
    );
};

export default MembershipCheckoutResultPage;
