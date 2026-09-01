import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingHeroBenefits from "../pages/LandingPage/components/LandingHeroBenefits";
import { getLandingHeroBenefits } from "../helpers/getLandingHeroBenefits";

describe("LandingHeroBenefits", () => {
  it("renderiza los 4 beneficios traducidos", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingHeroBenefits benefits={getLandingHeroBenefits()} />
      </ThemeProvider>
    );

    expect(screen.getByText("Vendés en dos toques, sin calculadora")).toBeInTheDocument();
    expect(screen.getByText("El stock se actualiza solo con cada venta")).toBeInTheDocument();
    expect(screen.getByText("Sabés qué reponer antes de quedarte sin nada")).toBeInTheDocument();
    expect(screen.getByText("Cerrás la caja viendo cuánto ganaste hoy")).toBeInTheDocument();
  });

  it("renderiza cada beneficio como ítem de lista, con su ícono decorativo", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingHeroBenefits benefits={getLandingHeroBenefits()} />
      </ThemeProvider>
    );

    expect(container.querySelectorAll("li")).toHaveLength(4);
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4);
  });
});
