// modules/productVariants/components/ProductVariantUpdated/VariantUpdatedComponent.tsx

import { Box } from "@mui/material";
import VariantUpdatedCard from "./PresentationUpdatedCard";
import type { UpdatedProductVariantInterface } from "@typings/productVariant/productVariantTypes";

interface Props { updatedVariant: UpdatedProductVariantInterface; }

const VariantUpdatedComponent = ({ updatedVariant }: Props): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <VariantUpdatedCard updatedVariant={updatedVariant} />
    </Box>
);

export default VariantUpdatedComponent;