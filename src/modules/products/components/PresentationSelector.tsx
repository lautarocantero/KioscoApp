import { Select, MenuItem, type SelectChangeEvent, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
        <Select
            value={selectedPresentationId ?? ""}
            onChange={handleChange}
            disabled={disabled}
            size="small"
            IconComponent={ExpandMoreIcon}
            sx={(theme: Theme) => ({
                textTransform: "none",
                fontSize: "0.8rem",
                color: theme.custom.fontColor,
                borderRadius: "10px",
                minWidth: 180,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                    borderWidth: "1px",
                },
            })}
        >
            {presentations.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                    {p.name}
                    {p.model_size ? ` · ${p.model_size}` : ""}
                </MenuItem>
            ))}
        </Select>
    );
};

export default PresentationSelector;