import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ShopInventoryPanelProps } from "@typings/shop/shopComponentTypes";
import ShopLowStockList from "./ShopLowStockList";

interface InventoryTile {
    label: string;
    value: number | null;
    color: (theme: Theme) => string;
}

const ShopInventoryPanel = ({
    total,
    withStock,
    lowStock,
    withoutStock,
    isLoading,
    error,
    lowStockItems,
    lowStockItemsTotal,
    isLoadingLowStockItems,
    lowStockItemsError,
}: ShopInventoryPanelProps): React.ReactNode => {
    const tiles: InventoryTile[] = [
        { label: "Total productos", value: total, color: (t) => t.custom.fontColor },
        { label: "Con stock", value: withStock, color: (t) => t.palette.success.main },
        { label: "Stock bajo", value: lowStock, color: (t) => t.custom.accents.gold },
        { label: "Sin stock", value: withoutStock, color: (t) => t.palette.error.main },
    ];

    return (
        <Box
            sx={(theme: Theme) => ({
                p: 2.5,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.background,
                height: "100%",
            })}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Inventario
                </Typography>
                <Typography
                    component={RouterLink}
                    to="/products"
                    variant="body2"
                    sx={(t: Theme) => ({ color: t.palette.primary.main, textDecoration: "none", fontWeight: 600 })}
                >
                    Ver catálogo →
                </Typography>
            </Box>
            <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                Resumen de stock
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1.5 }}>
                    {error}
                </Typography>
            )}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                    gap: 1.5,
                    mt: 2,
                }}
            >
                {tiles.map((tile) => (
                    <Box key={tile.label}>
                        <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                            {tile.label}
                        </Typography>
                        {isLoading ? (
                            <Skeleton variant="text" width={48} height={32} />
                        ) : (
                            <Typography variant="h6" sx={(t: Theme) => ({ fontWeight: 700, color: tile.color(t) })}>
                                {tile.value ?? "-"}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            <ShopLowStockList
                lowStock={lowStockItems}
                total={lowStockItemsTotal}
                isLoading={isLoadingLowStockItems}
                error={lowStockItemsError}
            />
        </Box>
    );
};

export default ShopInventoryPanel;
