// modules/shared/components/FormSelector/FormSelectorSingle.tsx
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { sharedSx } from "../sharedSx/sharedSx";
import { useCategorySelector } from "../../../../hooks/shared/useCategorySelector";
import type { CategorySelectorSingleProps } from "@typings/presentation/presentationComponentTypes";

const CLEAR_VALUE = "__clear__";

function FormSelectorSingle<C extends string>({
    label = "Categoría",
    categories,
    getLabel,
    disabled,
    id = "category-selector",
    value,
    onChange,
    allowClear,
    clearLabel = "Todas",
}: CategorySelectorSingleProps<C>): React.ReactNode {
    const { handleSelect, selectedLabel } =
        useCategorySelector({ value, onChange, getLabel, disabled });

    const handleChange = (event: SelectChangeEvent<string>) => {
        const raw = event.target.value;
        if (raw === CLEAR_VALUE) {
            handleSelect(null);
            return;
        }
        handleSelect(raw as C);
    };

    return (
        <FormControl fullWidth disabled={disabled} variant="outlined" sx={sharedSx}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value ?? ""}
                label={label}
                onChange={handleChange}
                renderValue={() => selectedLabel ?? ""}
            >
                {allowClear && (
                    <MenuItem value={CLEAR_VALUE}>
                        {clearLabel}
                    </MenuItem>
                )}
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {getLabel(category)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FormSelectorSingle;