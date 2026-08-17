import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../SearchBar/SearchBar";
import { getTableActionButtonSx } from "./getTableActionButtonSx";
import type { DataTableToolbarProps } from "@typings/ui/dataTable.types";
import type { ReactNode } from "react";


const DataTableToolbar = ({ search, filters, newItem, extraActions }: DataTableToolbarProps): ReactNode => {
    if (!search && !filters && !newItem && !extraActions) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
            {(search || newItem || extraActions) && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: 1.5,
                        flexWrap: "wrap",
                    }}
                >
                    {search && (
                        <SearchBar
                            value={search.value}
                            onChange={search.onChange}
                            onClear={search.onClear}
                            placeholder={search.placeholder}
                        />
                    )}

                    {(newItem || extraActions) && (
                        <Box sx={{ ml: { xs: "none", sm: "auto" }, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                            {newItem && (
                                <Button
                                    onClick={newItem.onClick}
                                    href={newItem.href}
                                    disableElevation
                                    startIcon={<AddIcon sx={{ fontSize: "1.1rem" }} />}
                                    sx={(theme) => getTableActionButtonSx(theme, "secondary")}
                                >
                                    {newItem.label ?? "Nuevo"}
                                </Button>
                            )}

                            {extraActions}
                        </Box>
                    )}
                </Box>
            )}

            {filters && (
                <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                    {filters}
                </Box>
            )}
        </Box>
    );
};

export default DataTableToolbar;