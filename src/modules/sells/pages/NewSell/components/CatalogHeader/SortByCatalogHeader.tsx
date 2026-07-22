// SortByCatalogHeader.tsx
import { Box, Menu, MenuItem, Tooltip, Typography, type Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { ReactNode } from "react";
import { useSortByCatalogHeader } from "../../../../../../hooks/sells/useSortByCatalogHeader";

const SortByCatalogHeader = (): ReactNode => {
  const {
    anchorEl,
    isMenuOpen,
    onOpenMenu,
    onCloseMenu,
    handleSelect,
    selectedLabel,
    options,
  } = useSortByCatalogHeader();

  return (
    <>
      <Tooltip title="Ordenar productos">
        <Box
          onClick={onOpenMenu}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            flex: 1,
            position: 'relative',
            cursor: 'pointer',
            width: "100%",
            border: `1px solid ${theme?.custom?.darkGray}`,
            borderRadius: "8px",
            '&:hover': {
              backgroundColor: theme?.custom?.darkBackground,
            }
          })}
        >
          <Box
            sx={(theme: Theme) => ({
              alignItems: 'center',
              borderRadius: '1em',
              display: 'flex',
              gap: '0.4em',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              height: "2em",
              flexDirection: 'row',
              justifyContent: 'center',
              '&:hover .MuiSvgIcon-root': {
                color: theme?.palette.secondary.main,
              },
            })}
          >
            <Typography sx={(theme: Theme) => ({
              color: theme?.palette?.secondary?.main,
              fontSize: theme?.typography?.body1?.fontSize,
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            })}>
              {selectedLabel ?? "Ordenar por"}
            </Typography>
            <KeyboardArrowDownIcon sx={(theme: Theme) => ({
              fontSize: '1em',
              color: theme?.palette?.secondary?.main,
            })}/>
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
    </>
  );
};

export default SortByCatalogHeader;