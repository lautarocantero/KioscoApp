import { Card, CardContent, type Theme } from "@mui/material";
import type { VariantCreatedComponentProps } from "@typings/productVariant/productVariantTypes";
import VariantCreatedBody from "./PresentationCreatedBody";
import VariantCreatedActions from "./PresentationCreatedActions";


const VariantCreatedCard = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps): React.ReactNode => (
    <Card sx={(theme: Theme) => ({
        width: "100%", maxWidth: 680,
        bgcolor: theme.custom?.backgroundDark,
        border: "0.5px solid", borderColor: "rgba(255,255,255,0.08)",
        borderRadius: "16px", overflow: "hidden",
        boxShadow: `
            0 1px 3px rgba(0,0,0,0.06),
            4px 8px 16px rgba(0,0,0,0.10),
            8px 16px 28px rgba(0,0,0,0.08)
        `,
    })}>
        <CardContent sx={{ p: 3 }}>
            <VariantCreatedBody name={createdVariant.name} />
        </CardContent>

        <VariantCreatedActions onCreateAnother={onCreateAnother} />
    </Card>
);

export default VariantCreatedCard;