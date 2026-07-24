import { Box, Menu, MenuItem, Tooltip, Typography, type Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { ReactNode } from "react";
import { useSortByCatalogHeader } from "../../../../../../hooks/sells/useSortByCatalogHeader";
import { ViewMode } from "@typings/seller/sellerEnums";
import type { SortByCatalogHeaderProps } from "@typings/sells/SellComponentTypes";

const SortByCatalogHeader = ({viewMode}: SortByCatalogHeaderProps): ReactNode => {
  
  const {
    anchorEl,
    isMenuOpen,
    onOpenMenu,
    onCloseMenu,
    handleSelect,
    selectedLabel,
    options,
  } = useSortByCatalogHeader();

  const isVisible = viewMode === ViewMode.Grid;

  return (
    <Box sx={{ visibility: isVisible ? "visible" : "hidden" }}>
      <Tooltip title="Ordenar productos">
        <Box
          onClick={onOpenMenu}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            cursor: "pointer",
            border: `1px solid ${theme.custom?.darkGray}`,
            borderRadius: "999px",
            backgroundColor: theme.custom?.blackTranslucid,
            px: 2,
            py: 1,
            "&:hover": {
              backgroundColor: theme.custom?.darkBackground,
            },
          })}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: "0.4em",
              flexShrink: 0,
              transition: "all 0.3s ease",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={(theme: Theme) => ({
                color: theme.custom?.fontColor,
                fontSize: theme.typography?.body2?.fontSize,
                whiteSpace: "nowrap",
              })}
            >
              Ordenar por:{" "}
              <span>
                {selectedLabel ?? "Nombre A-Z"}
              </span>
            </Typography>
            <KeyboardArrowDownIcon
              sx={(theme: Theme) => ({
                fontSize: "1.2em",
                color: theme.custom?.fontColor,
              })}
            />
          </Box>
        </Box>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={onCloseMenu}>
        {options.map((opt) => (
          <MenuItem key={opt.value} onClick={() => handleSelect(opt.value)}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SortByCatalogHeader;