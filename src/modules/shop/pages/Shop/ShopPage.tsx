import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActiveKiosco } from "../../../../hooks/kiosco/useActiveKiosco";
import { useIsActiveKioscoAdmin } from "../../../../hooks/kiosco/useIsActiveKioscoAdmin";
import { useShopDailySummary } from "../../../../hooks/shop/useShopDailySummary";
import { useShopLowStockPresentations } from "../../../../hooks/shop/useShopLowStockPresentations";
import { useShopRestockReport } from "../../../../hooks/shop/useShopRestockReport";
import AppLayout from "../../../shared/layout/AppLayout";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { useAutoStartTutorial } from "@hooks/tutorial/useAutoStartTutorial";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import { combineLoadingFlags } from "../../../shared/helpers/combineLoadingFlags";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import TutorialTarget from "../../../shared/components/Tutorial/TutorialTarget";
import ShopHeader from "../../components/ShopHeader";
import ShopDailyHeroCard from "../../components/ShopDailyHeroCard";
import ShopMascotPanel from "../../components/ShopMascotPanel";
import ShopTopProductsToday from "../../components/ShopTopProductsToday";
import ShopAttentionPanel from "../../components/ShopAttentionPanel";
import ShopActiveSellers from "../../components/ShopActiveSellers";
import { useShopTutorialSteps } from "../../tutorial/shopTutorialSteps";

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
    const { activeKiosco } = useActiveKiosco();
    const isAdmin = useIsActiveKioscoAdmin();
    const navigate = useNavigate();
    const dailySummary = useShopDailySummary();
    const lowStockPresentations = useShopLowStockPresentations();
    const restockReport = useShopRestockReport();
    const isPageLoading = useInitialPageLoading(
        combineLoadingFlags(dailySummary.isLoading, lowStockPresentations.isLoading)
    );
    const shopTutorialSteps = useShopTutorialSteps();
    useAutoStartTutorial(TutorialIdEnum.Shop, shopTutorialSteps, !isPageLoading);

    if (isPageLoading) return <LoadingScreen label="Cargando tienda..." />;

    const kioscoName = activeKiosco?.name ?? "";

    return (
        <AppLayout fullWidth noCenter>
            <ShopHeader
                kioscoName={kioscoName}
                onChangeKiosco={() => navigate("/select-kiosco")}
            />

            <Box sx={HERO_GRID_SX}>
                <TutorialTarget targetId="shop-hero">
                    <ShopDailyHeroCard
                        kpis={dailySummary.kpis}
                        partialsAlert={dailySummary.partialsAlert}
                        hourly={dailySummary.hourly}
                        peakHour={dailySummary.peakHour}
                        hasSellsToday={dailySummary.hasSellsToday}
                        isLoading={dailySummary.isLoading}
                        error={dailySummary.error}
                    />
                </TutorialTarget>
                <ShopMascotPanel
                    kioscoName={kioscoName}
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
                <TutorialTarget targetId="shop-attention">
                    <ShopAttentionPanel
                        criticalStockCount={lowStockPresentations.criticalCount}
                        lowStockCount={lowStockPresentations.lowCount}
                        partialsAlert={dailySummary.partialsAlert}
                        isLoading={lowStockPresentations.isLoading || dailySummary.isLoading}
                        error={lowStockPresentations.error ?? dailySummary.error}
                        isRestockDownloadDisabled={restockReport.isDownloadDisabled}
                        onRestockDownload={restockReport.handleDownload}
                    />
                </TutorialTarget>
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
