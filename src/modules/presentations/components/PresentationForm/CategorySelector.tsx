import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { PRESENTATION_CATEGORY_LABELS } from "@typings/presentation/presentationCategoryLabels";
import type { CategorySelectorProps } from "@typings/presentation/presentationComponentTypes";
import { sharedSx } from "../../../shared/components/sharedSx/sharedSx";
import { useCategorySelector } from "../../../../hooks/shared/useCategorySelector";


function CategorySelector<T extends object>({
    name,
    label = "Categorías",
}: CategorySelectorProps<T>): React.ReactNode {
    const { selected, availableOptions, handleSelect, handleRemove } = useCategorySelector<T>(name);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: selected.length > 0 ? 1 : 0 }}>
            <FormControl fullWidth disabled={availableOptions.length === 0} variant="outlined" sx={sharedSx}>
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${name}-label`}
                    id={name}
                    value=""
                    label={label}
                    onChange={handleSelect}
                    renderValue={() => ""}
                >
                    {availableOptions.length === 0 ? (
                        <MenuItem disabled value="">
                            <Typography variant="body2">No hay más categorías disponibles</Typography>
                        </MenuItem>
                    ) : (
                        availableOptions.map((category) => (
                            <MenuItem key={category} value={category}>
                                {PRESENTATION_CATEGORY_LABELS[category]}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            {selected.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selected.map((category) => (
                        <Chip
                            key={category}
                            label={PRESENTATION_CATEGORY_LABELS[category]}
                            onDelete={() => handleRemove(category)}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default CategorySelector;