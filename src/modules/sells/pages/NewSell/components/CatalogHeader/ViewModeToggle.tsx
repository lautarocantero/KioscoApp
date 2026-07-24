import { Box, Tooltip, type Theme } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { ReactNode } from "react";
import { ViewMode } from "@typings/seller/sellerEnums";
import type { ViewModeToggleProps } from "@typings/sells/SellComponentTypes";


const ViewModeToggle = ({viewMode, setViewMode}: ViewModeToggleProps): ReactNode => {
  
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
          onClick={() => setViewMode(ViewMode.Grid)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            cursor: "pointer",
            borderRadius: "6px",
            width: "1.8em",
            height: "1.5em",
            transition: "all 0.3s ease",
            backgroundColor: viewMode === ViewMode.Grid ? theme.palette?.primary?.dark : "transparent",
            '&:hover': {
              backgroundColor: viewMode === ViewMode.Grid ? theme.palette?.primary?.dark : theme?.custom?.darkBackground,
            },
          })}
        >
          <GridViewIcon
            fontSize="small"
            sx={(theme: Theme) => ({
              color: viewMode === ViewMode.Grid ? theme.custom?.darkBackground : theme.custom?.translucidWhite,
              transition: "color 0.3s ease",
            })}
          />
        </Box>

        <Box
          onClick={() => setViewMode(ViewMode.List)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            cursor: "pointer",
            borderRadius: "6px",
            width: "1.8em",
            height: "1.6em",
            transition: "all 0.3s ease",
            backgroundColor: viewMode === ViewMode.List ? theme.palette?.primary?.dark : "transparent",
            '&:hover': {
              backgroundColor: viewMode === ViewMode.List ? theme.palette?.primary?.dark : theme?.custom?.darkBackground,
            },
          })}
        >
          <ViewListIcon
            fontSize="small"
            sx={(theme: Theme) => ({
              color: viewMode === ViewMode.List ? theme.custom?.darkBackground : theme.custom?.translucidWhite,
              transition: "color 0.3s ease",
            })}
          />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ViewModeToggle;