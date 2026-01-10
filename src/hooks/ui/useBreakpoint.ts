
/**
 * ┌───────────────────────────────────────────────┐
 * │           🪝 Hook: useBreakpoint               │
 * └───────────────────────────────────────────────┘
 *
 * 🎭 Descripción:
 * Hook personalizado para detectar el breakpoint actual del tema de Material UI.
 *
 * ────────────────────────────────────────────────
 *
 * 📚 Propósito:
 * - Facilitar el diseño responsivo sin repetir lógica.
 * - Retornar un string con el breakpoint activo.
 *
 * ────────────────────────────────────────────────
 *
 * 🔧 Breakpoints soportados:
 * - "xs" → extra pequeño
 * - "sm" → pequeño
 * - "md" → mediano
 * - "lg" → grande
 * - "xl" → extra grande
 *
 * ────────────────────────────────────────────────
 *
 * 🚀 Flujo:
 * 1. Obtiene el tema con `useTheme()`.
 * 2. Evalúa cada breakpoint con `useMediaQuery()`.
 * 3. Retorna el breakpoint activo como tipo `Breakpoint`.
 *
 * ────────────────────────────────────────────────
 *
 * 📝 Ejemplo:
 * 
 * const bp = useBreakpoint();
 *
 * return (
 *   <div>
 *     {bp === "sm" && <p>Pantalla pequeña</p>}
 *     {bp === "lg" && <p>Pantalla grande</p>}
 *   </div>
 * );
 * ```
 *
 * ────────────────────────────────────────────────
 */


import { useTheme, useMediaQuery } from "@mui/material";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export const useBreakpoint = (): Breakpoint => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  if (isXs) return "xs";
  if (isSm) return "sm";
  if (isMd) return "md";
  if (isLg) return "lg";
  if (isXl) return "xl";
  return "xl"; // fallback
};
