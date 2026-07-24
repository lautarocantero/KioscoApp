import {
  Box,
  Typography,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";
import SortByCatalogHeader from "../../pages/NewSell/components/CatalogHeader/SortByCatalogHeader";
import ViewModeToggle from "../../pages/NewSell/components/CatalogHeader/ViewModeToggle";
import { useProductsExhibitor } from "../../../../hooks/sells/useProductsExhibitor";


const ToolbarActions = (): ReactNode => {
    const { viewMode, setViewMode } = useProductsExhibitor();

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
                        color: theme.custom?.darkWhite,
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