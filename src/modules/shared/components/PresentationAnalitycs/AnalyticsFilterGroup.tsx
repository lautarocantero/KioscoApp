import { Box, Typography, type Theme } from "@mui/material";
import type { FilterGroupProps } from "@typings/ui/analytics.types";
import type { ReactNode } from "react";

const FilterGroup = ({ icon, title, children }: FilterGroupProps): ReactNode => (
    <Box
        sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            p: 2,
            borderRadius: "12px",
            bgcolor: theme.custom.darkGray,
        })}
    >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            {icon}
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                })}
            >
                {title}
            </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {children}
        </Box>
    </Box>
);

export default FilterGroup;