import { alpha, Avatar, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { SellDetailProductsSoldProps } from "@typings/sells/SellComponentTypes";
import { formatAmount } from "modules/sells/helpers/ProductDialog/Formatter/formatDetail";
import NoisyCard from "modules/shared/components/Cards/NoisyCard";

const SellDetailProductsSold = ({ products }: SellDetailProductsSoldProps): React.ReactNode => {
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

                <Table
                    size="small"
                    aria-label="Productos vendidos en esta venta"
                    sx={(theme: Theme) => ({
                        display: "block",
                        width: "100%",
                        minWidth: { xs: 520, sm: "100%" },
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { height: 6 },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: alpha(theme.custom.fontColor, 0.2),
                            borderRadius: 3,
                        },
                    })}
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
                            <TableRow key={product.id}>
                                <TableCell component="th" scope="row" sx={{ whiteSpace: "nowrap", fontWeight: 400 }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar
                                            variant="rounded"
                                            src={product.imageUrl}
                                            alt={`Imagen de ${product.name}`}
                                            sx={{ width: 40, height: 40, flexShrink: 0 }}
                                        />
                                        <div>
                                            <Typography variant="body2" fontWeight={600}>{product.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">SKU: {product.sku}</Typography>
                                        </div>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>{formatAmount(product.unitPrice)}</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>{formatAmount(product.subtotal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </NoisyCard>
        </Grid>
    );
};

export default SellDetailProductsSold;