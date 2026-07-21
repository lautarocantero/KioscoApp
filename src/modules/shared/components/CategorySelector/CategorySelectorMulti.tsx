// modules/shared/components/CategorySelector/CategorySelectorMulti.tsx
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { sharedSx } from "../sharedSx/sharedSx";
import { useCategorySelectorMulti } from "../../../../hooks/shared/useCategorySelectorMulti";
import type { CategorySelectorMultiProps } from "@typings/presentation/presentationComponentTypes";

function CategorySelectorMulti<C extends string>({
    label = "Categoría",
    categories,
    getLabel,
    disabled,
    id = "category-selector",
    value: selected,
    onChange,
}: CategorySelectorMultiProps<C>): React.ReactNode {
    const { availableOptions, handleSelect, handleRemove } = useCategorySelectorMulti(categories, selected, onChange);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: selected.length > 0 ? 1 : 0 }}>
            <FormControl fullWidth disabled={disabled || availableOptions.length === 0} variant="outlined" sx={sharedSx}>
                <InputLabel id={`${id}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
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
                                {getLabel(category)}
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
                            label={getLabel(category)}
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

export default CategorySelectorMulti;