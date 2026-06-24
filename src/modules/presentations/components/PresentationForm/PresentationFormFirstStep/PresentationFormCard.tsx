import { Card, CardContent, Box, type Theme } from "@mui/material";
import ProductVariantFormFields from "./PresentationFormFields";
import ProductVariantImageUpload from "./PresentationImageUpload";
import FormFooter from "../../../../shared/components/FormGrid/FormFooter";
import NavButtons from "../../../../shared/components/Buttons/NavButtons";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../../config/constants";
import { useProductVariantForm } from "../../../../../hooks/productsVariant/useProductVariantForm";
import FormHeader from "../../../../shared/components/FormGrid/FormHeader";

const ProductVariantFormCard = (): React.ReactNode => {
    const { currentStep } = useProductVariantForm();

    
    return (
    <Card sx={(theme: Theme) => ({
        width: "100%", maxWidth: 680,
        bgcolor: theme.custom?.backgroundDark,
        border: "0.5px solid", borderColor: "rgba(255,255,255,0.08)",
        borderRadius: "16px",
        boxShadow: `
            0 1px 3px rgba(0,0,0,0.06),
            4px 8px 16px rgba(0,0,0,0.10),
            8px 16px 28px rgba(0,0,0,0.08)
        `,
    })}>

        <FormHeader
            title={PRODUCTS_VARIANT_STEPS_LABELS[currentStep]}
            isMultiStep
            stepsLabels={PRODUCTS_VARIANT_STEPS_LABELS}
            currentStep={currentStep}
            />

        <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <ProductVariantFormFields />
                <ProductVariantImageUpload />
            </Box>
        </CardContent>

        <FormFooter />
        <NavButtons SubmitText="Crear"/>
    </Card>
)};

export default ProductVariantFormCard;