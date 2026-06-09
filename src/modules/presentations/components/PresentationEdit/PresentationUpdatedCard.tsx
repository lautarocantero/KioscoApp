// modules/productVariants/components/ProductVariantUpdated/VariantUpdatedCard.tsx

import { Card, CardContent, type Theme } from "@mui/material";
import type { UpdatedProductVariantInterface } from "@typings/productVariant/productVariantTypes";
import VariantUpdatedBody from "./PresentationUpdatedBody";
import VariantUpdatedActions from "./PresentationUpdatedActions";

interface Props { updatedVariant: UpdatedProductVariantInterface; }

const VariantUpdatedCard = ({ updatedVariant }: Props): React.ReactNode => (
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
            <VariantUpdatedBody name={updatedVariant.name} />
        </CardContent>
        <VariantUpdatedActions variantId={updatedVariant._id} />
    </Card>
);

export default VariantUpdatedCard;