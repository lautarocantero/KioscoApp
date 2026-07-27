import { Chip, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FORM_HEADER_STATUS_CONFIG } from "./FormHeaderStatusConfig";
import type { FormHeaderStatusChipProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderStatusChip = ({ status }: FormHeaderStatusChipProps): ReactNode => {
    if (!status) return null;

    const statusConfig = FORM_HEADER_STATUS_CONFIG[status];

    return (
        <Chip
            size="small"
            icon={statusConfig.icon}
            label={statusConfig.label}
            sx={(theme: Theme) => ({
                bgcolor: alpha(theme.custom.accents[statusConfig.accent], 0.15),
                color: theme.custom.accents[statusConfig.accent],
                fontWeight: 600,
                flexShrink: 0,
                "& .MuiChip-icon": {
                    color: theme.custom.accents[statusConfig.accent],
                },
            })}
        />
    );
};

export default FormHeaderStatusChip;