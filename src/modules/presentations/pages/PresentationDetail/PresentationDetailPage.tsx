import React from "react";
import { Alert, Box } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import CardCarousel from "../../../shared/components/Cards/CardCarousel";
import PresentationDetailFormComponent from "./components/PresentationDetailForm";
import { usePresentationAnalytics } from "../../../../hooks/presentations/usePresentationAnalytics";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner";
import PresentationAnalytics from "./components/PresentationAnalitycs";

const PresentationDetailPage = (): React.ReactNode => {
    const { analyticsData, isLoading, error } = usePresentationAnalytics();

    return (
        <AppLayout fullWidth noCenter>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1 }}>
                <CardCarousel
                    gap={24}
                    maxViewportWidth={1500}
                    hintText={(index, total) =>
                        index < total - 1 ? "Desliza hacia la derecha para ver el análisis completo" : undefined
                    }
                    items={[
                        { id: "detail", content: <PresentationDetailFormComponent />, width: 820 },
                        {
                            id: "analytics",
                            content: (
                                <Box sx={{ p: 1 }}>
                                    {isLoading && <LoadingSpinnerComponent />}
                                    {error && <Alert severity="error">{error}</Alert>}
                                    {analyticsData && <PresentationAnalytics data={analyticsData} />}
                                </Box>
                            ),
                            width: 960,
                        },
                    ]}
                />
            </Box>
        </AppLayout>
    );
};

export default PresentationDetailPage;
