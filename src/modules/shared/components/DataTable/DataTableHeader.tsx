import { Box, Typography } from "@mui/material";
import DataTableToolbar from "./DataTableToolbar";
import type { DataTableHeaderProps } from "@typings/ui/dataTable.types";

const DataTableHeader = ({ title, search, newItem }: DataTableHeaderProps): React.ReactNode => {
    if (!title && !search && !newItem) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 3 }}>
            {title && (
                <Typography
                    sx={(theme) => ({
                        fontSize: theme.typography.h2,
                        fontWeight: 700,
                        color: theme.custom.white,
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