import { Grid } from "@mui/material";
import { useShopGreeting } from "../../../../hooks/shop/useShopGreeting";
import { useShopStatLinks } from "../../../../hooks/shop/useShopStatLinks";
import { useShopSalesSummary } from "../../../../hooks/shop/useShopSalesSummary";
import { useShopFeaturedProviders } from "../../../../hooks/shop/useShopFeaturedProviders";
import { useShopInventorySummary } from "../../../../hooks/shop/useShopInventorySummary";
import { useShopLowStockPresentations } from "../../../../hooks/shop/useShopLowStockPresentations";
import AppLayout from "../../../shared/layout/AppLayout";
import ShopHeader from "../../components/ShopHeader";
import ShopStatsRow from "../../components/ShopStatsRow";
import ShopSalesChart from "../../components/ShopSalesChart";
import ShopInventoryPanel from "../../components/ShopInventoryPanel";
import ShopTopSellers from "../../components/ShopTopSellers";
import ShopTopProviders from "../../components/ShopTopProviders";

const ShopPage = (): React.ReactNode => {
    const { greeting } = useShopGreeting();
    const statLinks = useShopStatLinks();
    const salesSummary = useShopSalesSummary();
    const featuredProviders = useShopFeaturedProviders();
    const inventorySummary = useShopInventorySummary();
    const lowStockPresentations = useShopLowStockPresentations();

    return (
        <AppLayout fullWidth noCenter>
            <ShopHeader greeting={greeting} />

            <ShopStatsRow links={statLinks} />

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ShopSalesChart
                        dailySales={salesSummary.dailySales}
                        weekTotal={salesSummary.weekTotal}
                        isLoading={salesSummary.isLoading}
                        error={salesSummary.error}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ShopTopSellers
                        topSellers={salesSummary.topSellers}
                        isLoading={salesSummary.isLoading}
                        error={salesSummary.error}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ShopTopProviders
                        featured={featuredProviders.featured}
                        total={featuredProviders.total}
                        isLoading={featuredProviders.isLoading}
                        error={featuredProviders.error}
                    />
                </Grid>
            </Grid>
        </AppLayout>
    );
};

export default ShopPage;
