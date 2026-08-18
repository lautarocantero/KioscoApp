import { Divider, Grid, Stack, Typography } from "@mui/material";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import { useTranslation } from "react-i18next";
import type { SellDetailSoldDataProps } from "@typings/sells/SellComponentTypes";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { formatAmount } from "../../../cart/helpers/ProductDialog/Formatter/formatDetail";


const SellDetailSoldData = ({ subTotal, iva, ivaPercentage, total }: SellDetailSoldDataProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Grid size={{ xs: 12 }}>
            <NoisyCard
                component="section"
                aria-labelledby="sold-data-heading"
                sx={{ p: 2, borderRadius: 2 }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <PointOfSaleOutlinedIcon fontSize="small" aria-hidden="true" />
                    <Typography id="sold-data-heading" component="h2" variant="subtitle1" fontWeight={700}>
                        {t("sells.detail.soldData.heading")}
                    </Typography>
                </Stack>

                <Stack component="dl" spacing={1.5} sx={{ m: 0 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography component="dt" variant="body2" color="text.secondary">
                            {t("sells.detail.soldData.subtotal")}
                        </Typography>
                        <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                            {formatAmount(subTotal)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography component="dt" variant="body2" color="text.secondary">
                            {t("sells.detail.soldData.iva", { percentage: ivaPercentage })}
                        </Typography>
                        <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                            {formatAmount(iva)}
                        </Typography>
                    </Stack>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography component="dt" variant="subtitle1" fontWeight={700}>
                            {t("sells.detail.soldData.total")}
                        </Typography>
                        <Typography component="dd" variant="h6" fontWeight={700} color="success.light" sx={{ m: 0 }}>
                            {formatAmount(total)}
                        </Typography>
                    </Stack>
                </Stack>
            </NoisyCard>
        </Grid>
    );
};

export default SellDetailSoldData;