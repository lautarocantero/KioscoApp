import { alpha, Avatar, Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";
import type { SellDetailProductsSoldProps } from "@typings/sells/SellComponentTypes";
import { useSellDetailForm } from "../../../../hooks/sells/useSellDetailForm";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { formatAmount } from "../../../cart/helpers/ProductDialog/Formatter/formatDetail";
import { formatWeightAwareQuantity } from "../../../shared/helpers/saleTypeHelper";

const SellDetailProductsSold = ({ products }: SellDetailProductsSoldProps): React.ReactNode => {
     const { goToPresentation } = useSellDetailForm();
     const { t } = useTranslation();

    return (
        <Grid size={{ xs: 12 }}>
            <NoisyCard
                component="section"
                aria-labelledby="products-sold-heading"
                sx={{ p: 2, borderRadius: 2 }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <ShoppingCartOutlinedIcon fontSize="small" aria-hidden="true" />
                    <Typography id="products-sold-heading" component="h2" variant="subtitle1" fontWeight={700}>
                        {t("sells.detail.productsSold.heading")}
                    </Typography>
                </Stack>

                <Box
                    sx={(theme: Theme) => ({
                        width: "100%",
                        overflowX: { xs: "auto", md: "hidden" },
                        "&::-webkit-scrollbar": { height: 6 },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: alpha(theme.custom.fontColor, 0.2),
                            borderRadius: 3,
                        },
                    })}
                >
                    <Table
                        size="small"
                        aria-label={t("sells.detail.productsSold.tableAriaLabel")}
                        sx={{
                            width: "100%",
                            minWidth: { xs: 520, md: "100%" },
                            tableLayout: "fixed",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="col">{t("sells.detail.productsSold.columns.product")}</TableCell>
                                <TableCell component="th" scope="col" align="right">{t("sells.detail.productsSold.columns.quantity")}</TableCell>
                                <TableCell component="th" scope="col" align="right">{t("sells.detail.productsSold.columns.unitPrice")}</TableCell>
                                <TableCell component="th" scope="col" align="right">{t("sells.detail.productsSold.columns.subtotal")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    hover
                                    onClick={() => goToPresentation(product.productId, product.presentationId)}
                                    tabIndex={0}
                                    role="link"
                                    aria-label={t("sells.detail.productsSold.rowAriaLabel", { name: product.name })}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            goToPresentation(product.productId, product.presentationId);
                                        }
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        "&:focus-visible": {
                                            outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`,
                                            outlineOffset: "-2px",
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 400 }}>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Avatar
                                                variant="rounded"
                                                src={product.imageUrl || "/images/stocko_images/empty_product.png"}
                                                alt={t("sells.detail.productsSold.imageAlt", { name: product.name })}
                                                sx={{ width: 40, height: 40, flexShrink: 0 }}
                                            />
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                    noWrap
                                                    title={product.name}
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                    {t("sells.detail.productsSold.skuLabel")} {product.sku}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                        {formatWeightAwareQuantity(product.quantity, product.sale_type)}
                                    </TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>{formatAmount(product.unitPrice)}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>{formatAmount(product.subtotal)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </NoisyCard>
        </Grid>
    );
};

export default SellDetailProductsSold;