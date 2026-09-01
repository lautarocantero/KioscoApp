import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingHeroContent from "../pages/LandingPage/components/LandingHeroContent";

describe("LandingHeroContent", () => {
  it("renderiza el título completo y los 4 beneficios", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingHeroContent />
      </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "Stock y ventas en un solo lugar" })).toBeInTheDocument();
    expect(screen.getByText("Vendés en dos toques, sin calculadora")).toBeInTheDocument();
    expect(screen.getByText("El stock se actualiza solo con cada venta")).toBeInTheDocument();
    expect(screen.getByText("Sabés qué reponer antes de quedarte sin nada")).toBeInTheDocument();
    expect(screen.getByText("Cerrás la caja viendo cuánto ganaste hoy")).toBeInTheDocument();
  });
});
