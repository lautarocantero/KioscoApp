import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SaleConfirmedModalSummaryProps } from "@typings/cart/cartComponentTypes";
import { getSaleConfirmedSummaryFields } from "./getSaleConfirmedSummaryFields";

const SaleConfirmedModalSummary = ({ ticketSummary }: SaleConfirmedModalSummaryProps): ReactNode => {
    const { t } = useTranslation();
    const { formattedTotal, formattedChange, rows } = getSaleConfirmedSummaryFields(ticketSummary);

    return (
        <Box
            sx={(theme: Theme) => ({
                position: "relative",
                zIndex: 1,
                m: "0 1.4em 1em",
                border: `1px solid ${theme?.custom?.darkGray}`,
                borderRadius: "0.8em",
                backgroundColor: theme?.custom?.darkBackground,
                overflow: "hidden",
            })}
        >
            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: 2,
                    p: "1em 1.2em",
                    borderBottom: `1px solid ${theme?.custom?.darkGray}`,
                })}
            >
                <Box>
                    <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontSize: theme?.typography?.caption.fontSize })}>
                        {t("cart.orderConfirmed.summary.total")}
                    </Typography>
                    <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 700, fontSize: theme?.typography?.h5.fontSize })}>
                        {formattedTotal}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "end" }}>
                    <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontSize: theme?.typography?.caption.fontSize })}>
                        {t("cart.orderConfirmed.summary.change")}
                    </Typography>
                    <Typography sx={(theme: Theme) => ({ color: theme?.palette?.secondary?.main, fontWeight: 700, fontSize: theme?.typography?.h6.fontSize })}>
                        {formattedChange}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" } }}>
                {rows.map(({ id, label, value }, index) => (
                    <Box
                        key={id}
                        sx={(theme: Theme) => ({
                            p: "0.75em 1.2em",
                            borderTop: `1px solid ${alpha(theme?.custom?.darkGray, 0.6)}`,
                            borderLeft: {
                                xs: "none",
                                sm: index > 0 ? `1px solid ${alpha(theme?.custom?.darkGray, 0.6)}` : "none",
                            },
                        })}
                    >
                        <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontSize: theme?.typography?.caption.fontSize })}>{label}</Typography>
                        <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 600, fontSize: theme?.typography?.body2.fontSize })}>{value}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SaleConfirmedModalSummary;
