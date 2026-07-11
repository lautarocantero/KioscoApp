import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import type { PresentationSelectorProps } from "@typings/product/productComponentTypes";


const PresentationSelector = ({
    presentations,
    selectedPresentationId,
    onChange,
    disabled,
}: PresentationSelectorProps): React.ReactNode => {
    if (presentations.length <= 1) return null; 

    const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

    return (
        <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="presentation-selector-label">Presentación</InputLabel>
            <Select
                labelId="presentation-selector-label"
                label="Presentación"
                value={selectedPresentationId ?? ""}
                onChange={handleChange}
                disabled={disabled}
            >
                {presentations.map((p) => (
                    <MenuItem key={p._id} value={p._id}>
                        {p.name}{p.model_size ? ` · ${p.model_size}` : ""}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default PresentationSelector;