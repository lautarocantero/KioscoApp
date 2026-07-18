import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AppLayout from "../../../shared/layout/AppLayout";
import CardCarousel from "../../../shared/components/Cards/CardCarousel";
import ProductForm from "../../components/ProductForm/ProductForm";
import PresentationAnalyticsSection from "../../../shared/components/PresentationAnalitycs/PresentationAnalyticsSection";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import { useDetailCarouselLayout } from "../../../../hooks/ui/useCardCarousel";

const ProductDetailPage = (): React.ReactNode => {
    const { product_id: productId } = useParams<{ product_id: string }>();

    const { gap, boxPaddingX, detailWidth, analyticsWidth, hintText } = useDetailCarouselLayout(820, 960);

    return (
        <AppLayout fullWidth noCenter noPadding>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1, px: boxPaddingX }}>
                <CardCarousel
                    gap={gap}
                    maxViewportWidth={1500}
                    hintText={hintText}
                    items={[
                        { id: "detail", content: <ProductForm mode={FormModeComplexEnum.Detail} />, width: detailWidth },
                        {
                            id: "analytics",
                            content: (
                                <PresentationAnalyticsSection
                                    productId={productId}
                                />
                            ),
                            width: analyticsWidth,
                        },
                    ]}
                />
            </Box>
        </AppLayout>
    );
};

export default ProductDetailPage;