import { alpha, Box, Chip, Grid, Stack, Typography, type Theme } from "@mui/material";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { SellDetailPaymentDataProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";


const SellDetailPaymentData = ({ payment }: SellDetailPaymentDataProps): ReactNode => {
    const { methodLabel, approved, reference, paymentDate } = payment;

    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <NoisyCard
                component="section"
                aria-labelledby="payment-data-heading"
                sx={{ p: 2, borderRadius: 2, height: "18em" }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <LocalAtmOutlinedIcon fontSize="small" aria-hidden="true" />
                    <Typography id="payment-data-heading" component="h2" variant="subtitle1" fontWeight={700}>
                        Detalle de pago
                    </Typography>
                </Stack>

                <Box sx={(theme: Theme) => ({
                    border: "0.5px solid",
                    borderColor: alpha(theme.custom.white, 0.08),
                    borderRadius: "16px",
                    p: "1em"
                })}>
                    <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" sx={{ mb: 2, gap: { xs: "1em", sm: "none" } }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <AccountBalanceOutlinedIcon fontSize="small" color="success" aria-hidden="true" />
                            <Typography variant="body2" fontWeight={600}>{methodLabel}</Typography>
                        </Stack>
                        {approved && (
                            <Chip
                                size="small"
                                icon={<CheckCircleOutlineIcon fontSize="small" aria-hidden="true" />}
                                label="Aprobado"
                                color="success"
                                variant="outlined"
                                role="status"
                                aria-label="Estado del pago: aprobado"
                            />
                        )}
                    </Stack>

                    <Stack component="dl" spacing={1.5} sx={{ m: 0 }}>
                        <div>
                            <Typography component="dt" variant="caption" color="text.secondary">
                                Referencia / Comprobante
                            </Typography>
                            <Typography component="dd" variant="body2" fontWeight={600} sx={{ m: 0 }}>
                                {reference}
                            </Typography>
                        </div>
                        <div>
                            <Typography component="dt" variant="caption" color="text.secondary">
                                Fecha de pago
                            </Typography>
                            <Typography component="dd" variant="body2" fontWeight={600} sx={{ m: 0 }}>
                                {paymentDate}
                            </Typography>
                        </div>
                    </Stack>
                </Box>
            </NoisyCard>
        </Grid>
    );
};

export default SellDetailPaymentData;