// src/.../components/ProductsToolbar/ViewModeToggle.tsx
import { Box, Tooltip, type Theme } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { ReactNode } from "react";
import { useProductsExhibitor } from "../../../../../../hooks/sells/useProductsExhibitor";

const ViewModeToggle = (): ReactNode => {
  const { viewMode, setViewMode } = useProductsExhibitor();

  return (
    <Tooltip title="Cambiar vista">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={(theme: Theme) => ({
          flex: 1,
          gap: 0.5,
          p: 0.5,
          width: "100%",
          height: "2.1em",
          border: `1px solid ${theme?.custom?.darkGray}`,
          borderRadius: "8px",
        })}
      >
        <Box
          onClick={() => setViewMode("grid")}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            cursor: "pointer",
            borderRadius: "6px",
            width: "1.8em",
            height: "1.5em",
            transition: "all 0.3s ease",
            backgroundColor: viewMode === "grid" ? theme.palette?.secondary?.main : "transparent",
            '&:hover': {
              backgroundColor: viewMode === "grid" ? theme.palette?.secondary?.main : theme?.custom?.darkBackground,
            },
          })}
        >
          <GridViewIcon
            fontSize="small"
            sx={(theme: Theme) => ({
              color: viewMode === "grid" ? theme.custom?.darkBackground : theme.custom?.translucidWhite,
              transition: "color 0.3s ease",
            })}
          />
        </Box>

        <Box
          onClick={() => setViewMode("list")}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            cursor: "pointer",
            borderRadius: "6px",
            width: "1.8em",
            height: "1.6em",
            transition: "all 0.3s ease",
            backgroundColor: viewMode === "list" ? theme.palette?.secondary?.main : "transparent",
            '&:hover': {
              backgroundColor: viewMode === "list" ? theme.palette?.secondary?.main : theme?.custom?.darkBackground,
            },
          })}
        >
          <ViewListIcon
            fontSize="small"
            sx={(theme: Theme) => ({
              color: viewMode === "list" ? theme.custom?.darkBackground : theme.custom?.translucidWhite,
              transition: "color 0.3s ease",
            })}
          />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ViewModeToggle;