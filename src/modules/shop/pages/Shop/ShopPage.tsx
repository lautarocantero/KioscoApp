import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useShopGreeting } from "../../../../hooks/shop/useShopGreeting";
import { useActiveKiosco } from "../../../../hooks/kiosco/useActiveKiosco";
import { useIsActiveKioscoAdmin } from "../../../../hooks/kiosco/useIsActiveKioscoAdmin";
import { useShopDailySummary } from "../../../../hooks/shop/useShopDailySummary";
import { useShopLowStockPresentations } from "../../../../hooks/shop/useShopLowStockPresentations";
import { useShopRestockReport } from "../../../../hooks/shop/useShopRestockReport";
import AppLayout from "../../../shared/layout/AppLayout";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { combineLoadingFlags } from "../../../shared/helpers/combineLoadingFlags";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import ShopHeader from "../../components/ShopHeader";
import ShopDailyHeroCard from "../../components/ShopDailyHeroCard";
import ShopMascotPanel from "../../components/ShopMascotPanel";
import ShopTopProductsToday from "../../components/ShopTopProductsToday";
import ShopAttentionPanel from "../../components/ShopAttentionPanel";
import ShopActiveSellers from "../../components/ShopActiveSellers";

const HERO_GRID_SX = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", lg: "1fr 360px" },
    gap: 2,
} as const;

const SECTIONS_GRID_SX = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1.3fr 1fr 1fr" },
    gap: 2,
} as const;

const ShopPage = (): React.ReactNode => {
    const { greeting } = useShopGreeting();
    const { activeKiosco } = useActiveKiosco();
    const isAdmin = useIsActiveKioscoAdmin();
    const navigate = useNavigate();
    const dailySummary = useShopDailySummary();
    const lowStockPresentations = useShopLowStockPresentations();
    const restockReport = useShopRestockReport();
    const isPageLoading = useInitialPageLoading(
        combineLoadingFlags(dailySummary.isLoading, lowStockPresentations.isLoading)
    );

    if (isPageLoading) return <LoadingScreen label="Cargando tienda..." />;

    const kioscoName = activeKiosco?.name ?? "";

    return (
        <AppLayout fullWidth noCenter>
            <ShopHeader
                greeting={greeting}
                kioscoName={kioscoName}
                onChangeKiosco={() => navigate("/select-kiosco")}
            />

            <Box sx={HERO_GRID_SX}>
                <ShopDailyHeroCard
                    kpis={dailySummary.kpis}
                    partialsAlert={dailySummary.partialsAlert}
                    hourly={dailySummary.hourly}
                    peakHour={dailySummary.peakHour}
                    hasSellsToday={dailySummary.hasSellsToday}
                    isLoading={dailySummary.isLoading}
                    error={dailySummary.error}
                />
                <ShopMascotPanel
                    kioscoName={kioscoName}
                    greeting={greeting}
                    isAdmin={isAdmin}
                    kpis={dailySummary.kpis}
                    hasSellsToday={dailySummary.hasSellsToday}
                    criticalStockCount={lowStockPresentations.criticalCount}
                    partialsAlert={dailySummary.partialsAlert}
                    onNewSale={() => navigate("/new-sell")}
                    onEnterStock={() => navigate("/products")}
                    onViewStatistics={() => navigate("/shop/stadistics")}
                />
            </Box>

            <Box sx={SECTIONS_GRID_SX}>
                <ShopTopProductsToday
                    topProducts={dailySummary.topProducts}
                    isLoading={dailySummary.isLoading}
                    error={dailySummary.error}
                />
                <ShopAttentionPanel
                    criticalStockCount={lowStockPresentations.criticalCount}
                    lowStockCount={lowStockPresentations.lowCount}
                    partialsAlert={dailySummary.partialsAlert}
                    isLoading={lowStockPresentations.isLoading || dailySummary.isLoading}
                    error={lowStockPresentations.error ?? dailySummary.error}
                    isRestockDownloadDisabled={restockReport.isDownloadDisabled}
                    onRestockDownload={restockReport.handleDownload}
                />
                <ShopActiveSellers
                    activeSellers={dailySummary.activeSellers}
                    isLoading={dailySummary.isLoading}
                    error={dailySummary.error}
                />
            </Box>
        </AppLayout>
    );
};

export default ShopPage;
