// modules/Presentations/components/PresentationUpdated/VariantUpdatedComponent.tsx

import { Box } from "@mui/material";
import VariantUpdatedCard from "./PresentationUpdatedCard";
import type { UpdatedPresentationInterface } from "@typings/presentation/presentationTypes";

interface Props { updatedVariant: UpdatedPresentationInterface; }

const VariantUpdatedComponent = ({ updatedVariant }: Props): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <VariantUpdatedCard updatedVariant={updatedVariant} />
    </Box>
);

export default VariantUpdatedComponent;