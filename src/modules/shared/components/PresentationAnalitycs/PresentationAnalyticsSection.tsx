import { Alert, Box } from "@mui/material";
import { useProductPresentations } from "../../../../hooks/products/useProductPresentations";
import { usePresentationAnalytics } from "../../../../hooks/presentations/usePresentationAnalytics";
import LoadingSpinnerComponent from "../LoadingSpinner";
import type { ProductAnalyticsSectionProps } from "@typings/product/productComponentTypes";
import PresentationAnalytics from "./PresentationAnalitycs";

const PresentationAnalyticsSection = ({
    productId,
    initialPresentationId,
}: ProductAnalyticsSectionProps): React.ReactNode => {
    const {
        presentations,
        isLoading: isLoadingPresentations,
        error: presentationsError,
        selectedPresentationId,
        setSelectedPresentationId,
        selectedPresentation,
    } = useProductPresentations(productId, initialPresentationId);

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
            <PresentationAnalytics
                data={analyticsData}
                error={analyticsError}
                presentations={presentations}
                selectedPresentationId={selectedPresentationId}
                onPresentationChange={setSelectedPresentationId}
                isPresentationSelectorDisabled={isLoadingAnalytics}
                onApplyFilters={applyFilters}
                hidePresentationFilter={Boolean(initialPresentationId)}
            />
        </Box>
    );
};

export default PresentationAnalyticsSection;