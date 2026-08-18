import { Box, Divider, Grid, Stack, Typography, type Theme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SellDetailAditionalDataProps } from "@typings/sells/SellComponentTypes";
import SellDetailPendingBalance from "./SellDetailPendingBalance";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { formatAmount } from "../../../cart/helpers/ProductDialog/Formatter/formatDetail";
import type { ReactNode } from "react";


const SellDetailAditionalData = ({
    subTotal,
    iva,
    ivaPercentage,
    total,
    currency,
    sellId,
    pendingBalance,
    debtorName,
    settlesSellId,
    settledBySellId,
}: SellDetailAditionalDataProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Grid size={{ xs: 12, md: 6 }}>
                <NoisyCard
                    aria-labelledby="sell-additional-data-heading"
                    sx={{
                        p: 2, 
                        borderRadius: 2, 
                        height: { 
                            xs: "20em", 
                            md: "18em",
                        } 
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <InfoOutlinedIcon fontSize="small" aria-hidden="true" />
                        <Typography
                            id="sell-additional-data-heading"
                            component="h2"
                            variant="subtitle1"
                            fontWeight={700}
                        >
                            {t("sells.detail.additionalData.heading")}
                        </Typography>
                    </Stack>

                    <Box
                        component="dl"
                        sx={{ m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                {t("sells.detail.additionalData.subtotal")}
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {formatAmount(subTotal)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                {t("sells.detail.additionalData.iva", { percentage: ivaPercentage })}
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {formatAmount(iva)}
                            </Typography>
                        </Stack>

                        <Divider sx={{ borderStyle: "dashed" }} />

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" fontWeight={700}>
                                {t("sells.detail.additionalData.total")}
                            </Typography>
                            <Typography component="dd" variant="body2" fontWeight={700} sx={{ m: 0 }}>
                                {formatAmount(total)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                {t("sells.detail.additionalData.currency")}
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {currency}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                {t("sells.detail.additionalData.sellId")}
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {sellId}
                            </Typography>
                        </Stack>
                    </Box>

                    <SellDetailPendingBalance pendingBalance={pendingBalance} debtorName={debtorName}  />

                    {settledBySellId && (
                        <Box
                            component="section"
                            role="status"
                            sx={(theme: Theme) => ({
                                mt: 1,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: `${theme.palette.info.main}1A`,
                                border: `1px solid ${theme.palette.info.main}`,
                            })}
                        >
                            <Typography component="p" variant="body2" sx={(theme: Theme) => ({ color: theme.palette.info.main })}>
                                {t("sells.detail.additionalData.settledNotice")}
                            </Typography>
                            <Typography
                                component={RouterLink}
                                to={`/sell/${settledBySellId}`}
                                variant="body2"
                                fontWeight={600}
                                sx={(theme: Theme) => ({ color: theme.palette.info.main, textDecoration: "none", display: "inline-block", mt: 0.5 })}
                            >
                                {t("sells.detail.additionalData.viewSettlementSell")}
                            </Typography>
                        </Box>
                    )}

                    {settlesSellId && (
                        <Box
                            component="section"
                            role="status"
                            sx={(theme: Theme) => ({
                                mt: 1,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: `${theme.palette.info.main}1A`,
                                border: `1px solid ${theme.palette.info.main}`,
                            })}
                        >
                            <Typography component="p" variant="body2" sx={(theme: Theme) => ({ color: theme.palette.info.main })}>
                                {t("sells.detail.additionalData.settlementOfNotice")}
                            </Typography>
                            <Typography
                                component={RouterLink}
                                to={`/sell/${settlesSellId}`}
                                variant="body2"
                                fontWeight={600}
                                sx={(theme: Theme) => ({ color: theme.palette.info.main, textDecoration: "none", display: "inline-block", mt: 0.5 })}
                            >
                                {t("sells.detail.additionalData.viewOriginalSell")}
                            </Typography>
                        </Box>
                    )}
                </NoisyCard>
        </Grid>
    );
};

export default SellDetailAditionalData;