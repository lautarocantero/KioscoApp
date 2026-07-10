import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../SearchBar/SearchBar";
import type { DataTableToolbarProps } from "@typings/ui/dataTable.types";

const DataTableToolbar = ({ search, newItem }: DataTableToolbarProps): React.ReactNode => {
    if (!search && !newItem) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            {search && (
                <SearchBar
                    value={search.value}
                    onChange={search.onChange}
                    placeholder={search.placeholder}
                />
            )}

            {newItem && (
                <Button
                    onClick={newItem.onClick}
                    href={newItem.href}
                    disableElevation
                    startIcon={<AddIcon sx={{ fontSize: "1.1rem" }} />}
                    sx={(theme) => ({
                        ml: { xs: "none", sm: "auto" },
                        flexShrink: 0,
                        color: theme.palette.secondary.main,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        borderRadius: "0.5em",
                        border: `1px solid ${theme.palette.secondary.main}`,
                        px: 2.5,
                        py: 0.75,
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.custom.black,
                        },
                    })}
                >
                    {newItem.label ?? "Nuevo"}
                </Button>
            )}
        </Box>
    );
};

export default DataTableToolbar;