import { Alert, Box } from "@mui/material";
import { useProductPresentations } from "../../../../../hooks/products/useProductPresentations";
import { usePresentationAnalytics } from "../../../../../hooks/presentation/usePresentationAnalytics";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner";
import { mapPresentationAnalytics } from "../../../../../modules/presentations/pages/PresentationDetail/components/mapPresentationAnalytics";
import type { ProductAnalyticsSectionProps } from "@typings/product/productComponentTypes";
import PresentationAnalytics from "../../../../../modules/shared/components/PresentationAnalitycs/PresentationAnalitycs";

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
        applyFilters,
    } = usePresentationAnalytics(selectedPresentationId);

    const analyticsData = analytics ? mapPresentationAnalytics(analytics, "analytics") : null;

    if (isLoadingPresentations) return <LoadingSpinnerComponent />;

    if (presentationsError) return <Alert severity="error">{presentationsError}</Alert>;

    if (presentations.length === 0) {
        return <Alert severity="info">Este producto todavía no tiene presentaciones cargadas.</Alert>;
    }

    if (isLoadingAnalytics && !analyticsData) return <LoadingSpinnerComponent />;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
            {analyticsError && <Alert severity="error">{analyticsError}</Alert>}
            {analyticsData && (
                <PresentationAnalytics
                    data={analyticsData}
                    presentations={presentations}
                    selectedPresentationId={selectedPresentationId}
                    onPresentationChange={setSelectedPresentationId}
                    isPresentationSelectorDisabled={isLoadingAnalytics}
                    onApplyFilters={applyFilters}
                />
            )}
        </Box>
    );
};

export default ProductAnalyticsSection;