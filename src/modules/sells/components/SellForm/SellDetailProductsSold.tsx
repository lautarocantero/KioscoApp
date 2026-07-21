import { alpha, Avatar, Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { SellDetailProductsSoldProps } from "@typings/sells/SellComponentTypes";
import { useSellDetailForm } from "../../../../hooks/sells/useSellDetailForm";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { formatAmount } from "../../helpers/ProductDialog/Formatter/formatDetail";

const SellDetailProductsSold = ({ products }: SellDetailProductsSoldProps): React.ReactNode => {
     const { goToPresentation } = useSellDetailForm();

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
                        Productos vendidos
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
                        aria-label="Productos vendidos en esta venta"
                        sx={{
                            width: "100%",
                            minWidth: { xs: 520, md: "100%" },
                            tableLayout: "fixed",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="col">Producto</TableCell>
                                <TableCell component="th" scope="col" align="right">Cant.</TableCell>
                                <TableCell component="th" scope="col" align="right">Precio unit.</TableCell>
                                <TableCell component="th" scope="col" align="right">Subtotal</TableCell>
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
                                    aria-label={`Ver detalle de ${product.name}`}
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
                                                alt={`Imagen de ${product.name}`}
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
                                                    SKU: {product.sku}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
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