import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AppLayout from "../../../shared/layout/AppLayout";
import CardCarousel from "../../../shared/components/Cards/CardCarousel";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductAnalyticsSection from "./components/ProductAnalyticsSection";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const ProductDetailPage = (): React.ReactNode => {
    const { productId } = useParams<{ productId: string }>();

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
                        { id: "detail", content: <ProductForm mode={FormModeComplexEnum.Detail} />, width: 820 },
                        { 
                            id: "analytics",
                            content: (
                            <ProductAnalyticsSection 
                                productId={productId} 
                            />)
                            , width: 960 
                        },
                    ]}
                />
            </Box>
        </AppLayout>
    );
};

export default ProductDetailPage;