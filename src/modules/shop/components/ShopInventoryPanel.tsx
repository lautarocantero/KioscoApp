import { Box, Button, Skeleton, Typography, alpha, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { ShopInventoryPanelProps } from "@typings/shop/shopComponentTypes";
import ShopLowStockList from "./ShopLowStockList";

interface InventoryTile {
    labelKey: string;
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
    restockReport,
}: ShopInventoryPanelProps): React.ReactNode => {
    const { t } = useTranslation();

    const tiles: InventoryTile[] = [
        { labelKey: "shop.inventory.tiles.total", value: total, color: (t) => t.custom.fontColor },
        { labelKey: "shop.inventory.tiles.withStock", value: withStock, color: (t) => t.palette.success.main },
        { labelKey: "shop.inventory.tiles.lowStock", value: lowStock, color: (t) => t.custom.accents.gold },
        { labelKey: "shop.inventory.tiles.withoutStock", value: withoutStock, color: (t) => t.palette.error.main },
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
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
            })}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5, gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t("shop.inventory.title")}
                </Typography>
                <Typography
                    component={RouterLink}
                    to="/products"
                    variant="body2"
                    sx={(t: Theme) => ({ color: t.palette.primary.main, textDecoration: "none", fontWeight: 600 })}
                >
                    {t("shop.inventory.viewCatalog")}
                </Typography>
            </Box>
            <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                {t("shop.inventory.subtitle")}
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
                    gap: 1,
                    mt: 1.5,
                }}
            >
                {tiles.map((tile) => (
                    <Box
                        key={tile.labelKey}
                        sx={(t: Theme) => ({
                            border: "1px solid",
                            borderColor: alpha(tile.color(t), 0.3),
                            bgcolor: alpha(tile.color(t), 0.08),
                            borderRadius: "10px",
                            p: 1,
                            textAlign: "center",
                        })}
                    >
                        <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite, fontSize: "0.66rem" })}>
                            {t(tile.labelKey)}
                        </Typography>
                        {isLoading ? (
                            <Skeleton variant="text" width={40} height={30} sx={{ mx: "auto" }} />
                        ) : (
                            <Typography variant="h6" sx={(t: Theme) => ({ fontWeight: 800, color: tile.color(t) })}>
                                {tile.value ?? "-"}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                <Button
                    component={RouterLink}
                    to="/receipts"
                    variant="outlined"
                    size="small"
                    startIcon={<ReceiptIcon />}
                >
                    {t("shop.inventory.loadReceipt")}
                </Button>

                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FileDownloadOutlinedIcon />}
                    onClick={restockReport.handleDownload}
                    disabled={restockReport.isDownloadDisabled}
                >
                    {t("shop.inventory.downloadRestockReport")}
                </Button>
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
