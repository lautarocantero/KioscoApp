import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../SearchBar/SearchBar";
import { getTableActionButtonSx } from "./getTableActionButtonSx";
import type { DataTableToolbarProps } from "@typings/ui/dataTable.types";
import type { ReactNode } from "react";


const DataTableToolbar = ({ search, newItem, extraActions }: DataTableToolbarProps): ReactNode => {
    if (!search && !newItem && !extraActions) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            {search && (
                <SearchBar
                    value={search.value}
                    onChange={search.onChange}
                    onClear={search.onClear}
                    placeholder={search.placeholder}
                />
            )}

            {newItem && (
                <Button
                    onClick={newItem.onClick}
                    href={newItem.href}
                    disableElevation
                    startIcon={<AddIcon sx={{ fontSize: "1.1rem" }} />}
                    sx={(theme) => ({ ml: { xs: "none", sm: "auto" }, ...getTableActionButtonSx(theme, "secondary") })}
                >
                    {newItem.label ?? "Nuevo"}
                </Button>
            )}

            {extraActions && (
                <Box sx={{ ml: { xs: "none", sm: newItem ? 0 : "auto" }, display: "flex", alignItems: "center", gap: 1.5 }}>
                    {extraActions}
                </Box>
            )}
        </Box>
    );
};

export default DataTableToolbar;