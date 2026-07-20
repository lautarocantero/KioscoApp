import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { SellDetailAditionalDataProps } from "@typings/sells/SellComponentTypes";
import { formatAmount } from "modules/sells/helpers/ProductDialog/Formatter/formatDetail";
import SellDetailPendingBalance from "./SellDetailPendingBalance";
import NoisyCard from "modules/shared/components/Cards/NoisyCard";

// 🔧 Hardcodeado temporalmente — luego vendrá del backend (pagos parciales / saldo pendiente)
const MOCK_PENDING_BALANCE = 450;

const SellDetailAditionalData = ({
    subTotal,
    iva,
    ivaPercentage,
    total,
    currency,
    sellId,
}: SellDetailAditionalDataProps): React.ReactNode => {

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
                            Información adicional
                        </Typography>
                    </Stack>

                    <Box
                        component="dl"
                        sx={{ m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                Subtotal
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {formatAmount(subTotal)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                IVA ({ivaPercentage}%)
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {formatAmount(iva)}
                            </Typography>
                        </Stack>

                        <Divider sx={{ borderStyle: "dashed" }} />

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" fontWeight={700}>
                                Total
                            </Typography>
                            <Typography component="dd" variant="body2" fontWeight={700} sx={{ m: 0 }}>
                                {formatAmount(total)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                Moneda
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {currency}
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography component="dt" variant="body2" color="text.secondary">
                                ID de venta
                            </Typography>
                            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                                {sellId}
                            </Typography>
                        </Stack>
                    </Box>

                    <SellDetailPendingBalance pendingBalance={MOCK_PENDING_BALANCE} />
                </NoisyCard>
        </Grid>
    );
};

export default SellDetailAditionalData;