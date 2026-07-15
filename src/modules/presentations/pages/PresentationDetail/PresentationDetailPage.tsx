import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AppLayout from "../../../shared/layout/AppLayout";
import CardCarousel from "../../../shared/components/Cards/CardCarousel";
import ProductAnalyticsSection from "../../../products/pages/ProductDetail/components/ProductAnalyticsSection";
import PresentationForm from "modules/presentations/components/PresentationForm/PresentationForm";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const PresentationDetailPage = (): React.ReactNode => {
    const { product_id, presentation_id } = useParams<{
        product_id: string;
        presentation_id: string;
    }>();

    return (
        <AppLayout fullWidth noCenter>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1 }}>
                <CardCarousel
                    gap={24}
                    maxViewportWidth={1500}
                    hintText={(index, total) =>
                        index < total - 1 ? "Desliza hacia la derecha para ver las estadísticas de venta" : undefined
                    }
                    items={[
                        { id: "detail", content: <PresentationForm mode={FormModeComplexEnum.Detail} />, width: 820 },
                        {
                            id: "analytics",
                            content: (
                                <ProductAnalyticsSection
                                    productId={product_id}
                                    initialPresentationId={presentation_id}
                                />
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