// PresentationFilter.tsx
import { Box, Typography } from "@mui/material";
import PresentationSelector from "../../../products/components/PresentationSelector";
import { fieldLabelSx } from "../sharedSx/sharedSx";
import type { PresentationFilterProps } from "@typings/ui/analytics.types";


export const PresentationFilter = ({
    presentations,
    onPresentationChange,
    selectedPresentationId,
    isPresentationSelectorDisabled,
}: PresentationFilterProps) => {
    const showPresentationSelector = Boolean(presentations && onPresentationChange);

    if (!showPresentationSelector || !presentations || !onPresentationChange) {
        return null;
    }

    return (
        <Box>
            <Typography sx={fieldLabelSx}>Presentación</Typography>
            <PresentationSelector
                presentations={presentations}
                selectedPresentationId={selectedPresentationId}
                onChange={onPresentationChange}
                disabled={isPresentationSelectorDisabled}
            />
        </Box>
    );
};