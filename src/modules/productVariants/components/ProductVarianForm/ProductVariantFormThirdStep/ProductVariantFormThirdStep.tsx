import { Box, Card, CardContent, type Theme } from "@mui/material";
import ProductVariantExpirationField from "./ProductVariantExpirationField";
import ProductVariantSubmitButtons from "./ProductVariantSubmitButtons";
import FormFooter from "../../../../../modules/shared/components/FormGrid/FormFooter";

const ProductVariantFormThirdStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
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
                <ProductVariantExpirationField />
            </CardContent>

            <FormFooter />
            <ProductVariantSubmitButtons />
        </Card>
    </Box>
);

export default ProductVariantFormThirdStep;