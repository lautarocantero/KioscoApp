import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import OptionsHeader from "./components/OptionsHeader";
import AppSidebar from "./components/appSideBar/Appsidebar";
import LightMode from "../components/LightMode/LightMode";
import SearchBar from "../components/SearchBar/SearchBar";
import { NoContentLoaded } from "../components/NoContentLoadedComponent";
import type { AppLayoutProps } from "@typings/ui/layout.types";

const AppLayout = ({
  children,
  isOptions,
  fullWidth,
  noCenter,
  title,
  icon,
  hasSearchBar,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  hasNewItem,
  newItemLabel = "Nuevo",
  onNewItemClick,
  newItemHref,
}: PropsWithChildren<AppLayoutProps>): React.ReactNode => {

  const { appTheme } = useContext(ThemeContext);

  <NoContentLoaded message="No hay contenido cargado..." />

  return (
    <Box
      component="div"
      sx={(t) => ({
        height: "100vh",
        width: "100vw",
        backgroundColor: t.custom.background,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
      })}
    >
      {/* ── Toggle de tema ── */}
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <LightMode />
      </Box>

      {/* ── Sidebar ── */}
      <AppSidebar />

      {/* ── Contenido principal ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
          height: "100%",
        }}
      >
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
              alignItems: {
                xs: "center",
                sm: fullWidth ? "stretch" : "flex-start",
              },
              width: fullWidth ? "100%" : { xs: "98%", sm: "90%", md: "720px" },
              gap: "1em",
            }}
          >
            {/* Header para páginas isOptions */}
            <OptionsHeader
              isOptions={isOptions}
              title={title}
              icon={icon}
              appTheme={appTheme}
            />

            {/* Header para páginas fullWidth (listados, tablas) */}
            {fullWidth && !isOptions && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* Título + ícono */}
                

                {/* Search bar */}
                {hasSearchBar && (
                  <SearchBar
                    value={searchValue as string}
                    onChange={onSearchChange as (value: string) => void}
                    placeholder={searchPlaceholder}
                  />
                )}

                {/* Botón nuevo item */}
                {hasNewItem && (
                  <Button
                    onClick={onNewItemClick}
                    href={newItemHref}
                    disableElevation
                    startIcon={
                      <AddIcon sx={{ fontSize: "1.1rem" }} /> // 👈 sin color, hereda currentColor
                    }
                    sx={(theme) => ({
                      ml: "auto",
                      flexShrink: 0,
                      color: theme.palette?.secondary?.main, // 👈 el color "reposo" ahora lo define el Button, no el ícono
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
      </Box>
    </Box>
  );
};

export default AppLayout;