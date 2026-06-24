import { Box } from "@mui/material";
import type { VariantCreatedComponentProps } from "@typings/presentation/presentationTypes";
import VariantCreatedCard from "./PresentationCreatedCard";

const VariantCreated = ({ createdVariant, onCreateAnother }: VariantCreatedComponentProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2, pt: 0, m: "auto" }}>
        <VariantCreatedCard createdVariant={createdVariant} onCreateAnother={onCreateAnother} />
    </Box>
);

export default VariantCreated;