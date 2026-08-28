import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, InputBase, Paper, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { PresentationSearchBarProps } from "@typings/cart/cartComponentTypes";
import { SELL_SEARCH_INPUT_ID } from "../../../../config/constants";
import PresentationSearchResultRow from "./PresentationSearchResultRow";

const PresentationSearchBar = ({ search }: PresentationSearchBarProps): ReactNode => {
  const { t } = useTranslation();
  const { query, onQueryChange, results, highlightedIndex, isOpen, onKeyDown, onHighlight, onSelect, onClear } = search;

  return (
    <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
      <Box
        role="search"
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1,
          height: "3.25em",
          px: 1.5,
          borderRadius: "12px",
          backgroundColor: theme.custom?.white,
          border: `1px solid ${theme.custom?.darkGray}`,
        })}
      >
        <SearchIcon
          aria-hidden="true"
          sx={(theme: Theme) => ({ color: theme.palette.primary.main, flexShrink: 0 })}
        />

        <InputBase
          id={SELL_SEARCH_INPUT_ID}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("cart.catalog.search.placeholder")}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="presentation-search-listbox"
          aria-autocomplete="list"
          inputProps={{ "aria-label": t("cart.catalog.search.ariaLabel") }}
          sx={(theme: Theme) => ({
            flex: 1,
            fontSize: "0.95rem",
            color: theme.custom?.fontColor,
          })}
        />

        {query ? (
          <IconButton size="small" onClick={onClear} aria-label={t("cart.catalog.search.clearAriaLabel")}>
            <ClearIcon fontSize="small" sx={(theme: Theme) => ({ color: theme.custom?.darkWhite })} />
          </IconButton>
        ) : (
          <Typography
            variant="caption"
            sx={(theme: Theme) => ({ color: theme.custom?.translucidFontColor, flexShrink: 0, display: { xs: "none", md: "block" } })}
          >
            {t("cart.catalog.search.shortcutsHint")}
          </Typography>
        )}
      </Box>

      {isOpen && (
        <Paper
          id="presentation-search-listbox"
          role="listbox"
          elevation={6}
          sx={{
            position: "absolute",
            top: "calc(100% + 0.4em)",
            left: 0,
            right: 0,
            zIndex: (theme: Theme) => theme.zIndex.modal,
            maxHeight: "22em",
            overflowY: "auto",
            borderRadius: "12px",
          }}
        >
          {results.length === 0 ? (
            <Typography
              variant="body2"
              sx={(theme: Theme) => ({ color: theme.custom?.darkWhite, px: 2, py: 1.5 })}
            >
              {t("cart.catalog.searchResult.empty")}
            </Typography>
          ) : (
            results.map((row, index) => (
              <PresentationSearchResultRow
                key={row.key}
                row={row}
                isHighlighted={index === highlightedIndex}
                onSelect={onSelect}
                onMouseEnter={() => onHighlight(index)}
              />
            ))
          )}
        </Paper>
      )}
    </Box>
  );
};

export default PresentationSearchBar;
