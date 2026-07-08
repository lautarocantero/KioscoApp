// AppLayout.tsx
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { PropsWithChildren, ReactNode } from "react";
import OptionsHeader from "./components/OptionsHeader";
import SearchBar from "../components/SearchBar/SearchBar";
import type { AppLayoutProps } from "@typings/ui/layout.types";

const AppLayout = ({
  children,
  isOptions,
  fullWidth,
  noCenter,
  title,
  greetings,
  icon,
  hasSearchBar,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  hasNewItem,
  newItemLabel = "Nuevo",
  onNewItemClick,
  newItemHref,
}: PropsWithChildren<AppLayoutProps>): ReactNode => {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: noCenter ? 0 : "3em",
        justifyContent: noCenter || fullWidth ? "flex-start" : "center",
        p: { xs: 2, sm: 3 },
        gap: { xs: "1.5em", sm: "2em" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: fullWidth ? "stretch" : "flex-start" },
          width: fullWidth ? "100%" : { xs: "98%", sm: "90%", md: "720px" },
          gap: "1em",
        }}
      >
        <OptionsHeader isOptions={isOptions} title={title} icon={icon} greetings={greetings} />

        {fullWidth && !isOptions && (
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            {hasSearchBar && (
              <SearchBar
                value={searchValue as string}
                onChange={onSearchChange as (value: string) => void}
                placeholder={searchPlaceholder}
              />
            )}
            {hasNewItem && (
              <Button
                onClick={onNewItemClick}
                href={newItemHref}
                disableElevation
                startIcon={<AddIcon sx={{ fontSize: "1.1rem" }} />}
                sx={(theme) => ({
                  ml: "auto",
                  flexShrink: 0,
                  color: theme.palette?.secondary?.main,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  borderRadius: "0.5em",
                  border: `1px solid ${theme.palette?.secondary?.main}`,
                  px: 2.5,
                  py: 0.75,
                  "&:hover": {
                    backgroundColor: theme.palette?.secondary?.main,
                    color: theme.custom?.black,
                  },
                })}
              >
                {newItemLabel}
              </Button>
            )}
          </Box>
        )}

        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;