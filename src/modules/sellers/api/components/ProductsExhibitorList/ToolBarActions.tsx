import {
  Box,
  Typography,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";
import SortByCatalogHeader from "../CatalogHeader/SortByCatalogHeader";
import ViewModeToggle from "../CatalogHeader/ViewModeToggle";
import type { ToolbarActionsProps } from "@typings/seller/sellerComponentTypes";


const ToolbarActions = ({ viewMode,setViewMode }: ToolbarActionsProps): ReactNode => {

    return (

        <Box
            sx={(theme: Theme) => ({
                borderLeft: { xs: "none", md: `1px solid ${theme.custom?.lightMain}` },
                borderTop: { xs: `1px solid ${theme.custom?.lightMain}`, md: "none" },
                width: "100%",
                height: { xs: "auto", md: "100%" },
                pt: { xs: 2, md: 0 },
                display: "flex",
                flexDirection: "row",
            })}
        >
            <Box
                sx={{
                    width: { xs: "100%", md: "80%" },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-end", sm: "center" },
                    justifyContent: "space-between",
                    gap: { xs: 1.5, sm: 0 },
                    margin: "auto",
                }}
            >
                <SortByCatalogHeader viewMode={viewMode} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="caption"
                        sx={(theme: Theme) => ({
                        color: theme.custom?.white,
                        textAlign: "right",
                        display: { xs: "none", sm: "block" },
                        })}
                    >
                        Elegí cómo querés ver tus productos
                    </Typography>
                    <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
                </Box>
            </Box>
        </Box>
    );
};

export default ToolbarActions;