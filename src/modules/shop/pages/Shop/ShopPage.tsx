import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useShopGreeting } from "../../../../hooks/shop/useShopGreeting";
import { useActiveKiosco } from "../../../../hooks/kiosco/useActiveKiosco";
import { useShopStatLinks } from "../../../../hooks/shop/useShopStatLinks";
import { useShopSalesSummary } from "../../../../hooks/shop/useShopSalesSummary";
import { useShopFeaturedProviders } from "../../../../hooks/shop/useShopFeaturedProviders";
import { useShopInventorySummary } from "../../../../hooks/shop/useShopInventorySummary";
import { useShopLowStockPresentations } from "../../../../hooks/shop/useShopLowStockPresentations";
import { useShopRestockReport } from "../../../../hooks/shop/useShopRestockReport";
import AppLayout from "../../../shared/layout/AppLayout";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { combineLoadingFlags } from "../../../shared/helpers/combineLoadingFlags";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import ShopHeader from "../../components/ShopHeader";
import ShopStatsRow from "../../components/ShopStatsRow";
import ShopSalesChart from "../../components/ShopSalesChart";
import ShopInventoryPanel from "../../components/ShopInventoryPanel";
import ShopTopSellers from "../../components/ShopTopSellers";
import ShopTopProviders from "../../components/ShopTopProviders";

const TWO_COLUMN_GRID_SX = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 2,
} as const;

const ShopPage = (): React.ReactNode => {
    const { greeting } = useShopGreeting();
    const { activeKiosco } = useActiveKiosco();
    const navigate = useNavigate();
    const statLinks = useShopStatLinks();
    const salesSummary = useShopSalesSummary();
    const featuredProviders = useShopFeaturedProviders();
    const inventorySummary = useShopInventorySummary();
    const lowStockPresentations = useShopLowStockPresentations();
    const restockReport = useShopRestockReport();
    const isPageLoading = useInitialPageLoading(
        combineLoadingFlags(
            salesSummary.isLoading,
            inventorySummary.isLoading,
            lowStockPresentations.isLoading,
            featuredProviders.isLoading
        )
    );

    if (isPageLoading) return <LoadingScreen label="Cargando tienda..." />;

    return (
        <AppLayout fullWidth noCenter>
            <ShopHeader
                greeting={greeting}
                kioscoName={activeKiosco?.name ?? ""}
                onChangeKiosco={() => navigate("/select-kiosco")}
            />

            <ShopStatsRow links={statLinks} />

            <Box sx={TWO_COLUMN_GRID_SX}>
                <ShopSalesChart
                    dailySales={salesSummary.dailySales}
                    periodTotal={salesSummary.periodTotal}
                    range={salesSummary.range}
                    setRange={salesSummary.setRange}
                    canChangeRange={salesSummary.canChangeRange}
                    isLoading={salesSummary.isLoading}
                    error={salesSummary.error}
                />
                <ShopInventoryPanel
                    total={inventorySummary.total}
                    withStock={inventorySummary.withStock}
                    lowStock={inventorySummary.lowStock}
                    withoutStock={inventorySummary.withoutStock}
                    isLoading={inventorySummary.isLoading}
                    error={inventorySummary.error}
                    lowStockItems={lowStockPresentations.lowStock}
                    lowStockItemsTotal={lowStockPresentations.total}
                    isLoadingLowStockItems={lowStockPresentations.isLoading}
                    lowStockItemsError={lowStockPresentations.error}
                    restockReport={{
                        isDownloadDisabled: restockReport.isDownloadDisabled,
                        handleDownload: restockReport.handleDownload,
                    }}
                />
            </Box>

            <Box sx={TWO_COLUMN_GRID_SX}>
                <ShopTopSellers
                    topSellers={salesSummary.topSellers}
                    isLoading={salesSummary.isLoading}
                    error={salesSummary.error}
                />
                <ShopTopProviders
                    featured={featuredProviders.featured}
                    total={featuredProviders.total}
                    isLoading={featuredProviders.isLoading}
                    error={featuredProviders.error}
                />
            </Box>
        </AppLayout>
    );
};

export default ShopPage;
