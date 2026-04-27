/* eslint-disable @typescript-eslint/no-unused-vars */
// # Componente: AppSidebar
// Barra lateral de navegación con avatar de usuario e íconos de sección.
// Se oculta en pantallas xs para mantener responsividad móvil.

import { Box, Tooltip } from "@mui/material";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import type { Theme } from "@mui/material";
import { ThemeContext } from "../../../../theme/ThemeContext";
import type { AppDispatch } from "../../../../store/user/userSlice";
import { HomePageLinks } from "../../../../config/HomePageLinks";
import { startLogout } from "../../../../store/auth/thunks";

interface AppSidebarProps {
  isOptions?: boolean;
}

const AppSidebar = ({ isOptions }: AppSidebarProps) => {
  const { appTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box
      component="nav"
      sx={(theme: Theme) => ({
        width: { xs: 0, sm: "64px" },        // oculto en móvil
        minWidth: { xs: 0, sm: "64px" },
        overflow: "hidden",
        display: { xs: "none", sm: "flex" },  // oculto en móvil
        flexDirection: "column",
        alignItems: "center",
        py: 2.5,
        gap: 2,
        backgroundColor: !appTheme
          ? theme.custom?.background       // oscuro: #333333
          : theme.custom?.black,           // claro: también oscuro para contraste
        minHeight: "100vh",
      })}
    >
      {/* Avatar / iniciales */}
      <Box
        sx={(theme: Theme) => ({
          width: 36,
          height: 36,
          borderRadius: "50%",
          cursor: "pointer",
        })}
        onClick={() => navigate("/home")}
      >
        <svg width="32" height="32" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <rect width="52" height="52" rx="13" fill="#0386EE"/>
          <path d="M10 24 Q9 45 26 46 Q43 45 42 24 Z" fill="white" opacity="0.95"/>
          <path d="M16 24 L15 11 Q15 7 19 7 L19 12 Q17.5 12 17.5 14 L17.5 24 Z" fill="white" opacity="0.95"/>
          <path d="M36 24 L37 11 Q37 7 33 7 L33 12 Q34.5 12 34.5 14 L34.5 24 Z" fill="white" opacity="0.95"/>
          <path d="M19 24 L19 16 Q19 13 22 13 L30 13 Q33 13 33 16 L33 24 Z" fill="#0386EE"/>
          <rect x="10" y="22.5" width="32" height="3.5" rx="1.5" fill="#0058AF" opacity="0.85"/>
        </svg>
      </Box>

      {/* Íconos de sección */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        {HomePageLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.url) && link.url !== "/";
          return (
            <Tooltip key={link.url} title={link.description} placement="right">
              <Box
                onClick={() => navigate(link.url)}
                sx={(theme: Theme) => ({
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  transition: "background-color 0.15s, color 0.15s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                  },
                })}
              >
                {link.icon}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Logout al fondo */}
      <Tooltip title="Cerrar sesión" placement="right">
        <Box
          onClick={() => dispatch(startLogout())}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.25)",
            "&:hover": { color: "rgba(255,255,255,0.7)" },
          }}
        >
          <LogoutIcon sx={{ fontSize: "1.1rem" }} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default AppSidebar;