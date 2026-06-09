import { Box } from "@mui/material";
import type { VariantCreatedComponentProps } from "@typings/productVariant/productVariantTypes";
import VariantCreatedCard from "./PresentationCreatedCard";

const VariantCreated = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <VariantCreatedCard createdVariant={createdVariant} onCreateAnother={onCreateAnother} />
    </Box>
);

export default VariantCreated;