import { Card, CardContent, type Theme } from "@mui/material";
import ProductFormCardHeader from "./ProductFormCardHeader";
import NavButtons from "../../../../modules/shared/components/Buttons/NavButtons";
import FormFooter from "../../../../modules/shared/components/FormGrid/FormFooter";

interface ProductFormCardProps {
    children: React.ReactNode;
    submitText: string;
    showButtons?: boolean;
}

const ProductFormCard = ({ children, submitText, showButtons }: ProductFormCardProps): React.ReactNode => (
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
        <ProductFormCardHeader />

        <CardContent sx={{ p: 3 }}>
            {children}
        </CardContent>

        <FormFooter />
        {showButtons && <NavButtons SubmitText={submitText ?? ""} />}
    </Card>
);

export default ProductFormCard;