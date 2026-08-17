import type { Theme } from "@mui/material";

// Mismo look que el botón "+ Nuevo producto" (pill outline, mismo color en
// borde/texto/fondo de hover) — reutilizado por cualquier acción de header
// de tabla que deba verse igual, aunque no sea "crear un registro nuevo".
export const getTableActionButtonSx = (theme: Theme, color: "secondary" | "error" | "primary" = "secondary") => ({
    flexShrink: 0,
    backgroundColor: theme.custom?.lightBackground,
    color: theme.palette[color].main,
    textTransform: "none" as const,
    fontWeight: 500,
    fontSize: "0.875rem",
    borderRadius: "0.5em",
    border: `1px solid ${theme.palette[color].main}`,
    px: 2.5,
    py: 0.75,
    "&:hover": {
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
    },
});
