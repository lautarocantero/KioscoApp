import { Box, Skeleton, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppLayout from "../../shared/layout/AppLayout";
import BackButton from "../../shared/components/Buttons/BackButton";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";
import { useMembershipCheckoutPage } from "../../../hooks/membership/useMembershipCheckoutPage";
import { formatMembershipPrice } from "../helpers/formatMembershipPrice";
import PaymentMethodRow from "../components/PaymentMethodRow";

const MembershipCheckoutPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const { plan: planParam } = useParams<{ plan: string }>();
    const { plan, planDefinition, loading, error, isSubmitting, checkoutError, pay } = useMembershipCheckoutPage(planParam);

    return (
        <AppLayout>
            <Box component="section" aria-labelledby="membership-checkout-heading" sx={{ width: "100%" }}>
                <BackButton />

                <Typography id="membership-checkout-heading" component="h1" variant="h4" sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 3 })}>
                    {t("membership.checkout.title")}
                </Typography>

                {!loading && !plan && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                        {t("membership.checkout.invalidPlan")}
                    </Typography>
                )}

                {!loading && plan && !planDefinition && (
                    <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                        {error ?? t("membership.checkout.genericError")}
                    </Typography>
                )}

                {loading && (
                    <Stack spacing={2}>
                        <Skeleton variant="rounded" height={80} />
                        <Skeleton variant="rounded" height={140} />
                        <Skeleton variant="rounded" height={48} />
                    </Stack>
                )}

                {!loading && planDefinition && (
                    <Stack spacing={3}>
                        <Box
                            component="section"
                            aria-label={t("membership.checkout.orderSummary")}
                            sx={(theme: Theme) => ({
                                border: "1px solid",
                                borderColor: theme.custom.darkGray,
                                borderRadius: "12px",
                                padding: 2.5,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            })}
                        >
                            <Box>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                    {t("membership.checkout.planLabel")}
                                </Typography>
                                <Typography variant="h6" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                                    {t(`membership.plans.names.${planDefinition.id}`)}
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                    {t("membership.checkout.priceLabel")}
                                </Typography>
                                <Typography variant="h6" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                                    {formatMembershipPrice(planDefinition.price, planDefinition.currency_id)}
                                    <Typography component="span" variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                                        {t("membership.checkout.perMonth")}
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>

                        <Box component="section" aria-label={t("membership.checkout.paymentMethod")}>
                            <Typography component="h2" variant="subtitle1" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600, mb: 1.5 })}>
                                {t("membership.checkout.paymentMethod")}
                            </Typography>

                            <Stack spacing={1.5}>
                                <PaymentMethodRow
                                    icon={<PaymentOutlinedIcon fontSize="small" />}
                                    label={t("membership.checkout.mercadoPago")}
                                    description={t("membership.checkout.mercadoPagoDescription")}
                                    selected
                                />
                                <PaymentMethodRow
                                    icon={<CreditCardOutlinedIcon fontSize="small" />}
                                    label={t("membership.checkout.creditCard")}
                                    badge={t("membership.checkout.otherMethodsComingSoon")}
                                    disabled
                                />
                                <PaymentMethodRow
                                    icon={<AccountBalanceOutlinedIcon fontSize="small" />}
                                    label={t("membership.checkout.bankTransfer")}
                                    badge={t("membership.checkout.otherMethodsComingSoon")}
                                    disabled
                                />
                            </Stack>
                        </Box>

                        {checkoutError && (
                            <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                                {checkoutError}
                            </Typography>
                        )}

                        <PrimaryButtonComponent
                            buttonText={t("membership.checkout.payButton")}
                            buttonOnClick={pay}
                            buttonWidth="100%"
                            disabled={isSubmitting}
                            dataTestId="membership-checkout-pay-button"
                        />
                    </Stack>
                )}
            </Box>
        </AppLayout>
    );
};

export default MembershipCheckoutPage;
