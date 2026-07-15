// PresentationFilter.tsx
import { Box, Typography } from "@mui/material";
import PresentationSelector from "../../../products/components/PresentationSelector";
import { fieldLabelSx } from "../sharedSx/sharedSx";
import type { PresentationFilterProps } from "@typings/ui/analytics.types";


export const PresentationFilter = ({
    label,
    presentations,
    onPresentationChange,
    selectedPresentationId,
    isPresentationSelectorDisabled,
    hidePresentationFilter
}: PresentationFilterProps) => {
    const showPresentationSelector = Boolean(presentations && onPresentationChange);

    if (!showPresentationSelector || !presentations || !onPresentationChange) {
        return null;
    }

    if (hidePresentationFilter) return null;

    return (
        <Box>
            <Typography sx={fieldLabelSx}>{label}</Typography>
            <PresentationSelector
                presentations={presentations}
                selectedPresentationId={selectedPresentationId}
                onChange={onPresentationChange}
                disabled={isPresentationSelectorDisabled}
            />
        </Box>
    );
};