import { Box, Typography } from "@mui/material";
import DataTableToolbar from "./DataTableToolbar";
import type { DataTableHeaderProps } from "@typings/ui/dataTable.types";

const DataTableHeader = ({ title, search, newItem }: DataTableHeaderProps): React.ReactNode => {
    if (!title && !search && !newItem) return null;

    return (
        <Box
            component="header"
            sx={{ width: "100%", display: "flex", flexDirection: { xs: "column" }, gap: 3 }}
        >
            {title && (
                <Typography
                    component="h2"
                    title={title}
                    sx={(theme) => ({
                        fontSize: theme.typography.h2.fontSize,
                        fontWeight: 700,
                        color: theme.custom.fontColor,
                        maxWidth: { xs: "100%", sm: 200 },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    })}
                >
                    {title}
                </Typography>
            )}

            <DataTableToolbar search={search} newItem={newItem} />
        </Box>
    );
};

export default DataTableHeader;