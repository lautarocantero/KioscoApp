import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseSaves from "../pages/LandingPage/components/LandingFeatureShowcaseSaves";

describe("LandingFeatureShowcaseSaves", () => {
  it("renderiza el texto recibido", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseSaves text="Te ahorra: buscar una factura entre papeles" />
      </ThemeProvider>
    );

    expect(screen.getByText("Te ahorra: buscar una factura entre papeles")).toBeInTheDocument();
  });

  it("usa el color success del theme para el texto y el ícono", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseSaves text="Te ahorra: buscar una factura entre papeles" />
      </ThemeProvider>
    );

    const text = screen.getByText("Te ahorra: buscar una factura entre papeles");
    expect(text).toHaveStyle({ color: darkTheme.palette.success.main });
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
