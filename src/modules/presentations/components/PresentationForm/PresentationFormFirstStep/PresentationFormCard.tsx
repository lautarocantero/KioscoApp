import { Card, CardContent, Box, type Theme } from "@mui/material";
import ProductVariantFormFields from "./PresentationFormFields";
import ProductVariantImageUpload from "./PresentationImageUpload";
import FormFooter from "../../../../shared/components/FormGrid/FormFooter";
import NavButtons from "../../../../shared/components/Buttons/NavButtons";

const ProductVariantFormCard = (): React.ReactNode => (
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
        <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <ProductVariantFormFields />
                <ProductVariantImageUpload />
            </Box>
        </CardContent>

        <FormFooter />
        <NavButtons SubmitText="Crear"/>
    </Card>
);

export default ProductVariantFormCard;