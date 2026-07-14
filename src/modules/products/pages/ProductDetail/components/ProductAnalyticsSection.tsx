import { Alert, Box } from "@mui/material";
import { useProductPresentations } from "../../../../../hooks/products/useProductPresentations";
import { usePresentationAnalytics } from "../../../../../hooks/presentations/usePresentationAnalytics";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner";
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

    // ⚠️ Asume que `presentations` trae un campo `_id` que matchea `selectedPresentationId`.
    // Si en realidad viene `sku` (PresentationSummary), cambiar esta comparación.
    const selectedPresentation = presentations.find((p) => p._id === selectedPresentationId);

    const {
        analyticsData,
        isLoading: isLoadingAnalytics,
        error: analyticsError,
        applyFilters,
    } = usePresentationAnalytics(selectedPresentationId, {
        title: selectedPresentation?.name ?? "Analíticas",
        subtitle: "Rendimiento de ventas",
        currentStock: selectedPresentation?.stock ?? 0,
    });

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
