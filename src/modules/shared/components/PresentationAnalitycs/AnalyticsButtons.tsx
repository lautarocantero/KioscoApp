// AnalyticsFiltersButtons.tsx
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box } from "@mui/material";
import PrimaryButtonComponent from "../Buttons/PrimaryButtonComponent";
import type { AnalyticsFiltersButtonsProps } from "@typings/ui/analytics.types";


export const AnalyticsFiltersButtons = ({ onApply, onClear, areFiltersActive }: AnalyticsFiltersButtonsProps) => {
    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <PrimaryButtonComponent
                buttonText="Aplicar filtros"
                buttonOnClick={onApply}
                icon={<TuneOutlinedIcon fontSize="small" sx={{ mr: 0.75 }} />}
                buttonWidth="auto"
                marginTop={"0"}
                dataTestId="apply-filters-button"
            />

            {areFiltersActive && (
                <PrimaryButtonComponent
                    buttonText="Eliminar filtros"
                    buttonOnClick={onClear}
                    buttonColor="error"
                    icon={<DeleteOutlineOutlinedIcon fontSize="small" sx={{ mr: 0.75 }} />}
                    buttonWidth="auto"
                    marginTop={"0"}
                    dataTestId="clear-filters-button"
                />
            )}
        </Box>
    );
};