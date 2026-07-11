import { Alert, Box } from "@mui/material";
import { useProductPresentations } from "../../../../../hooks/products/useProductPresentations";
import { usePresentationAnalytics } from "../../../../../hooks/presentation/usePresentationAnalytics";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner";
import { mapPresentationAnalytics } from "../../../../../modules/presentations/pages/PresentationDetail/components/mapPresentationAnalytics";
import PresentationSelector from "../../../../../modules/products/components/PresentationSelector";
import PresentationAnalytics from "../../../../../modules/presentations/pages/PresentationDetail/components/PresentationAnalitycs";
import type { ProductAnalyticsSectionProps } from "@typings/product/productComponentTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 📊 ProductAnalyticsSection                                            ║
║                                                                       ║
║ El producto no vende, sus presentaciones sí. Este bloque:             ║
║   1. Trae las presentaciones hijas del producto                       ║
║   2. Muestra por defecto las estadísticas de la primera disponible    ║
║   3. Permite cambiar de presentación vía selector                     ║
║   4. Reutiliza PresentationAnalytics tal cual se usa en su propia page║
╚══════════════════════════════════════════════════════════════════════╝*/

const ProductAnalyticsSection = ({ productId }: ProductAnalyticsSectionProps): React.ReactNode => {
    const {
        presentations,
        isLoading: isLoadingPresentations,
        error: presentationsError,
        selectedPresentationId,
        setSelectedPresentationId,
    } = useProductPresentations(productId);

    const {
        analytics,
        isLoading: isLoadingAnalytics,
        error: analyticsError,
    } = usePresentationAnalytics(selectedPresentationId);

    const analyticsData = analytics ? mapPresentationAnalytics(analytics, "analytics") : null;

    if (isLoadingPresentations) return <LoadingSpinnerComponent />;

    if (presentationsError) return <Alert severity="error">{presentationsError}</Alert>;

    if (presentations.length === 0) {
        return <Alert severity="info">Este producto todavía no tiene presentaciones cargadas.</Alert>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <PresentationSelector
                    presentations={presentations}
                    selectedPresentationId={selectedPresentationId}
                    onChange={setSelectedPresentationId}
                    disabled={isLoadingAnalytics}
                />
            </Box>

            {isLoadingAnalytics && <LoadingSpinnerComponent />}
            {analyticsError && <Alert severity="error">{analyticsError}</Alert>}
            {!isLoadingAnalytics && analyticsData && <PresentationAnalytics data={analyticsData} />}
        </Box>
    );
};

export default ProductAnalyticsSection;